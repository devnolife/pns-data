import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'
import crypto from 'crypto'
import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/actions/auth'

// Maximum file size (20MB)
const MAX_FILE_SIZE = 20 * 1024 * 1024

// Allowed file types
const ALLOWED_TYPES = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/msword': 'doc',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/zip': 'zip',
  'application/x-zip-compressed': 'zip',
  'application/vnd.rar': 'rar'
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    const category = formData.get('category') as string
    const year = formData.get('year') as string
    const batch = formData.get('batch') as string
    const reportId = formData.get('reportId') as string | null

    // PERBAIKAN: Validasi input form yang ketat
    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files provided' },
        { status: 400 }
      )
    }

    // Validasi tahun
    if (year) {
      const yearNum = parseInt(year)
      if (isNaN(yearNum) || yearNum < 2020 || yearNum > 2030) {
        return NextResponse.json(
          { success: false, error: 'Invalid year provided. Year must be between 2020-2030.' },
          { status: 400 }
        )
      }
    }

    // Validasi angkatan
    if (batch) {
      const validBatches = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
      if (!validBatches.includes(batch)) {
        return NextResponse.json(
          { success: false, error: 'Invalid batch provided. Batch must be Roman numerals I-XII.' },
          { status: 400 }
        )
      }
    }


    const uploadedFiles = []

    for (const file of files) {
      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { success: false, error: `File ${file.name} is too large. Maximum size is 20MB.` },
          { status: 400 }
        )
      }

      // Validate file type
      if (!ALLOWED_TYPES[file.type as keyof typeof ALLOWED_TYPES]) {
        return NextResponse.json(
          { success: false, error: `File type ${file.type} is not allowed for ${file.name}` },
          { status: 400 }
        )
      }

      // Generate unique filename
      const fileExtension = ALLOWED_TYPES[file.type as keyof typeof ALLOWED_TYPES]
      const uniqueId = crypto.randomUUID()
      const filename = `${uniqueId}.${fileExtension}`

      // Determine upload path based on category
      const uploadDir = reportId ? 'reports' : 'collections'
      const yearFolder = year || new Date().getFullYear().toString()
      const batchFolder = batch || 'general'

      const relativePath = join('uploads', uploadDir, yearFolder, batchFolder)
      const fullUploadPath = join(process.cwd(), 'public', relativePath)
      const filePath = join(fullUploadPath, filename)

      // Create directory if it doesn't exist
      if (!existsSync(fullUploadPath)) {
        await mkdir(fullUploadPath, { recursive: true })
      }

      // Convert file to buffer and save
      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      await writeFile(filePath, buffer)

      // Save file metadata to database
      const normalizedFilePath = join(relativePath, filename).replace(/\\/g, '/')


      const fileRecord = await prisma.uploaded_files.create({
        data: {
          id: crypto.randomUUID(),
          filename: filename,
          original_name: file.name,
          file_path: normalizedFilePath,
          file_size: file.size,
          mime_type: file.type,
          category: category,
          year: year,
          batch: batch,
          report_id: reportId,
          author_id: currentUser.id,
          updated_at: new Date()
        }
      })


      uploadedFiles.push({
        id: fileRecord.id,
        filename: fileRecord.filename,
        originalName: fileRecord.original_name,
        filePath: fileRecord.file_path,
        fileSize: fileRecord.file_size,
        mimeType: fileRecord.mime_type,
        downloadUrl: `/uploads/${uploadDir}/${yearFolder}/${batchFolder}/${filename}`
      })
    }

    return NextResponse.json({
      success: true,
      message: `Successfully uploaded ${uploadedFiles.length} file(s)`,
      files: uploadedFiles
    })

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
} 
