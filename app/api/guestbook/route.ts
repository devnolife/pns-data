import { NextRequest, NextResponse } from 'next/server'
import { createGuestbookEntryAction, getGuestbookEntriesAction } from '@/lib/actions/guestbook'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const result = await createGuestbookEntryAction(data)

    if (result.error) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      entry: result.entry,
      sessionToken: result.sessionToken
    })
  } catch (error) {
    console.error('Guestbook API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create guestbook entry' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const result = await getGuestbookEntriesAction(page, limit)

    if (result.error) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      entries: result.entries,
      pagination: result.pagination
    })
  } catch (error) {
    console.error('Guestbook GET API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch guestbook entries' },
      { status: 500 }
    )
  }
} 
