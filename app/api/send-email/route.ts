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

    let message = `You have received a new submission:\n\n`;
    for (const [key, value] of Object.entries(dataObj)) {
      if (key === "submissionType") continue;
      // formatted key
      const formattedKey = key.replace(/([A-Z])/g, ' $1').trim();
      const finalKey = formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);
      message += `${finalKey}: ${value}\n`;
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true,
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
      text: message,
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
