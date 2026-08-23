import { NextResponse } from "next/server";

// ─────────────────────────────────────────────────────
// Install Resend: npm install resend
// Sign up free at https://resend.com
// Add to .env.local:
//   RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
//   RESEND_FROM_EMAIL=noreply@yourdomain.com
//      (use onboarding@resend.dev for testing)
// ─────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: email,
      subject: "Welcome to the Fountain of Hope Academy Donor Family 🎓",
      html: `
        <!DOCTYPE html>
        <html>
        <body style="font-family: Georgia, serif; background: #f8f4ea; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 40px auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
            
            <!-- Header -->
            <div style="background: #0f172a; padding: 40px 40px 32px;">
              <div style="display: inline-block; border: 2px solid #d97706; border-radius: 50%; width: 48px; height: 48px; text-align: center; line-height: 48px; color: #d97706; font-weight: bold; font-size: 20px; margin-bottom: 16px;">F</div>
              <h1 style="color: #d97706; margin: 0 0 4px; font-size: 28px; font-weight: 600;">Fountain of Hope Academy</h1>
              <p style="color: rgba(255,255,255,0.5); margin: 0; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;">Integrity, Courage, Excellence</p>
            </div>

            <!-- Body -->
            <div style="padding: 40px;">
              <h2 style="color: #0f172a; font-size: 24px; margin: 0 0 16px;">Welcome, ${name}! 🙏</h2>
              <p style="color: #475569; line-height: 1.8; margin: 0 0 16px;">
                Thank you for joining our donor family. Your decision to support Fountain of Hope Academy means everything to us, and to the children who walk through our gates every morning.
              </p>
              <p style="color: #475569; line-height: 1.8; margin: 0 0 32px;">
                You can now log in to your donor portal to choose how you'd like to support us, whether by sponsoring a child, making a direct donation, or following our school's growth journey.
              </p>

              <!-- CTA -->
              <div style="text-align: center; margin: 32px 0;">
                <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/donors/portal" 
                   style="background: #d97706; color: white; padding: 14px 32px; border-radius: 999px; text-decoration: none; font-weight: 600; font-size: 15px; display: inline-block;">
                  Go to My Donor Portal →
                </a>
              </div>

              <!-- Quote -->
              <div style="border-left: 4px solid #d97706; background: #fffaf2; padding: 16px 20px; border-radius: 0 12px 12px 0; margin: 32px 0;">
                <p style="color: #78350f; font-style: italic; margin: 0 0 8px; line-height: 1.8;">
                  "Our goal is that 75% of our learners are fully sponsored, the fortunate and less fortunate, educated together, as equals."
                </p>
                <p style="color: #92400e; font-size: 13px; font-weight: 600; margin: 0;">Mr. Noah Mweruphe, Director</p>
              </div>

              <p style="color: #475569; line-height: 1.8; margin: 24px 0 0;">
                If you have any questions, simply reply to this email and we
                will get back to you.
              </p>
            </div>

            <!-- Footer -->
            <div style="background: #f8fafc; padding: 24px 40px; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 12px; margin: 0; line-height: 1.8;">
                Fountain of Hope Academy<br/>
                Along Approved-Shelleybeach Road, Likoni - Shelley Beach, Mombasa<br/>
                <a href="mailto:info@jcfm.online" style="color: #d97706;">info@jcfm.online</a>
              </p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}