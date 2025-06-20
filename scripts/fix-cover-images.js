// Script untuk memperbaiki cover image URL di database
// Run dengan: node scripts/fix-cover-images.js

const { PrismaClient } = require('../lib/generated/prisma')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function fixCoverImages() {
  try {
    console.log('🔍 Mulai memperbaiki cover image URLs...')

    // Get all reports
    const reports = await prisma.reports.findMany({
      where: {
        status: 'COMPLETED'
      },
      include: {
        files: {
          select: {
            id: true,
            filename: true,
            original_name: true,
            file_type: true,
            mime_type: true,
            year: true,
            batch: true
          }
        }
      }
    })

    console.log(`📊 Found ${reports.length} completed reports`)

    let updatedCount = 0
    const publicCoverPath = path.join(process.cwd(), 'public', 'uploads', 'covers')

    for (const report of reports) {
      let coverImageUrl = report.cover_image_url

      // Skip if already has cover image URL
      if (coverImageUrl) {
        continue
      }

      // Try to find cover file in report files
      const coverFile = report.files.find(file =>
        file.file_type === 'cover' ||
        file.mime_type?.startsWith('image/') ||
        file.original_name?.toLowerCase().includes('cover') ||
        file.original_name?.toLowerCase().includes('sampul')
      )

      if (coverFile) {
        const reportYear = coverFile.year || new Date(report.created_at).getFullYear().toString()
        const potentialPath = `/uploads/covers/${reportYear}/${coverFile.filename}`
        const fullPath = path.join(publicCoverPath, reportYear, coverFile.filename)

        // Check if file exists
        if (fs.existsSync(fullPath)) {
          // Update database
          await prisma.reports.update({
            where: { id: report.id },
            data: { cover_image_url: potentialPath }
          })

          console.log(`✅ Updated cover for report "${report.title}": ${potentialPath}`)
          updatedCount++
        } else {
          console.log(`⚠️  Cover file not found for "${report.title}": ${fullPath}`)
        }
      } else {
        // Try to find any image file in the covers directory for this report's year
        const reportYear = new Date(report.created_at).getFullYear().toString()
        const yearCoverPath = path.join(publicCoverPath, reportYear)

        if (fs.existsSync(yearCoverPath)) {
          const files = fs.readdirSync(yearCoverPath)
          const imageFiles = files.filter(file =>
            file.toLowerCase().endsWith('.jpg') ||
            file.toLowerCase().endsWith('.jpeg') ||
            file.toLowerCase().endsWith('.png') ||
            file.toLowerCase().endsWith('.webp')
          )

          if (imageFiles.length > 0) {
            // Use first available image as fallback
            const fallbackImage = imageFiles[0]
            const fallbackPath = `/uploads/covers/${reportYear}/${fallbackImage}`

            await prisma.reports.update({
              where: { id: report.id },
              data: { cover_image_url: fallbackPath }
            })

            console.log(`🔄 Set fallback cover for report "${report.title}": ${fallbackPath}`)
            updatedCount++
          }
        }
      }
    }

    console.log(`\n🎉 Selesai! Updated ${updatedCount} reports dengan cover images`)

    // List available cover directories
    if (fs.existsSync(publicCoverPath)) {
      const years = fs.readdirSync(publicCoverPath)
      console.log(`\n📁 Available cover directories:`)
      years.forEach(year => {
        const yearPath = path.join(publicCoverPath, year)
        if (fs.statSync(yearPath).isDirectory()) {
          const files = fs.readdirSync(yearPath)
          console.log(`   ${year}/: ${files.length} files`)
        }
      })
    }

  } catch (error) {
    console.error('❌ Error fixing cover images:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the script
fixCoverImages() 
