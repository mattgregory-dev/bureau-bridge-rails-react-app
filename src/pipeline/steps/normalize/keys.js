/**
 * Build a stable key used later to group the same tradeline across bureaus.
 * This is intentionally tolerant: it will work even when fields are missing.
 */
export function buildTradelineKey({ creditorName, accountLast4, openedOnISO, section }) {
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