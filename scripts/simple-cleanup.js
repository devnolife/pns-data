const fs = require('fs')
const path = require('path')

// Simple file-based cleanup
async function simpleCleanup() {
  console.log('🧹 Simple cleanup - checking files vs database expectations...')

  // Check what PDF files actually exist
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
            path: itemPath,
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

  console.log(`\n📄 ACTUAL PDF FILES FOUND:`)
  if (existingPDFs.length === 0) {
    console.log('   ❌ NO PDF FILES FOUND!')
    console.log('   This means all reports in database are orphaned')
  } else {
    existingPDFs.forEach(pdf => {
      console.log(`   ✅ ${pdf.filename} -> /${pdf.relativePath}`)
    })
  }

  // Check cover images
  const coversDir = path.join(process.cwd(), 'public', 'uploads', 'covers')
  const existingCovers = []

  if (fs.existsSync(coversDir)) {
    function scanCovers(dir) {
      try {
        const items = fs.readdirSync(dir)
        for (const item of items) {
          const itemPath = path.join(dir, item)
          const stat = fs.statSync(itemPath)

          if (stat.isDirectory()) {
            scanCovers(itemPath)
          } else if (item.match(/\.(jpg|jpeg|png|gif)$/i)) {
            const relativePath = path.relative(path.join(process.cwd(), 'public'), itemPath).replace(/\\/g, '/')
            existingCovers.push({
              filename: item,
              path: itemPath,
              relativePath: relativePath
            })
          }
        }
      } catch (error) {
        console.log(`⚠️ Could not scan covers directory: ${dir}`)
      }
    }

    scanCovers(coversDir)
  }

  console.log(`\n🖼️ COVER IMAGES FOUND:`)
  if (existingCovers.length === 0) {
    console.log('   ❌ NO COVER IMAGES FOUND!')
  } else {
    existingCovers.forEach(cover => {
      console.log(`   ✅ ${cover.filename} -> /${cover.relativePath}`)
    })
  }

  console.log(`\n📋 SUMMARY:`)
  console.log(`   - PDF files found: ${existingPDFs.length}`)
  console.log(`   - Cover images found: ${existingCovers.length}`)

  if (existingPDFs.length === 0) {
    console.log(`\n⚠️ CRITICAL ISSUE DETECTED:`)
    console.log(`   - No PDF files found in filesystem`)
    console.log(`   - But database still shows COMPLETED reports`)
    console.log(`   - This causes the mismatch you're experiencing`)

    console.log(`\n💡 SOLUTION:`)
    console.log(`   1. All COMPLETED reports in database should be deleted or set to DRAFT`)
    console.log(`   2. Only reports with actual PDF files should be COMPLETED`)

    console.log(`\n🔧 RECOMMENDED ACTION:`)
    console.log(`   Run this SQL to clean up orphaned reports:`)
    console.log(`   
   -- Check current COMPLETED reports
   SELECT id, title, created_at FROM reports WHERE status = 'COMPLETED';
   
   -- Delete orphaned reports (CAREFUL!)
   DELETE FROM files WHERE report_id IN (
     SELECT id FROM reports WHERE status = 'COMPLETED'
   );
   DELETE FROM reports WHERE status = 'COMPLETED';
   
   -- Or alternatively, change status to DRAFT
   UPDATE reports SET status = 'DRAFT' WHERE status = 'COMPLETED';
   `)
  }
}

simpleCleanup() 
