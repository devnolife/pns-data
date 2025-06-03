'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import crypto from 'crypto'
import { getCurrentUser } from './auth'

// Validation schemas
const createUserSchema = z.object({
  username: z.string().min(3, 'Username minimal 3 karakter').max(50, 'Username maksimal 50 karakter'),
  email: z.string().email('Format email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
  name: z.string().min(1, 'Nama diperlukan').max(100, 'Nama maksimal 100 karakter'),
  role: z.enum(['USER', 'ADMIN', 'MODERATOR']).default('USER'),
  training: z.string().optional(),
  angkatan: z.string().optional(),
  phone: z.string().min(10, 'Nomor telepon minimal 10 karakter').regex(/^\d+$/, 'Nomor telepon hanya boleh berisi angka').optional(),
  avatar: z.string().url('URL avatar tidak valid').optional(),
})

const updateUserSchema = z.object({
  username: z.string().min(3, 'Username minimal 3 karakter').max(50, 'Username maksimal 50 karakter').optional(),
  email: z.string().email('Format email tidak valid').optional(),
  name: z.string().min(1, 'Nama diperlukan').max(100, 'Nama maksimal 100 karakter').optional(),
  role: z.enum(['USER', 'ADMIN', 'MODERATOR']).optional(),
  training: z.string().optional(),
  angkatan: z.string().optional(),
  phone: z.string().min(10, 'Nomor telepon minimal 10 karakter').regex(/^\d+$/, 'Nomor telepon hanya boleh berisi angka').optional(),
  avatar: z.string().url('URL avatar tidak valid').optional(),
})

const changeUserPasswordSchema = z.object({
  newPassword: z.string().min(8, 'Password minimal 8 karakter'),
  confirmPassword: z.string().min(1, 'Konfirmasi password diperlukan'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
})

// Types
export interface UserData {
  id: string
  username: string
  email: string
  name: string | null
  role: 'USER' | 'ADMIN' | 'MODERATOR'
  avatar: string | null
  training: string | null
  angkatan: string | null
  phone: string | null
  created_at: Date
  updated_at: Date
}

export interface CreateUserData {
  username: string
  email: string
  password: string
  name: string
  role?: 'USER' | 'ADMIN' | 'MODERATOR'
  training?: string
  angkatan?: string
  phone?: string
  avatar?: string
}

export interface UpdateUserData {
  username?: string
  email?: string
  name?: string
  role?: 'USER' | 'ADMIN' | 'MODERATOR'
  training?: string
  angkatan?: string
  phone?: string
  avatar?: string
}

// Helper function to check admin permissions
async function checkAdminPermission() {
  const currentUser = await getCurrentUser()
  if (!currentUser || currentUser.role !== 'ADMIN') {
    throw new Error('Akses ditolak. Hanya admin yang dapat melakukan operasi ini.')
  }
  return currentUser
}

// CREATE - Membuat user baru
export async function createUserAction(data: CreateUserData) {
  try {
    // Check admin permission
    await checkAdminPermission()

    // Validate input data
    const validatedData = createUserSchema.parse(data)

    // Check if username or email already exists
    const existingUser = await prisma.users.findFirst({
      where: {
        OR: [
          { username: validatedData.username },
          { email: validatedData.email }
        ]
      }
    })

    if (existingUser) {
      return {
        success: false,
        error: 'Username atau email sudah digunakan'
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Create user
    const newUser = await prisma.users.create({
      data: {
        id: crypto.randomUUID(),
        username: validatedData.username,
        email: validatedData.email,
        password: hashedPassword,
        name: validatedData.name,
        role: validatedData.role || 'USER',
        training: validatedData.training || null,
        angkatan: validatedData.angkatan || null,
        phone: validatedData.phone || null,
        avatar: validatedData.avatar || null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        training: true,
        angkatan: true,
        phone: true,
        created_at: true,
        updated_at: true,
      }
    })

    return {
      success: true,
      data: newUser,
      message: 'User berhasil dibuat'
    }
  } catch (error) {
    console.error('Create user error:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message
      }
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal membuat user'
    }
  }
}

// READ - Mendapatkan semua users dengan pagination dan filter
export async function getUsersAction(params?: {
  page?: number
  limit?: number
  search?: string
  role?: 'USER' | 'ADMIN' | 'MODERATOR'
  training?: string
}) {
  try {
    // Check admin permission
    await checkAdminPermission()

    const page = params?.page || 1
    const limit = params?.limit || 10
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}

    if (params?.search) {
      where.OR = [
        { username: { contains: params.search, mode: 'insensitive' } },
        { email: { contains: params.search, mode: 'insensitive' } },
        { name: { contains: params.search, mode: 'insensitive' } },
      ]
    }

    if (params?.role) {
      where.role = params.role
    }

    if (params?.training) {
      where.training = { contains: params.training, mode: 'insensitive' }
    }

    // Get users with pagination
    const [users, totalCount] = await Promise.all([
      prisma.users.findMany({
        where,
        select: {
          id: true,
          username: true,
          email: true,
          name: true,
          role: true,
          avatar: true,
          training: true,
          angkatan: true,
          phone: true,
          created_at: true,
          updated_at: true,
        },
        orderBy: { created_at: 'desc' },
        skip,
        take: limit,
      }),
      prisma.users.count({ where })
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return {
      success: true,
      data: {
        users,
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        }
      }
    }
  } catch (error) {
    console.error('Get users error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengambil data users'
    }
  }
}

// READ - Mendapatkan user berdasarkan ID
export async function getUserByIdAction(userId: string) {
  try {
    // Check admin permission
    await checkAdminPermission()

    if (!userId) {
      return {
        success: false,
        error: 'ID user diperlukan'
      }
    }

    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        training: true,
        angkatan: true,
        phone: true,
        created_at: true,
        updated_at: true,
        // Include related data counts
        _count: {
          select: {
            collections: true,
            reports_reports_author_idTousers: true,
            guestbook_entries: true,
          }
        }
      }
    })

    if (!user) {
      return {
        success: false,
        error: 'User tidak ditemukan'
      }
    }

    return {
      success: true,
      data: user
    }
  } catch (error) {
    console.error('Get user by ID error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengambil data user'
    }
  }
}

