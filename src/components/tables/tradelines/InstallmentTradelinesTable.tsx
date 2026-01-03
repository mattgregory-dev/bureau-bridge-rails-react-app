// /src/components/tables/tradelines/InstallmentTradelinesTable.tsx

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

export function InstallmentTradelinesTable({ rows }: { rows: TradelineTableRow[] }) {
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
        No installment tradelines found in this snapshot.
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
              Category
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
              <SortHeader colKey="balance" label="Balance" />
            </th>

            <th className="py-2 pr-2 text-center">
              EFX
            </th>
            <th className="py-2 pr-2 text-center">
              EXP
            </th>
            <th className="py-2 pr-2 text-center">
              TU
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200">
          {sortedRows.map((r) => (
            <tr key={r.id}>
              <td className="py-2 pr-4 font-medium">{r.creditor}</td>
              <td className="py-2 pr-4">
                <Badge tone="slate">{r.category}</Badge>
              </td>
              <td className="py-2 pr-4">{r.account}</td>
              <td className="py-2 pr-4">{r.opened}</td>
              <td className="py-2 pr-4">{r.age}</td>
              <td className="py-2 pr-4">{money(r.balance)}</td>

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

        <tfoot className="border-t border-slate-200 bg-slate-50">
          <tr className="text-xs font-semibold text-slate-600">
            <td className="py-3 pr-4" colSpan={1}>
              <div className="flex flex-col gap-1">
                {/* <div className="text-slate-500">
                  Subtotal{" "}
                  <span className="font-normal">({f.subtotalGroupedRows} accounts)</span>
                </div> */}
                <div className="mt-1 text-slate-900 text-sm">
                  <span className="font-semibold">Total</span>{" "}
                    <span className="font-normal text-slate-500">
                      ({f.totalBureauItems} {f.totalBureauItems === 1 ? "account" : "accounts"})
                    </span>
                </div>
              </div>
            </td>
            <td className="py-3 pr-2 text-slate-400">–</td>
            <td className="py-3 pr-2 text-slate-400">–</td>
            <td className="py-3 pr-2 text-slate-400">–</td>
            <td className="py-3 pr-2 text-slate-400">–</td>
            <td className="py-3 pr-4 text-slate-900">{money(f.totals.totalBalance)}</td>
            <td className="py-3 pr-2 text-center text-slate-400">–</td>
            <td className="py-3 pr-2 text-center text-slate-400">–</td>
            <td className="py-3 pr-2 text-center text-slate-400">–</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
