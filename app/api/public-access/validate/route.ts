import { NextRequest, NextResponse } from 'next/server'
import { validatePublicAccessAction } from '@/lib/actions/guestbook'

export async function POST(request: NextRequest) {
  try {
    const { sessionToken } = await request.json()

    // Alternative: ambil dari cookie jika tidak ada di body
    let token = sessionToken
    if (!token) {
      const cookies = request.headers.get('cookie')
      if (cookies) {
        const cookieMatch = cookies.match(/guest_session=([^;]+)/)
        if (cookieMatch) {
          token = cookieMatch[1]
        }
      }
    }

    const validation = await validatePublicAccessAction(token)

    if (validation.hasAccess) {
      return NextResponse.json({
        success: true,
        hasAccess: true,
        message: validation.message,
        expiresIn: validation.expiresIn
      })
    } else {
      return NextResponse.json({
        success: false,
        hasAccess: false,
        reason: validation.reason
      }, { status: 403 })
    }
  } catch (error) {
    console.error('Public access validation error:', error)
    return NextResponse.json({
      success: false,
      hasAccess: false,
      error: 'Validation failed'
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check for session token in cookies
    const cookies = request.headers.get('cookie')
    let token = null

    if (cookies) {
      const cookieMatch = cookies.match(/guest_session=([^;]+)/)
      if (cookieMatch) {
        token = cookieMatch[1]
      }
    }

    const validation = await validatePublicAccessAction(token)

    return NextResponse.json({
      hasAccess: validation.hasAccess,
      reason: validation.reason || validation.message,
      expiresIn: validation.expiresIn || 0
    })
  } catch (error) {
    console.error('Public access check error:', error)
    return NextResponse.json({
      hasAccess: false,
      reason: 'Validation failed'
    }, { status: 500 })
  }
} 
