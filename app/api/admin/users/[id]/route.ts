import { NextRequest, NextResponse } from 'next/server'
import { updateUser, deleteUser, getUserById } from '@/lib/actions/admin'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id

    const result = await getUserById(userId)

    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json(result, { status: 404 })
    }
  } catch (error) {
    console.error('Error in GET /api/admin/users/[id]:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Gagal mengambil data pengguna'
      },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id
    const body = await request.json()

    const { name, username, email, password, role, training, angkatan } = body

    if (!name || !username || !email || !role) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          message: 'Nama, username, email, dan role wajib diisi'
        },
        { status: 400 }
      )
    }

    const result = await updateUser(userId, {
      name,
      username,
      email,
      role,
      training,
      angkatan,
      ...(password && { password })
    })

    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json(result, { status: 400 })
    }
  } catch (error) {
    console.error('Error in PUT /api/admin/users/[id]:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Gagal memperbarui pengguna'
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const userId = params.id

    const result = await deleteUser(userId)

    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json(result, { status: 400 })
    }
  } catch (error) {
    console.error('Error in DELETE /api/admin/users/[id]:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Gagal menghapus pengguna'
      },
      { status: 500 }
    )
  }
} 
