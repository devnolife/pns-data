import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/actions/auth'
import { prisma } from '@/lib/prisma'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import crypto from 'crypto'

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
    const coverImage = formData.get('coverImage') as File
    const category = formData.get('category') as string
    const year = formData.get('year') as string
    const batch = formData.get('batch') as string

    if (!coverImage) {
      return NextResponse.json(
        { success: false, error: 'No cover image provided' },
        { status: 400 }
      )
    }

    // Validate file type
    if (!coverImage.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'Cover must be an image file (JPG, PNG, GIF)' },
        { status: 400 }
      )
    }

    // Validate file size (max 5MB)
    if (coverImage.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'Cover image size must be less than 5MB' },
        { status: 400 }
      )
    }

    // Create directory structure based on category, year, batch
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'covers', year || 'misc', batch || 'misc')
    await mkdir(uploadDir, { recursive: true })

    // Generate unique filename
    const fileExtension = coverImage.name.split('.').pop()
    const uniqueFilename = `cover_${crypto.randomUUID()}.${fileExtension}`
    const filePath = path.join(uploadDir, uniqueFilename)

    // Convert File to Buffer and save
    const bytes = await coverImage.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(filePath, buffer)

    // Create relative path for URL
    const relativeFilePath = `/uploads/covers/${year || 'misc'}/${batch || 'misc'}/${uniqueFilename}`

    // Save to database as uploaded_files entry
    const fileRecord = await prisma.uploaded_files.create({
      data: {
        id: crypto.randomUUID(),
        filename: uniqueFilename,
        original_name: coverImage.name,
        file_path: relativeFilePath,
        file_size: coverImage.size,
        mime_type: coverImage.type,
        file_type: 'cover',
        category: category || null,
        year: year || null,
        batch: batch || null,
        author_id: currentUser.id,
        updated_at: new Date(),
      }
    })

    console.log(`🖼️ Cover uploaded successfully: ${relativeFilePath}`)

    return NextResponse.json({
      success: true,
      coverImageUrl: relativeFilePath,
      fileId: fileRecord.id,
      message: 'Cover image uploaded successfully'
    })

  } catch (error) {
    console.error('Cover upload error:', error)
    return NextResponse.json(
      { success: false, error: 'Cover upload failed' },
      { status: 500 }
    )
  }
} 
