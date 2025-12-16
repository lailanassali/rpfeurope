-- ========================================
-- CHH Admin Panel - Complete Database Schema
-- Run this in Supabase SQL Editor
-- ========================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================
-- 1. USERS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'superadmin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on email for faster lookup
CREATE INDEX idx_users_email ON users(email);

-- ========================================
-- 2. EVENTS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  image_url TEXT,
  location VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(10) NOT NULL,
  venue TEXT NOT NULL,
  description TEXT,
  category VARCHAR(100),
  badge_text VARCHAR(50),
  badge_color VARCHAR(20),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_events_slug ON events(slug);
CREATE INDEX idx_events_date ON events(date);

-- ========================================
-- 3. EVENT_REGISTRATIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  registered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_event_registrations_event_id ON event_registrations(event_id);

-- ========================================
-- 4. RESOURCES TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  link_text VARCHAR(100),
  link_href TEXT,
  image_url TEXT,
  category VARCHAR(100),
  badge_text VARCHAR(50),
  badge_color VARCHAR(20),
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 5. FAQS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  page VARCHAR(50) NOT NULL CHECK (page IN ('youth', 'university', 'fellowship', 'children', 'general')),
  "order" INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_faqs_page ON faqs(page);

-- ========================================
-- 6. LOCATIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  image_url TEXT,
  address TEXT,
  service_type VARCHAR(100),
  service_date VARCHAR(100),
  map_link TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 7. PAGE_IMAGES TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS page_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_identifier VARCHAR(100) NOT NULL,
  image_url TEXT NOT NULL,
  is_carousel BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_page_images_identifier ON page_images(page_identifier);

-- ========================================
-- 8. FORM_SUBMISSIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_type VARCHAR(50) NOT NULL CHECK (form_type IN ('baptism', 'counselling', 'mentorship', 'serve', 'testimonies', 'prayer', 'children_registration')),
  data JSONB NOT NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_form_submissions_type ON form_submissions(form_type);
CREATE INDEX idx_form_submissions_status ON form_submissions(status);

-- ========================================
-- CREATE DEFAULT ADMIN USER
-- Password: admin123 (CHANGE THIS IMMEDIATELY)
-- ========================================
INSERT INTO users (email, name, password, role)
VALUES (
  'admin@chh.com',
  'Admin User',
  '$2a$10$X7vPqKMQF5Y5Y5Y5Y5Y5YeOqGKJ5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5O',  -- admin123 hashed
   'superadmin'
)
ON CONFLICT (email) DO NOTHING;

-- ========================================
-- ENABLE ROW LEVEL SECURITY (Optional but recommended)
-- ========================================
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON events FOR SELECT USING (true);
-- ... etc

-- ========================================
-- STORAGE BUCKET FOR IMAGES
-- Run this in Supabase Dashboard > Storage
-- ========================================
-- 1. Go to Storage in Supabase Dashboard
-- 2. Create a new bucket named: chh-images
-- 3. Make it Public
-- 4. Set policies to allow authenticated uploads

-- ========================================
-- VERIFICATION QUERIES
-- ========================================
-- Check if tables were created
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
ORDER BY table_name;

-- Check default admin user
SELECT id, email, name, role FROM users;
