import type { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="card-wrapper rounded-xl border border-slate-200 bg-white overflow-hidden">
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle,
  right,
  isCollapsed = false,
  className = "",
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  isCollapsed?: boolean;
  className?: string;
}) {
  return (
    <div
      className={[
        "card-header flex flex-col gap-2 px-4 py-3 md:flex-row md:items-center md:justify-between",
        isCollapsed ? "rounded-xl border-b-0" : "rounded-t-xl border-b border-slate-200",
        className,
      ].join(" ")}
    >
      <div className="card-title-wrapper">
        <div className="card-title text-sm font-semibold text-slate-900">
          {title}
        </div>
        {subtitle ? (
          <div className="card-subtitle mt-1 text-xs text-slate-500">
            {subtitle}
          </div>
        ) : null}
      </div>

      {right ? (
        <div className="card-header-right flex items-center gap-2">
          {right}
        </div>
      ) : null}
    </div>
  );
}

export function CardBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`card-body px-[14px] py-[14px] pb-10px] ${className}`}>{children}</div>;
}

export function CardFooter({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`card-footer border-t border-slate-200 px-4 py-3 ${className}`}>
      {children}
    </div>
  );
}
