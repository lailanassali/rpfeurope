-- ========================================
-- Migration: Add tag and services fields to locations table
-- ========================================

-- Step 1: Add new columns
ALTER TABLE locations 
ADD COLUMN tag VARCHAR(50),
ADD COLUMN services TEXT;

-- Step 2: Migrate existing data (combine service_type and service_date into services)
UPDATE locations 
SET services = CONCAT(
  COALESCE(service_type, ''),
  CASE 
    WHEN service_type IS NOT NULL AND service_date IS NOT NULL THEN ' - '
    ELSE ''
  END,
  COALESCE(service_date, '')
)
WHERE service_type IS NOT NULL OR service_date IS NOT NULL;

-- Step 3: Set default tag for existing records (you may want to update these individually)
UPDATE locations 
SET tag = 'CHH UK' 
WHERE tag IS NULL;

-- Step 4: Add constraint to tag column
ALTER TABLE locations 
ADD CONSTRAINT check_tag_values 
CHECK (tag IN ('CHH UK', 'CHH Europe', 'CHH Africa', 'CHH on Campus'));

-- Step 5: Make tag NOT NULL now that all records have values
ALTER TABLE locations 
ALTER COLUMN tag SET NOT NULL;

-- Step 6: Drop old columns (after verifying migration was successful)
-- CAUTION: Uncomment these lines only after verifying the data migration worked correctly
ALTER TABLE locations DROP COLUMN service_type;
ALTER TABLE locations DROP COLUMN service_date;

-- Verification query
SELECT id, name, tag, services, address FROM locations LIMIT 10;
