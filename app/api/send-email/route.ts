import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let dataObj: Record<string, string> = {};
    const attachments: any[] = [];

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

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const receiver = process.env.RECEIVER_EMAIL || "support@distrozi.com";
    const replyTo = dataObj.email || process.env.EMAIL_USER;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: receiver,
      replyTo: replyTo,
      subject: subject,
      text: plainText,
      html: htmlContent,
      attachments: attachments,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send email", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
