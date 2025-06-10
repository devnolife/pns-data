import { NextRequest, NextResponse } from 'next/server'
import { verifyPDFViewToken } from '@/lib/actions/reports'
import { readFile } from 'fs/promises'
import { join } from 'path'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')
    const filePath = searchParams.get('file')

    if (!token || !filePath) {
      return new NextResponse('Missing token or file path', { status: 400 })
    }

    // Verify token
    const tokenVerification = await verifyPDFViewToken(token)
    if (!tokenVerification.success) {
      return new NextResponse('Invalid or expired token', { status: 403 })
    }

    // Security: Ensure file path is safe and only allows PDF files
    if (!filePath.endsWith('.pdf') || filePath.includes('..')) {
      return new NextResponse('Invalid file path', { status: 400 })
    } try {
      const fullPath = join(process.cwd(), 'public', filePath)
      const fileBuffer = await readFile(fullPath)

      return new NextResponse(fileBuffer as unknown as BodyInit, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline', // Display in browser, not download
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'SAMEORIGIN',
          'Content-Security-Policy': "default-src 'self'; script-src 'none';"
        }
      })
    } catch (fileError) {
      console.error('File read error:', fileError)
      return new NextResponse('File not found', { status: 404 })
    }
  } catch (error) {
    console.error('PDF access error:', error)
    return new NextResponse('Internal server error', { status: 500 })
  }
}
