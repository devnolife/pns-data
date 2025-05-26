"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import AdminDashboardLayout from "@/components/layouts/admin-dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToastId } from "@/hooks/use-toast-id"
import { Search, Filter, Eye, CheckCircle, XCircle, FileText, Download, File } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Report = {
  id: string
  title: string
  description: string
  category: string
  status: "pending" | "verified" | "rejected"
  submittedBy: string
  submittedDate: string
  files: {
    name: string
    size: string
    type: string
  }[]
}

export default function VerifyReportsPage() {
  const { user, isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const { success } = useToastId()

  const [searchTerm, setSearchTerm] = useState("")
  const [reports, setReports] = useState<Report[]>([])
  const [filteredReports, setFilteredReports] = useState<Report[]>([])
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("pending")
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login")
    }

    if (isAuthenticated && user?.role !== "admin") {
      router.push("/dashboard/user")
    }
  }, [isAuthenticated, loading, router, user])

  useEffect(() => {
    // Mock API call to fetch reports
    const fetchReports = async () => {
      try {
        // In a real app, this would be a fetch call to your API
        const mockReports: Report[] = [
          {
            id: "1",
            title: "Weekly Progress Report - Week 1",
            description: "Summary of activities and progress for the first week of training.",
            category: "CPNS",
            status: "pending",
            submittedBy: "Sarah Williams",
            submittedDate: "2024-05-19T08:30:00",
            files: [
              {
                name: "progress-report-week1.pdf",
                size: "1.2 MB",
                type: "PDF",
              },
            ],
          },
          {
            id: "2",
            title: "PKA Final Project",
            description: "Final project submission for PKA training program.",
            category: "PKA",
            status: "pending",
            submittedBy: "John Doe",
            submittedDate: "2024-05-18T14:45:00",
            files: [
              {
                name: "pka-final-project.docx",
                size: "3.5 MB",
                type: "DOCX",
              },
              {
                name: "pka-presentation.pptx",
                size: "2.8 MB",
                type: "PPTX",
              },
            ],
          },
          {
            id: "3",
            title: "PKP Module 3 Assignment",
            description: "Completed assignment for PKP Module 3: Leadership Principles.",
            category: "PKP",
            status: "pending",
            submittedBy: "Jane Smith",
            submittedDate: "2024-05-17T09:15:00",
            files: [
              {
                name: "pkp-module3-assignment.pdf",
                size: "0.9 MB",
                type: "PDF",
              },
            ],
          },
          {
            id: "4",
            title: "Research Methodology Report",
            description: "Report on research methodology for PKN program.",
            category: "PKN",
            status: "pending",
            submittedBy: "Robert Johnson",
            submittedDate: "2024-05-16T11:20:00",
            files: [
              {
                name: "research-methodology.pdf",
                size: "2.3 MB",
                type: "PDF",
              },
              {
                name: "data-analysis.xlsx",
                size: "1.7 MB",
                type: "XLSX",
              },
            ],
          },
          {
            id: "5",
            title: "CPNS Final Project Proposal",
            description: "Proposal for CPNS Latsar final project.",
            category: "CPNS",
            status: "verified",
            submittedBy: "David Wilson",
            submittedDate: "2024-05-15T10:10:00",
            files: [
              {
                name: "final-project-proposal.pdf",
                size: "1.5 MB",
                type: "PDF",
              },
            ],
          },
          {
            id: "6",
            title: "PKP Leadership Case Study",
            description: "Case study analysis for PKP leadership module.",
            category: "PKP",
            status: "rejected",
            submittedBy: "Michael Brown",
            submittedDate: "2024-05-14T16:30:00",
            files: [
              {
                name: "leadership-case-study.docx",
                size: "2.1 MB",
                type: "DOCX",
              },
            ],
          },
        ]

        setReports(mockReports)
        setFilteredReports(mockReports.filter((report) => report.status === "pending"))
      } catch (error) {
        console.error("Error fetching reports:", error)
      }
    }

    fetchReports()
  }, [])

  useEffect(() => {
    // Filter reports based on search term, category, and status
    let filtered = reports

    if (statusFilter !== "all") {
      filtered = filtered.filter((report) => report.status === statusFilter)
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((report) => report.category === categoryFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (report) =>
          report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          report.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredReports(filtered)
  }, [searchTerm, categoryFilter, statusFilter, reports])

  const handleVerifyReport = (reportId: string) => {
    setReports((prev) => prev.map((report) => (report.id === reportId ? { ...report, status: "verified" } : report)))

    success("reportVerify", { description: "Laporan telah diverifikasi dan sekarang tersedia dalam sistem." })

    setViewDialogOpen(false)
  }

  const handleRejectReport = (reportId: string) => {
    setReports((prev) => prev.map((report) => (report.id === reportId ? { ...report, status: "rejected" } : report)))

    success("reportReject", { description: "Laporan telah ditolak dan pengguna akan diberitahu." })

    setViewDialogOpen(false)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "verified":
        return <Badge variant="success">Verified</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "CPNS":
        return <Badge className="bg-blue-100 text-blue-800">CPNS</Badge>
      case "PKP":
        return <Badge className="bg-green-100 text-green-800">PKP</Badge>
      case "PKA":
        return <Badge className="bg-purple-100 text-purple-800">PKA</Badge>
      case "PKN":
        return <Badge className="bg-orange-100 text-orange-800">PKN</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{category}</Badge>
    }
  }

  if (loading || !isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <AdminDashboardLayout>
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Verify Reports</h1>
          <p className="text-gray-600 mt-1">Review and verify reports submitted by users</p>
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search reports by title or submitter..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="CPNS">CPNS</SelectItem>
                <SelectItem value="PKP">PKP</SelectItem>
                <SelectItem value="PKA">PKA</SelectItem>
                <SelectItem value="PKN">PKN</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="verified">Verified</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Tabs defaultValue="pending" className="space-y-6" onValueChange={(value) => setStatusFilter(value)}>
          <TabsList>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
            <TabsTrigger value="all">All Reports</TabsTrigger>
          </TabsList>

          <TabsContent value={statusFilter}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {statusFilter === "all"
                    ? "All Reports"
                    : statusFilter === "pending"
                      ? "Pending Reports"
                      : statusFilter === "verified"
                        ? "Verified Reports"
                        : "Rejected Reports"}
                </CardTitle>
                <CardDescription>
                  Showing {filteredReports.length} {statusFilter === "all" ? "total" : statusFilter} reports
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4">Title</th>
                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">Submitted By</th>
                        <th className="text-left p-4">Date</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-right p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReports.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-4 text-center text-gray-500">
                            No reports found matching your criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredReports.map((report) => (
                          <tr key={report.id} className="border-b hover:bg-gray-50">
                            <td className="p-4">
                              <div className="flex items-center">
                                <FileText className="h-5 w-5 text-blue-500 mr-2" />
                                <div>
                                  <p className="font-medium">{report.title}</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {report.files.length} file{report.files.length !== 1 ? "s" : ""}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">{getCategoryBadge(report.category)}</td>
                            <td className="p-4">{report.submittedBy}</td>
                            <td className="p-4">{new Date(report.submittedDate).toLocaleString()}</td>
                            <td className="p-4">{getStatusBadge(report.status)}</td>
                            <td className="p-4 text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedReport(report)
                                  setViewDialogOpen(true)
                                }}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {selectedReport && (
          <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{selectedReport.title}</DialogTitle>
                <DialogDescription>
                  Submitted by {selectedReport.submittedBy} on {new Date(selectedReport.submittedDate).toLocaleString()}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Category</h3>
                  <div>{getCategoryBadge(selectedReport.category)}</div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                  <p className="text-sm">{selectedReport.description}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Files</h3>
                  <div className="border rounded-lg divide-y">
                    {selectedReport.files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3">
                        <div className="flex items-center">
                          <File className="h-5 w-5 text-blue-500 mr-2" />
                          <div>
                            <p className="font-medium text-sm">{file.name}</p>
                            <p className="text-xs text-gray-500">
                              {file.size} • {file.type}
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter className="flex justify-between">
                {selectedReport.status === "pending" ? (
                  <>
                    <Button
                      variant="destructive"
                      onClick={() => handleRejectReport(selectedReport.id)}
                      className="flex-1 mr-2"
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      variant="default"
                      onClick={() => handleVerifyReport(selectedReport.id)}
                      className="flex-1 ml-2"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Verify
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                    Close
                  </Button>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AdminDashboardLayout>
  )
}
