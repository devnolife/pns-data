import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FolderOpen, Upload, User } from "lucide-react"

export default function UserDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your digital collection management dashboard.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Digital Collections</CardTitle>
            <CardDescription>Browse and manage your digital collections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <FolderOpen className="h-8 w-8 text-primary" />
              <Button asChild>
                <Link href="/dashboard/user/digital-collection">View Collections</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Upload Report</CardTitle>
            <CardDescription>Upload new reports to your collections</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <Upload className="h-8 w-8 text-primary" />
              <Button asChild>
                <Link href="/dashboard/user/upload-report">Upload Now</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Profile Settings</CardTitle>
            <CardDescription>Manage your account settings and preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <User className="h-8 w-8 text-primary" />
              <Button asChild variant="outline">
                <Link href="/dashboard/user/profile">Edit Profile</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your recent actions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">Report Uploaded</p>
                  <p className="text-sm text-muted-foreground">You uploaded "Q1 Financial Report" to Collections</p>
                </div>
                <div className="text-sm text-muted-foreground">2 days ago</div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">Collection Created</p>
                  <p className="text-sm text-muted-foreground">You created a new collection "Project Alpha"</p>
                </div>
                <div className="text-sm text-muted-foreground">5 days ago</div>
              </div>
              <div className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex-1">
                  <p className="text-sm font-medium">Profile Updated</p>
                  <p className="text-sm text-muted-foreground">You updated your profile information</p>
                </div>
                <div className="text-sm text-muted-foreground">1 week ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
