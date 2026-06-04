import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from "recharts";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

const COLORS = [
  "#8b5cf6",
  "#06b6d4",
  "#22c55e",
  "#ef4444",
  "#f59e0b",
];

export default function StatusChart({
  data,
}: Props) {
  return (
    <PieChart
      width={400}
      height={300}
    >
      <Pie
        data={data}
        dataKey="value"
        outerRadius={120}
      >
        {data.map(
          (_, index) => (
            <Cell
              key={index}
              fill={
                COLORS[
                  index %
                    COLORS.length
                ]
              }
            />
          )
        )}
      </Pie>

      <Tooltip />
    </PieChart>
  );
}