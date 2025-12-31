import type { RevolvingTradelineRow } from "../../types/snapshot";

function money(n: number) {
  return n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });
}

function pct(n: number) {
  return `${Math.round(n)}%`;
}

function Badge({
  children,
  tone
}: {
  children: React.ReactNode;
  tone: "slate" | "green" | "amber" | "red";
}) {
  const tones: Record<typeof tone, string> = {
    slate: "bg-slate-100 text-slate-700",
    green: "bg-green-50 text-green-700",
    amber: "bg-amber-50 text-amber-800",
    red: "bg-red-50 text-red-700"
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function RevolvingTradelinesTable({
  rows
}: {
  rows: RevolvingTradelineRow[];
}) {
  if (rows.length === 0) {
    return (
      <div className="text-sm text-slate-600">
        No revolving tradelines found in this snapshot.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto px-4 py-4">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr>
            {["Creditor", "Status", "Balance", "Limit", "Utilization", "Last reported"].map((c) => (
              <th
                key={c}
                className="whitespace-nowrap border-b border-slate-100 bg-white px-4 py-2 text-left text-xs font-semibold text-slate-600"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="text-sm">
          {rows.map((r) => (
            <tr key={r.id} className="border-b border-slate-100 last:border-b-0">
              <td className="px-4 py-3">{r.creditor}</td>
              <td className="px-4 py-3">
                <Badge tone={r.status === "Open" ? "green" : "slate"}>{r.status}</Badge>
              </td>
              <td className="px-4 py-3">{money(r.balance)}</td>
              <td className="px-4 py-3">{money(r.limit)}</td>
              <td className="px-4 py-3">
                <Badge tone={r.utilizationPct >= 70 ? "red" : r.utilizationPct >= 30 ? "amber" : "green"}>
                  {pct(r.utilizationPct)}
                </Badge>
              </td>
              <td className="px-4 py-3">{r.lastReported}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
