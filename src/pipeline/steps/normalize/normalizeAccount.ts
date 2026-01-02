import { normalizeText, last4, normalizeProvider } from "./strings";
import { dateToISO } from "./dates";
import { moneyToNumber } from "./money";
import { buildTradelineKey } from "./keys";

type NormalizeMeta = {
  provider: string;
  section: string;
};

export type SourceType =
  | "creditAccount"
  | "collectionAccount"
  | "inquiry"
  | "publicRecord";

// Keep this aligned with the sections you traverse in runPipeline.
function sourceTypeForSection(section: string): SourceType {
  switch (section) {
    case "collections":
      return "collectionAccount";

    case "inquiries":
    case "inquiry":
      return "inquiry";

    case "publicRecords":
    case "publicRecord":
      return "publicRecord";

    case "revolvingAccounts":
    case "mortgageAccounts":
    case "installmentAccounts":
    case "otherAccounts":
    default:
      return "creditAccount";
  }
}

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

export type NormalizedDates = {
  reportedDate: string | null;
  dateOpened: string | null;
  dateClosed: string | null;
  lastActivityDate: string | null;
};

export type NormalizedDurations = {
  monthsReviewed: string | null;
  termDurationMonths: string | null;
};

export type NormalizedPaymentMonth = {
  ym: string; // "YYYY-MM"
  date: string; // "YYYY-MM-01"
  monthType: string | null;
  value: string | null;
};

export type NormalizedPaymentHistory = {
  months: NormalizedPaymentMonth[];
};

const MONTH_TO_NUM: Record<string, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

function normalizePaymentHistory(raw: unknown): NormalizedPaymentHistory {
  if (!Array.isArray(raw)) return { months: [] };

  const months: NormalizedPaymentMonth[] = [];

  for (const row of raw) {
    if (!row || typeof row !== "object") continue;
    const r = row as Record<string, any>;

    const year = Number(r.year);
    if (!Number.isFinite(year)) continue;

    for (const [k, v] of Object.entries(r)) {
      if (k === "year") continue;

      const monthKey = String(k).toLowerCase();
      const mm = MONTH_TO_NUM[monthKey];
      if (!mm) continue;

      const monthObj =
        v && typeof v === "object" ? (v as Record<string, any>) : null;

      const monthType =
        monthObj?.monthType != null ? String(monthObj.monthType) : null;
      const value = monthObj?.value != null ? String(monthObj.value) : null;

      const ym = `${year}-${mm}`;
      months.push({
        ym,
        date: `${ym}-01`,
        monthType,
        value,
      });
    }
  }

  // Sort newest -> oldest
  months.sort((a, b) => (a.ym < b.ym ? 1 : a.ym > b.ym ? -1 : 0));

  return { months };
}

// Option A: discriminated union by sourceType

export type BaseNormalized = {
  //---Location
  provider: string;
  section: string;
  sourceType: SourceType;
};

export type NormalizedCreditAccount = BaseNormalized & {
  sourceType: "creditAccount";

  //---Identifiers
  id: string;
  accountName: string;
  accountType: string | null;
  creditorClassification: string | null;
  accountLast4: string | null;
  accountNumberRaw: string | null;
  paymentResponsibility: string | null;
  isNegative: string | null;

  //---Account status
  accountOpen: string | null;
  accountStatus: string | null;
  activityDesignator: string | null;

  //---Amounts
  balances: NormalizedBalances;

  //---Dates
  dates: NormalizedDates;

  //---Duration
  durations: NormalizedDurations;

  //---Payment history
  paymentHistory: NormalizedPaymentHistory;

  //---Keys and placeholders
  late: null;
  flags: null;
  tradelineKey: string;

  //---Objects (raw-shaped for now)
  //loanType: unknown | null;
  comments: unknown | null;
  contactInformation: unknown | null;
};

export type NormalizedCollectionAccount = BaseNormalized & {
  sourceType: "collectionAccount";

  // keep it lean for now
  id: string;
  accountName: string;
  accountLast4: string | null;
  accountNumberRaw: string | null;
  isNegative: string | null;

  balances: NormalizedBalances;
  dates: NormalizedDates;

  tradelineKey: string;

  // raw-shaped extras (optional)
  comments: unknown | null;
  contactInformation: unknown | null;
};

export type NormalizedInquiry = BaseNormalized & {
  sourceType: "inquiry";

  subscriberName: string | null;
  inquiryType: string | null;
  inquiryDate: string | null;
};

