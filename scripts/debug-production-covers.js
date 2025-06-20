// Script untuk debug cover image di production
// Run dengan: node scripts/debug-production-covers.js

const { PrismaClient } = require('../lib/generated/prisma')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function debugProductionCovers() {
  console.log('🔍 Debug cover image untuk production...\n')

  try {
    // Get all COMPLETED reports
    const completedReports = await prisma.reports.findMany({
      where: {
        status: 'COMPLETED'
      },
      include: {
        files: {
          where: {
            file_type: 'cover'
          }
        }
      }
    })

    console.log(`📊 Found ${completedReports.length} completed reports\n`)

    const coverPath = path.join(process.cwd(), 'public', 'uploads', 'covers')
    console.log(`📁 Cover directory: ${coverPath}`)
    console.log(`📁 Cover directory exists: ${fs.existsSync(coverPath)}\n`)

    // Check available cover files
    const availableCovers = []
    if (fs.existsSync(coverPath)) {
      const years = fs.readdirSync(coverPath)
      for (const year of years) {
        const yearPath = path.join(coverPath, year)
        if (fs.statSync(yearPath).isDirectory()) {
          const batches = fs.readdirSync(yearPath)
          for (const batch of batches) {
            const batchPath = path.join(yearPath, batch)
            if (fs.statSync(batchPath).isDirectory()) {
              const files = fs.readdirSync(batchPath)
              const imageFiles = files.filter(f =>
                f.toLowerCase().endsWith('.jpg') ||
                f.toLowerCase().endsWith('.jpeg') ||
                f.toLowerCase().endsWith('.png') ||
                f.toLowerCase().endsWith('.webp')
              )
              availableCovers.push({
                year,
                batch,
                files: imageFiles,
                count: imageFiles.length
              })
            }
          }
        }
      }
    }

    console.log('📋 Available cover files:')
    availableCovers.forEach(cover => {
      console.log(`   ${cover.year}/${cover.batch}/: ${cover.count} files`)
      if (cover.files.length > 0) {
        console.log(`     Files: ${cover.files.slice(0, 3).join(', ')}${cover.files.length > 3 ? '...' : ''}`)
      }
    })

    console.log('\n🔍 Checking each report:')
    let issuesFound = 0

    for (let i = 0; i < completedReports.length; i++) {
      const report = completedReports[i]
      console.log(`\n--- REPORT ${i + 1}: ${report.title} ---`)
      console.log(`ID: ${report.id}`)
      console.log(`Created: ${report.created_at}`)
      console.log(`Year: ${new Date(report.created_at).getFullYear()}`)
      console.log(`Cover URL in DB: ${report.cover_image_url || 'NULL'}`)

      // Check if cover file exists
      if (report.cover_image_url) {
        const fullPath = path.join(process.cwd(), 'public', report.cover_image_url)
        const exists = fs.existsSync(fullPath)
        console.log(`Cover file exists: ${exists ? '✅' : '❌'}`)
        console.log(`Full path: ${fullPath}`)

        if (!exists) {
          issuesFound++
          console.log(`⚠️ ISSUE: Cover file not found!`)

          // Try to find the file in different locations
          const filename = path.basename(report.cover_image_url)
          const reportYear = new Date(report.created_at).getFullYear().toString()

          // Check different possible locations
          const possiblePaths = [
            path.join(coverPath, reportYear, filename),
            path.join(coverPath, reportYear, 'I', filename),
            path.join(coverPath, reportYear, 'II', filename),
            path.join(coverPath, 'misc', filename)
          ]

          console.log(`🔍 Searching for file in possible locations:`)
          possiblePaths.forEach(p => {
            const exists = fs.existsSync(p)
            console.log(`   ${p}: ${exists ? '✅' : '❌'}`)
          })
        }
      } else {
        console.log(`⚠️ ISSUE: No cover_image_url in database`)
        issuesFound++
      }

      // Check cover files in uploaded_files
      if (report.files.length > 0) {
        console.log(`Cover files in uploaded_files: ${report.files.length}`)
        report.files.forEach(file => {
          console.log(`   - ${file.filename} (${file.mime_type})`)
          console.log(`     Path: ${file.file_path}`)
          console.log(`     Year: ${file.year}, Batch: ${file.batch}`)
        })
      } else {
        console.log(`⚠️ No cover files in uploaded_files`)
      }
    }

    console.log(`\n📊 SUMMARY:`)
    console.log(`   - Total reports: ${completedReports.length}`)
    console.log(`   - Issues found: ${issuesFound}`)
    console.log(`   - Available cover directories: ${availableCovers.length}`)
    console.log(`   - Total cover files: ${availableCovers.reduce((sum, c) => sum + c.count, 0)}`)

    if (issuesFound > 0) {
      console.log(`\n🔧 RECOMMENDATIONS:`)
      console.log(`   1. Run fix-cover-images.js to fix missing cover URLs`)
      console.log(`   2. Check file permissions on uploads/covers directory`)
      console.log(`   3. Verify that cover images are actually uploaded`)
      console.log(`   4. Check middleware security settings`)
    }

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the script
debugProductionCovers() 
