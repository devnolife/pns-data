"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  FileText, 
  Image as ImageIcon, 
  File, 
  Eye, 
  Download, 
  Grid3X3, 
  List,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { FilePreviewButton, FileTypeIndicator } from './file-preview-button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface FileAttachment {
  id: string
  filename: string
  original_name: string
  file_size: number
  mime_type: string
  file_type?: string | null
  category: string | null
  year: string | null
  batch: string | null
}

interface FilePreviewGalleryProps {
  files: FileAttachment[]
  title?: string
  isPublicAccess?: boolean
  showDownloadOption?: boolean
  viewMode?: 'grid' | 'list'
  showFilters?: boolean
  className?: string
}

export function FilePreviewGallery({
  files,
  title = "File Attachments",
  isPublicAccess = true,
  showDownloadOption = false,
  viewMode: initialViewMode = 'grid',
  showFilters = true,
  className = ''
}: FilePreviewGalleryProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(initialViewMode)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  // Filter and search files
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.original_name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === 'all' || 
      (filterType === 'pdf' && file.mime_type.includes('pdf')) ||
      (filterType === 'image' && file.mime_type.startsWith('image/')) ||
      (filterType === 'other' && !file.mime_type.includes('pdf') && !file.mime_type.startsWith('image/'))
    
    return matchesSearch && matchesType
  })

  // Pagination
  const totalPages = Math.ceil(filteredFiles.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedFiles = filteredFiles.slice(startIndex, startIndex + itemsPerPage)

  // File type statistics
  const fileStats = {
    total: files.length,
    pdf: files.filter(f => f.mime_type.includes('pdf')).length,
    image: files.filter(f => f.mime_type.startsWith('image/')).length,
    other: files.filter(f => !f.mime_type.includes('pdf') && !f.mime_type.startsWith('image/')).length
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getTotalSize = () => {
    const totalBytes = files.reduce((sum, file) => sum + file.file_size, 0)
    return formatFileSize(totalBytes)
  }

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-200/50">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-600 font-normal">
                  {filteredFiles.length} of {files.length} files • {getTotalSize()} total
                </p>
              </div>
            </CardTitle>
          </div>
          
          {/* View Mode Toggle */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white rounded-lg border border-gray-200 p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="h-8 w-8 p-0"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="h-8 w-8 p-0"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* File Statistics */}
        <div className="flex items-center gap-4 mt-4">
          <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
            <FileText className="h-3 w-3 mr-1" />
            {fileStats.pdf} PDFs
          </Badge>
          <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700">
            <ImageIcon className="h-3 w-3 mr-1" />
            {fileStats.image} Images
          </Badge>
          <Badge variant="outline" className="bg-gray-50 border-gray-200 text-gray-700">
            <File className="h-3 w-3 mr-1" />
            {fileStats.other} Others
          </Badge>
        </div>

        {/* Search and Filters */}
        {showFilters && (
          <div className="flex items-center gap-4 mt-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setCurrentPage(1)
                }}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={(value) => {
              setFilterType(value)
              setCurrentPage(1)
            }}>
              <SelectTrigger className="w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Files</SelectItem>
                <SelectItem value="pdf">PDF Files</SelectItem>
                <SelectItem value="image">Images</SelectItem>
                <SelectItem value="other">Other Files</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </CardHeader>

      <CardContent className="p-6">
        {paginatedFiles.length === 0 ? (
          <div className="text-center py-12">
            <File className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No Files Found</h3>
            <p className="text-gray-500">
              {searchQuery || filterType !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'No files have been uploaded yet.'
              }
            </p>
          </div>
        ) : (
          <>
            {/* File Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedFiles.map((file) => (
                  <FilePreviewButton
                    key={file.id}
                    file={file}
                    variant="card"
                    isPublicAccess={isPublicAccess}
                    showDownloadOption={showDownloadOption}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {paginatedFiles.map((file) => (
                  <div key={file.id} className="flex items-center gap-4 p-4 bg-gray-50/50 hover:bg-blue-50/50 rounded-lg border border-gray-200/50 hover:border-blue-300/50 transition-all duration-300">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-200 rounded-lg flex items-center justify-center">
                        {file.mime_type.includes('pdf') ? (
                          <FileText className="h-5 w-5 text-red-600" />
                        ) : file.mime_type.startsWith('image/') ? (
                          <ImageIcon className="h-5 w-5 text-green-600" />
                        ) : (
                          <File className="h-5 w-5 text-gray-600" />
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 truncate">{file.original_name}</h4>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                        <span>{formatFileSize(file.file_size)}</span>
                        <span>•</span>
                        <span className="capitalize">{file.mime_type.split('/')[1]}</span>
                        {file.year && (
                          <>
                            <span>•</span>
                            <span>Tahun {file.year}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      <FileTypeIndicator file={file} />
                    </div>
                    
                    <div className="flex-shrink-0">
                      <FilePreviewButton
                        file={file}
                        variant="compact"
                        isPublicAccess={isPublicAccess}
                        showDownloadOption={showDownloadOption}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredFiles.length)} of {filteredFiles.length} files
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const pageNum = i + 1
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(pageNum)}
                          className="w-8 h-8 p-0"
                        >
                          {pageNum}
                        </Button>
                      )
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
