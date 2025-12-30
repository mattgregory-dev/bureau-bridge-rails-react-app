export function moneyToNumber(value) {
  if (value == null) return null;

  // Some payloads: { amount: 12345, currency: "USD" }
  if (typeof value === "object") {
    if (typeof value.amount === "number") return value.amount;
    if (typeof value.amount === "string") {
      const n = Number(value.amount.replace(/[^0-9.-]/g, ""));
      return Number.isFinite(n) ? n : null;
    }
  }

  if (typeof value === "number") return value;

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const n = Number(trimmed.replace(/[^0-9.-]/g, ""));
    return Number.isFinite(n) ? n : null;
  }

  return null;
}
