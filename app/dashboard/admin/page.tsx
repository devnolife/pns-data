import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BarChart, ClipboardCheck, FolderPlus, Users } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the administrative dashboard for digital collection management.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Users</CardTitle>
            <CardDescription>Active users in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Collections</CardTitle>
            <CardDescription>Total digital collections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">56</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Reports</CardTitle>
            <CardDescription>Pending verification</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">5 new since yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Visitors</CardTitle>
            <CardDescription>This week's visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,204</div>
            <p className="text-xs text-muted-foreground">+18% from last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <Button asChild className="flex items-center justify-start gap-2">
              <Link href="/dashboard/admin/verify-reports">
                <ClipboardCheck className="h-4 w-4" />
                Verify Reports
              </Link>
            </Button>
            <Button asChild className="flex items-center justify-start gap-2">
              <Link href="/dashboard/admin/manage-users">
                <Users className="h-4 w-4" />
                Manage Users
              </Link>
            </Button>
            <Button asChild className="flex items-center justify-start gap-2">
              <Link href="/dashboard/admin/manage-folders">
                <FolderPlus className="h-4 w-4" />
                Manage Folders
              </Link>
            </Button>
            <Button asChild className="flex items-center justify-start gap-2">
              <Link href="/dashboard/admin/number-of-visitors">
                <BarChart className="h-4 w-4" />
                View Statistics
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">New User Registered</p>
                  <p className="text-sm text-muted-foreground">Jane Smith (jane@example.com) created an account</p>
                </div>
                <div className="text-sm text-muted-foreground">1 hour ago</div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">Report Submitted</p>
                  <p className="text-sm text-muted-foreground">New report "Annual Budget" awaiting verification</p>
                </div>
                <div className="text-sm text-muted-foreground">3 hours ago</div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">Collection Created</p>
                  <p className="text-sm text-muted-foreground">New collection "Financial Reports 2025" created</p>
                </div>
                <div className="text-sm text-muted-foreground">Yesterday</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
