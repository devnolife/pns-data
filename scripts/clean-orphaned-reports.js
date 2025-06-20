const { PrismaClient } = require('../lib/generated/prisma')
const fs = require('fs')
const path = require('path')

const prisma = new PrismaClient()

async function cleanOrphanedReports() {
  console.log('🧹 Cleaning orphaned reports from database...')

  try {
    // Get all reports with status COMPLETED
    const completedReports = await prisma.reports.findMany({
      where: {
        status: 'COMPLETED'
      },
      include: {
        files: true
      }
    })

    console.log(`📊 Found ${completedReports.length} COMPLETED reports in database`)

    if (completedReports.length === 0) {
      console.log('✅ No COMPLETED reports found. Database is already clean!')
      return
    }

    // Check which reports have valid PDF files
    const orphanedReports = []
    const validReports = []

    for (const report of completedReports) {
      console.log(`\n--- CHECKING REPORT ---`)
      console.log(`Title: ${report.title}`)
      console.log(`ID: ${report.id}`)
      console.log(`Files: ${report.files.length}`)

      let hasValidPDF = false

      // Check if PDF files exist
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
        console.log(`  ✅ Valid report`)
        validReports.push(report)
      } else {
        console.log(`  ❌ Orphaned report (no valid PDF files)`)
        orphanedReports.push(report)
      }
    }

    console.log(`\n📋 SUMMARY:`)
    console.log(`   - Total COMPLETED reports: ${completedReports.length}`)
    console.log(`   - Valid reports: ${validReports.length}`)
    console.log(`   - Orphaned reports: ${orphanedReports.length}`)

    if (orphanedReports.length > 0) {
      console.log(`\n🗑️ ORPHANED REPORTS (will be changed to PENDING):`)
      orphanedReports.forEach(report => {
        console.log(`   - "${report.title}" (${report.id})`)
      })

      // Change status to PENDING instead of deleting
      console.log(`\n🔄 Changing orphaned reports status to PENDING...`)

      for (const report of orphanedReports) {
        try {
          await prisma.reports.update({
            where: { id: report.id },
            data: { status: 'PENDING' }  // Change to PENDING instead of DRAFT
          })

          console.log(`✅ Changed "${report.title}" status to PENDING`)
        } catch (error) {
          console.log(`❌ Error updating report ${report.id}: ${error.message}`)
        }
      }

      console.log(`\n✅ Database cleanup completed!`)
      console.log(`   - Changed ${orphanedReports.length} reports to PENDING status`)
      console.log(`   - Remaining ${validReports.length} valid COMPLETED reports`)

      console.log(`\n🎉 RESULT:`)
      console.log(`   - Halaman utama sekarang akan menampilkan ${validReports.length} laporan valid`)
      console.log(`   - Laporan orphaned tidak akan muncul di public collections`)
      console.log(`   - Database sudah konsisten dengan file system`)

    } else {
      console.log(`\n✅ All COMPLETED reports have valid PDF files. No cleanup needed!`)
    }

    // Final verification
    const finalCount = await prisma.reports.count({
      where: { status: 'COMPLETED' }
    })

    console.log(`\n🔍 Final verification: ${finalCount} COMPLETED reports remaining`)

  } catch (error) {
    console.error('❌ Error during cleanup:', error)
  } finally {
    await prisma.$disconnect()
  }
}

cleanOrphanedReports() 
