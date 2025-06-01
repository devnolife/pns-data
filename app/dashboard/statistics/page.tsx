"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, PieChart, Users, FileText, Upload, UserCheck } from "lucide-react"

export default function StatisticsPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }

    if (isAuthenticated && user?.role !== "ADMIN") {
      router.push("/dashboard/user")
    }
  }, [isAuthenticated, isLoading, router, user])

  if (isLoading || !isAuthenticated || user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">System Statistics</h1>
          <p className="text-gray-600 mt-1">View and analyze system usage statistics</p>
        </div>

        <div className="mb-6 flex justify-between items-center">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="collections">Collections</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-4">
            <Select defaultValue="30days">
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
              <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-blue-500 mr-2" />
                <span className="text-2xl font-bold">156</span>
                <span className="ml-2 text-xs text-green-500">+12% ↑</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Compared to previous period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Collections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-purple-500 mr-2" />
                <span className="text-2xl font-bold">124</span>
                <span className="ml-2 text-xs text-green-500">+8% ↑</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Compared to previous period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Reports Uploaded</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <Upload className="h-5 w-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold">87</span>
                <span className="ml-2 text-xs text-green-500">+15% ↑</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Compared to previous period</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <UserCheck className="h-5 w-5 text-orange-500 mr-2" />
                <span className="text-2xl font-bold">132</span>
                <span className="ml-2 text-xs text-green-500">+5% ↑</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Compared to previous period</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>User Registration</CardTitle>
              <CardDescription>New user registrations over time</CardDescription>
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
              <CardTitle>Collection Downloads</CardTitle>
              <CardDescription>Number of downloads per collection category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <BarChart className="h-10 w-10 text-gray-300" />
                <span className="ml-2 text-gray-500">Chart visualization will be displayed here</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>User Distribution by Training</CardTitle>
              <CardDescription>Breakdown of users by training program</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-60 flex items-center justify-center">
                <PieChart className="h-10 w-10 text-gray-300" />
                <span className="ml-2 text-gray-500">Chart visualization will be displayed here</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Popular Collections</CardTitle>
              <CardDescription>Most accessed digital collections</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "CPNS Training Guidelines 2024", downloads: 156, category: "CPNS" },
                  { title: "PKA Presentation Templates", downloads: 124, category: "PKA" },
                  { title: "CPNS Latsar Final Project Guidelines", downloads: 112, category: "CPNS" },
                  { title: "PKP Module 3: Leadership Principles", downloads: 89, category: "PKP" },
                  { title: "PKA Workshop Materials", downloads: 78, category: "PKA" },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-3 w-3 text-gray-400 mr-1" />
                      <span className="text-sm">{item.downloads}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "User registered", user: "Emily Johnson", time: "10 minutes ago" },
                  { action: "Collection uploaded", user: "Admin User", time: "1 hour ago" },
                  { action: "Report submitted", user: "David Wilson", time: "3 hours ago" },
                  { action: "User login", user: "Sarah Williams", time: "5 hours ago" },
                  { action: "Collection downloaded", user: "John Doe", time: "Yesterday" },
                ].map((activity, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-xs text-gray-500">by {activity.user}</p>
                    </div>
                    <span className="text-xs text-gray-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
