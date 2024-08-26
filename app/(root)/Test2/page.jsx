"use client";

import { PieChart, Pie, Cell } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";

export default function Component() {
  const data = [
    {
      activity: "Stand",
      value: (8 / 12) * 100,
      fill: "var(--color-stand)",
    },
    {
      activity: "Exercise",
      value: (73 / 120) * 100,
      fill: "var(--color-exercise)",
    },
    {
      activity: "Move",
      value: (562 / 600) * 100,
      fill: "var(--color-move)",
    },
  ];

  return (
    <Card className="max-w-xs">
      <CardContent className="flex gap-4 p-4">
        <div className="grid items-center gap-2">
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">Move</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              562/600
              <span className="text-sm font-normal text-muted-foreground">
                kcal
              </span>
            </div>
          </div>
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">Exercise</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              73/120
              <span className="text-sm font-normal text-muted-foreground">
                min
              </span>
            </div>
          </div>
          <div className="grid flex-1 auto-rows-min gap-0.5">
            <div className="text-sm text-muted-foreground">Stand</div>
            <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
              8/12
              <span className="text-sm font-normal text-muted-foreground">
                hr
              </span>
            </div>
          </div>
        </div>
        <ChartContainer
          config={{
            move: {
              label: "Move",
              color: "hsl(var(--chart-1))",
            },
            exercise: {
              label: "Exercise",
              color: "hsl(var(--chart-2))",
            },
            stand: {
              label: "Stand",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="mx-auto aspect-square w-full max-w-[80%]"
        >
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="activity"
              innerRadius="40%"
              outerRadius="80%"
              fill="var(--color-move)"
              paddingAngle={5}
              startAngle={90}
              endAngle={450}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