export type NormalizedPublicRecord = BaseNormalized & {
  sourceType: "publicRecord";

  id: string;
  recordType: string | null;
  status: string | null;
  filedDate: string | null;
  resolvedDate: string | null;
  reportedDate: string | null;
  amount: number | null;
  courtName: string | null;
};

export type NormalizedAccount =
  | NormalizedCreditAccount
  | NormalizedCollectionAccount
  | NormalizedInquiry
  | NormalizedPublicRecord;

type NormalizeMetaWithType = NormalizeMeta & { sourceType: SourceType };

function normalizeCreditAccount(
  rawAcc: RawAccount,
  meta: NormalizeMetaWithType
): NormalizedCreditAccount {
  const acc = (rawAcc ?? {}) as Record<string, any>;
  const { provider, section } = meta;

  // Identifiers
  const id = normalizeText(acc?.id) || "Unknown";
  const accountType = normalizeText(acc?.accountType) || "Unknown";
  const creditorClassification = normalizeText(acc?.creditorClassification);
  const accountName = normalizeText(acc?.accountName) || "Unknown";
  const accountLast4 = last4(acc?.accountNumber);
  const accountNumberRaw = normalizeText(acc?.accountNumber);
  const paymentResponsibility = normalizeText(acc?.paymentResponsibility);
  const isNegative = normalizeText(acc?.isNegative);

  // Account Status
  const accountStatus = normalizeText(acc?.accountStatus);
  const accountOpen = normalizeText(acc?.accountOpen);
  const activityDesignator = normalizeText(acc?.activityDesignator);

  // Amounts
  const balances: NormalizedBalances = {
    highCreditAmount: moneyToNumber(acc?.highCreditAmount),
    creditLimitAmount: moneyToNumber(acc?.creditLimitAmount),
    balanceAmount: moneyToNumber(acc?.balanceAmount),
    pastDueAmount: moneyToNumber(acc?.pastDueAmount),
    monthlyPayment: moneyToNumber(acc?.monthlyPayment),
    chargeOffAmount: moneyToNumber(acc?.chargeOffAmount),
  };

  // Dates
  const dates: NormalizedDates = {
    reportedDate: dateToISO(acc?.reportedDate),
    dateOpened: dateToISO(acc?.dateOpened),
    dateClosed: dateToISO(acc?.dateClosed),
    lastActivityDate: dateToISO(acc?.lastActivityDate),
  };

  // Duration
  const durations: NormalizedDurations = {
    monthsReviewed: normalizeText(acc?.monthsReviewed),
    termDurationMonths: normalizeText(acc?.termDurationMonths),
  };

  // Payment history
  const paymentHistory = normalizePaymentHistory(acc?.paymentHistory);

  // Objects (keep raw-shaped for now)
  //const loanType = (acc?.loanType ?? null) as unknown | null;
  const comments = (acc?.comments ?? null) as unknown | null;
  const contactInformation = (acc?.contactInformation ?? null) as unknown | null;

  const providerNorm = normalizeProvider(provider);

  const tradelineKey = buildTradelineKey({
    accountName,
    accountLast4,
    dateOpened: dates.dateOpened,
    section,
  });

  return {
    // Location
    provider: providerNorm,
    section,
    sourceType: "creditAccount",

    // Identifiers
    id,
    accountName,
    accountType,
    creditorClassification,
    accountLast4,
    accountNumberRaw,
    paymentResponsibility,
    isNegative,

    // Status
    accountOpen,
    accountStatus,
    activityDesignator,

    // Amounts/Dates/Duration
    balances,
    dates,
    durations,

    // Payment history
    paymentHistory,

    // Placeholders + key
    late: null,
    flags: null,
    tradelineKey,

    // Objects
    //loanType,
    comments,
    contactInformation,
  };
}

