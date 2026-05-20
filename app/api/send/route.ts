import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      fullName,
      participantName,
      phone,
      email,
      suburb,
      role,
      supportType,
      planManagement,
      message,
    } = body;

    const data = await resend.emails.send({
      from: "Kora Reach Website <onboarding@resend.dev>",
      to: "info@korareach.com.au",
      subject: `New NDIS Enquiry: ${fullName}`,
      html: `
        <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E9F0E8; border-radius: 8px;">
          <h2 style="color: #2D5A27; border-bottom: 2px solid #E9F0E8; padding-bottom: 10px;">New Intake Enquiry</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Role:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${role}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Contact Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${fullName}</td>
            </tr>
            ${
              participantName
                ? `
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Participant Name:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #D4A373;"><strong>${participantName}</strong></td>
            </tr>`
                : ""
            }
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${phone}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Suburb:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${suburb}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Plan Management:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${planManagement}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Support Needed:</strong></td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${supportType}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 16px; background-color: #FDFBF7; border-radius: 6px;">
            <h3 style="margin-top: 0; color: #2D5A27;">Message / Goals:</h3>
            <p style="white-space: pre-wrap; color: #1A1A1A;">${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
