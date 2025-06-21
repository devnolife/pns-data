"use client"

import { useState, useEffect } from "react"
import { useDataSync } from "@/hooks/use-data-sync"
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
  TrendingUp,
  GraduationCap,
  UserPlus,
  Clock,
  BookOpen,
  RefreshCw
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
import {
  getTrainingProgramsAction,
  getTrainingCohortsAction,
  createTrainingCohortAction,
  getMasterYearsAction,
  getMasterCohortsAction,
  createMasterYearAction,
  createMasterCohortAction,
  deleteMasterYearAction,
  deleteMasterCohortAction,
  type TrainingProgramData,
  type TrainingCohortData
} from "@/lib/actions/training"

interface CreateFolderData {
  reportType: string
  year: string
  batch: string
  description: string
  training_program_id?: string
  cohort_id?: string
}

interface CreateCohortData {
  name: string
  training_program_id: string
  year: string
  start_date?: Date
  end_date?: Date
  max_participants?: number
  description: string
}

interface MasterYear {
  id: string
  year: string
  is_active: boolean
  created_at: Date
  updated_at: Date
}

interface MasterCohort {
  id: string
  name: string
  is_active: boolean
  created_at: Date
  updated_at: Date
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
  const [trainingPrograms, setTrainingPrograms] = useState<TrainingProgramData[]>([])
  const [trainingCohorts, setTrainingCohorts] = useState<TrainingCohortData[]>([])
  const [masterYears, setMasterYears] = useState<MasterYear[]>([])
  const [masterCohorts, setMasterCohorts] = useState<MasterCohort[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isCreateCohortDialogOpen, setIsCreateCohortDialogOpen] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState<ReportFolderData | null>(null)
  const [folderToDelete, setFolderToDelete] = useState<ReportFolderData | null>(null)
  const [deleteConfirmation, setDeleteConfirmation] = useState("")
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState<string | null>(null)
  const [showEditForm, setShowEditForm] = useState<string | null>(null)
  const [formLoading, setFormLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const [createFormData, setCreateFormData] = useState<CreateFolderData>({
    reportType: "",
    year: "",
    batch: "",
    description: ""
  })

  const [createCohortData, setCreateCohortData] = useState<CreateCohortData>({
    name: "",
    training_program_id: "",
    year: "",
    description: ""
  })

  const [newYear, setNewYear] = useState("")
  const [newCohortName, setNewCohortName] = useState("")

  const [editFormData, setEditFormData] = useState({
    description: "",
    is_active: true
  })

  const { toast } = useToast()

  // Add data sync for real-time updates
  const { notifyDataUpdate } = useDataSync({
    onDataUpdate: () => {
      console.log('📡 Data sync triggered - refreshing folder data')
      loadAllData(false)
    }
  })

  // Generate year options (current year and next 2 years, plus previous 8 years)
  const currentYear = new Date().getFullYear()
  const yearOptions = Array.from({ length: 11 }, (_, i) => (currentYear + 2 - i).toString())

  // Batch options
  const batchOptions = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"]

  const loadAllData = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true)
    }
    try {
      console.log('🔄 Loading all data...')
      const results = await Promise.all([
        getReportFoldersAction(1, 50, searchQuery),
        getReportFolderStatsAction(),
        getTrainingProgramsAction(),
        getTrainingCohortsAction(),
        getMasterYearsAction(),
        getMasterCohortsAction()
      ])

      const [foldersResult, statsResult, programsResult, cohortsResult, yearsResult, masterCohortsResult] = results

      if (foldersResult.success) {
        setFolders(foldersResult.data as any)
        console.log('✅ Folders loaded:', foldersResult.data?.length || 0)
      }

      if (statsResult.success) {
        setStats(statsResult.data as any)
        console.log('✅ Stats loaded')
      }

      if (programsResult.success) {
        setTrainingPrograms(programsResult.data as TrainingProgramData[])
        console.log('✅ Training programs loaded:', programsResult.data?.length || 0)
      }

      if (cohortsResult.success) {
        setTrainingCohorts(cohortsResult.data as TrainingCohortData[])
        console.log('✅ Training cohorts loaded:', cohortsResult.data?.length || 0)
      }

      if (yearsResult.success) {
        setMasterYears(yearsResult.data as MasterYear[])
        console.log('✅ Master years loaded:', yearsResult.data?.length || 0)
      }

      if (masterCohortsResult.success) {
        setMasterCohorts(masterCohortsResult.data as MasterCohort[])
        console.log('✅ Master cohorts loaded:', masterCohortsResult.data?.length || 0)
      }

      // Show toast if any data failed to load
      const failedResults = results.filter(r => !r.success)
      if (failedResults.length > 0) {
        console.error('❌ Some data failed to load:', failedResults)
        toast({
          title: "⚠️ Ada masalah nih",
          description: "Beberapa data gagal dimuat, coba refresh lagi ya!",
          variant: "destructive"
        })
      }

    } catch (error) {
      console.error("Error loading data:", error)
      toast({
        title: "❌ Error!",
        description: "Gagal memuat data, coba refresh halaman",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadAllData(false)
    toast({
      title: "🔄 Data diperbarui!",
      description: "Semua data telah dimuat ulang",
    })
  }

  useEffect(() => {
    loadAllData()
  }, [searchQuery])

  // Debug: Log state changes
  useEffect(() => {
    console.log('📊 Current state:', {
      masterYears: masterYears.length,
      masterCohorts: masterCohorts.length,
      trainingPrograms: trainingPrograms.length,
      trainingCohorts: trainingCohorts.length,
      folders: folders.length
    })
  }, [masterYears, masterCohorts, trainingPrograms, trainingCohorts, folders])

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
      // Find matching cohort based on selected data
      const selectedProgram = trainingPrograms.find(p => p.name === createFormData.reportType)
      const selectedCohort = trainingCohorts.find(c =>
        c.training_program_id === selectedProgram?.id &&
        c.year === createFormData.year &&
        c.name === createFormData.batch
      )

      const folderData = {
        ...createFormData,
        training_program_id: selectedProgram?.id,
        cohort_id: selectedCohort?.id
      }

      const result = await createReportFolderAction(folderData)

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

        // Trigger data sync notification for real-time updates
        notifyDataUpdate()

        await loadAllData()
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

  const handleCreateCohort = async () => {
    if (!createCohortData.name || !createCohortData.training_program_id || !createCohortData.year) {
      toast({
        title: "⚠️ Tunggu dulu!",
        description: "Mohon lengkapi semua field yang wajib diisi ya! 💫",
        variant: "destructive"
      })
      return
    }

    setFormLoading(true)
    try {
      const result = await createTrainingCohortAction(createCohortData)

      if (result.success) {
        toast({
          title: "🎓 Yeay! Angkatan Baru!",
          description: `${result.message} ✨`,
          duration: 4000
        })
        setIsCreateCohortDialogOpen(false)
        setCreateCohortData({
          name: "",
          training_program_id: "",
          year: "",
          description: ""
        })
        await loadAllData()
      } else {
        toast({
          title: "😅 Waduh!",
          description: result.error,
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Create cohort error:", error)
      toast({
        title: "💥 Error!",
        description: "Gagal membuat angkatan, coba lagi ya!",
        variant: "destructive"
      })
    } finally {
      setFormLoading(false)
    }
  }

  const handleAddMasterYear = async () => {
    if (!newYear) {
      toast({
        title: "⚠️ Tunggu dulu!",
        description: "Mohon masukkan tahun",
        variant: "destructive"
      })
      return
    }

    setFormLoading(true)
    try {
      const result = await createMasterYearAction(newYear)
      if (result.success) {
        toast({
          title: "🎉 Berhasil!",
          description: "Tahun baru berhasil ditambahkan",
        })
        setNewYear("")
        await loadAllData()
      } else {
        toast({
          title: "❌ Gagal!",
          description: result.error || "Gagal menambahkan tahun",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error adding year:", error)
      toast({
        title: "❌ Error!",
        description: "Terjadi kesalahan saat menambahkan tahun",
        variant: "destructive"
      })
    } finally {
      setFormLoading(false)
    }
  }

  const handleAddMasterCohort = async () => {
    if (!newCohortName) {
      toast({
        title: "⚠️ Tunggu dulu!",
        description: "Mohon masukkan nama angkatan",
        variant: "destructive"
      })
      return
    }

    setFormLoading(true)
    try {
      const result = await createMasterCohortAction(newCohortName)
      if (result.success) {
        toast({
          title: "🎉 Berhasil!",
          description: "Angkatan baru berhasil ditambahkan",
        })
        setNewCohortName("")
        await loadAllData()
      } else {
        toast({
          title: "❌ Gagal!",
          description: result.error || "Gagal menambahkan angkatan",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error adding cohort:", error)
      toast({
        title: "❌ Error!",
        description: "Terjadi kesalahan saat menambahkan angkatan",
        variant: "destructive"
      })
    } finally {
      setFormLoading(false)
    }
  }

  const handleDeleteMasterYear = async (id: string) => {
    if (!confirm("Yakin ingin menghapus tahun ini?")) return

    setDeleteLoading(true)
    try {
      const result = await deleteMasterYearAction(id)
      if (result.success) {
        toast({
          title: "🗑️ Berhasil!",
          description: "Tahun berhasil dihapus",
        })
        await loadAllData()
      } else {
        toast({
          title: "❌ Gagal!",
          description: result.error || "Gagal menghapus tahun",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error deleting year:", error)
      toast({
        title: "❌ Error!",
        description: "Terjadi kesalahan saat menghapus tahun",
        variant: "destructive"
      })
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleDeleteMasterCohort = async (id: string) => {
    if (!confirm("Yakin ingin menghapus angkatan ini?")) return

    setDeleteLoading(true)
    try {
      const result = await deleteMasterCohortAction(id)
      if (result.success) {
        toast({
          title: "🗑️ Berhasil!",
          description: "Angkatan berhasil dihapus",
        })
        await loadAllData()
      } else {
        toast({
          title: "❌ Gagal!",
          description: result.error || "Gagal menghapus angkatan",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("Error deleting cohort:", error)
      toast({
        title: "❌ Error!",
        description: "Terjadi kesalahan saat menghapus angkatan",
        variant: "destructive"
      })
    } finally {
      setDeleteLoading(false)
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
        setShowEditForm(null)
        setSelectedFolder(null)

        // Trigger data sync notification for real-time updates
        notifyDataUpdate()

        await loadAllData()
      } else {
        toast({
          title: "😅 Waduh...",
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

  const openDeleteConfirmation = (folder: ReportFolderData) => {
    setFolderToDelete(folder)
    setDeleteConfirmation("")
    setShowDeleteConfirmation(folder.id)
  }

  const cancelDeleteConfirmation = () => {
    setShowDeleteConfirmation(null)
    setFolderToDelete(null)
    setDeleteConfirmation("")
  }

  const handleDeleteFolder = async () => {
    if (!folderToDelete) return

    if (deleteConfirmation !== "HAPUS") {
      toast({
        title: "❌ Konfirmasi Salah",
        description: "Mohon ketik 'HAPUS' dengan benar untuk konfirmasi",
        variant: "destructive"
      })
      return
    }

    setDeleteLoading(true)
    setShowDeleteConfirmation(null)

    // Show loading toast
    toast({
      title: "🔄 Menghapus folder...",
      description: `Sedang menghapus ${folderToDelete.year} - Angkatan ${folderToDelete.batch} secara menyeluruh...`,
      duration: 0, // Don't auto dismiss
    })

    try {
      console.log(`🗑️ Starting folder deletion: ${folderToDelete.year} - Angkatan ${folderToDelete.batch}`)
      const result = await deleteReportFolderAction(folderToDelete.id)

      if (result.success) {
        // Show detailed success message
        const details = result.details
        toast({
          title: "🎉 Penghapusan Berhasil!",
          description: `
✅ Folder ${details?.folderInfo} dihapus menyeluruh!
📊 Detail:
• ${details?.deletedPhysicalFiles || 0} file fisik dihapus
• ${details?.deletedReports || 0} total laporan dihapus
• ${details?.deletedPrivateReports || 0} laporan privat dihapus
• ${details?.deletedPublicReports || 0} koleksi publik dihapus
• ${details?.deletedFileRecords || 0} record file dihapus
• ${details?.affectedUsers || 0} user terpengaruh
• ${details?.revalidatedPaths || 0} halaman diperbarui
           `,
          duration: 8000
        })

        // Trigger data sync notification for real-time updates
        notifyDataUpdate()

        // Reload data to reflect changes
        await loadAllData()

        console.log('✅ Folder deletion completed and data refreshed')
      } else {
        toast({
          title: "❌ Gagal Menghapus!",
          description: result.error || "Terjadi kesalahan saat menghapus folder",
          variant: "destructive",
          duration: 6000
        })
      }
    } catch (error) {
      console.error("❌ Delete folder error:", error)
      toast({
        title: "💥 Error Sistem!",
        description: "Terjadi kesalahan sistem saat menghapus folder. Silakan coba lagi atau hubungi administrator.",
        variant: "destructive",
        duration: 6000
      })
    } finally {
      setDeleteLoading(false)
    }
  }

  const openEditForm = (folder: ReportFolderData) => {
    setSelectedFolder(folder)
    setEditFormData({
      description: folder.description || "",
      is_active: folder.is_active
    })
    setShowEditForm(folder.id)
  }

  const cancelEditForm = () => {
    setShowEditForm(null)
    setSelectedFolder(null)
    setEditFormData({
      description: "",
      is_active: true
    })
  }

  // Get available batches for selected program and year
  const getAvailableBatches = () => {
    if (!createFormData.reportType || !createFormData.year) return batchOptions

    const selectedProgram = trainingPrograms.find(p => p.name === createFormData.reportType)
    if (!selectedProgram) return batchOptions

    const existingCohorts = trainingCohorts.filter(c =>
      c.training_program_id === selectedProgram.id &&
      c.year === createFormData.year
    )

    return batchOptions.filter(batch =>
      !existingCohorts.some(cohort => cohort.name === batch)
    )
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
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-800">{trainingCohorts.length}</p>
                    <p className="text-sm text-gray-600">Total Angkatan</p>
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
              <div className="flex gap-3">
                {/* Refresh Button */}
                <Button
                  onClick={handleRefresh}
                  disabled={refreshing}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white border-0 rounded-xl px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {refreshing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="h-4 w-4" />
                  )}
                </Button>

                {/* Toggle Manage Years & Cohorts Button */}
                <Button
                  onClick={() => setIsCreateCohortDialogOpen(!isCreateCohortDialogOpen)}
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white border-0 rounded-xl px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {isCreateCohortDialogOpen ? 'Tutup' : 'Kelola'} Tahun & Angkatan 📅
                </Button>

                {/* Create Folder Button */}
                <Button
                  onClick={() => setIsCreateDialogOpen(!isCreateDialogOpen)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {isCreateDialogOpen ? 'Tutup' : 'Buat'} Folder ✨
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Manage Years & Cohorts Section */}
        {isCreateCohortDialogOpen && (
          <Card className="bg-white/70 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold mb-1">Kelola Tahun & Angkatan 📅</CardTitle>
                  <CardDescription className="text-emerald-100">
                    Tambahkan atau hapus master data tahun dan angkatan ✨
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-8">
              {/* Form Tambah Tahun */}
              <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-blue-800 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Tambah Tahun Baru
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      type="number"
                      placeholder="2024"
                      value={newYear}
                      onChange={(e) => setNewYear(e.target.value)}
                      className="bg-white border-blue-200 rounded-lg"
                      min="2000"
                      max="2050"
                    />
                    <Button
                      onClick={handleAddMasterYear}
                      disabled={formLoading || !newYear}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-lg px-6"
                    >
                      {formLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Tambah
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Form Tambah Angkatan */}
              <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-purple-800 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Tambah Angkatan Baru
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4">
                    <Input
                      placeholder="VI, VII, VIII..."
                      value={newCohortName}
                      onChange={(e) => setNewCohortName(e.target.value)}
                      className="bg-white border-purple-200 rounded-lg"
                    />
                    <Button
                      onClick={handleAddMasterCohort}
                      disabled={formLoading || !newCohortName}
                      className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg px-6"
                    >
                      {formLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Plus className="mr-2 h-4 w-4" />
                          Tambah
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Daftar Tahun */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Daftar Tahun
                </h3>
                <Card className="bg-white/70 border-gray-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {masterYears.length === 0 ? (
                        <p className="text-gray-500 text-sm italic">Belum ada tahun</p>
                      ) : (
                        masterYears.map((year) => (
                          <div
                            key={year.id}
                            className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg px-3 py-2 text-sm flex items-center gap-2"
                          >
                            <Calendar className="h-3 w-3 text-blue-600" />
                            <span className="font-medium text-blue-800">
                              {year.year}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteMasterYear(year.id)}
                              disabled={deleteLoading}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Daftar Angkatan */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Daftar Angkatan
                </h3>
                <Card className="bg-white/70 border-gray-200 shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {masterCohorts.length === 0 ? (
                        <p className="text-gray-500 text-sm italic">Belum ada angkatan</p>
                      ) : (
                        masterCohorts.map((cohort) => (
                          <div
                            key={cohort.id}
                            className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg px-3 py-2 text-sm flex items-center gap-2"
                          >
                            <Users className="h-3 w-3 text-purple-600" />
                            <span className="font-medium text-purple-800">
                              Angkatan {cohort.name}
                            </span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteMasterCohort(cohort.id)}
                              disabled={deleteLoading}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Create Folder Section */}
        {isCreateDialogOpen && (
          <Card className="bg-white/70 backdrop-blur-md border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <FolderPlus className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold mb-1">Buat Folder Baru 🚀</CardTitle>
                    <CardDescription className="text-purple-100">
                      Yuk buat folder laporan yang keren! ✨
                    </CardDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsCreateDialogOpen(false)}
                  className="text-white hover:bg-white/20 rounded-xl h-8 w-8 p-0"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-3">
                <Label htmlFor="reportType" className="text-base font-semibold text-gray-800 flex items-center gap-2">
                  📋 Jenis Laporan Pelatihan
                </Label>
                <Select value={createFormData.reportType} onValueChange={(value) => setCreateFormData({ ...createFormData, reportType: value, year: "", batch: "" })}>
                  <SelectTrigger className="bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md h-12 text-base">
                    <SelectValue placeholder="Pilih jenis laporan pelatihan..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white/90 backdrop-blur-md border-white/20 rounded-xl">
                    {trainingPrograms.map((program) => (
                      <SelectItem key={program.id} value={program.name} className="text-base py-3">
                        🎯 {program.name} - {program.full_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="year" className="text-base font-semibold text-gray-800 flex items-center gap-2">
                    📅 Tahun Pelatihan
                  </Label>
                  <Select
                    value={createFormData.year}
                    onValueChange={(value) => setCreateFormData({ ...createFormData, year: value, batch: "" })}
                    disabled={!createFormData.reportType}
                  >
                    <SelectTrigger className="bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md h-12 text-base">
                      <SelectValue placeholder="Pilih tahun pelatihan..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white/90 backdrop-blur-md border-white/20 rounded-xl">
                      {masterYears.filter(y => y.is_active).map((year) => (
                        <SelectItem key={year.id} value={year.year} className="text-base py-3">
                          📅 Tahun {year.year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="batch" className="text-base font-semibold text-gray-800 flex items-center gap-2">
                    👥 Angkatan Pelatihan
                  </Label>
                  <Select
                    value={createFormData.batch}
                    onValueChange={(value) => setCreateFormData({ ...createFormData, batch: value })}
                    disabled={!createFormData.reportType || !createFormData.year}
                  >
                    <SelectTrigger className="bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md h-12 text-base">
                      <SelectValue placeholder="Pilih angkatan pelatihan..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white/90 backdrop-blur-md border-white/20 rounded-xl">
                      {masterCohorts.filter(c => c.is_active).map((cohort) => (
                        <SelectItem key={cohort.id} value={cohort.name} className="text-base py-3">
                          👥 Angkatan {cohort.name}
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

              <div className="flex gap-4 pt-4">
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
            </CardContent>
          </Card>
        )}

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
                            <DropdownMenuItem onClick={() => openEditForm(folder)}>
                              <Edit2 className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => openDeleteConfirmation(folder)}
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

                    {/* Inline Delete Confirmation */}
                    {showDeleteConfirmation === folder.id && folderToDelete && (
                      <div className="mt-4 p-6 bg-red-50/80 border-2 border-red-200 rounded-xl">
                        <div className="space-y-4">
                          {/* Header */}
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                              <Trash2 className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-red-800">
                                ⚠️ Konfirmasi Penghapusan
                              </h4>
                              <p className="text-sm text-red-600">
                                Folder: {folderToDelete.year} - Angkatan {folderToDelete.batch}
                              </p>
                            </div>
                          </div>

                          {/* Warning */}
                          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <p className="text-sm text-yellow-800 font-medium mb-2">
                              💀 Data yang akan dihapus PERMANEN:
                            </p>
                            <div className="text-xs text-yellow-700 space-y-1">
                              <div>📁 Folder dan pengaturannya</div>
                              <div>📄 SEMUA laporan dalam folder</div>
                              <div>📎 SEMUA file yang terupload</div>
                              <div>🗂️ Koleksi digital terkait</div>
                              <div>🔄 Data dari tampilan publik</div>
                            </div>
                          </div>

                          {/* Critical Warning */}
                          <div className="p-4 bg-red-100 border-2 border-red-300 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">!</span>
                              <span className="text-red-800 font-bold text-sm">AKSI INI TIDAK BISA DIBATALKAN!</span>
                            </div>
                            <p className="text-red-700 text-xs">
                              Semua data akan hilang permanen dan tidak dapat dipulihkan.
                            </p>
                          </div>

                          {/* Confirmation Input */}
                          <div className="space-y-3">
                            <Label className="text-sm font-semibold text-gray-800">
                              🔒 Ketik "HAPUS" untuk konfirmasi:
                            </Label>
                            <Input
                              placeholder="Ketik HAPUS..."
                              value={deleteConfirmation}
                              onChange={(e) => setDeleteConfirmation(e.target.value)}
                              className="text-center font-mono border-red-200 focus:border-red-400"
                              autoComplete="off"
                            />
                            {deleteConfirmation && deleteConfirmation !== "HAPUS" && (
                              <p className="text-red-500 text-xs">
                                ❌ Konfirmasi tidak sesuai. Ketik "HAPUS" dengan tepat.
                              </p>
                            )}
                            {deleteConfirmation === "HAPUS" && (
                              <p className="text-green-600 text-xs">
                                ✅ Konfirmasi benar. Tombol hapus akan aktif.
                              </p>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3 pt-2">
                            <Button
                              variant="outline"
                              onClick={cancelDeleteConfirmation}
                              className="flex-1"
                              disabled={deleteLoading}
                            >
                              ❌ Batal
                            </Button>
                            <Button
                              onClick={handleDeleteFolder}
                              disabled={deleteLoading || deleteConfirmation !== "HAPUS"}
                              className={`flex-1 ${deleteConfirmation === "HAPUS"
                                ? "bg-red-500 hover:bg-red-600 text-white"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                            >
                              {deleteLoading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Menghapus...
                                </>
                              ) : (
                                <>
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  🗑️ HAPUS PERMANEN
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Inline Edit Form */}
                    {showEditForm === folder.id && selectedFolder && (
                      <div className="mt-4 p-6 bg-blue-50/80 border-2 border-blue-200 rounded-xl">
                        <div className="space-y-4">
                          {/* Header */}
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                              <Edit2 className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <h4 className="text-lg font-bold text-blue-800">
                                🔧 Edit Folder
                              </h4>
                              <p className="text-sm text-blue-600">
                                Folder: {selectedFolder.year} - Angkatan {selectedFolder.batch}
                              </p>
                            </div>
                          </div>

                          {/* Folder Info */}
                          <div className="p-4 bg-white/70 border border-blue-200 rounded-lg">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-600 mb-1">Tahun Pelatihan</p>
                                <p className="text-base font-semibold text-blue-800">📅 {selectedFolder.year}</p>
                              </div>
                              <div className="p-3 bg-blue-50 rounded-lg">
                                <p className="text-sm text-blue-600 mb-1">Angkatan</p>
                                <p className="text-base font-semibold text-blue-800">👥 Angkatan {selectedFolder.batch}</p>
                              </div>
                            </div>
                          </div>

                          {/* Edit Form Fields */}
                          <div className="space-y-4">
                            {/* Description */}
                            <div className="space-y-2">
                              <Label className="text-sm font-semibold text-gray-800">
                                💭 Deskripsi Folder:
                              </Label>
                              <Textarea
                                placeholder="Perbarui deskripsi folder pelatihan..."
                                value={editFormData.description}
                                onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                                rows={3}
                                className="bg-white border-blue-200 focus:border-blue-400 rounded-lg resize-none"
                              />
                            </div>

                            {/* Status Toggle */}
                            <div className="flex items-center justify-between p-4 bg-white border border-blue-200 rounded-lg">
                              <div className="flex-1">
                                <Label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                  ⚡ Status Folder
                                </Label>
                                <p className="text-xs text-gray-600 mt-1">
                                  {editFormData.is_active ? '✅ Folder aktif dan dapat digunakan' : '❌ Folder nonaktif dan tersembunyi'}
                                </p>
                              </div>
                              <div className="ml-4">
                                <Switch
                                  checked={editFormData.is_active}
                                  onCheckedChange={(checked) => setEditFormData({ ...editFormData, is_active: checked })}
                                  className="scale-110"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3 pt-2">
                            <Button
                              variant="outline"
                              onClick={cancelEditForm}
                              className="flex-1"
                              disabled={formLoading}
                            >
                              ❌ Batal
                            </Button>
                            <Button
                              onClick={handleEditFolder}
                              disabled={formLoading}
                              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                            >
                              {formLoading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Menyimpan...
                                </>
                              ) : (
                                <>
                                  <Edit2 className="mr-2 h-4 w-4" />
                                  💾 Simpan Perubahan
                                </>
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
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
