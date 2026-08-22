# Deploying JCFM

* Host: `91.98.121.13` (same box as smart-auction)
* Deploy user: `deploy` (needs sudo rights, SSH key access — arranged separately, same as smart-auction)
* Domain: `jcfm.online` (registered) — this is now the default in `push_deploy.sh` / `deploy.sh`. Override with `DOMAIN=other.domain ./push_deploy.sh` if ever needed.
* Target path: `/var/www/jcfm`

## DNS — point the domain at the server without breaking email

`jcfm.online`'s email (Zoho Mail) and its website are two separate sets of DNS records at your registrar/DNS provider — adding the website's record does not touch the email ones, as long as you only touch the right record types:

* **Add** an `A` record: host `@`, value `91.98.121.13` (the website).
* **Add** an `A` (or `CNAME`) record: host `www`, value `91.98.121.13` (or `jcfm.online`).
* **Leave untouched**: the `MX` records and any Zoho verification `TXT`/`CNAME` records already there from the mailbox setup — those are what make `info@jcfm.online` keep working. Don't delete or replace them.

DNS changes can take anywhere from a few minutes to a few hours to propagate.

## What's needed on the server

Node.js 20+, npm, nginx, rsync, certbot (for HTTPS later). No database — this app has no persistent backend store (admin allowlist and site content are static/config files in the repo).

## One-time server bootstrap (before the first deploy)

`push_deploy.sh` rsyncs as the `deploy` user, but `/var/www/jcfm` won't exist yet on a fresh box, and `deploy` deliberately doesn't have sudo rights broad enough to create arbitrary directories under `/var/www` — that's a security boundary, not an oversight. So the target directory has to be created once, as root or another sudo-capable account:

```bash
sudo mkdir -p /var/www/jcfm
sudo chown deploy:deploy /var/www/jcfm
```

After that, `deploy` owns the directory outright and every future `push_deploy.sh`/`deploy.sh` run works without needing root again.

## Deploy process — two ways

1. **From your Mac:** `cd JCFM-Website-master/deploy && ./push_deploy.sh` — rsyncs the source to the server, then SSHes in and runs `deploy.sh` remotely.
2. **Directly on the server:** rsync/`git pull` the repo into `/var/www/jcfm`, then as the `deploy` user run `/var/www/jcfm/deploy/deploy.sh`.

Note this differs from smart-auction's pattern in one way: we don't build the frontend locally before syncing. Next.js resolves platform-specific native binaries (Sharp, SWC) at `npm install` time, so a build done on your Mac won't run on the Linux server — `deploy.sh` runs `npm install` + `npm run build` on the server itself, where the binaries match.

`deploy.sh` is idempotent — safe to re-run. Each run reinstalls dependencies, rebuilds, and restarts the `jcfm-website` systemd service. It never overwrites an existing `.env` or an existing nginx config on redeploys (to avoid clobbering certbot's HTTPS edits).

## systemd service

`deploy/jcfm-website.service` runs `next start -p 3000` as the `deploy` user, reading secrets from `/var/www/jcfm/.env`. Installed/refreshed on every deploy.

```
sudo systemctl status jcfm-website
sudo journalctl -u jcfm-website -f
```

## nginx setup

* Listens on `:80`, `server_name <your domain>`
* Proxies everything to the Next.js server on `127.0.0.1:3000`
* Caches `/_next/static/` and `/images/` aggressively
* Rate-limits `/api/donor-welcome` and `/api/donor-sms` (unauthenticated endpoints that send email/SMS — see `AUDIT.md`) to 5 requests/min per IP
* Config lives in `deploy/nginx.conf.example`, installed to `/etc/nginx/sites-available/jcfm` only if that file doesn't already exist, same protect-certbot-edits rule as `.env`

## `deploy` user sudo access

The `deploy` user needs passwordless sudo for the handful of commands `deploy.sh` runs as root. Example `/etc/sudoers.d/deploy-jcfm` (adjust paths if smart-auction already grants some of these):

```
deploy ALL=(root) NOPASSWD: /bin/cp * /etc/nginx/sites-available/jcfm
deploy ALL=(root) NOPASSWD: /bin/cp * /etc/systemd/system/jcfm-website.service
deploy ALL=(root) NOPASSWD: /usr/bin/tee /etc/nginx/sites-available/jcfm
deploy ALL=(root) NOPASSWD: /bin/ln -sf * /etc/nginx/sites-enabled/jcfm
deploy ALL=(root) NOPASSWD: /usr/sbin/nginx -t
deploy ALL=(root) NOPASSWD: /bin/systemctl daemon-reload
deploy ALL=(root) NOPASSWD: /bin/systemctl enable jcfm-website
deploy ALL=(root) NOPASSWD: /bin/systemctl restart jcfm-website
deploy ALL=(root) NOPASSWD: /bin/systemctl reload nginx
deploy ALL=(root) NOPASSWD: /bin/systemctl status jcfm-website
```

## Manual one-time steps after first deploy

1. Fill in real values in `/var/www/jcfm/.env` — `NEXTAUTH_SECRET` (`openssl rand -base64 32`), `ADMIN_PASSWORD_HASH_ADMIN`/`_BISHOP`/`_COORDINATOR` (generate with `node scripts/hash-password.mjs "the real password"`), `RESEND_API_KEY`, `TWILIO_*`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_PAYPAL_CLIENT_ID` + `PAYPAL_CLIENT_SECRET` + `PAYPAL_MODE` (real donation processing — see AUDIT.md/`.env.example` for details). The app won't fully work — and admin login won't start for an account whose hash isn't set — until these are set. See `AUDIT.md` for why.
2. Edit `lib/admin.ts` on the server with the real admin emails, then re-run `deploy.sh` (or just `npm run build && sudo systemctl restart jcfm-website`).
3. Point `jcfm.online`'s DNS at `91.98.121.13` (see the DNS section above) — `DOMAIN` already defaults to `jcfm.online` in the deploy scripts, so no override needed once DNS is live.
4. Once DNS + plain HTTP work: `sudo certbot --nginx -d jcfm.online -d www.jcfm.online` for HTTPS.
5. Confirm the site loads at `http://jcfm.online`, then `https://` after certbot.

## Note on `ecosystem.config.js`

The repo also has a PM2 `ecosystem.config.js` from an earlier draft of this deploy setup. It's not used by `deploy.sh` — this project now follows the same systemd-based pattern as smart-auction — but it's harmless to leave in place if you ever want to run the app locally under PM2 instead.
