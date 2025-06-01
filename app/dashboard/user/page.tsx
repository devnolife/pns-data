import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FolderOpen, Upload, User, Activity, TrendingUp, Clock, Plus } from "lucide-react"

export default function UserDashboard() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
          <Activity className="h-4 w-4" />
          Dashboard Overview
        </div>
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
          Welcome Back!
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Manage your digital collections, upload reports, and track your progress all in one place.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Collections</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <FolderOpen className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Reports Uploaded</p>
                <p className="text-3xl font-bold">48</p>
              </div>
              <Upload className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">This Month</p>
                <p className="text-3xl font-bold">8</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Last Activity</p>
                <p className="text-xl font-bold">2 days ago</p>
              </div>
              <Clock className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Quick Actions</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:scale-105">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <FolderOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-900">Digital Collections</CardTitle>
                  <CardDescription className="text-gray-600">Browse and organize your files</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-500 mb-4">Access all your digital collections in one organized space.</p>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                <Link href="/dashboard/user/digital-collection" className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4" />
                  View Collections
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:scale-105">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-xl group-hover:bg-green-200 transition-colors">
                  <Upload className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-900">Upload Report</CardTitle>
                  <CardDescription className="text-gray-600">Add new documents quickly</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-500 mb-4">Upload and categorize your reports with ease.</p>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg">
                <Link href="/dashboard/user/upload-report" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Upload Now
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:scale-105">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-xl group-hover:bg-purple-200 transition-colors">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-900">Profile Settings</CardTitle>
                  <CardDescription className="text-gray-600">Customize your experience</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-500 mb-4">Manage your account and personal preferences.</p>
              <Button asChild variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 shadow-lg">
                <Link href="/dashboard/user/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Recent Activity</h2>
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-xl">Latest Updates</CardTitle>
            </div>
            <CardDescription>Track your recent actions and progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Upload className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Report Uploaded Successfully</p>
                  <p className="text-sm text-gray-600">You uploaded "Q1 Financial Report" to Collections</p>
                </div>
                <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">2 days ago</div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FolderOpen className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">New Collection Created</p>
                  <p className="text-sm text-gray-600">You created a new collection "Project Alpha"</p>
                </div>
                <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">5 days ago</div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <User className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Profile Information Updated</p>
                  <p className="text-sm text-gray-600">You updated your profile information and preferences</p>
                </div>
                <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full">1 week ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
