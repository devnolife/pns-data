"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import {
  Search,
  FileText,
  Calendar,
  User,
  ArrowLeft,
  BookOpen,
  GraduationCap,
  Users,
  Eye,
  Shield,
  Clock,
  ChevronRight,
  Folder,
  FolderOpen
} from 'lucide-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import {
  getUserReportsByCategoryAction,
  getUserCollectionsByCategoryAction,
  getReportsByAngkatanAction,
  getReportByIdAction,
  getCollectionByIdAction,
  searchUserDocumentsAction
} from '@/lib/actions/documents'

// Types
interface ReportData {
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
  author: {
    name: string | null
    username: string
    training?: string | null
    angkatan?: string | null
  }
}

interface CollectionData {
  id: string
  title: string
  description: string | null
  content: string
  image_url: string | null
  category: string | null
  tags: string | null
  is_public: boolean
  author_id: string
  created_at: Date
  updated_at: Date
  author: {
    name: string | null
    username: string
  }
}

interface AngkatanData {
  id: string
  angkatan: string
  reports: ReportData[]
  totalReports: number
}

interface YearData {
  id: string
  year: string
  angkatan: AngkatanData[]
  totalReports: number
}

interface CategoryData {
  id: string
  name: string
  description: string
  years?: YearData[]
  collections?: CollectionData[]
  totalReports?: number
  totalCollections?: number
}

type ViewMode = 'categories' | 'years' | 'angkatan' | 'reports' | 'collections'

