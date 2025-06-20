const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function cleanupOrphanedReports() {
  console.log('🧹 Cleaning up orphaned reports...')

  try {
    // Get all reports from database
    const allReports = await prisma.reports.findMany({
      include: {
        files: true
      }
    })

    console.log(`📊 Found ${allReports.length} reports in database`)

    // Get all PDF files in uploads directory
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'reports')
    const existingPDFs = []

    function scanDirectory(dir) {
      try {
        const items = fs.readdirSync(dir)
        for (const item of items) {
          const itemPath = path.join(dir, item)
          const stat = fs.statSync(itemPath)

          if (stat.isDirectory()) {
            scanDirectory(itemPath)
          } else if (item.endsWith('.pdf')) {
            existingPDFs.push({
              filename: item,
              path: itemPath,
              relativePath: path.relative(path.join(process.cwd(), 'public'), itemPath).replace(/\\/g, '/')
            })
          }
        }
      } catch (error) {
        console.log(`⚠️ Could not scan directory: ${dir}`)
      }
    }

    if (fs.existsSync(uploadsDir)) {
      scanDirectory(uploadsDir)
    }

    console.log(`📁 Found ${existingPDFs.length} PDF files in filesystem:`)
    existingPDFs.forEach(pdf => {
      console.log(`   - ${pdf.filename} (${pdf.relativePath})`)
    })

    // Check each report
    const orphanedReports = []

    for (const report of allReports) {
      console.log(`\n--- CHECKING REPORT ---`)
      console.log(`Title: ${report.title}`)
      console.log(`ID: ${report.id}`)
      console.log(`Status: ${report.status}`)
      console.log(`Files: ${report.files.length}`)

      let hasValidPDF = false

      // Check if report has files and if those files exist
      for (const file of report.files) {
        console.log(`  File: ${file.filename} (${file.file_path})`)

        // Check if PDF file exists
        if (file.mime_type === 'application/pdf') {
          const expectedPath = path.join(process.cwd(), 'public', file.file_path)
          if (fs.existsSync(expectedPath)) {
            console.log(`  ✅ PDF file exists: ${file.file_path}`)
            hasValidPDF = true
          } else {
            console.log(`  ❌ PDF file missing: ${file.file_path}`)
          }
        }
      }

      if (!hasValidPDF) {
        console.log(`  ⚠️ Report has no valid PDF files`)
        orphanedReports.push(report)
      }
    }

    console.log(`\n📋 SUMMARY:`)
    console.log(`   - Total reports in DB: ${allReports.length}`)
    console.log(`   - Orphaned reports: ${orphanedReports.length}`)
    console.log(`   - Valid reports: ${allReports.length - orphanedReports.length}`)

    if (orphanedReports.length > 0) {
      console.log(`\n🗑️ ORPHANED REPORTS TO CLEAN:`)
      orphanedReports.forEach(report => {
        console.log(`   - ${report.title} (${report.id}) - Status: ${report.status}`)
      })

      console.log(`\n⚠️ Would you like to delete these orphaned reports?`)
      console.log(`   Run with --delete flag to actually delete them`)

      // If --delete flag is provided, delete the orphaned reports
      if (process.argv.includes('--delete')) {
        console.log(`\n🗑️ Deleting orphaned reports...`)

        for (const report of orphanedReports) {
          try {
            // Delete associated files first
            await prisma.files.deleteMany({
              where: { report_id: report.id }
            })

            // Delete the report
            await prisma.reports.delete({
              where: { id: report.id }
            })

            console.log(`✅ Deleted report: ${report.title} (${report.id})`)
          } catch (error) {
            console.log(`❌ Error deleting report ${report.id}: ${error.message}`)
          }
        }

        console.log(`\n✅ Cleanup completed!`)
      }
    } else {
      console.log(`\n✅ No orphaned reports found!`)
    }

  } catch (error) {
    console.error('❌ Error during cleanup:', error)
  } finally {
    await prisma.$disconnect()
  }
}

cleanupOrphanedReports() 
