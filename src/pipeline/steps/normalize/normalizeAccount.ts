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

    case "revolvingAccounts":
    case "mortgageAccounts":
    case "installmentAccounts":
    case "otherAccounts":
      return "creditAccount";

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

export type NormalizedAccount = {
  //---location
  provider: string;
  section: string;
  sourceType: SourceType;

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

  late: null;
  flags: null;
  tradelineKey: string;

  //---Objects (raw-shaped for now)
  loanType: unknown | null;
  comments: unknown | null;
  contactInformation: unknown | null;
};

export function normalizeAccount(
  rawAcc: RawAccount,
  { provider, section }: NormalizeMeta
): NormalizedAccount {
  const acc = (rawAcc ?? {}) as Record<string, any>;

  // Identifiers
  const id = normalizeText(acc?.id) || "Unknown";
  const accountType = normalizeText(acc?.accountType) || "Unknown";
  const creditorClassification = normalizeText(acc?.creditorClassification);
  const accountName = normalizeText(acc?.accountName) || "Unknown";
  const accountLast4 = last4(
    acc?.accountNumber // ?? acc?.account ?? acc?.accountIdentifier
  );
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
  const loanType = (acc?.loanType ?? null) as unknown | null;
  const comments = (acc?.comments ?? null) as unknown | null;
  const contactInformation = (acc?.contactInformation ?? null) as unknown | null;

  const normalizedBase = {
    //---Location
    provider: normalizeProvider(provider),
    section, // e.g. "revolvingAccounts" for now; you can rename later
    sourceType: sourceTypeForSection(section),

    //---Identifiers
    id,
    accountName,
    accountType,
    creditorClassification,
    accountLast4,
    accountNumberRaw,
    paymentResponsibility,
    isNegative,

    //---Account Status
    accountStatus,
    accountOpen,
    activityDesignator,

    //---Amounts
    balances,

    //---Dates
    dates,

    //---Durations
    durations,

    //---Payment history
    paymentHistory,

    // Placeholder for later steps:
    late: null,
    flags: null,

    //---Objects (bottom)
    loanType,
    comments,
    contactInformation,
  };

  const tradelineKey = buildTradelineKey({
    accountName: normalizedBase.accountName,
    accountLast4: normalizedBase.accountLast4,
    dateOpened: normalizedBase.dates.dateOpened,
    section: normalizedBase.section,
  });

  const normalized: NormalizedAccount = {
    ...normalizedBase,
    tradelineKey,
  };

  return normalized;
}
