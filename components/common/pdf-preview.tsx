import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

interface PDFPreviewProps {
  url: string
  token?: string
  onError?: (error: Error) => void
}

export function PDFPreview({ url, token, onError }: PDFPreviewProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadPDF = async () => {
      try {
        setLoading(true)
        setError(null)

        // Add token to URL if provided
        const pdfUrl = token ? `${url}?token=${token}` : url

        // Load PDF using PDF.js
        const pdfjsLib = await import('pdfjs-dist')
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise
        setTotalPages(pdf.numPages)
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to load PDF')
        setError(error)
        onError?.(error)
      } finally {
        setLoading(false)
      }
    }

    loadPDF()
  }, [url, token, onError])

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <p className="text-red-500 mb-2">Failed to load PDF</p>
        <p className="text-sm text-gray-500">{error.message}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* PDF Viewer */}
      <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden">
        <iframe
          src={`${url}#page=${currentPage}${token ? `&token=${token}` : ''}`}
          className="w-full h-full"
          title="PDF Preview"
        />
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <span className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </span>

        <Button
          variant="outline"
          size="sm"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
} 
