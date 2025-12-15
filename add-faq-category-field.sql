-- Update FAQs table to add category field if not exists
-- Run this migration to add category support

-- Add category column
ALTER TABLE faqs 
ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'General';

-- Add check constraint for categories
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

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);

-- Update existing FAQs to have 'General' category if null
UPDATE faqs SET category = 'General' WHERE category IS NULL;
