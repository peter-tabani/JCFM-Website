#!/usr/bin/env bash
# Run FROM YOUR MAC: cd JCFM-Website-master/deploy && ./push_deploy.sh
#
# Rsyncs the source to the server, then SSHes in and runs deploy.sh there.
#
# Unlike a static-frontend project, this does NOT build locally first —
# Next.js pulls in platform-specific native binaries (Sharp for image
# optimization, SWC for the compiler) that are resolved per-OS/arch at
# `npm install` time. A build done on a Mac (esp. Apple Silicon) won't
# run on the Linux server. So we ship source only and build remotely,
# inside deploy.sh, where `npm install` resolves the right binaries.
#
# Override any of these inline, e.g.:
#   DOMAIN=jcfm.online ./push_deploy.sh

set -euo pipefail

REMOTE_HOST="${REMOTE_HOST:-91.98.121.13}"
REMOTE_USER="${REMOTE_USER:-deploy}"
REMOTE_PATH="${REMOTE_PATH:-/var/www/jcfm}"
DOMAIN="${DOMAIN:-jcfm.online}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "==> Syncing $PROJECT_ROOT -> ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}"
rsync -az --delete \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  --exclude '.env' \
  --exclude '.env.local' \
  --exclude '.DS_Store' \
  --exclude 'var' \
  "$PROJECT_ROOT/" "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}/"
  # --exclude 'var' is NOT optional: real donation records captured from
  # PayPal live at var/donations.json on the SERVER only (see
  # lib/donations-store.ts). Without this exclude, --delete would wipe that
  # file on every single redeploy since it never exists in the local source.

echo "==> Running deploy.sh on ${REMOTE_HOST}"
ssh "${REMOTE_USER}@${REMOTE_HOST}" \
  "cd '${REMOTE_PATH}/deploy' && DOMAIN='${DOMAIN}' ./deploy.sh"

echo "==> Done."
