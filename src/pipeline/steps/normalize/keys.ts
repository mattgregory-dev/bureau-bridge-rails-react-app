export type TradelineKeyParts = {
  creditorName?: string | null;
  accountLast4?: string | null;
  openedOnISO?: string | null; // ISO string, or anything parseable already trimmed elsewhere
  section?: string | null;
};

export function buildTradelineKey({
  creditorName,
  accountLast4,
  openedOnISO,
  section,
}: TradelineKeyParts): string {
  const name = (creditorName || "unknown")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, "-");

  const last4Part = accountLast4 || "no-last4";
  const openPart = openedOnISO ? openedOnISO.slice(0, 10) : "no-open";
  const sectionPart = section || "unknown-section";

  return `${sectionPart}:${name}:${last4Part}:${openPart}`;
}
