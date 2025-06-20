"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import {
  Trash2,
  Search,
  Calendar,
  Folder,
  AlertTriangle,
  Archive,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  RotateCcw,
  Loader2
} from "lucide-react"
import {
  getReportFoldersAction,
  deleteReportFolderAction,
  type ReportFolderData
} from "@/lib/actions/report-folders"

interface FolderWithAge extends ReportFolderData {
  ageInYears: number
  isOld: boolean
}

export default function ManageFoldersPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [deletingFolders, setDeletingFolders] = useState(false)
  const [folders, setFolders] = useState<FolderWithAge[]>([])
  const [filteredFolders, setFilteredFolders] = useState<FolderWithAge[]>([])
  const [selectedFolders, setSelectedFolders] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [ageFilter, setAgeFilter] = useState<"all" | "old" | "recent">("all")
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const loadFolders = async () => {
    try {
      setLoading(true)
      const result = await getReportFoldersAction(1, 100)

      if (result.success && result.data) {
        const currentYear = new Date().getFullYear()
        const foldersWithAge: FolderWithAge[] = result.data.map(folder => ({
          ...folder,
          ageInYears: currentYear - parseInt(folder.year),
          isOld: currentYear - parseInt(folder.year) >= 5
        })) as FolderWithAge[]
        setFolders(foldersWithAge)
        setFilteredFolders(foldersWithAge)
      } else {
        toast({
          title: "❌ Error",
          description: result.error || "Gagal memuat daftar folder",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error loading folders:", error)
      toast({
        title: "❌ Error",
        description: "Terjadi kesalahan saat memuat folder",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadFolders()
  }, [])

  useEffect(() => {
    let filtered = folders

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(folder =>
        folder.reportType.toLowerCase().includes(query) ||
        folder.year.includes(query) ||
        folder.batch.toLowerCase().includes(query) ||
        folder.description?.toLowerCase().includes(query)
      )
    }

    // Apply age filter
    if (ageFilter === "old") {
      filtered = filtered.filter(folder => folder.isOld)
    } else if (ageFilter === "recent") {
      filtered = filtered.filter(folder => !folder.isOld)
    }

    setFilteredFolders(filtered)
  }, [folders, searchQuery, ageFilter])

  const handleFolderSelect = (folderId: string, checked: boolean) => {
    if (checked) {
      setSelectedFolders([...selectedFolders, folderId])
    } else {
      setSelectedFolders(selectedFolders.filter(id => id !== folderId))
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedFolders(filteredFolders.map(folder => folder.id))
    } else {
      setSelectedFolders([])
    }
  }

  const handleSelectOldFolders = () => {
    const oldFolderIds = filteredFolders.filter(folder => folder.isOld).map(folder => folder.id)
    setSelectedFolders(oldFolderIds)
  }

  const handleDeleteSelectedFolders = async () => {
    if (selectedFolders.length === 0) return

    setDeletingFolders(true)
    let successCount = 0
    let errorCount = 0

    try {
      for (const folderId of selectedFolders) {
        try {
          const result = await deleteReportFolderAction(folderId)
          if (result.success) {
            successCount++
          } else {
            errorCount++
          }
        } catch (error) {
          errorCount++
        }
      }

      if (successCount > 0) {
        toast({
          title: "✅ Berhasil",
          description: `${successCount} folder berhasil dihapus${errorCount > 0 ? `, ${errorCount} folder gagal dihapus` : ""}`
        })
      }

      if (errorCount > 0 && successCount === 0) {
        toast({
          title: "❌ Gagal",
          description: `Gagal menghapus ${errorCount} folder`,
          variant: "destructive"
        })
      }

      setSelectedFolders([])
      setIsDeleteDialogOpen(false)
      await loadFolders()

    } catch (error) {
      console.error("Error deleting folders:", error)
      toast({
        title: "❌ Error",
        description: "Terjadi kesalahan saat menghapus folder",
        variant: "destructive"
      })
    } finally {
      setDeletingFolders(false)
    }
  }

  const getAgeColor = (ageInYears: number) => {
    if (ageInYears >= 5) return "bg-red-100 text-red-800 border-red-200"
    if (ageInYears >= 3) return "bg-yellow-100 text-yellow-800 border-yellow-200"
    return "bg-green-100 text-green-800 border-green-200"
  }

  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-gray-100 text-gray-800 border-gray-200"
  }

  const oldFoldersCount = folders.filter(folder => folder.isOld).length
  const selectedOldFoldersCount = selectedFolders.filter(id =>
    folders.find(folder => folder.id === id)?.isOld
  ).length

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <p className="text-lg font-medium text-gray-600">Loading folders... 📁</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-500 via-orange-500 to-yellow-500 p-8 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative">
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Archive className="h-8 w-8" />
            Kelola & Hapus Folder Lama
          </h1>
          <p className="mt-2 text-white/90">
            Bersihkan folder digital yang sudah tidak terpakai (≥5 tahun) untuk mengoptimalkan penyimpanan
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Folder</p>
                <p className="text-2xl font-bold">{folders.length}</p>
              </div>
              <Folder className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Folder Lama (≥5 tahun)</p>
                <p className="text-2xl font-bold text-red-600">{oldFoldersCount}</p>
              </div>
              <Clock className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Dipilih untuk Hapus</p>
                <p className="text-2xl font-bold text-orange-600">{selectedFolders.length}</p>
              </div>
              <Trash2 className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Folder Lama Terpilih</p>
                <p className="text-2xl font-bold text-red-600">{selectedOldFoldersCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Cari folder..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <Select value={ageFilter} onValueChange={(value: "all" | "old" | "recent") => setAgeFilter(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter berdasarkan usia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Folder</SelectItem>
            <SelectItem value="old">Folder Lama (≥5 tahun)</SelectItem>
            <SelectItem value="recent">Folder Baru (&lt;5 tahun)</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={handleSelectOldFolders}
          disabled={oldFoldersCount === 0}
        >
          <Clock className="mr-2 h-4 w-4" />
          Pilih Folder Lama
        </Button>
        <Button
          variant="destructive"
          onClick={() => setIsDeleteDialogOpen(true)}
          disabled={selectedFolders.length === 0}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Hapus Terpilih
        </Button>
      </div>

      {/* Warning Alert */}
      {oldFoldersCount > 0 && (
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Perhatian:</strong> Terdapat {oldFoldersCount} folder yang sudah berusia 5 tahun atau lebih.
            Pertimbangkan untuk mengarsipkan atau menghapus folder-folder ini untuk mengoptimalkan penyimpanan.
          </AlertDescription>
        </Alert>
      )}

      {/* Folders List */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Folder ({filteredFolders.length})</CardTitle>
          <CardDescription>
            Pilih folder yang ingin dihapus dengan mencentang checkbox di sebelah kiri
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFolders.length > 0 ? (
              <>
                <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <Checkbox
                    id="select-all"
                    checked={selectedFolders.length === filteredFolders.length}
                    onCheckedChange={handleSelectAll}
                  />
                  <label
                    htmlFor="select-all"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Pilih Semua
                  </label>
                </div>
                {filteredFolders.map((folder) => (
                  <div
                    key={folder.id}
                    className="flex items-start gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <Checkbox
                      id={folder.id}
                      checked={selectedFolders.includes(folder.id)}
                      onCheckedChange={(checked) => handleFolderSelect(folder.id, checked as boolean)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium truncate">
                          {folder.reportType} {folder.year} - Angkatan {folder.batch}
                        </h3>
                        <Badge variant="outline" className={getAgeColor(folder.ageInYears)}>
                          {folder.ageInYears} tahun
                        </Badge>
                        <Badge variant="outline" className={getStatusColor(folder.is_active)}>
                          {folder.is_active ? "Aktif" : "Nonaktif"}
                        </Badge>
                      </div>
                      {folder.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">{folder.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center py-8">
                <Folder className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Tidak ada folder yang ditemukan</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus Folder</DialogTitle>
            <DialogDescription>
              Anda akan menghapus {selectedFolders.length} folder yang dipilih.
              {selectedOldFoldersCount > 0 && (
                <span className="block mt-2 text-red-600">
                  <strong>Perhatian:</strong> {selectedOldFoldersCount} folder yang dipilih sudah berusia 5 tahun atau lebih.
                </span>
              )}
              Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={deletingFolders}
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteSelectedFolders}
              disabled={deletingFolders}
            >
              {deletingFolders ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menghapus...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Hapus Folder
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 
