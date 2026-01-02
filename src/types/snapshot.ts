export type BureauCode = "EFX" | "EXP" | "TU";

export type BureauFlags = {
  EFX: boolean;
  EXP: boolean;
  TU: boolean;
};

export type TradelineCategory = "Revolving" | "Mortgage" | "Installment";

export type TradelineTableRow = {
  id: string;
  creditor: string;
  category: TradelineCategory;
  balance: number;
};

export type DerogatoryRow = {
  id: string;
  type: "Collection" | "Late" | "Charge-off" | "Public record";
  creditor: string;
  amount: number;
  date: string; // YYYY-MM
  status: "Open" | "Closed";
};
