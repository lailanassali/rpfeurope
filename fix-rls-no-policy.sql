-- ==============================================================================
-- RESOLVE RLS ENABLED NO POLICY WARNINGS
-- ==============================================================================
-- This script adds explicit "Deny Access" policies to private tables.
-- While enabling RLS without policies implicitly denies access, adding an 
-- explicit policy using "USING (false)" clarifies intent and resolves 
-- "RLS Enabled No Policy" linter warnings.

-- 1. Users (Private)
DROP POLICY IF EXISTS "Deny public access" ON users;
CREATE POLICY "Deny public access" ON users FOR ALL USING (false);

-- 2. Event Registrations (Private)
DROP POLICY IF EXISTS "Deny public access" ON event_registrations;
CREATE POLICY "Deny public access" ON event_registrations FOR ALL USING (false);

-- 3. Form Submissions (Private)
DROP POLICY IF EXISTS "Deny public access" ON form_submissions;
CREATE POLICY "Deny public access" ON form_submissions FOR ALL USING (false);

-- 4. Email Config (Private)
DROP POLICY IF EXISTS "Deny public access" ON email_config;
CREATE POLICY "Deny public access" ON email_config FOR ALL USING (false);
