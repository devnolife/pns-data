import { Users, FileText, FolderOpen, BarChart3, ClipboardCheck, FolderPlus, UserPlus, Bell } from "lucide-react"
import { WelcomeBanner } from "@/components/dashboard/welcome-banner"
import { StatCard } from "@/components/dashboard/stat-card"
import { ActivityItem } from "@/components/dashboard/activity-item"
import { ActionCard } from "@/components/dashboard/action-card"
import { OverviewChart } from "@/components/dashboard/overview-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <WelcomeBanner username="Administrator" role="Super Admin" />

      {/* Stats Overview */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Pengguna"
          value="128"
          description="Pengguna aktif dalam sistem"
          trend={{ value: "12%", isPositive: true }}
          icon={<Users className="h-6 w-6" />}
          variant="info"
        />
        <StatCard
          title="Koleksi Digital"
          value="56"
          description="Total koleksi digital"
          trend={{ value: "8%", isPositive: true }}
          icon={<FolderOpen className="h-6 w-6" />}
          variant="success"
        />
        <StatCard
          title="Laporan"
          value="23"
          description="Menunggu verifikasi"
          trend={{ value: "5", isPositive: false }}
          icon={<FileText className="h-6 w-6" />}
          variant="warning"
        />
        <StatCard
          title="Pengunjung"
          value="1,204"
          description="Pengunjung minggu ini"
          trend={{ value: "18%", isPositive: true }}
          icon={<BarChart3 className="h-6 w-6" />}
          variant="primary"
        />
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-7">
        {/* Chart - Takes 4/7 of the grid */}
        <div className="lg:col-span-4">
          <OverviewChart />
        </div>

        {/* Quick Actions - Takes 3/7 of the grid */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Aksi Cepat</CardTitle>
              <CardDescription>Tugas administratif umum</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <ActionCard
                title="Verifikasi Laporan"
                description="Periksa dan verifikasi laporan yang masuk"
                icon={<ClipboardCheck className="h-5 w-5" />}
                href="/dashboard/admin/verify-reports"
              />
              <ActionCard
                title="Kelola Pengguna"
                description="Tambah, edit, atau hapus pengguna"
                icon={<UserPlus className="h-5 w-5" />}
                href="/dashboard/admin/manage-users"
              />
              <ActionCard
                title="Kelola Folder"
                description="Atur struktur folder koleksi"
                icon={<FolderPlus className="h-5 w-5" />}
                href="/dashboard/admin/manage-folders"
              />
              <ActionCard
                title="Lihat Statistik"
                description="Analisis data pengunjung"
                icon={<BarChart3 className="h-5 w-5" />}
                href="/dashboard/admin/number-of-visitors"
              />
            </CardContent>
          </Card>
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
                  Semua
                </TabsTrigger>
                <TabsTrigger value="users" className="flex-1">
                  Pengguna
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex-1">
                  Laporan
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="space-y-4">
                <ActivityItem
                  title="Pengguna Baru Terdaftar"
                  description="Jane Smith (jane@example.com) membuat akun"
                  timestamp="1 jam yang lalu"
                  icon={<UserPlus className="h-4 w-4 text-blue-500" />}
                  variant="highlight"
                />
                <ActivityItem
                  title="Laporan Dikirimkan"
                  description="Laporan baru 'Anggaran Tahunan' menunggu verifikasi"
                  timestamp="3 jam yang lalu"
                  icon={<FileText className="h-4 w-4 text-yellow-500" />}
                />
                <ActivityItem
                  title="Koleksi Dibuat"
                  description="Koleksi baru 'Laporan Keuangan 2025' dibuat"
                  timestamp="Kemarin"
                  icon={<FolderPlus className="h-4 w-4 text-green-500" />}
                />
              </TabsContent>
              <TabsContent value="users" className="space-y-4">
                <ActivityItem
                  title="Pengguna Baru Terdaftar"
                  description="Jane Smith (jane@example.com) membuat akun"
                  timestamp="1 jam yang lalu"
                  icon={<UserPlus className="h-4 w-4 text-blue-500" />}
                />
                <ActivityItem
                  title="Profil Diperbarui"
                  description="John Doe memperbarui informasi profil"
                  timestamp="5 jam yang lalu"
                  icon={<Users className="h-4 w-4 text-blue-500" />}
                />
              </TabsContent>
              <TabsContent value="reports" className="space-y-4">
                <ActivityItem
                  title="Laporan Dikirimkan"
                  description="Laporan baru 'Anggaran Tahunan' menunggu verifikasi"
                  timestamp="3 jam yang lalu"
                  icon={<FileText className="h-4 w-4 text-yellow-500" />}
                />
                <ActivityItem
                  title="Laporan Diverifikasi"
                  description="Laporan 'Laporan Kuartal Q1' telah diverifikasi"
                  timestamp="Kemarin"
                  icon={<ClipboardCheck className="h-4 w-4 text-green-500" />}
                />
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
                3
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/50 dark:bg-yellow-900/20">
              <div className="mb-2 flex items-center gap-2">
                <Bell className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Pemeliharaan Sistem</h4>
              </div>
              <p className="text-xs text-yellow-700 dark:text-yellow-400">
                Sistem akan mengalami pemeliharaan pada tanggal 15 Juni 2025 pukul 02:00 - 04:00 WIB.
              </p>
              <p className="mt-2 text-xs text-yellow-600 dark:text-yellow-500">2 hari lagi</p>
            </div>

            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/50 dark:bg-blue-900/20">
              <div className="mb-2 flex items-center gap-2">
                <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-300">Pembaruan Sistem</h4>
              </div>
              <p className="text-xs text-blue-700 dark:text-blue-400">
                Versi baru 2.5.0 telah dirilis dengan fitur pencarian lanjutan dan perbaikan bug.
              </p>
              <p className="mt-2 text-xs text-blue-600 dark:text-blue-500">5 jam yang lalu</p>
            </div>

            <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/50 dark:bg-red-900/20">
              <div className="mb-2 flex items-center gap-2">
                <Bell className="h-4 w-4 text-red-600 dark:text-red-400" />
                <h4 className="text-sm font-medium text-red-800 dark:text-red-300">Peringatan Keamanan</h4>
              </div>
              <p className="text-xs text-red-700 dark:text-red-400">
                Terdeteksi 3 percobaan login yang gagal dari alamat IP tidak dikenal. Harap periksa log keamanan.
              </p>
              <p className="mt-2 text-xs text-red-600 dark:text-red-500">1 jam yang lalu</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
