export type BureauCode = "EFX" | "EXP" | "TU";

export type BureauFlags = {
  EFX: boolean;
  EXP: boolean;
  TU: boolean;
};

export type UtilizationTone = "green" | "amber" | "red" | "slate";

export type TradelineCategory = "Revolving" | "Mortgage" | "Installment";

export type TradelineTableRow = {
  id: string;
  creditor: string;
  category: "Revolving" | "Mortgage" | "Installment";
  account: string;
  limit: number;
  balance: number;

  utilizationPct: number | null;   // 0..100, null when N/A
  utilizationTone: UtilizationTone;

  opened: string | null;
  age: string | null;

  bureaus: BureauFlags;
  bureauList: BureauCode[];

};

export type TradelineTotals = {
  totalLimit: number;
  totalBalance: number;
  utilizationPct: number | null;
  utilizationTone: UtilizationTone;
};

export type TradelineFooter = {
  subtotalGroupedRows: number;
  totalBureauItems: number;
  totals: TradelineTotals;
};

