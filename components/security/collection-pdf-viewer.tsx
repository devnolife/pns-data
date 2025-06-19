"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  FileText,
  ExternalLink,
  Shield,
  AlertTriangle,
  RefreshCw,
  Eye,
  Monitor,
  Lock,
  Users,
  BookOpen
} from 'lucide-react'

interface CollectionPDFViewerProps {
  fileUrl: string
  fileName: string
  isPublicAccess?: boolean
  className?: string
}

type ViewerMethod = 'iframe' | 'object' | 'embed' | 'external'

export function CollectionPDFViewer({
  fileUrl,
  fileName,
  isPublicAccess = true,
  className = ""
}: CollectionPDFViewerProps) {
  const [currentMethod, setCurrentMethod] = useState<ViewerMethod>('iframe')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const objectRef = useRef<HTMLObjectElement>(null)

  // Auto-detect best viewer method
  useEffect(() => {
    detectBestViewer()
  }, [])

  const detectBestViewer = async () => {
    setLoading(true)
    setError(null)

    // Test if file is accessible
    try {
      const response = await fetch(fileUrl, { method: 'HEAD' })
      if (!response.ok) {
        throw new Error(`File not accessible: ${response.status}`)
      }
    } catch (err) {
      setError('File tidak dapat diakses')
      setLoading(false)
      return
    }

    // Browser capability detection
    const userAgent = navigator.userAgent.toLowerCase()
    const isChrome = userAgent.includes('chrome')
    const isFirefox = userAgent.includes('firefox')
    const isSafari = userAgent.includes('safari') && !userAgent.includes('chrome')
    const isEdge = userAgent.includes('edge')

    // Choose best method based on browser
    if (isChrome || isEdge) {
      // Chrome/Edge prefer object tag for PDFs
      setCurrentMethod('object')
    } else if (isFirefox) {
      // Firefox works well with iframe
      setCurrentMethod('iframe')
    } else if (isSafari) {
      // Safari has mixed support
      setCurrentMethod('object')
    } else {
      // Default to iframe
      setCurrentMethod('iframe')
    }

    setLoading(false)
  }

  const handleViewerError = () => {
    console.log(`PDF viewer error with method: ${currentMethod}`)

    // Try next method
    const methods: ViewerMethod[] = ['iframe', 'object', 'embed', 'external']
    const currentIndex = methods.indexOf(currentMethod)
    const nextIndex = currentIndex + 1

    if (nextIndex < methods.length) {
      setCurrentMethod(methods[nextIndex])
      setRetryCount(prev => prev + 1)
    } else {
      setError('PDF tidak dapat ditampilkan di browser ini')
    }
  }

  const handleRetry = () => {
    setError(null)
    setRetryCount(0)
    detectBestViewer()
  }

  const renderViewer = () => {
    // Enhanced PDF URL with strict no-download parameters
    const pdfUrl = `${fileUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH&zoom=page-fit&print=0&download=0&pagemode=none`

    switch (currentMethod) {
      case 'iframe':
        return (
          <iframe
            ref={iframeRef}
            src={pdfUrl}
            className="w-full h-full border-0"
            title={fileName}
            onLoad={() => setLoading(false)}
            onError={handleViewerError}
            sandbox="allow-same-origin allow-scripts"
            allow="fullscreen"
            style={{
              pointerEvents: 'auto',
              userSelect: 'none'
            }}
          />
        )

      case 'object':
        return (
          <object
            ref={objectRef}
            data={pdfUrl}
            type="application/pdf"
            className="w-full h-full"
            onLoad={() => setLoading(false)}
            onError={handleViewerError}
          >
            <div className="p-8 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Browser tidak mendukung preview PDF</p>
              <Button onClick={() => window.open(fileUrl, '_blank')}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Buka di Tab Baru
              </Button>
            </div>
          </object>
        )

      case 'embed':
        return (
          <embed
            src={pdfUrl}
            type="application/pdf"
            className="w-full h-full"
            onLoad={() => setLoading(false)}
            onError={handleViewerError}
          />
        )

      case 'external':
      default:
        return (
          <div className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="relative mb-6">
                <BookOpen className="h-24 w-24 text-blue-500 mx-auto mb-4" />
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2">
                  <Lock className="h-4 w-4" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">PDF Siap Ditampilkan</h3>
              <p className="text-gray-600 mb-6">
                Untuk pengalaman terbaik, buka PDF di tab baru untuk melihat konten.
              </p>

              {/* No Download Notice */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-amber-800">
                  <Shield className="h-5 w-5" />
                  <span className="font-medium">Mode View-Only</span>
                </div>
                <p className="text-sm text-amber-700 mt-1">
                  Dokumen ini hanya dapat dilihat, tidak dapat diunduh untuk menjaga keamanan koleksi.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => window.open(fileUrl, '_blank')}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  size="lg"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Buka di Tab Baru (View Only)
                </Button>
                <Button
                  variant="ghost"
                  onClick={handleRetry}
                  className="w-full text-sm"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Coba Preview Lagi
                </Button>
              </div>
            </div>
          </div>
        )
    }
  }

  const getMethodBadge = () => {
    const badges = {
      iframe: { label: 'IFrame', color: 'bg-blue-100 text-blue-800' },
      object: { label: 'Object', color: 'bg-green-100 text-green-800' },
      embed: { label: 'Embed', color: 'bg-purple-100 text-purple-800' },
      external: { label: 'External', color: 'bg-orange-100 text-orange-800' }
    }

    const badge = badges[currentMethod]
    return (
      <Badge variant="outline" className={`text-xs ${badge.color}`}>
        <Monitor className="h-3 w-3 mr-1" />
        {badge.label}
      </Badge>
    )
  }

  return (
    <div className={`relative bg-gray-50 rounded-lg overflow-hidden ${className}`}>
      {/* Simple Header */}
      <div className="flex items-center justify-between p-3 bg-white/90 border-b">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-red-600" />
          <span className="text-sm font-medium text-gray-800">PDF Preview</span>
          <Badge variant="outline" className="bg-amber-50 border-amber-200 text-amber-700 text-xs">
            <Lock className="h-3 w-3 mr-1" />
            View Only
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRetry}
          className="text-xs"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Retry
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3 bg-red-50 border-b">
          <div className="text-xs text-red-800 flex items-center gap-2">
            <AlertTriangle className="h-3 w-3" />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-xs text-gray-600">Memuat PDF...</p>
          </div>
        </div>
      )}

      {/* PDF Viewer */}
      <div className="relative">
        {renderViewer()}
      </div>
    </div>
  )
} 
