export function normalizeLoginPhone(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  let digits = trimmed.replace(/[^\d]/g, "");
  if (trimmed.startsWith("+")) {
    // Preserve an international E.164 prefix entered by the user.
  } else if (digits.startsWith("0") && (digits.length === 10 || digits.length === 9)) {
    digits = `254${digits.slice(1)}`;
  } else if (digits.startsWith("254")) {
    // Already supplied Kenya's country code.
  } else {
    return null;
  }

  const normalized = `+${digits}`;
  return /^\+[1-9]\d{7,14}$/.test(normalized) ? normalized : null;
}
