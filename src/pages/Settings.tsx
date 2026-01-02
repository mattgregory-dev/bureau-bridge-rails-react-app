import { useState } from "react";
import { AppLayout } from "../components/layout/AppLayout";
import { StatCard } from "../components/ui/StatCard";
import { Card, CardBody, CardHeader } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default function Settings() {
  const [companyName, setCompanyName] = useState("BureauBridge");
  const [timezone, setTimezone] = useState("America/Phoenix");
  const [compactMode, setCompactMode] = useState(false);

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [partnerSummarySharing, setPartnerSummarySharing] = useState(true);

  function save(e: React.FormEvent) {
    e.preventDefault();
    // Wire later: POST /api/settings (tenant/user settings)
    alert("Saved (stub). Wire to API later.");
  }

  return (
    <AppLayout title="Settings" showDisclosure={false}>
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard label="Account" value="Tenant Admin" hint="Role (stub)" />
        <StatCard label="Timezone" value={timezone} hint="Used for snapshots and logs" />
        <StatCard label="UI" value={compactMode ? "Compact" : "Comfort"} hint="Density (local stub)" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader title="Workspace" subtitle="Basic tenant identity and defaults" />
          <CardBody>
            <form onSubmit={save} className="space-y-4">
              <label className="block">
                <div className="text-xs font-medium text-slate-600">Company name</div>
                <input
                  className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </label>

              <label className="block">
                <div className="text-xs font-medium text-slate-600">Timezone</div>
                <select
                  className="mt-1 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-400"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  <option value="America/Phoenix">America/Phoenix</option>
                  <option value="America/Los_Angeles">America/Los_Angeles</option>
                  <option value="America/Denver">America/Denver</option>
                  <option value="America/Chicago">America/Chicago</option>
                  <option value="America/New_York">America/New_York</option>
                  <option value="UTC">UTC</option>
                </select>
              </label>

              <div className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                <div>
                  <div className="text-sm font-medium">Compact mode</div>
                  <div className="text-xs text-slate-500">Tighter spacing for dense screens</div>
                </div>
                <input
                  type="checkbox"
                  checked={compactMode}
                  onChange={(e) => setCompactMode(e.target.checked)}
                  className="h-4 w-4"
                />
              </div>

              <Button type="submit" variant="primary">
                Save workspace settings
              </Button>
            </form>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Notifications & Sharing" subtitle="Controls for alerts and partner visibility" />
          <CardBody>
            <form onSubmit={save} className="space-y-4">
              <div className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                <div>
                  <div className="text-sm font-medium">Email alerts</div>
                  <div className="text-xs text-slate-500">Send readiness and status notifications</div>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="h-4 w-4"
                />
              </div>

              <div className="flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
                <div>
                  <div className="text-sm font-medium">Partner summary sharing</div>
                  <div className="text-xs text-slate-500">Allow partners to view top-level progress metrics</div>
                </div>
                <input
                  type="checkbox"
                  checked={partnerSummarySharing}
                  onChange={(e) => setPartnerSummarySharing(e.target.checked)}
                  className="h-4 w-4"
                />
              </div>

              <Button type="submit" variant="primary">
                Save notification settings
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </AppLayout>
  );
}
