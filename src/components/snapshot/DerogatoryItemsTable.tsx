import type { DerogatoryRow } from "../../types/snapshot";

function money(n: number) {
  return n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });
}

function Badge({
  children,
  tone
}: {
  children: React.ReactNode;
  tone: "slate" | "amber" | "red";
}) {
  const tones: Record<typeof tone, string> = {
    slate: "bg-slate-100 text-slate-700",
    amber: "bg-amber-50 text-amber-800",
    red: "bg-red-50 text-red-700"
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
}

export function DerogatoryItemsTable({
  rows
}: {
  rows: DerogatoryRow[];
}) {
  if (rows.length === 0) {
    return (
      <div className="text-sm text-slate-600">
        No derogatory items found in this snapshot.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto px-4 py-4">
      <table className="w-full border-separate border-spacing-0">
        <thead>
          <tr>
            {["Type", "Creditor", "Amount", "Date", "Status"].map((c) => (
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
          {rows.map((d) => {
            const typeTone = d.type === "Collection" || d.type === "Charge-off" ? "red" : "amber";
            const statusTone = d.status === "Open" ? "red" : "slate";

            return (
              <tr key={d.id} className="border-b border-slate-100 last:border-b-0">
                <td className="px-4 py-3">
                  <Badge tone={typeTone}>{d.type}</Badge>
                </td>
                <td className="px-4 py-3">{d.creditor}</td>
                <td className="px-4 py-3">{money(d.amount)}</td>
                <td className="px-4 py-3">{d.date}</td>
                <td className="px-4 py-3">
                  <Badge tone={statusTone}>{d.status}</Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
