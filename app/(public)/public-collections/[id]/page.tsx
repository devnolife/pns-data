"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  BookOpen,
  User,
  Eye,
  AlertCircle,
  FileText,
  Calendar,
  Star,
  Sparkles
} from "lucide-react"
import { motion } from "framer-motion"
import { getPublicReportByIdAction } from "@/lib/actions/reports"
import { getCurrentUser } from "@/lib/actions/auth"
import { usePublicAccess } from "@/hooks/use-public-access"
import { ModernLoadingState } from "@/components/common/loading-state"
import { ModernErrorState } from "@/components/common/error-state"
import { AccessDenied } from "@/components/common/access-denied"
import { SecureDocumentViewer } from "@/components/security/secure-document-viewer"

interface ReportDetail {
  id: string
  title: string
  description: string | null
  cover_image_url: string | null
  category?: string | null
  created_at: Date
  author?: {
    name: string | null
    username: string
  }
  files?: any[]
}

export default function PublicCollectionDetailPage() {
  const router = useRouter()
  const params = useParams()
  const reportId = params?.id as string

  const [report, setReport] = useState<ReportDetail | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userLoading, setUserLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Use centralized access control
  const { hasAccess, isLoading: accessLoading, error: accessError } = usePublicAccess()

  // Check user authentication
  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser()
        setCurrentUser(user)
      } catch (error) {
        console.error('Error checking user:', error)
      } finally {
        setUserLoading(false)
      }
    }
    checkUser()
  }, [])

  // Load report details
  useEffect(() => {
    const loadReport = async () => {
      if (!reportId) return

      try {
        setLoading(true)
        setError(null)
        // Assuming we need to create this action or use existing one
        const result = await getPublicReportByIdAction(reportId)

        if (result.success && result.data) {
          setReport(result.data as ReportDetail)
        } else {
          setError(result.error || 'Laporan tidak ditemukan')
        }
      } catch (err) {
        setError('Gagal memuat laporan')
        console.error('Error loading report:', err)
      } finally {
        setLoading(false)
      }
    }

    if (hasAccess && reportId) {
      loadReport()
    }
  }, [hasAccess, reportId])

  const handleBackClick = () => {
    router.back()
  }

  // Loading state
  if (accessLoading || loading || userLoading) {
    return <ModernLoadingState message="Memuat detail laporan..." />
  }

  // Error state
  if (error) {
    return (
      <ModernErrorState
        message={error}
        onRetry={() => {
          setError(null)
          setLoading(true)
          // Retry loading report
        }}
      />
    )
  }

  // Access denied state
  if (!hasAccess) {
    return <AccessDenied previewItems={[]} />
  }

  // Report not found
  if (!report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
        <div className="container mx-auto py-12">
          <Card className="text-center py-16 bg-white/70 backdrop-blur-md border-0 shadow-2xl rounded-3xl max-w-2xl mx-auto">
            <CardContent className="p-8">
              <div className="text-gray-400 mb-6">
                <BookOpen className="h-20 w-20 mx-auto" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Laporan Tidak Ditemukan
              </h3>
              <p className="text-gray-500 text-lg mb-6">
                Laporan yang Anda cari tidak tersedia atau telah dihapus.
              </p>
              <Button onClick={handleBackClick} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 h-20 w-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed top-40 right-20 h-16 w-16 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse blur-xl" />

      <div className="container mx-auto py-8 px-4 md:px-6">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            onClick={handleBackClick}
            className="bg-white/70 backdrop-blur-md border-white/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-purple-700 hover:text-purple-800"
            variant="outline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800 leading-tight mb-2">
                    {report.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Dipublikasikan pada {new Date(report.created_at).toLocaleDateString('id-ID')}</span>
                    </div>
                    {currentUser ? (
                      <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                        <User className="h-3 w-3 mr-1" />
                        Akses Penuh
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-300">
                        <Eye className="h-3 w-3 mr-1" />
                        Akses Terbatas
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Star className="h-6 w-6 text-yellow-400 animate-pulse" />
                  <Sparkles className="h-6 w-6 text-pink-400 animate-bounce" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {currentUser ? (
            /* AUTHENTICATED USER - Full Access with Secure Viewer */
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">
              <div className="h-[80vh]">
                <SecureDocumentViewer
                  document={{
                    ...report,
                    content: report.description || 'Konten tidak tersedia',
                    author: report.author || { name: 'Unknown', username: 'unknown' },
                    created_at: report.created_at
                  }}
                  user={currentUser}
                  className="h-full"
                />
              </div>
            </div>
          ) : (
            /* GUEST USER - Limited Access */
            <div className="space-y-6">
              {/* Enhanced Cover Image */}
              <Card className="bg-white/80 backdrop-blur-md border-0 shadow-2xl rounded-3xl overflow-hidden">
                <div className="relative">
                  {report.cover_image_url ? (
                    <div className="relative">
                      <img
                        src={report.cover_image_url}
                        alt={`Cover of ${report.title}`}
                        className="w-full max-h-80 object-cover"
                        onError={(e) => {
                          // Enhanced debugging for cover image errors
                          console.log(`❌ Cover image failed to load:`, {
                            src: e.currentTarget.src,
                            reportId: report.id,
                            reportTitle: report.title,
                            coverUrl: report.cover_image_url
                          })

                          // Smart fallback logic
                          const img = e.currentTarget
                          if (!img.dataset.retryCount) {
                            img.dataset.retryCount = '1'
                            // Try with different year path
                            const reportYear = new Date(report.created_at).getFullYear()
                            const filename = img.src.split('/').pop()
                            const newSrc = `/uploads/covers/${reportYear}/${filename}`
                            console.log(`🔄 Retrying with year path: ${newSrc}`)
                            img.src = newSrc
                          } else if (img.dataset.retryCount === '1') {
                            img.dataset.retryCount = '2'
                            // Try placeholder
                            console.log(`🔄 Using placeholder image`)
                            img.src = '/placeholder-cover.svg'
                          } else {
                            // Final fallback - show beautiful gradient with title
                            console.log(`🔄 Showing fallback design`)
                            img.style.display = 'none'
                            const fallback = img.parentElement?.nextElementSibling as HTMLElement
                            if (fallback) fallback.classList.remove('hidden')
                          }
                        }}
                        onLoad={(e) => {
                          console.log(`✅ Cover image loaded successfully:`, {
                            src: e.currentTarget.src,
                            reportId: report.id,
                            reportTitle: report.title
                          })
                        }}
                      />
                    </div>
                  ) : null}

                  {/* Enhanced Fallback Design */}
                  <div className={`${report.cover_image_url ? 'hidden' : ''} w-full h-80 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center relative overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
                        backgroundSize: '40px 40px'
                      }} />
                    </div>

                    <div className="text-center text-white relative z-10 p-8">
                      <div className="relative mb-6">
                        <BookOpen className="h-24 w-24 mx-auto animate-pulse" />
                        <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2">
                          <span className="text-sm">📚</span>
                        </div>
                      </div>
                      <p className="text-2xl font-bold mb-3 leading-tight line-clamp-3">
                        {report.title}
                      </p>
                      <p className="text-lg opacity-90 uppercase tracking-widest font-medium">
                        {report.category || 'Laporan'}
                      </p>
                      <div className="mt-4 flex items-center justify-center gap-2 text-sm opacity-75">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(report.created_at).getFullYear()}</span>
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full animate-ping" />
                    <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full animate-pulse" />
                  </div>
                </div>
              </Card>

              {/* Description Section */}
              <Card className="bg-white/80 backdrop-blur-md border-0 shadow-2xl rounded-3xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold flex items-center gap-3 text-purple-800">
                    <BookOpen className="h-6 w-6" />
                    Deskripsi Laporan 📖
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {report.description || 'Deskripsi tidak tersedia untuk laporan ini.'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Guest Access Limitation Notice */}
              <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-2xl rounded-3xl">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-amber-100 rounded-2xl">
                      <AlertCircle className="h-8 w-8 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-amber-800 mb-2">🔒 Akses Terbatas untuk Pengunjung</h3>
                      <p className="text-amber-700 leading-relaxed">
                        Anda hanya dapat melihat cover dan deskripsi laporan. Login untuk mengakses file lengkap dan fitur interaktif!
                      </p>
                    </div>
                  </div>

                  {/* Login Call to Action */}
                  <div className="flex gap-4 justify-center pt-6 border-t border-amber-200">
                    <Button
                      onClick={() => router.push('/login?callbackUrl=/public-collections')}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg"
                    >
                      <User className="h-5 w-5 mr-2" />
                      Login untuk Akses Penuh
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => router.push('/register')}
                      className="border-amber-300 text-amber-700 hover:bg-amber-100 px-8 py-3 text-lg"
                    >
                      Daftar Sekarang
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Limited File Preview */}
              {report.files && report.files.length > 0 && (
                <Card className="bg-white/80 backdrop-blur-md border-0 shadow-2xl rounded-3xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-bold flex items-center gap-3 text-gray-800">
                      <FileText className="h-6 w-6" />
                      File Tersedia ({report.files.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {report.files.slice(0, 3).map((file: any, index: number) => (
                        <div key={file.id || index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-200">
                          <div className="flex items-center gap-4 flex-1">
                            <div className="p-3 rounded-xl bg-gray-200">
                              <FileText className="h-6 w-6 text-gray-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-semibold text-gray-800 truncate text-lg">
                                {file.original_name || file.filename}
                              </p>
                              <p className="text-sm text-gray-600">
                                {file.mime_type}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 px-4 py-2 bg-gray-300 rounded-xl">
                            <User className="h-4 w-4 text-gray-600" />
                            <span className="text-sm text-gray-700 font-medium">Login Required</span>
                          </div>
                        </div>
                      ))}
                      {report.files.length > 3 && (
                        <p className="text-center text-gray-500 mt-4 text-lg">
                          +{report.files.length - 3} file lainnya (login untuk melihat semua)
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
