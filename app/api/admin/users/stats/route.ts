import { NextRequest, NextResponse } from 'next/server'
import { getUserStats } from '@/lib/actions/admin'

export async function GET(request: NextRequest) {
  try {
    const result = await getUserStats()

    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json(result, { status: 400 })
    }
  } catch (error) {
    console.error('Error in GET /api/admin/users/stats:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Gagal mengambil statistik pengguna'
      },
      { status: 500 }
    )
  }
} 
