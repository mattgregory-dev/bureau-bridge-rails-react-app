import { normalizeText, last4, normalizeProvider } from "./strings";
import { dateToISO } from "./dates";
import { moneyToNumber } from "./money";
import { buildTradelineKey } from "./keys";

type NormalizeMeta = {
  provider: string;
  section: string;
};

// Loose input type. Your bureau payloads vary.
// Use this until you introduce runtime validation (zod, etc.).
type RawAccount = Record<string, unknown> | null | undefined;

export type NormalizedBalances = {
  highCreditAmount: number | null;
  creditLimitAmount: number | null;
  balanceAmount: number | null;
  pastDueAmount: number | null;
  monthlyPayment: number | null;
  chargeOffAmount: number | null;
};

export type NormalizedAccount = {

  //---location
  provider: string;
  section: string;

  //---Identifiers
  id: string;
  accountName: string;
  accountType: string | null;
  creditorClassification: string | null;
  accountLast4: string | null;
  accountNumberRawMasked: string | null;
  paymentResponsibility: string | null;
  isNegative: string | null;

  //---Account status
  accountOpen: string | null;
  accountStatus: string | null;
  activityDesignator: string | null;

  //---Dates
  dateOpened: string | null;
  reportedDate: string | null;
  dateClosed: string | null; // Not in revolvingAccounts?
  lastActivityDate: string | null;
  monthsReviewed: string | null;
  termDurationMonths: string | null;

  //---Amounts
  balances: NormalizedBalances;

  //loanType: string | null;
  //comments: string | null;

  late: null;
  flags: null;
  tradelineKey: string;
};

export function normalizeAccount(
  rawAcc: RawAccount,
  { provider, section }: NormalizeMeta
): NormalizedAccount {

  // Preserve your existing optional-chaining style by treating as an object-like.
  const acc = (rawAcc ?? {}) as Record<string, any>;

  // Identifiers
  const id = normalizeText(acc?.id) || "Unknown";
  const accountType = normalizeText(acc?.accountType) || "Unknown";
  const creditorClassification = normalizeText(acc?.creditorClassification);
  const accountName = normalizeText(acc?.accountName) || "Unknown";
  const accountLast4 = last4(
    acc?.accountNumber // ?? acc?.account ?? acc?.accountIdentifier
  );
  const accountNumberRawMasked = normalizeText(acc?.accountNumber);
  const paymentResponsibility = normalizeText(acc?.paymentResponsibility);
  const isNegative = normalizeText(acc?.isNegative);

  // Account Status
  //const status = normalizeText(acc?.accountStatus) || normalizeText(acc?.status);
  const accountStatus = normalizeText(acc?.accountStatus);
  const accountOpen = normalizeText(acc?.accountOpen);
  const activityDesignator = normalizeText(acc?.activityDesignator);

  // Dates
  const dateOpened = dateToISO(acc?.dateOpened);
  //const dateClosed = dateToISO(acc?.dateClosed ?? acc?.closedOn);
  const dateClosed = dateToISO(acc?.dateClosed);
  const reportedDate = dateToISO(acc?.reportedDate);
  const lastActivityDate = dateToISO(acc?.lastActivityDate);
  const monthsReviewed = normalizeText(acc?.monthsReviewed);
  const termDurationMonths = normalizeText(acc?.termDurationMonths);

  //const loanType = normalizeText(acc?.loanType); // Comments style formatting
  //const comments = normalizeText(acc?.comments); // Comments style formatting

  const balances: NormalizedBalances = {
    highCreditAmount: moneyToNumber(acc?.highBalanceAmount ?? acc?.highCreditAmount),
    creditLimitAmount: moneyToNumber(acc?.creditLimitAmount ?? acc?.creditLimitAmount),
    balanceAmount: moneyToNumber(acc?.balanceAmount ?? acc?.balanceAmount),
    pastDueAmount: moneyToNumber(acc?.pastDueAmount ?? acc?.pastDueAmount),
    monthlyPayment: moneyToNumber(acc?.monthlyPayment ?? acc?.monthlyPayment),
    chargeOffAmount: moneyToNumber(acc?.chargeOffAmount ?? acc?.chargeOffAmount),
  };

  const normalizedBase = {

    //---Location
    provider: normalizeProvider(provider),
    section, // e.g. "revolvingAccounts" for now; you can rename later

    //---Identifiers
    id,
    accountName,
    accountType,
    creditorClassification,
    accountLast4,
    accountNumberRawMasked,
    paymentResponsibility,
    isNegative,

    //---Account Status
    accountStatus,
    accountOpen,
    activityDesignator,

    //---Dates
    dateOpened,
    reportedDate,
    dateClosed,
    lastActivityDate,
    monthsReviewed,
    termDurationMonths,

    //---Amounts
    balances,

    //---Comments
    //loanType,
    //comments,

    // Placeholder for later steps:
    late: null,
    flags: null,
  } as const;

  const tradelineKey = buildTradelineKey({
    accountName: normalizedBase.accountName,
    accountLast4: normalizedBase.accountLast4,
    dateOpened: normalizedBase.dateOpened,
    section: normalizedBase.section,
  });

  const normalized: NormalizedAccount = {
    ...normalizedBase,
    tradelineKey,
  };

  return normalized;
}
