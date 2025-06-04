import { NextRequest, NextResponse } from 'next/server'
import { changeUserPassword } from '@/lib/actions/admin'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id
    const body = await request.json()
    const { newPassword } = body

    if (!newPassword) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required field',
          message: 'Password baru diperlukan'
        },
        { status: 400 }
      )
    }

    const result = await changeUserPassword(userId, newPassword)

    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json(result, { status: 400 })
    }
  } catch (error) {
    console.error('Error in POST /api/admin/users/[id]/change-password:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Gagal mengubah password pengguna'
      },
      { status: 500 }
    )
  }
} 
