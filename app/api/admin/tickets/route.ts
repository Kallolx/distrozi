import { NextResponse } from 'next/server';
import { readTickets, writeTickets, SupportTicket, TicketStatus } from '@/lib/ticketStore';
import nodemailer from 'nodemailer';

export async function GET(request: Request) {
  try {
    // Authorization header validation using server environment variables
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.replace('Bearer ', '').trim();
    const correctPasscode = process.env.ADMIN_PASSCODE || 'distrozi2026';

    if (token !== correctPasscode) {
      return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
    }

    const tickets = await readTickets();
    // Sort by date descending (latest first)
    const sorted = tickets.sort((a: SupportTicket, b: SupportTicket) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return NextResponse.json({ tickets: sorted }, { status: 200 });
  } catch (error) {
    console.error("Error reading support tickets:", error);
    return NextResponse.json(
      { success: false, message: "Failed to read ticket store", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Authorization header validation using server environment variables
    const authHeader = request.headers.get('authorization') || '';
    const token = authHeader.replace('Bearer ', '').trim();
    const correctPasscode = process.env.ADMIN_PASSCODE || 'distrozi2026';

    if (token !== correctPasscode) {
      return NextResponse.json({ success: false, message: "Unauthorized access" }, { status: 401 });
    }

    const body = await request.json();
    const { ticketId, status, remarks } = body;

    if (!ticketId) {
      return NextResponse.json({ success: false, message: "Ticket ID is required" }, { status: 400 });
    }

    const tickets = await readTickets();
    const index = tickets.findIndex((t: SupportTicket) => t.ticketId === ticketId);

    if (index === -1) {
      return NextResponse.json({ success: false, message: "Ticket not found" }, { status: 404 });
    }

    const oldStatus = tickets[index].status;
    const isStatusChanged = status !== undefined && status !== oldStatus;

    if (status !== undefined) {
      tickets[index].status = status as TicketStatus;
    }
    if (remarks !== undefined) {
      tickets[index].remarks = remarks;
    }

    await writeTickets(tickets);

    // Send status update notification to the user if email is configured and status changed
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const hasCredentials = emailUser && emailPass && emailUser !== "your-email@gmail.com";

    const ticket = tickets[index];
    const userEmail = ticket.details && ticket.details.email;

    if (isStatusChanged && hasCredentials && userEmail) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: emailUser,
            pass: emailPass,
          },
        });

        const statusLabels: Record<string, string> = {
          "Pending": "Pending Review",
          "In Progress": "In Progress / Under Review",
          "Resolved": "Resolved / Closed",
          "Rejected": "Rejected / Cancelled"
        };

        const currentStatusLabel = statusLabels[status] || status;
        const subject = `Distrozi Support: Ticket ${status} [${ticketId}]`;
        
        let statusGlowColor = "#f3c343"; // Gold for Pending/In Progress
        if (status === "Resolved") statusGlowColor = "#10b981"; // Emerald
        if (status === "Rejected") statusGlowColor = "#f43f5e"; // Rose

        const userPlainText = `Hello,\n\nYour Distrozi support ticket status has been updated.\n\nTicket ID: ${ticketId}\nRequest Type: ${ticket.type}\nNew Status: ${currentStatusLabel}\n\nBest regards,\nDistrozi Support Desk`;

        const userHtmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0c0c0c; color: #ffffff; padding: 40px 30px; border-radius: 16px; border: 1px solid #222222; text-align: left;">
          <div style="margin-bottom: 24px; border-bottom: 1px solid #222222; padding-bottom: 20px;">
            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">Distrozi <span style="color: #f3c343;">Support</span></h1>
          </div>
          
          <p style="font-size: 15px; line-height: 1.6; color: #d1d1d6; margin-top: 0; margin-bottom: 20px;">
            Hello,
          </p>
          <p style="font-size: 15px; line-height: 1.6; color: #d1d1d6; margin-bottom: 24px;">
            This is an automated notification to inform you that the status of your support request has been updated by our support department.
          </p>
          
          <div style="background-color: #121212; border: 1px solid #2a2a2a; border-radius: 12px; padding: 20px; margin-bottom: 28px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tbody>
                <tr>
                  <td style="padding: 8px 0; color: #a1a1aa; font-weight: 500; width: 35%;">Ticket ID</td>
                  <td style="padding: 8px 0; color: #ffffff; font-family: monospace; font-weight: 700;">${ticketId}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #a1a1aa; font-weight: 500;">Request Type</td>
                  <td style="padding: 8px 0; color: #ffffff; font-weight: 600;">${ticket.type}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #a1a1aa; font-weight: 500;">Current Status</td>
                  <td style="padding: 8px 0; color: ${statusGlowColor}; font-weight: 700; font-size: 15px; text-transform: uppercase;">${currentStatusLabel}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #a1a1aa; font-weight: 500;">Last Updated</td>
                  <td style="padding: 8px 0; color: #ffffff; font-weight: 500;">${new Date().toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          ${status === "Resolved" ? `
          <p style="font-size: 14px; line-height: 1.6; color: #10b981; font-weight: 600; margin-bottom: 24px;">
            ✓ This request has been resolved and closed. No further action is required from your side.
          </p>
          ` : ''}

          <p style="font-size: 14px; line-height: 1.6; color: #a1a1aa; margin-bottom: 24px;">
            If you have any questions or require additional details regarding this status update, please contact our support desk directly at <a href="mailto:support@distrozi.com" style="color: #f3c343; text-decoration: none; font-weight: 600;">support@distrozi.com</a> quoting your Ticket ID.
          </p>
          
          <div style="border-top: 1px solid #222222; padding-top: 20px; margin-top: 24px; font-size: 12px; color: #71717a;">
            <p style="margin: 0; font-weight: 600; color: #a1a1aa; margin-bottom: 4px;">Distrozi Rights & Claims Division</p>
            <p style="margin: 0;">This is an automated status update email. Please do not reply directly to this message.</p>
          </div>
        </div>
        `;

        const mailOptions = {
          from: `"Distrozi Support" <${emailUser}>`,
          to: userEmail,
          replyTo: `support@distrozi.com`,
          subject: subject,
          text: userPlainText,
          html: userHtmlContent,
        };

        await transporter.sendMail(mailOptions);
        console.log(`Status update email dispatched to user ${userEmail} for ticket ${ticketId}`);
      } catch (emailErr) {
        console.error("Failed to send status update email to user:", emailErr);
      }
    }

    return NextResponse.json({ success: true, ticket: tickets[index] }, { status: 200 });
  } catch (error) {
    console.error("Error updating support ticket:", error);
    return NextResponse.json(
      { success: false, message: "Server error occurred", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
