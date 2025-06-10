import { NextRequest, NextResponse } from 'next/server'
import { createReportFolderAction } from '@/lib/actions/report-folders'
import { getCurrentUser } from '@/lib/actions/auth'
import { z } from 'zod'

// Validation schema for folder creation
const createFolderSchema = z.object({
  reportType: z.enum(['PKN', 'PKP', 'PKA', 'LATSAR'], {
    required_error: 'Report type is required',
    invalid_type_error: 'Invalid report type'
  }),
  year: z.string().regex(/^\d{4}$/, 'Year must be a 4-digit number'),
  batch: z.enum(['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'], {
    required_error: 'Batch is required',
    invalid_type_error: 'Invalid batch format'
  }),
  description: z.string().optional()
})

export async function POST(request: NextRequest) {
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
    const validationResult = createFolderSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: validationResult.error.errors
        },
        { status: 400 }
      )
    }

    const { reportType, year, batch, description } = validationResult.data

    // Validate year is not too old (e.g., not before 2015)
    const currentYear = new Date().getFullYear()
    const yearNum = parseInt(year)

    if (yearNum < 2015 || yearNum > currentYear + 1) {
      return NextResponse.json(
        { error: `Year must be between 2015 and ${currentYear + 1}` },
        { status: 400 }
      )
    }

    // Create the folder using the existing action
    const result = await createReportFolderAction({
      reportType,
      year,
      batch,
      description: description || ''
    })

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        folder: result.data
      }, { status: 201 })
    } else {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Error in POST /api/admin/folders/create:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
