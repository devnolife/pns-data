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
  BarChart3
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

  // Generate year options (current year and previous 10 years)
  const currentYear = new Date().getFullYear()
  const yearOptions = Array.from({ length: 11 }, (_, i) => (currentYear - i).toString())

  // Batch options
  const batchOptions = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"]

  const loadFolders = async () => {
    try {
      const result = await getReportFoldersAction(1, 50, searchQuery)
      if (result.success) {
        setFolders(result.data as any)
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error loading folders:", error)
      toast({
        title: "Error",
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
        title: "Error",
        description: "Mohon lengkapi semua field yang wajib diisi",
        variant: "destructive"
      })
      return
    }

    setFormLoading(true)
    try {
      const result = await createReportFolderAction(createFormData)

      if (result.success) {
        toast({
          title: "✅ Berhasil",
          description: result.message
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
          title: "Error",
          description: result.error,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Create folder error:", error)
      toast({
        title: "Error",
        description: "Gagal membuat folder",
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
          title: "✅ Berhasil",
          description: result.message
        })
        setIsEditDialogOpen(false)
        setSelectedFolder(null)
        await loadFolders()
        await loadStats()
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Edit folder error:", error)
      toast({
        title: "Error",
        description: "Gagal memperbarui folder",
        variant: "destructive"
      })
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteFolder = async (folder: ReportFolderData) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus folder ${folder.year} - Angkatan ${folder.batch}?`)) {
      return
    }

    setDeleteLoading(true)
    try {
      const result = await deleteReportFolderAction(folder.id)

      if (result.success) {
        toast({
          title: "✅ Berhasil",
          description: result.message
        })
        await loadFolders()
        await loadStats()
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Delete folder error:", error)
      toast({
        title: "Error",
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      {/* Header */}
      <div className="mb-8 rounded-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-8 text-white shadow-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Kelola Folder Laporan 📁</h1>
            <p className="mt-2 text-white/90">Atur folder laporan berdasarkan jenis, tahun, dan angkatan</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
              <FolderPlus className="h-8 w-8 animate-bounce" />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 shadow-lg shadow-blue-100/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Folder</p>
                  <p className="text-2xl font-bold">{stats.totalFolders}</p>
                </div>
                <div className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-3">
                  <Archive className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg shadow-green-100/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Folder Aktif</p>
                  <p className="text-2xl font-bold">{stats.activeFolders}</p>
                </div>
                <div className="rounded-full bg-gradient-to-r from-green-500 to-emerald-500 p-3">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg shadow-orange-100/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Folder Nonaktif</p>
                  <p className="text-2xl font-bold">{stats.inactiveFolders}</p>
                </div>
                <div className="rounded-full bg-gradient-to-r from-orange-500 to-red-500 p-3">
                  <XCircle className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg shadow-purple-100/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Tahun Terbaru</p>
                  <p className="text-2xl font-bold">
                    {stats.foldersByYear.length > 0 ? stats.foldersByYear[0].year : "-"}
                  </p>
                </div>
                <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-3">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-l-4 border-l-blue-500 bg-blue-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-blue-900">Buat Folder Baru</h3>
                <p className="text-sm text-blue-700">Halaman khusus untuk membuat folder</p>
              </div>
              <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Link href="/dashboard/admin/folders/new">
                  <FolderPlus className="h-4 w-4 mr-2" />
                  Buat
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 bg-orange-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-orange-900">Kelola Folder Lama</h3>
                <p className="text-sm text-orange-700">Hapus folder yang sudah tidak terpakai</p>
              </div>
              <Button asChild size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-50">
                <Link href="/dashboard/admin/folders/manage">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Kelola
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 bg-purple-50/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-purple-900">Statistik Pengunjung</h3>
                <p className="text-sm text-purple-700">Lihat analitik dan laporan</p>
              </div>
              <Button asChild size="sm" variant="outline" className="border-purple-300 text-purple-700 hover:bg-purple-50">
                <Link href="/dashboard/admin/number-of-visitors">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Lihat
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Cari berdasarkan tahun, angkatan, atau deskripsi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80 rounded-full pl-10"
            />
          </div>
        </div>

        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600">
              <FolderPlus className="mr-2 h-4 w-4" />
              Buat Folder Baru
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>✨ Buat Folder Laporan Baru</DialogTitle>
              <DialogDescription>
                Buat folder untuk mengorganisir laporan berdasarkan jenis, tahun, dan angkatan
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reportType">Jenis Laporan *</Label>
                <Select value={createFormData.reportType} onValueChange={(value) => setCreateFormData({ ...createFormData, reportType: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih jenis laporan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PKN">🏛️ PKN (Pelatihan Kepemimpinan Nasional)</SelectItem>
                    <SelectItem value="PKP">🔍 PKP (Pelatihan Kepemimpinan Pengawas)</SelectItem>
                    <SelectItem value="PKA">👔 PKA (Pelatihan Kepemimpinan Administrator)</SelectItem>
                    <SelectItem value="LATSAR">🎓 Latsar CPNS</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="year">Tahun *</Label>
                  <Select value={createFormData.year} onValueChange={(value) => setCreateFormData({ ...createFormData, year: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tahun" />
                    </SelectTrigger>
                    <SelectContent>
                      {yearOptions.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="batch">Angkatan *</Label>
                  <Select value={createFormData.batch} onValueChange={(value) => setCreateFormData({ ...createFormData, batch: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih angkatan" />
                    </SelectTrigger>
                    <SelectContent>
                      {batchOptions.map((batch) => (
                        <SelectItem key={batch} value={batch}>
                          Angkatan {batch}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea
                  placeholder="Deskripsi folder (opsional)"
                  value={createFormData.description}
                  onChange={(e) => setCreateFormData({ ...createFormData, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="flex-1"
                >
                  Batal
                </Button>
                <Button
                  onClick={handleCreateFolder}
                  disabled={formLoading}
                  className="flex-1"
                >
                  {formLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Membuat...
                    </>
                  ) : (
                    "Buat Folder"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Folders Grid */}
      {filteredFolders.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredFolders.map((folder) => (
            <Card key={folder.id} className="group cursor-pointer border-0 shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 p-3 text-white shadow-lg">
                      <Archive className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Badge variant={folder.is_active ? "default" : "secondary"} className="rounded-full">
                        {folder.is_active ? "Aktif" : "Nonaktif"}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem onClick={() => openEditDialog(folder)}>
                            <Edit2 className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDeleteFolder(folder)}
                            className="text-destructive focus:text-destructive"
                            disabled={deleteLoading}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-semibold leading-tight">
                      {folder.year} - Angkatan {folder.batch}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                      {folder.description || `Folder laporan tahun ${folder.year} angkatan ${folder.batch}`}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <span>Dibuat: {new Date(folder.created_at).toLocaleDateString('id-ID')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3 w-3" />
                      <span className="truncate">{folder.creator.name || folder.creator.username}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-0 shadow-lg">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-muted p-6">
              <FolderOpen className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Tidak ada folder ditemukan</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {searchQuery ? "Coba sesuaikan kata kunci pencarian Anda" : "Buat folder pertama Anda untuk memulai!"}
            </p>
            {!searchQuery && (
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="mt-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600"
              >
                <FolderPlus className="mr-2 h-4 w-4" />
                Buat Folder
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>✏️ Edit Folder</DialogTitle>
            <DialogDescription>
              Edit deskripsi dan status folder {selectedFolder?.year} - Angkatan {selectedFolder?.batch}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-description">Deskripsi</Label>
              <Textarea
                id="edit-description"
                placeholder="Deskripsi folder"
                value={editFormData.description}
                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="edit-active">Status Aktif</Label>
              <Switch
                id="edit-active"
                checked={editFormData.is_active}
                onCheckedChange={(checked) => setEditFormData({ ...editFormData, is_active: checked })}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
                className="flex-1"
              >
                Batal
              </Button>
              <Button
                onClick={handleEditFolder}
                disabled={formLoading}
                className="flex-1"
              >
                {formLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menyimpan...
                  </>
                ) : (
                  "Simpan"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
