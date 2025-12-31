/**
 * Creates a trace tapper.
 * - If enabled is false, tap() just returns the value (no trace).
 * - If enabled is true, each tap(label, data) pushes { label, data } into trace[].
 */
export type TraceStep = {
  label: string;
  data: unknown;
};

export type PipelineTrace = TraceStep[];

type TapFn = <T>(label: string, data: T) => T;

export function createTap(enabled: boolean): {
  trace: PipelineTrace | null;
  tap: TapFn;
} {
  const trace: PipelineTrace | null = enabled ? [] : null;

  function tap<T>(label: string, data: T): T {
    if (trace) {
      trace.push({ label, data });
    }
    return data;
  }

  return { trace, tap };
}

