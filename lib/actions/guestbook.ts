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

    const guestbookEntry = await prisma.guestbookEntry.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        message: fullMessage,
        authorId: currentUser?.id || null,
        isApproved: true, // Auto approve untuk sekarang
      },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        }
      }
    })

    revalidatePath('/guestbook')
    return { success: true, entry: guestbookEntry }
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
      prisma.guestbookEntry.findMany({
        where: {
          isApproved: true
        },
        include: {
          author: {
            select: {
              id: true,
              username: true,
              name: true,
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.guestbookEntry.count({
        where: {
          isApproved: true
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

    await prisma.guestbookEntry.delete({
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

    const entry = await prisma.guestbookEntry.update({
      where: { id },
      data: { isApproved: true },
      include: {
        author: {
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