// UPDATE - Memperbarui data user
export async function updateUserAction(userId: string, data: UpdateUserData) {
  try {
    // Check admin permission
    await checkAdminPermission()

    if (!userId) {
      return {
        success: false,
        error: 'ID user diperlukan'
      }
    }

    // Validate input data
    const validatedData = updateUserSchema.parse(data)

    // Check if user exists
    const existingUser = await prisma.users.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      return {
        success: false,
        error: 'User tidak ditemukan'
      }
    }

    // Check if username or email is already used by another user
    if (validatedData.username || validatedData.email) {
      const conflictUser = await prisma.users.findFirst({
        where: {
          AND: [
            { id: { not: userId } },
            {
              OR: [
                validatedData.username ? { username: validatedData.username } : {},
                validatedData.email ? { email: validatedData.email } : {},
              ].filter(obj => Object.keys(obj).length > 0)
            }
          ]
        }
      })

      if (conflictUser) {
        return {
          success: false,
          error: 'Username atau email sudah digunakan oleh user lain'
        }
      }
    }

    // Update user
    const updatedUser = await prisma.users.update({
      where: { id: userId },
      data: {
        ...validatedData,
        updated_at: new Date(),
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        training: true,
        angkatan: true,
        phone: true,
        created_at: true,
        updated_at: true,
      }
    })

    return {
      success: true,
      data: updatedUser,
      message: 'User berhasil diperbarui'
    }
  } catch (error) {
    console.error('Update user error:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message
      }
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal memperbarui user'
    }
  }
}

// UPDATE - Mengubah password user
export async function changeUserPasswordAction(userId: string, data: {
  newPassword: string
  confirmPassword: string
}) {
  try {
    // Check admin permission
    await checkAdminPermission()

    if (!userId) {
      return {
        success: false,
        error: 'ID user diperlukan'
      }
    }

    // Validate input data
    const validatedData = changeUserPasswordSchema.parse(data)

    // Check if user exists
    const existingUser = await prisma.users.findUnique({
      where: { id: userId }
    })

    if (!existingUser) {
      return {
        success: false,
        error: 'User tidak ditemukan'
      }
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(validatedData.newPassword, 12)

    // Update password
    await prisma.users.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
        updated_at: new Date(),
      }
    })

    return {
      success: true,
      message: 'Password user berhasil diubah'
    }
  } catch (error) {
    console.error('Change user password error:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message
      }
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengubah password user'
    }
  }
}

