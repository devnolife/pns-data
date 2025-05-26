"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Sample data
const data = {
  weekly: [
    { name: "Sen", value: 400 },
    { name: "Sel", value: 300 },
    { name: "Rab", value: 500 },
    { name: "Kam", value: 280 },
    { name: "Jum", value: 590 },
    { name: "Sab", value: 320 },
    { name: "Min", value: 280 },
  ],
  monthly: [
    { name: "Jan", value: 2400 },
    { name: "Feb", value: 1398 },
    { name: "Mar", value: 9800 },
    { name: "Apr", value: 3908 },
    { name: "Mei", value: 4800 },
    { name: "Jun", value: 3800 },
    { name: "Jul", value: 4300 },
    { name: "Agu", value: 5300 },
    { name: "Sep", value: 4500 },
    { name: "Okt", value: 3800 },
    { name: "Nov", value: 4900 },
    { name: "Des", value: 3800 },
  ],
}

interface OverviewChartProps {
  title?: string
  description?: string
}

export function OverviewChart({
  title = "Pengunjung",
  description = "Statistik pengunjung sistem",
}: OverviewChartProps) {
  const [period, setPeriod] = useState<"weekly" | "monthly">("weekly")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Tabs defaultValue={period} onValueChange={(value) => setPeriod(value as "weekly" | "monthly")}>
          <TabsList>
            <TabsTrigger value="weekly">Mingguan</TabsTrigger>
            <TabsTrigger value="monthly">Bulanan</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          config={{
            value: {
              label: "Pengunjung",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data[period]} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-value)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-value)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="var(--color-value)"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
