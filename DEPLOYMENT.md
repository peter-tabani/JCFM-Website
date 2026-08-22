# Deploying to a Linux VPS (PM2 + Nginx)

## 1. Server prerequisites

```bash
# Node 20+ (matches next 16 / react 19 requirements)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx
sudo npm install -g pm2
```

## 2. Get the code onto the server

```bash
git clone <your-repo-url> /var/www/jcfm-website
cd /var/www/jcfm-website
```

## 3. Configure environment variables

```bash
cp .env.example .env.local
nano .env.local   # fill in real values — see checklist below
```

Required before going live:

- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`. The app now refuses to boot in production without this set.
- `NEXTAUTH_URL` — your public URL, e.g. `https://jcfm.online`
- `ADMIN_PASSWORD_HASH_ADMIN` / `_BISHOP` / `_COORDINATOR` — salted password hashes for the admin console (no Google sign-in; the console reaches sensitive donor/member data). Generate each with `node scripts/hash-password.mjs "the real password"` and paste the printed value in. An admin whose hash isn't set can't sign in.
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL` — donor welcome emails
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER` — donor welcome SMS
- `NEXT_PUBLIC_SITE_URL` — same as `NEXTAUTH_URL`
- `NEXT_PUBLIC_PAYPAL_CLIENT_ID`, `PAYPAL_CLIENT_SECRET`, `PAYPAL_MODE` — real donation processing. Both the Client ID and Secret are required (order creation and capture both happen server-side so donations can be recorded — see `lib/paypal.ts`). Leave `PAYPAL_MODE=sandbox` until you're ready for real money to move, then switch to `live` with the matching live credentials.

Also update `lib/admin.ts` with the real admin emails that should have access to `/admin`.

## 4. Install, build, start

```bash
npm install
npm run build
pm2 start ecosystem.config.js
pm2 save
pm2 startup   # follow the printed instructions to survive reboots
```

Note: `next build` fetches font files from Google Fonts at build time — the build machine needs outbound internet access (this is a Next.js `next/font` requirement, not specific to this project).

## 5. Nginx + TLS

```bash
sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/jcfm
sudo ln -s /etc/nginx/sites-available/jcfm /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Point DNS A record at the server first, then:
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d jcfm.online -d www.jcfm.online
```

Certbot edits the Nginx config in place to add the certificate and an HTTP→HTTPS redirect, and installs a systemd timer for auto-renewal.

## 6. Redeploying after changes

```bash
cd /var/www/jcfm-website
git pull
npm install
npm run build
pm2 restart jcfm-website
```

## Before you flip this live — see AUDIT.md

`AUDIT.md` (in the repo root) has the full review. The two items to resolve first:

1. Admin login's "any password" demo bypass is now disabled outside development, but confirm Google OAuth is fully configured — with it off, `/admin` is unreachable.
2. `/api/donor-welcome` and `/api/donor-sms` are unauthenticated by design (called from a public signup form) — the included `deploy/nginx.conf.example` throttles them, but review whether that's tight enough for your traffic.
