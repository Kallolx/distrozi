import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    // Extract all fields
    const data: Record<string, any> = {};
    const attachments: any[] = [];

    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        const buffer = Buffer.from(await value.arrayBuffer());
        attachments.push({
          filename: value.name,
          content: buffer,
        });
      } else {
        data[key] = value;
      }
    }

    const submissionType = data.submissionType || "General Submission";
    delete data.submissionType;

    // Create a formatted HTML string for the email
    let htmlContent = `<h2>New ${submissionType}</h2>`;
    htmlContent += `<table style="width: 100%; border-collapse: collapse;">`;
    for (const [key, value] of Object.entries(data)) {
      htmlContent += `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${value}</td>
        </tr>
      `;
    }
    htmlContent += `</table>`;

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `New Application: ${submissionType} from ${data.firstName || ""} ${data.lastName || ""}`,
      html: htmlContent,
      attachments: attachments,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Failed to send email", error: error.message },
      { status: 500 }
    );
  }
}
