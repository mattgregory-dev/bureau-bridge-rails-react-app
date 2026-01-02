import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";

export function AppLayout({
  title,
  children,
  fullWidth = false,
  showDisclosure = true,
  showBottomPadding = true,
}: {
  title?: string;
  right?: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
  showDisclosure?: boolean;
  showBottomPadding?: boolean;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopNav title={title} />
          <main
            className={[
              "mx-auto w-full flex-1 px-4 py-6",
              showBottomPadding ? "mb-[100px]" : "",
              fullWidth ? "" : "max-w-6xl",
            ].join(" ")}
          >
            {children}
          </main>
          {showDisclosure && (
            <footer className="border-t bg-white pb-16 pt-8">
              <div className="mx-auto max-w-[800px] px-4 text-center text-sm text-slate-600">
                <div className="font-semibold text-slate-800">Disclosure</div>

                <p className="mt-2">
                  The information presented on this site is for informational and educational purposes
                  only. We do not assess your financial readiness, provide financial advice, or make
                  recommendations regarding credit, lending, or financial decisions.
                </p>

                <p className="mt-3">
                  The data displayed may be incomplete, inaccurate, delayed, or contain errors. You
                  should independently verify all information before taking any action.
                </p>

                <p className="mt-3">
                  We make no representations or guarantees that using this site will improve your
                  credit score or financial outcomes. Any actions you take based on the information
                  provided are solely your responsibility.
                </p>

                <p className="mt-3 font-bold">
                  For personalized financial guidance, please consult a qualified financial or credit
                  professional.
                </p>
              </div>
            </footer>
          )}
        </div>
      </div>
    </div>
  );
}
