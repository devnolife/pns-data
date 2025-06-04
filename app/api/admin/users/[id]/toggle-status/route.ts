import { NextRequest, NextResponse } from 'next/server'
import { toggleUserStatus } from '@/lib/actions/admin'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id

    const result = await toggleUserStatus(userId)

    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json(result, { status: 400 })
    }
  } catch (error) {
    console.error('Error in POST /api/admin/users/[id]/toggle-status:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Gagal mengubah status pengguna'
      },
      { status: 500 }
    )
  }
} 
