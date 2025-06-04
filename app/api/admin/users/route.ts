import { NextRequest, NextResponse } from 'next/server'
import { getUsers, createUser } from '@/lib/actions/admin'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const roleFilter = searchParams.get('role') || undefined
    const statusFilter = searchParams.get('status') || undefined
    const search = searchParams.get('search') || undefined

    const result = await getUsers(page, limit, roleFilter, statusFilter, search)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in GET /api/admin/users:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        users: [],
        pagination: { page: 1, limit: 10, total: 0, totalPages: 0 }
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, username, email, password, role, training, angkatan } = body

    if (!name || !username || !email || !password || !role) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          message: 'Nama, username, email, password, dan role wajib diisi'
        },
        { status: 400 }
      )
    }

    const result = await createUser({
      name,
      username,
      email,
      password,
      role,
      training,
      angkatan
    })

    if (result.success) {
      return NextResponse.json(result, { status: 201 })
    } else {
      return NextResponse.json(result, { status: 400 })
    }
  } catch (error) {
    console.error('Error in POST /api/admin/users:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Gagal membuat pengguna baru'
      },
      { status: 500 }
    )
  }
} 
