-- Create FAQs table
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Check constraint for allowed categories
  CONSTRAINT faq_category_check CHECK (
    category IN ('Baptism', 'Counselling', 'Prayers', 'Serve', 'Mentorship', 'General')
  )
);

-- Create index for category filtering
CREATE INDEX idx_faqs_category ON faqs(category);
CREATE INDEX idx_faqs_order ON faqs(order_index);

-- Add updated_at trigger
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON faqs
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
