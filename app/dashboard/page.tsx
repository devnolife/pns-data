"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import DashboardLayout from "@/components/layouts/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { FileText, Upload, Users, BarChart3, Clock } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading || !isAuthenticated) {
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
          <h1 className="text-3xl font-bold text-gray-800">Welcome, {user?.name || user?.username}</h1>
          <p className="text-gray-600 mt-1">
            {user?.role === "admin"
              ? "Manage your digital collections, users, and system statistics"
              : "Access and manage your digital collections and reports"}
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="collections">Collections</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            {user?.role === "admin" && <TabsTrigger value="users">Users</TabsTrigger>}
            {user?.role === "admin" && <TabsTrigger value="statistics">Statistics</TabsTrigger>}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Collections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-2xl font-bold">{user?.role === "admin" ? 124 : 32}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Reports Uploaded</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Upload className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-2xl font-bold">{user?.role === "admin" ? 87 : 5}</span>
                  </div>
                </CardContent>
              </Card>

              {user?.role === "admin" ? (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Total Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-purple-500 mr-2" />
                      <span className="text-2xl font-bold">156</span>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Training Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{user?.training || "N/A"}</div>
                    <div className="text-sm text-gray-500">Class: {user?.class || "N/A"}</div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Last Login</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-orange-500 mr-2" />
                    <span className="text-lg font-medium">Today, 10:30 AM</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent interactions with the system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "Viewed document", item: "CPNS Training Guidelines", time: "2 hours ago" },
                      { action: "Downloaded file", item: "PKP Module 3", time: "Yesterday" },
                      { action: "Uploaded report", item: "Weekly Progress Report", time: "3 days ago" },
                    ].map((activity, index) => (
                      <div key={index} className="flex justify-between items-center pb-2 border-b border-gray-100">
                        <div>
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-gray-500">{activity.item}</p>
                        </div>
                        <span className="text-xs text-gray-400">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks you can perform</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/dashboard/collections">
                      <FileText className="mr-2 h-4 w-4" />
                      Browse Collections
                    </Link>
                  </Button>
                  <Button className="w-full justify-start" variant="outline" asChild>
                    <Link href="/dashboard/reports/upload">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Report
                    </Link>
                  </Button>
                  {user?.role === "admin" && (
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <Link href="/dashboard/users">
                        <Users className="mr-2 h-4 w-4" />
                        Manage Users
                      </Link>
                    </Button>
                  )}
                  {user?.role === "admin" && (
                    <Button className="w-full justify-start" variant="outline" asChild>
                      <Link href="/dashboard/statistics">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        View Statistics
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="collections">
            <Card>
              <CardHeader>
                <CardTitle>Digital Collections</CardTitle>
                <CardDescription>Browse and access digital collections</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Collections content will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports</CardTitle>
                <CardDescription>Manage your reports and documents</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Reports content will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {user?.role === "admin" && (
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage system users</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>User management content will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {user?.role === "admin" && (
            <TabsContent value="statistics">
              <Card>
                <CardHeader>
                  <CardTitle>System Statistics</CardTitle>
                  <CardDescription>View system usage statistics</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Statistics content will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
