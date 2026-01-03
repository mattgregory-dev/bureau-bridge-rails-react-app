import { useMemo } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { CollapsiblePanel } from "../components/tables/CollapsiblePanel";
import { Button } from "../components/ui/Button";
import { useSessionState } from "../hooks/useSessionState";

import { RevolvingTradelinesTable } from "../components/tables/tradelines/RevolvingTradelinesTable";
import { InstallmentTradelinesTable } from "../components/tables/tradelines/InstallmentTradelinesTable";
import { MortgageTradelinesTable } from "../components/tables/tradelines/MortgageTradelinesTable";

// fixture
import rawPull from "../assets/fixtures/report-airplane-jefferson-2025-03.json";

// pipeline
import { runPipeline } from "../pipeline/runPipeline";

import {
  revolvingTradelineTableRows,
  installmentTradelineTableRows,
  mortgageTradelineTableRows,
} from "../interpretation/tradelines/tradelineTableHelpers";

import type { TradelineTableRow } from "../types/snapshot";

export default function Snapshot() {
  const pipeline = useMemo(() => runPipeline(rawPull), []);

  const normalizedAccounts = useMemo(() => {
    return (pipeline?.report?.normalizedAccounts as unknown) ?? [];
  }, [pipeline]);

  const revolvingRows: TradelineTableRow[] = useMemo(() => {
    return revolvingTradelineTableRows(normalizedAccounts);
  }, [normalizedAccounts]);

  const installmentRows: TradelineTableRow[] = useMemo(() => {
    return installmentTradelineTableRows(normalizedAccounts);
  }, [normalizedAccounts]);

  const mortgageRows: TradelineTableRow[] = useMemo(() => {
    return mortgageTradelineTableRows(normalizedAccounts);
  }, [normalizedAccounts]);

  const TOP_N = 10;

  const [tradelinesExpanded, setTradelinesExpanded] = useSessionState(
    "snapshot.tradelines.expanded",
    true
  );

  const [revolvingExpanded, setRevolvingExpanded] = useSessionState(
    "snapshot.tradelines.revolving.expanded",
    true
  );
  const [revolvingShowAll, setRevolvingShowAll] = useSessionState(
    "snapshot.tradelines.revolving.showAll",
    false
  );
  const revolvingVisible = revolvingShowAll
    ? revolvingRows
    : revolvingRows.slice(0, TOP_N);

  const [installmentExpanded, setInstallmentExpanded] = useSessionState(
    "snapshot.tradelines.installment.expanded",
    true
  );
  const [installmentShowAll, setInstallmentShowAll] = useSessionState(
    "snapshot.tradelines.installment.showAll",
    false
  );
  const installmentVisible = installmentShowAll
    ? installmentRows
    : installmentRows.slice(0, TOP_N);

  const [mortgageExpanded, setMortgageExpanded] = useSessionState(
    "snapshot.tradelines.mortgage.expanded",
    true
  );
  const [mortgageShowAll, setMortgageShowAll] = useSessionState(
    "snapshot.tradelines.mortgage.showAll",
    false
  );
  const mortgageVisible = mortgageShowAll
    ? mortgageRows
    : mortgageRows.slice(0, TOP_N);

  return (
    <AppLayout title="Credit Snapshot">
      <div className="mt-4">
        <CollapsiblePanel
          title="Tradelines"
          subtitle="Revolving + mortgage + installment. Non-negative only."
          expanded={tradelinesExpanded}
          onExpandedChange={setTradelinesExpanded}
        >
          <div className="grid gap-4">
            <CollapsiblePanel
              title="Revolving"
              expanded={revolvingExpanded}
              onExpandedChange={setRevolvingExpanded}
              headerClassName="bg-slate-50"
              right={
                revolvingExpanded && revolvingRows.length > TOP_N ? (
                  <Button
                    className="border border-[#d0e2f6]"
                    variant="tableHeader"
                    onClick={() => setRevolvingShowAll((v) => !v)}
                  >
                    {revolvingShowAll
                      ? `Show top ${TOP_N}`
                      : `Show all (${revolvingRows.length})`}
                  </Button>
                ) : null
              }
            >
              <RevolvingTradelinesTable rows={revolvingVisible} />
            </CollapsiblePanel>

            <CollapsiblePanel
              title="Installment"
              expanded={installmentExpanded}
              onExpandedChange={setInstallmentExpanded}
              headerClassName="bg-slate-50"
              right={
                installmentExpanded && installmentRows.length > TOP_N ? (
                  <Button
                    className="border border-[#d0e2f6]"
                    variant="tableHeader"
                    onClick={() => setInstallmentShowAll((v) => !v)}
                  >
                    {installmentShowAll
                      ? `Show top ${TOP_N}`
                      : `Show all (${installmentRows.length})`}
                  </Button>
                ) : null
              }
            >
              <InstallmentTradelinesTable rows={installmentVisible} />
            </CollapsiblePanel>

            <CollapsiblePanel
              title="Mortgage"
              expanded={mortgageExpanded}
              onExpandedChange={setMortgageExpanded}
              headerClassName="bg-slate-50"
              right={
                mortgageExpanded && mortgageRows.length > TOP_N ? (
                  <Button
                    className="border border-[#d0e2f6]"
                    variant="tableHeader"
                    onClick={() => setMortgageShowAll((v) => !v)}
                  >
                    {mortgageShowAll
                      ? `Show top ${TOP_N}`
                      : `Show all (${mortgageRows.length})`}
                  </Button>
                ) : null
              }
            >
              <MortgageTradelinesTable rows={mortgageVisible} />
            </CollapsiblePanel>
          </div>
        </CollapsiblePanel>
      </div>
    </AppLayout>
  );
}
