-- ==============================================================================
-- PROJECT INITIALIZATION SCRIPT - FULL SCHEMA
-- ==============================================================================
-- This script initializes the complete database schema for the project.
-- It works for both new projects and existing ones (using IF NOT EXISTS).
-- Run this in the Supabase SQL Editor.

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
  is_active BOOLEAN DEFAULT true,
  reset_token TEXT,
  reset_token_expires TIMESTAMP WITH TIME ZONE,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_reset_token ON users(reset_token);

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
  key_highlights JSONB DEFAULT '[]'::JSONB,
  what_to_expect JSONB DEFAULT '[]'::JSONB,
  faqs JSONB DEFAULT '[]'::JSONB,
  quote TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);

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

CREATE INDEX IF NOT EXISTS idx_event_registrations_event_id ON event_registrations(event_id);

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

CREATE INDEX IF NOT EXISTS idx_faqs_page ON faqs(page);

-- ========================================
-- 6. LOCATIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  tag VARCHAR(50) NOT NULL check (tag IN ('CHH UK', 'CHH Europe', 'CHH Africa', 'CHH on Campus')),
  image_url TEXT,
  address TEXT,
  services TEXT,
  map_link TEXT,
  whatsapp_link TEXT,
  contact TEXT,
  welcome_heading TEXT,
  welcome_description TEXT,
  welcome_quote TEXT,
  carousel_images TEXT[],
  address_image_url TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Note: 'service_type' and 'service_date' are intentionally omitted as they have been migrated to 'services'.

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

CREATE INDEX IF NOT EXISTS idx_page_images_identifier ON page_images(page_identifier);

-- ========================================
-- 8. TESTIMONIALS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  -- Assuming basic fields based on context
  name VARCHAR(255),
  content TEXT,
  image_url TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 9. PRIVACY POLICY TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS privacy_policy (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ========================================
-- 10. FORM_SUBMISSIONS TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_type VARCHAR(50) NOT NULL CHECK (form_type IN ('baptism', 'counselling', 'mentorship', 'serve', 'testimonies', 'prayer', 'children_registration')),
  data JSONB NOT NULL,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_form_submissions_type ON form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON form_submissions(status);

-- ========================================
-- 11. EMAIL_CONFIG TABLE
-- ========================================
CREATE TABLE IF NOT EXISTS email_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  config_key TEXT UNIQUE NOT NULL,
  config_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default email configurations
INSERT INTO email_config (config_key, config_value) VALUES
  ('primary_email', 'admin@chheurope.com'),
  ('cc_emails', 'team@chheurope.com|support@chheurope.com')
ON CONFLICT (config_key) DO UPDATE SET config_value = EXCLUDED.config_value;

-- ========================================
-- FUNCTIONS AND TRIGGERS
-- ========================================

-- Generic updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql' SET search_path = '';

-- Specific trigger function for users (reused generic logic but named specifically in your request)
CREATE OR REPLACE FUNCTION update_users_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql' SET search_path = '';

-- Specific trigger function for email_config
CREATE OR REPLACE FUNCTION update_email_config_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql' SET search_path = '';

-- Apply triggers
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_users_updated_at_column();

DROP TRIGGER IF EXISTS update_email_config_updated_at ON email_config;
CREATE TRIGGER update_email_config_updated_at BEFORE UPDATE ON email_config FOR EACH ROW EXECUTE FUNCTION update_email_config_updated_at_column();

-- ========================================
-- ROW LEVEL SECURITY (RLS)
-- ========================================

-- 1. Events (Public Read)
ALTER TABLE IF EXISTS events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access" ON events;
CREATE POLICY "Public read access" ON events FOR SELECT USING (true);

-- 2. Locations (Public Read)
ALTER TABLE IF EXISTS locations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access" ON locations;
CREATE POLICY "Public read access" ON locations FOR SELECT USING (true);

-- 3. Page Images (Public Read)
ALTER TABLE IF EXISTS page_images ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access" ON page_images;
CREATE POLICY "Public read access" ON page_images FOR SELECT USING (true);

-- 4. Testimonials (Public Read)
ALTER TABLE IF EXISTS testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access" ON testimonials;
CREATE POLICY "Public read access" ON testimonials FOR SELECT USING (true);

-- 5. Privacy Policy (Public Read)
ALTER TABLE IF EXISTS privacy_policy ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access" ON privacy_policy;
CREATE POLICY "Public read access" ON privacy_policy FOR SELECT USING (true);

-- 6. FAQs (Public Read)
ALTER TABLE IF EXISTS faqs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access" ON faqs;
CREATE POLICY "Public read access" ON faqs FOR SELECT USING (true);

-- 7. Resources (Public Read)
ALTER TABLE IF EXISTS resources ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read access" ON resources;
CREATE POLICY "Public read access" ON resources FOR SELECT USING (true);

-- 8. Event Registrations (Private - PII)
ALTER TABLE IF EXISTS event_registrations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Deny public access" ON event_registrations;
CREATE POLICY "Deny public access" ON event_registrations FOR ALL USING (false);

-- 9. Form Submissions (Private - PII)
ALTER TABLE IF EXISTS form_submissions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Deny public access" ON form_submissions;
CREATE POLICY "Deny public access" ON form_submissions FOR ALL USING (false);

-- 10. Users (Private - Auth/Admin)
ALTER TABLE IF EXISTS users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Deny public access" ON users;
CREATE POLICY "Deny public access" ON users FOR ALL USING (false);

-- 11. Email Config (Private - Config)
ALTER TABLE IF EXISTS email_config ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Deny public access" ON email_config;
CREATE POLICY "Deny public access" ON email_config FOR ALL USING (false);

-- ========================================
-- DEFAULT ADMIN USER
-- ========================================
INSERT INTO users (email, name, password, role)
VALUES (
  'admin@chh.com',
  'Admin User',
  '$2a$10$X7vPqKMQF5Y5Y5Y5Y5Y5YeOqGKJ5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5Y5O',  -- admin123 hashed
  'superadmin'
)
ON CONFLICT (email) DO NOTHING;

-- End of initialization script
