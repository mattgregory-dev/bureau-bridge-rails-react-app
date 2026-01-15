export function dateToISO(
  value: string | number | null | undefined
): string | null {
  if (value == null) return null;

  // Epoch ms
  if (typeof value === "number") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
  }

  // Strings: try Date parse; keep if valid
  if (typeof value === "string") {
    const s = value.trim();
    if (!s) return null;
    const d = new Date(s);
    return Number.isNaN(d.getTime()) ? null : d.toISOString();
  }

  return null;
}
