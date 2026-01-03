import type { TradelineTableRow, BureauCode, BureauFlags } from "../../types/snapshot";

type AnyObj = Record<string, any>;

const TRAD_ELIGIBLE_SECTIONS = new Set([
  "revolvingAccounts",
  "mortgageAccounts",
  "installmentAccounts",
]);

export function sectionToCategory(section: string): TradelineTableRow["category"] {
  if (section === "revolvingAccounts") return "Revolving";
  if (section === "mortgageAccounts") return "Mortgage";
  if (section === "installmentAccounts") return "Installment";
  return "Revolving";
}

export function balanceNormalized(a: AnyObj): number {
  return a?.balances?.balanceAmount ?? 0;
}
export function limitNormalized(a: AnyObj): number {
  return a?.balances?.creditLimitAmount ?? 0;
}
export function accountLast4(a: AnyObj): string {
  return String(a?.accountLast4 ?? "");
}

function utilizationPct(balance: number, limit: number): number | null {
  if (!Number.isFinite(balance) || !Number.isFinite(limit)) return null;
  if (limit <= 0) return null;
  const pct = (balance / limit) * 100;
  if (!Number.isFinite(pct)) return null;
  // cap to a sensible range
  return Math.max(0, Math.min(999, Math.round(pct)));
}

function utilizationTone(pct: number | null): TradelineTableRow["utilizationTone"] {
  if (pct == null) return "slate";
  if (pct < 28) return "green";
  if (pct < 50) return "amber";
  return "red";
}

