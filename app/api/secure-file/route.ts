import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import crypto from 'crypto'
import { SECURITY_CONFIG, SecurityUtils } from '@/lib/security/config'

// Generate secure view token for public access
function generateViewToken(filePath: string, isPublic: boolean = true): string {
  const tokenData = {
    filePath,
    isPublic,
    timestamp: Date.now(),
    expiresAt: Date.now() + (isPublic
      ? SECURITY_CONFIG.FILE_ACCESS.TOKEN_EXPIRY.PUBLIC
      : SECURITY_CONFIG.FILE_ACCESS.TOKEN_EXPIRY.AUTHENTICATED
    ),
    nonce: crypto.randomBytes(16).toString('hex')
  }

  return Buffer.from(JSON.stringify(tokenData)).toString('base64')
}

// Verify view token
function verifyViewToken(token: string): { valid: boolean; filePath?: string; isPublic?: boolean } {
  try {
    const tokenData = JSON.parse(Buffer.from(token, 'base64').toString())
    
    if (Date.now() > tokenData.expiresAt) {
      return { valid: false }
    }
    
    return {
      valid: true,
      filePath: tokenData.filePath,
      isPublic: tokenData.isPublic
    }
  } catch {
    return { valid: false }
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const filePath = searchParams.get('file')
    const mode = searchParams.get('mode') || 'view' // 'view' or 'download'

    if (!token || !filePath) {
      return new NextResponse('Missing required parameters', { status: 400 })
    }

    // Verify token
    const tokenVerification = verifyViewToken(token)
    if (!tokenVerification.valid) {
      return new NextResponse('Invalid or expired access token', { status: 403 })
    }

    // Security: Validate file path
    if (filePath.includes('..') || filePath.includes('\\') || !filePath.startsWith('uploads/')) {
      return new NextResponse('Invalid file path', { status: 400 })
    }

    // Ensure token matches requested file
    if (tokenVerification.filePath !== filePath) {
      return new NextResponse('Token does not match requested file', { status: 403 })
    }

    const fullPath = join(process.cwd(), 'public', filePath)
    
    // Check if file exists
    if (!existsSync(fullPath)) {
      return new NextResponse('File not found', { status: 404 })
    }

    // Read file
    const fileBuffer = await readFile(fullPath)
    
    // Check file size
    if (!SecurityUtils.isFileSizeAllowed(fileBuffer.length)) {
      SecurityUtils.logSecurityEvent('file_access_denied', {
        reason: 'File too large',
        fileSize: fileBuffer.length,
        filePath
      })
      return new NextResponse('File too large', { status: 413 })
    }

    // Determine MIME type from file extension
    const extension = filePath.split('.').pop()?.toLowerCase()
    let mimeType = 'application/octet-stream'
    
    switch (extension) {
      case 'pdf':
        mimeType = 'application/pdf'
        break
      case 'jpg':
      case 'jpeg':
        mimeType = 'image/jpeg'
        break
      case 'png':
        mimeType = 'image/png'
        break
      case 'gif':
        mimeType = 'image/gif'
        break
      case 'webp':
        mimeType = 'image/webp'
        break
      case 'svg':
        mimeType = 'image/svg+xml'
        break
    }

    // Validate MIME type
    if (!SecurityUtils.isAllowedFileType(mimeType)) {
      SecurityUtils.logSecurityEvent('file_access_denied', {
        reason: 'File type not allowed',
        mimeType,
        filePath
      })
      return new NextResponse('File type not allowed for viewing', { status: 403 })
    }

    // For public access, force inline viewing (no downloads)
    const isPublicAccess = tokenVerification.isPublic
    const disposition = isPublicAccess || mode === 'view' ? 'inline' : 'attachment'

    // Security headers for view-only access
    const headers: Record<string, string> = {
      'Content-Type': mimeType,
      'Content-Disposition': `${disposition}; filename="${filePath.split('/').pop()}"`,
      ...SecurityUtils.getSecurityHeaders(isPublicAccess)
    }

    // For PDFs, allow some scripts for viewer functionality
    if (mimeType === 'application/pdf') {
      headers['Content-Security-Policy'] = "default-src 'self'; script-src 'unsafe-inline'; object-src 'self';"
    }

    // Log successful file access
    SecurityUtils.logSecurityEvent('file_access', {
      filePath,
      mimeType,
      fileSize: fileBuffer.length,
      isPublicAccess,
      mode
    })

    return new NextResponse(fileBuffer as unknown as BodyInit, { headers })

  } catch (error) {
    console.error('Secure file serving error:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}

// Generate token endpoint for authorized access
export async function POST(request: NextRequest) {
  try {
    const { filePath, isPublic = true } = await request.json()

    if (!filePath) {
      return NextResponse.json({ error: 'File path required' }, { status: 400 })
    }

    // Security: Validate file path
    if (filePath.includes('..') || filePath.includes('\\') || !filePath.startsWith('uploads/')) {
      return NextResponse.json({ error: 'Invalid file path' }, { status: 400 })
    }

    // Check if file exists
    const fullPath = join(process.cwd(), 'public', filePath)
    if (!existsSync(fullPath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 })
    }

    const token = generateViewToken(filePath, isPublic)
    
    // Get file stats for response
    const fs = require('fs')
    const stats = fs.statSync(fullPath)

    return NextResponse.json({
      success: true,
      token,
      viewUrl: `/api/secure-file?token=${encodeURIComponent(token)}&file=${encodeURIComponent(filePath)}&mode=view`,
      expiresIn: isPublic ? SECURITY_CONFIG.FILE_ACCESS.TOKEN_EXPIRY.PUBLIC : SECURITY_CONFIG.FILE_ACCESS.TOKEN_EXPIRY.AUTHENTICATED,
      fileInfo: {
        size: stats.size,
        lastModified: stats.mtime,
        isPreviewable: SecurityUtils.isAllowedFileType(require('path').extname(filePath))
      }
    })

  } catch (error) {
    console.error('Token generation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
