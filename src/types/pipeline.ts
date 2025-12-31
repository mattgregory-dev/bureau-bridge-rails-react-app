export type TraceStep = {
  label: string;
  data: unknown;
};

export type PipelineTrace = TraceStep[];
