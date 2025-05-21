"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FileText, Eye, CheckCircle, XCircle, Search, Filter, Download, File } from "lucide-react"

interface Report {
  id: string
  title: string
  abstract: string
  category: string
  status: "pending" | "verified" | "rejected"
  submittedBy: string
  submittedDate: string
  coverImage?: string
  files: {
    name: string
    size: string
    type: string
    url?: string
  }[]
  feedback?: string
}

interface ReportVerificationTableProps {
  reports: Report[]
  onVerify: (reportId: string) => void
  onReject: (reportId: string, feedback: string) => void
}

export function ReportVerificationTable({ reports: initialReports, onVerify, onReject }: ReportVerificationTableProps) {
  const [reports, setReports] = useState<Report[]>(initialReports)
  const [filteredReports, setFilteredReports] = useState<Report[]>(initialReports)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("pending")
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [feedback, setFeedback] = useState("")
  const { toast } = useToast()

  const handleSearch = () => {
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
  }

  const handleVerifyReport = (reportId: string) => {
    onVerify(reportId)
    setReports((prev) => prev.map((report) => (report.id === reportId ? { ...report, status: "verified" } : report)))
    setFilteredReports((prev) =>
      prev.map((report) => (report.id === reportId ? { ...report, status: "verified" } : report)),
    )

    toast({
      title: "Report verified",
      description: "The report has been verified and is now available in the system.",
    })

    setViewDialogOpen(false)
  }

  const handleRejectReport = (reportId: string) => {
    if (!feedback.trim()) {
      toast({
        title: "Feedback required",
        description: "Please provide feedback for the rejection.",
        variant: "destructive",
      })
      return
    }

    onReject(reportId, feedback)
    setReports((prev) =>
      prev.map((report) => (report.id === reportId ? { ...report, status: "rejected", feedback } : report)),
    )
    setFilteredReports((prev) =>
      prev.map((report) => (report.id === reportId ? { ...report, status: "rejected", feedback } : report)),
    )

    toast({
      title: "Report rejected",
      description: "The report has been rejected and the user will be notified.",
    })

    setViewDialogOpen(false)
    setFeedback("")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "verified":
        return <Badge className="bg-green-100 text-green-800">Verified</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "CPNS":
      case "LATSAR":
        return <Badge className="bg-blue-100 text-blue-800">{category}</Badge>
      case "PKP":
        return <Badge className="bg-green-100 text-green-800">{category}</Badge>
      case "PKA":
        return <Badge className="bg-purple-100 text-purple-800">{category}</Badge>
      case "PKN":
        return <Badge className="bg-orange-100 text-orange-800">{category}</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800">{category}</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search reports by title or submitter..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
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
              <SelectItem value="LATSAR">LATSAR</SelectItem>
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
          <Button onClick={handleSearch}>
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
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
                  <tr key={report.id} className="border-b hover:bg-muted/50">
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
                          setFeedback(report.feedback || "")
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
      </div>

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
                <h3 className="text-sm font-medium text-gray-500 mb-1">Abstract</h3>
                <p className="text-sm">{selectedReport.abstract}</p>
              </div>

              {selectedReport.coverImage && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Cover Image</h3>
                  <div className="border rounded-lg p-2">
                    <div className="aspect-[4/3] relative w-full max-w-xs mx-auto">
                      <img
                        src={selectedReport.coverImage || "/placeholder.svg"}
                        alt="Cover"
                        className="object-contain w-full h-full"
                      />
                    </div>
                  </div>
                </div>
              )}

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
                      {file.url && (
                        <Button variant="ghost" size="sm" asChild>
                          <a href={file.url} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </a>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {selectedReport.status === "pending" && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Feedback (if rejected)</h3>
                  <Textarea
                    placeholder="Provide feedback to the user if you reject this report..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={3}
                  />
                </div>
              )}

              {selectedReport.status === "rejected" && selectedReport.feedback && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Rejection Feedback</h3>
                  <div className="border rounded-lg p-3 bg-red-50 text-sm">{selectedReport.feedback}</div>
                </div>
              )}
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
  )
}
