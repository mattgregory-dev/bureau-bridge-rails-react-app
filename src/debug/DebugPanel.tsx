import { useEffect, useMemo, useState } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { Card, CardBody, CardHeader } from "../components/ui/Card";
import { loadFixture } from "../fixtures/loadFixture";
import { runPipeline } from "../pipeline/runPipeline";

type NormalizedAccount = any;
type ViewMode = "normalized" | "raw" | "sourceTypes";

type SourceTypeKey = string; // keep loose while your union evolves

export default function DebugPanel() {
  const [mode, setMode] = useState<ViewMode>("normalized");

  const [rawReport, setRawReport] = useState<unknown | null>(null);
  const [items, setItems] = useState<NormalizedAccount[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [idx, setIdx] = useState(0);

  // used only in sourceTypes mode
  const [sourceFilter, setSourceFilter] = useState<SourceTypeKey | "all">("all");

  useEffect(() => {
    (async () => {
      try {
        const raw = await loadFixture("report-airplane-jefferson-2025-03.json");
        setRawReport(raw);

        const out = runPipeline(raw);

        // Try a few common shapes so DebugPanel doesn't silently go empty.
        const normalized =
          (out as any)?.report?.normalizedAccounts ??
          (out as any)?.report?.normalized?.accounts ??
          (out as any)?.normalizedAccounts ??
          (out as any)?.normalized?.accounts ??
          [];

        if (!Array.isArray(normalized)) {
          console.error("normalizedAccounts is not an array:", normalized, "pipeline out:", out);
          throw new Error("Pipeline output: normalizedAccounts is not an array. Check console for details.");
        }

        setItems(normalized);

        // console.log("PIPELINE OUT", out);
        // console.log("NORMALIZED COUNT", normalized.length);
        // console.log("FIRST ITEM", normalized[0]);

      } catch (e) {
        setError(String(e));
        setItems([]);
        setRawReport(null);
      }
    })();
  }, []);

  const safeItems = items ?? [];

  const itemsBySourceType = useMemo(() => {
    const map: Record<string, NormalizedAccount[]> = {};
    for (const a of safeItems) {
      const key = String(a?.sourceType ?? "unknown");
      (map[key] ??= []).push(a);
    }
    return map;
  }, [safeItems]);

  const sourceTypeCounts = useMemo(() => {
    const entries = Object.entries(itemsBySourceType).map(([k, list]) => ({
      sourceType: k,
      count: list.length,
    }));
    entries.sort((a, b) => b.count - a.count);
    return entries;
  }, [itemsBySourceType]);

  const filteredItems = useMemo(() => {
    if (mode !== "sourceTypes") return safeItems;
    if (sourceFilter === "all") return safeItems;
    return itemsBySourceType[sourceFilter] ?? [];
  }, [mode, sourceFilter, safeItems, itemsBySourceType]);

  const safeIdx = useMemo(() => {
    if (!filteredItems || filteredItems.length === 0) return 0;
    return Math.min(idx, filteredItems.length - 1);
  }, [idx, filteredItems]);

  const selected =
    filteredItems && filteredItems.length > 0 ? filteredItems[safeIdx] : null;

  const leftButton = (label: string, next: ViewMode) => {
    const isActive = mode === next;
    return (
      <button
        onClick={() => {
          setMode(next);
          setIdx(0);
          if (next !== "sourceTypes") setSourceFilter("all");
        }}
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
    <AppLayout
      title="Debug"
      fullWidth
      showDisclosure={false}
      showBottomPadding={false}
    >
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
              {leftButton("Source Types (Counts)", "sourceTypes")}
              {leftButton("Raw Report (Unnormalized)", "raw")}

              {mode === "normalized" ? (
                <div className="mt-4 text-xs text-slate-600">
                  {safeItems.length} normalized accounts
                </div>
              ) : mode === "sourceTypes" ? (
                <div className="mt-4 text-xs text-slate-600">
                  {sourceTypeCounts.length} sourceTypes detected
                </div>
              ) : (
                <div className="mt-4 text-xs text-slate-600">Raw fixture JSON</div>
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
          ) : mode === "sourceTypes" ? (
            <div className="grid gap-4 md:grid-cols-[320px_1fr]">
              <Card>
                <CardHeader title="Source Types" subtitle="Counts and quick filter" />
                <CardBody>
                  <button
                    onClick={() => {
                      setSourceFilter("all");
                      setIdx(0);
                    }}
                    className={[
                      "mb-2 block w-full rounded-md border px-3 py-2 text-left text-sm transition",
                      sourceFilter === "all"
                        ? "border-slate-300 bg-slate-100"
                        : "border-slate-200 bg-white hover:bg-slate-50",
                    ].join(" ")}
                  >
                    <div className="font-medium text-slate-900">All</div>
                    <div className="text-xs text-slate-600">
                      {safeItems.length} items
                    </div>
                  </button>

                  <div className="max-h-[64vh] overflow-y-auto pr-1">
                    {sourceTypeCounts.map((x) => {
                      const isActive = sourceFilter === x.sourceType;
                      return (
                        <button
                          key={x.sourceType}
                          onClick={() => {
                            setSourceFilter(x.sourceType);
                            setIdx(0);
                          }}
                          className={[
                            "mb-2 block w-full rounded-md border px-3 py-2 text-left text-sm transition",
                            isActive
                              ? "border-slate-300 bg-slate-100"
                              : "border-slate-200 bg-white hover:bg-slate-50",
                          ].join(" ")}
                        >
                          <div className="font-medium text-slate-900">
                            {x.sourceType}
                          </div>
                          <div className="text-xs text-slate-600">
                            {x.count} items
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>

              {filteredItems.length === 0 ? (
                <Card>
                  <CardHeader title="No data" subtitle="Filter produced 0 items" />
                  <CardBody>
                    <div className="text-sm text-slate-600">
                      No accounts were produced for this sourceType.
                    </div>
                  </CardBody>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-[360px_1fr]">
                  <Card>
                    <CardHeader
                      title="Items"
                      subtitle={`${filteredItems.length} ${
                        sourceFilter === "all" ? "" : `(${sourceFilter})`
                      }`}
                    />
                    <CardBody>
                      <div className="max-h-[70vh] overflow-y-auto pr-1">
                        {filteredItems.map((a, i) => {
                          const isActive = i === safeIdx;

                          const label =
                            a?.tradelineKey ??
                            a?.collectionKey ??
                            a?.inquiryKey ??
                            a?.publicRecordKey ??
                            `${a?.provider ?? "?"} ${a?.section ?? "?"}`;

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
                              <div className="font-medium text-slate-900 overflow-hidden">
                                {i}. {label}
                              </div>
                              <div className="text-xs text-slate-600">
                                {(a?.sourceType ?? "unknown") as string}
                                {a?.accountName ? ` • ${a.accountName}` : ""}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </CardBody>
                  </Card>

                  <Card>
                    <CardHeader title="Selected Item" subtitle="Normalized JSON" />
                    <CardBody>
                      <pre className="m-0 max-h-[70vh] max-w-[1100px] overflow-auto rounded-md bg-zinc-900 p-3 text-sm text-green-300">
                        {JSON.stringify(selected, null, 2)}
                      </pre>
                    </CardBody>
                  </Card>
                </div>
              )}
            </div>
          ) : safeItems.length === 0 ? (
            <Card>
              <CardHeader title="No data" subtitle="normalizedAccounts is empty" />
              <CardBody>
                <div className="text-sm text-slate-600">No accounts were produced.</div>
              </CardBody>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-[320px_1fr]">
              <Card>
                <CardHeader
                  title="Normalized Accounts"
                  subtitle={`${safeItems.length} items`}
                />
                <CardBody>
                  <div className="max-h-[70vh] overflow-y-auto pr-1">
                    {safeItems.map((a, i) => {
                      const isActive = i === Math.min(idx, safeItems.length - 1);
                      const label =
                        a?.tradelineKey ??
                        `${a?.provider ?? "?"} ${a?.section ?? "?"} ${
                          a?.accountLast4 ?? ""
                        }`;

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
                          <div className="font-medium text-slate-900 overflow-hidden">
                            {i}. {label}
                          </div>
                          <div className="text-xs text-slate-600">
                            {(a?.sourceType ?? "unknown") as string} •{" "}
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
