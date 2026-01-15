export function last4(value: unknown): string | null {
  if (value == null) return null;

  const digits = String(value).replace(/\D/g, "");
  if (digits.length < 4) return digits.length ? digits : null;

  return digits.slice(-4);
}

export function normalizeText(value: unknown): string | null {
  if (value == null) return null;

  const s = String(value).trim();
  return s ? s : null;
}

export function normalizeProvider(value: unknown): string {
  const p = normalizeText(value);
  return p ? p.toUpperCase() : "UNKNOWN";
}
