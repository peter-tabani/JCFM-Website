#!/usr/bin/env node
// Generates a salted scrypt hash for an admin password, in the
// "saltHex:hashHex" format that lib/admin.ts expects in the
// ADMIN_PASSWORD_HASH_* environment variables.
//
// Usage:
//   node scripts/hash-password.mjs "the real password"
//
// Uses only Node's built-in crypto module — no dependencies to install,
// so this is safe to run on any machine (dev laptop or the server) without
// risking cross-platform native-module issues.

import { scryptSync, randomBytes } from "crypto";

const password = process.argv[2];

if (!password) {
  console.error('Usage: node scripts/hash-password.mjs "the real password"');
  process.exit(1);
}

if (password.length < 8) {
  console.error("Please choose a password with at least 8 characters.");
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);

console.log("\nAdd this to your .env / .env.local (pick the right admin):\n");
console.log(`ADMIN_PASSWORD_HASH_ADMIN=${salt.toString("hex")}:${hash.toString("hex")}`);
console.log("\n(Swap the variable name for _BISHOP or _COORDINATOR as needed.)\n");
