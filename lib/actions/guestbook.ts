'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from './auth'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

// Schema untuk validasi data guestbook
const createGuestbookEntrySchema = z.object({
  name: z.string().min(2, 'Nama harus minimal 2 karakter'),
  email: z.string().email('Email tidak valid').optional(),
  message: z.string().min(1, 'Pesan diperlukan'),
  institution: z.string().optional(),
  membership: z.string().optional(),
  visitPurpose: z.string().optional(),
})

export async function createGuestbookEntryAction(data: {
  name: string
  email?: string
  message: string
  institution?: string
  membership?: string
  visitPurpose?: string
}) {
  try {
    const currentUser = await getCurrentUser()

    // Validasi data
    const validatedData = createGuestbookEntrySchema.parse(data)

    // Buat pesan gabungan dari data form
    let fullMessage = validatedData.message
    if (data.institution) {
      fullMessage += `\n\nAsal Instansi: ${data.institution}`
    }
    if (data.membership) {
      fullMessage += `\nKeanggotaan: ${data.membership}`
    }
    if (data.visitPurpose) {
      fullMessage += `\nTujuan Kunjungan: ${data.visitPurpose}`
    }

    // Create the entry with defensive error handling
    try {
      const guestbookEntry = await prisma.guestbook_entries.create({
        data: {
          id: crypto.randomUUID(),
          name: validatedData.name,
          email: validatedData.email,
          message: fullMessage,
          author_id: currentUser?.id || null,
          is_approved: true, // Auto approve untuk sekarang
          updated_at: new Date(),
        },
        include: {
          users: {
            select: {
              id: true,
              username: true,
              name: true,
            }
          }
        }
      })

      revalidatePath('/guestbook')

      // Return session token untuk access validation
      const sessionToken = `guest_${Date.now()}_${crypto.randomUUID().slice(0, 8)}`

      return {
        success: true,
        entry: guestbookEntry,
        sessionToken: sessionToken
      }
    } catch (dbError) {
      console.error('Database operation error:', dbError)
      return { error: 'Database error. Please try again later.' }
    }
  } catch (error) {
    console.error('Create guestbook entry error:', error)
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }
    return { error: 'Gagal menyimpan entri buku tamu' }
  }
}

export async function getGuestbookEntriesAction(page = 1, limit = 10) {
  try {
    const [entries, total] = await Promise.all([
      prisma.guestbook_entries.findMany({
        where: {
          is_approved: true
        },
        include: {
          users: {
            select: {
              id: true,
              username: true,
              name: true,
            }
          }
        },
        orderBy: {
          created_at: 'desc'
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.guestbook_entries.count({
        where: {
          is_approved: true
        }
      })
    ])

    return {
      success: true,
      entries,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  } catch (error) {
    console.error('Get guestbook entries error:', error)
    return { error: 'Gagal mengambil data buku tamu' }
  }
}

export async function deleteGuestbookEntryAction(id: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return { error: 'Unauthorized' }
    }

    await prisma.guestbook_entries.delete({
      where: { id }
    })

    revalidatePath('/guestbook')
    return { success: true }
  } catch (error) {
    console.error('Delete guestbook entry error:', error)
    return { error: 'Gagal menghapus entri buku tamu' }
  }
}

export async function approveGuestbookEntryAction(id: string) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return { error: 'Unauthorized' }
    }

    const entry = await prisma.guestbook_entries.update({
      where: { id },
      data: {
        is_approved: true,
        updated_at: new Date()
      },
      include: {
        users: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        }
      }
    })

    revalidatePath('/guestbook')
    return { success: true, entry }
  } catch (error) {
    console.error('Approve guestbook entry error:', error)
    return { error: 'Gagal menyetujui entri buku tamu' }
  }
}

// Fungsi baru untuk validasi akses publik
export async function validatePublicAccessAction(sessionToken?: string) {
  try {
    // Jika tidak ada session token, return false
    if (!sessionToken) {
      return { hasAccess: false, reason: 'No session token provided' }
    }

    // Validasi format session token
    if (!sessionToken.startsWith('guest_') || sessionToken.length < 20) {
      return { hasAccess: false, reason: 'Invalid session token format' }
    }

    // Extract timestamp dari session token untuk validasi expiry (3 jam)
    const parts = sessionToken.split('_')
    if (parts.length !== 3) {
      return { hasAccess: false, reason: 'Malformed session token' }
    }

    const timestamp = parseInt(parts[1])
    if (isNaN(timestamp)) {
      return { hasAccess: false, reason: 'Invalid timestamp in session token' }
    }

    // Check if session is expired (3 hours)
    const now = Date.now()
    const sessionAge = now - timestamp
    const maxAge = 3 * 60 * 60 * 1000 // 3 hours in milliseconds

    if (sessionAge > maxAge) {
      return { hasAccess: false, reason: 'Session expired. Please fill guestbook again.' }
    }

    return {
      hasAccess: true,
      message: 'Valid public access session',
      expiresIn: Math.floor((maxAge - sessionAge) / 1000 / 60 / 60) // hours remaining
    }
  } catch (error) {
    console.error('Validate public access error:', error)
    return { hasAccess: false, reason: 'Session validation failed' }
  }
} 
