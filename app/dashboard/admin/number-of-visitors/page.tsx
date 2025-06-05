"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Calendar, Clock, Download, TrendingUp, Eye, Activity, MessageSquare, Globe, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToastId } from "@/hooks/use-toast-id"

// Define types locally to avoid importing server-only functions
type VisitorStats = {
  totalVisitors: number
  uniqueVisitors: number
  guestbookEntries: number
  avgSessionTime: string
  visitorGrowth: number
  uniqueVisitorGrowth: number
  guestbookGrowth: number
  sessionGrowth: number
}

type TopPage = {
  page: string
  visits: number
  percentage: string
}

type RecentGuestbookEntry = {
  id: string
  name: string
  message: string
  timeAgo: string
  created_at: Date
}

type TrafficSource = {
  source: string
  visitors: number
  percentage: number
}

export default function VisitorsStatisticsPage() {
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null)
  const [topPages, setTopPages] = useState<TopPage[]>([])
  const [recentGuestbook, setRecentGuestbook] = useState<RecentGuestbookEntry[]>([])
  const [trafficSources, setTrafficSources] = useState<TrafficSource[]>([])
  const [guestbookAnalytics, setGuestbookAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [period, setPeriod] = useState("30")
  const { success, error, info } = useToastId()

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch data from API route
      const response = await fetch(`/api/admin/visitor-stats?period=${period}`)

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()

      let fallbacksUsed = 0

      // Handle visitor stats
      if (data.visitorStats) {
        setVisitorStats(data.visitorStats)
      } else {
        console.error('❌ Error fetching visitor stats:', data.errors?.visitorStats)
        fallbacksUsed++
        // Set fallback data for visitor stats
        setVisitorStats({
          totalVisitors: 1248,
          uniqueVisitors: 856,
          guestbookEntries: 0,
          avgSessionTime: "8:24",
          visitorGrowth: 12,
          uniqueVisitorGrowth: 8,
          guestbookGrowth: 0,
          sessionGrowth: 5
        })
      }

      // Handle top pages
      if (data.topPages) {
        setTopPages(data.topPages)
      } else {
        console.error('❌ Error fetching top pages:', data.errors?.topPages)
        fallbacksUsed++
        // Set fallback data for top pages
        setTopPages([
          { page: "🏠 Beranda", visits: 856, percentage: "32%" },
          { page: "🔑 Halaman Login", visits: 624, percentage: "23%" },
          { page: "📚 Koleksi Digital", visits: 512, percentage: "19%" },
          { page: "📊 Dashboard", visits: 298, percentage: "11%" },
          { page: "👤 Profil", visits: 180, percentage: "7%" }
        ])
      }

      // Handle recent guestbook
      if (data.recentGuestbook) {
        setRecentGuestbook(data.recentGuestbook)
      } else {
        console.error('❌ Error fetching recent guestbook:', data.errors?.recentGuestbook)
        fallbacksUsed++
        // Set empty array as fallback
        setRecentGuestbook([])
      }

      // Handle traffic sources
      if (data.trafficSources) {
        setTrafficSources(data.trafficSources)
      } else {
        console.error('❌ Error fetching traffic sources:', data.errors?.trafficSources)
        fallbacksUsed++
        // Set fallback data for traffic sources
        setTrafficSources([
          { source: "Direct", visitors: 450, percentage: 36 },
          { source: "Google Search", visitors: 320, percentage: 26 },
          { source: "Facebook", visitors: 280, percentage: 22 },
          { source: "Instagram", visitors: 120, percentage: 10 },
          { source: "Other", visitors: 78, percentage: 6 }
        ])
      }

      // Handle guestbook analytics
      if (data.guestbookAnalytics) {
        setGuestbookAnalytics(data.guestbookAnalytics)
      } else {
        console.error('❌ Error fetching guestbook analytics:', data.errors?.guestbookAnalytics)
        fallbacksUsed++
        // Set fallback data for analytics
        setGuestbookAnalytics({
          totalEntries: 0,
          approvedEntries: 0,
          pendingEntries: 0,
          monthlyData: []
        })
      }

      // Show notification if fallbacks were used
      if (fallbacksUsed > 0) {
        info("fallbackUsed", {
          description: `Data demo ditampilkan karena ${fallbacksUsed} sumber data tidak tersedia`
        })
      }

    } catch (err) {
      console.error('❌ Unexpected error in fetchData:', err)
      error("fetchError", {
        description: "Terjadi kesalahan tidak terduga saat memuat data"
      })

      // Set all fallback data in case of complete failure
      setVisitorStats({
        totalVisitors: 1248,
        uniqueVisitors: 856,
        guestbookEntries: 0,
        avgSessionTime: "8:24",
        visitorGrowth: 12,
        uniqueVisitorGrowth: 8,
        guestbookGrowth: 0,
        sessionGrowth: 5
      })

      setTopPages([
        { page: "🏠 Beranda", visits: 856, percentage: "32%" },
        { page: "🔑 Halaman Login", visits: 624, percentage: "23%" },
        { page: "📚 Koleksi Digital", visits: 512, percentage: "19%" }
      ])

      setTrafficSources([
        { source: "Direct", visitors: 450, percentage: 36 },
        { source: "Google Search", visitors: 320, percentage: 26 },
        { source: "Facebook", visitors: 280, percentage: 22 }
      ])

      setRecentGuestbook([])
      setGuestbookAnalytics({
        totalEntries: 0,
        approvedEntries: 0,
        pendingEntries: 0,
        monthlyData: []
      })

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [period])

  const handleExport = async () => {
    try {
      setExporting(true)

      info("exporting", {
        description: "Sedang menyiapkan file statistik pengunjung..."
      })

      // Call the export API
      const response = await fetch(`/api/admin/export/visitors?period=${period}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Gagal mengekspor data')
      }

      // Get the CSV content
      const csvContent = await response.text()

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')

      // Create download URL
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)

      // Set filename
      const now = new Date()
      const dateStr = now.toISOString().split('T')[0]
      const filename = `statistik-pengunjung-${period}-hari-${dateStr}.csv`
      link.setAttribute('download', filename)

      // Trigger download
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Clean up
      URL.revokeObjectURL(url)

      success("exportSuccess", {
        description: `File ${filename} berhasil diunduh! 📊`
      })

    } catch (err) {
      console.error('Export error:', err)
      error("exportError", {
        description: err instanceof Error ? err.message : "Terjadi kesalahan saat mengekspor data"
      })
    } finally {
      setExporting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="text-lg font-medium text-gray-600">Loading analytics... 📊</p>
        </div>
      </div>
    )
  }

  // Fallback data if visitorStats is still null
  const safeVisitorStats = visitorStats || {
    totalVisitors: 1248,
    uniqueVisitors: 856,
    guestbookEntries: 0,
    avgSessionTime: "8:24",
    visitorGrowth: 12,
    uniqueVisitorGrowth: 8,
    guestbookGrowth: 0,
    sessionGrowth: 5
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">📊 Statistik Pengunjung</h1>
            <p className="mt-2 text-white/90">Dashboard analitik sederhana dan informatif</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-48 bg-white/20 border-white/30 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">7 hari terakhir</SelectItem>
                <SelectItem value="30">30 hari terakhir</SelectItem>
                <SelectItem value="90">3 bulan terakhir</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleExport}
              disabled={exporting}
              className="bg-white/20 hover:bg-white/30 text-white border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 shadow-xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600">Total Pengunjung</p>
                <p className="text-3xl font-bold text-blue-900">{safeVisitorStats.totalVisitors.toLocaleString('id-ID')}</p>
                <Badge className={`mt-2 ${safeVisitorStats.visitorGrowth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {safeVisitorStats.visitorGrowth >= 0 ? '+' : ''}{safeVisitorStats.visitorGrowth}%
                </Badge>
              </div>
              <div className="rounded-full bg-blue-500 p-3">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600">Pengunjung Unik</p>
                <p className="text-3xl font-bold text-purple-900">{safeVisitorStats.uniqueVisitors.toLocaleString('id-ID')}</p>
                <Badge className={`mt-2 ${safeVisitorStats.uniqueVisitorGrowth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {safeVisitorStats.uniqueVisitorGrowth >= 0 ? '+' : ''}{safeVisitorStats.uniqueVisitorGrowth}%
                </Badge>
              </div>
              <div className="rounded-full bg-purple-500 p-3">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600">Buku Tamu</p>
                <p className="text-3xl font-bold text-green-900">{safeVisitorStats.guestbookEntries.toLocaleString('id-ID')}</p>
                <Badge className={`mt-2 ${safeVisitorStats.guestbookGrowth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {safeVisitorStats.guestbookGrowth >= 0 ? '+' : ''}{safeVisitorStats.guestbookGrowth}%
                </Badge>
              </div>
              <div className="rounded-full bg-green-500 p-3">
                <MessageSquare className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-50 to-orange-100 hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-600">Rata-rata Sesi</p>
                <p className="text-3xl font-bold text-orange-900">{safeVisitorStats.avgSessionTime}</p>
                <Badge className={`mt-2 ${safeVisitorStats.sessionGrowth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {safeVisitorStats.sessionGrowth >= 0 ? '+' : ''}{safeVisitorStats.sessionGrowth}%
                </Badge>
              </div>
              <div className="rounded-full bg-orange-500 p-3">
                <Clock className="h-6 w-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Traffic Sources */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-500" />
              Sumber Traffic
            </CardTitle>
            <CardDescription>Dari mana pengunjung berasal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trafficSources && trafficSources.length > 0 ? trafficSources.map((source, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-purple-500' :
                        index === 2 ? 'bg-green-500' :
                          index === 3 ? 'bg-orange-500' : 'bg-pink-500'
                      }`} />
                    <span className="text-sm font-medium">{source.source}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{source.visitors.toLocaleString('id-ID')}</div>
                    <div className="text-xs text-gray-500">{source.percentage}%</div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8">
                  <Globe className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Belum ada data sumber traffic</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Pages */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-500" />
              Halaman Populer
            </CardTitle>
            <CardDescription>Halaman yang paling banyak dikunjungi</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPages && topPages.length > 0 ? topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium text-sm">{page.page}</p>
                    <p className="text-xs text-gray-500">{page.visits.toLocaleString('id-ID')} kunjungan</p>
                  </div>
                  <Badge variant="secondary" className="font-bold">{page.percentage}</Badge>
                </div>
              )) : (
                <div className="text-center py-8">
                  <BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Belum ada data halaman populer</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-purple-500" />
              Aktivitas Terbaru
            </CardTitle>
            <CardDescription>Entri buku tamu terbaru</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentGuestbook.length > 0 ? (
                recentGuestbook.slice(0, 5).map((entry) => (
                  <div key={entry.id} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{entry.name}</p>
                        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{entry.message}</p>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">{entry.timeAgo}</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500">Belum ada entri buku tamu</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Guestbook Analytics */}
      {guestbookAnalytics && (
        <Card className="border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-indigo-500" />
              Analitik Buku Tamu
            </CardTitle>
            <CardDescription>Statistik lengkap entri buku tamu</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
                <div className="text-2xl font-bold text-blue-900">{guestbookAnalytics.totalEntries}</div>
                <div className="text-sm text-blue-600">Total Entri</div>
              </div>
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <div className="text-2xl font-bold text-green-900">{guestbookAnalytics.approvedEntries}</div>
                <div className="text-sm text-green-600">Disetujui</div>
              </div>
              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <div className="text-2xl font-bold text-yellow-900">{guestbookAnalytics.pendingEntries}</div>
                <div className="text-sm text-yellow-600">Menunggu</div>
              </div>
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                <div className="text-2xl font-bold text-purple-900">
                  {guestbookAnalytics.totalEntries > 0
                    ? Math.round((guestbookAnalytics.approvedEntries / guestbookAnalytics.totalEntries) * 100)
                    : 0
                  }%
                </div>
                <div className="text-sm text-purple-600">Tingkat Persetujuan</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
