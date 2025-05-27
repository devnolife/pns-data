"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, PieChart, Users, Calendar, Clock, Download, TrendingUp, Eye, Activity, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function VisitorsStatisticsPage() {
  const [period, setPeriod] = useState("30")

  return (
    <div className="space-y-6">
      {/* Header with gradient background */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard 📊</h1>
            <p className="mt-2 text-white/90">Deep insights into your audience behavior</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
              <TrendingUp className="h-8 w-8 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Tabs defaultValue="overview" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList className="rounded-xl bg-muted/50 p-1">
              <TabsTrigger value="overview" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
                📈 Overview
              </TabsTrigger>
              <TabsTrigger value="visitors" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
                👥 Visitors
              </TabsTrigger>
              <TabsTrigger value="guestbook" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">
                📝 Guestbook
              </TabsTrigger>
              <TabsTrigger value="usage" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white">
                ⚡ Usage
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-48 rounded-full">
                  <SelectValue placeholder="Pilih rentang" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 hari terakhir</SelectItem>
                  <SelectItem value="30">30 hari terakhir</SelectItem>
                  <SelectItem value="90">3 bulan terakhir</SelectItem>
                  <SelectItem value="365">1 tahun terakhir</SelectItem>
                </SelectContent>
              </Select>
              <Button className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600">
                <Download className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="mt-6 space-y-6">
            {/* Key Metrics */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-0 shadow-lg shadow-blue-100/50 dark:shadow-blue-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Visitors</p>
                      <p className="text-3xl font-bold">1,248</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                          +12% ↗️
                        </Badge>
                        <span className="text-xs text-muted-foreground">vs last period</span>
                      </div>
                    </div>
                    <div className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-3">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg shadow-purple-100/50 dark:shadow-purple-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Unique Visitors</p>
                      <p className="text-3xl font-bold">856</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                          +8% ↗️
                        </Badge>
                        <span className="text-xs text-muted-foreground">vs last period</span>
                      </div>
                    </div>
                    <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-3">
                      <Eye className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg shadow-green-100/50 dark:shadow-green-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Guestbook Entries</p>
                      <p className="text-3xl font-bold">324</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                          +15% ↗️
                        </Badge>
                        <span className="text-xs text-muted-foreground">vs last period</span>
                      </div>
                    </div>
                    <div className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-3">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg shadow-orange-100/50 dark:shadow-orange-900/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Avg. Session</p>
                      <p className="text-3xl font-bold">8:24</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                          +5% ↗️
                        </Badge>
                        <span className="text-xs text-muted-foreground">vs last period</span>
                      </div>
                    </div>
                    <div className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 p-3">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts */}
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="border-0 shadow-lg shadow-blue-100/50 dark:shadow-blue-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-blue-500" />
                    Visitor Trends 📈
                  </CardTitle>
                  <CardDescription>Traffic patterns over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-80 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
                    <div className="text-center">
                      <LineChart className="h-16 w-16 text-blue-300 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">Interactive Chart</p>
                      <p className="text-sm text-blue-600 dark:text-blue-400">Beautiful visualization coming soon! 🚀</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg shadow-purple-100/50 dark:shadow-purple-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-purple-500" />
                    Traffic Sources 🎯
                  </CardTitle>
                  <CardDescription>Where your visitors come from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-80 items-center justify-center rounded-xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                    <div className="text-center">
                      <PieChart className="h-16 w-16 text-purple-300 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-purple-700 dark:text-purple-300">Source Analytics</p>
                      <p className="text-sm text-purple-600 dark:text-purple-400">Data insights loading... ⚡</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Additional Analytics */}
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="border-0 shadow-lg shadow-green-100/50 dark:shadow-green-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-green-500" />
                    Time Distribution ⏰
                  </CardTitle>
                  <CardDescription>Peak activity hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex h-60 items-center justify-center rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                    <div className="text-center">
                      <BarChart className="h-12 w-12 text-green-300 mx-auto mb-2" />
                      <p className="text-sm font-medium text-green-700 dark:text-green-300">Hourly Analysis</p>
                      <p className="text-xs text-green-600 dark:text-green-400">Coming soon!</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg shadow-orange-100/50 dark:shadow-orange-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-orange-500" />
                    Top Pages 🔥
                  </CardTitle>
                  <CardDescription>Most visited content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { page: "🏠 Home Page", visits: 856, percentage: "32%" },
                      { page: "🔑 Login Page", visits: 624, percentage: "23%" },
                      { page: "📚 Digital Collections", visits: 512, percentage: "19%" },
                      { page: "📝 Guestbook", visits: 324, percentage: "12%" },
                      { page: "✨ Register Page", visits: 248, percentage: "9%" },
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 rounded-xl bg-orange-50 dark:bg-orange-950/20">
                        <div>
                          <p className="font-semibold text-sm">{item.page}</p>
                          <p className="text-xs text-muted-foreground">{item.visits} visits</p>
                        </div>
                        <Badge variant="secondary" className="font-bold">{item.percentage}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg shadow-pink-100/50 dark:shadow-pink-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-pink-500" />
                    Recent Activity 💫
                  </CardTitle>
                  <CardDescription>Latest guestbook entries</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Sarah Chen", message: "Amazing digital collection!", time: "2 min ago" },
                      { name: "Alex Rodriguez", message: "Love the new interface design 💖", time: "15 min ago" },
                      { name: "Maya Patel", message: "So helpful for my research!", time: "1 hour ago" },
                      { name: "David Kim", message: "Great work team! 🎉", time: "3 hours ago" },
                    ].map((entry, index) => (
                      <div key={index} className="p-3 rounded-xl bg-pink-50 dark:bg-pink-950/20">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold text-sm">{entry.name}</p>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{entry.message}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">{entry.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="visitors" className="mt-6">
            <div className="text-center py-12">
              <div className="rounded-full bg-muted p-6 mx-auto w-fit">
                <Users className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Visitor Analytics</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Detailed visitor analytics coming soon! 🚀
              </p>
            </div>
          </TabsContent>

          <TabsContent value="guestbook" className="mt-6">
            <div className="text-center py-12">
              <div className="rounded-full bg-muted p-6 mx-auto w-fit">
                <Calendar className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">Guestbook Analytics</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Deep dive into guestbook insights coming soon! 📝
              </p>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="mt-6">
            <div className="text-center py-12">
              <div className="rounded-full bg-muted p-6 mx-auto w-fit">
                <Activity className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">System Usage</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                System performance metrics coming soon! ⚡
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
