-- Add latitude and longitude columns to locations table
ALTER TABLE locations ADD COLUMN IF NOT EXISTS latitude float8;
ALTER TABLE locations ADD COLUMN IF NOT EXISTS longitude float8;
