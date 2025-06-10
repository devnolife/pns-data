import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GuestbookAdmin } from "./guestbook-admin"
import { ReportVerificationTable } from "./report-verification-table"
import {
  Users,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  TrendingUp,
  Calendar,
  BarChart3
} from "lucide-react"

interface AdminStats {
  reports: {
    total: number
    pending: number
    verified: number
    rejected: number
  }
  guestbook: {
    total: number
    approved: number
    today: number
  }
  activity: {
    recentVerifications: number
    recentSubmissions: number
  }
}

interface ReportVerificationAdminProps {
  initialReports?: any[]
  onVerify?: (reportId: string) => void
  onReject?: (reportId: string, feedback: string) => void
  stats?: AdminStats
}

export function ReportVerificationAdmin({
  initialReports = [],
  onVerify = () => { },
  onReject = () => { },
  stats
}: ReportVerificationAdminProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Default stats if none provided
  const defaultStats: AdminStats = {
    reports: { total: 0, pending: 0, verified: 0, rejected: 0 },
    guestbook: { total: 0, approved: 0, today: 0 },
    activity: { recentVerifications: 0, recentSubmissions: 0 }
  }

  const adminStats = stats || defaultStats

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage reports, guestbook entries, and system verification</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Report Verification
          </TabsTrigger>
          <TabsTrigger value="guestbook" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Guestbook Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-blue-100">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{adminStats.reports.total}</p>
                    <p className="text-sm text-gray-600">Total Reports</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-yellow-100">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{adminStats.reports.pending}</p>
                    <p className="text-sm text-gray-600">Pending Verification</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-green-100">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{adminStats.reports.verified}</p>
                    <p className="text-sm text-gray-600">Verified Reports</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-purple-100">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{adminStats.guestbook.total}</p>
                    <p className="text-sm text-gray-600">Guestbook Entries</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  Report Status Overview
                </CardTitle>
                <CardDescription>Current status distribution of reports</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm font-medium">Pending</span>
                  </div>
                  <Badge variant="outline">{adminStats.reports.pending}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">{adminStats.reports.verified}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm font-medium">Rejected</span>
                  </div>
                  <Badge variant="destructive">{adminStats.reports.rejected}</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Today's activity summary</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">New Guestbook Entries</span>
                  <Badge className="bg-purple-100 text-purple-800">{adminStats.guestbook.today}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Recent Verifications</span>
                  <Badge className="bg-blue-100 text-blue-800">{adminStats.activity.recentVerifications}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">New Submissions</span>
                  <Badge className="bg-green-100 text-green-800">{adminStats.activity.recentSubmissions}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Report Verification
              </CardTitle>
              <CardDescription>
                Review and verify submitted reports from users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReportVerificationTable
                reports={initialReports}
                onVerify={onVerify}
                onReject={onReject}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="guestbook">
          <GuestbookAdmin />
        </TabsContent>
      </Tabs>
    </div>
  )
} 
