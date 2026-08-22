# Payments & Accounts, Setup Guide

Everything in the donation system (checkout flow, server route, webhook, secure
storage, admin ledger, donor dashboard) is already built. To take it live you
only fill in the values below. Online giving uses **IntaSend**, a CBK-licensed
Kenyan gateway that handles **M-Pesa, card, Google Pay and Apple Pay** from one
widget. (PayPal and Stripe were removed: PayPal deactivated the ministry's
account and Stripe has no M-Pesa.)

> Never commit real keys. All secrets go in `.env` (or your host's environment
> settings). `.env*` is gitignored; only `.env.example` is tracked.

---

## 0. Environment variables

Copy the template and fill it in:

```bash
cp .env.example .env
```

| Variable | What it is | Used by |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | accounts + donations storage |
| `NEXTAUTH_SECRET` | random string (`openssl rand -base64 32`) | session signing |
| `NEXTAUTH_URL` | site URL (`http://localhost:3000` in dev) | auth callbacks |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | optional Google sign-in | auth |
| `NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY` | IntaSend publishable key (safe in browser) | donate widget |
| `NEXT_PUBLIC_INTASEND_MODE` | `sandbox` (test) or `live` (real money) | donate widget |
| `INTASEND_WEBHOOK_CHALLENGE` | secret string matching the IntaSend webhook | webhook auth |

---

## 1. Database (one-time)

1. Create a PostgreSQL database (Neon, Supabase, Vercel Postgres, or your own).
2. Paste its connection string into `DATABASE_URL`.
3. Create the tables:
   ```bash
   npx prisma db push
   ```
   (Use `db push` rather than `migrate deploy`, this project's schema is the
   source of truth.)
4. (Optional) create the first admin account:
   ```bash
   npm run db:seed
   ```

Donors create their own accounts through the normal sign-up screen, or give as
a guest with just an email for the receipt.

---

## 2. IntaSend (M-Pesa + card + Google Pay)

1. Create/sign in at <https://dashboard.intasend.com>. Complete the business
   verification so the account can receive live payments (the merchant contract
   / authorization letter step).
2. **Get your keys** — Settings -> API Keys & Wallets:
   - Copy the **Publishable key** into `NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY`.
   - Keep `NEXT_PUBLIC_INTASEND_MODE="sandbox"` while testing.
3. **Register the webhook** — Settings -> Webhooks -> Add:
   - URL: `https://YOUR_DOMAIN/api/webhooks/intasend`
     (e.g. `https://jcfm-website.vercel.app/api/webhooks/intasend`)
   - Set a **challenge** string, and put that exact same string in
     `INTASEND_WEBHOOK_CHALLENGE`. The webhook rejects any request whose
     challenge doesn't match, so no one can post fake "donation completed"
     events.
4. **Test it** — in sandbox mode, make a small donation on `/donate`. Use
   IntaSend's sandbox test numbers/cards (see their docs). Confirm the gift
   shows up in the admin **Donations** ledger as "Received".

---

## 3. Going live (test -> live)

1. In the IntaSend dashboard, switch to your **live** publishable key and set
   `NEXT_PUBLIC_INTASEND_MODE="live"`.
2. Register a **live** webhook for your real domain and set its challenge in
   `INTASEND_WEBHOOK_CHALLENGE`.
3. Set `NEXTAUTH_URL` and `NEXT_PUBLIC_BASE_URL` to your production domain.
4. On Vercel, add all of these under Project -> Settings -> Environment
   Variables (Production), then redeploy. Nothing in the code changes, only the
   environment values.
5. Do one small real donation to confirm before announcing it.

---

## 4. Security model

- **No card or M-Pesa details touch our servers.** IntaSend's widget collects
  and processes everything on its own systems. We only ever see an opaque
  reference and the completed-payment webhook.
- **Amounts are validated server-side.** `/api/donations/intasend` re-validates
  the requested amount (`lib/donations.ts`) and stores a `pending` donation
  before payment; the webhook records the actual amount IntaSend reports.
- **Designations are re-derived server-side** from the project slug, never
  trusted from the client.
- **Webhook is the source of truth.** It is challenge-authenticated and only
  flips a donation from `pending` to `succeeded` once, so repeated deliveries
  are safe (idempotent on the unique `providerRef`).
- **Passwords** are hashed with bcrypt (cost 12).
- **Secrets** live only in environment variables; only the `NEXT_PUBLIC_`
  publishable key ships to the browser (by design, it is safe to expose).

## 5. How a donation flows

1. Visitor browses `/donate`, picks a cause and amount, then signs in or
   continues as a guest (email for the receipt).
2. The client calls `/api/donations/intasend`, which validates the amount +
   designation, stores a `pending` donation, and returns a unique `api_ref`.
3. The IntaSend widget opens (M-Pesa / card / Google Pay). On success it fires a
   client event that sends the donor to the confirmation screen.
4. IntaSend calls `/api/webhooks/intasend`, which matches the `api_ref` to the
   pending donation and marks it `succeeded`.
5. The admin ledger and the donor's dashboard read the recorded donations.
