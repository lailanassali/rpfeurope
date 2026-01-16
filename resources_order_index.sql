-- Add order_index column if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'resources' AND column_name = 'order_index') THEN
        ALTER TABLE resources ADD COLUMN order_index INTEGER;
    END IF;
END $$;

-- Backfill order_index for existing resources
-- This assigns an index based on created_at (newest first, or however you prefer)
-- Using a window function to generate a sequence
WITH ordered_resources AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) - 1 as new_index
  FROM resources
)
UPDATE resources
SET order_index = ordered_resources.new_index
FROM ordered_resources
WHERE resources.id = ordered_resources.id
  AND resources.order_index IS NULL;
