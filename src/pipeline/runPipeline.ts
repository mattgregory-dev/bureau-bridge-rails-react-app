import { extractProviderViews } from "./steps/extractProviderViews";
import {
  normalizeAccount,
  normalizePublicRecordsSection,
  type NormalizedAccount,
} from "./steps/normalize/normalizeAccount";

type SectionName =
  | "revolvingAccounts"
  | "mortgageAccounts"
  | "installmentAccounts"
  | "collections"
  | "otherAccounts"
  | "inquiries"
  | "publicRecords";

type ProviderView = {
  provider?: string;
  revolvingAccounts?: unknown[];
  mortgageAccounts?: unknown[];
  installmentAccounts?: unknown[];
  collections?: unknown[];
  otherAccounts?: unknown[];
  inquiries?: unknown[];
  publicRecords?: Record<string, unknown> | unknown[];

  [key: string]: unknown;
};

type ExtractProviderViewsResult = {
  providerViews: ProviderView[];
};

// Optional: re-export so callers can import from pipeline instead of normalize layer.
// export type { NormalizedAccount };

export type PipelineReport = {
  normalizedAccounts: NormalizedAccount[];
};

export type PipelineResult = {
  report: PipelineReport;
};

export function runPipeline(raw: unknown): PipelineResult {
  const { providerViews } =
    extractProviderViews(raw) as ExtractProviderViewsResult;

  const sections: SectionName[] = [
    "revolvingAccounts",
    "mortgageAccounts",
    "installmentAccounts",
    "collections",
    "otherAccounts",
    "inquiries",
    "publicRecords",
  ];

  const normalizedAccounts = providerViews.flatMap((view) => {
    const provider = view?.provider ?? "UNKNOWN";

    return sections.flatMap((section) => {
      if (section === "publicRecords") {
        // publicRecords is bucketed object, not an array
        const rawSection = (view?.[section] ?? null) as Record<string, unknown> | null;

        return normalizePublicRecordsSection(rawSection, {
          provider,
          section,
        });
      }

      const list = Array.isArray(view?.[section]) ? (view[section] as unknown[]) : [];

      return list.map((rawAcc) =>
        normalizeAccount(rawAcc as Record<string, unknown> | null | undefined, {
          provider,
          section,
        })
      );
    });

  });

  return { report: { normalizedAccounts } };
}
