'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from './auth'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

// Schema validation
const createReportFolderSchema = z.object({
  reportType: z.enum(['PKN', 'PKP', 'PKA', 'LATSAR'], {
    required_error: 'Jenis laporan wajib dipilih'
  }),
  year: z.string().min(4, 'Tahun harus 4 digit').max(4, 'Tahun harus 4 digit'),
  batch: z.string().min(1, 'Angkatan wajib diisi'),
  description: z.string().optional()
})

const updateReportFolderSchema = z.object({
  id: z.string().uuid(),
  reportType: z.enum(['PKN', 'PKP', 'PKA', 'LATSAR']).optional(),
  year: z.string().min(4).max(4).optional(),
  batch: z.string().min(1).optional(),
  description: z.string().optional(),
  is_active: z.boolean().optional()
})

// Types
export interface ReportFolderData {
  id: string
  reportType: string
  year: string
  batch: string
  description?: string
  created_by: string
  is_active: boolean
  created_at: Date
  updated_at: Date
  creator: {
    id: string
    name: string
    username: string
  }
}

// Add this utility function after the imports but before the interfaces
/**
 * Utility function to trigger comprehensive data sync notifications
 * This ensures all relevant pages are updated when folder operations occur
 */
export async function triggerDataSyncNotification(type: string, data?: any) {
  // Revalidate all relevant paths for real-time updates
  const pathsToRevalidate = [
    '/dashboard/admin/report-folders',
    '/dashboard/admin/verify-reports',
    '/dashboard/admin/manage-users',
    '/dashboard/admin',
    '/dashboard/user',
    '/dashboard/user/my-files',
    '/dashboard/user/digital-collection',
    '/dashboard/user/verification-status',
    '/dashboard/user/upload-report',
    '/dashboard/collections',
    '/dashboard/statistics',
    '/(public)',
    '/(public)/public-collections',
    '/api/public-collections',
    '/api/reports',
    '/api/admin/reports'
  ]

  // Use Promise.all for parallel revalidation
  const revalidationResults = await Promise.all(
    pathsToRevalidate.map(async (path) => {
      try {
        revalidatePath(path)
        console.log(`✅ Revalidated: ${path}`)
        return { path, success: true }
      } catch (error) {
        console.log(`⚠️ Failed to revalidate: ${path}`, error)
        return { path, success: false, error }
      }
    })
  )

  const successCount = revalidationResults.filter(r => r.success).length
  const failureCount = revalidationResults.filter(r => !r.success).length

  console.log(`🔄 Data sync notification completed:`)
  console.log(`   - Type: ${type}`)
  console.log(`   - Successful revalidations: ${successCount}/${pathsToRevalidate.length}`)
  if (failureCount > 0) {
    console.log(`   - Failed revalidations: ${failureCount}`)
  }

  return {
    success: true,
    revalidatedPaths: successCount,
    failedPaths: failureCount,
    type,
    data
  }
}

// Create report folder
export async function createReportFolderAction(data: {
  reportType: string
  year: string
  batch: string
  description?: string
}) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return {
        success: false,
        error: 'Unauthorized. Admin access required.'
      }
    }

    // Validate input data
    const validatedData = createReportFolderSchema.parse(data)

    // Check if folder with same year, batch, and report type already exists
    const existingFolder = await prisma.report_folders.findFirst({
      where: {
        year: validatedData.year,
        batch: validatedData.batch,
        report_type: validatedData.reportType
      }
    })

    if (existingFolder) {
      return {
        success: false,
        error: `Folder untuk ${validatedData.reportType} tahun ${validatedData.year} angkatan ${validatedData.batch} sudah ada`
      }
    }

    // Create folder name based on report type, year, and batch
    const folderName = `${validatedData.reportType} ${validatedData.year} - Angkatan ${validatedData.batch}`

    const reportFolder = await prisma.report_folders.create({
      data: {
        year: validatedData.year,
        batch: validatedData.batch,
        report_type: validatedData.reportType,
        description: validatedData.description || `Folder untuk laporan ${validatedData.reportType} tahun ${validatedData.year} angkatan ${validatedData.batch}`,
        created_by: currentUser.id
      },
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            username: true
          }
        }
      }
    })

    // Trigger comprehensive data sync
    await triggerDataSyncNotification('folder-created', {
      folderId: reportFolder.id,
      folderInfo: `${validatedData.year} - Angkatan ${validatedData.batch}`,
      reportType: validatedData.reportType
    })

    return {
      success: true,
      data: {
        id: reportFolder.id,
        reportType: reportFolder.report_type,
        year: reportFolder.year,
        batch: reportFolder.batch,
        description: reportFolder.description,
        created_by: reportFolder.created_by,
        is_active: reportFolder.is_active,
        created_at: reportFolder.created_at,
        updated_at: reportFolder.updated_at,
        creator: reportFolder.creator
      },
      message: `Folder ${folderName} berhasil dibuat`
    }
  } catch (error) {
    console.error('Create report folder error:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message
      }
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal membuat folder laporan'
    }
  }
}

