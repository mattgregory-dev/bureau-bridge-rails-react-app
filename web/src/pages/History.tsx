import { AppLayout } from "../components/layout/AppLayout";
import { Card, CardBody, CardHeader } from "../components/ui/Card";

export default function History() {
  return (
    <AppLayout title="Metrics History">
      <Card>
        <CardHeader title="Derived Metrics Over Time" subtitle="No raw tradelines stored." />
        <CardBody>
          <div className="text-sm text-slate-700">
            Add charts later. For now, show a simple list/table of snapshots.
          </div>
        </CardBody>
      </Card>
    </AppLayout>
  );
}
