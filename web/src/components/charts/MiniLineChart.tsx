import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

type Point = { x: number | string; y: number };

const scoreTrend = [
  { x: 1, y: 660 },
  { x: 2, y: 662 },
  { x: 3, y: 668 },
  { x: 4, y: 671 },
  { x: 5, y: 675 },
  { x: 6, y: 682 },
];

export default function MiniLineChart({
  data,
  stroke = "#3b82f6",          // blue-500
  fill = "rgba(59,130,246,0.10)",// subtle fill
}: {
  data: Point[];
  stroke?: string;
  fill?: string;
}) {
  return (
    <div className="h-28 w-full">
<ResponsiveContainer width="100%" height={120}>
  <AreaChart
    data={scoreTrend}
    margin={{ top: 8, right: 0, left: 0, bottom: 0 }}
  >
    {/* Gradient definition */}
    <defs>
      <linearGradient id="scoreBlue" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.35} />
        <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.05} />
      </linearGradient>
    </defs>

    {/* Hide axes */}
    <XAxis dataKey="x" hide />
    <YAxis hide domain={["dataMin - 5", "dataMax + 5"]} />

    <Area
      type="monotone"
      dataKey="y"
      stroke="#38bdf8"
      strokeWidth={2.5}
      fill="url(#scoreBlue)"
      dot={false}
      activeDot={false}
    />
  </AreaChart>
</ResponsiveContainer>
    </div>
  );
}
