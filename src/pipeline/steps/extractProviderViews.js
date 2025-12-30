export function extractProviderViews(obj) {
  const result = [];

  function walk(value) {
    if (Array.isArray(value)) {
      value.forEach(walk);
    } else if (value && typeof value === "object") {
      for (const [key, val] of Object.entries(value)) {
        if (key.toLowerCase() === "providerviews" && Array.isArray(val)) {
          result.push(...val);
        } else {
          walk(val);
        }
      }
    }
  }

  walk(obj);
  return { providerViews: result };
}
