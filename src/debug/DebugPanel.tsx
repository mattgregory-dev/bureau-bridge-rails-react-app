import { useState } from "react";
import type { PipelineTrace } from "../types/pipeline";
import { AppLayout } from "../components/layout/AppLayout";
import { Card, CardBody, CardHeader } from "../components/ui/Card";

type DebugPanelProps = {
  trace?: PipelineTrace;
};

export default function DebugPanel({ trace }: DebugPanelProps) {
  const [idx, setIdx] = useState(0);

  return (
    <AppLayout title="Debug" fullWidth>
      {!trace || trace.length === 0 ? (
        <Card>
          <CardHeader title="No debug trace" subtitle="Enable debug trace generation and reload." />
          <CardBody>
            <div className="text-sm text-slate-600">No steps recorded.</div>
          </CardBody>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-[260px_1fr]">
          <Card>
            <CardHeader title="Trace Steps" subtitle={`${trace.length} steps`} />
            <CardBody>
              <div className="max-h-[70vh] overflow-y-auto pr-1">
                {trace.map((t, i) => {
                  const isActive = i === Math.min(idx, trace.length - 1);
                  return (
                    <button
                      key={`${i}-${t.label}`}
                      onClick={() => setIdx(i)}
                      className={[
                        "mb-2 block w-full rounded-md border px-3 py-2 text-left text-sm transition",
                        isActive
                          ? "border-slate-300 bg-slate-100"
                          : "border-slate-200 bg-white hover:bg-slate-50",
                      ].join(" ")}
                    >
                      <div className="font-medium text-slate-900">
                        {i}. {t.label}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Step Data" subtitle="JSON output for selected step" />
            <CardBody>
              <pre className="m-0 max-h-[70vh] overflow-auto rounded-md bg-zinc-900 p-3 text-sm text-green-300">
                {JSON.stringify(trace[Math.min(idx, trace.length - 1)]?.data, null, 2)}
              </pre>
            </CardBody>
          </Card>
        </div>
      )}
    </AppLayout>
  );
}
