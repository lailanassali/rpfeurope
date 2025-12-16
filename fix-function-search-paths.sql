-- ==============================================================================
-- FIX FUNCTION SEARCH PATH MUTABLE WARNINGS
-- ==============================================================================
-- This script secures functions by setting a fixed search_path, preventing 
-- malicious search_path manipulation.

-- 1. update_updated_at_column
ALTER FUNCTION update_updated_at_column() SET search_path = '';

-- 2. update_users_updated_at_column
ALTER FUNCTION update_users_updated_at_column() SET search_path = '';

-- 3. update_email_config_updated_at_column
ALTER FUNCTION update_email_config_updated_at_column() SET search_path = '';
