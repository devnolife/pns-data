"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import {
  FolderPlus,
  Search,
  MoreVertical,
  Edit2,
  Trash2,
  Archive,
  FolderOpen,
  Loader2,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  BarChart3,
  Sparkles,
  Star,
  Zap,
  Rocket,
  Filter,
  Plus,
  Settings,
  TrendingUp,
  Activity
} from "lucide-react"
import Link from "next/link"
import {
  createReportFolderAction,
  getReportFoldersAction,
  updateReportFolderAction,
  deleteReportFolderAction,
  getReportFolderStatsAction,
  type ReportFolderData
} from "@/lib/actions/report-folders"

interface CreateFolderData {
  reportType: string
  year: string
  batch: string
  description: string
}

interface FolderStats {
  totalFolders: number
  activeFolders: number
  inactiveFolders: number
  foldersByYear: { year: string; count: number }[]
}

export default function ReportFoldersPage() {
  const [folders, setFolders] = useState<ReportFolderData[]>([])
  const [stats, setStats] = useState<FolderStats | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState<ReportFolderData | null>(null)
  const [formLoading, setFormLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const [createFormData, setCreateFormData] = useState<CreateFolderData>({
    reportType: "",
    year: "",
    batch: "",
    description: ""
  })

  const [editFormData, setEditFormData] = useState({
    description: "",
    is_active: true
  })

  const { toast } = useToast()

  // Generate year options (current year and next 2 years, plus previous 8 years)
  const currentYear = new Date().getFullYear()
  const yearOptions = Array.from({ length: 11 }, (_, i) => (currentYear + 2 - i).toString())

  // Batch options
  const batchOptions = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"]

  const loadFolders = async () => {
    try {
      const result = await getReportFoldersAction(1, 50, searchQuery)
      if (result.success) {
        setFolders(result.data as any)
      } else {
        toast({
          title: "❌ Waduh!",
          description: result.error,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error loading folders:", error)
      toast({
        title: "❌ Ada yang salah nih",
        description: "Gagal memuat data folder",
        variant: "destructive"
      })
    }
  }

  const loadStats = async () => {
    try {
      const result = await getReportFolderStatsAction()
      if (result.success) {
        setStats(result.data as any)
      }
    } catch (error) {
      console.error("Error loading stats:", error)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([loadFolders(), loadStats()])
      setLoading(false)
    }
    loadData()
  }, [searchQuery])

  const handleCreateFolder = async () => {
    if (!createFormData.reportType || !createFormData.year || !createFormData.batch) {
      toast({
        title: "⚠️ Tunggu dulu!",
        description: "Mohon lengkapi semua field yang wajib diisi ya bestie! 💫",
        variant: "destructive"
      })
      return
    }

    setFormLoading(true)
    try {
      const result = await createReportFolderAction(createFormData)

      if (result.success) {
        toast({
          title: "🎉 Yeay! Berhasil!",
          description: `${result.message} ✨`,
          duration: 4000
        })
        setIsCreateDialogOpen(false)
        setCreateFormData({
          reportType: "",
          year: "",
          batch: "",
          description: ""
        })
        await loadFolders()
        await loadStats()
      } else {
        toast({
          title: "😅 Waduh!",
          description: result.error,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Create folder error:", error)
      toast({
        title: "💥 Error!",
        description: "Gagal membuat folder, coba lagi ya!",
        variant: "destructive"
      })
    } finally {
      setFormLoading(false)
    }
  }

  const handleEditFolder = async () => {
    if (!selectedFolder) return

    setFormLoading(true)
    try {
      const result = await updateReportFolderAction({
        id: selectedFolder.id,
        description: editFormData.description,
        is_active: editFormData.is_active
      })

      if (result.success) {
        toast({
          title: "🔥 Berhasil diupdate!",
          description: `${result.message} 🚀`,
          duration: 4000
        })
        setIsEditDialogOpen(false)
        setSelectedFolder(null)
        await loadFolders()
        await loadStats()
      } else {
        toast({
          title: "😬 Hmm...",
          description: result.error,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Edit folder error:", error)
      toast({
        title: "💔 Error!",
        description: "Gagal memperbarui folder",
        variant: "destructive"
      })
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteFolder = async (folder: ReportFolderData) => {
    if (!confirm(`🗑️ Yakin mau hapus folder ${folder.year} - Angkatan ${folder.batch}? Aksi ini gak bisa dibatalin lho bestie! 💀`)) {
      return
    }

    setDeleteLoading(true)
    try {
      const result = await deleteReportFolderAction(folder.id)

      if (result.success) {
        toast({
          title: "🗑️ Berhasil dihapus!",
          description: `${result.message} 👋`,
          duration: 4000
        })
        await loadFolders()
        await loadStats()
      } else {
        toast({
          title: "😵 Gagal!",
          description: result.error,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Delete folder error:", error)
      toast({
        title: "💥 Error!",
        description: "Gagal menghapus folder",
        variant: "destructive"
      })
    } finally {
      setDeleteLoading(false)
    }
  }

  const openEditDialog = (folder: ReportFolderData) => {
    setSelectedFolder(folder)
    setEditFormData({
      description: folder.description || "",
      is_active: folder.is_active
    })
    setIsEditDialogOpen(true)
  }

  const filteredFolders = folders.filter(folder =>
    folder.year.toLowerCase().includes(searchQuery.toLowerCase()) ||
    folder.batch.toLowerCase().includes(searchQuery.toLowerCase()) ||
    folder.description?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
        {/* Floating decorative elements */}
        <div className="fixed top-20 left-10 h-20 w-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse blur-xl" />
        <div className="fixed top-40 right-20 h-16 w-16 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse blur-xl" />
        <div className="fixed bottom-40 left-20 h-24 w-24 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full animate-pulse blur-xl" />

        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-purple-500" />
            <p className="text-gray-600 font-medium">Memuat folder keren... ✨</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 h-20 w-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed top-40 right-20 h-16 w-16 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed bottom-40 left-20 h-24 w-24 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full animate-pulse blur-xl" />

      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full mb-4 shadow-lg border border-white/20">
          <Archive className="h-4 w-4 text-purple-500 animate-pulse" />
          <span className="text-purple-700 font-semibold text-sm">Pengelola Folder</span>
          <Zap className="h-4 w-4 text-pink-500 animate-bounce" />
        </div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Folder Laporan ✨
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Kelola folder laporan dengan gaya! Buat, edit, dan atur dengan mudah 🚀
        </p>
      </div>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-white/70 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white">
                    <Archive className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalFolders}</p>
                    <p className="text-sm text-gray-600">Total Folder</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{stats.activeFolders}</p>
                    <p className="text-sm text-gray-600">Folder Aktif</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white">
                    <XCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{stats.inactiveFolders}</p>
                    <p className="text-sm text-gray-600">Folder Nonaktif</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden hover:scale-105 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{stats.foldersByYear.length}</p>
                    <p className="text-sm text-gray-600">Tahun Aktif</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Controls */}
        <Card className="bg-white/70 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Search className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-xl font-bold mb-1">Cari & Buat 🔍</CardTitle>
                  <CardDescription className="text-indigo-100">
                    Temukan folder atau buat yang baru! ✨
                  </CardDescription>
                </div>
              </div>
              <div className="flex gap-1">
                <Star className="h-5 w-5 text-yellow-300 animate-pulse" />
                <Sparkles className="h-5 w-5 text-pink-300 animate-bounce" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Cari folder berdasarkan tahun, angkatan, atau deskripsi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md focus:shadow-lg transition-all duration-300"
                />
              </div>
              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300">
                    <Plus className="mr-2 h-4 w-4" />
                    Buat Folder ✨
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl w-full bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-2xl fixed top-8 left-1/4 translate-x-0 translate-y-0">
                  <DialogHeader className="text-center pb-4">
                    <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                      <FolderPlus className="h-6 w-6 text-white" />
                    </div>
                    <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Buat Folder Baru 🚀
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Yuk buat folder laporan yang keren! ✨
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-8 py-6">
                    <div className="space-y-3">
                      <Label htmlFor="reportType" className="text-base font-semibold text-gray-800 flex items-center gap-2">
                        📋 Jenis Laporan Pelatihan
                      </Label>
                      <Select value={createFormData.reportType} onValueChange={(value) => setCreateFormData({ ...createFormData, reportType: value })}>
                        <SelectTrigger className="bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md h-12 text-base">
                          <SelectValue placeholder="Pilih jenis laporan pelatihan..." />
                        </SelectTrigger>
                        <SelectContent className="bg-white/90 backdrop-blur-md border-white/20 rounded-xl">
                          <SelectItem value="PKN" className="text-base py-3">🎯 PKN (Pelatihan Kepemimpinan Nasional)</SelectItem>
                          <SelectItem value="PKP" className="text-base py-3">👁️ PKP (Pengawas)</SelectItem>
                          <SelectItem value="PKA" className="text-base py-3">⚙️ PKA (Administrator)</SelectItem>
                          <SelectItem value="LATSAR" className="text-base py-3">🎓 Latsar CPNS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="year" className="text-base font-semibold text-gray-800 flex items-center gap-2">
                          📅 Tahun Pelatihan
                        </Label>
                        <Select value={createFormData.year} onValueChange={(value) => setCreateFormData({ ...createFormData, year: value })}>
                          <SelectTrigger className="bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md h-12 text-base">
                            <SelectValue placeholder="Pilih tahun pelatihan..." />
                          </SelectTrigger>
                          <SelectContent className="bg-white/90 backdrop-blur-md border-white/20 rounded-xl">
                            {yearOptions.map((year) => (
                              <SelectItem key={year} value={year} className="text-base py-3">
                                📅 Tahun {year}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="batch" className="text-base font-semibold text-gray-800 flex items-center gap-2">
                          👥 Angkatan Pelatihan
                        </Label>
                        <Select value={createFormData.batch} onValueChange={(value) => setCreateFormData({ ...createFormData, batch: value })}>
                          <SelectTrigger className="bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md h-12 text-base">
                            <SelectValue placeholder="Pilih angkatan pelatihan..." />
                          </SelectTrigger>
                          <SelectContent className="bg-white/90 backdrop-blur-md border-white/20 rounded-xl">
                            {batchOptions.map((batch) => (
                              <SelectItem key={batch} value={batch} className="text-base py-3">
                                👥 Angkatan {batch}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="description" className="text-base font-semibold text-gray-800 flex items-center gap-2">
                        💭 Deskripsi Folder (Opsional)
                      </Label>
                      <Textarea
                        placeholder="Tambahkan deskripsi keren untuk folder pelatihan ini... Misalnya: 'Folder khusus untuk laporan PKN batch terbaru dengan tema kepemimpinan digital' ✨"
                        value={createFormData.description}
                        onChange={(e) => setCreateFormData({ ...createFormData, description: e.target.value })}
                        rows={4}
                        className="bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md focus:shadow-lg transition-all duration-300 resize-none text-base"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                      className="flex-1 bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-12 text-base font-semibold"
                      disabled={formLoading}
                    >
                      Batal 😔
                    </Button>
                    <Button
                      onClick={handleCreateFolder}
                      disabled={formLoading}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-12 text-base font-semibold"
                    >
                      {formLoading ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Membuat Folder...
                        </>
                      ) : (
                        <>
                          <Rocket className="mr-2 h-5 w-5" />
                          Buat Folder Keren! 🚀
                        </>
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Folders List */}
        <Card className="bg-white/70 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <FolderOpen className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl font-bold mb-1">Daftar Folder 📁</CardTitle>
                <CardDescription className="text-emerald-100">
                  {filteredFolders.length} folder ditemukan dari total {folders.length} folder 🎯
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filteredFolders.length === 0 ? (
              <div className="p-8 text-center">
                <Archive className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Tidak ada folder ditemukan</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery
                    ? "Tidak ada folder yang sesuai dengan pencarian Anda"
                    : "Belum ada folder yang dibuat"
                  }
                </p>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl px-6 py-2"
                >
                  Buat Folder Pertama 🚀
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-gray-200/50">
                {filteredFolders.map((folder) => (
                  <div key={folder.id} className="p-6 hover:bg-white/30 transition-all duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`p-3 rounded-xl text-white ${folder.is_active
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                          : 'bg-gradient-to-r from-gray-400 to-gray-500'
                          }`}>
                          <Archive className="h-6 w-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-gray-800 text-lg">
                              {folder.year} - Angkatan {folder.batch}
                            </h3>
                            <Badge
                              variant={folder.is_active ? "default" : "secondary"}
                              className={`text-xs ${folder.is_active
                                ? 'bg-green-100 text-green-800 border-green-200'
                                : 'bg-gray-100 text-gray-600 border-gray-200'
                                }`}
                            >
                              {folder.is_active ? '✅ Aktif' : '❌ Nonaktif'}
                            </Badge>
                          </div>
                          {folder.description && (
                            <p className="text-gray-600 text-sm mb-2">{folder.description}</p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Dibuat: {new Date(folder.created_at).toLocaleDateString('id-ID')}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              Oleh: {folder.creator.name || folder.creator.username}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-9 w-9 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-white/90 backdrop-blur-md border-white/20 rounded-xl">
                            <DropdownMenuItem onClick={() => openEditDialog(folder)}>
                              <Edit2 className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteFolder(folder)}
                              className="text-red-600 focus:text-red-600"
                              disabled={deleteLoading}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl w-full bg-white/95 backdrop-blur-md border-0 shadow-2xl rounded-2xl  translate-x-0 translate-y-0 top-10 left-96">
            <DialogHeader className="text-center pb-4">
              <div className="mx-auto w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-white" />
              </div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Edit Folder 🔧
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Perbarui pengaturan dan deskripsi folder ✨
              </DialogDescription>
            </DialogHeader>

            {selectedFolder && (
              <div className="space-y-8 py-6">
                <div className="p-6 bg-gray-50/70 backdrop-blur-sm rounded-xl border border-gray-200/50">
                  <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    📁 Informasi Folder
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white/50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Tahun Pelatihan</p>
                      <p className="text-base font-semibold text-gray-800">📅 {selectedFolder.year}</p>
                    </div>
                    <div className="p-3 bg-white/50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">Angkatan</p>
                      <p className="text-base font-semibold text-gray-800">👥 Angkatan {selectedFolder.batch}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="edit-description" className="text-base font-semibold text-gray-800 flex items-center gap-2">
                    💭 Deskripsi Folder
                  </Label>
                  <Textarea
                    id="edit-description"
                    placeholder="Perbarui deskripsi folder pelatihan... Tambahkan detail yang menarik! ✨"
                    value={editFormData.description}
                    onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                    rows={4}
                    className="bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md focus:shadow-lg transition-all duration-300 resize-none text-base"
                  />
                </div>

                <div className="flex items-center justify-between p-6 bg-gray-50/70 backdrop-blur-sm rounded-xl border border-gray-200/50">
                  <div className="flex-1">
                    <Label htmlFor="edit-active" className="text-base font-semibold text-gray-800 flex items-center gap-2 mb-2">
                      ⚡ Status Folder
                    </Label>
                    <p className="text-sm text-gray-600">
                      {editFormData.is_active ? '✅ Folder aktif dan dapat digunakan untuk upload laporan' : '❌ Folder nonaktif dan tersembunyi dari user'}
                    </p>
                  </div>
                  <div className="ml-4">
                    <Switch
                      id="edit-active"
                      checked={editFormData.is_active}
                      onCheckedChange={(checked) => setEditFormData({ ...editFormData, is_active: checked })}
                      className="scale-125"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 pt-6">
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="flex-1 bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-12 text-base font-semibold"
                disabled={formLoading}
              >
                Batal 😔
              </Button>
              <Button
                onClick={handleEditFolder}
                disabled={formLoading}
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white border-0 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-12 text-base font-semibold"
              >
                {formLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Memperbarui Folder...
                  </>
                ) : (
                  <>
                    <Activity className="mr-2 h-5 w-5" />
                    Perbarui Folder! 🔥
                  </>
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
