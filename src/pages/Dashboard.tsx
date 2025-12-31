import { AppLayout } from "../components/layout/AppLayout";
import { StatCard } from "../components/ui/StatCard";
import { Card, CardBody, CardHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import type { ReactNode } from "react";

type Me = {
  id: string;
  email: string;
  role?: string;
  tenantId?: string | null;
};

type DashboardProps = {
  me: Me;
  onLogout: () => Promise<void> | void;
  right?: ReactNode;
};

export default function Dashboard({ me, onLogout }: DashboardProps) {
  return (
    <AppLayout
      title="Dashboard"
      right={
        <div className="flex items-center gap-3">
          <div className="text-sm text-slate-600">{me.email}</div>
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>
      }
    >
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Score band" value="Good" hint="Example" />
        <StatCard label="Utilization" value="32%" hint="Target under 10-30%" />
        <StatCard label="Derogatories" value="4" hint="Collections + lates" />
      </div>

      <div className="mt-4">
        <Card>
          <CardHeader
            title="Readiness"
            subtitle="Computed from current snapshot + inputs"
          />
          <CardBody>
            <div className="text-sm text-slate-700">
              Borderline. Main blockers: utilization high, 2 recent inquiries.
            </div>
          </CardBody>
        </Card>
      </div>
    </AppLayout>
  );
}
