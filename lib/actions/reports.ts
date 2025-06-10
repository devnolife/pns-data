'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from './auth'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import crypto from 'crypto'

// Schemas
const createReportSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  category: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
})

const updateReportSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  content: z.string().min(1, 'Content is required').optional(),
  category: z.string().optional(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).optional(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'REJECTED']).optional(),
  assigneeId: z.string().optional(),
})

// Types
export interface ReportData {
  id: string
  title: string
  description: string | null
  content: string
  status: string
  category: string | null
  priority: string
  author_id: string
  created_at: Date
  updated_at: Date
  files: UploadedFileData[]
  author: {
    name: string | null
    username: string
    training?: string | null
    angkatan?: string | null
  }
}

export interface UploadedFileData {
  id: string
  filename: string
  original_name: string
  file_path: string
  file_size: number
  mime_type: string
  category: string | null
  year: string | null
  batch: string | null
  created_at: Date
  downloadUrl: string
}

export interface CreateReportData {
  title: string
  description?: string
  content: string
  category: string
  year: string
  batch: string
  fileIds?: string[]
  coverImageUrl?: string
}

export async function createReportAction(formData: FormData) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'Unauthorized' }
    }

    const data = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      content: formData.get('content') as string,
      category: formData.get('category') as string,
      priority: formData.get('priority') as string,
    }

    const validatedData = createReportSchema.parse(data)

    const report = await prisma.reports.create({
      data: {
        id: crypto.randomUUID(),
        title: validatedData.title,
        description: validatedData.description,
        content: validatedData.content,
        category: validatedData.category,
        priority: validatedData.priority,
        author_id: currentUser.id,
        updated_at: new Date(),
      },
      include: {
        users_reports_author_idTousers: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        }
      }
    })

    revalidatePath('/reports')
    return { success: true, report }
  } catch (error) {
    console.error('Create report error:', error)
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: 'Failed to create report' }
  }
}

export async function updateReportAction(formData: FormData) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'Unauthorized' }
    }

    const data = {
      id: formData.get('id') as string,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      content: formData.get('content') as string,
      category: formData.get('category') as string,
      priority: formData.get('priority') as string,
      status: formData.get('status') as string,
      assigneeId: formData.get('assigneeId') as string,
    }

    const validatedData = updateReportSchema.parse(data)

    // Check if user owns the report or is admin
    const existingReport = await prisma.reports.findUnique({
      where: { id: validatedData.id }
    })

    if (!existingReport) {
      return { error: 'Report not found' }
    }

    if (existingReport.author_id !== currentUser.id && currentUser.role !== 'ADMIN') {
      return { error: 'Unauthorized to update this report' }
    }

    const updateData: any = { updated_at: new Date() }
    if (validatedData.title) updateData.title = validatedData.title
    if (validatedData.description !== undefined) updateData.description = validatedData.description
    if (validatedData.content) updateData.content = validatedData.content
    if (validatedData.category !== undefined) updateData.category = validatedData.category
    if (validatedData.priority) updateData.priority = validatedData.priority
    if (validatedData.status) updateData.status = validatedData.status
    if (validatedData.assigneeId !== undefined) updateData.assignee_id = validatedData.assigneeId

    const report = await prisma.reports.update({
      where: { id: validatedData.id },
      data: updateData,
      include: {
        users_reports_author_idTousers: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        },
        users_reports_assignee_idTousers: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        }
      }
    })

    revalidatePath('/reports')
    revalidatePath(`/reports/${validatedData.id}`)
    return { success: true, report }
  } catch (error) {
    console.error('Update report error:', error)
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: 'Failed to update report' }
  }
}

export async function deleteReportAction(id: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'Unauthorized' }
    }

    const existingReport = await prisma.reports.findUnique({
      where: { id }
    })

    if (!existingReport) {
      return { error: 'Report not found' }
    }

    if (existingReport.author_id !== currentUser.id && currentUser.role !== 'ADMIN') {
      return { error: 'Unauthorized to delete this report' }
    }

    await prisma.reports.delete({
      where: { id }
    })

    revalidatePath('/reports')
    return { success: true }
  } catch (error) {
    console.error('Delete report error:', error)
    return { error: 'Failed to delete report' }
  }
}

