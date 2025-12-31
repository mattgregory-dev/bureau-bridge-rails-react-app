import { useMemo } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { StatCard } from "../components/ui/StatCard";
import { Card, CardBody, CardHeader } from "../components/ui/Card";
import { CollapsiblePanel } from "../components/snapshot/CollapsiblePanel";
import { RevolvingTradelinesTable } from "../components/snapshot/RevolvingTradelinesTable";
import { DerogatoryItemsTable } from "../components/snapshot/DerogatoryItemsTable";
import { Button } from "../components/ui/Button";
import {
  ChevronDownIcon,
  ChevronUpIcon
} from "@heroicons/react/24/outline";
import { useSessionState } from "../hooks/useSessionState";
import type { RevolvingTradelineRow, DerogatoryRow } from "../types/snapshot";

function pct(n: number) {
  return `${Math.round(n)}%`;
}

export default function Snapshot() {
  // Replace placeholders with your pipeline output
  const revolvingRows: RevolvingTradelineRow[] = useMemo(
    () => [
      { id: "r1", creditor: "Chase", status: "Open", balance: 2200, limit: 8000, utilizationPct: 27.5, lastReported: "2025-12" },
      { id: "r2", creditor: "Capital One", status: "Open", balance: 1800, limit: 3000, utilizationPct: 60, lastReported: "2025-12" },
      { id: "r3", creditor: "Citi", status: "Closed", balance: 0, limit: 4500, utilizationPct: 0, lastReported: "2025-10" }
    ],
    []
  );

  const derogRows: DerogatoryRow[] = useMemo(
    () => [
      { id: "d1", type: "Collection", creditor: "Midland", amount: 540, date: "2024-08", status: "Open" },
      { id: "d2", type: "Late", creditor: "Auto Lender", amount: 0, date: "2025-03", status: "Closed" },
      { id: "d3", type: "Charge-off", creditor: "Old Card", amount: 1200, date: "2023-11", status: "Open" },
      { id: "d3", type: "Charge-off", creditor: "Old Card", amount: 1200, date: "2023-11", status: "Open" },
      { id: "d3", type: "Charge-off", creditor: "Old Card", amount: 1200, date: "2023-11", status: "Open" },
      { id: "d3", type: "Charge-off", creditor: "Old Card", amount: 1200, date: "2023-11", status: "Open" },
      { id: "d3", type: "Charge-off", creditor: "Old Card", amount: 1200, date: "2023-11", status: "Open" }
    ],
    []
  );

  // Derived KPI placeholders (swap with pipeline-derived metrics)
  const scoreBand = "Good";

  const openRevolving = revolvingRows.filter((r) => r.status === "Open");
  const totalBal = openRevolving.reduce((sum, r) => sum + r.balance, 0);
  const totalLim = openRevolving.reduce((sum, r) => sum + r.limit, 0);
  const utilizationOverallPct = totalLim > 0 ? (totalBal / totalLim) * 100 : 0;

  const derogCount = derogRows.length;

  const TOP_N = 8;

  const [revExpanded, setRevExpanded] = useSessionState("snapshot.revExpanded", false);
  const [derExpanded, setDerExpanded] = useSessionState("snapshot.derExpanded", false);
  const [revShowAll, setRevShowAll] = useSessionState("snapshot.revShowAll", false);
  const [derShowAll, setDerShowAll] = useSessionState("snapshot.derShowAll", false);

  const revVisible = revShowAll ? revolvingRows : revolvingRows.slice(0, TOP_N);
  const derVisible = derShowAll ? derogRows : derogRows.slice(0, TOP_N);

  return (
    <AppLayout title="Credit Snapshot">
      {/* KPI cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Score band" value={scoreBand} hint="From current pull" />
        <StatCard
          label="Utilization"
          value={pct(utilizationOverallPct)}
          hint="Total revolving utilization"
        />
        <StatCard
          label="Derogatories"
          value={String(derogCount)}
          hint="Collections + lates + charge-offs"
        />
      </div>

      {/* Key signals */}
      <div className="mt-4">
        <Card>
          <CardHeader title="Key Signals" subtitle="Snapshot from current bureau payload" />
          <CardBody>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-medium text-slate-500">Recent inquiries</div>
                <div className="mt-1 text-lg font-semibold">2</div>
                <div className="mt-1 text-xs text-slate-500">Last 12 months</div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-medium text-slate-500">Oldest account age</div>
                <div className="mt-1 text-lg font-semibold">7y 4m</div>
                <div className="mt-1 text-xs text-slate-500">Approximate</div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="text-xs font-medium text-slate-500">Open revolving</div>
                <div className="mt-1 text-lg font-semibold">{openRevolving.length}</div>
                <div className="mt-1 text-xs text-slate-500">Count</div>
              </div>
            </div>

            <div className="mt-3 text-xs text-slate-500">
              Replace placeholders with pipeline-derived metrics when ready.
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Details */}
      <div className="mt-4 grid gap-4">
        <CollapsiblePanel
          title="Revolving Tradelines"
          subtitle={`Current pull. ${revolvingRows.length} total.`}
          right={
            <>
              <Button
                variant="ghost"
                onClick={() => setRevExpanded((v) => !v)}
                className="flex items-center gap-1"
              >
                {revExpanded ? (
                  <>
                    Collapse
                    <ChevronUpIcon className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <ChevronDownIcon className="h-4 w-4" />
                    Expand
                  </>
                )}
              </Button>

              {revolvingRows.length > TOP_N ? (
                <Button variant="secondary" onClick={() => setRevShowAll((v) => !v)}>
                  {revShowAll ? `Show top ${TOP_N}` : `Show all (${revolvingRows.length})`}
                </Button>
              ) : null}
            </>
          }
        >
          {revExpanded ? <RevolvingTradelinesTable rows={revVisible} /> : null}
        </CollapsiblePanel>

        <CollapsiblePanel
          title="Derogatory Items"
          subtitle={`Summary view. ${derogRows.length} total.`}
          right={
            <>
              <Button
                variant="ghost"
                onClick={() => setDerExpanded((v) => !v)}
                className="flex items-center gap-1"
              >
                {derExpanded ? (
                  <>
                    Collapse
                    <ChevronUpIcon className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    <ChevronDownIcon className="h-4 w-4" />
                    Expand
                  </>
                )}
              </Button>

              {derogRows.length > TOP_N ? (
                <Button variant="secondary" onClick={() => setDerShowAll((v) => !v)}>
                  {derShowAll ? `Show top ${TOP_N}` : `Show all (${derogRows.length})`}
                </Button>
              ) : null}
            </>
          }
        >
          {derExpanded ? <DerogatoryItemsTable rows={derVisible} /> : null}
        </CollapsiblePanel>
      </div>
    </AppLayout>
  );

}
