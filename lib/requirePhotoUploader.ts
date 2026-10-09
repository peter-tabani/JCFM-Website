import { getCurrentUser } from "@/lib/session";

export async function getPhotoUploader() {
  const user = await getCurrentUser();
  if (!user || user.disabledAt || (user.role !== "admin" && user.role !== "staff")) return null;
  return user;
}