// Get all report folders
export async function getReportFoldersAction(page = 1, limit = 10, search?: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return {
        success: false,
        error: 'Unauthorized. Admin access required.'
      }
    }

    const where: any = {}

    if (search) {
      where.OR = [
        { year: { contains: search, mode: 'insensitive' } },
        { batch: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [reportFolders, total] = await Promise.all([
      prisma.report_folders.findMany({
        where,
        include: {
          creator: {
            select: {
              id: true,
              name: true,
              username: true
            }
          }
        },
        orderBy: [
          { year: 'desc' },
          { batch: 'asc' }
        ],
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.report_folders.count({ where })
    ])

    return {
      success: true,
      data: reportFolders.map(folder => ({
        id: folder.id,
        reportType: folder.report_type,
        year: folder.year,
        batch: folder.batch,
        description: folder.description,
        created_by: folder.created_by,
        is_active: folder.is_active,
        created_at: folder.created_at,
        updated_at: folder.updated_at,
        creator: folder.creator
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  } catch (error) {
    console.error('Get report folders error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengambil data folder laporan'
    }
  }
}

// Update report folder
export async function updateReportFolderAction(data: {
  id: string
  reportType?: string
  year?: string
  batch?: string
  description?: string
  is_active?: boolean
}) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return {
        success: false,
        error: 'Unauthorized. Admin access required.'
      }
    }

    const validatedData = updateReportFolderSchema.parse(data)

    // Check if folder exists
    const existingFolder = await prisma.report_folders.findUnique({
      where: { id: validatedData.id }
    })

    if (!existingFolder) {
      return {
        success: false,
        error: 'Folder tidak ditemukan'
      }
    }

    // If year, batch, or reportType is being updated, check for conflicts
    if (validatedData.year || validatedData.batch || validatedData.reportType) {
      const newYear = validatedData.year || existingFolder.year
      const newBatch = validatedData.batch || existingFolder.batch
      const newReportType = validatedData.reportType || existingFolder.report_type

      const conflictFolder = await prisma.report_folders.findFirst({
        where: {
          year: newYear,
          batch: newBatch,
          report_type: newReportType,
          NOT: { id: validatedData.id }
        }
      })

      if (conflictFolder) {
        return {
          success: false,
          error: `Folder untuk ${newReportType} tahun ${newYear} angkatan ${newBatch} sudah ada`
        }
      }
    }

    const updateData: any = {}
    if (validatedData.year !== undefined) updateData.year = validatedData.year
    if (validatedData.batch !== undefined) updateData.batch = validatedData.batch
    if (validatedData.reportType !== undefined) updateData.report_type = validatedData.reportType
    if (validatedData.description !== undefined) updateData.description = validatedData.description
    if (validatedData.is_active !== undefined) updateData.is_active = validatedData.is_active

    const reportFolder = await prisma.report_folders.update({
      where: { id: validatedData.id },
      data: updateData,
      include: {
        creator: {
          select: {
            id: true,
            name: true,
            username: true
          }
        }
      }
    })

    // Trigger comprehensive data sync
    await triggerDataSyncNotification('folder-updated', {
      folderId: reportFolder.id,
      folderInfo: `${reportFolder.year} - Angkatan ${reportFolder.batch}`,
      reportType: reportFolder.report_type,
      isActive: reportFolder.is_active
    })

    return {
      success: true,
      data: {
        id: reportFolder.id,
        reportType: reportFolder.report_type,
        year: reportFolder.year,
        batch: reportFolder.batch,
        description: reportFolder.description,
        created_by: reportFolder.created_by,
        is_active: reportFolder.is_active,
        created_at: reportFolder.created_at,
        updated_at: reportFolder.updated_at,
        creator: reportFolder.creator
      },
      message: 'Folder berhasil diperbarui'
    }
  } catch (error) {
    console.error('Update report folder error:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message
      }
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal memperbarui folder'
    }
  }
}

// Delete report folder with comprehensive cleanup
export async function deleteReportFolderAction(id: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return {
        success: false,
        error: 'Unauthorized. Admin access required.'
      }
    }

    const existingFolder = await prisma.report_folders.findUnique({
      where: { id },
      include: {
        creator: true
      }
    })

    if (!existingFolder) {
      return {
        success: false,
        error: 'Folder tidak ditemukan'
      }
    }

    console.log(`🗑️ Starting comprehensive deletion for folder: ${existingFolder.year} - Angkatan ${existingFolder.batch}`)

    // Get all related data with more comprehensive queries
    const [relatedReports, relatedFiles, relatedUsers] = await Promise.all([
      // Get reports by matching users with training year and angkatan OR direct year/batch match
      prisma.reports.findMany({
        where: {
          OR: [
            // Match by user's training and angkatan
            {
              users_reports_author_idTousers: {
                training: existingFolder.year,
                angkatan: existingFolder.batch
              }
            },
            // Match by report category and files year/batch
            {
              files: {
                some: {
                  AND: [
                    { year: existingFolder.year },
                    { batch: existingFolder.batch }
                  ]
                }
              }
            }
          ]
        },
        include: {
          files: true,
          users_reports_author_idTousers: {
            select: {
              id: true,
              name: true,
              username: true,
              training: true,
              angkatan: true
            }
          }
        }
      }),
      // Get uploaded files by year and batch (both exact match and user match)
      prisma.uploaded_files.findMany({
        where: {
          OR: [
            // Direct year/batch match
            {
              AND: [
                { year: existingFolder.year },
                { batch: existingFolder.batch }
              ]
            },
            // User training match
            {
              users: {
                training: existingFolder.year,
                angkatan: existingFolder.batch
              }
            }
          ]
        },
        include: {
          users: {
            select: {
              id: true,
              name: true,
              username: true,
              training: true,
              angkatan: true
            }
          },
          reports: {
            select: {
              id: true,
              title: true,
              status: true
            }
          }
        }
      }),
      // Get affected users for notification
      prisma.users.findMany({
        where: {
          training: existingFolder.year,
          angkatan: existingFolder.batch
        },
        select: {
          id: true,
          name: true,
          username: true,
          email: true
        }
      })
    ])

    // Separate public reports (collections) from regular reports
    const publicReports = relatedReports.filter(report => report.is_public)
    const privateReports = relatedReports.filter(report => !report.is_public)

    console.log(`📊 Comprehensive scan found:`)
    console.log(`   - ${relatedReports.length} total reports (${privateReports.length} private, ${publicReports.length} public collections)`)
    console.log(`   - ${relatedFiles.length} uploaded files`)
    console.log(`   - ${relatedUsers.length} affected users`)

    // Import filesystem utilities
    const fs = require('fs').promises
    const path = require('path')

    // Helper function to safely delete file
    const safeDeleteFile = async (filePath: string) => {
      try {
        await fs.access(filePath)
        await fs.unlink(filePath)
        console.log(`✅ Deleted file: ${filePath}`)
        return true
      } catch (error) {
        console.log(`⚠️ File not found or already deleted: ${filePath}`)
        return false
      }
    }

    // Helper function to safely delete directory if empty
    const safeDeleteDir = async (dirPath: string) => {
      try {
        const files = await fs.readdir(dirPath)
        if (files.length === 0) {
          await fs.rmdir(dirPath)
          console.log(`✅ Deleted empty directory: ${dirPath}`)
        } else {
          console.log(`⚠️ Directory not empty, keeping: ${dirPath}`)
        }
      } catch (error) {
        console.log(`⚠️ Directory not found: ${dirPath}`)
      }
    }

    let deletedFilesCount = 0
    const publicPath = path.join(process.cwd(), 'public')

    // Delete physical files from filesystem
    console.log(`🗂️ Deleting physical files...`)
    for (const file of relatedFiles) {
      // Try multiple possible paths
      const possiblePaths = [
        // Standard path with category
        path.join(publicPath, 'uploads', file.category || 'reports', file.year || existingFolder.year, file.batch || existingFolder.batch, file.filename),
        // Direct file path
        path.join(publicPath, file.file_path),
        // Alternative path structure
        path.join(publicPath, 'uploads', existingFolder.year, existingFolder.batch, file.filename)
      ]

      for (const filePath of possiblePaths) {
        if (await safeDeleteFile(filePath)) {
          deletedFilesCount++
          break // Exit loop once file is found and deleted
        }
      }
    }

    // Also delete cover images if they exist
    console.log(`🖼️ Deleting cover images...`)
    for (const report of relatedReports) {
      if (report.cover_image_url) {
        const coverPath = path.join(publicPath, report.cover_image_url)
        await safeDeleteFile(coverPath)
      }
    }

    // Delete directories
    console.log(`📁 Cleaning up directories...`)
    const dirsToClean = [
      path.join(publicPath, 'uploads', 'reports', existingFolder.year, existingFolder.batch),
      path.join(publicPath, 'uploads', 'collections', existingFolder.year, existingFolder.batch),
      path.join(publicPath, 'uploads', existingFolder.year, existingFolder.batch),
      path.join(publicPath, 'uploads', 'covers', existingFolder.year, existingFolder.batch)
    ]

    for (const dir of dirsToClean) {
      await safeDeleteDir(dir)
    }

    // Delete from database using comprehensive transaction
    console.log(`💾 Deleting database records...`)
    const deletionResults = await prisma.$transaction(async (tx) => {
      // Delete uploaded files first (to avoid foreign key constraints)
      const deletedFiles = await tx.uploaded_files.deleteMany({
        where: {
          OR: [
            {
              AND: [
                { year: existingFolder.year },
                { batch: existingFolder.batch }
              ]
            },
            {
              users: {
                training: existingFolder.year,
                angkatan: existingFolder.batch
              }
            }
          ]
        }
      })

      // Delete reports (cascade will handle files relationship)
      // This includes both private reports and public collections
      const deletedReports = await tx.reports.deleteMany({
        where: {
          id: { in: relatedReports.map(r => r.id) }
        }
      })

      // Finally delete the folder
      await tx.report_folders.delete({
        where: { id }
      })

      return {
        deletedFiles: deletedFiles.count,
        deletedReports: deletedReports.count,
        deletedPublicReports: publicReports.length,
        deletedPrivateReports: privateReports.length
      }
    })

    // Trigger comprehensive real-time updates across the application
    console.log(`🔄 Triggering comprehensive real-time updates...`)

    const syncResult = await triggerDataSyncNotification('folder-deleted', {
      folderId: id,
      folderInfo: `${existingFolder.year} - Angkatan ${existingFolder.batch}`,
      affectedUsers: relatedUsers.length,
      deletedReports: deletionResults.deletedReports,
      deletedFiles: deletionResults.deletedFiles,
      deletedPublicReports: deletionResults.deletedPublicReports,
      deletedPrivateReports: deletionResults.deletedPrivateReports
    })

    const successMessage = `🗑️ Folder ${existingFolder.year} - Angkatan ${existingFolder.batch} berhasil dihapus secara menyeluruh!
    📊 Detail penghapusan:
    • ${deletedFilesCount} file fisik dihapus
    • ${deletionResults.deletedReports} laporan dihapus dari database
    • ${deletionResults.deletedPrivateReports} laporan privat dihapus
    • ${deletionResults.deletedPublicReports} koleksi publik dihapus
    • ${deletionResults.deletedFiles} record file dihapus
    • ${relatedUsers.length} user terpengaruh`

    console.log(`✅ Folder deletion completed successfully`)
    console.log(successMessage)

    return {
      success: true,
      message: successMessage,
      details: {
        deletedPhysicalFiles: deletedFilesCount,
        deletedReports: deletionResults.deletedReports,
        deletedPrivateReports: deletionResults.deletedPrivateReports,
        deletedPublicReports: deletionResults.deletedPublicReports,
        deletedFileRecords: deletionResults.deletedFiles,
        affectedUsers: relatedUsers.length,
        folderInfo: `${existingFolder.year} - Angkatan ${existingFolder.batch}`,
        revalidatedPaths: syncResult.revalidatedPaths,
        failedPaths: syncResult.failedPaths
      }
    }
  } catch (error) {
    console.error('❌ Delete report folder error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal menghapus folder secara menyeluruh'
    }
  }
}

// Get folder statistics
export async function getReportFolderStatsAction() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return {
        success: false,
        error: 'Unauthorized. Admin access required.'
      }
    }

    const [totalFolders, activeFolders, foldersByYear] = await Promise.all([
      prisma.report_folders.count(),
      prisma.report_folders.count({ where: { is_active: true } }),
      prisma.report_folders.groupBy({
        by: ['year'],
        _count: true,
        orderBy: { year: 'desc' }
      })
    ])

    return {
      success: true,
      data: {
        totalFolders,
        activeFolders,
        inactiveFolders: totalFolders - activeFolders,
        foldersByYear: foldersByYear.map(item => ({
          year: item.year,
          count: item._count
        }))
      }
    }
  } catch (error) {
    console.error('Get report folder stats error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengambil statistik folder'
    }
  }
}

