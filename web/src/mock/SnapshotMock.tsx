import { AppLayout } from "../components/layout/AppLayout";
import Badge from "../components/ui/Badge";
import MiniLineChart from "../components/charts/MiniLineChart";


const scoreTrend = [
  { x: 1, y: 660 },
  { x: 2, y: 662 },
  { x: 3, y: 668 },
  { x: 4, y: 671 },
  { x: 5, y: 675 },
  { x: 6, y: 682 },
];


export default function Snapshot() {
  return (
    <AppLayout title="Credit Snapshot">











































{/* Top story KPIs (static mock) */}
<div className="mt-4 rounded-xl border border-slate-200 bg-white">
  {/* Header */}
  <div className="border-b border-slate-200 p-4">
    <div className="text-sm font-semibold text-slate-900">Credit Snapshot</div>
    <div className="mt-1 text-xs text-slate-500">
      Latest bureau pull. High-level story for consumers, partners, and credit repair pros.
    </div>
  </div>

  <div className="p-4 space-y-4">

















    {/* Row 1: Current standing + 3 bureau scores */}
    <div className="grid gap-3 md:grid-cols-4">
      {/* Overall standing */}
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="text-xs font-semibold text-slate-600">Score band</div>
        <div className="mt-1 text-2xl font-semibold text-green-600">Good</div>
        <div className="mt-1 text-xs text-slate-500">Current month</div>
      </div>

      {/* EFX */}
      <div className="rounded-lg border border-slate-200 p-4">
        <div className="flex items-center justify-between">


    <div>
      <div className="text-xs font-semibold text-slate-600">
        Equifax
      </div>
      <div className="text-[10px] text-slate-400 mt-1">
        VantageScore 3.0
      </div>
    </div>

          <span className="rounded bg-[#9e1c33] px-2 py-0.5 text-xs font-semibold text-white">
            EFX
          </span>
        </div>
        <div className="mt-1 text-2xl font-semibold text-green-600">682</div>
        <div className="mt-1 text-xs text-slate-500">
          Since last pull <span className="text-rose-700 font-semibold">-2</span>
        </div>
      </div>

      {/* EXP */}
      <div className="rounded-lg border border-slate-200 p-4">
        <div className="flex items-center justify-between">


    <div>
      <div className="text-xs font-semibold text-slate-600">
        Experian
      </div>
      <div className="text-[10px] text-slate-400 mt-1">
        VantageScore 3.0
      </div>
    </div>



          <span className="rounded bg-[#1d4f91] px-2 py-0.5 text-xs font-semibold text-white">
            EXP
          </span>
        </div>
        <div className="mt-1 text-2xl font-semibold text-green-600">694</div>
        <div className="mt-1 text-xs text-slate-500">
          Since last pull <span className="text-emerald-700 font-semibold">+12</span>
        </div>
      </div>

      {/* TU */}
      <div className="rounded-lg border border-slate-200 p-4">
        <div className="flex items-center justify-between">



    <div>
      <div className="text-xs font-semibold text-slate-600">
        TransUnion
      </div>
      <div className="text-[10px] text-slate-400 mt-1">
        VantageScore 3.0
      </div>
    </div>



          <span className="rounded bg-[#7fd2e4] px-2 py-0.5 text-xs font-semibold text-white">
            TU
          </span>
        </div>
        <div className="mt-1 text-2xl font-semibold text-green-600">671</div>
        <div className="mt-1 text-xs text-slate-500">
          Since last pull <span className="text-emerald-700 font-semibold">+6</span>
        </div>
      </div>


    </div>

















    {/* Row 2: Progress & impact */}
    <div className="rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <div className="text-sm font-semibold text-slate-900">Negative Items Summary</div>
        <div className="mt-1 text-xs text-slate-500">
          Progress since tracking began. Counts reflect bureau-reported items.
        </div>
      </div>

      <div className="grid gap-3 p-4 md:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-600">Negative items removed</div>
          <div className="mt-1 text-2xl font-semibold text-green-600">7</div>
          <div className="mt-1 text-xs text-slate-500">Since start</div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-600">New negative items</div>
          <div className="mt-1 text-2xl font-semibold text-slate-900">2</div>
          <div className="mt-1 text-xs text-slate-500">Since last pull</div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-600">Active negative items</div>
          <div className="mt-1 text-2xl font-semibold text-slate-900">17</div>
          <div className="mt-1 text-xs text-slate-500">All categories</div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="text-xs font-semibold text-slate-600">Total negative balance</div>
          <div className="mt-1 text-2xl font-semibold text-slate-900">$15,275</div>
          <div className="mt-1 text-xs text-slate-500">Collections + charge-offs</div>
        </div>
      </div>
    </div>







    {/* Row 3: Momentum / trend strip */}
    <div className="rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <div className="text-sm font-semibold text-slate-900">Momentum</div>
        <div className="mt-1 text-xs text-slate-500">
          Trends since tracking began (not a credit score predictor)
        </div>
      </div>

      <div className="p-4">
        <div className="grid gap-3 md:grid-cols-3">
          {/* Score trend */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-600">Score trend</div>
              <span className="text-xs text-slate-500">Last 6 pulls</span>
            </div>

            {/* Fake sparkline */}
<div className="mt-3 rounded bg-white border border-slate-200 p-2">
  <MiniLineChart data={scoreTrend} stroke="#ef4444" fill="rgba(239,68,68,0.08)" />
</div>

            <div className="mt-2 text-xs text-slate-500">
              Direction <span className="font-semibold text-emerald-700">Up</span>
            </div>
          </div>

          {/* Negative items trend */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-600">Negative items</div>
              <span className="text-xs text-slate-500">Last 6 pulls</span>
            </div>

<div className="mt-3 rounded bg-white border border-slate-200 p-2">
  <MiniLineChart data={scoreTrend} stroke="#0ea5e9" fill="rgba(14,165,233,0.10)" />
</div>

            <div className="mt-2 text-xs text-slate-500">
              Direction <span className="font-semibold text-emerald-700">Down</span>
            </div>
          </div>

          {/* Utilization trend */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div className="text-xs font-semibold text-slate-600">Utilization</div>
              <span className="text-xs text-slate-500">Last 6 pulls</span>
            </div>

<div className="mt-3 rounded bg-white border border-slate-200 p-2">
  <MiniLineChart data={scoreTrend} stroke="#ef4444" fill="rgba(239,68,68,0.08)" />
</div>

            <div className="mt-2 text-xs text-slate-500">
              Current <span className="font-semibold text-slate-900">23%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Row 4: Goals / readiness */}
    <div className="rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <div className="text-sm font-semibold text-slate-900">Readiness by Goal</div>
        <div className="mt-1 text-xs text-slate-500">
          What this credit profile can qualify for right now. (High-level)
        </div>
      </div>

      <div className="p-4">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold text-slate-600">Auto loan</div>
            <div className="mt-2 inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
              Nearly ready
            </div>
            <div className="mt-2 text-xs text-slate-500">1–2 items blocking</div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold text-slate-600">Mortgage</div>
            <div className="mt-2 inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800">
              In progress
            </div>
            <div className="mt-2 text-xs text-slate-500">Focus: negatives + utilization</div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold text-slate-600">Credit cards</div>
            <div className="mt-2 inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700">
              Ready
            </div>
            <div className="mt-2 text-xs text-slate-500">Better approvals likely</div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <div className="text-xs font-semibold text-slate-600">Pre-approval</div>
            <div className="mt-2 inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-semibold text-amber-800">
              2 steps remaining
            </div>
            <div className="mt-2 text-xs text-slate-500">Track progress weekly</div>
          </div>
        </div>

        {/* Optional tiny note row */}
        <div className="mt-3 text-xs text-slate-500">
          Note: Readiness is directional and depends on lender programs.
        </div>
      </div>
    </div>
  </div>
</div>









































{/* Tradelines */}
<div className="mt-4 rounded-xl border border-slate-200 bg-white">



<div className="border-b border-slate-200 p-4 flex items-start justify-between">
  <div>
    <div className="text-sm font-semibold text-slate-900">Tradelines</div>
    <div className="mt-1 text-xs text-slate-500">
      Revolving + mortgage + installment. Non-negative only.
    </div>
  </div>

  {/* Filters */}
  <div className="flex items-center gap-2 text-xs">
    <span className="text-slate-500">Filter by bureau:</span>

    <Badge tone="slate">EXP</Badge>
    <Badge tone="slate">TU</Badge>

    <button className="ml-1 text-slate-400 hover:text-slate-600">
      Clear
    </button>
  </div>
</div>




  <div className="overflow-x-auto p-4">
    <table className="min-w-full text-sm">
<thead className="text-left text-xs font-semibold text-slate-500">
  <tr>
    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Creditor
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Category
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Account
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Opened
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Age
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Balance
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Limit
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Utilization
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">Bureaus</th>
  </tr>
</thead>


      <tbody className="divide-y divide-slate-200">
        {/* 1 */}
        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">Chase</td>
          <td className="py-2 pr-4">
            <Badge tone="slate">Revolving</Badge>
          </td>
          <td className="py-2 pr-4 text-slate-600">•••• 0765</td>
          <td className="py-2 pr-4">2019-06</td>
          <td className="py-2 pr-4">5y 7m</td>
          <td className="py-2 pr-4">$1,240</td>
          <td className="py-2 pr-4">$8,000</td>
          <td className="py-2 pr-4">
            <Badge tone="green">16%</Badge>
          </td>
          <td className="py-2 pr-4">
            <div className="grid w-[132px] grid-cols-3 gap-1">
              <Badge tone="slate">EFX</Badge>
              <Badge tone="slate">EXP</Badge>
              <Badge tone="slate">TU</Badge>
            </div>
          </td>
        </tr>

        {/* 2 */}
        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">Wells Fargo</td>
          <td className="py-2 pr-4">
            <Badge tone="slate">Mortgage</Badge>
          </td>
          <td className="py-2 pr-4 text-slate-600">•••• 4164</td>
          <td className="py-2 pr-4">2021-03</td>
          <td className="py-2 pr-4">3y 10m</td>
          <td className="py-2 pr-4">$312,450</td>
          <td className="py-2 pr-4">$350,000</td>
          <td className="py-2 pr-4">
            <Badge tone="red">89%</Badge>
          </td>
          <td className="py-2 pr-4">
            <div className="grid w-[132px] grid-cols-3 gap-1">
              <Badge tone="slate">EFX</Badge>
              <Badge tone="slate">EXP</Badge>
              <Badge tone="slate">TU</Badge>
            </div>
          </td>
        </tr>

        {/* 3 (two bureaus) */}
        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">Capital One</td>
          <td className="py-2 pr-4">
            <Badge tone="slate">Revolving</Badge>
          </td>
          <td className="py-2 pr-4 text-slate-600">•••• 0057</td>
          <td className="py-2 pr-4">2017-10</td>
          <td className="py-2 pr-4">7y 3m</td>
          <td className="py-2 pr-4">$320</td>
          <td className="py-2 pr-4">$3,500</td>
          <td className="py-2 pr-4">
            <Badge tone="green">9%</Badge>
          </td>
          <td className="py-2 pr-4">
            <div className="grid w-[132px] grid-cols-3 gap-1">
              <Badge tone="ghost">EFX</Badge>
              <Badge tone="slate">EXP</Badge>
              <Badge tone="ghost">TU</Badge>
            </div>
          </td>
        </tr>

        {/* 4 */}
        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">Amex</td>
          <td className="py-2 pr-4">
            <Badge tone="slate">Revolving</Badge>
          </td>
          <td className="py-2 pr-4 text-slate-600">•••• 9984</td>
          <td className="py-2 pr-4">2020-01</td>
          <td className="py-2 pr-4">5y 0m</td>
          <td className="py-2 pr-4">$5,410</td>
          <td className="py-2 pr-4">$12,000</td>
          <td className="py-2 pr-4">
            <Badge tone="amber">45%</Badge>
          </td>
          <td className="py-2 pr-4">
            <div className="grid w-[132px] grid-cols-3 gap-1">
              <Badge tone="slate">EFX</Badge>
              <Badge tone="slate">EXP</Badge>
              <Badge tone="slate">TU</Badge>
            </div>
          </td>
        </tr>

        {/* 5 */}
        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">Navy Federal</td>
          <td className="py-2 pr-4">
            <Badge tone="slate">Revolving</Badge>
          </td>
          <td className="py-2 pr-4 text-slate-600">•••• 6491</td>
          <td className="py-2 pr-4">2016-04</td>
          <td className="py-2 pr-4">8y 9m</td>
          <td className="py-2 pr-4">$0</td>
          <td className="py-2 pr-4">$15,000</td>
          <td className="py-2 pr-4">
            <Badge tone="green">0%</Badge>
          </td>
          <td className="py-2 pr-4">
            <div className="grid w-[132px] grid-cols-3 gap-1">
              <Badge tone="slate">EFX</Badge>
              <Badge tone="slate">EXP</Badge>
              <Badge tone="slate">TU</Badge>
            </div>
          </td>
        </tr>

        {/* 6 (one bureau) */}
        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">Toyota Financial</td>
          <td className="py-2 pr-4">
            <Badge tone="slate">Installment</Badge>
          </td>
          <td className="py-2 pr-4 text-slate-600">•••• 8831</td>
          <td className="py-2 pr-4">2023-11</td>
          <td className="py-2 pr-4">1y 2m</td>
          <td className="py-2 pr-4">$14,820</td>
          <td className="py-2 pr-4">$22,000</td>
          <td className="py-2 pr-4">
            <Badge tone="red">89%</Badge>
          </td>
          <td className="py-2 pr-4">
            <div className="grid w-[132px] grid-cols-3 gap-1">
              <Badge tone="ghost">EFX</Badge>
              <Badge tone="ghost">EXP</Badge>
              <Badge tone="slate">TU</Badge>
            </div>
          </td>
        </tr>

        {/* 7 (two bureaus) */}
        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">Student Loan Servicer</td>
          <td className="py-2 pr-4">
            <Badge tone="slate">Installment</Badge>
          </td>
          <td className="py-2 pr-4 text-slate-600">•••• 3434</td>
          <td className="py-2 pr-4">2014-09</td>
          <td className="py-2 pr-4">10y 4m</td>
          <td className="py-2 pr-4">$9,610</td>
          <td className="py-2 pr-4">$18,000</td>
          <td className="py-2 pr-4">
            <Badge tone="amber">52%</Badge>
          </td>
          <td className="py-2 pr-4">
            <div className="grid w-[132px] grid-cols-3 gap-1">
              <Badge tone="slate">EFX</Badge>
              <Badge tone="ghost">EXP</Badge>
              <Badge tone="slate">TU</Badge>
            </div>
          </td>
        </tr>

        {/* 8 */}
        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">Rocket Mortgage</td>
          <td className="py-2 pr-4">
            <Badge tone="slate">Mortgage</Badge>
          </td>
          <td className="py-2 pr-4 text-slate-600">•••• 5712</td>
          <td className="py-2 pr-4">2022-08</td>
          <td className="py-2 pr-4">2y 5m</td>
          <td className="py-2 pr-4">$248,900</td>
          <td className="py-2 pr-4">$275,000</td>
          <td className="py-2 pr-4">
            <Badge tone="red">91%</Badge>
          </td>
          <td className="py-2 pr-4">
            <div className="grid w-[132px] grid-cols-3 gap-1">
              <Badge tone="slate">EFX</Badge>
              <Badge tone="ghost">EXP</Badge>
              <Badge tone="slate">TU</Badge>
            </div>
          </td>
        </tr>
      </tbody>




 {/* Footer totals */}
<tfoot className="border-t border-slate-200 bg-slate-50">
  <tr className="text-xs font-semibold text-slate-600">
    {/* Creditor + Category + Account */}



{/* Left label + overall counts */}
<td className="py-3 pr-4" colSpan={5}>
  <div className="flex flex-col gap-1">
    <div className="text-slate-500">
      Subtotal{" "}
      <span className="font-normal">
        (8 grouped rows)
      </span>
    </div>

    <div className="text-slate-900 mt-1">
      <span className="font-semibold">Total</span>{" "}
      <span className="font-normal text-slate-500">
        (18 bureau items)
      </span>
    </div>
  </div>
</td>


    {/* Balance total */}
    <td className="py-3 pr-4 text-slate-900">$592,750</td>

    {/* Limit total */}
    <td className="py-3 pr-4 text-slate-900">$703,500</td>

    {/* Utilization */}
    <td className="py-3 pr-4">
      <Badge tone="slate">84%</Badge>
    </td>




    <td className="py-3 pr-4">
      <div className="grid w-[132px] grid-cols-3 gap-1">
        <Badge tone="bare">6</Badge>
        <Badge tone="bare">5</Badge>
        <Badge tone="bare">7</Badge>
      </div>
    </td>



  </tr>
</tfoot>








    </table>
  </div>
</div>
























      {/* Negative items */}
      <div className="mt-4 rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-4">
          <div className="text-sm font-semibold text-slate-900">Negative Items</div>
          <div className="mt-1 text-xs text-slate-500">
            Collections + charge-offs + late payments + public records.
          </div>
        </div>

        <div className="grid gap-4 p-4">

































































































  {/* Late Payments */}

<div className="rounded-lg border border-slate-200">

  <div className="border-b border-slate-200 bg-slate-50 px-3 py-2">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div>
        <div className="text-xs font-semibold text-slate-600">Late Payments</div>
        <div className="mt-2 text-xs text-slate-500">Showing: All bureaus</div>
      </div>

      {/* Filters (static mock) */}
      <div className="flex items-center gap-2">
        <div className="text-xs font-medium text-slate-500">Filter by bureau:</div>

        <div>
          {/* Example: TU selected */}
          <Badge tone="slate">TU</Badge>
        </div>

        <span className="text-xs font-medium text-slate-400">Clear</span>
      </div>
    </div>
  </div>

  {/* Table container only. You will render the table markup later. */}
  <div className="overflow-x-auto p-3">
        <table className="min-w-full text-sm">



<thead className="text-left text-xs font-semibold text-slate-500">
  <tr>
    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Creditor
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Severity
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Reported
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Account
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Amount
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">Bureaus</th>
  </tr>
</thead>







      <tbody className="divide-y divide-slate-200">
        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">Chase</td>
          <td className="py-2 pr-4">
            <Badge tone="amber">30-day</Badge>
          </td>
          <td className="py-2 pr-4">2024-07</td>
          <td className="py-2 pr-4">•••• 0765</td>
          <td className="py-2 pr-4">$1,240</td>
          <td className="py-2 pr-4">
            <div className="grid w-[132px] grid-cols-3 gap-1">
              <Badge tone="ghost">EFX</Badge>
              <Badge tone="slate">EXP</Badge>
              <Badge tone="slate">TU</Badge>
            </div>
          </td>
        </tr>

        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">Toyota Financial</td>
          <td className="py-2 pr-4">
            <Badge tone="amber">30-day</Badge>
          </td>
          <td className="py-2 pr-4">2023-10</td>
          <td className="py-2 pr-4">•••• 8831</td>
          <td className="py-2 pr-4">$14,820</td>
          <td className="py-2 pr-4">
            <div className="grid w-[132px] grid-cols-3 gap-1">
              <Badge tone="slate">EFX</Badge>
              <Badge tone="ghost">EXP</Badge>
              <Badge tone="ghost">TU</Badge>
            </div>
          </td>
        </tr>

        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">Capital One</td>
          <td className="py-2 pr-4">
            <Badge tone="red">60-day</Badge>
          </td>
          <td className="py-2 pr-4">2022-12</td>
          <td className="py-2 pr-4">•••• 4442</td>
          <td className="py-2 pr-4">$320</td>
          <td className="py-2 pr-4">
            <div className="grid w-[132px] grid-cols-3 gap-1">
              <Badge tone="slate">EFX</Badge>
              <Badge tone="slate">EXP</Badge>
              <Badge tone="ghost">TU</Badge>
            </div>
          </td>
        </tr>

        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">Wells Fargo</td>
          <td className="py-2 pr-4">
            <Badge tone="red">60-day</Badge>
          </td>
          <td className="py-2 pr-4">2021-05</td>
          <td className="py-2 pr-4">•••• 7719</td>
          <td className="py-2 pr-4">$2,450</td>
          <td className="py-2 pr-4">
            <div className="grid w-[132px] grid-cols-3 gap-1">
              <Badge tone="slate">EFX</Badge>
              <Badge tone="slate">EXP</Badge>
              <Badge tone="slate">TU</Badge>
            </div>
          </td>
        </tr>

        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">Synchrony</td>
          <td className="py-2 pr-4">
            <Badge tone="red">90-day</Badge>
          </td>
          <td className="py-2 pr-4">2020-02</td>
          <td className="py-2 pr-4">•••• 9984</td>
          <td className="py-2 pr-4">$4,120</td>
          <td className="py-2 pr-4">
            <div className="grid w-[132px] grid-cols-3 gap-1">
              <Badge tone="ghost">EFX</Badge>
              <Badge tone="ghost">EXP</Badge>
              <Badge tone="slate">TU</Badge>
            </div>
          </td>
        </tr>

        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">Navy Federal</td>
          <td className="py-2 pr-4">
            <Badge tone="red">90-day</Badge>
          </td>
          <td className="py-2 pr-4">2019-11</td>
          <td className="py-2 pr-4">•••• 1207</td>
          <td className="py-2 pr-4">$860</td>
          <td className="py-2 pr-4">
            <div className="grid w-[132px] grid-cols-3 gap-1">
              <Badge tone="ghost">EFX</Badge>
              <Badge tone="slate">EXP</Badge>
              <Badge tone="ghost">TU</Badge>
            </div>
          </td>
        </tr>
      </tbody>


{/* Footer totals */}
<tfoot className="border-t border-slate-200 bg-slate-50">
  <tr className="text-xs font-semibold text-slate-600">


{/* Left label + overall counts */}
<td className="py-3 pr-4" colSpan={4}>
  <div className="flex flex-col gap-1">
    <div className="text-slate-500">
      Subtotal{" "}
      <span className="font-normal">
        (6 grouped rows)
      </span>
    </div>

    <div className="text-slate-900 mt-1">
      <span className="font-semibold">Total</span>{" "}
      <span className="font-normal text-slate-500">
        (10 bureau items)
      </span>
    </div>
  </div>
</td>






    <td className="py-3 pr-4 text-slate-900">$23,810</td>

    {/* Bureaus totals (counts per bureau) */}
    <td className="py-3 pr-4">
      <div className="grid w-[132px] grid-cols-3 gap-1">
        <Badge tone="bare">3</Badge> {/* EFX */}
        <Badge tone="bare">4</Badge> {/* EXP */}
        <Badge tone="bare">3</Badge> {/* TU */}
      </div>
    </td>
  </tr>
</tfoot>




    </table>
  </div>
</div>





 







































{/* Collections / Charge-offs */}
<div className="rounded-lg border border-slate-200">




  <div className="border-b border-slate-200 bg-slate-50 px-3 py-2">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div>
        <div className="text-xs font-semibold text-slate-600">Collections and Charge-offs</div>
      </div>

      {/* Filters (static mock) */}
      <div className="flex items-center gap-2">
        <div className="text-xs font-medium text-slate-500">Filter by bureau:</div>

        <div>
          {/* Example: TU selected */}
          <Badge tone="slate">TU</Badge>
        </div>

        <span className="text-xs font-medium text-slate-400">Clear</span>
      </div>
    </div>
  </div>












  <div className="overflow-x-auto p-3">
    <table className="min-w-full text-sm">
<thead className="text-left text-xs font-semibold text-slate-500">
  <tr>
    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Creditor / Collector
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Type
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Date
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Amount
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Status
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      Bureaus
    </th>
  </tr>
</thead>


      <tbody className="divide-y divide-slate-200">
        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">Midland Credit</td>
          <td className="py-2 pr-4">
            <Badge tone="red">Collection</Badge>
          </td>
          <td className="py-2 pr-4">2022-09</td>
          <td className="py-2 pr-4">$1,980</td>
          <td className="py-2 pr-4">
            <Badge tone="slate">Open</Badge>
          </td>
          <td className="py-2 pr-4 space-x-1">
            <Badge tone="slate">EFX</Badge>
            <Badge tone="slate">EXP</Badge>
            <Badge tone="ghost">TU</Badge>
          </td>
        </tr>

        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">Synchrony</td>
          <td className="py-2 pr-4">
            <Badge tone="red">Charge-off</Badge>
          </td>
          <td className="py-2 pr-4">2020-02</td>
          <td className="py-2 pr-4">$4,120</td>
          <td className="py-2 pr-4">
            <Badge tone="slate">Closed</Badge>
          </td>
          <td className="py-2 pr-4 space-x-1">
            <Badge tone="ghost">EFX</Badge>
            <Badge tone="ghost">EXP</Badge>
            <Badge tone="slate">TU</Badge>
          </td>
        </tr>

        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">Portfolio Recovery</td>
          <td className="py-2 pr-4">
            <Badge tone="red">Collection</Badge>
          </td>
          <td className="py-2 pr-4">2021-06</td>
          <td className="py-2 pr-4">$2,450</td>
          <td className="py-2 pr-4">
            <Badge tone="slate">Open</Badge>
          </td>
          <td className="py-2 pr-4 space-x-1">
            <Badge tone="slate">EFX</Badge>
            <Badge tone="ghost">EXP</Badge>
            <Badge tone="slate">TU</Badge>
          </td>
        </tr>

        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">LVNV Funding</td>
          <td className="py-2 pr-4">
            <Badge tone="red">Collection</Badge>
          </td>
          <td className="py-2 pr-4">2019-11</td>
          <td className="py-2 pr-4">$860</td>
          <td className="py-2 pr-4">
            <Badge tone="slate">Open</Badge>
          </td>
          <td className="py-2 pr-4 space-x-1">
            <Badge tone="ghost">EFX</Badge>
            <Badge tone="slate">EXP</Badge>
            <Badge tone="ghost">TU</Badge>
          </td>
        </tr>

        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">Capital One</td>
          <td className="py-2 pr-4">
            <Badge tone="red">Charge-off</Badge>
          </td>
          <td className="py-2 pr-4">2018-07</td>
          <td className="py-2 pr-4">$3,300</td>
          <td className="py-2 pr-4">
            <Badge tone="slate">Closed</Badge>
          </td>
          <td className="py-2 pr-4 space-x-1">
            <Badge tone="slate">EFX</Badge>
            <Badge tone="slate">EXP</Badge>
            <Badge tone="slate">TU</Badge>
          </td>
        </tr>

        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">Credit One Bank</td>
          <td className="py-2 pr-4">
            <Badge tone="red">Charge-off</Badge>
          </td>
          <td className="py-2 pr-4">2021-01</td>
          <td className="py-2 pr-4">$1,140</td>
          <td className="py-2 pr-4">
            <Badge tone="slate">Closed</Badge>
          </td>
          <td className="py-2 pr-4 space-x-1">
            <Badge tone="slate">EFX</Badge>
            <Badge tone="ghost">EXP</Badge>
            <Badge tone="ghost">TU</Badge>
          </td>
        </tr>
      </tbody>


<tfoot className="border-t border-slate-200 bg-slate-50">
  <tr className="text-xs font-semibold text-slate-600">


{/* Left label + overall counts */}
<td className="py-3 pr-4" colSpan={3}>
  <div className="flex flex-col gap-1">
    <div className="text-slate-500">
      Subtotal{" "}
      <span className="font-normal">
        (6 grouped rows)
      </span>
    </div>

    <div className="text-slate-900 mt-1">
      <span className="font-semibold">Total</span>{" "}
      <span className="font-normal text-slate-500">
        (12 bureau items)
      </span>
    </div>
  </div>
</td>



    {/* Amount total */}
    <td className="py-3 pr-4 text-slate-900">$13,850</td>

    {/* Status column has no meaningful total */}
    <td className="py-3 pr-4">
      <span className="text-slate-500">—</span>
    </td>

    {/* Bureaus totals (counts per bureau, aligned to grid) */}
    <td className="py-3 pr-4">
      <div className="grid w-[132px] grid-cols-3 gap-1">
        <Badge tone="bare">4</Badge> {/* EFX */}
        <Badge tone="bare">3</Badge> {/* EXP */}
        <Badge tone="bare">5</Badge> {/* TU */}
      </div>
    </td>
  </tr>
</tfoot>









    </table>
  </div>
</div>




























{/* Public records */}
<div className="rounded-lg border border-slate-200">
  <div className="border-b border-slate-200 bg-slate-50 px-3 py-2">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div>
        <div className="text-xs font-semibold text-slate-600">Public Records</div>
      </div>

      {/* Filters (static mock) */}
      <div className="flex items-center gap-2">
        <div className="text-xs font-medium text-slate-500">Filter by bureau:</div>

        <div>
          {/* Example: TU selected */}
          <Badge tone="slate">TU</Badge>
        </div>

        <span className="text-xs font-medium text-slate-400">Clear</span>
      </div>
    </div>
  </div>

  <div className="overflow-x-auto p-3">
    <table className="min-w-full text-sm">








<thead className="text-left text-xs font-semibold text-slate-500">
  <tr>
    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Type
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Reported
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Status
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Court / Ref
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      Bureaus
    </th>
  </tr>
</thead>



      <tbody className="divide-y divide-slate-200">
        {/* Bankruptcy – discharged */}
        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">
            <Badge tone="red">Bankruptcy</Badge>
          </td>
          <td className="py-2 pr-4">2018-04</td>
          <td className="py-2 pr-4">
            <Badge tone="slate">Discharged</Badge>
          </td>
          <td className="py-2 pr-4">US BK Court (AZ)</td>
          <td className="py-2 pr-4">
            <div className="grid w-[132px] grid-cols-3 gap-1">
              <Badge tone="ghost">EFX</Badge>
              <Badge tone="slate">EXP</Badge>
              <Badge tone="slate">TU</Badge>
            </div>
          </td>
        </tr>

        {/* Foreclosure */}
        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">
            <Badge tone="red">Foreclosure</Badge>
          </td>
          <td className="py-2 pr-4">2020-11</td>
          <td className="py-2 pr-4">
            <Badge tone="slate">Completed</Badge>
          </td>
          <td className="py-2 pr-4">Maricopa County</td>
          <td className="py-2 pr-4">
            <div className="grid w-[132px] grid-cols-3 gap-1">
              <Badge tone="slate">EFX</Badge>
              <Badge tone="slate">EXP</Badge>
              <Badge tone="ghost">TU</Badge>
            </div>
          </td>
        </tr>

        {/* Tax lien */}
        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">
            <Badge tone="red">Tax Lien</Badge>
          </td>
          <td className="py-2 pr-4">2019-06</td>
          <td className="py-2 pr-4">
            <Badge tone="slate">Released</Badge>
          </td>
          <td className="py-2 pr-4">IRS</td>
          <td className="py-2 pr-4">
            <div className="grid w-[132px] grid-cols-3 gap-1">
              <Badge tone="ghost">EFX</Badge>
              <Badge tone="slate">EXP</Badge>
              <Badge tone="ghost">TU</Badge>
            </div>
          </td>
        </tr>

        {/* Civil judgment */}
        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">
            <Badge tone="red">Judgment</Badge>
          </td>
          <td className="py-2 pr-4">2021-02</td>
          <td className="py-2 pr-4">
            <Badge tone="slate">Satisfied</Badge>
          </td>
          <td className="py-2 pr-4">Phoenix Municipal Court</td>
          <td className="py-2 pr-4">
            <div className="grid w-[132px] grid-cols-3 gap-1">
              <Badge tone="ghost">EFX</Badge>
              <Badge tone="ghost">EXP</Badge>
              <Badge tone="slate">TU</Badge>
            </div>
          </td>
        </tr>

        {/* Bankruptcy – dismissed */}
        <tr className="text-slate-900">
          <td className="py-2 pr-4 font-medium">
            <Badge tone="red">Bankruptcy</Badge>
          </td>
          <td className="py-2 pr-4">2022-09</td>
          <td className="py-2 pr-4">
            <Badge tone="slate">Dismissed</Badge>
          </td>
          <td className="py-2 pr-4">US BK Court (AZ)</td>
          <td className="py-2 pr-4">
            <div className="grid w-[132px] grid-cols-3 gap-1">
              <Badge tone="ghost">EFX</Badge>
              <Badge tone="slate">EXP</Badge>
              <Badge tone="slate">TU</Badge>
            </div>
          </td>
        </tr>
      </tbody>





<tfoot className="border-t border-slate-200 bg-slate-50">
  <tr className="text-xs font-semibold text-slate-600">



{/* Left label + overall counts */}
<td className="py-3 pr-4" colSpan={4}>
  <div className="flex flex-col gap-1">
    <div className="text-slate-500">
      Subtotal{" "}
      <span className="font-normal">
        (5 grouped rows)
      </span>
    </div>

    <div className="text-slate-900 mt-1">
      <span className="font-semibold">Total</span>{" "}
      <span className="font-normal text-slate-500">
        (8 bureau items)
      </span>
    </div>
  </div>
</td>


    {/* Bureaus totals (counts per bureau) */}
    <td className="py-3 pr-4">
      <div className="grid w-[132px] grid-cols-3 gap-1">
        <Badge tone="bare">1</Badge> {/* EFX */}
        <Badge tone="bare">4</Badge> {/* EXP */}
        <Badge tone="bare">3</Badge> {/* TU */}
      </div>
    </td>
  </tr>
</tfoot>





    </table>
  </div>
</div>

































        </div>
      </div>





{/* Inquiries */}
<div className="mt-4 rounded-xl border border-slate-200 bg-white">
  
<div className="border-b border-slate-200 p-4 flex items-start justify-between">
  <div>
    <div className="text-sm font-semibold text-slate-900">Inquiries</div>
    <div className="mt-1 text-xs text-slate-500">
      Hard and soft pulls (if available).
    </div>
  </div>

  {/* Filters */}
  <div className="flex items-center gap-2 text-xs">
    <span className="text-slate-500">Filter by bureau:</span>

    <Badge tone="slate">EFX</Badge>
    <Badge tone="slate">EXP</Badge>
    <Badge tone="slate">TU</Badge>

    <button className="ml-1 text-slate-400 hover:text-slate-600">
      Clear
    </button>
  </div>
</div>


  <div className="overflow-x-auto p-4">


<table className="min-w-full text-sm">
<thead className="text-left text-xs font-semibold text-slate-500">
  <tr>
    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Subscriber
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Type
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">
      <span className="inline-flex items-center gap-1">
        Date
        <span className="flex flex-col text-[8px] leading-[8px] text-slate-300">
          <span>▲</span>
          <span>▼</span>
        </span>
      </span>
    </th>

    <th className="py-2 pr-4">Bureaus</th>
  </tr>
</thead>


  <tbody className="divide-y divide-slate-200">
    <tr className="text-slate-900">
      <td className="py-2 pr-4 font-medium">Capital One</td>
      <td className="py-2 pr-4">
        <Badge tone="red">Hard</Badge>
      </td>
      <td className="py-2 pr-4">2025-01-12</td>
      <td className="py-2 pr-4">
        <div className="grid w-[132px] grid-cols-3 gap-1">
          <Badge tone="ghost">EFX</Badge>
          <Badge tone="slate">EXP</Badge>
          <Badge tone="ghost">TU</Badge>
        </div>
      </td>
    </tr>

    <tr className="text-slate-900">
      <td className="py-2 pr-4 font-medium">Car Dealer</td>
      <td className="py-2 pr-4">
        <Badge tone="red">Hard</Badge>
      </td>
      <td className="py-2 pr-4">2024-11-03</td>
      <td className="py-2 pr-4">
        <div className="grid w-[132px] grid-cols-3 gap-1">
          <Badge tone="slate">EFX</Badge>
          <Badge tone="ghost">EXP</Badge>
          <Badge tone="slate">TU</Badge>
        </div>
      </td>
    </tr>

    <tr className="text-slate-900">
      <td className="py-2 pr-4 font-medium">Credit Karma</td>
      <td className="py-2 pr-4">
        <Badge tone="green">Soft</Badge>
      </td>
      <td className="py-2 pr-4">2025-02-08</td>
      <td className="py-2 pr-4">
        <div className="grid w-[132px] grid-cols-3 gap-1">
          <Badge tone="ghost">EFX</Badge>
          <Badge tone="slate">EXP</Badge>
          <Badge tone="slate">TU</Badge>
        </div>
      </td>
    </tr>
  </tbody>

<tfoot className="border-t border-slate-200 bg-slate-50">
  <tr className="text-xs font-semibold text-slate-600">
    {/* Left label + overall counts */}
    <td className="py-3 pr-4" colSpan={2}>
      <div className="flex flex-col gap-1">
        <div className="text-slate-500">
          Subtotal{" "}
          <span className="font-normal">(3 grouped rows)</span>
        </div>

        <div className="text-slate-900 mt-1">
          <span className="font-semibold">Total</span>{" "}
          <span className="font-normal text-slate-500">
            (5 bureau items)
          </span>
        </div>
      </div>
    </td>

    {/* Spacer for Date column */}
    <td className="py-3 pr-4">
      <span className="text-slate-500">—</span>
    </td>

    {/* Bureau totals */}
    <td className="py-3 pr-4">
      <div className="grid w-[132px] grid-cols-3 gap-1">
        <Badge tone="bare">1</Badge>
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
