import { NextRequest, NextResponse } from 'next/server'
import { getReportsForVerification, getDatabaseStats } from '@/lib/actions/admin'
import { getCurrentUser } from '@/lib/actions/auth'

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const status = searchParams.get('status') || undefined
    const category = searchParams.get('category') || undefined
    const search = searchParams.get('search') || undefined
    const debug = searchParams.get('debug') === 'true'

    // If debug is requested, return database stats
    if (debug) {
      const dbStats = await getDatabaseStats()
      return NextResponse.json(dbStats)
    }

    // Fetch reports
    const result = await getReportsForVerification(page, limit, status, category, search)
    return NextResponse.json(result)

  } catch (error) {
    console.error('API Error fetching reports:', error)
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