// Get available year/batch combinations for uploads
export async function getAvailableYearBatchCombinationsAction() {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Unauthorized'
      }
    }

    const availableFolders = await prisma.report_folders.findMany({
      where: {
        is_active: true
      },
      select: {
        year: true,
        batch: true,
        description: true
      },
      orderBy: [
        { year: 'desc' },
        { batch: 'asc' }
      ]
    })

    // Group by year for easier UI handling
    const yearBatchMap = availableFolders.reduce((acc, folder) => {
      if (!acc[folder.year]) {
        acc[folder.year] = []
      }
      acc[folder.year].push({
        batch: folder.batch,
        description: folder.description || undefined
      })
      return acc
    }, {} as Record<string, { batch: string; description?: string }[]>)

    // Convert to arrays for easier UI handling
    const years = Object.keys(yearBatchMap).sort((a, b) => parseInt(b) - parseInt(a))
    const batches = availableFolders.map(folder => folder.batch)
    const uniqueBatches = Array.from(new Set(batches)).sort()

    return {
      success: true,
      data: {
        yearBatchMap,
        years,
        availableBatches: uniqueBatches,
        folders: availableFolders
      }
    }
  } catch (error) {
    console.error('Get available year/batch combinations error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengambil kombinasi tahun/angkatan'
    }
  }
}

// Validate if year/batch combination exists and is active
export async function validateYearBatchCombinationAction(year: string, batch: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Unauthorized'
      }
    }

    const folders = await prisma.report_folders.findMany({
      where: {
        year: year,
        batch: batch,
        is_active: true
      }
    })

    if (folders.length === 0) {
      return {
        success: false,
        error: `Tidak ada folder aktif untuk tahun ${year} angkatan ${batch}`
      }
    }

    // Return the first active folder found (could be any report type)
    const folder = folders[0]

    return {
      success: true,
      data: folder
    }
  } catch (error) {
    console.error('Validate year/batch combination error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal memvalidasi kombinasi tahun/angkatan'
    }
  }
}