export async function getReportsAction(page = 1, limit = 10, status?: string, category?: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'Unauthorized' }
    }

    const where: any = {}
    if (status) where.status = status
    if (category) where.category = category

    // Non-admin users can only see their own reports
    if (currentUser.role !== 'ADMIN') {
      where.author_id = currentUser.id
    }

    const [reports, total] = await Promise.all([
      prisma.reports.findMany({
        where,
        include: {
          users_reports_author_idTousers: {
            select: {
              id: true,
              username: true,
              name: true,
            }
          },
          users_reports_assignee_idTousers: {
            select: {
              id: true,
              username: true,
              name: true,
            }
          }
        },
        orderBy: { created_at: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.reports.count({ where })
    ])

    return {
      success: true,
      reports,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  } catch (error) {
    console.error('Get reports error:', error)
    return { error: 'Failed to fetch reports' }
  }
}

export async function getReportByIdAction(id: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return { error: 'Unauthorized' }
    }

    const report = await prisma.reports.findUnique({
      where: { id },
      include: {
        users_reports_author_idTousers: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        },
        users_reports_assignee_idTousers: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        }
      }
    })

    if (!report) {
      return { error: 'Report not found' }
    }

    // Non-admin users can only see their own reports
    if (currentUser.role !== 'ADMIN' && report.author_id !== currentUser.id) {
      return { error: 'Unauthorized to view this report' }
    }

    return { success: true, report }
  } catch (error) {
    console.error('Get report error:', error)
    return { error: 'Failed to fetch report' }
  }
}

// Create report with file uploads
export async function createReportWithFilesAction(data: CreateReportData) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Anda harus login terlebih dahulu'
      }
    }

    // Validate input data
    const validatedData = createReportSchema.parse(data)

    // Create report
    const reportId = crypto.randomUUID()
    const report = await prisma.reports.create({
      data: {
        id: reportId,
        title: validatedData.title,
        description: validatedData.description || '',
        content: `Laporan ${validatedData.category} - ${validatedData.title}`,
        cover_image_url: data.coverImageUrl || null,
        status: 'PENDING',
        category: validatedData.category,
        priority: 'MEDIUM',
        author_id: currentUser.id,
        updated_at: new Date(),
      }
    })

    // Update uploaded files to link them to this report
    if (data.fileIds && data.fileIds.length > 0) {
      await prisma.uploaded_files.updateMany({
        where: {
          id: { in: data.fileIds },
          author_id: currentUser.id,
          report_id: null // Only update files that aren't already linked to a report
        },
        data: {
          report_id: reportId,
          updated_at: new Date()
        }
      })
    }

    return {
      success: true,
      data: {
        reportId: report.id,
        message: 'Laporan berhasil dibuat dan file telah diunggah!'
      }
    }
  } catch (error) {
    console.error('Create report with files error:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message
      }
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal membuat laporan'
    }
  }
}

// Get user's uploaded files
export async function getUserUploadedFilesAction(params?: {
  category?: string
  year?: string
  batch?: string
  reportId?: string
  limit?: number
}) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Anda harus login terlebih dahulu'
      }
    }

    const where: any = {
      author_id: currentUser.id
    }

    if (params?.category) {
      where.category = params.category
    }

    if (params?.year) {
      where.year = params.year
    }

    if (params?.batch) {
      where.batch = params.batch
    }

    if (params?.reportId) {
      where.report_id = params.reportId
    }

    const files = await prisma.uploaded_files.findMany({
      where,
      orderBy: { created_at: 'desc' },
      take: params?.limit || 50,
      include: {
        reports: {
          select: {
            id: true,
            title: true,
            status: true
          }
        }
      }
    })

    const formattedFiles = files.map(file => ({
      id: file.id,
      filename: file.filename,
      original_name: file.original_name,
      file_path: file.file_path,
      file_size: file.file_size,
      mime_type: file.mime_type,
      category: file.category,
      year: file.year,
      batch: file.batch,
      created_at: file.created_at,
      downloadUrl: `/${file.file_path}`,
      report: file.reports
    }))

    return {
      success: true,
      data: formattedFiles
    }
  } catch (error) {
    console.error('Get user uploaded files error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengambil file'
    }
  }
}

// Get report with files
export async function getReportWithFilesAction(reportId: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Anda harus login terlebih dahulu'
      }
    }

    const report = await prisma.reports.findFirst({
      where: {
        id: reportId,
        author_id: currentUser.id
      },
      include: {
        users_reports_author_idTousers: {
          select: {
            name: true,
            username: true,
            training: true,
            angkatan: true
          }
        },
        files: {
          orderBy: { created_at: 'desc' }
        }
      }
    })

    if (!report) {
      return {
        success: false,
        error: 'Laporan tidak ditemukan'
      }
    }

    const formattedFiles = report.files.map(file => ({
      id: file.id,
      filename: file.filename,
      original_name: file.original_name,
      file_path: file.file_path,
      file_size: file.file_size,
      mime_type: file.mime_type,
      category: file.category,
      year: file.year,
      batch: file.batch,
      created_at: file.created_at,
      downloadUrl: `/${file.file_path}`
    }))

    return {
      success: true,
      data: {
        id: report.id,
        title: report.title,
        description: report.description,
        content: report.content,
        status: report.status,
        category: report.category,
        priority: report.priority,
        author_id: report.author_id,
        created_at: report.created_at,
        updated_at: report.updated_at,
        files: formattedFiles,
        author: report.users_reports_author_idTousers
      }
    }
  } catch (error) {
    console.error('Get report with files error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengambil laporan'
    }
  }
}

