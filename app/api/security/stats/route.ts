import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/actions/auth'
import { FileProtectionMiddleware } from '@/lib/security/file-protection'

export async function GET(request: NextRequest) {
  try {
    // Only allow admin/moderator access
    const currentUser = await getCurrentUser()
    if (!currentUser || !['ADMIN', 'MODERATOR'].includes(currentUser.role)) {
      return new NextResponse('Unauthorized', { status: 403 })
    }

    // Get access statistics
    const stats = FileProtectionMiddleware.getAccessStats()

    return NextResponse.json({
      success: true,
      data: stats
    })

  } catch (error) {
    console.error('Security stats error:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
