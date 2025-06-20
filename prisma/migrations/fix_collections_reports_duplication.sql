-- 🔧 MIGRATION: Fix Collections vs Reports Duplication
-- Tujuan: Menggabungkan data collections ke dalam reports dengan status COMPLETED

-- Step 1: Backup existing data
CREATE TABLE IF NOT EXISTS collections_backup AS SELECT * FROM collections;
CREATE TABLE IF NOT EXISTS limited_collections_backup AS SELECT * FROM limited_collections;

-- Step 2: Add new fields to reports table
ALTER TABLE reports ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT false;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS max_access INTEGER;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS current_access INTEGER DEFAULT 0;
ALTER TABLE reports ADD COLUMN IF NOT EXISTS tags TEXT;

-- Step 3: Migrate collections data to reports
INSERT INTO reports (
  id, title, description, content, status, category, priority,
  is_public, tags, author_id, created_at, updated_at
)
SELECT 
  id, title, description, content, 
  'COMPLETED' as status,  -- ✅ Collections otomatis jadi COMPLETED reports
  category, 'MEDIUM' as priority,
  is_public, tags, author_id, created_at, updated_at
FROM collections
WHERE id NOT IN (SELECT id FROM reports); -- Avoid duplicates

-- Step 4: Migrate limited_collections data to reports  
INSERT INTO reports (
  id, title, description, content, status, category, priority,
  is_public, max_access, current_access, tags, author_id, created_at, updated_at
)
SELECT 
  id, title, description, content,
  'COMPLETED' as status,  -- ✅ Limited collections juga jadi COMPLETED reports
  category, 'MEDIUM' as priority,
  is_active as is_public, max_access, current_access, tags, 
  author_id, created_at, updated_at
FROM limited_collections
WHERE id NOT IN (SELECT id FROM reports); -- Avoid duplicates

-- Step 5: Update uploaded_files references
UPDATE uploaded_files 
SET report_id = (
  SELECT id FROM reports 
  WHERE reports.title = (
    SELECT title FROM collections 
    WHERE collections.id = uploaded_files.report_id
  )
  LIMIT 1
)
WHERE report_id IN (SELECT id FROM collections);

-- Step 6: Clean up - Drop collections tables (HATI-HATI!)
-- Uncomment ini setelah yakin data sudah aman:
-- DROP TABLE collections;
-- DROP TABLE limited_collections;

-- Step 7: Verification queries
SELECT 
  'VERIFICATION' as check_type,
  COUNT(*) as total_reports,
  COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) as completed_reports,
  COUNT(CASE WHEN is_public = true THEN 1 END) as public_reports,
  COUNT(CASE WHEN max_access IS NOT NULL THEN 1 END) as limited_access_reports
FROM reports; 
