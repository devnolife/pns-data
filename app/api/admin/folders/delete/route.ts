import { NextRequest, NextResponse } from 'next/server'
import { deleteReportFolderAction } from '@/lib/actions/report-folders'
import { getCurrentUser } from '@/lib/actions/auth'
import { z } from 'zod'

// Validation schema for bulk folder deletion
const deleteFoldersSchema = z.object({
  folderIds: z.array(z.string().uuid('Invalid folder ID format')).min(1, 'At least one folder ID is required'),
  confirmDeletion: z.boolean().refine(val => val === true, 'Deletion must be confirmed')
})

export async function DELETE(request: NextRequest) {
  try {
    // Check if user is authenticated and has admin role
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized - Please login' },
        { status: 401 }
      )
    }

    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      )
    }

    // Parse and validate request body
    const body = await request.json()
    const validationResult = deleteFoldersSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.errors
        },
        { status: 400 }
      )
    }

    const { folderIds } = validationResult.data

    // Perform bulk deletion
    const results = []
    let successCount = 0
    let errorCount = 0

    for (const folderId of folderIds) {
      try {
        const result = await deleteReportFolderAction(folderId)
        if (result.success) {
          successCount++
          results.push({
            folderId,
            success: true,
            message: result.message
          })
        } else {
          errorCount++
          results.push({
            folderId,
            success: false,
            error: result.error
          })
        }
      } catch (error) {
        errorCount++
        results.push({
          folderId,
          success: false,
          error: 'Failed to delete folder'
        })
      }
    }

    // Return summary
    return NextResponse.json({
      success: true,
      summary: {
        total: folderIds.length,
        successful: successCount,
        failed: errorCount
      },
      results,
      message: `Deleted ${successCount} out of ${folderIds.length} folders${errorCount > 0 ? ` (${errorCount} failed)` : ''}`
    })

  } catch (error) {
    console.error('Error in DELETE /api/admin/folders/delete:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
