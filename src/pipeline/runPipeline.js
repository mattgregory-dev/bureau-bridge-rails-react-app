import { extractProviderViews } from "./steps/extractProviderViews";
import { normalizeAccountV1 } from "./steps/normalize/normalizeAccountV1";
import { createTap } from "./debug/tap";

export function runPipeline(raw, { debug = false } = {}) {
  const { trace, tap } = createTap(debug);

  const { providerViews } = tap("providerViews", extractProviderViews(raw));

  const sections = [
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
        const list = Array.isArray(view?.[section]) ? view[section] : [];
        return list.map((rawAcc) =>
          normalizeAccountV1(rawAcc, { provider, section }, { debug })
        );
      });
    })
  );

  const report = tap("report", { normalizedAccountsV1 });

  return trace ? { report, trace } : { report };
}
