type MoneyObject = {
  amount?: number | string | null;
  currency?: string | null;
};

function isMoneyObject(v: unknown): v is MoneyObject {
  return typeof v === "object" && v !== null && "amount" in v;
}

export function moneyToNumber(value: unknown): number | null {
  if (value == null) return null;

  // Some payloads: { amount: 12345, currency: "USD" }
  if (isMoneyObject(value)) {
    const amt = value.amount;

    if (typeof amt === "number") return Number.isFinite(amt) ? amt : null;

    if (typeof amt === "string") {
      const n = Number(amt.replace(/[^0-9.-]/g, ""));
      return Number.isFinite(n) ? n : null;
    }

    return null;
  }

  if (typeof value === "number") return Number.isFinite(value) ? value : null;

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const n = Number(trimmed.replace(/[^0-9.-]/g, ""));
    return Number.isFinite(n) ? n : null;
  }

  return null;
}
