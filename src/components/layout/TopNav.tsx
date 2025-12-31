import { ReactNode } from "react";

export function TopNav({
  title = "Dashboard",
  right
}: {
  title?: string;
  right?: ReactNode;
}) {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-slate-900" />
          <div>
            <div className="text-sm font-semibold">{title}</div>
            <div className="text-xs text-slate-500">Credit Snapshot + Readiness</div>
          </div>
        </div>
        <div className="flex items-center gap-2">{right}</div>
      </div>
    </header>
  );
}