// Delete uploaded file
export async function deleteUploadedFileAction(fileId: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Anda harus login terlebih dahulu'
      }
    }

    // Check if user owns the file
    const file = await prisma.uploaded_files.findFirst({
      where: {
        id: fileId,
        author_id: currentUser.id
      }
    })

    if (!file) {
      return {
        success: false,
        error: 'File tidak ditemukan'
      }
    }

    // Delete file from database
    await prisma.uploaded_files.delete({
      where: { id: fileId }
    })

    // TODO: Also delete physical file from filesystem
    // This would require additional file system operations

    return {
      success: true,
      message: 'File berhasil dihapus'
    }
  } catch (error) {
    console.error('Delete uploaded file error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal menghapus file'
    }
  }
}

// Get file statistics for user
export async function getUserFileStatsAction() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Anda harus login terlebih dahulu'
      }
    }

    const [
      totalFiles,
      totalSize,
      filesByCategory,
      filesByYear,
      recentFiles
    ] = await Promise.all([
      // Total files count
      prisma.uploaded_files.count({
        where: { author_id: currentUser.id }
      }),

      // Total size of all files
      prisma.uploaded_files.aggregate({
        where: { author_id: currentUser.id },
        _sum: { file_size: true }
      }),

      // Files grouped by category
      prisma.uploaded_files.groupBy({
        by: ['category'],
        where: {
          author_id: currentUser.id,
          category: { not: null }
        },
        _count: { category: true }
      }),

      // Files grouped by year
      prisma.uploaded_files.groupBy({
        by: ['year'],
        where: {
          author_id: currentUser.id,
          year: { not: null }
        },
        _count: { year: true }
      }),

      // Recent files (last 5)
      prisma.uploaded_files.findMany({
        where: { author_id: currentUser.id },
        select: {
          id: true,
          original_name: true,
          file_size: true,
          mime_type: true,
          created_at: true,
          file_path: true
        },
        orderBy: { created_at: 'desc' },
        take: 5
      })
    ])

    return {
      success: true,
      data: {
        totalFiles,
        totalSize: totalSize._sum.file_size || 0,
        filesByCategory: filesByCategory.map(item => ({
          category: item.category,
          count: item._count.category
        })),
        filesByYear: filesByYear.map(item => ({
          year: item.year,
          count: item._count.year
        })),
        recentFiles: recentFiles.map(file => ({
          id: file.id,
          name: file.original_name,
          size: file.file_size,
          type: file.mime_type,
          createdAt: file.created_at,
          downloadUrl: `/${file.file_path}`
        }))
      }
    }
  } catch (error) {
    console.error('Get user file stats error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengambil statistik file'
    }
  }
}

// Get user reports for verification status page
export async function getUserReportsForVerificationStatus() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Anda harus login terlebih dahulu'
      }
    }

    const reports = await prisma.reports.findMany({
      where: {
        author_id: currentUser.id
      },
      include: {
        files: {
          select: {
            id: true,
            filename: true,
            original_name: true,
            file_size: true,
            mime_type: true,
            file_path: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    })

    const formattedReports = reports.map(report => ({
      id: report.id,
      title: report.title,
      description: report.description || '',
      category: report.category || 'GENERAL',
      status: (report.status.toLowerCase() === 'completed' ? 'verified' :
        report.status.toLowerCase() === 'rejected' ? 'rejected' : 'pending') as "pending" | "verified" | "rejected",
      submittedDate: report.created_at.toISOString(),
      verifiedDate: report.verified_at ? report.verified_at.toISOString() : undefined,
      rejectedDate: report.rejected_at ? report.rejected_at.toISOString() : undefined,
      feedback: report.feedback || undefined,
      files: report.files.map(file => ({
        name: file.original_name,
        size: formatFileSize(file.file_size),
        type: getFileTypeFromMime(file.mime_type)
      }))
    }))

    return {
      success: true,
      data: formattedReports
    }
  } catch (error) {
    console.error('Error fetching user reports for verification status:', error)
    return {
      success: false,
      error: 'Gagal mengambil laporan'
    }
  }
}

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
}

// Helper function to get file type from mime type
function getFileTypeFromMime(mimeType: string): string {
  if (mimeType.includes('pdf')) return 'PDF'
  if (mimeType.includes('word') || mimeType.includes('document')) return 'DOCX'
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return 'XLSX'
  if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return 'PPTX'
  if (mimeType.includes('image')) return 'IMAGE'
  return 'FILE'
}

