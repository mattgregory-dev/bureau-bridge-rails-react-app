import { AppLayout } from "../components/layout/AppLayout";
import { Card, CardBody, CardHeader } from "../components/ui/Card";

export default function Readiness() {
  return (
    <AppLayout title="Readiness">
      <Card>
        <CardHeader title="Readiness Assessment" subtitle="Derived. Not a pre-approval decision." />
        <CardBody>
          <div className="text-sm text-slate-700">
            <div className="font-semibold">Status: Borderline</div>
            <ul className="mt-2 list-disc pl-5 text-slate-600">
              <li>Utilization high</li>
              <li>Recent inquiries</li>
              <li>Derogatory items present</li>
            </ul>
          </div>
        </CardBody>
      </Card>
    </AppLayout>
  );
}
