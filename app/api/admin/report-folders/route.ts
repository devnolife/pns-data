import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/actions/auth'
import {
  createReportFolderAction,
  getReportFoldersAction,
  updateReportFolderAction,
  deleteReportFolderAction
} from '@/lib/actions/report-folders'

// GET - Get all report folders
export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const search = searchParams.get('search') || undefined

    const result = await getReportFoldersAction(page, limit, search)
    return NextResponse.json(result)

  } catch (error) {
    console.error('API Error fetching report folders:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// POST - Create new report folder
export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { reportType, year, batch, description } = body

    if (!reportType || !year || !batch) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          message: 'Jenis laporan, tahun, dan angkatan wajib diisi'
        },
        { status: 400 }
      )
    }

    const result = await createReportFolderAction({
      reportType,
      year,
      batch,
      description
    })

    if (result.success) {
      return NextResponse.json(result, { status: 201 })
    } else {
      return NextResponse.json(result, { status: 400 })
    }
  } catch (error) {
    console.error('Error in POST /api/admin/report-folders:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Gagal membuat folder laporan'
      },
      { status: 500 }
    )
  }
}

// PUT - Update report folder
export async function PUT(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { id, reportType, year, batch, description, is_active } = body

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing folder ID',
          message: 'ID folder wajib disertakan'
        },
        { status: 400 }
      )
    }

    const result = await updateReportFolderAction({
      id,
      reportType,
      year,
      batch,
      description,
      is_active
    })

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in PUT /api/admin/report-folders:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Gagal memperbarui folder laporan'
      },
      { status: 500 }
    )
  }
}

// DELETE - Delete report folder
export async function DELETE(request: NextRequest) {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Admin access required.' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing folder ID',
          message: 'ID folder wajib disertakan'
        },
        { status: 400 }
      )
    }

    const result = await deleteReportFolderAction(id)
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in DELETE /api/admin/report-folders:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Gagal menghapus folder laporan'
      },
      { status: 500 }
    )
  }
}