function parseDate(value: unknown): Date | null {
  if (typeof value !== "string" || !value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

function formatOpenedYYYYMM(d: Date | null): string | null {
  if (!d) return null;
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return `${y}-${m}`;
}

function formatAgeFromOpened(opened: Date | null, now: Date = new Date()): string | null {
  if (!opened) return null;

  let months =
    (now.getFullYear() - opened.getFullYear()) * 12 +
    (now.getMonth() - opened.getMonth());

  // If we haven't reached the day-of-month yet, treat it as not a full month
  if (now.getDate() < opened.getDate()) months -= 1;

  if (months < 0) months = 0;

  const years = Math.floor(months / 12);
  const remMonths = months % 12;

  return `${years}y ${remMonths}m`;
}

function bureauFromNormalized(a: AnyObj): BureauCode | null {
  const s = String(a?.provider ?? "").toUpperCase();
  if (s === "EFX" || s === "EXP" || s === "TU") return s as BureauCode;
  return null;
}

function bureauFlagsFromNormalized(a: AnyObj): BureauFlags {
  const b = bureauFromNormalized(a);
  return { EFX: b === "EFX", EXP: b === "EXP", TU: b === "TU" };
}

function bureauListFromFlags(flags: BureauFlags): BureauCode[] {
  const out: BureauCode[] = [];
  if (flags.EFX) out.push("EFX");
  if (flags.EXP) out.push("EXP");
  if (flags.TU) out.push("TU");
  return out;
}

export function computeTradelineFooter(rows: TradelineTableRow[]) {
  // Subtotal: grouped rows you are displaying
  const subtotalGroupedRows = rows.length;

  // Total: bureau-items (if a grouped row represents multiple bureaus)
  // Assumes `row.bureaus` is an array like ["EFX","TU"] or similar.
  const totalBureauItems = rows.reduce((sum, r: any) => {
    const bureaus = Array.isArray(r?.bureaus) ? r.bureaus : [];
    return sum + (bureaus.length || 1); // if missing, count it as 1
  }, 0);

  // Money totals (include all categories)
  const totalLimit = rows.reduce((sum, r) => sum + (r.limit ?? 0), 0);
  const totalBalance = rows.reduce((sum, r) => sum + (r.balance ?? 0), 0);

  // Utilization: usually meaningful only for Revolving
  const revolving = rows.filter((r) => r.category === "Revolving");
  const revolvingLimit = revolving.reduce((sum, r) => sum + (r.limit ?? 0), 0);
  const revolvingBalance = revolving.reduce((sum, r) => sum + (r.balance ?? 0), 0);
  const utilizationPct =
    revolvingLimit > 0 ? Math.round((revolvingBalance / revolvingLimit) * 100) : null;

  // Bureau counts (optional)
  const bureauCounts = rows.reduce(
    (acc, r: any) => {
      const bureaus = Array.isArray(r?.bureaus) ? r.bureaus : [];
      for (const b of bureaus) acc[b] = (acc[b] ?? 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    subtotalGroupedRows,
    totalBureauItems,
    totalLimit,
    totalBalance,
    utilizationPct, // number | null
    bureauCounts
  };
}

// We want a stable raw-ish account identifier, not last4.
// - Strip masking chars like x, *, •
// - Keep digits/letters only (some account numbers are not purely numeric)
function accountNumberRawNormalized(a: AnyObj): string {
  const raw = String(a?.accountNumberRaw ?? "");

  // remove common masking characters and whitespace only
  return raw
    .toUpperCase()
    .replace(/[X•*]/g, "")
    .replace(/\s+/g, "")
    .trim();
}

function normalizeCreditorName(name: string): string {
  return String(name || "")
    .trim()
    .toUpperCase()
    .replace(/\s+/g, " ");
}

export function revolvingTradelineTableRows(normalizedAccounts: unknown): TradelineTableRow[] {
  const list = Array.isArray(normalizedAccounts) ? (normalizedAccounts as AnyObj[]) : [];

  // 1) Build ungrouped items we need for grouping/merging
  const ungrouped = list
    .filter((a) => a?.sourceType === "creditAccount")
    .filter((a) => a?.section === "revolvingAccounts")
    .map((a) => {
      const balance = balanceNormalized(a);
      const limit = limitNormalized(a);

      const openedDate = parseDate(a?.dates?.dateOpened);

      const bureaus = bureauFlagsFromNormalized(a);
      const bureauList = bureauListFromFlags(bureaus);

      const creditorName = String(a?.accountName ?? "Unknown");
      const creditorNormalized = normalizeCreditorName(creditorName);

      const accountNumberRaw = accountNumberRawNormalized(a);
      const accountId = String(a?.id);

      const category = sectionToCategory(String(a.section));

      // match key: category + accountId + accountNumberRaw (mask stripped upstream)
      const groupKey = `${category}|${accountId}|${accountNumberRaw}`;
      console.log( groupKey );

      return {
        groupKey,
        creditorName,
        creditorNormalized,
        accountNumberRaw,
        accountId,
        category,
        balance,
        limit,
        openedDate,
        bureaus,
        bureauList,
      };
    });

  // 2) Group + merge
  const groups = new Map<
    string,
    {
      id: string;
      category: TradelineTableRow["category"];
      creditorNameTruth: string;
      creditorNormalizedTruth: string;
      accountNumberRaw: string;

      maxLimit: number;
      maxBalance: number;
      earliestOpenedDate: Date | null;

      bureaus: BureauFlags;
    }
  >();

  for (const item of ungrouped) {
    const existing = groups.get(item.groupKey);

    if (!existing) {
      groups.set(item.groupKey, {
        id: item.groupKey,
        category: item.category,
        creditorNameTruth: item.creditorName,
        creditorNormalizedTruth: item.creditorNormalized,
        accountNumberRaw: item.accountNumberRaw,

        maxLimit: item.limit ?? 0,
        maxBalance: item.balance ?? 0,
        earliestOpenedDate: item.openedDate ?? null,

        bureaus: {
          EFX: !!item.bureaus?.EFX,
          EXP: !!item.bureaus?.EXP,
          TU: !!item.bureaus?.TU,
        },
      });
      continue;
    }

    // creditor source-of-truth: longest name
    if ((item.creditorName || "").length > (existing.creditorNameTruth || "").length) {
      existing.creditorNameTruth = item.creditorName;
      existing.creditorNormalizedTruth = item.creditorNormalized;
    }

    // highest limit / balance
    existing.maxLimit = Math.max(existing.maxLimit ?? 0, item.limit ?? 0);
    existing.maxBalance = Math.max(existing.maxBalance ?? 0, item.balance ?? 0);

    // earliest opened date
    if (item.openedDate) {
      if (!existing.earliestOpenedDate || item.openedDate < existing.earliestOpenedDate) {
        existing.earliestOpenedDate = item.openedDate;
      }
    }

    // union bureau flags
    existing.bureaus.EFX = existing.bureaus.EFX || !!item.bureaus?.EFX;
    existing.bureaus.EXP = existing.bureaus.EXP || !!item.bureaus?.EXP;
    existing.bureaus.TU = existing.bureaus.TU || !!item.bureaus?.TU;
  }

  // 3) Convert merged groups -> TradelineTableRow[]
  const mergedRows: TradelineTableRow[] = Array.from(groups.values()).map((g) => {
    const opened = formatOpenedYYYYMM(g.earliestOpenedDate);
    const age = formatAgeFromOpened(g.earliestOpenedDate);

    const pct = utilizationPct(g.maxBalance, g.maxLimit);
    const bureauList = bureauListFromFlags(g.bureaus);

    return {
      id: g.id,
      creditor: g.creditorNameTruth,
      category: g.category,
      account: g.accountNumberRaw ? `•••• ${g.accountNumberRaw.slice(-4)}` : "—",
      limit: g.maxLimit,
      balance: g.maxBalance,
      utilizationPct: pct,
      utilizationTone: utilizationTone(pct),
      opened,
      age,
      bureaus: g.bureaus,
      bureauList,
    };
  });

  return mergedRows;
}

export function installmentTradelineTableRows(normalizedAccounts: unknown): TradelineTableRow[] {
  const list = Array.isArray(normalizedAccounts) ? (normalizedAccounts as AnyObj[]) : [];

  // 1) Build ungrouped items we need for grouping/merging
  const ungrouped = list
    .filter((a) => a?.sourceType === "creditAccount")
    .filter((a) => a?.section === "installmentAccounts")
    .map((a) => {
      const balance = balanceNormalized(a);
      const limit = limitNormalized(a);

      const openedDate = parseDate(a?.dates?.dateOpened);

      const bureaus = bureauFlagsFromNormalized(a);
      const bureauList = bureauListFromFlags(bureaus);

      const creditorName = String(a?.accountName ?? "Unknown");
      const creditorNormalized = normalizeCreditorName(creditorName);

      const accountNumberRaw = accountNumberRawNormalized(a);
      const accountId = String(a?.id ?? "Unknown");

      const category = sectionToCategory(String(a.section));

      const groupKey = `${category}|${accountId}|${accountNumberRaw}`;

      return {
        groupKey,
        creditorName,
        creditorNormalized,
        accountNumberRaw,
        accountId,
        category,
        balance,
        limit,
        openedDate,
        bureaus,
        bureauList,
      };
    });

  // 2) Group + merge
  const groups = new Map<
    string,
    {
      id: string;
      category: TradelineTableRow["category"];
      creditorNameTruth: string;
      creditorNormalizedTruth: string;
      accountNumberRaw: string;

      maxLimit: number;
      maxBalance: number;
      earliestOpenedDate: Date | null;

      bureaus: BureauFlags;
    }
  >();

  for (const item of ungrouped) {
    const existing = groups.get(item.groupKey);

    if (!existing) {
      groups.set(item.groupKey, {
        id: item.groupKey,
        category: item.category,
        creditorNameTruth: item.creditorName,
        creditorNormalizedTruth: item.creditorNormalized,
        accountNumberRaw: item.accountNumberRaw,

        maxLimit: item.limit ?? 0,
        maxBalance: item.balance ?? 0,
        earliestOpenedDate: item.openedDate ?? null,

        bureaus: {
          EFX: !!item.bureaus?.EFX,
          EXP: !!item.bureaus?.EXP,
          TU: !!item.bureaus?.TU,
        },
      });
      continue;
    }

    // Creditor source-of-truth: longest name
    if ((item.creditorName || "").length > (existing.creditorNameTruth || "").length) {
      existing.creditorNameTruth = item.creditorName;
      existing.creditorNormalizedTruth = item.creditorNormalized;
    }

    // Highest limit / balance
    existing.maxLimit = Math.max(existing.maxLimit ?? 0, item.limit ?? 0);
    existing.maxBalance = Math.max(existing.maxBalance ?? 0, item.balance ?? 0);

    // Earliest opened date
    if (item.openedDate) {
      if (!existing.earliestOpenedDate || item.openedDate < existing.earliestOpenedDate) {
        existing.earliestOpenedDate = item.openedDate;
      }
    }

    // Union bureau flags
    existing.bureaus.EFX = existing.bureaus.EFX || !!item.bureaus?.EFX;
    existing.bureaus.EXP = existing.bureaus.EXP || !!item.bureaus?.EXP;
    existing.bureaus.TU = existing.bureaus.TU || !!item.bureaus?.TU;
  }

  // 3) Convert merged groups -> TradelineTableRow[]
  const mergedRows: TradelineTableRow[] = Array.from(groups.values()).map((g) => {
    const opened = formatOpenedYYYYMM(g.earliestOpenedDate);
    const age = formatAgeFromOpened(g.earliestOpenedDate);

    const pct = utilizationPct(g.maxBalance, g.maxLimit);
    const bureauList = bureauListFromFlags(g.bureaus);

    return {
      id: g.id,
      creditor: g.creditorNameTruth,
      category: g.category,
      account: g.accountNumberRaw ? `•••• ${g.accountNumberRaw.slice(-4)}` : "—",
      limit: g.maxLimit,
      balance: g.maxBalance,
      utilizationPct: pct,
      utilizationTone: utilizationTone(pct),
      opened,
      age,
      bureaus: g.bureaus,
      bureauList,
    };
  });

  return mergedRows;
}


export function mortgageTradelineTableRows(normalizedAccounts: unknown): TradelineTableRow[] {
  const list = Array.isArray(normalizedAccounts) ? (normalizedAccounts as AnyObj[]) : [];

  // 1) Build ungrouped items we need for grouping/merging
  const ungrouped = list
    .filter((a) => a?.sourceType === "creditAccount")
    .filter((a) => a?.section === "mortgageAccounts")
    .map((a) => {
      const balance = balanceNormalized(a);
      const limit = limitNormalized(a);

      const openedDate = parseDate(a?.dates?.dateOpened);

      const bureaus = bureauFlagsFromNormalized(a);
      const bureauList = bureauListFromFlags(bureaus);

      const creditorName = String(a?.accountName ?? "Unknown");
      const creditorNormalized = normalizeCreditorName(creditorName);

      const accountNumberRaw = accountNumberRawNormalized(a);
      const accountId = String(a?.id ?? "Unknown");

      const category = sectionToCategory(String(a.section));

      const groupKey = `${category}|${accountId}|${accountNumberRaw}`;

      return {
        groupKey,
        creditorName,
        creditorNormalized,
        accountNumberRaw,
        accountId,
        category,
        balance,
        limit,
        openedDate,
        bureaus,
        bureauList,
      };
    });

  // 2) Group + merge
  const groups = new Map<
    string,
    {
      id: string;
      category: TradelineTableRow["category"];
      creditorNameTruth: string;
      creditorNormalizedTruth: string;
      accountNumberRaw: string;

      maxLimit: number;
      maxBalance: number;
      earliestOpenedDate: Date | null;

      bureaus: BureauFlags;
    }
  >();

  for (const item of ungrouped) {
    const existing = groups.get(item.groupKey);

    if (!existing) {
      groups.set(item.groupKey, {
        id: item.groupKey,
        category: item.category,
        creditorNameTruth: item.creditorName,
        creditorNormalizedTruth: item.creditorNormalized,
        accountNumberRaw: item.accountNumberRaw,

        maxLimit: item.limit ?? 0,
        maxBalance: item.balance ?? 0,
        earliestOpenedDate: item.openedDate ?? null,

        bureaus: {
          EFX: !!item.bureaus?.EFX,
          EXP: !!item.bureaus?.EXP,
          TU: !!item.bureaus?.TU,
        },
      });
      continue;
    }

    // Creditor source-of-truth: longest name
    if ((item.creditorName || "").length > (existing.creditorNameTruth || "").length) {
      existing.creditorNameTruth = item.creditorName;
      existing.creditorNormalizedTruth = item.creditorNormalized;
    }

    // Highest limit / balance
    existing.maxLimit = Math.max(existing.maxLimit ?? 0, item.limit ?? 0);
    existing.maxBalance = Math.max(existing.maxBalance ?? 0, item.balance ?? 0);

    // Earliest opened date
    if (item.openedDate) {
      if (!existing.earliestOpenedDate || item.openedDate < existing.earliestOpenedDate) {
        existing.earliestOpenedDate = item.openedDate;
      }
    }

    // Union bureau flags
    existing.bureaus.EFX = existing.bureaus.EFX || !!item.bureaus?.EFX;
    existing.bureaus.EXP = existing.bureaus.EXP || !!item.bureaus?.EXP;
    existing.bureaus.TU = existing.bureaus.TU || !!item.bureaus?.TU;
  }

  // 3) Convert merged groups -> TradelineTableRow[]
  const mergedRows: TradelineTableRow[] = Array.from(groups.values()).map((g) => {
    const opened = formatOpenedYYYYMM(g.earliestOpenedDate);
    const age = formatAgeFromOpened(g.earliestOpenedDate);

    const pct = utilizationPct(g.maxBalance, g.maxLimit);
    const bureauList = bureauListFromFlags(g.bureaus);

    return {
      id: g.id,
      creditor: g.creditorNameTruth,
      category: g.category,
      account: g.accountNumberRaw ? `•••• ${g.accountNumberRaw.slice(-4)}` : "—",
      limit: g.maxLimit,
      balance: g.maxBalance,
      utilizationPct: pct,
      utilizationTone: utilizationTone(pct),
      opened,
      age,
      bureaus: g.bureaus,
      bureauList,
    };
  });

  return mergedRows;
}
