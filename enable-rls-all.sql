-- ==============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
-- ==============================================================================
-- This script secures all tables by enabling RLS.
-- 1. Public Content Tables: RLS enabled + Policy to allow public SELECT access.
-- 2. Private/Admin Tables: RLS enabled + No policies (Deny All by default).
--    (The admin app uses the service_role key to bypass RLS for these tables)

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
-- No policies: Deny all public access. Next.js API uses service_role.

-- 9. Form Submissions (Private - PII)
ALTER TABLE IF EXISTS form_submissions ENABLE ROW LEVEL SECURITY;
-- No policies: Deny all public access. Next.js API uses service_role.

-- 10. Users (Private - Auth/Admin)
ALTER TABLE IF EXISTS users ENABLE ROW LEVEL SECURITY;
-- No policies: Deny all public access. Next.js API uses service_role.

-- 11. Email Config (Private - Config)
ALTER TABLE IF EXISTS email_config ENABLE ROW LEVEL SECURITY;
-- No policies: Deny all public access. Next.js API uses service_role.
