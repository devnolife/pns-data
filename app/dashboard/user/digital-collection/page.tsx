"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  FolderOpen,
  FileText,
  Search,
  ArrowLeft,
  Calendar,
  Users,
  BookOpen,
  Eye,
  Sparkles,
  Star,
  Zap
} from "lucide-react"

type FolderStructure = {
  id: string
  name: string
  type: 'category' | 'year' | 'batch' | 'report'
  parentId?: string
  icon?: string
  description?: string
  reportCount?: number
  year?: string
  batch?: string
  abstract?: string
  cover?: string
  author?: string
  date?: string
  gradient?: string
}

type Report = {
  id: string
  title: string
  abstract: string
  cover: string
  author: string
  date: string
  category: string
  year: string
  batch: string
}

export default function DigitalCollectionPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPath, setCurrentPath] = useState<string[]>([])
  const [currentItems, setCurrentItems] = useState<FolderStructure[]>([])
  const [breadcrumb, setBreadcrumb] = useState<{ id: string; name: string }[]>([])
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)

  // Mock data structure with Gen Z styling
  const mockData: FolderStructure[] = [
    // Main categories with gradients
    {
      id: 'pkn',
      name: 'PKN (Pelatihan Kepemimpinan Nasional)',
      type: 'category',
      icon: '🎯',
      description: 'Program pelatihan kepemimpinan tingkat nasional yang lit! 🔥',
      reportCount: 45,
      gradient: 'from-purple-500 via-pink-500 to-red-500'
    },
    {
      id: 'pkp',
      name: 'PKP (Pengawas)',
      type: 'category',
      icon: '👁️',
      description: 'Program pelatihan untuk jabatan pengawas yang keren abis! ✨',
      reportCount: 32,
      gradient: 'from-blue-500 via-cyan-500 to-teal-500'
    },
    {
      id: 'pka',
      name: 'PKA (Administrator)',
      type: 'category',
      icon: '⚙️',
      description: 'Program pelatihan untuk jabatan administrator yang epic! 🚀',
      reportCount: 28,
      gradient: 'from-green-500 via-emerald-500 to-cyan-500'
    },
    {
      id: 'latsar',
      name: 'Latsar CPNS',
      type: 'category',
      icon: '🎓',
      description: 'Pelatihan Dasar CPNS yang absolutely amazing! 💫',
      reportCount: 67,
      gradient: 'from-orange-500 via-yellow-500 to-amber-500'
    },

    // PKN Years
    { id: 'pkn-2024', name: '2024', type: 'year', parentId: 'pkn', year: '2024', reportCount: 15, gradient: 'from-purple-400 to-pink-400' },
    { id: 'pkn-2023', name: '2023', type: 'year', parentId: 'pkn', year: '2023', reportCount: 18, gradient: 'from-purple-400 to-pink-400' },
    { id: 'pkn-2022', name: '2022', type: 'year', parentId: 'pkn', year: '2022', reportCount: 12, gradient: 'from-purple-400 to-pink-400' },

    // PKN 2024 Batches
    { id: 'pkn-2024-i', name: 'Angkatan I', type: 'batch', parentId: 'pkn-2024', batch: 'I', reportCount: 5, gradient: 'from-pink-400 to-rose-400' },
    { id: 'pkn-2024-ii', name: 'Angkatan II', type: 'batch', parentId: 'pkn-2024', batch: 'II', reportCount: 6, gradient: 'from-pink-400 to-rose-400' },
    { id: 'pkn-2024-iii', name: 'Angkatan III', type: 'batch', parentId: 'pkn-2024', batch: 'III', reportCount: 4, gradient: 'from-pink-400 to-rose-400' },

    // PKP Years
    { id: 'pkp-2024', name: '2024', type: 'year', parentId: 'pkp', year: '2024', reportCount: 12, gradient: 'from-blue-400 to-cyan-400' },
    { id: 'pkp-2023', name: '2023', type: 'year', parentId: 'pkp', year: '2023', reportCount: 20, gradient: 'from-blue-400 to-cyan-400' },

    // PKP 2024 Batches
    { id: 'pkp-2024-i', name: 'Angkatan I', type: 'batch', parentId: 'pkp-2024', batch: 'I', reportCount: 6, gradient: 'from-cyan-400 to-teal-400' },
    { id: 'pkp-2024-ii', name: 'Angkatan II', type: 'batch', parentId: 'pkp-2024', batch: 'II', reportCount: 6, gradient: 'from-cyan-400 to-teal-400' },

    // PKA Years
    { id: 'pka-2024', name: '2024', type: 'year', parentId: 'pka', year: '2024', reportCount: 10, gradient: 'from-green-400 to-emerald-400' },
    { id: 'pka-2023', name: '2023', type: 'year', parentId: 'pka', year: '2023', reportCount: 18, gradient: 'from-green-400 to-emerald-400' },

    // PKA 2024 Batches
    { id: 'pka-2024-i', name: 'Angkatan I', type: 'batch', parentId: 'pka-2024', batch: 'I', reportCount: 5, gradient: 'from-emerald-400 to-cyan-400' },
    { id: 'pka-2024-ii', name: 'Angkatan II', type: 'batch', parentId: 'pka-2024', batch: 'II', reportCount: 5, gradient: 'from-emerald-400 to-cyan-400' },

    // Latsar Years
    { id: 'latsar-2024', name: '2024', type: 'year', parentId: 'latsar', year: '2024', reportCount: 25, gradient: 'from-orange-400 to-yellow-400' },
    { id: 'latsar-2023', name: '2023', type: 'year', parentId: 'latsar', year: '2023', reportCount: 42, gradient: 'from-orange-400 to-yellow-400' },

    // Latsar 2024 Batches
    { id: 'latsar-2024-i', name: 'Angkatan I', type: 'batch', parentId: 'latsar-2024', batch: 'I', reportCount: 8, gradient: 'from-yellow-400 to-amber-400' },
    { id: 'latsar-2024-ii', name: 'Angkatan II', type: 'batch', parentId: 'latsar-2024', batch: 'II', reportCount: 9, gradient: 'from-yellow-400 to-amber-400' },
    { id: 'latsar-2024-iii', name: 'Angkatan III', type: 'batch', parentId: 'latsar-2024', batch: 'III', reportCount: 8, gradient: 'from-yellow-400 to-amber-400' },
  ]

  // Mock reports data
  const mockReports: Report[] = [
    {
      id: 'report-1',
      title: 'Analisis Kepemimpinan Transformasional dalam Era Digital 🚀',
      abstract: 'Penelitian ini mengkaji penerapan gaya kepemimpinan transformasional dalam menghadapi tantangan digitalisasi di sektor publik. Studi dilakukan terhadap 50 pemimpin di berbagai instansi pemerintah dengan fokus pada adaptasi teknologi dan perubahan organisasi yang absolutely mind-blowing! 🤯',
      cover: '/api/placeholder/300/400',
      author: 'Ahmad Suryanto, S.Sos., M.AP',
      date: '2024-03-15',
      category: 'PKN',
      year: '2024',
      batch: 'I'
    },
    {
      id: 'report-2',
      title: 'Implementasi Good Governance dalam Pelayanan Publik ✨',
      abstract: 'Laporan ini membahas implementasi prinsip-prinsip good governance dalam meningkatkan kualitas pelayanan publik. Penelitian dilakukan di 3 kabupaten dengan menganalisis tingkat kepuasan masyarakat dan efektivitas pelayanan yang totally amazing! 💫',
      cover: '/api/placeholder/300/400',
      author: 'Siti Nurhaliza, S.AP., M.Si',
      date: '2024-03-20',
      category: 'PKN',
      year: '2024',
      batch: 'I'
    },
    {
      id: 'report-3',
      title: 'Strategi Pengawasan Berbasis Risiko di Era New Normal 🔥',
      abstract: 'Studi tentang pengembangan strategi pengawasan yang efektif dengan pendekatan berbasis risiko, khususnya dalam menghadapi tantangan pasca pandemi COVID-19. Mencakup analisis terhadap 25 unit kerja di lingkungan pemerintah daerah yang super innovative! 🌟',
      cover: '/api/placeholder/300/400',
      author: 'Budi Santoso, S.E., M.M',
      date: '2024-04-10',
      category: 'PKP',
      year: '2024',
      batch: 'I'
    },
    {
      id: 'report-4',
      title: 'Optimalisasi Sistem Administrasi Kepegawaian Digital 💻',
      abstract: 'Penelitian ini menganalisis implementasi sistem administrasi kepegawaian digital dalam meningkatkan efisiensi dan akurasi data kepegawaian. Studi kasus dilakukan di 5 instansi pemerintah dengan fokus pada digitalisasi proses administrasi yang next level! 🚀',
      cover: '/api/placeholder/300/400',
      author: 'Dewi Kartika, S.Kom., M.T.I',
      date: '2024-04-25',
      category: 'PKA',
      year: '2024',
      batch: 'I'
    },
    {
      id: 'report-5',
      title: 'Pengembangan Kompetensi ASN Melalui Pembelajaran Digital 📚',
      abstract: 'Laporan tentang efektivitas program pengembangan kompetensi ASN melalui platform pembelajaran digital. Penelitian melibatkan 200 peserta dari berbagai instansi dengan evaluasi terhadap peningkatan kompetensi dan kinerja yang absolutely incredible! 🎯',
      cover: '/api/placeholder/300/400',
      author: 'Rina Marlina, S.Pd., M.Ed',
      date: '2024-05-05',
      category: 'Latsar CPNS',
      year: '2024',
      batch: 'I'
    }
  ]

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    // Initialize with main categories
    if (currentPath.length === 0) {
      const categories = mockData.filter(item => item.type === 'category')
      setCurrentItems(categories)
      setBreadcrumb([{ id: 'root', name: 'Koleksi Digital' }])
    }
  }, [])

  const navigateToFolder = (folderId: string, folderName: string) => {
    const newPath = [...currentPath, folderId]
    setCurrentPath(newPath)

    const newBreadcrumb = [...breadcrumb, { id: folderId, name: folderName }]
    setBreadcrumb(newBreadcrumb)

    // Get children of the selected folder
    const children = mockData.filter(item => item.parentId === folderId)

    if (children.length > 0) {
      setCurrentItems(children)
    } else {
      // If no children, show reports for this batch
      const currentFolder = mockData.find(item => item.id === folderId)
      if (currentFolder?.type === 'batch') {
        // Show reports for this specific batch
        const batchReports = mockReports.filter(report => {
          const pathParts = newPath
          const category = pathParts[0]
          const year = pathParts[1]?.split('-')[1]
          const batch = currentFolder.batch

          return report.category.toLowerCase().replace(/\s+/g, '').includes(category) &&
            report.year === year &&
            report.batch === batch
        })

        // Convert reports to folder structure format for display
        const reportItems: FolderStructure[] = batchReports.map(report => ({
          id: report.id,
          name: report.title,
          type: 'report',
          parentId: folderId,
          abstract: report.abstract,
          cover: report.cover,
          author: report.author,
          date: report.date,
          gradient: 'from-indigo-400 to-purple-400'
        }))

        setCurrentItems(reportItems)
      }
    }
  }

  const navigateBack = (targetIndex: number) => {
    if (targetIndex === 0) {
      // Back to root
      setCurrentPath([])
      const categories = mockData.filter(item => item.type === 'category')
      setCurrentItems(categories)
      setBreadcrumb([{ id: 'root', name: 'Koleksi Digital' }])
    } else {
      const newPath = currentPath.slice(0, targetIndex)
      const newBreadcrumb = breadcrumb.slice(0, targetIndex + 1)
      setCurrentPath(newPath)
      setBreadcrumb(newBreadcrumb)

      const targetId = newPath[newPath.length - 1]
      const children = mockData.filter(item => item.parentId === targetId)
      setCurrentItems(children)
    }
  }

  const openReport = (reportId: string) => {
    const report = mockReports.find(r => r.id === reportId)
    if (report) {
      setSelectedReport(report)
    }
  }

  const closeReport = () => {
    setSelectedReport(null)
  }

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
          <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-pink-400 opacity-20"></div>
        </div>
      </div>
    )
  }

  if (selectedReport) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6" onContextMenu={(e) => e.preventDefault()}>
        {/* Floating decorative elements */}
        <div className="fixed top-20 left-10 h-20 w-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse blur-xl" />
        <div className="fixed top-40 right-20 h-16 w-16 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse blur-xl" />

        <div className="mb-8 flex items-center gap-4">
          <Button
            variant="outline"
            onClick={closeReport}
            className="bg-white/70 backdrop-blur-md border-white/20 hover:bg-white/90 transition-all duration-300 rounded-2xl shadow-lg hover:shadow-xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali ke Koleksi ✨
          </Button>
        </div>

        <div className="max-w-6xl mx-auto">
          <Card className="overflow-hidden bg-white/70 backdrop-blur-md border-0 shadow-2xl rounded-3xl">
            <CardHeader className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <BookOpen className="h-8 w-8" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-3xl font-bold mb-2">{selectedReport.title}</CardTitle>
                  <CardDescription className="text-blue-100 text-lg">
                    Oleh: {selectedReport.author} • {new Date(selectedReport.date).toLocaleDateString('id-ID')} ✨
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Star className="h-6 w-6 text-yellow-300 animate-pulse" />
                  <Sparkles className="h-6 w-6 text-pink-300 animate-bounce" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-1">
                  <div className="relative group">
                    <img
                      src={selectedReport.cover}
                      alt="Cover Laporan"
                      className="w-full rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105"
                      onContextMenu={(e) => e.preventDefault()}
                      draggable={false}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
                  </div>
                  <div className="mt-6 space-y-4">
                    <Badge className={`w-full justify-center py-2 text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 rounded-xl`}>
                      {selectedReport.category} 🎯
                    </Badge>
                    <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl">
                      <div className="text-lg font-bold text-gray-800">
                        {selectedReport.year} • Angkatan {selectedReport.batch} 🚀
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Abstrak 📖
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {selectedReport.abstract}
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6">
                      <div className="flex items-center gap-3 text-yellow-800 mb-3">
                        <Eye className="h-5 w-5" />
                        <span className="font-bold text-lg">Mode Baca Saja 👀</span>
                        <Zap className="h-5 w-5 animate-pulse" />
                      </div>
                      <p className="text-yellow-700 text-base">
                        Dokumen ini hanya dapat dibaca dan tidak dapat diunduh atau disalin. Stay respectful! 😎
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const filteredItems = currentItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 h-20 w-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed top-40 right-20 h-16 w-16 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed bottom-40 left-20 h-24 w-24 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full animate-pulse blur-xl" />

      {/* Header with Gen Z vibes */}
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Koleksi Digital ✨
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Jelajahi koleksi laporan yang tersedia secara terstruktur dan absolutely amazing! 🚀
        </p>
      </div>

      {/* Modern Breadcrumb */}
      <div className="mb-8">
        <nav className="flex items-center justify-center">
          <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-white/20">
            {breadcrumb.map((crumb, index) => (
              <div key={crumb.id} className="flex items-center">
                {index > 0 && <span className="mx-3 text-purple-400">✨</span>}
                <button
                  onClick={() => navigateBack(index)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${index === breadcrumb.length - 1
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-lg'
                    : 'text-gray-600 hover:bg-white/50 hover:text-purple-600'
                    }`}
                >
                  {crumb.name}
                </button>
              </div>
            ))}
          </div>
        </nav>
      </div>

      {/* Trendy Search */}
      <div className="mb-10 flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-400 h-5 w-5" />
          <Input
            placeholder="Cari koleksi atau laporan yang epic... 🔍"
            className="pl-12 pr-6 py-4 text-lg bg-white/70 backdrop-blur-md border-white/20 rounded-2xl shadow-lg focus:shadow-xl transition-all duration-300 focus:ring-2 focus:ring-purple-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Ultra Modern Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredItems.map((item, index) => (
          <Card
            key={item.id}
            className="group overflow-hidden bg-white/60 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer rounded-3xl hover:scale-105 hover:-translate-y-2"
            onClick={() => item.type === 'report' ? openReport(item.id) : navigateToFolder(item.id, item.name)}
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            <CardHeader className="pb-4 p-6 relative">
              <div className="flex items-center gap-4">
                {item.type === 'category' && (
                  <div className={`text-3xl p-4 rounded-2xl bg-gradient-to-r ${item.gradient} shadow-lg`}>
                    {item.icon}
                  </div>
                )}
                {item.type === 'year' && (
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${item.gradient} shadow-lg`}>
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                )}
                {item.type === 'batch' && (
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${item.gradient} shadow-lg`}>
                    <Users className="h-6 w-6 text-white" />
                  </div>
                )}
                {item.type === 'report' && (
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${item.gradient} shadow-lg`}>
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <CardTitle className="text-lg font-bold leading-tight text-gray-800 group-hover:text-purple-600 transition-colors">
                    {item.name}
                  </CardTitle>
                  {item.description && (
                    <CardDescription className="text-sm mt-2 text-gray-600">
                      {item.description}
                    </CardDescription>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 px-6 pb-6">
              {item.type === 'report' ? (
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 line-clamp-3">{item.abstract}</p>
                  <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                    Oleh: {item.author} • {item.date && new Date(item.date).toLocaleDateString('id-ID')}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FolderOpen className="h-4 w-4 text-purple-400" />
                    <span className="text-sm text-gray-600 font-medium">
                      {item.reportCount} {item.type === 'category' ? 'total laporan' : 'laporan'} 📚
                    </span>
                  </div>
                  {item.type === 'category' && (
                    <Badge className={`bg-gradient-to-r ${item.gradient} text-white border-0 rounded-full px-3 py-1 text-xs font-bold`}>
                      {item.reportCount}
                    </Badge>
                  )}
                </div>
              )}
            </CardContent>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-3xl" />
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-16">
          <div className="text-gray-400 mb-6">
            <div className="relative inline-block">
              <FolderOpen className="h-20 w-20 mx-auto" />
              <div className="absolute -top-2 -right-2 text-2xl animate-bounce">😢</div>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Oops! Tidak ada item ditemukan</h3>
          <p className="text-gray-500 text-lg">Coba ubah kata kunci pencarian Anda atau explore kategori lain! ✨</p>
        </div>
      )}
    </div>
  )
}
