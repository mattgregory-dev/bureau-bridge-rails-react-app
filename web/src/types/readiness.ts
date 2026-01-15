export type ReadinessStatus = "not_ready" | "borderline" | "improving" | "likely_ready";

export type ReadinessAssessment = {
  status: ReadinessStatus;
  scoreBand?: string;
  utilizationPct?: number;
  inquiryCount12m?: number;
  collectionsCount?: number;
  blockers: string[];
};
