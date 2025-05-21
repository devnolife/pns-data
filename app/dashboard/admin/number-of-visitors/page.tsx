"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import AdminDashboardLayout from "@/components/layouts/admin-dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, PieChart, Users, Calendar, Clock } from "lucide-react"

export default function VisitorsStatisticsPage() {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const [period, setPeriod] = useState("30days")

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }

    if (isAuthenticated && user?.role !== "admin") {
      router.push("/dashboard/user")
    }
  }, [isAuthenticated, loading, router, user])

  if (loading || !isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <AdminDashboardLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Visitor Statistics</h1>
          <p className="text-gray-600 mt-1">Analyze visitor data and system usage</p>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="visitors">Visitors</TabsTrigger>
              <TabsTrigger value="guestbook">Guestbook</TabsTrigger>
              <TabsTrigger value="usage">System Usage</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-4">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-2xl font-bold">1,248</span>
                <span className="ml-2 text-xs text-green-500">+12% ↑</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Compared to previous period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Unique Visitors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-purple-500 mr-2" />
                <span className="text-2xl font-bold">856</span>
                <span className="ml-2 text-xs text-green-500">+8% ↑</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Compared to previous period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Guestbook Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold">324</span>
                <span className="ml-2 text-xs text-green-500">+15% ↑</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Compared to previous period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Avg. Session Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-2xl font-bold">8:24</span>
                <span className="ml-2 text-xs text-green-500">+5% ↑</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Compared to previous period</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Visitor Trends</CardTitle>
              <CardDescription>Number of visitors over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <LineChart className="h-10 w-10 text-gray-300" />
                <span className="ml-2 text-gray-500">Chart visualization will be displayed here</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Visitor Sources</CardTitle>
              <CardDescription>Where visitors are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <PieChart className="h-10 w-10 text-gray-300" />
                <span className="ml-2 text-gray-500">Chart visualization will be displayed here</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Visitor Distribution by Time</CardTitle>
              <CardDescription>When visitors access the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60 flex items-center justify-center">
                <BarChart className="h-10 w-10 text-gray-300" />
                <span className="ml-2 text-gray-500">Chart visualization will be displayed here</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Pages</CardTitle>
              <CardDescription>Most visited pages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { page: "Home Page", visits: 856, percentage: "32%" },
                  { page: "Login Page", visits: 624, percentage: "23%" },
                  { page: "Digital Collections", visits: 512, percentage: "19%" },
                  { page: "Guestbook", visits: 324, percentage: "12%" },
                  { page: "Register Page", visits: 248, percentage: "9%" },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{item.page}</p>
                      <p className="text-xs text-gray-500">{item.visits} visits</p>
                    </div>
                    <div className="text-sm font-medium">{item.percentage}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Guestbook Entries</CardTitle>
              <CardDescription>Latest visitors who signed the guestbook</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Emily Johnson", institution: "Ministry of Education", time: "10 minutes ago" },
                  { name: "David Wilson", institution: "Public Service Agency", time: "1 hour ago" },
                  { name: "Sarah Williams", institution: "Local Government", time: "3 hours ago" },
                  { name: "Michael Brown", institution: "Ministry of Health", time: "5 hours ago" },
                  { name: "Jane Smith", institution: "Ministry of Finance", time: "Yesterday" },
                ].map((entry, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{entry.name}</p>
                      <p className="text-xs text-gray-500">{entry.institution}</p>
                    </div>
                    <span className="text-xs text-gray-400">{entry.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminDashboardLayout>
  )
}
