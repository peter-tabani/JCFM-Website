# Payments & Accounts — Setup Guide

This document lists **everything you need to do by hand** to take the donation
system live. All the code (checkout flow, server payment routes, webhooks,
secure storage, dashboard) is already built and works in **test mode** once the
values below are filled in.

> ⛔ **Never commit real keys.** All secrets go in `.env.local` (or your host's
> environment settings). `.env*` is gitignored; only `.env.example` is tracked.

---

## 0. Environment variables

Copy the template and fill it in:

```bash
cp .env.example .env.local
```

Variables used by the app (see `.env.example` for the full annotated list):

| Variable | What it is | Used by |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | accounts + donations storage |
| `NEXTAUTH_SECRET` | random string (`openssl rand -base64 32`) | session signing |
| `NEXTAUTH_URL` | site URL (`http://localhost:3000` in dev) | auth callbacks |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | optional Google sign-in | auth |
| `STRIPE_SECRET_KEY` | `sk_test_…` → `sk_live_…` | server payment route |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_…` → `pk_live_…` | client checkout |
| `STRIPE_WEBHOOK_SECRET` | `whsec_…` from the webhook you register | Stripe webhook |
| `PAYPAL_CLIENT_ID` / `PAYPAL_CLIENT_SECRET` | sandbox → live REST app creds | server |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | PayPal client id (public) | client buttons |
| `PAYPAL_ENV` | `sandbox` (test) or `live` | server |
| `PAYPAL_WEBHOOK_ID` | id of the webhook you register | PayPal webhook |

---

## 1. Database (one-time)

1. Create a PostgreSQL database (Neon, Supabase, Vercel Postgres, or your own).
2. Paste its connection string into `DATABASE_URL`.
3. Apply the schema:
   ```bash
   npm run db:migrate      # runs: prisma migrate deploy
   ```
4. (Optional) Create the first admin account:
   ```bash
   # optionally set SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD first
   npm run db:seed
   ```
   Default admin: `admin@jcfm.org` / `ChangeMe123!` — **change this password**.

Donors create their own accounts through the normal sign-up screen.

---

## 2. Stripe (cards + Cash App Pay)

Stripe runs **both** card payments and **Cash App Pay**. There is no separate
Cash App API for the web — it is a payment method *inside* Stripe.

1. Create/sign in at <https://dashboard.stripe.com> and stay in **Test mode**
   (toggle, top-right) for now.
2. **Get your API keys** — Developers → API keys:
   - Publishable key (`pk_test_…`) → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key (`sk_test_…`) → `STRIPE_SECRET_KEY`
3. **Enable Cash App Pay** — Settings → Payment methods → enable **Cash App
   Pay**. (Cards are on by default. The checkout uses Stripe's automatic
   payment methods, so anything you enable here appears automatically.)
   - Note: Cash App Pay only settles in **USD** for **US** customers; this site
     charges in USD.
4. **Register the webhook** — Developers → Webhooks → *Add endpoint*:
   - Endpoint URL: `https://YOUR_DOMAIN/api/webhooks/stripe`
     (e.g. `https://jcfm.org/api/webhooks/stripe`)
   - Events to send: `payment_intent.succeeded` and
     `payment_intent.payment_failed`
   - After creating it, copy the **Signing secret** (`whsec_…`) →
     `STRIPE_WEBHOOK_SECRET`.
   - **Local testing:** use the Stripe CLI instead of a public URL:
     ```bash
     stripe listen --forward-to localhost:3000/api/webhooks/stripe
     ```
     The CLI prints a `whsec_…` to use locally.
5. **Test card:** `4242 4242 4242 4242`, any future expiry, any CVC/ZIP.

---

## 3. PayPal

1. Go to <https://developer.paypal.com> → Dashboard → **Apps & Credentials**.
2. Stay on **Sandbox** for testing. Create an app (or use the default) and copy:
   - Client ID → `PAYPAL_CLIENT_ID` **and** `NEXT_PUBLIC_PAYPAL_CLIENT_ID`
   - Secret → `PAYPAL_CLIENT_SECRET`
   - Set `PAYPAL_ENV=sandbox`.
3. **Register the webhook** — in the app settings → *Add Webhook*:
   - URL: `https://YOUR_DOMAIN/api/webhooks/paypal`
   - Event types: at minimum `PAYMENT.CAPTURE.COMPLETED`
     (also `PAYMENT.CAPTURE.DENIED` if you want failed captures recorded).
   - Copy the generated **Webhook ID** → `PAYPAL_WEBHOOK_ID`.
   - **Local testing:** PayPal needs a public URL. Use a tunnel
     (`ngrok http 3000`) and register the tunnel URL, or use the Webhooks
     simulator in the developer dashboard.
4. **Test buyer:** use a sandbox personal account from
   *Testing Tools → Sandbox Accounts*.

---

## 4. Going live (test → live)

When you're happy with test mode:

1. **Stripe:** flip the dashboard to **Live**, copy the live keys
   (`sk_live_…`, `pk_live_…`), register a **live** webhook for your real
   domain, and update the three Stripe env vars.
2. **PayPal:** create/switch to a **Live** REST app, set `PAYPAL_ENV=live`,
   update the client id/secret and the live `PAYPAL_WEBHOOK_ID`.
3. Set `NEXTAUTH_URL` and `NEXT_PUBLIC_BASE_URL` to your production domain.
4. Redeploy. Nothing in the code changes — only environment values.

---

## 5. Security model & assumptions

- **No card data touches our servers.** Stripe (Payment Element) and PayPal
  collect and tokenise all payment details on their own systems. We only ever
  see an opaque payment/order id.
- **Amounts are validated server-side.** The browser sends a requested amount,
  but the server re-validates it (`lib/donations.ts`) and creates the
  Stripe/PayPal charge from the validated value. A tampered client amount
  cannot change what is charged.
- **Designations are re-derived server-side.** The stored label comes from the
  project slug on the server, not from anything the client sends.
- **Accounts are required to donate.** The payment routes reject unauthenticated
  requests (HTTP 401). Donations are tied to the signed-in user's id.
- **Webhooks are verified.** Stripe events are checked with the signing secret;
  PayPal events are verified via PayPal's verify-webhook-signature API. The
  webhook is the source of truth that flips a donation to `succeeded`.
- **Idempotent fulfilment.** Each donation row has a unique `providerRef`
  (payment intent / order id). Webhook handlers only flip rows that are still
  `pending`, so repeated deliveries are safe.
- **Passwords** are hashed with bcrypt (cost 12); plaintext is never stored.
- **Secrets** live only in environment variables; the secret keys are never
  imported into client components (only the `NEXT_PUBLIC_*` publishable ids
  are).

## 6. How a donation flows

1. Visitor browses `/donate`, picks a cause and amount.
2. They must sign in / create an account (required) before paying.
3. **Stripe:** the client asks `/api/donations/stripe`, which validates the
   amount, creates a PaymentIntent, and stores a `pending` donation. The
   Payment Element collects payment; on success Stripe redirects to the
   confirmation screen and fires `payment_intent.succeeded` to
   `/api/webhooks/stripe`, which marks the donation `succeeded`.
4. **PayPal:** `/api/donations/paypal/create-order` stores a `pending` donation
   and returns an order id; after approval the client calls
   `/api/donations/paypal/capture-order`; the `PAYMENT.CAPTURE.COMPLETED`
   webhook also confirms it.
5. The donor's dashboard reads their `succeeded` (and pending) donations.