// DELETE - Menghapus user (soft delete dengan status)
export async function deleteUserAction(userId: string) {
  try {
    // Check admin permission
    await checkAdminPermission()

    if (!userId) {
      return {
        success: false,
        error: 'ID user diperlukan'
      }
    }

    // Check if user exists
    const existingUser = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            collections: true,
            reports_reports_author_idTousers: true,
            guestbook_entries: true,
          }
        }
      }
    })

    if (!existingUser) {
      return {
        success: false,
        error: 'User tidak ditemukan'
      }
    }

    // Check if user has related data
    const hasRelatedData =
      existingUser._count.collections > 0 ||
      existingUser._count.reports_reports_author_idTousers > 0 ||
      existingUser._count.guestbook_entries > 0

    if (hasRelatedData) {
      return {
        success: false,
        error: 'User tidak dapat dihapus karena memiliki data terkait (koleksi, laporan, atau entri buku tamu)'
      }
    }

    // Delete user
    await prisma.users.delete({
      where: { id: userId }
    })

    return {
      success: true,
      message: 'User berhasil dihapus'
    }
  } catch (error) {
    console.error('Delete user error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal menghapus user'
    }
  }
}

// UTILITY - Mendapatkan statistik users
export async function getUserStatsAction() {
  try {
    // Check admin permission
    await checkAdminPermission()

    const [
      totalUsers,
      totalAdmins,
      totalModerators,
      totalRegularUsers,
      recentUsers,
      usersByTraining
    ] = await Promise.all([
      prisma.users.count(),
      prisma.users.count({ where: { role: 'ADMIN' } }),
      prisma.users.count({ where: { role: 'MODERATOR' } }),
      prisma.users.count({ where: { role: 'USER' } }),
      prisma.users.count({
        where: {
          created_at: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Last 30 days
          }
        }
      }),
      prisma.users.groupBy({
        by: ['training'],
        _count: {
          training: true
        },
        where: {
          training: {
            not: null
          }
        }
      })
    ])

    return {
      success: true,
      data: {
        totalUsers,
        totalAdmins,
        totalModerators,
        totalRegularUsers,
        recentUsers,
        usersByTraining: usersByTraining.map(item => ({
          training: item.training,
          count: item._count.training
        }))
      }
    }
  } catch (error) {
    console.error('Get user stats error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengambil statistik users'
    }
  }
}

// UTILITY - Mencari users berdasarkan kriteria
export async function searchUsersAction(query: string, filters?: {
  role?: 'USER' | 'ADMIN' | 'MODERATOR'
  training?: string
  limit?: number
}) {
  try {
    // Check admin permission
    await checkAdminPermission()

    if (!query || query.trim().length < 2) {
      return {
        success: false,
        error: 'Query pencarian minimal 2 karakter'
      }
    }

    const limit = filters?.limit || 20

    const where: any = {
      OR: [
        { username: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
        { name: { contains: query, mode: 'insensitive' } },
        { phone: { contains: query, mode: 'insensitive' } },
      ]
    }

    if (filters?.role) {
      where.role = filters.role
    }

    if (filters?.training) {
      where.training = { contains: filters.training, mode: 'insensitive' }
    }

    const users = await prisma.users.findMany({
      where,
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        training: true,
        angkatan: true,
        phone: true,
        created_at: true,
      },
      orderBy: { created_at: 'desc' },
      take: limit,
    })

    return {
      success: true,
      data: users
    }
  } catch (error) {
    console.error('Search users error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mencari users'
    }
  }
}

