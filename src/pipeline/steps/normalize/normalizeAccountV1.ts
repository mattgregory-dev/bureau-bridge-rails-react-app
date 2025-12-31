import { normalizeText, last4, normalizeProvider } from "./strings";
import { dateToISO } from "./dates";
import { moneyToNumber } from "./money";
import { buildTradelineKey } from "./keys";

type NormalizeMeta = {
  provider: string;
  section: string;
};

type NormalizeOptions = {
  debug?: boolean;
};

// Loose input type. Your bureau payloads vary.
// Use this until you introduce runtime validation (zod, etc.).
type RawAccount = Record<string, unknown> | null | undefined;

export type NormalizedBalances = {
  balance: number | null;
  pastDue: number | null;
  highBalance: number | null;
  creditLimit: number | null;
  payment: number | null;
};

export type NormalizedAccountV1 = {
  provider: string;
  section: string;
  creditorName: string;
  accountLast4: string | null;
  openedOnISO: string | null;
  closedOnISO: string | null;
  status: string | null;
  loanType: string | null;
  balances: NormalizedBalances;

  late: null;
  flags: null;
  tradelineKey: string;
};

export function normalizeAccountV1(
  rawAcc: RawAccount,
  { provider, section }: NormalizeMeta,
  { debug = false }: NormalizeOptions = {}
): NormalizedAccountV1 {
  // Be defensive: payload shapes vary.

  // Preserve your existing optional-chaining style by treating as an object-like.
  const acc = (rawAcc ?? {}) as Record<string, any>;

  const creditorName = normalizeText(acc?.accountName) || "Unknown";

  const accountLast4 = last4(
    acc?.accountNumber ?? acc?.account ?? acc?.accountIdentifier
  );

  const openedOnISO = dateToISO(acc?.dateOpened);

  const closedOnISO = dateToISO(acc?.dateClosed ?? acc?.closedOn);

  const status = normalizeText(acc?.accountStatus) || normalizeText(acc?.status);

  const loanType =
    normalizeText(acc?.loanType) ||
    normalizeText(acc?.type) ||
    normalizeText(acc?.accountType);

  const balances: NormalizedBalances = {
    balance: moneyToNumber(acc?.balanceAmount ?? acc?.balance),
    pastDue: moneyToNumber(acc?.pastDueAmount ?? acc?.pastDue),
    highBalance: moneyToNumber(acc?.highBalanceAmount ?? acc?.highBalance),
    creditLimit: moneyToNumber(acc?.creditLimitAmount ?? acc?.creditLimit),
    payment: moneyToNumber(acc?.monthlyPaymentAmount ?? acc?.monthlyPayment),
  };

  const normalizedBase = {
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
  } as const;

  const tradelineKey = buildTradelineKey({
    creditorName: normalizedBase.creditorName,
    accountLast4: normalizedBase.accountLast4,
    openedOnISO: normalizedBase.openedOnISO,
    section: normalizedBase.section,
  });

  const normalized: NormalizedAccountV1 = {
    ...normalizedBase,
    tradelineKey,
  };

  // if (debug) (normalized as any)._raw = rawAcc; // debug-only raw attachment

  // debug currently unused, keep it here so call sites don't change
  void debug;

  return normalized;
}
