import { useMemo, useState } from "react";

export default function DebugPanel({ trace }) {
  const [idx, setIdx] = useState(0);
  const step = trace?.[idx];

  if (!trace?.length) return null;

  return (
    <div className="grid grid-cols-[240px_1fr] gap-3 h-full">
      <div className="border-r border-gray-300 p-3 overflow-y-auto">
        {trace.map((t, i) => (
          <button
            key={t.label}
            onClick={() => setIdx(i)}
            className={[
              "block w-full text-left px-2 py-1.5 mb-1 border rounded text-sm",
              i === idx
                ? "bg-gray-200 border-gray-400"
                : "bg-white border-gray-300 hover:bg-gray-100",
            ].join(" ")}
          >
            {i}. {t.label}
          </button>
        ))}
      </div>

      <pre className="m-0 p-3 bg-zinc-900 text-green-400 text-xs overflow-auto rounded">
        {JSON.stringify(step.data, null, 2)}
      </pre>
    </div>
  );

}
