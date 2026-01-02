// src/components/snapshot/tradelines/tradelineRowBuilders.ts
import type { TradelineTableRow } from "../../types/snapshot";

type AnyObj = Record<string, any>;

export function categoryFromAccountType(accountType: any): TradelineTableRow["category"] {
  const t = (accountType ?? "").toString().toUpperCase();
  if (t === "REVOLVING") return "Revolving";
  if (t === "MORTGAGE") return "Mortgage";
  if (t === "INSTALLMENT") return "Installment";
  return "Revolving";
}

export function balanceFromNormalized(acc: AnyObj): number {
  const n = acc?.balances?.balanceAmount ?? 0;
  const v = typeof n === "number" ? n : Number(n);
  return Number.isFinite(v) ? v : 0;
}
