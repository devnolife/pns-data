-- Direct SQL cleanup for orphaned reports
-- Run this carefully in your database management tool

-- 1. First, let's see what we have
SELECT 
    id, 
    title, 
    status, 
    created_at,
    cover_image_url
FROM reports 
WHERE status = 'COMPLETED'
ORDER BY created_at DESC;

-- 2. Check files associated with these reports
SELECT 
    f.id,
    f.filename,
    f.file_path,
    f.mime_type,
    r.title as report_title,
    r.id as report_id
FROM files f
JOIN reports r ON f.report_id = r.id
WHERE r.status = 'COMPLETED'
ORDER BY r.created_at DESC;

-- 3. CAREFUL: Delete orphaned reports (uncomment when ready)
-- First delete the files
-- DELETE FROM files WHERE report_id IN (
--     SELECT id FROM reports WHERE status = 'COMPLETED'
-- );

-- Then delete the reports
-- DELETE FROM reports WHERE status = 'COMPLETED';

-- 4. Alternative: Change status to DRAFT instead of deleting
-- UPDATE reports SET status = 'DRAFT' WHERE status = 'COMPLETED';

-- 5. Verify cleanup
-- SELECT COUNT(*) as completed_reports FROM reports WHERE status = 'COMPLETED';
-- SELECT COUNT(*) as total_reports FROM reports; 