// Get all public reports from all users for public display
export async function getPublicReportsAction() {
  try {
    // Get all completed/verified reports from all users
    const reports = await prisma.reports.findMany({
      where: {
        status: 'COMPLETED' // Only show verified/completed reports
      },
      include: {
        users_reports_author_idTousers: {
          select: {
            name: true,
            username: true,
            training: true,
            angkatan: true
          }
        },
        files: {
          select: {
            id: true,
            filename: true,
            original_name: true,
            file_size: true,
            mime_type: true,
            category: true,
            year: true,
            batch: true,
            created_at: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    })

    // Format reports for public display
    const formattedReports = reports.map(report => {
      // Use file data for year and batch instead of user profile data
      const firstFile = report.files[0]
      const reportYear = firstFile?.year || new Date(report.created_at).getFullYear().toString()
      const reportBatch = firstFile?.batch || 'General'

      return {
        id: report.id,
        title: report.title,
        description: report.description || '',
        category: report.category || 'GENERAL',
        priority: report.priority,
        author: {
          name: report.users_reports_author_idTousers?.name || 'Anonymous',
          username: report.users_reports_author_idTousers?.username || 'anonymous',
          training: report.users_reports_author_idTousers?.training || '',
          angkatan: report.users_reports_author_idTousers?.angkatan || ''
        },
        created_at: report.created_at,
        updated_at: report.updated_at,
        files: report.files.map(file => ({
          id: file.id,
          name: file.original_name,
          size: formatFileSize(file.file_size),
          type: getFileTypeFromMime(file.mime_type),
          category: file.category,
          year: file.year,
          batch: file.batch,
          created_at: file.created_at
        })),
        // Summary only - no actual content or download links
        abstract: report.description || `Laporan ${report.category} oleh ${report.users_reports_author_idTousers?.name || 'Anonymous'}`,
        year: reportYear, // Use file's year instead of created_at year
        batch: reportBatch // Use file's batch instead of user's angkatan
      }
    })

    return {
      success: true,
      data: formattedReports
    }
  } catch (error) {
    console.error('Get public reports error:', error)
    return {
      success: false,
      error: 'Gagal mengambil laporan publik'
    }
  }
}

// Get public reports organized by category for public collections page
export async function getPublicReportsByCategory() {
  try {
    const result = await getPublicReportsAction()

    if (!result.success || !result.data) {
      return {
        success: false,
        error: 'Gagal mengambil laporan publik'
      }
    }

    const reports = result.data

    // Define report categories
    const categories = [
      {
        id: "latsar-cpns",
        name: "Latsar Aktualisasi CPNS",
        description: "Laporan Aktualisasi Latsar Calon Pegawai Negeri Sipil",
        icon: "🎓",
        color: "from-blue-500 to-cyan-500",
      },
      {
        id: "laporan-pka",
        name: "Laporan PKA",
        description: "Laporan Pelatihan Kepemimpinan Administrator",
        icon: "👔",
        color: "from-purple-500 to-pink-500",
      },
      {
        id: "laporan-pkp",
        name: "Laporan PKP",
        description: "Laporan Pelatihan Kepemimpinan Pengawas",
        icon: "🔍",
        color: "from-green-500 to-emerald-500",
      },
      {
        id: "laporan-pkn",
        name: "Laporan PKN",
        description: "Laporan Kepemimpinan Nasional",
        icon: "🏛️",
        color: "from-orange-500 to-red-500",
      },
      {
        id: "laporan-umum",
        name: "Laporan Umum",
        description: "Laporan dan Dokumen Umum Lainnya",
        icon: "📋",
        color: "from-gray-500 to-slate-500",
      }
    ]

    // Group reports by category
    const categorizedReports = categories.map(category => {
      // Filter reports by category
      const categoryReports = reports.filter(report => {
        const reportCategory = (report.category || '').toLowerCase()
        const categoryId = category.id.toLowerCase()

        if (categoryId.includes('latsar') || categoryId.includes('cpns')) {
          return reportCategory.includes('latsar') || reportCategory.includes('cpns')
        } else if (categoryId.includes('pka')) {
          return reportCategory.includes('pka') || reportCategory.includes('administrator')
        } else if (categoryId.includes('pkp')) {
          return reportCategory.includes('pkp') || reportCategory.includes('pengawas')
        } else if (categoryId.includes('pkn')) {
          return reportCategory.includes('pkn') || reportCategory.includes('kepemimpinan nasional')
        } else {
          // General category for others
          return !reportCategory.includes('latsar') &&
            !reportCategory.includes('cpns') &&
            !reportCategory.includes('pka') &&
            !reportCategory.includes('pkp') &&
            !reportCategory.includes('pkn')
        }
      })

      // Map reports to file format expected by the UI
      const files = categoryReports.map(report => ({
        id: report.id,
        title: report.title,
        author: report.author?.name || 'Unknown',
        year: report.year || new Date().getFullYear().toString(),
        batch: report.batch || 'General',
        abstract: report.abstract || report.description || '',
        type: report.files && report.files.length > 0 ? report.files[0].type : 'REPORT',
        size: report.files && report.files.length > 0 ? report.files[0].size : 'N/A',
        downloadUrl: '', // No download for public view
        content: '', // No content for public view
        isPublicReport: true, // Flag to identify this as a public report
        category: report.category,
        priority: report.priority,
        created_at: report.created_at,
        fileCount: report.files ? report.files.length : 0
      }))

      return {
        ...category,
        files,
        totalFiles: files.length
      }
    })

    // Filter out empty categories
    const nonEmptyCategories = categorizedReports.filter(cat => cat.totalFiles > 0)

    return {
      success: true,
      categories: nonEmptyCategories,
      totalReports: reports.length
    }
  } catch (error) {
    console.error('Get public reports by category error:', error)
    return {
      success: false,
      error: 'Gagal mengambil laporan berdasarkan kategori'
    }
  }
}

// Get public reports by year
export async function getPublicReportsByYear(year?: number) {
  try {
    const targetYear = year || new Date().getFullYear()

    // Start and end dates for the target year
    const startDate = new Date(targetYear, 0, 1)
    const endDate = new Date(targetYear, 11, 31, 23, 59, 59, 999)

    // Get all completed reports for the target year
    const reports = await prisma.reports.findMany({
      where: {
        status: 'COMPLETED',
        created_at: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        users_reports_author_idTousers: {
          select: {
            name: true,
            username: true,
            training: true,
            angkatan: true
          }
        },
        files: {
          select: {
            id: true,
            filename: true,
            original_name: true,
            file_size: true,
            mime_type: true,
            category: true,
            year: true,
            batch: true,
            created_at: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    })

    // Format and categorize reports
    const formattedReports = reports.map(report => {
      // Use file data for year and batch instead of user profile data
      const firstFile = report.files[0]
      const reportYear = firstFile?.year || new Date(report.created_at).getFullYear().toString()
      const reportBatch = firstFile?.batch || 'General'

      return {
        id: report.id,
        title: report.title,
        description: report.description || '',
        category: report.category || 'GENERAL',
        priority: report.priority,
        author: {
          name: report.users_reports_author_idTousers?.name || 'Anonymous',
          username: report.users_reports_author_idTousers?.username || 'anonymous',
          training: report.users_reports_author_idTousers?.training || '',
          angkatan: report.users_reports_author_idTousers?.angkatan || ''
        },
        created_at: report.created_at,
        updated_at: report.updated_at,
        files: report.files.map(file => ({
          id: file.id,
          name: file.original_name,
          size: formatFileSize(file.file_size),
          type: getFileTypeFromMime(file.mime_type),
          category: file.category,
          year: file.year,
          batch: file.batch,
          created_at: file.created_at
        })),
        abstract: report.description || `Laporan ${report.category} oleh ${report.users_reports_author_idTousers?.name || 'Anonymous'}`,
        year: reportYear, // Use file's year instead of created_at year
        batch: reportBatch // Use file's batch instead of user's angkatan
      }
    })

    // Group reports by category
    const categories = [
      {
        id: "latsar-cpns",
        name: "Latsar Aktualisasi CPNS",
        description: "Laporan Aktualisasi Latsar Calon Pegawai Negeri Sipil",
        icon: "🎓",
        color: "from-blue-500 to-cyan-500",
      },
      {
        id: "laporan-pka",
        name: "Laporan PKA",
        description: "Laporan Pelatihan Kepemimpinan Administrator",
        icon: "👔",
        color: "from-purple-500 to-pink-500",
      },
      {
        id: "laporan-pkp",
        name: "Laporan PKP",
        description: "Laporan Pelatihan Kepemimpinan Pengawas",
        icon: "🔍",
        color: "from-green-500 to-emerald-500",
      },
      {
        id: "laporan-pkn",
        name: "Laporan PKN",
        description: "Laporan Kepemimpinan Nasional",
        icon: "🏛️",
        color: "from-orange-500 to-red-500",
      },
      {
        id: "laporan-umum",
        name: "Laporan Umum",
        description: "Laporan dan Dokumen Umum Lainnya",
        icon: "📋",
        color: "from-gray-500 to-slate-500",
      }
    ]

    // Group reports by category
    const categorizedReports = categories.map(category => {
      const categoryReports = formattedReports.filter(report => {
        const reportCategory = (report.category || '').toLowerCase()
        const categoryId = category.id.toLowerCase()

        if (categoryId.includes('latsar') || categoryId.includes('cpns')) {
          return reportCategory.includes('latsar') || reportCategory.includes('cpns')
        } else if (categoryId.includes('pka')) {
          return reportCategory.includes('pka') || reportCategory.includes('administrator')
        } else if (categoryId.includes('pkp')) {
          return reportCategory.includes('pkp') || reportCategory.includes('pengawas')
        } else if (categoryId.includes('pkn')) {
          return reportCategory.includes('pkn') || reportCategory.includes('kepemimpinan nasional')
        } else {
          return !reportCategory.includes('latsar') &&
            !reportCategory.includes('cpns') &&
            !reportCategory.includes('pka') &&
            !reportCategory.includes('pkp') &&
            !reportCategory.includes('pkn')
        }
      })

      const files = categoryReports.map(report => ({
        id: report.id,
        title: report.title,
        author: report.author.name,
        year: report.year,
        batch: report.batch,
        abstract: report.abstract,
        type: report.files.length > 0 ? report.files[0].type : 'REPORT',
        size: report.files.length > 0 ? report.files[0].size : 'N/A',
        downloadUrl: '',
        content: '',
        isPublicReport: true,
        category: report.category,
        priority: report.priority,
        created_at: report.created_at,
        fileCount: report.files.length
      }))

      return {
        ...category,
        files,
        totalFiles: files.length
      }
    })

    const nonEmptyCategories = categorizedReports.filter(cat => cat.totalFiles > 0)

    return {
      success: true,
      categories: nonEmptyCategories,
      year: targetYear,
      totalDocuments: reports.length
    }
  } catch (error) {
    console.error('Get public reports by year error:', error)
    return {
      success: false,
      error: 'Gagal mengambil laporan berdasarkan tahun'
    }
  }
}

// Get available years from reports
export async function getAvailableReportYears() {
  try {
    const reports = await prisma.reports.findMany({
      where: {
        status: 'COMPLETED'
      },
      select: {
        created_at: true
      }
    })

    const years = reports.map(report => new Date(report.created_at).getFullYear())
    const uniqueYears = [...new Set(years)].sort((a, b) => b - a)

    return {
      success: true,
      years: uniqueYears
    }
  } catch (error) {
    console.error('Get available report years error:', error)
    return {
      success: false,
      error: 'Gagal mengambil tahun laporan'
    }
  }
}

// Get public reports for public collections page with cover images
export async function getPublicReports() {
  try {
    const reports = await prisma.reports.findMany({
      where: {
        status: 'COMPLETED' // Only show verified/completed reports
      },
      select: {
        id: true,
        title: true,
        description: true,
        cover_image_url: true,
        created_at: true
      },
      orderBy: { created_at: 'desc' }
    })

    return {
      success: true,
      data: reports
    }
  } catch (error) {
    console.error('Get public reports error:', error)
    return {
      success: false,
      error: 'Gagal mengambil laporan publik'
    }
  }
}

// Generate secure temporary PDF viewing token
export async function generatePDFViewToken(reportId: string) {
  try {
    const currentTime = Date.now()
    const expiryTime = currentTime + (6 * 60 * 60 * 1000) // 6 hours from now

    const tokenData = {
      reportId,
      expiryTime,
      created: currentTime
    }

    // In a real app, you'd encrypt this properly
    const token = Buffer.from(JSON.stringify(tokenData)).toString('base64')

    return {
      success: true,
      token,
      expiryTime
    }
  } catch (error) {
    console.error('Generate PDF view token error:', error)
    return {
      success: false,
      error: 'Gagal membuat token akses PDF'
    }
  }
}

// Verify PDF viewing token
export async function verifyPDFViewToken(token: string) {
  try {
    const tokenData = JSON.parse(Buffer.from(token, 'base64').toString())
    const currentTime = Date.now()

    if (currentTime > tokenData.expiryTime) {
      return {
        success: false,
        error: 'Token akses telah kedaluwarsa. Silakan muat ulang halaman.'
      }
    }

    return {
      success: true,
      reportId: tokenData.reportId
    }
  } catch (error) {
    console.error('Verify PDF view token error:', error)
    return {
      success: false,
      error: 'Token akses tidak valid'
    }
  }
}

// Get report PDF files for viewing (with token verification)
export async function getReportPDFFiles(reportId: string, token: string) {
  try {
    // Verify token first
    const tokenVerification = await verifyPDFViewToken(token)
    if (!tokenVerification.success) {
      return tokenVerification
    }

    // Get report with PDF files
    const report = await prisma.reports.findFirst({
      where: {
        id: reportId,
        status: 'COMPLETED'
      },
      include: {
        files: {
          where: {
            mime_type: { contains: 'pdf' }
          },
          select: {
            id: true,
            filename: true,
            original_name: true,
            file_path: true,
            file_size: true
          }
        }
      }
    })

    if (!report) {
      return {
        success: false,
        error: 'Laporan tidak ditemukan'
      }
    }

    return {
      success: true,
      data: {
        reportId: report.id,
        title: report.title,
        files: report.files
      }
    }
  } catch (error) {
    console.error('Get report PDF files error:', error)
    return {
      success: false,
      error: 'Gagal mengambil file PDF'
    }
  }
}

// Get public reports organized hierarchically by category → year → batch (NO AUTH REQUIRED)
export async function getPublicReportsHierarchicalAction() {
  try {
    // Define default categories
    const defaultCategories = [
      { key: 'pkn', name: 'PKN (Pelatihan Kepemimpinan Nasional)', description: 'Laporan pelatihan kepemimpinan tingkat nasional yang sudah diverifikasi! 🔥' },
      { key: 'pka', name: 'PKA (Administrator)', description: 'Laporan pelatihan untuk jabatan administrator yang sudah diverifikasi! 🚀' },
      { key: 'pkp', name: 'PKP (Pengawas)', description: 'Laporan pelatihan untuk jabatan pengawas yang sudah diverifikasi! ✨' },
      { key: 'latsar', name: 'Latsar CPNS', description: 'Laporan Pelatihan Dasar CPNS yang sudah diverifikasi! 💫' }
    ]

    // Get all completed reports from all users (NO AUTH CHECK)
    const reports = await prisma.reports.findMany({
      where: {
        status: 'COMPLETED' // Only verified/completed reports
      },
      select: {
        id: true,
        title: true,
        description: true,
        content: true,
        cover_image_url: true,
        status: true,
        category: true,
        priority: true,
        author_id: true,
        created_at: true,
        updated_at: true,
        users_reports_author_idTousers: {
          select: {
            name: true,
            username: true,
            training: true,
            angkatan: true
          }
        },
        files: {
          select: {
            id: true,
            filename: true,
            original_name: true,
            file_size: true,
            mime_type: true,
            file_type: true,
            category: true,
            year: true,
            batch: true,
            created_at: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    })

    console.log(`📊 Found ${reports.length} completed public reports for hierarchical view`)

    // Group reports by category → year → angkatan based on FILE data
    const categorizedReports = reports.reduce((acc, report) => {
      // Normalize category name to match default categories
      let categoryKey = 'other'
      const categoryLower = (report.category || '').toLowerCase()

      if (categoryLower.includes('pkn') || categoryLower.includes('kepemimpinan nasional')) {
        categoryKey = 'pkn'
      } else if (categoryLower.includes('pka') || categoryLower.includes('administrator')) {
        categoryKey = 'pka'
      } else if (categoryLower.includes('pkp') || categoryLower.includes('pengawas')) {
        categoryKey = 'pkp'
      } else if (categoryLower.includes('latsar') || categoryLower.includes('cpns')) {
        categoryKey = 'latsar'
      }

      // Use data from file for year and batch, not from user profile
      const firstFile = report.files[0]
      const year = firstFile?.year || new Date(report.created_at).getFullYear().toString()
      const angkatan = firstFile?.batch || report.users_reports_author_idTousers?.angkatan || 'I'

      if (!acc[categoryKey]) {
        acc[categoryKey] = {}
      }
      if (!acc[categoryKey][year]) {
        acc[categoryKey][year] = {}
      }
      if (!acc[categoryKey][year][angkatan]) {
        acc[categoryKey][year][angkatan] = []
      }

      acc[categoryKey][year][angkatan].push({
        id: report.id,
        title: report.title,
        description: report.description,
        content: report.content,
        cover_image_url: report.cover_image_url,
        status: report.status,
        category: report.category,
        priority: report.priority,
        author_id: report.author_id,
        created_at: report.created_at,
        updated_at: report.updated_at,
        author: report.users_reports_author_idTousers,
        files: report.files,
        isPublicReport: true
      })
      return acc
    }, {} as Record<string, Record<string, Record<string, any[]>>>)

    // Create categories array with default categories always present
    const categories = defaultCategories.map(defaultCat => {
      const categoryReports = categorizedReports[defaultCat.key] || {}

      const years = Object.keys(categoryReports).map(year => {
        const yearReports = categoryReports[year]
        const angkatanList = Object.keys(yearReports).map(angkatan => ({
          id: `${defaultCat.key}-${year}-${angkatan}`,
          angkatan: angkatan,
          reports: yearReports[angkatan],
          totalReports: yearReports[angkatan].length
        })).sort((a, b) => a.angkatan.localeCompare(b.angkatan))

        return {
          id: `${defaultCat.key}-${year}`,
          year: year,
          angkatan: angkatanList,
          totalReports: Object.values(yearReports).flat().length
        }
      }).sort((a, b) => parseInt(b.year) - parseInt(a.year))

      return {
        id: defaultCat.key,
        name: defaultCat.name,
        description: defaultCat.description,
        years: years,
        totalReports: Object.values(categoryReports).flat().map(yearData => Object.values(yearData).flat()).flat().length
      }
    })

    // Add "Other" category if there are reports that don't match default categories
    if (categorizedReports.other && Object.keys(categorizedReports.other).length > 0) {
      const otherReports = categorizedReports.other
      const otherYears = Object.keys(otherReports).map(year => {
        const yearReports = otherReports[year]
        const angkatanList = Object.keys(yearReports).map(angkatan => ({
          id: `other-${year}-${angkatan}`,
          angkatan: angkatan,
          reports: yearReports[angkatan],
          totalReports: yearReports[angkatan].length
        })).sort((a, b) => a.angkatan.localeCompare(b.angkatan))

        return {
          id: `other-${year}`,
          year: year,
          angkatan: angkatanList,
          totalReports: Object.values(yearReports).flat().length
        }
      }).sort((a, b) => parseInt(b.year) - parseInt(a.year))

      categories.push({
        id: 'other',
        name: 'Lainnya',
        description: 'Laporan dalam kategori lainnya yang sudah diverifikasi',
        years: otherYears,
        totalReports: Object.values(otherReports).flat().map(yearData => Object.values(yearData).flat()).flat().length
      })
    }

    return {
      success: true,
      data: {
        categories,
        totalReports: reports.length,
        isPublicView: true
      }
    }
  } catch (error) {
    console.error('Get public reports hierarchical error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengambil laporan publik'
    }
  }
}

// Get public reports by specific category, year, and batch (NO AUTH REQUIRED)
export async function getPublicReportsByAngkatanAction(category: string, year: string, angkatan: string) {
  try {
    // Build category filter
    let categoryFilter: any = {}
    const categoryLower = category.toLowerCase()

    if (categoryLower === 'pkn') {
      categoryFilter = {
        OR: [
          { category: { contains: 'PKN', mode: 'insensitive' } },
          { category: { contains: 'kepemimpinan nasional', mode: 'insensitive' } }
        ]
      }
    } else if (categoryLower === 'pka') {
      categoryFilter = {
        OR: [
          { category: { contains: 'PKA', mode: 'insensitive' } },
          { category: { contains: 'administrator', mode: 'insensitive' } }
        ]
      }
    } else if (categoryLower === 'pkp') {
      categoryFilter = {
        OR: [
          { category: { contains: 'PKP', mode: 'insensitive' } },
          { category: { contains: 'pengawas', mode: 'insensitive' } }
        ]
      }
    } else if (categoryLower === 'latsar') {
      categoryFilter = {
        OR: [
          { category: { contains: 'LATSAR', mode: 'insensitive' } },
          { category: { contains: 'CPNS', mode: 'insensitive' } }
        ]
      }
    }

    // Get reports based on file data, not user profile (NO AUTH CHECK)
    const reports = await prisma.reports.findMany({
      where: {
        status: 'COMPLETED', // Only verified reports
        ...categoryFilter,
        files: {
          some: {
            year: year,
            batch: angkatan
          }
        }
      },
      include: {
        users_reports_author_idTousers: {
          select: {
            name: true,
            username: true,
            training: true,
            angkatan: true
          }
        },
        files: {
          select: {
            id: true,
            filename: true,
            original_name: true,
            file_size: true,
            mime_type: true,
            category: true,
            year: true,
            batch: true,
            created_at: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    })

    console.log(`📊 Found ${reports.length} public reports for ${category}/${year}/${angkatan}`)

    const formattedReports = reports.map(report => ({
      id: report.id,
      title: report.title,
      description: report.description,
      content: report.content,
      cover_image_url: report.cover_image_url,
      status: report.status,
      category: report.category,
      priority: report.priority,
      author_id: report.author_id,
      created_at: report.created_at,
      updated_at: report.updated_at,
      author: report.users_reports_author_idTousers,
      files: report.files,
      isPublicReport: true
    }))

    return {
      success: true,
      data: {
        reports: formattedReports,
        category,
        year,
        angkatan,
        totalReports: formattedReports.length,
        isPublicView: true
      }
    }
  } catch (error) {
    console.error('Get public reports by angkatan error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengambil laporan publik'
    }
  }
}
