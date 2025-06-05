"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/hooks/use-toast"
import { Upload, File, X, Loader2, Sparkles, Star, Zap, CloudUpload, FileText, CheckCircle, ImageIcon } from "lucide-react"
import { createReportWithFilesAction } from "@/lib/actions/reports"

interface UploadedFile {
  id: string
  originalName: string
  fileSize: number
  mimeType: string
}

export default function UploadReportPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [year, setYear] = useState("")
  const [batch, setBatch] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadingFiles, setUploadingFiles] = useState(false)
  const [uploadingCover, setUploadingCover] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [draggingCover, setDraggingCover] = useState(false)
  const [error, setError] = useState("")

  if (!isAuthenticated) {
    router.push("/login")
    return null
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)

    if (e.dataTransfer.files) {
      const newFiles = Array.from(e.dataTransfer.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFiles((prev) => [...prev, ...newFiles])
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const uploadFiles = async () => {
    if (files.length === 0) return []

    setUploadingFiles(true)
    try {
      const formData = new FormData()

      files.forEach((file) => {
        formData.append('files', file)
      })

      formData.append('category', category)
      formData.append('year', year)
      formData.append('batch', batch)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || 'Upload failed')
      }

      setUploadedFiles(result.files)
      return result.files.map((file: any) => file.id)
    } catch (error) {
      console.error('File upload error:', error)
      throw error
    } finally {
      setUploadingFiles(false)
    }
  }

  // Handler untuk upload cover image
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]

      // Validasi file type
      if (!file.type.startsWith('image/')) {
        setError("File sampul harus berupa gambar (JPG, PNG, GIF)! 🖼️")
        return
      }

      // Validasi file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("Ukuran file sampul maksimal 5MB! 📏")
        return
      }

      setCoverImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setCoverImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)

      setError("") // Clear any previous errors
    }
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

      if (!file.type.startsWith('image/')) {
        setError("File sampul harus berupa gambar (JPG, PNG, GIF)! 🖼️")
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("Ukuran file sampul maksimal 5MB! 📏")
        return
      }

      setCoverImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (event) => {
        setCoverImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)

      setError("")
    }
  }

  const removeCoverImage = () => {
    setCoverImage(null)
    setCoverImagePreview(null)
  }

  // Upload cover image function
  const uploadCoverImage = async (): Promise<string | null> => {
    if (!coverImage) return null

    setUploadingCover(true)
    try {
      const formData = new FormData()
      formData.append('coverImage', coverImage)
      formData.append('category', category)
      formData.append('year', year)
      formData.append('batch', batch)

      const response = await fetch('/api/upload-cover', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Cover upload failed')
      }

      const result = await response.json()
      return result.coverImageUrl
    } catch (error) {
      console.error('Cover upload error:', error)
      throw error
    } finally {
      setUploadingCover(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!title) {
      setError("Mohon masukkan judul laporan Anda! 📝")
      return
    }

    if (!category) {
      setError("Mohon pilih kategori untuk laporan Anda! 📂")
      return
    }

    if (!year) {
      setError("Mohon pilih tahun pelatihan! 📅")
      return
    }

    if (!batch) {
      setError("Mohon pilih angkatan! 👥")
      return
    }

    if (files.length === 0) {
      setError("Mohon unggah setidaknya satu file! 📎")
      return
    }

    setUploading(true)

    try {
      // First upload cover image if provided
      let coverImageUrl = null
      if (coverImage) {
        coverImageUrl = await uploadCoverImage()
      }

      // Then upload files
      const fileIds = await uploadFiles()

      // Create content based on form data
      const content = `Laporan ${category} - ${title}
      
Kategori: ${category}
Tahun Pelatihan: ${year}
Angkatan: ${batch}

${description ? `Deskripsi:
${description}` : ''}

File yang diunggah: ${files.map(f => f.name).join(', ')}`

      // Create report with file references and cover
      const result = await createReportWithFilesAction({
        title,
        description,
        content,
        category,
        year,
        batch,
        fileIds,
        coverImageUrl
      })

      if (!result.success) {
        throw new Error(result.error || 'Failed to create report')
      }

      // Show success toast with better messaging
      toast({
        title: "🎉 Laporan berhasil diunggah!",
        description: `Laporan "${title}" telah berhasil diunggah dengan ${files.length} file${coverImage ? ' dan sampul' : ''}. Laporan sedang menunggu verifikasi admin. ✨`,
        duration: 5000,
      })

      // Reset form
      setTitle("")
      setDescription("")
      setCategory("")
      setYear("")
      setBatch("")
      setFiles([])
      setCoverImage(null)
      setCoverImagePreview(null)
      setUploadedFiles([])

      // Redirect to dashboard after a short delay to let user see the toast
      setTimeout(() => {
        router.push("/dashboard/user")
      }, 2000)
    } catch (error) {
      console.error('Submit error:', error)
      setError(error instanceof Error ? error.message : 'Gagal mengunggah laporan')

      // Show error toast
      toast({
        title: "❌ Gagal mengunggah laporan",
        description: error instanceof Error ? error.message : 'Terjadi kesalahan saat mengunggah laporan. Silakan coba lagi.',
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setUploading(false)
    }
  }

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase()
    switch (extension) {
      case 'pdf':
        return '📄'
      case 'docx':
      case 'doc':
        return '📝'
      case 'xlsx':
      case 'xls':
        return '📊'
      case 'pptx':
      case 'ppt':
        return '📋'
      case 'zip':
      case 'rar':
        return '🗜️'
      default:
        return '📁'
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
      {/* Floating decorative elements */}
      <div className="fixed top-20 left-10 h-20 w-20 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed top-40 right-20 h-16 w-16 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full animate-pulse blur-xl" />
      <div className="fixed bottom-40 left-20 h-24 w-24 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full animate-pulse blur-xl" />

      {/* Header with Gen Z vibes */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-md rounded-full mb-4 shadow-lg border border-white/20">
          <CloudUpload className="h-4 w-4 text-purple-500 animate-pulse" />
          <span className="text-purple-700 font-semibold text-sm">Upload Zone</span>
          <Zap className="h-4 w-4 text-pink-500 animate-bounce" />
        </div>
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Unggah Laporan ✨
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Upload laporan dan dokumen Anda ke sistem dengan mudah! 🚀
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Form Fields */}
            <Card className="overflow-hidden bg-white/70 backdrop-blur-md border-0 shadow-xl rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold mb-1">Detail Laporan 📋</CardTitle>
                    <CardDescription className="text-blue-100">
                      Berikan informasi tentang laporan yang akan Anda unggah 💫
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Star className="h-5 w-5 text-yellow-300 animate-pulse" />
                    <Sparkles className="h-5 w-5 text-pink-300 animate-bounce" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {error && (
                  <Alert className="border-red-200 bg-red-50/80 backdrop-blur-sm rounded-xl">
                    <AlertDescription className="text-red-700 font-medium">{error}</AlertDescription>
                  </Alert>
                )}

                {/* Title Input */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    📝 Judul Laporan
                  </Label>
                  <Input
                    id="title"
                    placeholder="Masukkan judul laporan yang keren..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md focus:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                {/* Category and Year Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      📂 Kategori
                    </Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger id="category" className="bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md">
                        <SelectValue placeholder="Pilih kategori..." />
                      </SelectTrigger>
                      <SelectContent className="bg-white/90 backdrop-blur-md border-white/20 rounded-xl">
                        <SelectItem value="PKN">🎯 PKN (Pelatihan Kepemimpinan Nasional)</SelectItem>
                        <SelectItem value="PKP">👁️ PKP (Pengawas)</SelectItem>
                        <SelectItem value="PKA">⚙️ PKA (Administrator)</SelectItem>
                        <SelectItem value="Latsar CPNS">🎓 Latsar CPNS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      📅 Tahun Pelatihan
                    </Label>
                    <Select value={year} onValueChange={setYear}>
                      <SelectTrigger id="year" className="bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md">
                        <SelectValue placeholder="Pilih tahun..." />
                      </SelectTrigger>
                      <SelectContent className="bg-white/90 backdrop-blur-md border-white/20 rounded-xl">
                        <SelectItem value="2024">2024</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Batch Selection */}
                <div className="space-y-2">
                  <Label htmlFor="batch" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    👥 Angkatan
                  </Label>
                  <Select value={batch} onValueChange={setBatch}>
                    <SelectTrigger id="batch" className="bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md">
                      <SelectValue placeholder="Pilih angkatan..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white/90 backdrop-blur-md border-white/20 rounded-xl">
                      <SelectItem value="I">Angkatan I</SelectItem>
                      <SelectItem value="II">Angkatan II</SelectItem>
                      <SelectItem value="III">Angkatan III</SelectItem>
                      <SelectItem value="IV">Angkatan IV</SelectItem>
                      <SelectItem value="V">Angkatan V</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    💭 Deskripsi (Opsional)
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Ceritakan tentang laporan Anda..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md focus:shadow-lg transition-all duration-300 focus:ring-2 focus:ring-purple-400 resize-none"
                  />
                </div>

                {/* Cover Image Upload */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    🖼️ Sampul Laporan (Opsional)
                  </Label>
                  <div
                    className={`relative border-2 border-dashed rounded-xl p-4 text-center transition-all duration-300 ${draggingCover
                      ? "border-pink-500 bg-pink-50/80 backdrop-blur-sm scale-105"
                      : "border-gray-300 bg-white/50 backdrop-blur-sm hover:border-pink-400 hover:bg-pink-50/50"
                      }`}
                    onDragOver={handleCoverDragOver}
                    onDragLeave={handleCoverDragLeave}
                    onDrop={handleCoverDrop}
                  >
                    {coverImage && coverImagePreview ? (
                      <div className="relative">
                        <img
                          src={coverImagePreview}
                          alt="Preview sampul"
                          className="max-h-40 mx-auto rounded-lg object-cover shadow-md"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={removeCoverImage}
                          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 hover:bg-red-600 text-white"
                          disabled={uploadingCover}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <div className="mt-2 p-2 bg-white/70 backdrop-blur-sm rounded-lg">
                          <p className="text-xs font-medium text-gray-700">{coverImage.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(coverImage.size)}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="relative z-10">
                        <div className="mb-3">
                          <ImageIcon className={`h-12 w-12 mx-auto transition-all duration-300 ${draggingCover ? "text-pink-500 scale-110" : "text-gray-400"
                            }`} />
                        </div>
                        <h4 className="text-lg font-bold text-gray-800 mb-1">
                          {draggingCover ? "Drop gambar di sini! 🎯" : "Drag & Drop gambar sampul ✨"}
                        </h4>
                        <p className="text-gray-600 mb-1">atau klik tombol di bawah untuk memilih</p>
                        <p className="text-xs text-gray-500 mb-4">
                          Format: JPG, PNG, GIF (Maks 5MB) 🖼️
                        </p>
                        <Button
                          type="button"
                          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white border-0 rounded-xl px-6 py-2 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                          onClick={() => document.getElementById("cover-upload")?.click()}
                          disabled={uploadingCover}
                        >
                          {uploadingCover ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <ImageIcon className="mr-2 h-4 w-4" />
                              Pilih Sampul 🎨
                            </>
                          )}
                        </Button>
                        <input
                          id="cover-upload"
                          type="file"
                          accept="image/jpeg,image/png,image/gif"
                          className="hidden"
                          onChange={handleCoverImageChange}
                          aria-label="Upload cover image"
                          title="Upload cover image"
                        />
                      </div>
                    )}

                    {/* Floating elements in cover upload zone */}
                    <div className="absolute top-2 right-2 text-lg animate-bounce opacity-50">🎨</div>
                    <div className="absolute bottom-2 left-2 text-lg animate-pulse opacity-50">🖼️</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - File Upload */}
            <Card className="overflow-hidden bg-white/70 backdrop-blur-md border-0 shadow-xl rounded-2xl">
              <CardHeader className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <CloudUpload className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl font-bold mb-1">Upload File 📎</CardTitle>
                    <CardDescription className="text-green-100">
                      Drag & drop atau pilih file untuk diunggah ✨
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Upload className="h-5 w-5 text-yellow-300 animate-pulse" />
                    <Zap className="h-5 w-5 text-pink-300 animate-bounce" />
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {/* File Upload Zone */}
                <div className="space-y-3">
                  <div
                    className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${dragging
                      ? "border-purple-500 bg-purple-50/80 backdrop-blur-sm scale-105"
                      : "border-gray-300 bg-white/50 backdrop-blur-sm hover:border-purple-400 hover:bg-purple-50/50"
                      }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="relative z-10">
                      <div className="mb-4">
                        <CloudUpload className={`h-16 w-16 mx-auto transition-all duration-300 ${dragging ? "text-purple-500 scale-110" : "text-gray-400"
                          }`} />
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {dragging ? "Drop files di sini! 🎯" : "Drag & Drop file di sini ✨"}
                      </h3>
                      <p className="text-gray-600 mb-2">atau klik tombol di bawah untuk memilih file</p>
                      <p className="text-sm text-gray-500 mb-6">
                        Format: PDF, DOCX, XLSX, PPTX, ZIP (Maks 20MB) 📁
                      </p>
                      <Button
                        type="button"
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                        onClick={() => document.getElementById("file-upload")?.click()}
                        disabled={uploadingFiles}
                      >
                        {uploadingFiles ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-5 w-5" />
                            Pilih File Keren! 🚀
                          </>
                        )}
                      </Button>
                      <input
                        id="file-upload"
                        type="file"
                        multiple
                        accept=".pdf,.docx,.doc,.xlsx,.xls,.pptx,.ppt,.zip,.rar"
                        className="hidden"
                        onChange={handleFileChange}
                        aria-label="Upload files"
                        title="Upload files"
                      />
                    </div>

                    {/* Floating elements in upload zone */}
                    <div className="absolute top-4 right-4 text-2xl animate-bounce opacity-50">✨</div>
                    <div className="absolute bottom-4 left-4 text-2xl animate-pulse opacity-50">🌟</div>
                  </div>
                </div>

                {/* Selected Files */}
                {files.length > 0 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                      📋 File yang Dipilih ({files.length})
                    </Label>
                    <div className="bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl divide-y divide-gray-200/50 shadow-md max-h-64 overflow-y-auto">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 hover:bg-white/30 transition-all duration-200">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{getFileIcon(file.name)}</div>
                            <div>
                              <p className="font-semibold text-gray-800 text-sm">{file.name}</p>
                              <p className="text-xs text-gray-600">
                                {formatFileSize(file.size)} • {file.type || 'Unknown type'}
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(index)}
                            className="h-8 w-8 rounded-full hover:bg-red-100 hover:text-red-600 transition-all duration-200"
                            disabled={uploadingFiles}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Uploaded Files Status */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-green-800 flex items-center gap-2">
                      ✅ File Berhasil Diunggah ({uploadedFiles.length})
                    </Label>
                    <div className="bg-green-50/50 backdrop-blur-sm border border-green-200/50 rounded-xl divide-y divide-green-200/50 shadow-md">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3">
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">✅</div>
                            <div>
                              <p className="font-semibold text-green-800 text-sm">{file.originalName}</p>
                              <p className="text-xs text-green-600">
                                {formatFileSize(file.fileSize)} • Uploaded successfully
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Footer with Action Buttons */}
          <Card className="mt-8 overflow-hidden bg-white/70 backdrop-blur-md border-0 shadow-xl rounded-2xl">
            <CardFooter className="p-6 bg-gray-50/50 backdrop-blur-sm">
              <div className="flex justify-between w-full gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="px-8 py-3 text-lg font-semibold bg-white/70 backdrop-blur-sm border-white/20 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  disabled={uploading || uploadingFiles}
                >
                  Batal 😔
                </Button>
                <Button
                  type="submit"
                  disabled={uploading || uploadingFiles}
                  className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Mengunggah Laporan... 🚀
                    </>
                  ) : uploadingFiles ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Mengunggah File... 📎
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Unggah Laporan! ✨
                    </>
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  )
}
