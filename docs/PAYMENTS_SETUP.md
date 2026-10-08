# Online donations setup

The public Donate page accepts General Fund gifts in US dollars. Visitors enter
an amount and continue to IntaSend's card checkout. An account and email are
not required by this website. IntaSend may ask donors for billing details on
its own secure payment screen.

IntaSend has no setup fee; it charges a fee per completed transaction. Its
current pricing is published at <https://intasend.com/pricing/>. USD checkout
offers cards and Apple Pay or Google Pay when enabled on your IntaSend account.
M-Pesa is shown for KES checkout, so this USD flow does not advertise M-Pesa.

## Vercel production settings

In the `jcfm-website` project's Settings > Environment Variables, set:

| Variable | Production value |
| --- | --- |
| `DATABASE_URL` | Existing Neon connection string; already present in the project |
| `NEXTAUTH_SECRET` | A new long random secret for admin sessions |
| `NEXTAUTH_URL` | `https://jesuschristfounderministry.com` |
| `NEXT_PUBLIC_INTASEND_PUBLISHABLE_KEY` | IntaSend **live publishable key** |
| `NEXT_PUBLIC_INTASEND_MODE` | `live` |
| `INTASEND_WEBHOOK_CHALLENGE` | The same long random challenge configured on the IntaSend webhook |

`NEXT_PUBLIC_BASE_URL` is optional; if used, set it to
`https://jesuschristfounderministry.com`. Google sign-in is optional and needs
its own Google credentials. Use IntaSend test keys and `sandbox` mode in a
Preview deployment for testing; do not charge real donors until a test succeeds.
Changing a `NEXT_PUBLIC_` value requires a fresh Vercel deployment because
Next.js embeds it into the browser bundle at build time.

Never put a secret key in a `NEXT_PUBLIC_` variable, commit `.env`, or paste a
secret into a chat or repository. `.env*` is ignored by Git; `.env.example`
contains placeholders only.

## IntaSend webhook

Register the `collection_event` webhook in IntaSend for:

`https://jesuschristfounderministry.com/api/webhooks/intasend`

Set a challenge there and put the same value in Vercel as
`INTASEND_WEBHOOK_CHALLENGE`. The endpoint compares the challenge, checks the
invoice against IntaSend's payment status API, and only records a gift as
received when the reference, currency and amount match the pending donation.
The website never handles card data. Failed verification leaves the gift
pending rather than reporting money received.

After configuring production, deploy the latest `master` commit, make one
small real donation, and confirm it appears as **Received** in the admin
Donations ledger. A donor-facing success message only appears after the webhook
has confirmed the transaction; if the webhook is delayed, the page says the
payment is being verified. Check IntaSend's Webhooks > Events if a paid gift
remains pending.

## Current launch scope

Only General Fund is active. Project cards and project-specific payments are
disabled until the ministry supplies verified project titles, descriptions,
photos and progress. The old donor portal remains outside the public navigation;
anonymous gifts cannot appear in a personal account history.
