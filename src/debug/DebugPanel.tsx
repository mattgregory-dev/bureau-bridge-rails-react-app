import { useEffect, useMemo, useState } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { Card, CardBody, CardHeader } from "../components/ui/Card";
import { loadFixture } from "../fixtures/loadFixture";
import { runPipeline } from "../pipeline/runPipeline";

type NormalizedAccount = any;
type ViewMode = "normalized" | "raw";

export default function DebugPanel() {
  const [mode, setMode] = useState<ViewMode>("normalized");

  const [rawReport, setRawReport] = useState<unknown | null>(null);
  const [items, setItems] = useState<NormalizedAccount[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const raw = await loadFixture("report-airplane-jefferson-2025-03.json");
        setRawReport(raw);

        const out = runPipeline(raw);
        setItems(out.report.normalizedAccounts ?? []);
      } catch (e) {
        setError(String(e));
        setItems([]);
        setRawReport(null);
      }
    })();
  }, []);

  const safeIdx = useMemo(() => {
    if (!items || items.length === 0) return 0;
    return Math.min(idx, items.length - 1);
  }, [idx, items]);

  const selected = items && items.length > 0 ? items[safeIdx] : null;

  const leftButton = (label: string, next: ViewMode) => {
    const isActive = mode === next;
    return (
      <button
        onClick={() => setMode(next)}
        className={[
          "mb-2 block w-full rounded-md border px-3 py-2 text-left text-sm transition",
          isActive
            ? "border-slate-300 bg-slate-100"
            : "border-slate-200 bg-white hover:bg-slate-50",
        ].join(" ")}
      >
        <div className="font-medium text-slate-900">{label}</div>
      </button>
    );
  };

  return (
    <AppLayout title="Debug" fullWidth>
      {!items ? (
        <Card>
          <CardHeader title="Loading" subtitle="Building normalized accounts" />
          <CardBody>
            <div className="text-sm text-slate-600">
              Loading fixture and running pipeline…
            </div>
          </CardBody>
        </Card>
      ) : error ? (
        <Card>
          <CardHeader title="Error" subtitle="Pipeline failed" />
          <CardBody>
            <pre className="m-0 overflow-auto rounded-md bg-zinc-900 p-3 text-sm text-red-300">
              {error}
            </pre>
          </CardBody>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-[260px_1fr]">
          <Card>
            <CardHeader title="Views" subtitle="Choose what to inspect" />
            <CardBody>
              {leftButton("Normalized Accounts", "normalized")}
              {leftButton("Raw Report (Unnormalized)", "raw")}

              {mode === "normalized" ? (
                <div className="mt-4 text-xs text-slate-600">
                  {items.length} normalized accounts
                </div>
              ) : (
                <div className="mt-4 text-xs text-slate-600">
                  Raw fixture JSON
                </div>
              )}
            </CardBody>
          </Card>

          {mode === "raw" ? (
            <Card>
              <CardHeader title="Raw Report" subtitle="Unnormalized JSON blob" />
              <CardBody>
                <pre className="m-0 max-h-[70vh] max-w-[1100px] overflow-auto rounded-md bg-zinc-900 p-3 text-sm text-green-300">
                  {JSON.stringify(rawReport, null, 2)}
                </pre>
              </CardBody>
            </Card>
          ) : items.length === 0 ? (
            <Card>
              <CardHeader title="No data" subtitle="normalizedAccounts is empty" />
              <CardBody>
                <div className="text-sm text-slate-600">No accounts were produced.</div>
              </CardBody>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-[320px_1fr]">
              <Card>
                <CardHeader title="Normalized Accounts" subtitle={`${items.length} items`} />
                <CardBody>
                  <div className="max-h-[70vh] overflow-y-auto pr-1">
                    {items.map((a, i) => {
                      const isActive = i === safeIdx;
                      const label =
                        a?.tradelineKey ??
                        `${a?.provider ?? "?"} ${a?.section ?? "?"} ${a?.accountLast4 ?? ""}`;

                      return (
                        <button
                          key={`${i}-${label}`}
                          onClick={() => setIdx(i)}
                          className={[
                            "mb-2 block w-full rounded-md border px-3 py-2 text-left text-sm transition",
                            isActive
                              ? "border-slate-300 bg-slate-100"
                              : "border-slate-200 bg-white hover:bg-slate-50",
                          ].join(" ")}
                        >
                          <div className="font-medium text-slate-900">
                            {i}. {label}
                          </div>
                          <div className="text-xs text-slate-600">
                            {a?.accountName ?? "Unknown"} • {a?.accountType ?? "Unknown"}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>

              <Card>
                <CardHeader title="Selected Account" subtitle="Normalized JSON" />
                <CardBody>
                  <pre className="m-0 max-h-[70vh] max-w-[1100px] overflow-auto rounded-md bg-zinc-900 p-3 text-sm text-green-300">
                    {JSON.stringify(selected, null, 2)}
                  </pre>
                </CardBody>
              </Card>
            </div>
          )}
        </div>
      )}
    </AppLayout>
  );
}
