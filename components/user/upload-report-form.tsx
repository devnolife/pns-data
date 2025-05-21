"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Upload, File, X, Loader2, ImageIcon } from "lucide-react"

export function UploadReportForm() {
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    title: "",
    abstract: "",
    reportType: "",
    participants: "",
    year: new Date().getFullYear().toString(),
    batch: "",
  })
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [reportFile, setReportFile] = useState<File | null>(null)
  const [draggingCover, setDraggingCover] = useState(false)
  const [draggingReport, setDraggingReport] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCoverDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDraggingCover(true)
  }

  const handleCoverDragLeave = () => {
    setDraggingCover(false)
  }

  const handleCoverDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDraggingCover(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith("image/")) {
        setCoverImage(file)
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG) for the cover.",
          variant: "destructive",
        })
      }
    }
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type.startsWith("image/")) {
        setCoverImage(file)
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an image file (JPG, PNG) for the cover.",
          variant: "destructive",
        })
      }
    }
  }

  const handleReportDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDraggingReport(true)
  }

  const handleReportDragLeave = () => {
    setDraggingReport(false)
  }

  const handleReportDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDraggingReport(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type === "application/pdf") {
        setReportFile(file)
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file for the report.",
          variant: "destructive",
        })
      }
    }
  }

  const handleReportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type === "application/pdf") {
        setReportFile(file)
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF file for the report.",
          variant: "destructive",
        })
      }
    }
  }

  const removeCoverImage = () => {
    setCoverImage(null)
  }

  const removeReportFile = () => {
    setReportFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validate form
    if (!formData.title) {
      setError("Please enter a title for your report")
      return
    }

    if (!formData.abstract) {
      setError("Please enter an abstract for your report")
      return
    }

    if (!formData.reportType) {
      setError("Please select a report type")
      return
    }

    if (!formData.participants) {
      setError("Please select participants")
      return
    }

    if (!formData.batch) {
      setError("Please enter a batch number")
      return
    }

    if (!coverImage) {
      setError("Please upload a cover image (JPG/PNG)")
      return
    }

    if (!reportFile) {
      setError("Please upload a report file (PDF)")
      return
    }

    setUploading(true)

    // Simulate API call
    setTimeout(() => {
      setUploading(false)
      toast({
        title: "Report uploaded successfully",
        description: "Your report has been uploaded and is now pending verification.",
      })

      // Reset form
      setFormData({
        title: "",
        abstract: "",
        reportType: "",
        participants: "",
        year: new Date().getFullYear().toString(),
        batch: "",
      })
      setCoverImage(null)
      setReportFile(null)

      // Redirect to dashboard
      router.push("/dashboard/user")
    }, 2000)
  }

  const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - i).toString())

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Upload Report</CardTitle>
          <CardDescription>
            Fill in the details and upload your report. It will be verified by an administrator before being published.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="title">Report Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter report title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={formData.reportType} onValueChange={(value) => handleSelectChange("reportType", value)}>
                <SelectTrigger id="reportType">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                  <SelectItem value="thesis">Thesis</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="participants">Participants</Label>
              <Select
                value={formData.participants}
                onValueChange={(value) => handleSelectChange("participants", value)}
              >
                <SelectTrigger id="participants">
                  <SelectValue placeholder="Select participants" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PKN">PKN</SelectItem>
                  <SelectItem value="PKA">PKA</SelectItem>
                  <SelectItem value="PKP">PKP</SelectItem>
                  <SelectItem value="LATSAR">LATSAR CPNS</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Select value={formData.year} onValueChange={(value) => handleSelectChange("year", value)}>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="batch">Batch</Label>
              <Input
                id="batch"
                name="batch"
                placeholder="Enter batch number"
                value={formData.batch}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="abstract">Abstract</Label>
            <Textarea
              id="abstract"
              name="abstract"
              placeholder="Enter a brief abstract of the report"
              value={formData.abstract}
              onChange={handleInputChange}
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label>Upload Cover Image (JPG/PNG)</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                draggingCover ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onDragOver={handleCoverDragOver}
              onDragLeave={handleCoverDragLeave}
              onDrop={handleCoverDrop}
            >
              {coverImage ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ImageIcon className="h-8 w-8 text-blue-500 mr-2" />
                    <div>
                      <p className="font-medium">{coverImage.name}</p>
                      <p className="text-xs text-gray-500">
                        {(coverImage.size / 1024 / 1024).toFixed(2)} MB • {coverImage.type}
                      </p>
                    </div>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={removeCoverImage}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <ImageIcon className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drag and drop cover image here, or click to select</p>
                  <p className="text-xs text-gray-500 mb-4">Supported formats: JPG, PNG (Max 5MB)</p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("cover-upload")?.click()}
                  >
                    Select Cover Image
                  </Button>
                  <input
                    id="cover-upload"
                    type="file"
                    accept="image/jpeg,image/png"
                    className="hidden"
                    onChange={handleCoverChange}
                  />
                </>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Upload Report (PDF)</Label>
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center ${
                draggingReport ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onDragOver={handleReportDragOver}
              onDragLeave={handleReportDragLeave}
              onDrop={handleReportDrop}
            >
              {reportFile ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <File className="h-8 w-8 text-red-500 mr-2" />
                    <div>
                      <p className="font-medium">{reportFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(reportFile.size / 1024 / 1024).toFixed(2)} MB • {reportFile.type}
                      </p>
                    </div>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={removeReportFile}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <File className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drag and drop report file here, or click to select</p>
                  <p className="text-xs text-gray-500 mb-4">Supported format: PDF (Max 20MB)</p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("report-upload")?.click()}
                  >
                    Select Report File
                  </Button>
                  <input
                    id="report-upload"
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={handleReportChange}
                  />
                </>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={uploading}>
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Report
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
