"use client"

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface VisitorChartProps {
  data: any[]
  type: "area" | "bar" | "pie"
  dataKey: string
  title?: string
  color?: string
}

export function VisitorChart({ data, type, dataKey, title, color = "hsl(var(--chart-1))" }: VisitorChartProps) {
  const renderChart = () => {
    switch (type) {
      case "area":
        return (
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
            <ChartTooltip
              content={<ChartTooltipContent />}
              labelFormatter={(label) => `Bulan ${label}`}
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              fillOpacity={1}
              fill={`url(#color${dataKey})`}
            />
          </AreaChart>
        )

      case "bar":
        return (
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey="hour" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
            <ChartTooltip
              content={<ChartTooltipContent />}
              labelFormatter={(label) => `Jam ${label}`}
            />
            <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        )

      case "pie":
        const COLORS = [
          'hsl(var(--chart-1))',
          'hsl(var(--chart-2))',
          'hsl(var(--chart-3))',
          'hsl(var(--chart-4))',
          'hsl(var(--chart-5))'
        ]

        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey={dataKey}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <ChartTooltip
              content={<ChartTooltipContent />}
              formatter={(value, name) => [`${value} pengunjung`, name]}
            />
          </PieChart>
        )

      default:
        return null
    }
  }

  return (
    <ChartContainer
      config={{
        [dataKey]: {
          label: title || "Data",
          color: color,
        },
      }}
      className="h-80"
    >
      <ResponsiveContainer width="100%" height="100%">
        {renderChart()}
      </ResponsiveContainer>
    </ChartContainer>
  )
} 