// SELF UPDATE - User memperbarui profil sendiri (tidak perlu admin)
export async function updateOwnProfileAction(data: {
  name?: string
  email?: string
  phone?: string
}) {
  try {
    // Get current user
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Anda harus login terlebih dahulu'
      }
    }

    // Validate input data (simplified schema for self-update)
    const selfUpdateSchema = z.object({
      name: z.string().min(1, 'Nama diperlukan').max(100, 'Nama maksimal 100 karakter').optional(),
      email: z.string().email('Format email tidak valid').optional(),
      phone: z.string().min(10, 'Nomor telepon minimal 10 karakter').regex(/^\d+$/, 'Nomor telepon hanya boleh berisi angka').optional(),
    })

    const validatedData = selfUpdateSchema.parse(data)

    // Check if email is already used by another user
    if (validatedData.email) {
      const conflictUser = await prisma.users.findFirst({
        where: {
          email: validatedData.email,
          id: { not: currentUser.id }
        }
      })

      if (conflictUser) {
        return {
          success: false,
          error: 'Email sudah digunakan oleh user lain'
        }
      }
    }

    // Update user profile
    const updatedUser = await prisma.users.update({
      where: { id: currentUser.id },
      data: {
        ...validatedData,
        updated_at: new Date(),
      },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        training: true,
        angkatan: true,
        phone: true,
        created_at: true,
        updated_at: true,
      }
    })

    return {
      success: true,
      data: updatedUser,
      message: 'Profil berhasil diperbarui'
    }
  } catch (error) {
    console.error('Update own profile error:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message
      }
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal memperbarui profil'
    }
  }
}

// SELF UPDATE - User mengubah password sendiri (tidak perlu admin)
export async function changeOwnPasswordAction(data: {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}) {
  try {
    // Get current user
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Anda harus login terlebih dahulu'
      }
    }

    // Validate input data
    const selfPasswordSchema = z.object({
      currentPassword: z.string().min(1, 'Password saat ini diperlukan'),
      newPassword: z.string().min(8, 'Password baru minimal 8 karakter'),
      confirmPassword: z.string().min(1, 'Konfirmasi password diperlukan'),
    }).refine((data) => data.newPassword === data.confirmPassword, {
      message: "Password baru tidak cocok",
      path: ["confirmPassword"],
    })

    const validatedData = selfPasswordSchema.parse(data)

    // Get user with password for verification
    const user = await prisma.users.findUnique({
      where: { id: currentUser.id },
      select: {
        id: true,
        password: true,
      }
    })

    if (!user) {
      return {
        success: false,
        error: 'User tidak ditemukan'
      }
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(validatedData.currentPassword, user.password)
    if (!isValidPassword) {
      return {
        success: false,
        error: 'Password saat ini tidak benar'
      }
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(validatedData.newPassword, 12)

    // Update password
    await prisma.users.update({
      where: { id: currentUser.id },
      data: {
        password: hashedPassword,
        updated_at: new Date(),
      }
    })

    return {
      success: true,
      message: 'Password berhasil diperbarui'
    }
  } catch (error) {
    console.error('Change own password error:', error)
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0].message
      }
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengubah password'
    }
  }
}

// SELF READ - User mendapatkan profil sendiri (tidak perlu admin)
export async function getOwnProfileAction() {
  try {
    // Get current user
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Anda harus login terlebih dahulu'
      }
    }

    // Get detailed user profile
    const userProfile = await prisma.users.findUnique({
      where: { id: currentUser.id },
      select: {
        id: true,
        username: true,
        email: true,
        name: true,
        role: true,
        avatar: true,
        training: true,
        angkatan: true,
        phone: true,
        created_at: true,
        updated_at: true,
        // Include related data counts
        _count: {
          select: {
            collections: true,
            reports_reports_author_idTousers: true,
            guestbook_entries: true,
          }
        }
      }
    })

    if (!userProfile) {
      return {
        success: false,
        error: 'Profil tidak ditemukan'
      }
    }

    return {
      success: true,
      data: userProfile
    }
  } catch (error) {
    console.error('Get own profile error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengambil data profil'
    }
  }
}

