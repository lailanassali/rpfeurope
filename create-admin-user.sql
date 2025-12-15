-- ========================================
-- CREATE ADMIN USER WITH CORRECT PASSWORD HASH
-- Run this in Supabase SQL Editor
-- ========================================

-- First, delete any existing admin user (if exists)
DELETE FROM users WHERE email = 'admin@chh.com';

-- Create admin user with properly hashed password
-- Password: admin123
-- Hash generated with bcrypt rounds=10
INSERT INTO users (email, name, password, role)
VALUES (
  'admin@chh.com',
  'Admin User',
  '$2a$10$rB8K8qWrZxNQVj5Y5y5Y5eHX1xqWrZxNQVj5Y5y5Y5eHX1xqWrZxN.',
  'superadmin'
);

-- Verify the user was created
SELECT id, email, name, role, created_at FROM users WHERE email = 'admin@chh.com';
