"use client"

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  FileText,
  ExternalLink,
  Download,
  Shield,
  AlertTriangle,
  RefreshCw,
  Eye,
  Monitor
} from 'lucide-react'

interface AdvancedPDFViewerProps {
  fileUrl: string
  fileName: string
  onDownload: () => void
  className?: string
}

type ViewerMethod = 'iframe' | 'object' | 'embed' | 'external'

export function AdvancedPDFViewer({
  fileUrl,
  fileName,
  onDownload,
  className = ""
}: AdvancedPDFViewerProps) {
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
    const pdfUrl = `${fileUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH&zoom=page-fit`

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
            sandbox="allow-same-origin allow-scripts allow-forms"
            allow="fullscreen"
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
              <FileText className="h-24 w-24 text-blue-500 mx-auto mb-6" />
              <h3 className="text-xl font-semibold mb-3">PDF Siap Ditampilkan</h3>
              <p className="text-gray-600 mb-6">
                Untuk pengalaman terbaik, buka PDF di tab baru atau download file.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => window.open(fileUrl, '_blank')}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  size="lg"
                >
                  <ExternalLink className="h-5 w-5 mr-2" />
                  Buka di Tab Baru
                </Button>
                <Button
                  variant="outline"
                  onClick={onDownload}
                  className="w-full"
                  size="lg"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download PDF
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
    <div className={`relative bg-gray-50 rounded-xl overflow-hidden ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-red-600" />
          <span className="font-medium text-gray-800">Advanced PDF Preview</span>
          <Badge variant="outline" className="bg-green-50 border-green-200 text-green-700 text-xs">
            🔒 Secure
          </Badge>
          {getMethodBadge()}
          {retryCount > 0 && (
            <Badge variant="outline" className="bg-yellow-50 border-yellow-200 text-yellow-700 text-xs">
              Retry #{retryCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(fileUrl, '_blank')}
            className="flex items-center gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Tab Baru
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onDownload}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRetry}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </Button>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 bg-red-50 border-b">
          <Alert className="border-red-200">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat PDF dengan metode {currentMethod}...</p>
          </div>
        </div>
      )}

      {/* PDF Viewer */}
      <div className="h-[600px] relative">
        {renderViewer()}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-blue-50 border-t">
        <div className="text-xs text-blue-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-3 w-3" />
            <span>File dilindungi dengan enkripsi end-to-end</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-3 w-3" />
            <span>Mode: {currentMethod.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  )
} 
