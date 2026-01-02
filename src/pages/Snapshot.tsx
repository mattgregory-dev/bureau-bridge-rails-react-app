import { useMemo } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { CollapsiblePanel } from "../components/tables/CollapsiblePanel";
import { TradelinesTable } from "../components/tables/TradelinesTable";
import { Button } from "../components/ui/Button";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useSessionState } from "../hooks/useSessionState";
import type { TradelineTableRow } from "../types/snapshot";
import {
  categoryFromAccountType,
  balanceFromNormalized
} from "../components/tables/tradelineRowBuilders";

// fixture
import rawPull from "../assets/fixtures/report-airplane-jefferson-2025-03.json";

// pipeline
import { runPipeline } from "../pipeline/runPipeline";

// Import the normalized union type if you want stronger typing.
// If the import path differs, keep it as AnyObj and it will still work.
// import type { NormalizedAccount } from "../pipeline/steps/normalize/normalizeAccount";

type AnyObj = Record<string, any>;

export default function Snapshot() {
  // 1) Run pipeline once
  const pipeline = useMemo(() => runPipeline(rawPull), []);

  // 2) Map normalizedAccounts -> TradelineTableRow[]
  const revolvingRows: TradelineTableRow[] = useMemo(() => {
    const normalizedAccounts: AnyObj[] =
      (pipeline?.report?.normalizedAccounts as AnyObj[]) ?? [];

    return normalizedAccounts
      .filter((a) => a?.sourceType === "creditAccount")
      .filter((a) => a?.section === "revolvingAccounts")
      .map((a) => ({
        id: (a?.id ?? "Unknown").toString(),
        creditor: (a?.accountName ?? "Unknown").toString(),
        category: categoryFromAccountType(a?.accountType),
        balance: balanceFromNormalized(a)
      }));
  }, [pipeline]);

  const TOP_N = 8;

  const [revExpanded, setRevExpanded] = useSessionState("snapshot.revExpanded", true);
  const [revShowAll, setRevShowAll] = useSessionState("snapshot.revShowAll", false);

  const revVisible = revShowAll ? revolvingRows : revolvingRows.slice(0, TOP_N);

  return (
    <AppLayout title="Credit Snapshot">
      <div className="mt-4 grid gap-4">
        <CollapsiblePanel
          title="Revolving Tradelines"
          subtitle={`Current pull. ${revolvingRows.length} total.`}
          right={
            <>
              <Button
                variant="ghost"
                onClick={() => setRevExpanded((v) => !v)}
                className="flex items-center gap-1 text-sm"
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
                <Button 
                  className="text-sm"
                  variant="secondary" onClick={() => setRevShowAll((v) => !v)}>
                  {revShowAll ? `Show top ${TOP_N}` : `Show all (${revolvingRows.length})`}
                </Button>
              ) : null}
            </>
          }
        >
          {revExpanded ? <TradelinesTable rows={revVisible} /> : null}
        </CollapsiblePanel>
      </div>
    </AppLayout>
  );
}
