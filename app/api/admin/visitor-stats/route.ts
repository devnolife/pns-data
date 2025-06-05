import { NextRequest, NextResponse } from 'next/server'
import {
  getVisitorStats,
  getTopPages,
  getRecentGuestbookEntries,
  getTrafficSources,
  getGuestbookAnalytics
} from '@/lib/actions/admin'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30'

    // Fetch all visitor analytics data
    const [
      visitorStats,
      topPages,
      recentGuestbook,
      trafficSources,
      guestbookAnalytics
    ] = await Promise.allSettled([
      getVisitorStats(),
      getTopPages(),
      getRecentGuestbookEntries(),
      getTrafficSources(),
      getGuestbookAnalytics()
    ])

    // Format response with status for each data source
    const response = {
      visitorStats: visitorStats.status === 'fulfilled' ? visitorStats.value : null,
      topPages: topPages.status === 'fulfilled' ? topPages.value : null,
      recentGuestbook: recentGuestbook.status === 'fulfilled' ? recentGuestbook.value : null,
      trafficSources: trafficSources.status === 'fulfilled' ? trafficSources.value : null,
      guestbookAnalytics: guestbookAnalytics.status === 'fulfilled' ? guestbookAnalytics.value : null,
      errors: {
        visitorStats: visitorStats.status === 'rejected' ? visitorStats.reason?.message : null,
        topPages: topPages.status === 'rejected' ? topPages.reason?.message : null,
        recentGuestbook: recentGuestbook.status === 'rejected' ? recentGuestbook.reason?.message : null,
        trafficSources: trafficSources.status === 'rejected' ? trafficSources.reason?.message : null,
        guestbookAnalytics: guestbookAnalytics.status === 'rejected' ? guestbookAnalytics.reason?.message : null,
      }
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error in visitor stats API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch visitor statistics' },
      { status: 500 }
    )
  }
} 
