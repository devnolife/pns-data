import { NextRequest, NextResponse } from 'next/server'
import { verifyReportAction } from '@/lib/actions/admin'
import { getCurrentUser } from '@/lib/actions/auth'

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { reportId } = await request.json()

    if (!reportId) {
      return NextResponse.json(
        { success: false, error: 'Report ID is required' },
        { status: 400 }
      )
    }

    const result = await verifyReportAction(reportId)
    return NextResponse.json(result)

  } catch (error) {
    console.error('API Error verifying report:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 
