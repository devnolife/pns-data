import { NextRequest, NextResponse } from 'next/server'
import { getPublicReports } from '@/lib/actions/reports'
import { validatePublicAccessAction } from '@/lib/actions/guestbook'

export async function GET(request: NextRequest) {
  try {
    // Check for session token in cookies or headers
    const cookies = request.headers.get('cookie')
    let sessionToken = null

    if (cookies) {
      const cookieMatch = cookies.match(/guest_session=([^;]+)/)
      if (cookieMatch) {
        sessionToken = cookieMatch[1]
      }
    }

    // Alternative: check Authorization header
    if (!sessionToken) {
      const authHeader = request.headers.get('authorization')
      if (authHeader && authHeader.startsWith('Bearer ')) {
        sessionToken = authHeader.substring(7)
      }
    }

    // Validate access
    const accessValidation = await validatePublicAccessAction(sessionToken)

    if (!accessValidation.hasAccess) {
      return NextResponse.json(
        {
          success: false,
          error: 'Access denied. Please fill the guestbook first.',
          reason: accessValidation.reason
        },
        { status: 403 }
      )
    }

    // Fetch public reports
    const result = await getPublicReports()

    if (result.error) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      accessInfo: {
        expiresIn: accessValidation.expiresIn,
        message: accessValidation.message
      }
    })
  } catch (error) {
    console.error('Public collections API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch public collections' },
      { status: 500 }
    )
  }
} 
