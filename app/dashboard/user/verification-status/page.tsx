"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  Calendar,
  Filter,
  Sparkles,
  TrendingUp,
  AlertCircle
} from "lucide-react"

type Report = {
  id: string
  title: string
  description: string
  category: string
  status: "pending" | "verified" | "rejected"
  submittedDate: string
  files: {
    name: string
    size: string
    type: string
  }[]
  feedback?: string
  verifiedDate?: string
  rejectedDate?: string
}

export default function VerificationStatusPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState("")
  const [reports, setReports] = useState<Report[]>([])
  const [filteredReports, setFilteredReports] = useState<Report[]>([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }

    if (isAuthenticated && user?.role !== "USER") {
      router.push("/dashboard/admin")
    }
  }, [isAuthenticated, isLoading, router, user])

  useEffect(() => {
    // Mock API call to fetch user's reports
    const fetchUserReports = async () => {
      try {
        // In a real app, this would fetch reports for the current user
        const mockReports: Report[] = [
          {
            id: "1",
            title: "Laporan Keuangan Q1 2024 💰",
            description: "Laporan keuangan kuartal pertama dengan analisis mendalam tentang performa bisnis.",
            category: "CPNS",
            status: "verified",
            submittedDate: "2024-05-19T08:30:00",
            verifiedDate: "2024-05-20T14:20:00",
            files: [
              {
                name: "laporan-keuangan-q1.pdf",
                size: "2.4 MB",
                type: "PDF",
              },
              {
                name: "data-pendukung.xlsx",
                size: "1.8 MB",
                type: "XLSX",
              },
            ],
          },
          {
            id: "2",
            title: "Proposal Inovasi Digital 🚀",
            description: "Proposal implementasi teknologi AI untuk meningkatkan efisiensi operasional.",
            category: "PKA",
            status: "pending",
            submittedDate: "2024-05-18T14:45:00",
            files: [
              {
                name: "proposal-inovasi-digital.docx",
                size: "3.2 MB",
                type: "DOCX",
              },
              {
                name: "presentasi-proposal.pptx",
                size: "5.1 MB",
                type: "PPTX",
              },
            ],
          },
          {
            id: "3",
            title: "Analisis Kepemimpinan Modern ✨",
            description: "Studi kasus tentang gaya kepemimpinan di era digital dan dampaknya terhadap produktivitas tim.",
            category: "PKP",
            status: "rejected",
            submittedDate: "2024-05-17T09:15:00",
            rejectedDate: "2024-05-18T16:30:00",
            feedback: "Laporan perlu dilengkapi dengan data statistik yang lebih komprehensif dan referensi yang lebih update. Mohon tambahkan analisis komparatif dengan perusahaan sejenis.",
            files: [
              {
                name: "analisis-kepemimpinan.pdf",
                size: "1.9 MB",
                type: "PDF",
              },
            ],
          },
          {
            id: "4",
            title: "Evaluasi Program Pelatihan 📊",
            description: "Evaluasi komprehensif terhadap efektivitas program pelatihan karyawan tahun 2024.",
            category: "PKN",
            status: "verified",
            submittedDate: "2024-05-16T11:20:00",
            verifiedDate: "2024-05-17T10:15:00",
            files: [
              {
                name: "evaluasi-pelatihan.pdf",
                size: "2.7 MB",
                type: "PDF",
              },
              {
                name: "survey-results.xlsx",
                size: "1.3 MB",
                type: "XLSX",
              },
            ],
          },
          {
            id: "5",
            title: "Strategi Marketing Digital 📱",
            description: "Rencana strategis pemasaran digital untuk meningkatkan brand awareness dan engagement.",
            category: "PKP",
            status: "pending",
            submittedDate: "2024-05-15T10:10:00",
            files: [
              {
                name: "strategi-marketing.pdf",
                size: "4.2 MB",
                type: "PDF",
              },
            ],
          },
        ]

        setReports(mockReports)
        setFilteredReports(mockReports)
      } catch (error) {
        console.error("Error fetching reports:", error)
      }
    }

    if (isAuthenticated) {
      fetchUserReports()
    }
  }, [isAuthenticated])

  useEffect(() => {
    // Filter reports based on search term and status
    let filtered = reports

    if (statusFilter !== "all") {
      filtered = filtered.filter((report) => report.status === statusFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter((report) =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredReports(filtered)
  }, [searchTerm, statusFilter, reports])

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return {
          badge: <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-lg">⏳ Dalam Verifikasi</Badge>,
          icon: <Clock className="h-5 w-5 text-yellow-500" />,
          color: "from-yellow-400 to-orange-500",
          bgColor: "from-yellow-50 to-orange-50",
          borderColor: "border-yellow-200"
        }
      case "verified":
        return {
          badge: <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-0 shadow-lg">✅ Disetujui</Badge>,
          icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
          color: "from-green-400 to-emerald-500",
          bgColor: "from-green-50 to-emerald-50",
          borderColor: "border-green-200"
        }
      case "rejected":
        return {
          badge: <Badge className="bg-gradient-to-r from-red-400 to-pink-500 text-white border-0 shadow-lg">❌ Ditolak</Badge>,
          icon: <XCircle className="h-5 w-5 text-red-500" />,
          color: "from-red-400 to-pink-500",
          bgColor: "from-red-50 to-pink-50",
          borderColor: "border-red-200"
        }
      default:
        return {
          badge: <Badge variant="outline">Unknown</Badge>,
          icon: <AlertCircle className="h-5 w-5 text-gray-500" />,
          color: "from-gray-400 to-gray-500",
          bgColor: "from-gray-50 to-gray-50",
          borderColor: "border-gray-200"
        }
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "CPNS":
        return <Badge className="bg-gradient-to-r from-blue-400 to-cyan-500 text-white border-0">🎯 CPNS</Badge>
      case "PKP":
        return <Badge className="bg-gradient-to-r from-green-400 to-teal-500 text-white border-0">🌟 PKP</Badge>
      case "PKA":
        return <Badge className="bg-gradient-to-r from-purple-400 to-violet-500 text-white border-0">💎 PKA</Badge>
      case "PKN":
        return <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white border-0">🔥 PKN</Badge>
      default:
        return <Badge className="bg-gradient-to-r from-gray-400 to-gray-500 text-white border-0">{category}</Badge>
    }
  }

  const getStats = () => {
    const pending = reports.filter(r => r.status === "pending").length
    const verified = reports.filter(r => r.status === "verified").length
    const rejected = reports.filter(r => r.status === "rejected").length
    return { pending, verified, rejected, total: reports.length }
  }

  const stats = getStats()

  if (isLoading || !isAuthenticated || user?.role !== "USER") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent mx-auto"></div>
          <p className="text-lg font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Loading your reports... ✨
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Sparkles className="h-8 w-8 text-purple-500" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Status Verifikasi Laporan
            </h1>
            <Sparkles className="h-8 w-8 text-pink-500" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Track status laporan kamu dengan real-time updates! 🚀 Semua dalam satu dashboard yang aesthetic ✨
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Total Reports</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-yellow-400 to-orange-500 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium">Dalam Verifikasi</p>
                  <p className="text-3xl font-bold">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-green-400 to-emerald-500 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Disetujui</p>
                  <p className="text-3xl font-bold">{stats.verified}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-xl bg-gradient-to-br from-red-400 to-pink-500 text-white transform hover:scale-105 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm font-medium">Ditolak</p>
                  <p className="text-3xl font-bold">{stats.rejected}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search your reports... 🔍"
                  className="pl-10 border-0 bg-gray-50 focus:bg-white transition-all duration-300 text-lg"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6" onValueChange={(value) => setStatusFilter(value)}>
          <TabsList className="rounded-2xl bg-white/80 backdrop-blur-sm p-2 shadow-lg border-0">
            <TabsTrigger
              value="all"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              📋 Semua ({stats.total})
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              ⏳ Verifikasi ({stats.pending})
            </TabsTrigger>
            <TabsTrigger
              value="verified"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-400 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              ✅ Disetujui ({stats.verified})
            </TabsTrigger>
            <TabsTrigger
              value="rejected"
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-400 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              ❌ Ditolak ({stats.rejected})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={statusFilter}>
            <div className="space-y-6">
              {filteredReports.length === 0 ? (
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-12 text-center">
                    <div className="space-y-4">
                      <div className="text-6xl">😔</div>
                      <h3 className="text-2xl font-bold text-gray-700">No reports found</h3>
                      <p className="text-gray-500">Belum ada laporan yang sesuai dengan filter kamu nih!</p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {filteredReports.map((report) => {
                    const statusInfo = getStatusInfo(report.status)
                    return (
                      <Card
                        key={report.id}
                        className={`border-0 shadow-xl bg-gradient-to-r ${statusInfo.bgColor} hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300 ${statusInfo.borderColor} border-2`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                              {statusInfo.icon}
                              <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-1">{report.title}</h3>
                                <p className="text-gray-600 text-sm">{report.description}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getCategoryBadge(report.category)}
                              {statusInfo.badge}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6 text-sm text-gray-500">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>Submitted: {new Date(report.submittedDate).toLocaleDateString('id-ID')}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <span>{report.files.length} file{report.files.length !== 1 ? 's' : ''}</span>
                              </div>
                              {report.verifiedDate && (
                                <div className="flex items-center gap-2 text-green-600">
                                  <CheckCircle2 className="h-4 w-4" />
                                  <span>Verified: {new Date(report.verifiedDate).toLocaleDateString('id-ID')}</span>
                                </div>
                              )}
                              {report.rejectedDate && (
                                <div className="flex items-center gap-2 text-red-600">
                                  <XCircle className="h-4 w-4" />
                                  <span>Rejected: {new Date(report.rejectedDate).toLocaleDateString('id-ID')}</span>
                                </div>
                              )}
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedReport(report)
                                setViewDialogOpen(true)
                              }}
                              className="bg-white/80 hover:bg-white border-gray-200 hover:border-gray-300 transition-all duration-300"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                          </div>

                          {report.feedback && (
                            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                              <h4 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                                <AlertCircle className="h-4 w-4" />
                                Feedback dari Admin:
                              </h4>
                              <p className="text-red-700 text-sm">{report.feedback}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )
                  })}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Detail Dialog */}
        {selectedReport && (
          <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white border-0 shadow-2xl">
              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  {getStatusInfo(selectedReport.status).icon}
                  <DialogTitle className="text-2xl font-bold text-gray-800">
                    {selectedReport.title}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-gray-600 text-base">
                  {selectedReport.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                <div className="flex items-center gap-4">
                  {getCategoryBadge(selectedReport.category)}
                  {getStatusInfo(selectedReport.status).badge}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-700 flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Tanggal Submit
                    </h4>
                    <p className="text-gray-600">{new Date(selectedReport.submittedDate).toLocaleString('id-ID')}</p>
                  </div>

                  {selectedReport.verifiedDate && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-green-700 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        Tanggal Disetujui
                      </h4>
                      <p className="text-green-600">{new Date(selectedReport.verifiedDate).toLocaleString('id-ID')}</p>
                    </div>
                  )}

                  {selectedReport.rejectedDate && (
                    <div className="space-y-2">
                      <h4 className="font-semibold text-red-700 flex items-center gap-2">
                        <XCircle className="h-4 w-4" />
                        Tanggal Ditolak
                      </h4>
                      <p className="text-red-600">{new Date(selectedReport.rejectedDate).toLocaleString('id-ID')}</p>
                    </div>
                  )}
                </div>

                <div>
                  <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Files ({selectedReport.files.length})
                  </h4>
                  <div className="grid gap-3">
                    {selectedReport.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <FileText className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">{file.name}</p>
                            <p className="text-sm text-gray-500">{file.size} • {file.type}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedReport.feedback && (
                  <div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl">
                    <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Feedback dari Admin
                    </h4>
                    <p className="text-red-700 leading-relaxed">{selectedReport.feedback}</p>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
