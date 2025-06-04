import { Users, FileText, FolderOpen, BarChart3, ClipboardCheck, FolderPlus, UserPlus, Bell } from "lucide-react"
import { WelcomeBanner } from "@/components/dashboard/welcome-banner"
import { StatCard } from "@/components/dashboard/stat-card"
import { ActivityItem } from "@/components/dashboard/activity-item"
import { ActionCard } from "@/components/dashboard/action-card"
import { OverviewChart } from "@/components/dashboard/overview-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getDashboardStats, getRecentActivities, getMonthlyStats, type RecentActivity } from "@/lib/actions/admin"

// Helper function to format time ago
function formatTimeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) return 'Baru saja'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit yang lalu`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`
  return date.toLocaleDateString('id-ID')
}

// Helper function to get activity icon
function getActivityIcon(activity: RecentActivity) {
  switch (activity.type) {
    case 'user':
      return <UserPlus className="h-4 w-4 text-blue-500" />
    case 'report':
      return <FileText className="h-4 w-4 text-yellow-500" />
    case 'collection':
      return <FolderPlus className="h-4 w-4 text-green-500" />
    default:
      return <Bell className="h-4 w-4 text-gray-500" />
  }
}

export default async function AdminDashboard() {
  // Fetch real data from database
  const [dashboardStats, recentActivities, monthlyStats] = await Promise.all([
    getDashboardStats(),
    getRecentActivities(),
    getMonthlyStats()
  ])

  // Separate activities by type for tabs
  const userActivities = recentActivities.filter(activity => activity.type === 'user')
  const reportActivities = recentActivities.filter(activity => activity.type === 'report')

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <WelcomeBanner username="Administrator" role="Super Admin" />

      {/* Stats Overview */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Pengguna"
          value={dashboardStats.totalUsers.toString()}
          description="Pengguna aktif dalam sistem"
          trend={{
            value: `${Math.abs(dashboardStats.userGrowth)}%`,
            isPositive: dashboardStats.userGrowth >= 0
          }}
          icon={<Users className="h-6 w-6" />}
          variant="info"
        />
        <StatCard
          title="Koleksi Digital"
          value={dashboardStats.totalCollections.toString()}
          description="Total koleksi digital"
          trend={{
            value: `${Math.abs(dashboardStats.collectionGrowth)}%`,
            isPositive: dashboardStats.collectionGrowth >= 0
          }}
          icon={<FolderOpen className="h-6 w-6" />}
          variant="success"
        />
        <StatCard
          title="Laporan"
          value={dashboardStats.pendingReports.toString()}
          description="Menunggu verifikasi"
          trend={{
            value: Math.abs(dashboardStats.reportGrowth).toString(),
            isPositive: dashboardStats.reportGrowth <= 0
          }}
          icon={<FileText className="h-6 w-6" />}
          variant="warning"
        />
        <StatCard
          title="Pengunjung"
          value={dashboardStats.totalVisitors.toLocaleString('id-ID')}
          description="Pengunjung minggu ini"
          trend={{
            value: `${dashboardStats.visitorGrowth}%`,
            isPositive: true
          }}
          icon={<BarChart3 className="h-6 w-6" />}
          variant="primary"
        />
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Chart - Takes 4/7 of the grid */}
        <div className="lg:col-span-4">
          <OverviewChart monthlyData={monthlyStats} />
        </div>
      </div>

      {/* Activity and Notifications */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>Aktivitas sistem terkini</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4 w-full">
                <TabsTrigger value="all" className="flex-1">
                  Semua ({recentActivities.length})
                </TabsTrigger>
                <TabsTrigger value="users" className="flex-1">
                  Pengguna ({userActivities.length})
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex-1">
                  Laporan ({reportActivities.length})
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4">
                {recentActivities.length > 0 ? (
                  recentActivities.slice(0, 5).map((activity) => (
                    <ActivityItem
                      key={activity.id}
                      title={activity.title}
                      description={activity.description}
                      timestamp={formatTimeAgo(activity.timestamp)}
                      icon={getActivityIcon(activity)}
                      variant={activity.type === 'user' ? 'highlight' : 'default'}
                    />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Belum ada aktivitas terbaru
                  </p>
                )}
              </TabsContent>
              <TabsContent value="users" className="space-y-4">
                {userActivities.length > 0 ? (
                  userActivities.slice(0, 5).map((activity) => (
                    <ActivityItem
                      key={activity.id}
                      title={activity.title}
                      description={activity.description}
                      timestamp={formatTimeAgo(activity.timestamp)}
                      icon={<UserPlus className="h-4 w-4 text-blue-500" />}
                      variant="highlight"
                    />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Belum ada aktivitas pengguna terbaru
                  </p>
                )}
              </TabsContent>
              <TabsContent value="reports" className="space-y-4">
                {reportActivities.length > 0 ? (
                  reportActivities.slice(0, 5).map((activity) => (
                    <ActivityItem
                      key={activity.id}
                      title={activity.title}
                      description={activity.description}
                      timestamp={formatTimeAgo(activity.timestamp)}
                      icon={<FileText className="h-4 w-4 text-yellow-500" />}
                    />
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Belum ada aktivitas laporan terbaru
                  </p>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* System Notifications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Notifikasi Sistem</CardTitle>
              <CardDescription>Pemberitahuan dan peringatan sistem</CardDescription>
            </div>
            <div className="relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {dashboardStats.pendingReports > 0 ? Math.min(dashboardStats.pendingReports, 9) : 0}
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {dashboardStats.pendingReports > 0 && (
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/50 dark:bg-yellow-900/20">
                <div className="mb-2 flex items-center gap-2">
                  <Bell className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Laporan Menunggu</h4>
                </div>
                <p className="text-xs text-yellow-700 dark:text-yellow-400">
                  Ada {dashboardStats.pendingReports} laporan yang menunggu verifikasi dari administrator.
                </p>
                <p className="mt-2 text-xs text-yellow-600 dark:text-yellow-500">Perlu tindakan</p>
              </div>
            )}

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-900/20">
              <div className="mb-2 flex items-center gap-2">
                <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">Statistik Sistem</h4>
              </div>
              <p className="text-xs text-blue-700 dark:text-blue-400">
                Sistem memiliki {dashboardStats.totalUsers} pengguna aktif dan {dashboardStats.totalCollections} koleksi digital.
              </p>
              <p className="mt-2 text-xs text-blue-600 dark:text-blue-500">Informasi terkini</p>
            </div>

            {dashboardStats.userGrowth > 20 && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900/50 dark:bg-green-900/20">
                <div className="mb-2 flex items-center gap-2">
                  <Bell className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <h4 className="text-sm font-medium text-green-800 dark:text-green-300">Pertumbuhan Pengguna</h4>
                </div>
                <p className="text-xs text-green-700 dark:text-green-400">
                  Pertumbuhan pengguna mencapai {dashboardStats.userGrowth}% bulan ini. Sistem berkembang dengan baik!
                </p>
                <p className="mt-2 text-xs text-green-600 dark:text-green-500">Kabar baik</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
