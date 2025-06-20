const { PrismaClient } = require('../lib/generated/prisma')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function fixDatabaseOrphans() {
  console.log('🔧 Fixing database orphans...')

  try {
    // First, let's see what we have in the database
    const allReports = await prisma.reports.findMany({
      include: {
        files: true
      }
    })

    console.log(`📊 Found ${allReports.length} total reports in database`)

    // Get actual PDF files from filesystem
    const reportsDir = path.join(process.cwd(), 'public', 'uploads', 'reports')
    const existingPDFs = []

    function scanPDFs(dir) {
      try {
        const items = fs.readdirSync(dir)
        for (const item of items) {
          const itemPath = path.join(dir, item)
          const stat = fs.statSync(itemPath)

          if (stat.isDirectory()) {
            scanPDFs(itemPath)
          } else if (item.endsWith('.pdf')) {
            const relativePath = path.relative(path.join(process.cwd(), 'public'), itemPath).replace(/\\/g, '/')
            existingPDFs.push({
              filename: item,
              relativePath: relativePath
            })
          }
        }
      } catch (error) {
        console.log(`⚠️ Could not scan directory: ${dir}`)
      }
    }

    if (fs.existsSync(reportsDir)) {
      scanPDFs(reportsDir)
    }

    console.log(`\n📄 Found ${existingPDFs.length} actual PDF files:`)
    existingPDFs.forEach(pdf => {
      console.log(`   - ${pdf.filename}`)
    })

    // Check each report and see if it has valid files
    const orphanedReports = []
    const validReports = []

    for (const report of allReports) {
      console.log(`\n--- CHECKING REPORT ---`)
      console.log(`Title: ${report.title}`)
      console.log(`ID: ${report.id}`)
      console.log(`Status: ${report.status}`)
      console.log(`Files: ${report.files.length}`)

      let hasValidPDF = false

      // Check if any of the report's files actually exist
      for (const file of report.files) {
        if (file.mime_type === 'application/pdf') {
          const fullPath = path.join(process.cwd(), 'public', file.file_path)
          const exists = fs.existsSync(fullPath)
          console.log(`  PDF: ${file.filename} - Exists: ${exists ? '✅' : '❌'}`)

          if (exists) {
            hasValidPDF = true
          }
        }
      }

      if (hasValidPDF) {
        console.log(`  ✅ Valid report - has PDF files`)
        validReports.push(report)
      } else {
        console.log(`  ❌ Orphaned report - no valid PDF files`)
        orphanedReports.push(report)
      }
    }

    console.log(`\n📋 SUMMARY:`)
    console.log(`   - Total reports: ${allReports.length}`)
    console.log(`   - Valid reports: ${validReports.length}`)
    console.log(`   - Orphaned reports: ${orphanedReports.length}`)

    if (orphanedReports.length > 0) {
      console.log(`\n🗑️ ORPHANED REPORTS TO DELETE:`)
      orphanedReports.forEach(report => {
        console.log(`   - "${report.title}" (${report.id}) - Status: ${report.status}`)
      })

      // Ask for confirmation before deleting
      console.log(`\n⚠️ WARNING: This will permanently delete ${orphanedReports.length} orphaned reports!`)
      console.log(`Run with --confirm flag to actually delete them.`)

      if (process.argv.includes('--confirm')) {
        console.log(`\n🗑️ DELETING ORPHANED REPORTS...`)

        for (const report of orphanedReports) {
          try {
            // Delete files first
            const deletedFiles = await prisma.files.deleteMany({
              where: { report_id: report.id }
            })

            // Delete the report
            await prisma.reports.delete({
              where: { id: report.id }
            })

            console.log(`✅ Deleted report: "${report.title}" (${report.id}) and ${deletedFiles.count} files`)
          } catch (error) {
            console.log(`❌ Error deleting report ${report.id}: ${error.message}`)
          }
        }

        console.log(`\n✅ Database cleanup completed!`)
        console.log(`   - Deleted ${orphanedReports.length} orphaned reports`)
        console.log(`   - Remaining ${validReports.length} valid reports`)
      }
    } else {
      console.log(`\n✅ No orphaned reports found! Database is clean.`)
    }

  } catch (error) {
    console.error('❌ Error during cleanup:', error)
  } finally {
    await prisma.$disconnect()
  }
}

fixDatabaseOrphans() 
