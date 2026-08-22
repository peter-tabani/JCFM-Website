import nodemailer from "nodemailer";

// Shared SMTP mailer — sends through the ministry's real Zoho Mail mailbox
// instead of a third-party transactional API. Every value comes from the
// server's environment; nothing is ever hardcoded here.
//
// Required env vars (see .env.example):
//   SMTP_HOST      e.g. smtppro.zoho.com
//   SMTP_PORT      465 (SSL) or 587 (TLS)
//   SMTP_USER      the sending mailbox, e.g. info@jcfm.online
//   SMTP_PASS      that mailbox's password (or a Zoho app-specific
//                  password, recommended if 2FA is on)
//   SMTP_FROM      optional "Display Name <address>" override for the
//                  From header — falls back to SMTP_USER
//
// Zoho's IMAP/POP/SMTP hosts and ports are shown under
// Mail Admin Console → Email Setup → Go Mobile → Configurations.

let cachedTransporter: ReturnType<typeof nodemailer.createTransport> | null = null;

export function getMailer() {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error(
      "SMTP is not configured — set SMTP_HOST, SMTP_USER and SMTP_PASS in .env (see .env.example)."
    );
  }

  cachedTransporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // 465 = implicit SSL, 587 = STARTTLS
    auth: { user, pass },
  });

  return cachedTransporter;
}

export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const transporter = getMailer();
  const from = process.env.SMTP_FROM || process.env.SMTP_USER!;

  return transporter.sendMail({
    from,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    replyTo: opts.replyTo,
  });
}
