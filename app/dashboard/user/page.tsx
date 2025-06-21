"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FolderOpen, Upload, User, Activity, TrendingUp, Clock, Plus, FileText, MessageSquare, CheckCircle, AlertCircle, Loader2, RefreshCw } from "lucide-react"
import { getUserDashboardStatsAction, getUserRecentActivitiesAction } from "@/lib/actions/users"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"
import { useDataSync } from "@/hooks/use-data-sync"

interface DashboardStats {
  totalCollections: number
  totalReports: number
  totalGuestbookEntries: number
  monthlyReports: number
  daysSinceLastActivity: number | null
}

interface ActivityItem {
  id: string
  title: string
  type: 'report' | 'collection' | 'guestbook'
  action: string
  status?: string
  category?: string | null
  isPublic?: boolean
  isApproved?: boolean
  createdAt: Date
  updatedAt: Date
}

export default function UserDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activities, setActivities] = useState<ActivityItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const [statsResult, activitiesResult] = await Promise.all([
        getUserDashboardStatsAction(),
        getUserRecentActivitiesAction(6)
      ])

      if (statsResult.error) {
        setError(statsResult.error)
        return
      }

      if (activitiesResult.error) {
        setError(activitiesResult.error)
        return
      }

      if (statsResult.success && statsResult.data) {
        setStats(statsResult.data.stats)
      }

      if (activitiesResult.success && activitiesResult.data) {
        setActivities(activitiesResult.data)
      }

      // Update last updated timestamp
      setLastUpdated(new Date())
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
      setError('Gagal memuat data dashboard')
    } finally {
      setIsLoading(false)
    }
  }

  // Use the data sync hook for automatic updates
  useDataSync({
    onDataUpdate: fetchDashboardData,
    refreshInterval: 30000 // 30 seconds
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  // Function to manually refresh data
  const refreshData = () => {
    fetchDashboardData()
  }

  const getActivityIcon = (type: string, action: string) => {
    switch (type) {
      case 'report':
        return <Upload className="h-4 w-4 text-green-600" />
      case 'collection':
        return <FolderOpen className="h-4 w-4 text-blue-600" />
      case 'guestbook':
        return <MessageSquare className="h-4 w-4 text-purple-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'report':
        return 'from-green-50 to-emerald-50 border-green-100'
      case 'collection':
        return 'from-blue-50 to-indigo-50 border-blue-100'
      case 'guestbook':
        return 'from-purple-50 to-violet-50 border-purple-100'
      default:
        return 'from-gray-50 to-slate-50 border-gray-100'
    }
  }

  const getStatusBadge = (activity: ActivityItem) => {
    if (activity.type === 'report' && activity.status) {
      const statusColors = {
        PENDING: 'bg-yellow-100 text-yellow-800',
        IN_PROGRESS: 'bg-blue-100 text-blue-800',
        COMPLETED: 'bg-green-100 text-green-800',
        REJECTED: 'bg-red-100 text-red-800'
      }
      return (
        <Badge className={`${statusColors[activity.status as keyof typeof statusColors]} text-xs`}>
          {activity.status}
        </Badge>
      )
    }

    if (activity.type === 'collection' && activity.isPublic !== undefined) {
      return (
        <Badge className={`${activity.isPublic ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'} text-xs`}>
          {activity.isPublic ? 'Public' : 'Private'}
        </Badge>
      )
    }

    if (activity.type === 'guestbook' && activity.isApproved !== undefined) {
      return (
        <Badge className={`${activity.isApproved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} text-xs`}>
          {activity.isApproved ? 'Approved' : 'Pending'}
        </Badge>
      )
    }

    return null
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
            Memuat Dashboard...
          </h1>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <h1 className="text-4xl font-bold tracking-tight text-red-600">
            Terjadi Kesalahan
          </h1>
          <p className="text-lg text-red-500 max-w-2xl mx-auto">
            {error}
          </p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Coba Lagi
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
          Selamat Datang Kembali!
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Kelola koleksi digital Anda, unggah laporan, dan pantau kemajuan Anda dalam satu tempat.
        </p>
        <div className="flex justify-center">
          <Button
            onClick={refreshData}
            variant="outline"
            size="sm"
            disabled={isLoading}
            className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-200 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin text-blue-500' : 'text-gray-500'}`} />
            {isLoading ? 'Memperbarui...' : 'Perbarui Data'}
          </Button>
        </div>
        {lastUpdated && (
          <p className="text-xs text-gray-500 text-center mt-2">
            Terakhir diperbarui: {formatDistanceToNow(lastUpdated, { addSuffix: true, locale: id })}
          </p>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Koleksi</p>
                <p className="text-3xl font-bold">{stats?.totalCollections || 0}</p>
              </div>
              <FolderOpen className="h-8 w-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Laporan Diunggah</p>
                <p className="text-3xl font-bold">{stats?.totalReports || 0}</p>
              </div>
              <Upload className="h-8 w-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Bulan Ini</p>
                <p className="text-3xl font-bold">{stats?.monthlyReports || 0}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-br from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Aktivitas Terakhir</p>
                <p className="text-xl font-bold">
                  {stats?.daysSinceLastActivity !== null && stats?.daysSinceLastActivity !== undefined
                    ? `${stats.daysSinceLastActivity} hari lalu`
                    : 'Belum ada'
                  }
                </p>
              </div>
              <Clock className="h-8 w-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Aksi Cepat</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:scale-105">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-200 transition-colors">
                  <FolderOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle className="text-xl text-gray-900">Koleksi Digital</CardTitle>
                  <CardDescription className="text-gray-600">Jelajahi dan atur file Anda</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-500 mb-4">Akses semua koleksi digital Anda dalam satu ruang yang terorganisir.</p>
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                <Link href="/dashboard/user/digital-collection" className="flex items-center gap-2">
                  <FolderOpen className="h-4 w-4" />
                  Lihat Koleksi
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
                  <CardTitle className="text-xl text-gray-900">Unggah Laporan</CardTitle>
                  <CardDescription className="text-gray-600">Tambahkan dokumen baru dengan cepat</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-500 mb-4">Unggah dan kategorikan laporan Anda dengan mudah.</p>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg">
                <Link href="/dashboard/user/upload-report" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Unggah Sekarang
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
                  <CardTitle className="text-xl text-gray-900">Pengaturan Profil</CardTitle>
                  <CardDescription className="text-gray-600">Sesuaikan pengalaman Anda</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-500 mb-4">Kelola akun dan preferensi pribadi Anda.</p>
              <Button asChild variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 shadow-lg">
                <Link href="/dashboard/user/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Edit Profil
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Aktivitas Terbaru</h2>
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-xl">Pembaruan Terbaru</CardTitle>
            </div>
            <CardDescription>Pantau tindakan dan kemajuan terbaru Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.length === 0 ? (
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">Belum ada aktivitas</p>
                  <p className="text-sm text-gray-400 mt-1">Mulai dengan membuat koleksi atau mengunggah laporan</p>
                </div>
              ) : (
                activities.map((activity) => (
                  <div
                    key={activity.id}
                    className={`flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r ${getActivityColor(activity.type)} border`}
                  >
                    <div className="p-2 bg-white rounded-lg shadow-sm">
                      {getActivityIcon(activity.type, activity.action)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold text-gray-900 line-clamp-1">{activity.title}</p>
                          <p className="text-sm text-gray-600">
                            {activity.type === 'report' && 'Laporan berhasil diunggah'}
                            {activity.type === 'collection' && 'Koleksi baru dibuat'}
                            {activity.type === 'guestbook' && 'Pesan buku tamu dikirim'}
                            {activity.category && ` • ${activity.category}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(activity)}
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full shadow-sm">
                      {formatDistanceToNow(new Date(activity.updatedAt), {
                        addSuffix: true,
                        locale: id
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
