import { normalizeText, last4, normalizeProvider } from "./strings";
import { dateToISO } from "./dates";
import { moneyToNumber } from "./money";
import { buildTradelineKey } from "./keys";

export function normalizeAccountV1(rawAcc, { provider, section }, { debug = false } = {}) {
  // Be defensive: payload shapes vary.
  const creditorName =
    normalizeText(rawAcc?.accountName) ||
    normalizeText(rawAcc?.creditorName) ||
    normalizeText(rawAcc?.subscriberName) ||
    normalizeText(rawAcc?.furnisherName) ||
    "Unknown";

  const accountLast4 = last4(rawAcc?.accountNumber ?? rawAcc?.account ?? rawAcc?.accountIdentifier);

  const openedOnISO =
    dateToISO(rawAcc?.accountOpenedDate) ||
    dateToISO(rawAcc?.dateOpened) ||
    dateToISO(rawAcc?.openedOn);

  const closedOnISO = dateToISO(rawAcc?.dateClosed ?? rawAcc?.closedOn);

  const status =
    normalizeText(rawAcc?.accountStatus) ||
    normalizeText(rawAcc?.status);

  const loanType =
    normalizeText(rawAcc?.loanType) ||
    normalizeText(rawAcc?.type) ||
    normalizeText(rawAcc?.accountType);

  const balances = {
    balance: moneyToNumber(rawAcc?.balanceAmount ?? rawAcc?.balance),
    pastDue: moneyToNumber(rawAcc?.pastDueAmount ?? rawAcc?.pastDue),
    highBalance: moneyToNumber(rawAcc?.highBalanceAmount ?? rawAcc?.highBalance),
    creditLimit: moneyToNumber(rawAcc?.creditLimitAmount ?? rawAcc?.creditLimit),
    payment: moneyToNumber(rawAcc?.monthlyPaymentAmount ?? rawAcc?.monthlyPayment),
  };

  const normalized = {
    provider: normalizeProvider(provider),
    section, // e.g. "revolvingAccounts" for now; you can rename later
    creditorName,
    accountLast4,
    openedOnISO,
    closedOnISO,
    status,
    loanType,
    balances,
    // Placeholder for later steps:
    late: null,
    flags: null,
    tradelineKey: null,
  };

  normalized.tradelineKey = buildTradelineKey({
    creditorName: normalized.creditorName,
    accountLast4: normalized.accountLast4,
    openedOnISO: normalized.openedOnISO,
    section: normalized.section,
  });

  if (debug) normalized._raw = rawAcc; // debug-only raw attachment

  return normalized;
}