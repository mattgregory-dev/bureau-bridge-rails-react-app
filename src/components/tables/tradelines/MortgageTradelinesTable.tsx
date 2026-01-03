// /src/components/tables/tradelines/MortgageTradelinesTable.tsx

import type { TradelineTableRow } from "../../../types/snapshot";
import Badge from "../../ui/Badge";
import { computeTradelineFooter } from "../../../interpretation/tradelines/tradelineTableHelpers";
import { useTableSort } from "../../../hooks/useTableSort";

function money(n: number) {
  return n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

type SortKey =
  | "creditor"
  | "category"
  | "account"
  | "opened"
  | "age"
  | "limit"
  | "balance"
  | "utilizationPct"
  | "hasEFX"
  | "hasEXP"
  | "hasTU";

type RowWithBureauSort = TradelineTableRow & {
  hasEFX: number;
  hasEXP: number;
  hasTU: number;
};

export function MortgageTradelinesTable({ rows }: { rows: TradelineTableRow[] }) {
  const f = computeTradelineFooter(rows);

  const rowsWithBureauSort: RowWithBureauSort[] = rows.map((r) => ({
    ...r,
    hasEFX: r.bureaus.EFX ? 1 : 0,
    hasEXP: r.bureaus.EXP ? 1 : 0,
    hasTU: r.bureaus.TU ? 1 : 0,
  }));

  const { sortKey, sortDir, sortedRows, toggleSort } = useTableSort<
    RowWithBureauSort,
    SortKey
  >(rowsWithBureauSort, "balance", "desc");

  function SortHeader({
    colKey,
    label,
    className,
  }: {
    colKey: SortKey;
    label: string;
    className?: string;
  }) {
    const active = sortKey === colKey;
    return (
      <button
        type="button"
        onClick={() => toggleSort(colKey)}
        className={`inline-flex items-center gap-2 hover:text-slate-700 ${
          className ?? ""
        }`}
      >
        <span>{label}</span>
        <span className="flex flex-col text-[8px] leading-[8px]">
          <span className={active && sortDir === "asc" ? "text-slate-600" : "text-slate-300"}>
            ▲
          </span>
          <span className={active && sortDir === "desc" ? "text-slate-600" : "text-slate-300"}>
            ▼
          </span>
        </span>
      </button>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="px-4 py-4 text-sm text-slate-600">
        No mortgage tradelines found in this snapshot.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-2">
      <table className="min-w-full text-sm">
        <thead className="text-left text-xs font-semibold text-slate-500">
          <tr>
            <th className="py-2 pr-4">
              <SortHeader colKey="creditor" label="Creditor" />
            </th>
            <th className="py-2 pr-4">
              <SortHeader colKey="category" label="Category" />
            </th>
            <th className="py-2 pr-4">
              <SortHeader colKey="account" label="Account" />
            </th>
            <th className="py-2 pr-4">
              <SortHeader colKey="opened" label="Opened" />
            </th>
            <th className="py-2 pr-4">
              <SortHeader colKey="age" label="Age" />
            </th>
            <th className="py-2 pr-4">
              <SortHeader colKey="limit" label="Limit" />
            </th>
            <th className="py-2 pr-4">
              <SortHeader colKey="balance" label="Balance" />
            </th>
            <th className="py-2 pr-4">
              <SortHeader colKey="utilizationPct" label="Utilization" />
            </th>

            {/* New sortable bureau columns */}
            <th className="py-2 pr-2 text-center">
              <SortHeader colKey="hasEFX" label="EFX" className="justify-center" />
            </th>
            <th className="py-2 pr-2 text-center">
              <SortHeader colKey="hasEXP" label="EXP" className="justify-center" />
            </th>
            <th className="py-2 pr-2 text-center">
              <SortHeader colKey="hasTU" label="TU" className="justify-center" />
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {sortedRows.map((r) => (
            <tr key={r.id} className="border-b border-slate-100 last:border-b-0">
              <td className="py-2 pr-4 font-medium">{r.creditor}</td>
              <td className="py-2 pr-4">
                <Badge tone="slate">{r.category}</Badge>
              </td>
              <td className="py-2 pr-4">•••• {r.account}</td>
              <td className="py-2 pr-4">{r.opened}</td>
              <td className="py-2 pr-4">{r.age}</td>
              <td className="py-2 pr-4">{money(r.limit)}</td>
              <td className="py-2 pr-4">{money(r.balance)}</td>
              <td className="py-2 pr-4">
                {r.utilizationPct == null ? (
                  <span className="text-slate-400">-</span>
                ) : (
                  <Badge tone={r.utilizationTone}>{r.utilizationPct}%</Badge>
                )}
              </td>

              {/* New bureau cells */}
              <td className="py-2 pr-2 text-center">
                {r.bureaus.EFX ? (
                  <Badge tone="slate">EFX</Badge>
                ) : (
                  <span className="text-slate-300">-</span>
                )}
              </td>
              <td className="py-2 pr-2 text-center">
                {r.bureaus.EXP ? (
                  <Badge tone="slate">EXP</Badge>
                ) : (
                  <span className="text-slate-300">-</span>
                )}
              </td>
              <td className="py-2 pr-2 text-center">
                {r.bureaus.TU ? (
                  <Badge tone="slate">TU</Badge>
                ) : (
                  <span className="text-slate-300">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>

        {/* Footer totals (still static for now) */}
        <tfoot className="border-t border-slate-200 bg-slate-50">
          <tr className="text-xs font-semibold text-slate-600">
            <td className="py-3 pr-4" colSpan={5}>
              <div className="flex flex-col gap-1">
                <div className="text-slate-500">
                  Subtotal <span className="font-normal">(8 grouped rows)</span>
                </div>
                <div className="text-slate-900 mt-1">
                  <span className="font-semibold">Total</span>{" "}
                  <span className="font-normal text-slate-500">(18 bureau items)</span>
                </div>
              </div>
            </td>

            <td className="py-3 pr-4 text-slate-900">$592,750</td>
            <td className="py-3 pr-4 text-slate-900">$703,500</td>

            <td className="py-3 pr-4">
              <Badge tone="slate">84%</Badge>
            </td>

            {/* 3 bureau footer cells */}
            <td className="py-3 pr-2 text-center text-slate-900">—</td>
            <td className="py-3 pr-2 text-center text-slate-900">—</td>
            <td className="py-3 pr-2 text-center text-slate-900">—</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
