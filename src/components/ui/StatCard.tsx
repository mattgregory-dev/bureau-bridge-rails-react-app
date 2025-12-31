import { ReactNode } from "react";
import { Card } from "./Card";

export function StatCard({
  label,
  value,
  hint,
  icon
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <Card>
      <div className="flex items-start justify-between p-4">
        <div>
          <div className="text-base font-medium">{label}</div>
          <div className="mt-1 text-2xl font-semibold">{value}</div>
          {hint ? <div className="mt-1 text-sm">{hint}</div> : null}
        </div>
        {icon ? <div className="">{icon}</div> : null}
      </div>
    </Card>
  );
}
