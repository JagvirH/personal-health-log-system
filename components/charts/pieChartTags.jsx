"use client";

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { getTagPercentages } from "@/backend/api/dataAnalytics";

// Define colors for the pie chart segments
const COLORS = [
  "#8884d8",
  "#8dd1e1",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#a4de6c",
  "#d0ed57",
];

export default function PieChartTags() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch tag percentages and set the chart data
    const fetchData = async () => {
      try {
        const percentages = await getTagPercentages();
        const formattedData = percentages.map((item, index) => ({
          activity: item.tag_title,
          value: item.percentage,
          fill: COLORS[index % COLORS.length], // Cycle through predefined colors
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching tag percentages:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <Card className="max-w-xs">
      <CardContent className="flex gap-4 p-4">
        <div className="grid items-center gap-2">
          {chartData.map((entry, index) => (
            <div key={`label-${index}`} className="grid flex-1 auto-rows-min gap-0.5">
              <div className="text-sm text-muted-foreground">{entry.activity}</div>
              <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                {entry.value.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>
        <ChartContainer
          config={{}} // Pass an empty object or appropriate config if needed
          className="mx-auto aspect-square w-full max-w-[80%]"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="activity"
              innerRadius="40%"
              outerRadius="80%"
              paddingAngle={5}
              startAngle={90}
              endAngle={450}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
