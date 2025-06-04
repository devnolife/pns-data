import { NextRequest, NextResponse } from 'next/server'
import { batchActivateUsers, batchDeactivateUsers, batchDeleteUsers } from '@/lib/actions/admin'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, userIds } = body

    if (!action || !Array.isArray(userIds)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields',
          message: 'Action dan userIds diperlukan'
        },
        { status: 400 }
      )
    }

    let result
    switch (action) {
      case 'activate':
        result = await batchActivateUsers(userIds)
        break
      case 'deactivate':
        result = await batchDeactivateUsers(userIds)
        break
      case 'delete':
        result = await batchDeleteUsers(userIds)
        break
      default:
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid action',
            message: 'Action tidak valid. Gunakan: activate, deactivate, atau delete'
          },
          { status: 400 }
        )
    }

    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json(result, { status: 400 })
    }
  } catch (error) {
    console.error('Error in POST /api/admin/users/batch:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: 'Gagal memproses operasi batch'
      },
      { status: 500 }
    )
  }
} 