function normalizeCollectionAccount(
  rawAcc: RawAccount,
  meta: NormalizeMetaWithType
): NormalizedCollectionAccount {
  const acc = (rawAcc ?? {}) as Record<string, any>;
  const { provider, section } = meta;

  const id = normalizeText(acc?.id) || "Unknown";
  const accountName =
    normalizeText(acc?.accountName) ||
    normalizeText(acc?.collectorName) ||
    "Unknown";

  const accountLast4 = last4(acc?.accountNumber);
  const accountNumberRaw = normalizeText(acc?.accountNumber);
  const isNegative = normalizeText(acc?.isNegative);

  const balances: NormalizedBalances = {
    highCreditAmount: moneyToNumber(acc?.highCreditAmount),
    creditLimitAmount: moneyToNumber(acc?.creditLimitAmount),
    balanceAmount: moneyToNumber(acc?.balanceAmount),
    pastDueAmount: moneyToNumber(acc?.pastDueAmount),
    monthlyPayment: moneyToNumber(acc?.monthlyPayment),
    chargeOffAmount: moneyToNumber(acc?.chargeOffAmount),
  };

  const dates: NormalizedDates = {
    reportedDate: dateToISO(acc?.reportedDate),
    dateOpened: dateToISO(acc?.dateOpened),
    dateClosed: dateToISO(acc?.dateClosed),
    lastActivityDate: dateToISO(acc?.lastActivityDate),
  };

  const comments = (acc?.comments ?? null) as unknown | null;
  const contactInformation = (acc?.contactInformation ?? null) as unknown | null;

  const providerNorm = normalizeProvider(provider);

  const tradelineKey = buildTradelineKey({
    accountName,
    accountLast4,
    dateOpened: dates.dateOpened,
    section,
  });

  return {
    provider: providerNorm,
    section,
    sourceType: "collectionAccount",
    id,

    accountName,
    accountLast4,
    accountNumberRaw,
    isNegative,

    balances,
    dates,

    tradelineKey,

    comments,
    contactInformation,
  };
}

function normalizeInquiry(
  rawAcc: RawAccount,
  meta: NormalizeMetaWithType
): NormalizedInquiry {
  const acc = (rawAcc ?? {}) as Record<string, any>;
  const { provider, section } = meta;

  const id = normalizeText(acc?.id) || "Unknown";

  // These key names vary a lot across providers, so stay loose.
  const subscriberName =
    normalizeText(acc?.subscriberName) ||
    normalizeText(acc?.inquirySubscriberName) ||
    normalizeText(acc?.creditorName) ||
    normalizeText(acc?.companyName) ||
    null;

  const inquiryType =
    normalizeText(acc?.inquiryType) || normalizeText(acc?.type) || null;

  const inquiryDate =
    dateToISO(acc?.inquiryDate) || dateToISO(acc?.date) || null;

  return {
    provider: normalizeProvider(provider),
    section,
    sourceType: "inquiry",
    subscriberName,
    inquiryType,
    inquiryDate,
  };
}

function normalizePublicRecord(
  rawAcc: RawAccount,
  meta: NormalizeMetaWithType
): NormalizedPublicRecord {
  const acc = (rawAcc ?? {}) as Record<string, any>;
  const { provider, section } = meta;

  const id = normalizeText(acc?.id) || "Unknown";

  const recordType =
    normalizeText(acc?.recordType) || normalizeText(acc?.type) || null;

  const status = normalizeText(acc?.status) || null;

  const filedDate =
    dateToISO(acc?.filedDate) || dateToISO(acc?.dateFiled) || null;

  const resolvedDate =
    dateToISO(acc?.resolvedDate) || dateToISO(acc?.dateResolved) || null;

  const reportedDate = dateToISO(acc?.reportedDate) || null;

  const amount =
    moneyToNumber(acc?.amount) ??
    moneyToNumber(acc?.recordAmount) ??
    moneyToNumber(acc?.liabilityAmount) ??
    null;

  const courtName = normalizeText(acc?.courtName) || null;

  return {
    provider: normalizeProvider(provider),
    section,
    sourceType: "publicRecord",
    id,
    recordType,
    status,
    filedDate,
    resolvedDate,
    reportedDate,
    amount,
    courtName,
  };
}

export function normalizeAccount(
  rawAcc: RawAccount,
  { provider, section }: NormalizeMeta
): NormalizedAccount {
  const sourceType = sourceTypeForSection(section);

  const meta: NormalizeMetaWithType = { provider, section, sourceType };

  switch (sourceType) {
    case "creditAccount":
      return normalizeCreditAccount(rawAcc, meta);

    case "collectionAccount":
      return normalizeCollectionAccount(rawAcc, meta);

    case "inquiry":
      return normalizeInquiry(rawAcc, meta);

    case "publicRecord":
      return normalizePublicRecord(rawAcc, meta);
  }
}
