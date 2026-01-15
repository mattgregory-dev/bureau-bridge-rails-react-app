import React from "react";

type BadgeTone = "slate" | "green" | "amber" | "red" | "ghost" | "bare";

export default function Badge({
  children,
  tone,
}: {
  children: React.ReactNode;
  tone: BadgeTone;
}) {
  const tones: Record<BadgeTone, string> = {
    slate: "bg-[#e1f0ff] border border-slate-200 text-slate-700", //bg-slate-100
    green: "bg-green-50 border border-green-200 text-green-700",
    amber: "bg-amber-50 border border-amber-200 text-amber-800",
    red: "bg-red-50 border border-red-200 text-red-700",
    ghost: "bg-transparent border border-dashed border-transparent text-white",
    bare: "bg-transparent border border-transparent text-slate-600 text-[13px]",
  };

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2 py-[6px] text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
