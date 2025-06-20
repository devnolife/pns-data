// Script untuk memperbaiki path cover image yang salah
// Run dengan: node scripts/fix-cover-paths.js

const { PrismaClient } = require('../lib/generated/prisma')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function fixCoverPaths() {
  try {
    console.log('🔧 Memperbaiki path cover image...\n')

    // Get all reports with cover_image_url
    const reports = await prisma.reports.findMany({
      where: {
        status: 'COMPLETED',
        cover_image_url: {
          not: null
        }
      },
      include: {
        files: {
          select: {
            year: true,
            batch: true
          }
        }
      }
    })

    console.log(`📊 Found ${reports.length} reports with cover_image_url\n`)

    const publicCoverPath = path.join(process.cwd(), 'public', 'uploads', 'covers')
    let fixedCount = 0

    for (const report of reports) {
      const currentCoverUrl = report.cover_image_url
      console.log(`--- REPORT: ${report.title} ---`)
      console.log(`Current cover URL: ${currentCoverUrl}`)
      console.log(`Report created: ${report.created_at}`)

      // Extract filename from current URL
      const currentFileName = path.basename(currentCoverUrl)
      console.log(`Cover filename: ${currentFileName}`)

      // Determine correct year and batch
      const reportYear = new Date(report.created_at).getFullYear().toString()
      const reportBatch = report.files.length > 0 ? report.files[0].batch : 'I'

      console.log(`Should be in: ${reportYear}/${reportBatch}/`)

      // Check if file exists in correct location
      const correctPath = path.join(publicCoverPath, reportYear, reportBatch || 'I')
      console.log(`Checking directory: ${correctPath}`)

      if (fs.existsSync(correctPath)) {
        const files = fs.readdirSync(correctPath)
        console.log(`Files in directory: ${files.join(', ')}`)

        // Look for the same filename or any cover file
        let foundFile = files.find(f => f === currentFileName)

        if (!foundFile) {
          // Try to find any cover file
          foundFile = files.find(f =>
            f.toLowerCase().startsWith('cover_') &&
            (f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png'))
          )
        }

        if (foundFile) {
          const correctUrl = `/uploads/covers/${reportYear}/${reportBatch || 'I'}/${foundFile}`
          console.log(`✅ Found file: ${foundFile}`)
          console.log(`Correct URL should be: ${correctUrl}`)

          if (currentCoverUrl !== correctUrl) {
            // Update database
            await prisma.reports.update({
              where: { id: report.id },
              data: { cover_image_url: correctUrl }
            })

            console.log(`🔄 UPDATED: ${currentCoverUrl} → ${correctUrl}`)
            fixedCount++
          } else {
            console.log(`✅ Already correct`)
          }
        } else {
          console.log(`❌ No cover file found in correct location`)
        }
      } else {
        console.log(`❌ Directory doesn't exist: ${correctPath}`)
      }

      console.log('')
    }

    console.log(`\n🎉 Fixed ${fixedCount} cover image paths!`)

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the script
fixCoverPaths() 