// DASHBOARD - Mendapatkan statistik dashboard untuk user yang sedang login
export async function getUserDashboardStatsAction() {
  try {
    // Get current user
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Anda harus login terlebih dahulu'
      }
    }

    // Get user statistics
    const [
      totalCollections,
      totalReports,
      totalGuestbookEntries,
      recentReports,
      recentCollections,
      monthlyReports,
      lastActivity
    ] = await Promise.all([
      // Total collections created by user
      prisma.collections.count({
        where: { author_id: currentUser.id }
      }),

      // Total reports created by user
      prisma.reports.count({
        where: { author_id: currentUser.id }
      }),

      // Total guestbook entries by user
      prisma.guestbook_entries.count({
        where: { author_id: currentUser.id }
      }),

      // Recent reports (last 5)
      prisma.reports.findMany({
        where: { author_id: currentUser.id },
        select: {
          id: true,
          title: true,
          status: true,
          created_at: true,
          category: true,
        },
        orderBy: { created_at: 'desc' },
        take: 5,
      }),

      // Recent collections (last 5)
      prisma.collections.findMany({
        where: { author_id: currentUser.id },
        select: {
          id: true,
          title: true,
          category: true,
          created_at: true,
          is_public: true,
        },
        orderBy: { created_at: 'desc' },
        take: 5,
      }),

      // Reports created this month
      prisma.reports.count({
        where: {
          author_id: currentUser.id,
          created_at: {
            gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          }
        }
      }),

      // Last activity (most recent report or collection)
      Promise.all([
        prisma.reports.findFirst({
          where: { author_id: currentUser.id },
          select: { created_at: true },
          orderBy: { created_at: 'desc' }
        }),
        prisma.collections.findFirst({
          where: { author_id: currentUser.id },
          select: { created_at: true },
          orderBy: { created_at: 'desc' }
        })
      ]).then(([lastReport, lastCollection]) => {
        const dates = [
          lastReport?.created_at,
          lastCollection?.created_at
        ].filter(Boolean)

        return dates.length > 0 ? new Date(Math.max(...dates.map(d => d!.getTime()))) : null
      })
    ])

    // Calculate days since last activity
    const daysSinceLastActivity = lastActivity
      ? Math.floor((new Date().getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24))
      : null

    return {
      success: true,
      data: {
        stats: {
          totalCollections,
          totalReports,
          totalGuestbookEntries,
          monthlyReports,
          daysSinceLastActivity,
        },
        recentActivity: {
          reports: recentReports.map(report => ({
            id: report.id,
            title: report.title,
            type: 'report' as const,
            status: report.status,
            category: report.category,
            createdAt: report.created_at,
          })),
          collections: recentCollections.map(collection => ({
            id: collection.id,
            title: collection.title,
            type: 'collection' as const,
            category: collection.category,
            isPublic: collection.is_public,
            createdAt: collection.created_at,
          }))
        }
      }
    }
  } catch (error) {
    console.error('Get user dashboard stats error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengambil statistik dashboard'
    }
  }
}

// DASHBOARD - Mendapatkan aktivitas terbaru user
export async function getUserRecentActivitiesAction(limit: number = 10) {
  try {
    // Get current user
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return {
        success: false,
        error: 'Anda harus login terlebih dahulu'
      }
    }

    // Get recent activities from reports and collections
    const [recentReports, recentCollections, recentGuestbookEntries] = await Promise.all([
      prisma.reports.findMany({
        where: { author_id: currentUser.id },
        select: {
          id: true,
          title: true,
          status: true,
          created_at: true,
          updated_at: true,
          category: true,
        },
        orderBy: { updated_at: 'desc' },
        take: limit,
      }),

      prisma.collections.findMany({
        where: { author_id: currentUser.id },
        select: {
          id: true,
          title: true,
          category: true,
          created_at: true,
          updated_at: true,
          is_public: true,
        },
        orderBy: { updated_at: 'desc' },
        take: limit,
      }),

      prisma.guestbook_entries.findMany({
        where: { author_id: currentUser.id },
        select: {
          id: true,
          message: true,
          created_at: true,
          is_approved: true,
        },
        orderBy: { created_at: 'desc' },
        take: 5,
      })
    ])

    // Combine and sort all activities
    const allActivities = [
      ...recentReports.map(report => ({
        id: report.id,
        title: report.title,
        type: 'report' as const,
        action: 'uploaded',
        status: report.status,
        category: report.category,
        createdAt: report.created_at,
        updatedAt: report.updated_at,
      })),
      ...recentCollections.map(collection => ({
        id: collection.id,
        title: collection.title,
        type: 'collection' as const,
        action: 'created',
        category: collection.category,
        isPublic: collection.is_public,
        createdAt: collection.created_at,
        updatedAt: collection.updated_at,
      })),
      ...recentGuestbookEntries.map(entry => ({
        id: entry.id,
        title: entry.message.substring(0, 50) + '...',
        type: 'guestbook' as const,
        action: 'posted',
        isApproved: entry.is_approved,
        createdAt: entry.created_at,
        updatedAt: entry.created_at,
      }))
    ].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, limit)

    return {
      success: true,
      data: allActivities
    }
  } catch (error) {
    console.error('Get user recent activities error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Gagal mengambil aktivitas terbaru'
    }
  }
}

