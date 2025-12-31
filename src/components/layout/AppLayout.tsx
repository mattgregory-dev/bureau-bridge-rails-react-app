import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

export function AppLayout({
  title,
  children,
  right,
  fullWidth = false,
}: {
  title?: string;
  right?: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopNav title={title} right={right} />
          <main
            className={[
              "mx-auto w-full flex-1 px-4 py-6",
              fullWidth ? "" : "max-w-6xl",
            ].join(" ")}
          >
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
