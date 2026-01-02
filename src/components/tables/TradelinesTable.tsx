import React from "react";
import type { TradelineTableRow } from "../../types/snapshot";

function money(n: number) {
  return n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });
}

export function TradelinesTable({
  rows
}: {
  rows: TradelineTableRow[];
}) {
  if (rows.length === 0) {
    return (
      <div className="px-4 py-4 text-sm text-slate-600">
        No revolving tradelines found in this snapshot.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto px-4 py-4">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr>
            <th className="whitespace-nowrap border-b border-slate-100 bg-white px-4 py-2 text-left text-xs font-semibold text-slate-600">
              Creditor
            </th>
            <th className="whitespace-nowrap border-b border-slate-100 bg-white px-4 py-2 text-left text-xs font-semibold text-slate-600">
              Category
            </th>
            <th className="whitespace-nowrap border-b border-slate-100 bg-white px-4 py-2 text-right text-xs font-semibold text-slate-600">
              Balance
            </th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {rows.map((r) => (
            <tr
              key={r.id}
              className="border-b border-slate-100 last:border-b-0"
            >
              <td className="px-4 py-3 font-medium">
                {r.creditor}
              </td>
              <td className="px-4 py-3 text-slate-600">
                {r.category}
              </td>
              <td className="px-4 py-3 text-right tabular-nums">
                {money(r.balance)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
