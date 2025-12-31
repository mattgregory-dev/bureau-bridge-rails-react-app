export type RevolvingTradelineRow = {
  id: string;
  creditor: string;
  status: "Open" | "Closed";
  balance: number;
  limit: number;
  utilizationPct: number;
  lastReported: string; // YYYY-MM
};

export type DerogatoryRow = {
  id: string;
  type: "Collection" | "Late" | "Charge-off" | "Public record";
  creditor: string;
  amount: number;
  date: string; // YYYY-MM
  status: "Open" | "Closed";
};
