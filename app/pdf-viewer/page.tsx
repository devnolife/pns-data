"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  FileText,
  AlertCircle,
  Clock,
  Eye,
  Lock,
  ArrowLeft,
  RefreshCw
} from "lucide-react"
import { getReportPDFFiles, verifyPDFViewToken } from "@/lib/actions/reports"

interface PDFFile {
  id: string
  filename: string
  original_name: string
  file_path: string
  file_size: number
}

interface ReportData {
  reportId: string
  title: string
  files: PDFFile[]
}

export default function PDFViewerPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [report, setReport] = useState<ReportData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [tokenExpired, setTokenExpired] = useState(false)
  const [selectedFile, setSelectedFile] = useState<PDFFile | null>(null)
  const token = searchParams?.get('token')
  const reportId = searchParams?.get('reportId')

  useEffect(() => {
    const loadPDFFiles = async () => {
      if (!token || !reportId) {
        setError('Token atau ID laporan tidak tersedia')
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        const result = await getReportPDFFiles(reportId, token)

        if (result.success && 'data' in result && result.data) {
          setReport(result.data)
          if (result.data.files.length > 0) {
            setSelectedFile(result.data.files[0])
          }
        } else {
          const errorMessage = 'error' in result ? result.error : 'Gagal memuat file PDF'
          setError(errorMessage || 'Gagal memuat file PDF')
          if (errorMessage?.includes('kedaluwarsa')) {
            setTokenExpired(true)
          }
        }
      } catch (err) {
        console.error('Error loading PDF files:', err)
        setError('Terjadi kesalahan saat memuat file PDF')
      } finally {
        setIsLoading(false)
      }
    }

    loadPDFFiles()
  }, [token, reportId])

  // Check token expiry every minute
  useEffect(() => {
    if (!token) return

    const checkTokenValidity = async () => {
      const result = await verifyPDFViewToken(token)
      if (!result.success && result.error?.includes('kedaluwarsa')) {
        setTokenExpired(true)
        setError('Sesi akses PDF telah berakhir')
      }
    }

    const interval = setInterval(checkTokenValidity, 60000) // Check every minute
    return () => clearInterval(interval)
  }, [token])

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Memuat file PDF...</p>
        </div>
      </div>
    )
  }

  if (error || tokenExpired) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-6">
        <Card className="max-w-md bg-white/70 backdrop-blur-md border-0 shadow-2xl rounded-3xl">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              {tokenExpired ? (
                <Clock className="h-16 w-16 text-amber-500" />
              ) : (
                <AlertCircle className="h-16 w-16 text-red-500" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800 mb-2">
              {tokenExpired ? 'Akses Berakhir ⏰' : 'Terjadi Kesalahan 😢'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">{error}</p>
            {tokenExpired && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Akses PDF berlaku selama 6 jam. Silakan kembali ke halaman utama dan coba lagi.
                </AlertDescription>
              </Alert>
            )}
            <div className="flex gap-2 justify-center">
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="rounded-2xl"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Kembali
              </Button>
              {tokenExpired && (
                <Button
                  onClick={() => window.close()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-2xl"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Tutup
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!report || !selectedFile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-6">
        <Card className="max-w-md bg-white/70 backdrop-blur-md border-0 shadow-2xl rounded-3xl">
          <CardContent className="text-center p-8">
            <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">Tidak ada file PDF tersedia</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-md border-b border-white/20 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => window.close()}
              variant="outline"
              size="sm"
              className="rounded-xl"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Tutup
            </Button>
            <div>
              <h1 className="text-xl font-bold text-gray-800 line-clamp-1">
                {report.title}
              </h1>
              <p className="text-sm text-gray-600">
                {report.files.length} file PDF tersedia
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Lock className="w-3 h-3 mr-1" />
              Akses Terbatas
            </Badge>
            <Badge variant="outline">
              <Eye className="w-3 h-3 mr-1" />
              Mode Baca
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-5rem)]">
        {/* Sidebar - File List */}
        {report.files.length > 1 && (
          <div className="w-80 bg-white/70 backdrop-blur-md border-r border-white/20 p-4 overflow-y-auto">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              File PDF ({report.files.length})
            </h3>
            <div className="space-y-2">
              {report.files.map((file) => (
                <Card
                  key={file.id}
                  className={`cursor-pointer transition-all duration-200 ${selectedFile?.id === file.id
                      ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300'
                      : 'bg-white/50 hover:bg-white/70'
                    }`}
                  onClick={() => setSelectedFile(file)}
                >
                  <CardContent className="p-3">
                    <p className="font-medium text-sm text-gray-800 line-clamp-2">
                      {file.original_name}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {formatFileSize(file.file_size)}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}        {/* Main PDF Viewer */}
        <div className="flex-1 bg-gray-100">
          {selectedFile && (
            <div className="h-full">
              {/* PDF Viewer using secure API route */}              <iframe
                src={`/api/secure-pdf?token=${token}&file=${selectedFile.file_path}#view=FitH&toolbar=0&navpanes=0&scrollbar=1`}
                className="w-full h-full border-0 pointer-events-auto"
                title={selectedFile.original_name}
                sandbox="allow-same-origin allow-scripts"
                onContextMenu={(e) => e.preventDefault()} // Disable right-click
              />
            </div>
          )}
        </div>
      </div>

      {/* Footer with security notice */}
      <div className="fixed bottom-4 right-4">
        <Alert className="bg-white/90 backdrop-blur-md border-amber-300 shadow-lg rounded-xl max-w-sm">
          <Lock className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-xs text-amber-800">
            <strong>Akses Terbatas:</strong> File ini hanya dapat dilihat dan tidak dapat diunduh atau dicetak.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
