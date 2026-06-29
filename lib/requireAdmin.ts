import { getCurrentUser } from "@/lib/session";

// Returns the signed-in user only if they are an admin, else null.
// Every admin API route uses this to gate writes/reads.
export async function getAdmin() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return null;
  return user;
}
