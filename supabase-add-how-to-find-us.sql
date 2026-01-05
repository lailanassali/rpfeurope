-- Add how_to_find_us field to locations table for CHH on Campus locations
ALTER TABLE locations ADD COLUMN IF NOT EXISTS how_to_find_us text;
