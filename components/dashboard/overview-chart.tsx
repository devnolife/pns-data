"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface ChartData {
  name: string
  users: number
  collections: number
  reports: number
}

interface OverviewChartProps {
  title?: string
  description?: string
  monthlyData?: ChartData[]
}

export function OverviewChart({
  title = "Statistik Sistem",
  description = "Pertumbuhan pengguna, koleksi, dan laporan",
  monthlyData = []
}: OverviewChartProps) {
  const [dataType, setDataType] = useState<"users" | "collections" | "reports">("users")

  // Default data if no real data is provided
  const defaultData: ChartData[] = [
    { name: "Jan", users: 24, collections: 13, reports: 8 },
    { name: "Feb", users: 13, collections: 9, reports: 12 },
    { name: "Mar", users: 98, collections: 45, reports: 23 },
    { name: "Apr", users: 39, collections: 21, reports: 15 },
    { name: "Mei", users: 48, collections: 28, reports: 19 },
    { name: "Jun", users: 38, collections: 22, reports: 16 },
  ]

  const chartData = monthlyData.length > 0 ? monthlyData : defaultData

  const getDataKey = () => {
    switch (dataType) {
      case "users":
        return "users"
      case "collections":
        return "collections"
      case "reports":
        return "reports"
      default:
        return "users"
    }
  }

  const getLabel = () => {
    switch (dataType) {
      case "users":
        return "Pengguna"
      case "collections":
        return "Koleksi"
      case "reports":
        return "Laporan"
      default:
        return "Pengguna"
    }
  }

  const getColor = () => {
    switch (dataType) {
      case "users":
        return "hsl(var(--chart-1))"
      case "collections":
        return "hsl(var(--chart-2))"
      case "reports":
        return "hsl(var(--chart-3))"
      default:
        return "hsl(var(--chart-1))"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Tabs defaultValue={dataType} onValueChange={(value) => setDataType(value as "users" | "collections" | "reports")}>
          <TabsList>
            <TabsTrigger value="users">Pengguna</TabsTrigger>
            <TabsTrigger value="collections">Koleksi</TabsTrigger>
            <TabsTrigger value="reports">Laporan</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          config={{
            [getDataKey()]: {
              label: getLabel(),
              color: getColor(),
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`color${dataType}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={getColor()} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={getColor()} stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
              <ChartTooltip 
                content={<ChartTooltipContent />}
                labelFormatter={(label) => `Bulan ${label}`}
                formatter={(value, name) => [value, getLabel()]}
              />
              <Area
                type="monotone"
                dataKey={getDataKey()}
                stroke={getColor()}
                fillOpacity={1}
                fill={`url(#color${dataType})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
