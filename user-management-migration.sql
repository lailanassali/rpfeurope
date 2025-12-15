-- User Management & Email System Database Migration
-- Run this in Supabase SQL Editor

-- 1. Update users table with management fields
ALTER TABLE users 
ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS reset_token TEXT,
ADD COLUMN IF NOT EXISTS reset_token_expires TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Create index for reset tokens
CREATE INDEX IF NOT EXISTS idx_users_reset_token ON users(reset_token);

-- Create updated_at trigger function if not exists
CREATE OR REPLACE FUNCTION update_users_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to users table
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users
  FOR EACH ROW 
  EXECUTE FUNCTION update_users_updated_at_column();

-- 2. Create email_config table
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

-- Create trigger for email_config updated_at
CREATE OR REPLACE FUNCTION update_email_config_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_email_config_updated_at ON email_config;
CREATE TRIGGER update_email_config_updated_at 
  BEFORE UPDATE ON email_config
  FOR EACH ROW 
  EXECUTE FUNCTION update_email_config_updated_at_column();
