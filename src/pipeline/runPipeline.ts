import { extractProviderViews } from "./steps/extractProviderViews";
import { normalizeAccountV1 } from "./steps/normalize/normalizeAccountV1";
import { createTap } from "./debug/tap";

type SectionName =
  | "revolvingAccounts"
  | "mortgageAccounts"
  | "installmentAccounts"
  | "collections"
  | "otherAccounts";

type ProviderView = {
  provider?: string;
  revolvingAccounts?: unknown[];
  mortgageAccounts?: unknown[];
  installmentAccounts?: unknown[];
  collections?: unknown[];
  otherAccounts?: unknown[];
  [key: string]: unknown;
};

type ExtractProviderViewsResult = {
  providerViews: ProviderView[];
};

type TapFn = <T>(label: string, value: T) => T;

// Import the real trace type from tap so App.tsx and DebugPanel agree.
import type { PipelineTrace } from "./debug/tap";

type CreateTapResult = {
  tap: TapFn;
  trace: PipelineTrace | null;
};

type RunPipelineOptions = {
  debug?: boolean;
};

// Keep this loose until normalizeAccountV1 is typed.
export type NormalizedAccountV1 = unknown;

export type PipelineReportV1 = {
  normalizedAccountsV1: NormalizedAccountV1[];
};

export type PipelineResultV1 = {
  report: PipelineReportV1;
  trace: PipelineTrace | null;
};

export function runPipeline(
  raw: unknown,
  { debug = false }: RunPipelineOptions = {}
): PipelineResultV1 {
  const { trace, tap } = createTap(debug) as unknown as CreateTapResult;

  const { providerViews } = tap(
    "providerViews",
    extractProviderViews(raw) as ExtractProviderViewsResult
  );

  const sections: SectionName[] = [
    "revolvingAccounts",
    "mortgageAccounts",
    "installmentAccounts",
    "collections",
    "otherAccounts",
  ];

  const normalizedAccountsV1 = tap(
    "normalizedAccountsV1",
    providerViews.flatMap((view) => {
      const provider = view?.provider ?? "UNKNOWN";

      return sections.flatMap((section) => {
        const list = Array.isArray(view?.[section])
          ? (view[section] as unknown[])
          : [];

        return list.map((rawAcc) =>
          normalizeAccountV1(
            rawAcc as Record<string, unknown> | null | undefined,
            { provider, section },
            { debug }
          )
        );
      });
    })
  );

  const report = tap("report", { normalizedAccountsV1 });

  return { report, trace: trace ?? null };
}
