import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/actions/auth'
import { prisma } from '@/lib/prisma'
import { SecurityUtils } from '@/lib/security/config'
import fs from 'fs'
import path from 'path'

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  })
}

export async function GET(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    // 1. Validate authentication
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      SecurityUtils.logSecurityEvent('unauthorized_file_access', {
        fileId: params.fileId,
        ip: request.ip || 'unknown',
        reason: 'User not authenticated'
      })

      return new NextResponse('Unauthorized', {
        status: 401,
        headers: SecurityUtils.getSecurityHeaders(true)
      })
    }

    // 2. Get file from database and validate ownership
    const file = await prisma.uploaded_files.findFirst({
      where: {
        id: params.fileId,
        author_id: currentUser.id
      }
    })

    if (!file) {
      SecurityUtils.logSecurityEvent('unauthorized_file_access', {
        fileId: params.fileId,
        userId: currentUser.id,
        ip: request.ip || 'unknown',
        reason: 'File not found or access denied'
      })

      return new NextResponse('File not found', {
        status: 404,
        headers: SecurityUtils.getSecurityHeaders(true)
      })
    }

    // 3. Validate file path security
    const filePath = path.join(process.cwd(), 'public', file.file_path)
    const normalizedPath = path.normalize(filePath)
    const publicDir = path.join(process.cwd(), 'public')

    // Ensure file is within public directory (prevent path traversal)
    if (!normalizedPath.startsWith(publicDir)) {
      SecurityUtils.logSecurityEvent('security_violation', {
        fileId: params.fileId,
        userId: currentUser.id,
        filePath: file.file_path,
        reason: 'Path traversal attempt'
      })

      return new NextResponse('Invalid file path', {
        status: 400,
        headers: SecurityUtils.getSecurityHeaders(true)
      })
    }

    // 4. Check if file exists
    if (!fs.existsSync(normalizedPath)) {
      SecurityUtils.logSecurityEvent('file_not_found', {
        fileId: params.fileId,
        filePath: normalizedPath,
        reason: 'Physical file not found'
      })

      return new NextResponse('Physical file not found', {
        status: 404,
        headers: SecurityUtils.getSecurityHeaders(true)
      })
    }

    // 5. Log successful access
    SecurityUtils.logSecurityEvent('secure_file_access', {
      fileId: params.fileId,
      userId: currentUser.id,
      fileName: file.original_name,
      mimeType: file.mime_type,
      ip: request.ip || 'unknown'
    })

    // 6. Read and serve file with security headers
    const fileBuffer = fs.readFileSync(normalizedPath)

    // Set security headers for file serving
    const headers = new Headers(SecurityUtils.getSecurityHeaders(false))
    headers.set('Content-Type', file.mime_type)
    headers.set('Content-Length', fileBuffer.length.toString())
    headers.set('Content-Disposition', `inline; filename="${encodeURIComponent(file.original_name)}"`)

    // Additional security headers for file preview
    headers.set('X-Content-Type-Options', 'nosniff')
    headers.set('X-Frame-Options', 'SAMEORIGIN')
    headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    headers.set('Pragma', 'no-cache')
    headers.set('Expires', '0')

    // Enhanced CSP for specific file types
    if (file.mime_type === 'application/pdf') {
      headers.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; object-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline'; frame-src 'self'; worker-src 'self' blob:;")
      headers.set('X-File-Info', JSON.stringify({
        user: currentUser.name || currentUser.username,
        accessTime: new Date().toISOString(),
        fileId: params.fileId
      }))
    } else if (file.mime_type.startsWith('image/')) {
      headers.set('Content-Security-Policy', "default-src 'self'; img-src 'self' data: blob:; style-src 'self' 'unsafe-inline';")
    }

    // CORS headers for cross-origin requests
    headers.set('Access-Control-Allow-Origin', request.headers.get('origin') || '*')
    headers.set('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    headers.set('Access-Control-Max-Age', '86400')

    return new NextResponse(fileBuffer, {
      status: 200,
      headers
    })

  } catch (error) {
    console.error('Secure file access error:', error)

    SecurityUtils.logSecurityEvent('file_access_error', {
      fileId: params.fileId,
      error: error instanceof Error ? error.message : 'Unknown error',
      ip: request.ip || 'unknown'
    })

    return new NextResponse('Internal server error', {
      status: 500,
      headers: SecurityUtils.getSecurityHeaders(true)
    })
  }
} 
