export type ProviderView = Record<string, unknown>;

export type ExtractProviderViewsResult = {
  providerViews: ProviderView[];
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null;
}

export function extractProviderViews(obj: unknown): ExtractProviderViewsResult {
  const result: ProviderView[] = [];

  function walk(value: unknown): void {
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }

    if (!isRecord(value)) return;

    for (const [key, val] of Object.entries(value)) {
      if (key.toLowerCase() === "providerviews" && Array.isArray(val)) {
        // Only keep object-like entries. Ignore primitives.
        for (const item of val) {
          if (isRecord(item)) result.push(item);
        }
      } else {
        walk(val);
      }
    }
  }

  walk(obj);
  return { providerViews: result };
}
