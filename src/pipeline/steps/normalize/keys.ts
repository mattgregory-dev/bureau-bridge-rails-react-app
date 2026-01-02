export type TradelineKeyParts = {
  accountName?: string | null;
  accountLast4?: string | null;
  dateOpened?: string | null; // ISO string, or anything parseable already trimmed elsewhere
  section?: string | null;
};

export function buildTradelineKey({
  accountName,
  accountLast4,
  dateOpened,
  section,
}: TradelineKeyParts): string {
  const name = (accountName || "unknown")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .replace(/\s+/g, "-");

  const last4Part = accountLast4 || "no-last4";
  const openPart = dateOpened ? dateOpened.slice(0, 10) : "no-open";
  const sectionPart = section || "unknown-section";

  return `${sectionPart}:${name}:${last4Part}:${openPart}`;
}
