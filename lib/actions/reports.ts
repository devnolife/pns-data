'use server'

import { prisma } from '@/lib/prisma'
import { getCurrentUser } from './auth'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'

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

    const report = await prisma.report.create({
      data: {
        ...validatedData,
        authorId: currentUser.id,
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
    const existingReport = await prisma.report.findUnique({
      where: { id: validatedData.id }
    })

    if (!existingReport) {
      return { error: 'Report not found' }
    }

    if (existingReport.authorId !== currentUser.id && currentUser.role !== 'ADMIN') {
      return { error: 'Unauthorized to update this report' }
    }

    const updateData: any = {}
    if (validatedData.title) updateData.title = validatedData.title
    if (validatedData.description !== undefined) updateData.description = validatedData.description
    if (validatedData.content) updateData.content = validatedData.content
    if (validatedData.category !== undefined) updateData.category = validatedData.category
    if (validatedData.priority) updateData.priority = validatedData.priority
    if (validatedData.status) updateData.status = validatedData.status
    if (validatedData.assigneeId !== undefined) updateData.assigneeId = validatedData.assigneeId

    const report = await prisma.report.update({
      where: { id: validatedData.id },
      data: updateData,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        },
        assignee: {
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

    const existingReport = await prisma.report.findUnique({
      where: { id }
    })

    if (!existingReport) {
      return { error: 'Report not found' }
    }

    if (existingReport.authorId !== currentUser.id && currentUser.role !== 'ADMIN') {
      return { error: 'Unauthorized to delete this report' }
    }

    await prisma.report.delete({
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
      where.authorId = currentUser.id
    }

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        include: {
          author: {
            select: {
              id: true,
              username: true,
              name: true,
            }
          },
          assignee: {
            select: {
              id: true,
              username: true,
              name: true,
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.report.count({ where })
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

    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
          }
        },
        assignee: {
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
    if (currentUser.role !== 'ADMIN' && report.authorId !== currentUser.id) {
      return { error: 'Unauthorized to view this report' }
    }

    return { success: true, report }
  } catch (error) {
    console.error('Get report error:', error)
    return { error: 'Failed to fetch report' }
  }
} 
