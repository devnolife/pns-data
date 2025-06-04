"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Users, Calendar, Clock, Download, TrendingUp, Eye, Activity, MessageSquare, Globe, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  getVisitorStats,
  getTopPages,
  getRecentGuestbookEntries,
  getTrafficSources,
  getGuestbookAnalytics,
  type VisitorStats,
  type TopPage,
  type RecentGuestbookEntry,
  type TrafficSource
} from "@/lib/actions/admin"

export default function VisitorsStatisticsPage() {
  const [visitorStats, setVisitorStats] = useState<VisitorStats | null>(null)
  const [topPages, setTopPages] = useState<TopPage[]>([])
  const [recentGuestbook, setRecentGuestbook] = useState<RecentGuestbookEntry[]>([])
  const [trafficSources, setTrafficSources] = useState<TrafficSource[]>([])
  const [guestbookAnalytics, setGuestbookAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [period, setPeriod] = useState("30")

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [
          visitorData,
          pagesData,
          guestbookData,
          trafficData,
          analyticsData
        ] = await Promise.all([
          getVisitorStats(),
          getTopPages(),
          getRecentGuestbookEntries(),
          getTrafficSources(),
          getGuestbookAnalytics()
        ])

        setVisitorStats(visitorData)
        setTopPages(pagesData)
        setRecentGuestbook(guestbookData)
        setTrafficSources(trafficData)
        setGuestbookAnalytics(analyticsData)
      } catch (error) {
        console.error('Error fetching visitor data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [period])

  if (loading || !visitorStats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="text-lg font-medium text-gray-600">Loading analytics... 📊</p>
        </div>
      </div>
    )
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
            <Button className="bg-white/20 hover:bg-white/30 text-white border-white/30">
              <Download className="mr-2 h-4 w-4" />
              Export
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
                <p className="text-3xl font-bold text-blue-900">{visitorStats.totalVisitors.toLocaleString('id-ID')}</p>
                <Badge className={`mt-2 ${visitorStats.visitorGrowth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {visitorStats.visitorGrowth >= 0 ? '+' : ''}{visitorStats.visitorGrowth}%
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
                <p className="text-3xl font-bold text-purple-900">{visitorStats.uniqueVisitors.toLocaleString('id-ID')}</p>
                <Badge className={`mt-2 ${visitorStats.uniqueVisitorGrowth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {visitorStats.uniqueVisitorGrowth >= 0 ? '+' : ''}{visitorStats.uniqueVisitorGrowth}%
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
                <p className="text-3xl font-bold text-green-900">{visitorStats.guestbookEntries.toLocaleString('id-ID')}</p>
                <Badge className={`mt-2 ${visitorStats.guestbookGrowth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {visitorStats.guestbookGrowth >= 0 ? '+' : ''}{visitorStats.guestbookGrowth}%
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
                <p className="text-3xl font-bold text-orange-900">{visitorStats.avgSessionTime}</p>
                <Badge className={`mt-2 ${visitorStats.sessionGrowth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {visitorStats.sessionGrowth >= 0 ? '+' : ''}{visitorStats.sessionGrowth}%
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
              {trafficSources.map((source, index) => (
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
              ))}
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
              {topPages.map((page, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium text-sm">{page.page}</p>
                    <p className="text-xs text-gray-500">{page.visits.toLocaleString('id-ID')} kunjungan</p>
                  </div>
                  <Badge variant="secondary" className="font-bold">{page.percentage}</Badge>
                </div>
              ))}
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
