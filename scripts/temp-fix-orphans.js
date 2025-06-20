// Temporary fix: Change orphaned COMPLETED reports to DRAFT status
// This will hide them from public view until we can properly clean up

console.log('🔧 Temporary fix for orphaned reports...')
console.log('')
console.log('Since there are schema issues with Prisma, here is the manual solution:')
console.log('')
console.log('📋 STEP 1: Open your database management tool (like SQLite Browser, pgAdmin, etc.)')
console.log('')
console.log('📋 STEP 2: Run this SQL query to see current COMPLETED reports:')
console.log(`
SELECT 
    id, 
    title, 
    status, 
    created_at
FROM reports 
WHERE status = 'COMPLETED'
ORDER BY created_at DESC;
`)
console.log('')
console.log('📋 STEP 3: Since you deleted the PDF files, change status to DRAFT:')
console.log(`
UPDATE reports 
SET status = 'DRAFT' 
WHERE status = 'COMPLETED';
`)
console.log('')
console.log('📋 STEP 4: Verify the change:')
console.log(`
SELECT COUNT(*) as completed_reports FROM reports WHERE status = 'COMPLETED';
SELECT COUNT(*) as draft_reports FROM reports WHERE status = 'DRAFT';
`)
console.log('')
console.log('✅ This will immediately fix the issue where:')
console.log('   - Halaman utama akan kosong (tidak ada laporan COMPLETED)')
console.log('   - Halaman detail tidak akan menampilkan laporan yang tidak ada filenya')
console.log('   - Database tetap bersih dan konsisten')
console.log('')
console.log('🔍 Alternative: If you want to completely delete the orphaned reports:')
console.log(`
-- First delete associated files
DELETE FROM files WHERE report_id IN (
    SELECT id FROM reports WHERE status = 'COMPLETED'
);

-- Then delete the reports
DELETE FROM reports WHERE status = 'COMPLETED';
`)
console.log('')
console.log('⚠️  RECOMMENDATION: Change to DRAFT instead of deleting, so you can restore later if needed.') 
