import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { addTicket, SupportTicket } from '@/lib/ticketStore';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let dataObj: Record<string, string> = {};
    const attachments: Array<{ filename: string; content: Buffer; contentType: string }> = [];

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      for (const [key, value] of formData.entries()) {
        if (value instanceof Blob) {
          const buffer = Buffer.from(await value.arrayBuffer());
          attachments.push({
            filename: value.name,
            content: buffer,
            contentType: value.type,
          });
        } else {
          dataObj[key] = value.toString();
        }
      }
    } else {
      dataObj = await request.json();
    }

    const submissionType = dataObj.submissionType || "New Submission";
    const subject = `Distrozi - ${submissionType}`;

    // Persist ticket if it's a support submission
    if (submissionType.startsWith("Support - ")) {
      const ticketId = dataObj.ticketId || `DT-${Math.floor(100000 + Math.random() * 900000)}`;
      const date = new Date().toISOString();

      // Extract track/artist details dynamically
      let trackArtist = "-";
      if (dataObj.songTitle) {
        trackArtist = dataObj.songTitle;
      } else if (dataObj.artistName) {
        trackArtist = dataObj.artistName;
      } else if (dataObj.reelTrackName || dataObj.reelArtistName) {
        const track = dataObj.reelTrackName || "";
        const artist = dataObj.reelArtistName || "";
        trackArtist = [track, artist].filter(Boolean).join(" - ");
      } else if (dataObj.labelName) {
        trackArtist = dataObj.labelName;
      }

      const newTicket: SupportTicket = {
        ticketId,
        type: submissionType.replace("Support - ", ""),
        trackArtist,
        status: "Pending",
        date,
        remarks: "",
        details: dataObj
      };

      await addTicket(newTicket);
    }

    let plainText = `You have received a new submission:\n\n`;
    let htmlContent = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #121212; color: #ffffff; padding: 30px; border-radius: 12px; border: 1px solid #2a2a2a;">
      <h2 style="margin-top: 0; color: #ffffff; font-size: 24px; border-bottom: 1px solid #2a2a2a; padding-bottom: 16px; margin-bottom: 10px;">New ${submissionType}</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tbody>
    `;

    for (const [key, value] of Object.entries(dataObj)) {
      if (key === "submissionType") continue;
      // formatted key
      const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
      const finalKey = formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);
      
      plainText += `${finalKey}: ${value}\n`;
      htmlContent += `
          <tr>
            <td style="padding: 16px 15px 16px 0; border-bottom: 1px solid #2a2a2a; font-weight: 600; width: 35%; color: #a1a1aa; vertical-align: top;">${finalKey}</td>
            <td style="padding: 16px 0; border-bottom: 1px solid #2a2a2a; color: #ffffff; vertical-align: top; word-break: break-word;">${value || "-"}</td>
          </tr>
      `;
    }

    htmlContent += `
        </tbody>
      </table>
    </div>
    `;

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const hasCredentials = emailUser && emailPass && emailUser !== "your-email@gmail.com";

    if (hasCredentials) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPass,
        },
      });

      // Supports multiple recipients: 
      // 1. You can comma-separate them in RECEIVER_EMAIL (e.g., "a@b.com, c@d.com")
      // 2. Or add a second email in RECEIVER_EMAIL_2
      const receiver1 = process.env.RECEIVER_EMAIL || "support@distrozi.com";
      const receiver2 = process.env.RECEIVER_EMAIL_2;
      const finalRecipients = receiver2 ? `${receiver1}, ${receiver2}` : receiver1;

      const replyTo = dataObj.email || emailUser;

      const mailOptions = {
        from: emailUser,
        to: finalRecipients,
        replyTo: replyTo,
        subject: subject,
        text: plainText,
        html: htmlContent,
        attachments: attachments,
      };

      await transporter.sendMail(mailOptions);
      console.log(`Email dispatched successfully to: ${finalRecipients}`);
    } else {
      console.warn("⚠️ SMTP credentials missing or using example placeholders. Support ticket registered, email dispatch skipped.");
    }

    return NextResponse.json({ success: true, message: "Request registered successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
