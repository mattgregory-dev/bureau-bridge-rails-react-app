import { ReactNode } from "react";
import { TopNav } from "./TopNav";

export function AppLayout({
  title,
  children,
  right
}: {
  title?: string;
  right?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <TopNav title={title} right={right} />
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
