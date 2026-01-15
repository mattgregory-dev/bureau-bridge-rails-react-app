import { AppLayout } from "../components/layout/AppLayout";
import Badge from "../components/ui/Badge";
import MiniLineChart from "../components/charts/MiniLineChart";

// Mock data (static)
const scoreTrend = [
  { x: 1, y: 660 },
  { x: 2, y: 662 },
  { x: 3, y: 668 },
  { x: 4, y: 671 },
  { x: 5, y: 675 },
  { x: 6, y: 682 },
];

const negItemsTrend = [
  { x: 1, y: 24 },
  { x: 2, y: 23 },
  { x: 3, y: 21 },
  { x: 4, y: 20 },
  { x: 5, y: 18 },
  { x: 6, y: 17 },
];

const utilTrend = [
  { x: 1, y: 41 },
  { x: 2, y: 39 },
  { x: 3, y: 34 },
  { x: 4, y: 31 },
  { x: 5, y: 27 },
  { x: 6, y: 23 },
];

export default function HistoryMetrics() {
  return (
    <AppLayout title="Metrics History">
      {/* Page header strip (optional) */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-4 flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-slate-900">Credit Timeline</div>
            <div className="mt-1 text-xs text-slate-500">
              Snapshot = now. Timeline = how we got here. Trends reflect bureau pulls and tracked changes.
            </div>
          </div>

          {/* Controls (static) */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500">Range:</span>
            <Badge tone="slate">Last 6 pulls</Badge>
            <Badge tone="ghost">12 months</Badge>
            <Badge tone="ghost">All</Badge>

            <span className="ml-2 text-slate-500">Bureaus:</span>
            <Badge tone="slate">EFX</Badge>
            <Badge tone="slate">EXP</Badge>
            <Badge tone="slate">TU</Badge>

            <button className="ml-1 text-slate-400 hover:text-slate-600">Clear</button>
          </div>
        </div>

        {/* Quick summary row (high-level) */}
        <div className="p-4">
          <div className="grid gap-3 md:grid-cols-4">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold text-slate-600">Net score change</div>
              <div className="mt-1 text-2xl font-semibold text-emerald-700">+22</div>
              <div className="mt-1 text-xs text-slate-500">Since tracking began</div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold text-slate-600">Negatives removed</div>
              <div className="mt-1 text-2xl font-semibold text-emerald-700">7</div>
              <div className="mt-1 text-xs text-slate-500">Since start</div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold text-slate-600">Active negative items</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">17</div>
              <div className="mt-1 text-xs text-slate-500">Current</div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="text-xs font-semibold text-slate-600">Utilization</div>
              <div className="mt-1 text-2xl font-semibold text-slate-900">23%</div>
              <div className="mt-1 text-xs text-slate-500">Current</div>
            </div>
          </div>
        </div>
      </div>

      {/* Trend panels (expanded momentum) */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-4">
          <div className="text-sm font-semibold text-slate-900">Trends</div>
          <div className="mt-1 text-xs text-slate-500">
            Visual trends across pulls. Use bureau filters above to isolate reporting differences.
          </div>
        </div>

        <div className="p-4 grid gap-3 md:grid-cols-3">
          {/* Score */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-600">Score trend</div>
              <span className="text-xs text-slate-500">Last 6 pulls</span>
            </div>

            <div className="mt-3 rounded bg-white border border-slate-200 p-3">
              <MiniLineChart data={scoreTrend} stroke="#0ea5e9" fill="rgba(14,165,233,0.10)" />
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>
                Direction <span className="font-semibold text-emerald-700">Up</span>
              </span>
              <span className="text-slate-400">Not a predictor</span>
            </div>

            {/* Annotation strip (static) */}
            <div className="mt-3 rounded border border-slate-200 bg-white p-3">
              <div className="text-xs font-semibold text-slate-700">Notable moments</div>
              <div className="mt-2 space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <span className="mt-[2px] h-2 w-2 rounded-full bg-emerald-500"></span>
                  <div>
                    <span className="font-medium">Pull #4:</span> Score jumped after utilization dropped.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-[2px] h-2 w-2 rounded-full bg-amber-500"></span>
                  <div>
                    <span className="font-medium">Pull #6:</span> Small variance across bureaus (+/− 12).
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Negative items */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-600">Negative items</div>
              <span className="text-xs text-slate-500">Last 6 pulls</span>
            </div>

            <div className="mt-3 rounded bg-white border border-slate-200 p-3">
              <MiniLineChart data={negItemsTrend} stroke="#10b981" fill="rgba(16,185,129,0.10)" />
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>
                Direction <span className="font-semibold text-emerald-700">Down</span>
              </span>
              <span className="text-slate-400">Counts are bureau-reported</span>
            </div>

            <div className="mt-3 rounded border border-slate-200 bg-white p-3">
              <div className="text-xs font-semibold text-slate-700">What changed</div>
              <div className="mt-2 space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <span className="mt-[2px] h-2 w-2 rounded-full bg-emerald-500"></span>
                  <div>
                    <span className="font-medium">2 removals:</span> 1 collection + 1 late payment aged out.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-[2px] h-2 w-2 rounded-full bg-rose-500"></span>
                  <div>
                    <span className="font-medium">1 new item:</span> New 30-day late reported on one bureau.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Utilization */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-600">Utilization</div>
              <span className="text-xs text-slate-500">Last 6 pulls</span>
            </div>

            <div className="mt-3 rounded bg-white border border-slate-200 p-3">
              <MiniLineChart data={utilTrend} stroke="#f97316" fill="rgba(249,115,22,0.10)" />
            </div>

            <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
              <span>
                Current <span className="font-semibold text-slate-900">23%</span>
              </span>
              <span className="text-slate-400">Across revolving</span>
            </div>

            <div className="mt-3 rounded border border-slate-200 bg-white p-3">
              <div className="text-xs font-semibold text-slate-700">Impact</div>
              <div className="mt-2 space-y-2 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <span className="mt-[2px] h-2 w-2 rounded-full bg-emerald-500"></span>
                  <div>
                    <span className="font-medium">Improving:</span> Down ~18 points since start.
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-[2px] h-2 w-2 rounded-full bg-slate-300"></span>
                  <div>
                    <span className="font-medium">Note:</span> Individual card utilization can matter too.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Change log / timeline */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-4 flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-slate-900">Change Log</div>
            <div className="mt-1 text-xs text-slate-500">
              Human-readable summary of what changed between pulls.
            </div>
          </div>

          {/* Filters (static) */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Type:</span>
            <Badge tone="slate">All</Badge>
            <Badge tone="ghost">Negatives</Badge>
            <Badge tone="ghost">Utilization</Badge>
            <Badge tone="ghost">Inquiries</Badge>
          </div>
        </div>

        <div className="p-4">
          {/* Timeline list */}
          <div className="space-y-3">
            {/* Item */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-slate-600">Pull #6 · 2025-02</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    Utilization dropped. Score climbed.
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    Net: <span className="font-semibold text-emerald-700">+6</span> score. Utilization now{" "}
                    <span className="font-semibold text-slate-900">23%</span>.
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Badge tone="slate">EFX</Badge>
                  <Badge tone="slate">EXP</Badge>
                  <Badge tone="slate">TU</Badge>
                </div>
              </div>

              {/* Expandable details placeholder */}
              <div className="mt-3 rounded border border-slate-200 bg-white p-3">
                <div className="text-xs font-semibold text-slate-700">Details (mock)</div>
                <div className="mt-2 text-xs text-slate-600">
                  Card balances decreased on 2 accounts. No new negatives detected on this pull.
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-slate-600">Pull #5 · 2025-01</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    One negative item removed.
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    Net: <span className="font-semibold text-emerald-700">-1</span> active negative item.
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Badge tone="ghost">EFX</Badge>
                  <Badge tone="slate">EXP</Badge>
                  <Badge tone="ghost">TU</Badge>
                </div>
              </div>

              <div className="mt-3 rounded border border-slate-200 bg-white p-3">
                <div className="text-xs font-semibold text-slate-700">Details (mock)</div>
                <div className="mt-2 text-xs text-slate-600">
                  Collection no longer reported on Experian. Still verify on other bureaus.
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-slate-600">Pull #4 · 2024-12</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">
                    New inquiry detected.
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    Net: <span className="font-semibold text-rose-700">+1</span> inquiry.
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Badge tone="slate">EFX</Badge>
                  <Badge tone="ghost">EXP</Badge>
                  <Badge tone="slate">TU</Badge>
                </div>
              </div>

              <div className="mt-3 rounded border border-slate-200 bg-white p-3">
                <div className="text-xs font-semibold text-slate-700">Details (mock)</div>
                <div className="mt-2 text-xs text-slate-600">
                  Inquiry appears as “Car Dealer”. Consider impact on near-term lending applications.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Before / After summaries (then vs now) */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-4">
          <div className="text-sm font-semibold text-slate-900">Then vs Now</div>
          <div className="mt-1 text-xs text-slate-500">
            High-level comparison between the first tracked pull and the current snapshot.
          </div>
        </div>

        <div className="p-4 grid gap-3 md:grid-cols-2">
          {/* Then */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-600">Then</div>
              <span className="text-xs text-slate-500">First tracked pull</span>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold text-slate-600">Score band</div>
                <div className="mt-1 text-xl font-semibold text-amber-800">Fair</div>
                <div className="mt-1 text-xs text-slate-500">Starting point</div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold text-slate-600">Active negatives</div>
                <div className="mt-1 text-xl font-semibold text-slate-900">24</div>
                <div className="mt-1 text-xs text-slate-500">All categories</div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold text-slate-600">Utilization</div>
                <div className="mt-1 text-xl font-semibold text-slate-900">41%</div>
                <div className="mt-1 text-xs text-slate-500">Across revolving</div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold text-slate-600">Neg. balance</div>
                <div className="mt-1 text-xl font-semibold text-slate-900">$19,800</div>
                <div className="mt-1 text-xs text-slate-500">Collections + charge-offs</div>
              </div>
            </div>
          </div>

          {/* Now */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-600">Now</div>
              <span className="text-xs text-slate-500">Current snapshot</span>
            </div>

            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold text-slate-600">Score band</div>
                <div className="mt-1 text-xl font-semibold text-emerald-700">Good</div>
                <div className="mt-1 text-xs text-slate-500">Current</div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold text-slate-600">Active negatives</div>
                <div className="mt-1 text-xl font-semibold text-slate-900">17</div>
                <div className="mt-1 text-xs text-slate-500">All categories</div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold text-slate-600">Utilization</div>
                <div className="mt-1 text-xl font-semibold text-slate-900">23%</div>
                <div className="mt-1 text-xs text-slate-500">Across revolving</div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="text-xs font-semibold text-slate-600">Neg. balance</div>
                <div className="mt-1 text-xl font-semibold text-slate-900">$15,275</div>
                <div className="mt-1 text-xs text-slate-500">Collections + charge-offs</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: table view of pulls (audit-friendly) */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-4 flex items-start justify-between">
          <div>
            <div className="text-sm font-semibold text-slate-900">Pull History</div>
            <div className="mt-1 text-xs text-slate-500">
              Per-pull summary view for audit mode. Useful for partners and admins.
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">View:</span>
            <Badge tone="slate">Summary</Badge>
            <Badge tone="ghost">Detailed</Badge>
          </div>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="min-w-full text-sm">
            <thead className="text-left text-xs font-semibold text-slate-500">
              <tr>
                <th className="py-2 pr-4">
                  <span className="inline-flex items-center gap-1">
                    Pull
                    <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
                      <span>▲</span>
                      <span>▼</span>
                    </span>
                  </span>
                </th>
                <th className="py-2 pr-4">Date</th>
                <th className="py-2 pr-4">Score (avg)</th>
                <th className="py-2 pr-4">Active negatives</th>
                <th className="py-2 pr-4">Utilization</th>
                <th className="py-2 pr-4">New items</th>
                <th className="py-2 pr-4">Removed</th>
                <th className="py-2 pr-4">Bureaus</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              <tr className="text-slate-900">
                <td className="py-2 pr-4 font-medium">#6</td>
                <td className="py-2 pr-4">2025-02</td>
                <td className="py-2 pr-4">
                  <span className="font-semibold text-emerald-700">+6</span>{" "}
                  <span className="text-slate-500">(682)</span>
                </td>
                <td className="py-2 pr-4">17</td>
                <td className="py-2 pr-4">
                  <Badge tone="green">23%</Badge>
                </td>
                <td className="py-2 pr-4">0</td>
                <td className="py-2 pr-4">0</td>
                <td className="py-2 pr-4">
                  <div className="grid w-[132px] grid-cols-3 gap-1">
                    <Badge tone="slate">EFX</Badge>
                    <Badge tone="slate">EXP</Badge>
                    <Badge tone="slate">TU</Badge>
                  </div>
                </td>
              </tr>

              <tr className="text-slate-900">
                <td className="py-2 pr-4 font-medium">#5</td>
                <td className="py-2 pr-4">2025-01</td>
                <td className="py-2 pr-4">
                  <span className="font-semibold text-emerald-700">+2</span>{" "}
                  <span className="text-slate-500">(676)</span>
                </td>
                <td className="py-2 pr-4">18</td>
                <td className="py-2 pr-4">
                  <Badge tone="amber">27%</Badge>
                </td>
                <td className="py-2 pr-4">0</td>
                <td className="py-2 pr-4">1</td>
                <td className="py-2 pr-4">
                  <div className="grid w-[132px] grid-cols-3 gap-1">
                    <Badge tone="ghost">EFX</Badge>
                    <Badge tone="slate">EXP</Badge>
                    <Badge tone="ghost">TU</Badge>
                  </div>
                </td>
              </tr>

              <tr className="text-slate-900">
                <td className="py-2 pr-4 font-medium">#4</td>
                <td className="py-2 pr-4">2024-12</td>
                <td className="py-2 pr-4">
                  <span className="font-semibold text-rose-700">-1</span>{" "}
                  <span className="text-slate-500">(674)</span>
                </td>
                <td className="py-2 pr-4">20</td>
                <td className="py-2 pr-4">
                  <Badge tone="amber">31%</Badge>
                </td>
                <td className="py-2 pr-4">1</td>
                <td className="py-2 pr-4">0</td>
                <td className="py-2 pr-4">
                  <div className="grid w-[132px] grid-cols-3 gap-1">
                    <Badge tone="slate">EFX</Badge>
                    <Badge tone="ghost">EXP</Badge>
                    <Badge tone="slate">TU</Badge>
                  </div>
                </td>
              </tr>
            </tbody>

            <tfoot className="border-t border-slate-200 bg-slate-50">
              <tr className="text-xs font-semibold text-slate-600">
                <td className="py-3 pr-4" colSpan={2}>
                  <div className="flex flex-col gap-1">
                    <div className="text-slate-500">
                      Subtotal <span className="font-normal">(3 pulls shown)</span>
                    </div>
                    <div className="text-slate-900 mt-1">
                      <span className="font-semibold">Total</span>{" "}
                      <span className="font-normal text-slate-500">
                        (use Range selector to view more)
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-3 pr-4 text-slate-900">—</td>
                <td className="py-3 pr-4 text-slate-900">—</td>
                <td className="py-3 pr-4 text-slate-900">—</td>
                <td className="py-3 pr-4 text-slate-900">—</td>
                <td className="py-3 pr-4 text-slate-900">—</td>

                <td className="py-3 pr-4">
                  <div className="grid w-[132px] grid-cols-3 gap-1">
                    <Badge tone="bare">2</Badge>
                    <Badge tone="bare">2</Badge>
                    <Badge tone="bare">2</Badge>
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