export default function DigitalCollectionPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('categories')
  const [categories, setCategories] = useState<CategoryData[]>([])
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null)
  const [selectedYear, setSelectedYear] = useState<YearData | null>(null)
  const [selectedAngkatan, setSelectedAngkatan] = useState<AngkatanData | null>(null)
  const [reports, setReports] = useState<ReportData[]>([])
  const [collections, setCollections] = useState<CollectionData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<{ collections: CollectionData[], reports: ReportData[] } | null>(null)
  const [selectedDocument, setSelectedDocument] = useState<ReportData | CollectionData | null>(null)
  const [documentViewerOpen, setDocumentViewerOpen] = useState(false)

  // Load initial data
  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    setLoading(true)
    try {
      const [reportsResult, collectionsResult] = await Promise.all([
        getUserReportsByCategoryAction(),
        getUserCollectionsByCategoryAction()
      ])

      if (reportsResult.success && collectionsResult.success && reportsResult.data && collectionsResult.data) {
        // Merge reports and collections data
        const mergedCategories = reportsResult.data.categories.map(reportCat => {
          const collectionCat = collectionsResult.data!.categories.find(c => c.id === reportCat.id)
          return {
            ...reportCat,
            collections: collectionCat?.collections || [],
            totalCollections: collectionCat?.totalCollections || 0
          }
        })
        setCategories(mergedCategories)
      }
    } catch (error) {
      console.error('Error loading categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategorySelect = (category: CategoryData) => {
    setSelectedCategory(category)
    setViewMode('years')
  }

  const handleYearSelect = (year: YearData) => {
    setSelectedYear(year)
    setViewMode('angkatan')
  }

  const handleAngkatanSelect = async (angkatan: AngkatanData) => {
    if (!selectedCategory || !selectedYear) return

    setLoading(true)
    try {
      const result = await getReportsByAngkatanAction(
        selectedCategory.id,
        selectedYear.year,
        angkatan.angkatan
      )

      if (result.success && result.data) {
        setReports(result.data.reports)
        setSelectedAngkatan(angkatan)
        setViewMode('reports')
      }
    } catch (error) {
      console.error('Error loading reports:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCollectionsView = (category: CategoryData) => {
    setSelectedCategory(category)
    setCollections(category.collections || [])
    setViewMode('collections')
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults(null)
      return
    }

    setLoading(true)
    try {
      const result = await searchUserDocumentsAction(searchQuery)
      if (result.success && result.data) {
        setSearchResults(result.data)
      }
    } catch (error) {
      console.error('Error searching documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDocumentView = async (document: ReportData | CollectionData) => {
    setLoading(true)
    try {
      let result
      if ('status' in document) {
        // It's a report
        result = await getReportByIdAction(document.id)
      } else {
        // It's a collection
        result = await getCollectionByIdAction(document.id)
      }

      if (result.success && result.data) {
        setSelectedDocument(result.data)
        setDocumentViewerOpen(true)
      }
    } catch (error) {
      console.error('Error loading document:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBack = () => {
    if (viewMode === 'reports') {
      setViewMode('angkatan')
      setReports([])
      setSelectedAngkatan(null)
    } else if (viewMode === 'angkatan') {
      setViewMode('years')
      setSelectedYear(null)
    } else if (viewMode === 'years' || viewMode === 'collections') {
      setViewMode('categories')
      setSelectedCategory(null)
      setCollections([])
    }
  }

  const getBreadcrumb = () => {
    const parts = ['Digital Collection']
    if (selectedCategory) parts.push(selectedCategory.name)
    if (selectedYear) parts.push(`Tahun ${selectedYear.year}`)
    if (selectedAngkatan) parts.push(`Angkatan ${selectedAngkatan.angkatan}`)
    return parts.join(' / ')
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'COMPLETED': { label: 'Selesai', variant: 'default' as const },
      'IN_PROGRESS': { label: 'Proses', variant: 'secondary' as const },
      'PENDING': { label: 'Pending', variant: 'outline' as const },
      'REJECTED': { label: 'Ditolak', variant: 'destructive' as const }
    }
    const config = statusConfig[status as keyof typeof statusConfig] || { label: status, variant: 'outline' as const }
    return <Badge variant={config.variant}>{config.label}</Badge>
  }

  if (loading && viewMode === 'categories') {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat koleksi digital...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Digital Collection</h1>
            <p className="text-gray-600 mt-1">{getBreadcrumb()}</p>
          </div>
          {viewMode !== 'categories' && (
            <Button onClick={handleBack} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="flex gap-2 max-w-md">
          <Input
            placeholder="Cari dokumen, laporan, atau koleksi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch} className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Cari
          </Button>
        </div>
      </div>

      {/* Search Results */}
      {searchResults && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Hasil Pencarian
            </CardTitle>
            <CardDescription>
              Ditemukan {searchResults.reports.length} laporan dan {searchResults.collections.length} koleksi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.reports.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Laporan</h3>
                  <div className="grid gap-3">
                    {searchResults.reports.map((report) => (
                      <Card key={report.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleDocumentView(report)}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium">{report.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{report.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                {getStatusBadge(report.status)}
                                <Badge variant="outline">{report.category}</Badge>
                                <span className="text-xs text-gray-500">
                                  {format(new Date(report.created_at), 'dd MMM yyyy', { locale: id })}
                                </span>
                              </div>
                            </div>
                            <Eye className="h-4 w-4 text-gray-400" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.collections.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-2">Koleksi</h3>
                  <div className="grid gap-3">
                    {searchResults.collections.map((collection) => (
                      <Card key={collection.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleDocumentView(collection)}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium">{collection.title}</h4>
                              <p className="text-sm text-gray-600 mt-1">{collection.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <Badge variant={collection.is_public ? 'default' : 'secondary'}>
                                  {collection.is_public ? 'Publik' : 'Privat'}
                                </Badge>
                                <Badge variant="outline">{collection.category}</Badge>
                                <span className="text-xs text-gray-500">
                                  {format(new Date(collection.created_at), 'dd MMM yyyy', { locale: id })}
                                </span>
                              </div>
                            </div>
                            <BookOpen className="h-4 w-4 text-gray-400" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Categories View */}
      {viewMode === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
          {categories.map((category) => (
            <Card key={category.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                    <GraduationCap className="h-6 w-6 text-white" />
                  </div>
                  {category.name}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{category.totalReports || 0}</div>
                      <div className="text-sm text-gray-600">Laporan</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{category.totalCollections || 0}</div>
                      <div className="text-sm text-gray-600">Koleksi</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleCategorySelect(category)}
                      className="flex-1 flex items-center gap-2"
                      disabled={!category.totalReports}
                    >
                      <FileText className="h-4 w-4" />
                      Lihat Laporan
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleCollectionsView(category)}
                      variant="outline"
                      className="flex-1 flex items-center gap-2"
                      disabled={!category.totalCollections}
                    >
                      <BookOpen className="h-4 w-4" />
                      Lihat Koleksi
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Years View */}
      {viewMode === 'years' && selectedCategory && (
        <div className="space-y-4 pb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Folder className="h-5 w-5" />
                Pilih Tahun - {selectedCategory.name}
              </CardTitle>
              <CardDescription>
                Pilih tahun untuk melihat laporan berdasarkan angkatan
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedCategory.years && selectedCategory.years.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedCategory.years.map((year) => (
                    <Card key={year.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleYearSelect(year)}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-5 w-5 text-blue-600" />
                              <h3 className="font-semibold text-lg">Tahun {year.year}</h3>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {year.angkatan.length} angkatan tersedia
                            </p>
                            <p className="text-sm text-gray-600">
                              {year.totalReports} total laporan
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Belum ada laporan untuk kategori ini</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Angkatan View */}
      {viewMode === 'angkatan' && selectedYear && (
        <div className="space-y-4 pb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Pilih Angkatan - Tahun {selectedYear.year}
              </CardTitle>
              <CardDescription>
                Pilih angkatan untuk melihat daftar laporan
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedYear.angkatan && selectedYear.angkatan.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedYear.angkatan.map((angkatan) => (
                    <Card key={angkatan.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleAngkatanSelect(angkatan)}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <GraduationCap className="h-5 w-5 text-purple-600" />
                              <h3 className="font-semibold text-lg">Angkatan {angkatan.angkatan}</h3>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              {angkatan.totalReports} laporan tersedia
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Belum ada angkatan untuk tahun ini</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reports List View */}
      {viewMode === 'reports' && (
        <div className="space-y-4 pb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Daftar Laporan -  Angkatan {selectedAngkatan?.angkatan}
              </CardTitle>
              <CardDescription>
                {reports.length} laporan ditemukan
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reports.length > 0 ? (
                <div className="grid gap-4">
                  {reports.map((report) => (
                    <Card key={report.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleDocumentView(report)}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{report.title}</h3>
                            <p className="text-gray-600 mb-3 line-clamp-2">{report.description}</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              {getStatusBadge(report.status)}
                              <Badge variant="outline">{report.category}</Badge>
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <User className="h-3 w-3" />
                                {report.author.name || report.author.username}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Clock className="h-3 w-3" />
                                {format(new Date(report.created_at), 'dd MMM yyyy', { locale: id })}
                              </div>
                            </div>
                          </div>
                          <Eye className="h-5 w-5 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Belum ada laporan untuk angkatan ini</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Collections View */}
      {viewMode === 'collections' && (
        <div className="space-y-4 pb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Koleksi - {selectedCategory?.name}
              </CardTitle>
              <CardDescription>
                {collections.length} koleksi ditemukan
              </CardDescription>
            </CardHeader>
            <CardContent>
              {collections.length > 0 ? (
                <div className="grid gap-4">
                  {collections.map((collection) => (
                    <Card key={collection.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleDocumentView(collection)}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">{collection.title}</h3>
                            <p className="text-gray-600 mb-3 line-clamp-2">{collection.description}</p>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant={collection.is_public ? 'default' : 'secondary'}>
                                {collection.is_public ? 'Publik' : 'Privat'}
                              </Badge>
                              <Badge variant="outline">{collection.category}</Badge>
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <User className="h-3 w-3" />
                                {collection.author.name || collection.author.username}
                              </div>
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Clock className="h-3 w-3" />
                                {format(new Date(collection.created_at), 'dd MMM yyyy', { locale: id })}
                              </div>
                            </div>
                          </div>
                          <BookOpen className="h-5 w-5 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Belum ada koleksi untuk kategori ini</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Document Viewer Dialog */}
      <Dialog open={documentViewerOpen} onOpenChange={setDocumentViewerOpen}>
        <DialogContent
          className="max-w-5xl max-h-[80vh] w-[95vw] z-50 p-0 gap-0 bg-white/95 backdrop-blur-xl border-0 shadow-2xl"
          style={{
            position: 'fixed',
            top: '90px',
            left: '350px',
            transform: 'none',
            margin: 0,
            borderRadius: '16px',
            overflow: 'hidden'
          }}
        >
          {/* Enhanced Header with gradient background */}
          <DialogHeader className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0">
            <DialogTitle className="flex items-center gap-3 text-xl font-semibold">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-white/90 text-sm font-normal mb-1">Dokumen Digital</div>
                <div className="text-white font-semibold truncate">{selectedDocument?.title}</div>
              </div>
            </DialogTitle>
            <DialogDescription className="text-blue-100 text-sm mt-2 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Dokumen dilindungi - hanya dapat dibaca untuk menjaga keamanan
            </DialogDescription>
          </DialogHeader>

          {selectedDocument && (
            <div className="flex flex-col h-full max-h-[calc(80vh-100px)] bg-gray-50/50">
              {/* Enhanced Document Info with better layout */}
              <div className="px-6 py-4 bg-white border-b border-gray-100">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Kategori</span>
                    <Badge variant="outline" className="w-fit text-xs font-medium">
                      {selectedDocument.category}
                    </Badge>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Tanggal Dibuat</span>
                    <span className="text-sm font-medium text-gray-900">
                      {format(new Date(selectedDocument.created_at), 'dd MMM yyyy', { locale: id })}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Penulis</span>
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {selectedDocument.author.name || selectedDocument.author.username}
                    </span>
                  </div>
                  {'status' in selectedDocument && (
                    <div className="flex flex-col space-y-1">
                      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status</span>
                      {getStatusBadge(selectedDocument.status)}
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Document Description */}
              {selectedDocument.description && (
                <div className="px-6 py-4 bg-white border-b border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
                    Deskripsi Dokumen
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-200">
                    {selectedDocument.description}
                  </p>
                </div>
              )}

              {/* Enhanced Document Content with better styling */}
              <div className="flex-1 overflow-hidden px-6 py-4">
                <div className="flex items-center gap-2 mb-4 sticky top-0 bg-gray-50/80 backdrop-blur-sm py-2 -mx-6 px-6 border-b border-gray-200">
                  <div className="w-1 h-4 bg-indigo-500 rounded-full"></div>
                  <h3 className="text-sm font-semibold text-gray-700">Konten Dokumen</h3>
                </div>
                <ScrollArea className="h-full max-h-[calc(80vh-350px)] w-full">
                  <div
                    className="prose prose-sm max-w-none select-none p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
                    style={{
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none',
                      lineHeight: '1.7'
                    }}
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    dangerouslySetInnerHTML={{ __html: selectedDocument.content }}
                  />
                </ScrollArea>
              </div>

              {/* Enhanced Security Notice */}
              <div className="px-6 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-t border-amber-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-100 rounded-lg">
                    <Shield className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-amber-800">Perlindungan Keamanan Aktif</div>
                    <p className="text-xs text-amber-700 mt-1 mb-4">
                      Dokumen ini dilindungi dari penyalinan, unduhan, dan screenshot untuk menjaga kerahasiaan konten.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
