#!/usr/bin/env bash
# Runs ON THE SERVER, as the `deploy` user, from inside the app directory
# (i.e. /var/www/jcfm/deploy/deploy.sh, or via push_deploy.sh over SSH).
#
# Idempotent — safe to re-run. Rebuilds and restarts the app every time,
# but never overwrites an existing .env or an existing nginx site config,
# so it won't clobber certbot's HTTPS edits on redeploy.
#
# Requires on the server (installed once, manually, not by this script):
#   Node.js 20+, npm, nginx, rsync
# Requires for the `deploy` user:
#   passwordless sudo for: systemctl, nginx -t, cp/ln into
#   /etc/nginx and /etc/systemd/system (see README.md for a sudoers example)

set -euo pipefail

APP_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SERVICE_NAME="jcfm-website"
NGINX_SITE="jcfm"
DOMAIN="${DOMAIN:-jcfm.online}"

cd "$APP_DIR"
echo "==> Deploying JCFM website in $APP_DIR"

# ── 1. Sanity-check prerequisites ────────────────────────────────────────
command -v node >/dev/null || { echo "Node.js is not installed — install Node 20+ first."; exit 1; }
command -v npm  >/dev/null || { echo "npm is not installed."; exit 1; }
command -v nginx >/dev/null || { echo "nginx is not installed."; exit 1; }

NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
if [ "$NODE_MAJOR" -lt 20 ]; then
  echo "Node $NODE_MAJOR found, but Next.js 16 / React 19 need Node 20+."
  exit 1
fi

# ── 2. Environment file — never overwrite an existing one ───────────────
if [ ! -f .env ]; then
  cp .env.example .env
  echo "!! Created .env from .env.example — fill in real values before"
  echo "   the app will work (NEXTAUTH_SECRET, ADMIN_PASSWORD_HASH_*, Resend, Twilio)."
else
  echo "==> .env already present, leaving it as-is."
fi

if grep -qE '^NEXTAUTH_SECRET=\s*$' .env 2>/dev/null; then
  echo "!! NEXTAUTH_SECRET is empty in .env — the app will refuse to start"
  echo "   in production until you set it. Generate one with:"
  echo "     openssl rand -base64 32"
fi

# ── 3. Install deps + build ──────────────────────────────────────────────
echo "==> Installing dependencies"
if [ -f package-lock.json ]; then
  npm ci --no-audit --no-fund
else
  npm install --no-audit --no-fund
fi

echo "==> Building (needs outbound internet for Google Fonts)"
npm run build

# ── 4. systemd service — always (re)installed, it's app code we own ─────
echo "==> Installing systemd service"
sudo cp "deploy/${SERVICE_NAME}.service" "/etc/systemd/system/${SERVICE_NAME}.service"
sudo systemctl daemon-reload
sudo systemctl enable "$SERVICE_NAME"
sudo systemctl restart "$SERVICE_NAME"

# ── 5. nginx site — only installed if it doesn't exist yet, so we never ─
#       stomp on certbot's HTTPS edits to an existing config.
if [ ! -f "/etc/nginx/sites-available/${NGINX_SITE}" ]; then
  echo "==> Installing nginx site for ${DOMAIN}"
  sed "s/__DOMAIN__/${DOMAIN}/g" deploy/nginx.conf.example \
    | sudo tee "/etc/nginx/sites-available/${NGINX_SITE}" >/dev/null
  sudo ln -sf "/etc/nginx/sites-available/${NGINX_SITE}" "/etc/nginx/sites-enabled/${NGINX_SITE}"
  sudo nginx -t
  sudo systemctl reload nginx
else
  echo "==> nginx site already exists at /etc/nginx/sites-available/${NGINX_SITE}, leaving it as-is."
  echo "    (delete it manually first if you need to re-run domain substitution)"
fi

# ── 6. Health check ───────────────────────────────────────────────────────
echo "==> Waiting for the app to come up..."
sleep 3
if curl -sf http://127.0.0.1:3000/ -o /dev/null; then
  echo "==> App is responding on :3000"
else
  echo "!! App did not respond on :3000 — check: sudo journalctl -u ${SERVICE_NAME} -n 50"
fi

sudo systemctl status "$SERVICE_NAME" --no-pager -l | head -10

echo ""
echo "==> Done. Remaining manual steps (see README.md):"
echo "    1. Fill in real values in .env if you haven't yet"
echo "    2. Set real admin emails in lib/admin.ts, then rebuild/restart"
echo "    3. Point DNS for ${DOMAIN} at this server"
echo "    4. Once DNS + plain HTTP work: sudo certbot --nginx -d ${DOMAIN}"
