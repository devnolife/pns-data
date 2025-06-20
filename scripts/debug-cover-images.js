// Debug script untuk melihat detail cover images
// Run dengan: node scripts/debug-cover-images.js

const { PrismaClient } = require('../lib/generated/prisma')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function debugCoverImages() {
  console.log('🔍 Debug cover image URLs...')

  try {
    // Get all COMPLETED reports
    const completedReports = await prisma.reports.findMany({
      where: {
        status: 'COMPLETED'
      },
      include: {
        files: true
      }
    })

    console.log(`\n📊 Found ${completedReports.length} completed reports`)

    // Get available cover folders
    const coverPath = path.join(process.cwd(), 'public', 'uploads', 'covers')
    const availableFolders = []

    try {
      const years = fs.readdirSync(coverPath)
      for (const year of years) {
        const yearPath = path.join(coverPath, year)
        if (fs.statSync(yearPath).isDirectory()) {
          const batches = fs.readdirSync(yearPath)
          availableFolders.push(`${year}/: ${batches.join(', ')}`)
        }
      }
    } catch (error) {
      console.log('⚠️ No cover folders found')
    }

    console.log('\n📁 Available cover files:')
    availableFolders.forEach(folder => console.log(`   ${folder}`))

    // Check each report and its files
    const orphanedReports = []

    for (let i = 0; i < completedReports.length; i++) {
      const report = completedReports[i]
      console.log(`\n--- REPORT ${i + 1} ---`)
      console.log(`Title: ${report.title}`)
      console.log(`ID: ${report.id}`)
      console.log(`Current cover_image_url: ${report.cover_image_url}`)
      console.log(`Created: ${report.created_at}`)
      console.log(`Report Year: ${new Date(report.created_at).getFullYear()}`)
      console.log(`Files (${report.files.length}):`)

      let hasValidPDF = false

      // Check each file
      for (const file of report.files) {
        console.log(`  - ${file.filename} (${file.mime_type})`)
        console.log(`    Path: ${file.file_path}`)

        // Check if PDF file exists
        if (file.mime_type === 'application/pdf') {
          const fullPath = path.join(process.cwd(), 'public', file.file_path)
          const exists = fs.existsSync(fullPath)
          console.log(`    PDF exists: ${exists ? '✅' : '❌'}`)
          if (exists) hasValidPDF = true
        }
      }

      // Check cover image
      if (report.cover_image_url) {
        const coverPath = path.join(process.cwd(), 'public', report.cover_image_url)
        const coverExists = fs.existsSync(coverPath)
        console.log(`Cover image exists: ${coverExists ? '✅' : '❌'}`)
      }

      if (!hasValidPDF) {
        console.log(`⚠️ This report has no valid PDF files!`)
        orphanedReports.push(report)
      }

      // Check what files are available in the year folder
      const reportYear = new Date(report.created_at).getFullYear()
      try {
        const yearFolder = path.join(process.cwd(), 'public', 'uploads', 'covers', reportYear.toString())
        if (fs.existsSync(yearFolder)) {
          const contents = fs.readdirSync(yearFolder)
          console.log(`Available files in ${reportYear}/: ${contents.join(', ')}`)
        }
      } catch (error) {
        console.log(`No files found for year ${reportYear}`)
      }
    }

    // Summary
    console.log(`\n📋 SUMMARY:`)
    console.log(`   - Total COMPLETED reports: ${completedReports.length}`)
    console.log(`   - Reports with valid PDF files: ${completedReports.length - orphanedReports.length}`)
    console.log(`   - Orphaned reports (no PDF files): ${orphanedReports.length}`)

    if (orphanedReports.length > 0) {
      console.log(`\n🗑️ ORPHANED REPORTS (should be cleaned from database):`)
      orphanedReports.forEach(report => {
        console.log(`   - "${report.title}" (ID: ${report.id})`)
      })

      console.log(`\n💡 To clean these orphaned reports, you can:`)
      console.log(`   1. Delete them manually from database`)
      console.log(`   2. Or change their status from COMPLETED to DRAFT/PENDING`)
    }

    // Also check for actual PDF files that exist
    console.log(`\n📄 ACTUAL PDF FILES IN FILESYSTEM:`)
    const reportsDir = path.join(process.cwd(), 'public', 'uploads', 'reports')

    function scanPDFs(dir, level = 0) {
      try {
        const items = fs.readdirSync(dir)
        for (const item of items) {
          const itemPath = path.join(dir, item)
          const stat = fs.statSync(itemPath)

          if (stat.isDirectory()) {
            console.log(`${'  '.repeat(level)}📁 ${item}/`)
            scanPDFs(itemPath, level + 1)
          } else if (item.endsWith('.pdf')) {
            const relativePath = path.relative(path.join(process.cwd(), 'public'), itemPath).replace(/\\/g, '/')
            console.log(`${'  '.repeat(level)}📄 ${item} -> /${relativePath}`)
          }
        }
      } catch (error) {
        console.log(`${'  '.repeat(level)}⚠️ Cannot read directory: ${dir}`)
      }
    }

    if (fs.existsSync(reportsDir)) {
      scanPDFs(reportsDir)
    } else {
      console.log('   ⚠️ No reports directory found')
    }

  } catch (error) {
    console.error('❌ Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Run the script
debugCoverImages() 
