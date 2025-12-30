// src/pipeline/runPipeline.js

function extractProviderViews(obj) {
  const result = [];

  function recurse(value) {
    if (Array.isArray(value)) value.forEach(recurse);
    else if (value && typeof value === "object") {
      for (const [key, val] of Object.entries(value)) {
        if (key.toLowerCase() === "providerviews" && Array.isArray(val)) result.push(...val);
        else recurse(val);
      }
    }
  }

  recurse(obj);
  return result;
}

// Minimal “new normalize” (v0):
// - no heuristics
// - no grouping
// - just stable shape for downstream steps
function normalizeAccountV0(rawAcc, { provider, section }) {
  return {
    provider,
    section,
    // keep minimal identity hints (safe defaults)
    creditorName:
      rawAcc?.creditorName ??
      rawAcc?.subscriber?.name ??
      rawAcc?.name ??
      rawAcc?.accountName ??
      "UNKNOWN",
    accountNumber:
      (rawAcc?.accountNumber ?? rawAcc?.accountNumberDisplay ?? rawAcc?.number ?? "")
        .toString()
        .replace(/[^0-9]/g, ""),
    openedOn: rawAcc?.dateOpened ?? rawAcc?.openDate ?? rawAcc?.openedOn ?? null,
    status: rawAcc?.status ?? rawAcc?.accountStatus ?? null,
    loanType: rawAcc?.loanType ?? rawAcc?.accountType ?? null,
    balance: rawAcc?.balance ?? rawAcc?.currentBalance ?? null,

    // debugging: keep the raw object for now
    raw: rawAcc,
  };
}

export function runPipeline(raw, { debug = false } = {}) {
  const trace = debug ? [] : null;
  const tap = (label, data) => {
    if (trace) trace.push({ label, data });
    return data;
  };

  // Step 1: extract provider views
  const providerViews = tap("providerViews", extractProviderViews(raw));

  // Step 1b: flatten accounts into a single list with {provider, section}
  const sections = [
    { key: "revolvingAccounts", section: "revolving" },
    { key: "mortgageAccounts", section: "mortgage" },
    { key: "installmentAccounts", section: "installment" },
    { key: "collections", section: "collections" },
    { key: "otherAccounts", section: "other" },
  ];

  const accounts = [];

  for (const view of providerViews) {
    const provider = view?.provider ?? "UNKNOWN";
    for (const s of sections) {
      const list = Array.isArray(view?.[s.key]) ? view[s.key] : [];
      for (const rawAcc of list) {
        accounts.push(normalizeAccountV0(rawAcc, { provider, section: s.section }));
      }
    }
  }

  tap("normalizedAccountsV0", accounts);

  // Step 2+ later. For now, the "report model" is just the normalized accounts list.
  const report = tap("reportV0", {
    providerCount: providerViews.length,
    accountCount: accounts.length,
    accounts,
  });

  return trace ? { report, trace } : { report };
}
