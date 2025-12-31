import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-xl border border-slate-200 bg-white shadow-sm">{children}</div>;
}

export function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="border-b border-slate-100 px-4 py-3">
      <div className="text-lg font-semibold">{title}</div>
      {subtitle ? <div className="text-base mt-0 font-normal">{subtitle}</div> : null}
    </div>
  );
}

export function CardBody({ children }: { children: ReactNode }) {
  return <div className="px-4 py-4">{children}</div>;
}
