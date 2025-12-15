-- Complete FAQs table migration
-- Run this in Supabase SQL Editor

-- Step 1: Add missing columns
ALTER TABLE faqs 
ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'General',
ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Step 2: Rename 'page' column to match old data (if it exists)
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'faqs' AND column_name = 'page'
  ) THEN
    UPDATE faqs SET category = 
      CASE 
        WHEN page = 'youth' THEN 'General'
        WHEN page = 'university' THEN 'General'
        WHEN page = 'fellowship' THEN 'General'
        WHEN page = 'children' THEN 'General'
        WHEN page = 'general' THEN 'General'
        ELSE 'General'
      END
    WHERE category = 'General';
    
    ALTER TABLE faqs DROP COLUMN IF EXISTS page;
  END IF;
END $$;

-- Step 3: Add check constraint
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'faq_category_check'
  ) THEN
    ALTER TABLE faqs 
    ADD CONSTRAINT faq_category_check CHECK (
      category IN ('Baptism', 'Counselling', 'Prayers', 'Serve', 'Mentorship', 'General')
    );
  END IF;
END $$;

-- Step 4: Create indexes
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_faqs_order ON faqs(order_index);

-- Step 5: Create trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Step 6: Add trigger
DROP TRIGGER IF EXISTS update_faqs_updated_at ON faqs;
CREATE TRIGGER update_faqs_updated_at 
  BEFORE UPDATE ON faqs
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Step 7: Update existing data
UPDATE faqs SET 
  category = 'General' WHERE category IS NULL,
  order_index = 0 WHERE order_index IS NULL;
