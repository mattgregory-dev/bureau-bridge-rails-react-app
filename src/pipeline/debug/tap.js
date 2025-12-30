/**
 * Creates a trace tapper.
 * - If enabled is false, tap() just returns the value (no trace).
 * - If enabled is true, each tap(label, data) pushes { label, data } into trace[].
 */
export function createTap(enabled) {
  const trace = enabled ? [] : null;

  function tap(label, data) {
    if (trace) trace.push({ label, data });
    return data;
  }

  return { trace, tap };
}
