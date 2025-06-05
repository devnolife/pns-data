"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToastId } from "@/hooks/use-toast-id"
import { Search, Filter, Eye, CheckCircle, XCircle, FileText, Download, File } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ReportFile = {
  id: string
  filename: string
  original_name: string
  file_size: number
  mime_type: string
  file_path: string
}

type ReportAuthor = {
  id: string
  username: string
  name: string | null
  email: string
  training: string | null
  angkatan: string | null
}

type Report = {
  id: string
  title: string
  description: string | null
  content: string
  status: string
  category: string | null
  priority: string
  author_id: string
  created_at: Date
  updated_at: Date
  users_reports_author_idTousers: ReportAuthor
  files: ReportFile[]
}

export default function VerifyReportsPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const { success, error } = useToastId()

  const [searchTerm, setSearchTerm] = useState("")
  const [reports, setReports] = useState<Report[]>([])
  const [filteredReports, setFilteredReports] = useState<Report[]>([])
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("pending")
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }

    if (isAuthenticated && user?.role !== "ADMIN") {
      router.push("/dashboard/user")
    }
  }, [isAuthenticated, isLoading, router, user])

  useEffect(() => {
    if (isAuthenticated && user?.role === "ADMIN") {
      fetchReports()
    }
  }, [isAuthenticated, user, statusFilter, categoryFilter, searchTerm])

  const fetchReports = async () => {
    try {
      setLoading(true)

      // First get database statistics via API
      const dbStatsResponse = await fetch('/api/admin/reports?debug=true')
      const dbStats = await dbStatsResponse.json()
      setDebugInfo(dbStats)

      if (!dbStats.success) {
        error("fetchReports", { description: `Database error: ${dbStats.error}` })
        return
      }

      if (!dbStats.stats || dbStats.stats.reportCount === 0) {
        setReports([])
        setFilteredReports([])
        return
      }
      // Build query parameters
      const params = new URLSearchParams({
        page: '1',
        limit: '50'
      })

      if (statusFilter !== "all") {
        params.append('status', statusFilter)
      }

      if (categoryFilter !== "all") {
        params.append('category', categoryFilter)
      }

      if (searchTerm) {
        params.append('search', searchTerm)
      }

      // Fetch reports via API
      const reportsResponse = await fetch(`/api/admin/reports?${params.toString()}`)
      const result = await reportsResponse.json()


      if (result.success) {
        setReports(result.reports)
        setFilteredReports(result.reports)
      } else {
        error("fetchReports", { description: `Gagal mengambil data laporan: ${result.error}` })
      }
    } catch (err) {
      console.error("Error fetching reports:", err)
      const errorMessage = err instanceof Error ? err.message : 'Unknown error'
      error("fetchReports", { description: `Gagal mengambil data laporan: ${errorMessage}` })
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyReport = async (reportId: string) => {
    try {
      setActionLoading(true)

      const response = await fetch('/api/admin/reports/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportId }),
      })

      const result = await response.json()

      if (result.success) {
        // Update local state
        setReports((prev) =>
          prev.map((report) =>
            report.id === reportId
              ? { ...report, status: "COMPLETED", updated_at: new Date() }
              : report
          )
        )
        setFilteredReports((prev) =>
          prev.map((report) =>
            report.id === reportId
              ? { ...report, status: "COMPLETED", updated_at: new Date() }
              : report
          )
        )

        success("reportVerify", { description: "Laporan telah diverifikasi dan sekarang tersedia dalam sistem." })
        setViewDialogOpen(false)
      } else {
        error("reportVerify", { description: `Gagal memverifikasi laporan: ${result.error}` })
      }
    } catch (err) {
      console.error("Error verifying report:", err)
      error("reportVerify", { description: "Gagal memverifikasi laporan" })
    } finally {
      setActionLoading(false)
    }
  }

  const handleRejectReport = async (reportId: string) => {
    if (!feedback.trim()) {
      error("reportReject", { description: "Harap berikan feedback untuk penolakan" })
      return
    }

    try {
      setActionLoading(true)

      const response = await fetch('/api/admin/reports/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reportId, feedback }),
      })

      const result = await response.json()

      if (result.success) {
        // Update local state
        setReports((prev) =>
          prev.map((report) =>
            report.id === reportId
              ? { ...report, status: "REJECTED", updated_at: new Date() }
              : report
          )
        )
        setFilteredReports((prev) =>
          prev.map((report) =>
            report.id === reportId
              ? { ...report, status: "REJECTED", updated_at: new Date() }
              : report
          )
        )

        success("reportReject", { description: "Laporan telah ditolak dan pengguna akan diberitahu." })
        setViewDialogOpen(false)
        setFeedback("")
      } else {
        error("reportReject", { description: `Gagal menolak laporan: ${result.error}` })
      }
    } catch (err) {
      console.error("Error rejecting report:", err)
      error("reportReject", { description: "Gagal menolak laporan" })
    } finally {
      setActionLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return <Badge variant="outline">Pending</Badge>
      case "COMPLETED":
        return <Badge variant="secondary">Verified</Badge>
      case "REJECTED":
        return <Badge variant="destructive">Rejected</Badge>
      case "IN_PROGRESS":
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryBadge = (category: string | null) => {
    if (!category) return <Badge className="bg-gray-100 text-gray-800">No Category</Badge>

    const categoryLower = category.toLowerCase()
    if (categoryLower.includes("cpns") || categoryLower.includes("latsar")) {
      return <Badge className="bg-blue-100 text-blue-800">CPNS/Latsar</Badge>
    } else if (categoryLower.includes("pkp")) {
      return <Badge className="bg-green-100 text-green-800">PKP</Badge>
    } else if (categoryLower.includes("pka")) {
      return <Badge className="bg-purple-100 text-purple-800">PKA</Badge>
    } else if (categoryLower.includes("pkn")) {
      return <Badge className="bg-orange-100 text-orange-800">PKN</Badge>
    }
    return <Badge className="bg-gray-100 text-gray-800">{category}</Badge>
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileTypeFromMime = (mimeType: string) => {
    if (mimeType.includes('pdf')) return 'PDF'
    if (mimeType.includes('word') || mimeType.includes('document')) return 'DOC'
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'XLS'
    if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return 'PPT'
    if (mimeType.includes('image')) return 'IMG'
    return 'FILE'
  }

  if (isLoading || !isAuthenticated || user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with gradient background */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-8 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">✅ Verifikasi Laporan</h1>
            <p className="mt-2 text-white/90">Kelola dan verifikasi laporan yang masuk ke sistem</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
              <FileText className="h-8 w-8 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Cari laporan berdasarkan judul atau penulis..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Kategori</SelectItem>
                <SelectItem value="cpns">CPNS/Latsar</SelectItem>
                <SelectItem value="pkp">PKP</SelectItem>
                <SelectItem value="pka">PKA</SelectItem>
                <SelectItem value="pkn">PKN</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="completed">Verified</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="pending" className="space-y-6" onValueChange={(value) => setStatusFilter(value)}>
          <TabsList className="rounded-xl bg-muted/50 p-1">
            <TabsTrigger value="pending" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white">
              ⏳ Pending
            </TabsTrigger>
            <TabsTrigger value="completed" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white">
              ✅ Verified
            </TabsTrigger>
            <TabsTrigger value="rejected" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-pink-500 data-[state=active]:text-white">
              ❌ Rejected
            </TabsTrigger>
            <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white">
              📋 Semua Laporan
            </TabsTrigger>
          </TabsList>

          <TabsContent value={statusFilter}>
            <Card className="border-0 shadow-lg shadow-blue-100/50 dark:shadow-blue-900/20">
              <CardHeader>
                <CardTitle>
                  {statusFilter === "all"
                    ? "Semua Laporan"
                    : statusFilter === "pending"
                      ? "Laporan Pending"
                      : statusFilter === "completed"
                        ? "Laporan Terverifikasi"
                        : statusFilter === "rejected"
                          ? "Laporan Ditolak"
                          : "Laporan In Progress"}
                </CardTitle>
                <CardDescription>
                  Menampilkan {filteredReports.length} laporan {statusFilter === "all" ? "total" : statusFilter}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-4">Judul</th>
                          <th className="text-left p-4">Kategori</th>
                          <th className="text-left p-4">Penulis</th>
                          <th className="text-left p-4">Tanggal</th>
                          <th className="text-left p-4">Status</th>
                          <th className="text-right p-4">Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredReports.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-4 text-center text-gray-500">
                              Tidak ada laporan yang ditemukan sesuai kriteria.
                            </td>
                          </tr>
                        ) : (
                          filteredReports.map((report) => (
                            <tr key={report.id} className="border-b hover:bg-gray-50">
                              <td className="p-4">
                                <div className="flex items-center">
                                  <FileText className="h-5 w-5 text-blue-500 mr-2" />
                                  <div>
                                    <p className="font-medium">{report.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {report.files.length} file{report.files.length !== 1 ? "s" : ""}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="p-4">{getCategoryBadge(report.category)}</td>
                              <td className="p-4">
                                <div>
                                  <p className="font-medium">{report.users_reports_author_idTousers.name || report.users_reports_author_idTousers.username}</p>
                                  <p className="text-xs text-gray-500">{report.users_reports_author_idTousers.email}</p>
                                </div>
                              </td>
                              <td className="p-4">{new Date(report.created_at).toLocaleDateString('id-ID')}</td>
                              <td className="p-4">{getStatusBadge(report.status)}</td>
                              <td className="p-4 text-right">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedReport(report)
                                    setViewDialogOpen(true)
                                    setFeedback("")
                                  }}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  Lihat
                                </Button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {selectedReport && (
          <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto fixed top-4 left-1 transform-none w-[95vw] sm:w-full">
              <DialogHeader>
                <DialogTitle>{selectedReport.title}</DialogTitle>
                <DialogDescription>
                  Dikirim oleh {selectedReport.users_reports_author_idTousers.name || selectedReport.users_reports_author_idTousers.username} pada {new Date(selectedReport.created_at).toLocaleDateString('id-ID')}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Kategori</h3>
                    <div>{getCategoryBadge(selectedReport.category)}</div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
                    <div>{getStatusBadge(selectedReport.status)}</div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Penulis</h3>
                  <div className="text-sm">
                    <p><strong>Nama:</strong> {selectedReport.users_reports_author_idTousers.name || selectedReport.users_reports_author_idTousers.username}</p>
                    <p><strong>Email:</strong> {selectedReport.users_reports_author_idTousers.email}</p>
                    {selectedReport.users_reports_author_idTousers.training && (
                      <p><strong>Pelatihan:</strong> {selectedReport.users_reports_author_idTousers.training}</p>
                    )}
                    {selectedReport.users_reports_author_idTousers.angkatan && (
                      <p><strong>Angkatan:</strong> {selectedReport.users_reports_author_idTousers.angkatan}</p>
                    )}
                  </div>
                </div>

                {selectedReport.description && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Deskripsi</h3>
                    <p className="text-sm whitespace-pre-wrap">{selectedReport.description}</p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Konten</h3>
                  <div className="text-sm bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto prose prose-sm max-w-none">
                    <div
                      dangerouslySetInnerHTML={{ __html: selectedReport.content }}
                      className="[&>h1]:text-lg [&>h1]:font-bold [&>h1]:mb-2 [&>h1]:text-gray-900 [&>h2]:text-base [&>h2]:font-semibold [&>h2]:mb-2 [&>h2]:text-gray-800 [&>h3]:text-sm [&>h3]:font-medium [&>h3]:mb-1 [&>h3]:text-gray-700 [&>p]:mb-2 [&>p]:text-gray-600 [&>ul]:list-disc [&>ul]:ml-4 [&>ul]:mb-2 [&>ol]:list-decimal [&>ol]:ml-4 [&>ol]:mb-2 [&>li]:mb-1 [&>strong]:font-semibold [&>em]:italic [&>blockquote]:border-l-4 [&>blockquote]:border-gray-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-gray-600"
                    />
                  </div>
                </div>

                {selectedReport.files.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">File Lampiran</h3>
                    <div className="border rounded-lg divide-y">
                      {selectedReport.files.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3">
                          <div className="flex items-center">
                            <File className="h-5 w-5 text-blue-500 mr-2" />
                            <div>
                              <p className="font-medium text-sm">{file.original_name}</p>
                              <p className="text-xs text-gray-500">
                                {formatFileSize(file.file_size)} • {getFileTypeFromMime(file.mime_type)}
                              </p>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" asChild>
                            <a href={`/${file.file_path}`} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedReport.status === "PENDING" && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Feedback (jika ditolak)</h3>
                    <Textarea
                      placeholder="Berikan feedback kepada pengguna jika Anda menolak laporan ini..."
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      rows={3}
                    />
                  </div>
                )}
              </div>

              <DialogFooter className="flex justify-between">
                {selectedReport.status === "PENDING" ? (
                  <>
                    <Button
                      variant="destructive"
                      onClick={() => handleRejectReport(selectedReport.id)}
                      className="flex-1 mr-2"
                      disabled={actionLoading}
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      {actionLoading ? "Menolak..." : "Tolak"}
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => handleVerifyReport(selectedReport.id)}
                      className="flex-1 ml-2"
                      disabled={actionLoading}
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      {actionLoading ? "Memverifikasi..." : "Verifikasi"}
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                    Tutup
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
