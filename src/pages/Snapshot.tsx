import { AppLayout } from "../components/layout/AppLayout";
import { StatCard } from "../components/ui/StatCard";
import { Card, CardBody, CardHeader } from "../components/ui/Card";

export default function Snapshot() {
  return (
    <AppLayout title="Credit Snapshot">
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Score band" value="Good" hint="From current pull" />
        <StatCard label="Utilization" value="32%" hint="Total revolving utilization" />
        <StatCard label="Derogatories" value="4" hint="Collections + lates + charge-offs" />
      </div>

      <div className="mt-4">
        <Card>
          <CardHeader title="Key Signals" subtitle="Snapshot from current bureau payload" />
          <CardBody>
            <div className="text-sm">
              Replace placeholders with pipeline-derived metrics when ready.
            </div>
          </CardBody>
        </Card>
      </div>
    </AppLayout>
  );
}
