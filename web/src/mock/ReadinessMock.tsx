import { AppLayout } from "../components/layout/AppLayout";
import Badge from "../components/ui/Badge";

export default function Readiness() {
  return (
    <AppLayout title="Readiness">
      {/* Top story: Goal readiness selector */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-4 flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-slate-900">Goals and Readiness</div>
            <div className="mt-1 text-xs text-slate-500">
              Select a goal to see what is blocking it, what matters most, and the next best actions.
            </div>
          </div>

          {/* Controls (static) */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500">Bureaus:</span>
            <Badge tone="slate">EFX</Badge>
            <Badge tone="slate">EXP</Badge>
            <Badge tone="slate">TU</Badge>
            <button className="ml-1 text-slate-400 hover:text-slate-600">Clear</button>
          </div>
        </div>

        {/* Goal cards */}
        <div className="p-4">
          <div className="grid gap-3 md:grid-cols-4">
            {/* Auto */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold text-slate-600">Auto loan</div>
                  <div className="mt-2 inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                    Nearly ready
                  </div>
                  <div className="mt-2 text-xs text-slate-500">1–2 items blocking</div>
                </div>
                <div className="text-xs text-slate-400">Selected</div>
              </div>
            </div>

            {/* Mortgage */}
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="text-xs font-semibold text-slate-600">Mortgage</div>
              <div className="mt-2 inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800">
                In progress
              </div>
              <div className="mt-2 text-xs text-slate-500">Focus: negatives + utilization</div>
            </div>

            {/* Credit cards */}
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="text-xs font-semibold text-slate-600">Credit cards</div>
              <div className="mt-2 inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                Ready
              </div>
              <div className="mt-2 text-xs text-slate-500">Better approvals likely</div>
            </div>

            {/* Pre-approval */}
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <div className="text-xs font-semibold text-slate-600">Pre-approval</div>
              <div className="mt-2 inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800">
                2 steps remaining
              </div>
              <div className="mt-2 text-xs text-slate-500">Track progress weekly</div>
            </div>
          </div>

          <div className="mt-3 text-xs text-slate-500">
            Note: Readiness is directional and depends on lender programs. This page prioritizes the biggest blockers.
          </div>
        </div>
      </div>

      {/* Selected goal: Readiness breakdown */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-4 flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-slate-900">Auto loan readiness</div>
            <div className="mt-1 text-xs text-slate-500">
              High-level decision factors. Links and evidence live below.
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-500">View:</span>
            <Badge tone="slate">Consumer</Badge>
            <Badge tone="ghost">Partner</Badge>
            <Badge tone="ghost">Admin</Badge>
          </div>
        </div>

        <div className="p-4 grid gap-4 lg:grid-cols-2">
          {/* Left: Breakdown */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-700">Readiness breakdown</div>
              <span className="text-xs text-slate-500">Goal factors</span>
            </div>

            {/* Score guidance */}
            <div className="mt-3 rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-slate-600">Score range (typical)</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">Good approvals often start around 660–700+</div>
                  <div className="mt-1 text-xs text-slate-500">Ranges vary by lender and down payment.</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">Current band</div>
                  <div className="mt-1 text-sm font-semibold text-emerald-700">Good</div>
                </div>
              </div>
            </div>

            {/* Factor grid */}
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {/* Negatives */}
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-600">Negative items</div>
                  <Badge tone="amber">Blocking</Badge>
                </div>
                <div className="mt-2 text-xs text-slate-500">
                  Active negatives can raise rates or reduce approval odds.
                </div>
                <div className="mt-3">
                  <div className="text-2xl font-semibold text-slate-900">17</div>
                  <div className="mt-1 text-xs text-slate-500">Active items</div>
                </div>
              </div>

              {/* Utilization */}
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-600">Utilization</div>
                  <Badge tone="green">Improving</Badge>
                </div>
                <div className="mt-2 text-xs text-slate-500">Lower utilization typically helps score and lending terms.</div>
                <div className="mt-3">
                  <div className="text-2xl font-semibold text-slate-900">23%</div>
                  <div className="mt-1 text-xs text-slate-500">Current</div>
                </div>
              </div>

              {/* Age */}
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-600">Credit age</div>
                  <Badge tone="slate">OK</Badge>
                </div>
                <div className="mt-2 text-xs text-slate-500">Longer history can improve stability and trust.</div>
                <div className="mt-3">
                  <div className="text-2xl font-semibold text-slate-900">7y</div>
                  <div className="mt-1 text-xs text-slate-500">Average age (mock)</div>
                </div>
              </div>

              {/* Mix */}
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-slate-600">Account mix</div>
                  <Badge tone="slate">OK</Badge>
                </div>
                <div className="mt-2 text-xs text-slate-500">Healthy mix can support scoring models.</div>
                <div className="mt-3">
                  <div className="text-2xl font-semibold text-slate-900">3</div>
                  <div className="mt-1 text-xs text-slate-500">Types present (mock)</div>
                </div>
              </div>
            </div>

            {/* Micro note */}
            <div className="mt-3 text-xs text-slate-500">
              This is a prioritization view. It highlights what is most likely to change an outcome.
            </div>
          </div>

          {/* Right: Blockers and next steps */}
          <div className="space-y-4">
            {/* Blockers */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold text-slate-700">What is blocking this goal</div>
                <span className="text-xs text-slate-500">Highest impact first</span>
              </div>

              <div className="mt-3 space-y-3">
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Open collections or charge-offs</div>
                      <div className="mt-1 text-xs text-slate-500">
                        These can be major approval blockers depending on lender.
                      </div>
                    </div>
                    <Badge tone="red">High impact</Badge>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-slate-500">Found:</span>
                    <span className="font-semibold text-slate-900">4</span>
                    <span className="text-slate-500">items (mock)</span>
                    <span className="ml-2 text-slate-500">Bureaus:</span>
                    <Badge tone="slate">EFX</Badge>
                    <Badge tone="slate">EXP</Badge>
                    <Badge tone="ghost">TU</Badge>
                  </div>

                  <div className="mt-3">
                    <button className="text-xs font-semibold text-slate-700 hover:text-slate-900">
                      View evidence (mock)
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Recent late payments</div>
                      <div className="mt-1 text-xs text-slate-500">
                        Recent delinquencies can significantly affect auto lending terms.
                      </div>
                    </div>
                    <Badge tone="amber">Medium</Badge>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-slate-500">Found:</span>
                    <span className="font-semibold text-slate-900">2</span>
                    <span className="text-slate-500">items in last 24 months (mock)</span>
                  </div>

                  <div className="mt-3">
                    <button className="text-xs font-semibold text-slate-700 hover:text-slate-900">
                      View evidence (mock)
                    </button>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Utilization on individual cards</div>
                      <div className="mt-1 text-xs text-slate-500">
                        Overall utilization is improving, but one card may be high.
                      </div>
                    </div>
                    <Badge tone="slate">Low</Badge>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-slate-500">Flag:</span>
                    <span className="font-semibold text-slate-900">1</span>
                    <span className="text-slate-500">card above 50% (mock)</span>
                  </div>

                  <div className="mt-3">
                    <button className="text-xs font-semibold text-slate-700 hover:text-slate-900">
                      View evidence (mock)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Next best actions */}
            <div className="rounded-lg border border-slate-200 bg-white">
              <div className="border-b border-slate-200 px-4 py-3">
                <div className="text-sm font-semibold text-slate-900">Next best actions</div>
                <div className="mt-1 text-xs text-slate-500">
                  Suggested focus areas for improving readiness. This is not financial advice.
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Address open collections first</div>
                      <div className="mt-1 text-xs text-slate-500">
                        Reducing collection visibility can improve approvals and rates.
                      </div>
                    </div>
                    <Badge tone="red">Priority</Badge>
                  </div>
                  <div className="mt-3 text-xs text-slate-600">
                    Suggested sequence: verify reporting, validate ownership, then choose a resolution path.
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Keep utilization trending down</div>
                      <div className="mt-1 text-xs text-slate-500">
                        Stay below common thresholds to support score stability.
                      </div>
                    </div>
                    <Badge tone="amber">Support</Badge>
                  </div>
                  <div className="mt-3 text-xs text-slate-600">
                    Target bands (mock): under 30% is solid. Under 10% can be even stronger for some profiles.
                  </div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">Avoid new hard inquiries near application time</div>
                      <div className="mt-1 text-xs text-slate-500">
                        Keep the profile stable during the final stretch.
                      </div>
                    </div>
                    <Badge tone="slate">Timing</Badge>
                  </div>
                  <div className="mt-3 text-xs text-slate-600">
                    Consider bundling rate shopping within typical windows (rules vary).
                  </div>
                </div>
              </div>
            </div>

            {/* Confidence / status strip */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-slate-700">Readiness summary</div>
                  <div className="mt-1 text-xs text-slate-500">
                    Based on current tracked data. Use bureau filters to isolate differences.
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500">Status</div>
                  <div className="mt-1 inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
                    Nearly ready
                  </div>
                </div>
              </div>

              <div className="mt-3 grid gap-3 md:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="text-xs font-semibold text-slate-600">Biggest blocker</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">Collections</div>
                  <div className="mt-1 text-xs text-slate-500">Highest impact category</div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="text-xs font-semibold text-slate-600">Strongest factor</div>
                  <div className="mt-1 text-sm font-semibold text-slate-900">Score band</div>
                  <div className="mt-1 text-xs text-slate-500">Currently in Good range</div>
                </div>

                <div className="rounded-lg border border-slate-200 bg-white p-4">
                  <div className="text-xs font-semibold text-slate-600">Momentum</div>
                  <div className="mt-1 text-sm font-semibold text-emerald-700">Improving</div>
                  <div className="mt-1 text-xs text-slate-500">Utilization down over time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Evidence: high-impact items (links target later) */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-4 flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-semibold text-slate-900">Evidence for this goal</div>
            <div className="mt-1 text-xs text-slate-500">
              High-impact items connected to readiness. These map to Negative Items and Tradelines.
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Filter:</span>
            <Badge tone="slate">High impact</Badge>
            <Badge tone="ghost">All</Badge>
          </div>
        </div>

        <div className="overflow-x-auto p-4">
          <table className="min-w-full text-sm">
            <thead className="text-left text-xs font-semibold text-slate-500">
              <tr>
                <th className="py-2 pr-4">
                  <span className="inline-flex items-center gap-1">
                    Item
                    <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
                      <span>▲</span>
                      <span>▼</span>
                    </span>
                  </span>
                </th>
                <th className="py-2 pr-4">Category</th>
                <th className="py-2 pr-4">Severity</th>
                <th className="py-2 pr-4">Reported</th>
                <th className="py-2 pr-4">Amount</th>
                <th className="py-2 pr-4">Bureaus</th>
                <th className="py-2 pr-4">Impact</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              <tr className="text-slate-900">
                <td className="py-2 pr-4 font-medium">Midland Credit</td>
                <td className="py-2 pr-4">
                  <Badge tone="red">Collection</Badge>
                </td>
                <td className="py-2 pr-4">
                  <Badge tone="red">High</Badge>
                </td>
                <td className="py-2 pr-4">2022-09</td>
                <td className="py-2 pr-4">$1,980</td>
                <td className="py-2 pr-4">
                  <div className="grid w-[132px] grid-cols-3 gap-1">
                    <Badge tone="slate">EFX</Badge>
                    <Badge tone="slate">EXP</Badge>
                    <Badge tone="ghost">TU</Badge>
                  </div>
                </td>
                <td className="py-2 pr-4">
                  <Badge tone="red">Blocking</Badge>
                </td>
              </tr>

              <tr className="text-slate-900">
                <td className="py-2 pr-4 font-medium">Synchrony</td>
                <td className="py-2 pr-4">
                  <Badge tone="red">Charge-off</Badge>
                </td>
                <td className="py-2 pr-4">
                  <Badge tone="amber">Med</Badge>
                </td>
                <td className="py-2 pr-4">2020-02</td>
                <td className="py-2 pr-4">$4,120</td>
                <td className="py-2 pr-4">
                  <div className="grid w-[132px] grid-cols-3 gap-1">
                    <Badge tone="ghost">EFX</Badge>
                    <Badge tone="ghost">EXP</Badge>
                    <Badge tone="slate">TU</Badge>
                  </div>
                </td>
                <td className="py-2 pr-4">
                  <Badge tone="amber">Risk</Badge>
                </td>
              </tr>

              <tr className="text-slate-900">
                <td className="py-2 pr-4 font-medium">Chase</td>
                <td className="py-2 pr-4">
                  <Badge tone="amber">Late payment</Badge>
                </td>
                <td className="py-2 pr-4">
                  <Badge tone="amber">Med</Badge>
                </td>
                <td className="py-2 pr-4">2024-07</td>
                <td className="py-2 pr-4">$1,240</td>
                <td className="py-2 pr-4">
                  <div className="grid w-[132px] grid-cols-3 gap-1">
                    <Badge tone="ghost">EFX</Badge>
                    <Badge tone="slate">EXP</Badge>
                    <Badge tone="slate">TU</Badge>
                  </div>
                </td>
                <td className="py-2 pr-4">
                  <Badge tone="amber">Risk</Badge>
                </td>
              </tr>

              <tr className="text-slate-900">
                <td className="py-2 pr-4 font-medium">Amex</td>
                <td className="py-2 pr-4">
                  <Badge tone="slate">Utilization</Badge>
                </td>
                <td className="py-2 pr-4">
                  <Badge tone="slate">Low</Badge>
                </td>
                <td className="py-2 pr-4">Current</td>
                <td className="py-2 pr-4">$5,410</td>
                <td className="py-2 pr-4">
                  <div className="grid w-[132px] grid-cols-3 gap-1">
                    <Badge tone="slate">EFX</Badge>
                    <Badge tone="slate">EXP</Badge>
                    <Badge tone="slate">TU</Badge>
                  </div>
                </td>
                <td className="py-2 pr-4">
                  <Badge tone="slate">Monitor</Badge>
                </td>
              </tr>
            </tbody>

            <tfoot className="border-t border-slate-200 bg-slate-50">
              <tr className="text-xs font-semibold text-slate-600">
                <td className="py-3 pr-4" colSpan={4}>
                  <div className="flex flex-col gap-1">
                    <div className="text-slate-500">
                      Subtotal <span className="font-normal">(4 items shown)</span>
                    </div>
                    <div className="text-slate-900 mt-1">
                      <span className="font-semibold">Total</span>{" "}
                      <span className="font-normal text-slate-500">
                        (filters will control this later)
                      </span>
                    </div>
                  </div>
                </td>

                <td className="py-3 pr-4 text-slate-900">$12,750</td>

                <td className="py-3 pr-4">
                  <div className="grid w-[132px] grid-cols-3 gap-1">
                    <Badge tone="bare">2</Badge>
                    <Badge tone="bare">2</Badge>
                    <Badge tone="bare">2</Badge>
                  </div>
                </td>

                <td className="py-3 pr-4">
                  <span className="text-slate-500">—</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
