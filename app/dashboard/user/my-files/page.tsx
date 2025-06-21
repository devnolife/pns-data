"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import {
  FileText,
  Download,
  Search,
  Filter,
  Trash2,
  Eye,
  Calendar,
  FolderOpen,
  Users,
  HardDrive,
  Sparkles,
  Star,
  Zap
} from "lucide-react"
import { getUserUploadedFilesAction, deleteUploadedFileAction, getUserFileStatsAction } from "@/lib/actions/reports"
import { useDataSync } from "@/hooks/use-data-sync"

interface UploadedFile {
  id: string
  filename: string
  original_name: string
  file_path: string
  file_size: number
  mime_type: string
  category: string | null
  year: string | null
  batch: string | null
  created_at: Date
  downloadUrl: string
  report?: {
    id: string
    title: string
    status: string
  } | null
}

interface FileStats {
  totalFiles: number
  totalSize: number
  filesByCategory: { category: string | null; count: number }[]
  filesByYear: { year: string | null; count: number }[]
  recentFiles: any[]
}

export default function MyFilesPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [files, setFiles] = useState<UploadedFile[]>([])
  const [stats, setStats] = useState<FileStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [yearFilter, setYearFilter] = useState("all")
  const [batchFilter, setBatchFilter] = useState("all")

  // Use the data sync hook
  const { notifyDataUpdate } = useDataSync()

  useEffect(() => {
    if (isAuthenticated) {
      loadFiles()
      loadStats()
    }
  }, [isAuthenticated, categoryFilter, yearFilter, batchFilter])

  // Check authentication after hooks
  if (!isAuthenticated) {
    router.push("/login")
    return null
  }

  const loadFiles = async () => {
    try {
      const result = await getUserUploadedFilesAction({
        category: categoryFilter && categoryFilter !== "all" ? categoryFilter : undefined,
        year: yearFilter && yearFilter !== "all" ? yearFilter : undefined,
        batch: batchFilter && batchFilter !== "all" ? batchFilter : undefined,
        limit: 100
      })

      if (result.success && result.data) {
        setFiles(result.data)
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Load files error:', error)
      toast({
        title: "Error",
        description: "Gagal memuat file",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const result = await getUserFileStatsAction()
      if (result.success && result.data) {
        setStats(result.data)
      }
    } catch (error) {
      console.error('Load stats error:', error)
    }
  }

  const handleDeleteFile = async (fileId: string, fileName: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus file "${fileName}"?`)) {
      return
    }

    try {
      const result = await deleteUploadedFileAction(fileId)
      if (result.success) {
        toast({
          title: "Berhasil",
          description: "File berhasil dihapus"
        })

        // Reload local data
        loadFiles()
        loadStats()

        // Notify other pages about data update
        notifyDataUpdate()
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error('Delete file error:', error)
      toast({
        title: "Error",
        description: "Gagal menghapus file",
        variant: "destructive"
      })
    }
  }

  const handleDownload = (file: UploadedFile) => {
    const link = document.createElement('a')
    link.href = file.downloadUrl
    link.download = file.original_name
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('pdf')) return '📄'
    if (mimeType.includes('word') || mimeType.includes('document')) return '📝'
    if (mimeType.includes('sheet') || mimeType.includes('excel')) return '📊'
    if (mimeType.includes('presentation') || mimeType.includes('powerpoint')) return '📋'
    if (mimeType.includes('zip') || mimeType.includes('rar')) return '🗜️'
    return '📁'
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status?: string) => {
    if (!status) return null

    const statusConfig = {
      'COMPLETED': { label: 'Selesai', variant: 'default' as const },
      'IN_PROGRESS': { label: 'Proses', variant: 'secondary' as const },
      'PENDING': { label: 'Pending', variant: 'outline' as const },
      'REJECTED': { label: 'Ditolak', variant: 'destructive' as const }
    }

    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: 'outline' as const }
    return <Badge variant={config.variant} className="text-xs">{config.label}</Badge>
  }

  const filteredFiles = files.filter(file =>
    file.original_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (file.category && file.category.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 h-20 w-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed top-40 right-20 h-16 w-16 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed bottom-40 left-20 h-24 w-24 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full animate-pulse blur-xl" />

      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full mb-4 shadow-lg border border-white/20">
          <HardDrive className="h-4 w-4 text-purple-500 animate-pulse" />
          <span className="text-purple-700 font-semibold text-sm">File Manager</span>
          <Zap className="h-4 w-4 text-pink-500 animate-bounce" />
        </div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          File Saya ✨
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Kelola dan akses semua file yang telah Anda unggah! 🚀
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white/70 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalFiles}</p>
                    <p className="text-sm text-gray-600">Total File</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
                    <HardDrive className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{formatFileSize(stats.totalSize)}</p>
                    <p className="text-sm text-gray-600">Total Ukuran</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
                    <FolderOpen className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{stats.filesByCategory.length}</p>
                    <p className="text-sm text-gray-600">Kategori</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{stats.filesByYear.length}</p>
                    <p className="text-sm text-gray-600">Tahun</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Filters and Search */}
        <Card className="bg-white/70 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <Filter className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl font-bold mb-1">Filter & Pencarian 🔍</CardTitle>
                <CardDescription className="text-indigo-100">
                  Temukan file yang Anda cari dengan mudah! 💫
                </CardDescription>
              </div>
              <div className="flex gap-1">
                <Star className="h-5 w-5 text-yellow-300 animate-pulse" />
                <Sparkles className="h-5 w-5 text-pink-300 animate-bounce" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari file..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md"
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md">
                  <SelectValue placeholder="Semua Kategori" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 backdrop-blur-md border-white/20 rounded-xl">
                  <SelectItem value="all">Semua Kategori</SelectItem>
                  <SelectItem value="PKN">PKN</SelectItem>
                  <SelectItem value="PKP">PKP</SelectItem>
                  <SelectItem value="PKA">PKA</SelectItem>
                  <SelectItem value="Latsar CPNS">Latsar CPNS</SelectItem>
                </SelectContent>
              </Select>

              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md">
                  <SelectValue placeholder="Semua Tahun" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 backdrop-blur-md border-white/20 rounded-xl">
                  <SelectItem value="all">Semua Tahun</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>

              <Select value={batchFilter} onValueChange={setBatchFilter}>
                <SelectTrigger className="bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md">
                  <SelectValue placeholder="Semua Angkatan" />
                </SelectTrigger>
                <SelectContent className="bg-white/90 backdrop-blur-md border-white/20 rounded-xl">
                  <SelectItem value="all">Semua Angkatan</SelectItem>
                  <SelectItem value="I">Angkatan I</SelectItem>
                  <SelectItem value="II">Angkatan II</SelectItem>
                  <SelectItem value="III">Angkatan III</SelectItem>
                  <SelectItem value="IV">Angkatan IV</SelectItem>
                  <SelectItem value="V">Angkatan V</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Files List */}
        <Card className="bg-white/70 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <FileText className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl font-bold mb-1">Daftar File 📁</CardTitle>
                <CardDescription className="text-emerald-100">
                  {filteredFiles.length} file ditemukan dari total {files.length} file 🎯
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Memuat file...</p>
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="p-8 text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Tidak ada file</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery || (categoryFilter && categoryFilter !== "all") || (yearFilter && yearFilter !== "all") || (batchFilter && batchFilter !== "all")
                    ? "Tidak ada file yang sesuai dengan filter Anda"
                    : "Anda belum mengunggah file apapun"
                  }
                </p>
                <Button
                  onClick={() => router.push("/dashboard/user/upload-report")}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl px-6 py-2"
                >
                  Unggah File Pertama 🚀
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200/50">
                {filteredFiles.map((file) => (
                  <div key={file.id} className="p-6 hover:bg-white/30 transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="text-3xl">{getFileIcon(file.mime_type)}</div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 truncate">{file.original_name}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                            <span>{formatFileSize(file.file_size)}</span>
                            <span>•</span>
                            <span>{formatDate(file.created_at)}</span>
                            {file.category && (
                              <>
                                <span>•</span>
                                <Badge variant="secondary" className="text-xs">{file.category}</Badge>
                              </>
                            )}
                            {file.year && (
                              <>
                                <span>•</span>
                                <Badge variant="outline" className="text-xs">{file.year}</Badge>
                              </>
                            )}
                            {file.batch && (
                              <>
                                <span>•</span>
                                <Badge variant="outline" className="text-xs">Angkatan {file.batch}</Badge>
                              </>
                            )}
                          </div>
                          {file.report && (
                            <div className="flex items-center gap-2 mt-2">
                              <span className="text-xs text-gray-500">Laporan:</span>
                              <span className="text-xs font-medium text-gray-700">{file.report.title}</span>
                              {getStatusBadge(file.report.status)}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDownload(file)}
                          className="h-9 w-9 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                          title="Download file"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => router.push(`/dashboard/user/my-files/${file.id}`)}
                          className="h-9 w-9 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all duration-200"
                          title="Lihat file"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteFile(file.id, file.original_name)}
                          className="h-9 w-9 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-200"
                          title="Hapus file"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
