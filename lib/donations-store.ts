import { promises as fs } from "fs";
import path from "path";

// Flat-file store for real, gateway-confirmed donations (PayPal, IntaSend, or
// manually-logged bank transfers) — this project has no
// database (see AUDIT.md), and a single JSON file is enough for the volume
// a church site like this sees. Lives OUTSIDE public/ and outside data/
// (which holds static site config, not runtime records) so it's never
// served as a static asset and never confused with checked-in content.
//
// IMPORTANT: this file lives on the SERVER only. It must stay excluded from
// push_deploy.sh's rsync (see deploy/push_deploy.sh) — that rsync runs with
// --delete, so without the exclude, every redeploy would wipe real donation
// history. It's also .gitignore'd so donor names/emails never end up in git.
const STORE_PATH = path.join(process.cwd(), "var", "donations.json");

export type StoredDonation = {
  id: string;
  date: string; // ISO timestamp
  donor: string;
  donorEmail?: string;
  channel: "PayPal" | "IntaSend" | "Bank Transfer";
  ref: string; // processor's order/invoice ID (or a manual note for bank transfers)
  allocation: string;
  amount: number;
  currency: string;
  status: "received";
};

async function ensureStore() {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  try {
    await fs.access(STORE_PATH);
  } catch {
    await fs.writeFile(STORE_PATH, "[]", "utf8");
  }
}

export async function readDonations(): Promise<StoredDonation[]> {
  await ensureStore();
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function appendDonation(record: StoredDonation): Promise<void> {
  await ensureStore();
  const donations = await readDonations();

  // Idempotency guard — if a capture request is ever retried with the same
  // PayPal capture ID, don't double-record it.
  if (donations.some((d) => d.id === record.id)) return;

  donations.unshift(record);
  await fs.writeFile(STORE_PATH, JSON.stringify(donations, null, 2), "utf8");
}
