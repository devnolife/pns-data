"use client"

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Shield,
  Eye,
  User,
  Clock,
  AlertTriangle,
  FileText,
  Lock,
  Waves
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SecureDocumentViewerProps {
  document: {
    id: string
    title: string
    description: string | null
    content: string
    cover_image_url?: string | null
    category?: string | null
    created_at: Date
    author: {
      name: string | null
      username: string
    }
    files?: Array<{
      id: string
      filename: string
      original_name: string
      mime_type: string
      file_size: number
    }>
  }
  user: {
    id: string
    username: string
    name: string | null
    role: 'USER' | 'ADMIN' | 'MODERATOR'
  }
  className?: string
}

export function SecureDocumentViewer({
  document: reportDocument,
  user,
  className
}: SecureDocumentViewerProps) {
  const [isProtected, setIsProtected] = useState(true)
  const [watermarkText, setWatermarkText] = useState('')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Generate watermark text
    const timestamp = new Date().toLocaleString('id-ID')
    const watermark = `${user.name || user.username} • ${timestamp} • ID:${user.id.slice(-8)}`
    setWatermarkText(watermark)

    // Disable right-click and text selection
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    const handleSelectStart = (e: Event) => {
      if (isProtected) {
        e.preventDefault()
        return false
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable Ctrl+A, Ctrl+C, Ctrl+S, Ctrl+P, F12
      if (isProtected && (
        (e.ctrlKey && ['a', 'c', 's', 'p'].includes(e.key.toLowerCase())) ||
        e.key === 'F12' ||
        e.key === 'PrintScreen'
      )) {
        e.preventDefault()
        return false
      }
    }

    document.addEventListener('contextmenu', handleContextMenu)
    document.addEventListener('selectstart', handleSelectStart)
    document.addEventListener('keydown', handleKeyDown)

    // CSS to disable text selection and drag
    const style = document.createElement('style')
    style.textContent = `
      .secure-content {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: transparent;
      }
      .secure-content img {
        -webkit-user-drag: none;
        -moz-user-drag: none;
        -ms-user-drag: none;
        user-drag: none;
        pointer-events: none;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu)
      document.removeEventListener('selectstart', handleSelectStart)
      document.removeEventListener('keydown', handleKeyDown)
      document.head.removeChild(style)
    }
  }, [user, isProtected])

  const WatermarkOverlay = () => (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-gray-600 text-xs font-bold transform -rotate-45 whitespace-nowrap"
            style={{
              top: `${(i % 5) * 20 + 10}%`,
              left: `${Math.floor(i / 5) * 25 + 5}%`,
              transform: 'rotate(-45deg)',
            }}
          >
            {watermarkText}
          </div>
        ))}
      </div>
    </div>
  )

  const handlePDFView = (fileId: string) => {
    // Generate secure PDF view token with user information
    const viewToken = btoa(JSON.stringify({
      fileId,
      userId: user.id,
      timestamp: Date.now(),
      restrictions: {
        download: false,
        print: false,
        copy: false,
        screenshot: false
      }
    }))

    // Open in secure PDF viewer
    window.open(`/api/secure-pdf/${fileId}?token=${viewToken}`, '_blank')
  }

  return (
    <div className={cn("relative", className)}>
      {/* Watermark Overlay */}
      <WatermarkOverlay />

      {/* Security Header */}
      <Card className="mb-6 border-green-200 bg-green-50/50">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg text-green-800">Akses Aman Terverifikasi</CardTitle>
                <p className="text-sm text-green-600 mt-1">
                  Dokumen dilindungi dengan watermark dan pembatasan akses
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                <User className="h-3 w-3 mr-1" />
                {user.role}
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                <Eye className="h-3 w-3 mr-1" />
                Read-Only
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Document Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-start gap-4">
            {/* Document Cover */}
            <div className="flex-shrink-0">
              {reportDocument.cover_image_url ? (
                <div className="relative">
                  <img
                    src={reportDocument.cover_image_url}
                    alt={`Cover of ${reportDocument.title}`}
                    className="w-24 h-32 object-cover rounded-lg border-2 border-gray-200 shadow-sm secure-content"
                  />
                  <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-1">
                    <Shield className="h-3 w-3" />
                  </div>
                </div>
              ) : (
                <div className="w-24 h-32 bg-gradient-to-br from-blue-100 to-purple-200 rounded-lg border-2 border-gray-200 flex items-center justify-center">
                  <FileText className="h-10 w-10 text-blue-600" />
                </div>
              )}
            </div>

            {/* Document Info */}
            <div className="flex-1 min-w-0">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2 line-clamp-2">
                {reportDocument.title}
              </CardTitle>
              <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{reportDocument.author.name || reportDocument.author.username}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(reportDocument.created_at).toLocaleDateString('id-ID')}</span>
                </div>
                {reportDocument.category && (
                  <Badge variant="outline">{reportDocument.category}</Badge>
                )}
              </div>
              {reportDocument.description && (
                <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
                  {reportDocument.description}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Security Notice */}
      <Card className="mb-6 border-amber-200 bg-amber-50/50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-amber-800 mb-1">
                📋 Ketentuan Akses Dokumen
              </p>
              <ul className="text-xs text-amber-700 space-y-1">
                <li>• Dokumen dilindungi dengan watermark identitas pengguna</li>
                <li>• Dilarang mengunduh, mencetak, atau menyalin konten</li>
                <li>• Akses dibatasi untuk keperluan pembelajaran dan referensi</li>
                <li>• Aktivitas akses tercatat untuk keamanan sistem</li>
              </ul>
            </div>
            <div className="flex items-center gap-2 text-xs text-amber-600">
              <Waves className="h-4 w-4" />
              <span className="font-medium">Protected</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Content */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Konten Dokumen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px] w-full pr-4">
            <div
              ref={contentRef}
              className={cn(
                "prose prose-sm max-w-none secure-content",
                isProtected && "select-none"
              )}
              style={{ userSelect: isProtected ? 'none' : 'auto' }}
              dangerouslySetInnerHTML={{ __html: reportDocument.content }}
            />
          </ScrollArea>
        </CardContent>
      </Card>

      {/* File Attachments */}
      {reportDocument.files && reportDocument.files.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              File Lampiran ({reportDocument.files.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reportDocument.files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {file.mime_type.includes('pdf') ? (
                        <FileText className="h-5 w-5 text-red-600" />
                      ) : file.mime_type.includes('image') ? (
                        <div className="h-5 w-5 text-green-600">🖼️</div>
                      ) : (
                        <div className="h-5 w-5 text-blue-600">📄</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">
                        {file.original_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {file.mime_type} • {Math.round(file.file_size / 1024)} KB
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {file.mime_type.includes('pdf') ? (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePDFView(file.id)}
                        className="border-blue-200 text-blue-700 hover:bg-blue-50"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Lihat PDF
                      </Button>
                    ) : (
                      <div className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded-lg">
                        <Lock className="h-3 w-3 text-gray-500" />
                        <span className="text-xs text-gray-600">Hanya PDF</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* File Access Notice */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">Akses File Terlindungi</span>
              </div>
              <p className="text-xs text-blue-700">
                File PDF dapat dilihat dalam viewer aman dengan watermark. Download dan print dinonaktifkan.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* User Session Info */}
      <Card className="mt-6 border-gray-200 bg-gray-50/50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Sesi aktif: {user.name || user.username}</span>
            </div>
            <div className="text-xs text-gray-500">
              ID Sesi: {user.id.slice(-8)} • {new Date().toLocaleString('id-ID')}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
