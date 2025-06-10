"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
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
  FolderOpen,
  Filter,
  X
} from 'lucide-react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { useAuth } from '@/hooks/use-auth'
import { useCollectionSearch } from '@/hooks/use-collection-search'
import { HighlightText } from '@/components/common/highlight-text'
import { ModernLoadingState } from '@/components/common/loading-state'
import { ModernErrorState } from '@/components/common/error-state'
import { PDFPreview } from '@/components/common/pdf-preview'

// Types
interface ReportData {
  id: string
  title: string
  description: string | null
  content: string
  cover_image_url?: string | null
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
  image_url?: string | null
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

export default function CollectionsPage() {
  const { user, isAuthenticated, loading: authLoading } = useAuth()
  const router = useRouter()
  const [selectedDocument, setSelectedDocument] = useState<ReportData | CollectionData | null>(null)
  const [documentViewerOpen, setDocumentViewerOpen] = useState(false)

  const {
    searchTerm,
    setSearchTerm,
    filters,
    updateFilters,
    resetFilters,
    results,
    loading: searchLoading,
    error: searchError
  } = useCollectionSearch()

  // Redirect if not authenticated
  if (!authLoading && !isAuthenticated) {
    router.push("/login")
    return null
  }

  const handleDocumentView = (document: ReportData | CollectionData) => {
    setSelectedDocument(document)
    setDocumentViewerOpen(true)
  }

  const loading = authLoading || searchLoading

  if (loading) {
    return <ModernLoadingState message="Loading collections..." />
  }

  if (searchError) {
    return (
      <ModernErrorState
        message={searchError}
        onRetry={() => {
          // Retry search
          updateFilters({ ...filters })
        }}
      />
    )
  }

  return (
    <div className="container mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Digital Collections</h1>
        <p className="text-muted-foreground">
          Browse and search through our digital collection of reports and documents
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by title, type, year, or batch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={resetFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            Reset
          </Button>
        </div>

        <div className="flex flex-wrap gap-4">
          <Select
            value={filters.type}
            onValueChange={(value) => updateFilters({ type: value as any })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Document Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Documents</SelectItem>
              <SelectItem value="reports">Reports Only</SelectItem>
              <SelectItem value="collections">Collections Only</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.category || ''}
            onValueChange={(value) => updateFilters({ category: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="PKN">PKN</SelectItem>
              <SelectItem value="PKP">PKP</SelectItem>
              <SelectItem value="PKA">PKA</SelectItem>
              <SelectItem value="LATSAR">LATSAR CPNS</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.year || ''}
            onValueChange={(value) => updateFilters({ year: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Years</SelectItem>
              {Array.from({ length: 5 }, (_, i) => {
                const year = new Date().getFullYear() - i
                return (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>

          <Select
            value={filters.batch || ''}
            onValueChange={(value) => updateFilters({ batch: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Batches</SelectItem>
              {Array.from({ length: 12 }, (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  Batch {i + 1}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {results ? (
          <>
            {/* Reports Section */}
            {results.reports.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Reports</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {results.reports.map((report) => (
                    <Card
                      key={report.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleDocumentView(report)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium">
                              <HighlightText
                                text={report.title}
                                highlight={searchTerm}
                              />
                            </h3>
                            {report.description && (
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                <HighlightText
                                  text={report.description}
                                  highlight={searchTerm}
                                />
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline">{report.category}</Badge>
                              <Badge variant="secondary">
                                {format(new Date(report.created_at), 'yyyy', { locale: id })}
                              </Badge>
                              <Badge variant="secondary">
                                Batch {report.batch}
                              </Badge>
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

            {/* Collections Section */}
            {results.collections.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Collections</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {results.collections.map((collection) => (
                    <Card
                      key={collection.id}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleDocumentView(collection)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-medium">
                              <HighlightText
                                text={collection.title}
                                highlight={searchTerm}
                              />
                            </h3>
                            {collection.description && (
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                <HighlightText
                                  text={collection.description}
                                  highlight={searchTerm}
                                />
                              </p>
                            )}
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant={collection.is_public ? 'default' : 'secondary'}>
                                {collection.is_public ? 'Public' : 'Private'}
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

            {/* No Results */}
            {results.reports.length === 0 && results.collections.length === 0 && (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No results found</h3>
                <p className="text-gray-500 mt-2">
                  Try adjusting your search or filters to find what you're looking for
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Start searching</h3>
            <p className="text-gray-500 mt-2">
              Use the search bar above to find reports and collections
            </p>
          </div>
        )}
      </div>

      {/* Document Viewer Dialog */}
      <Dialog open={documentViewerOpen} onOpenChange={setDocumentViewerOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedDocument?.title}</DialogTitle>
            <DialogDescription>
              {selectedDocument?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {selectedDocument && (
              <PDFPreview
                url={`/api/documents/${selectedDocument.id}/preview`}
                token={user?.id} // Use user ID as token for authentication
                onError={(error) => {
                  console.error('PDF preview error:', error)
                  // You could show a toast notification here
                }}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
