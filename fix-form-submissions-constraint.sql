-- Fix form_submissions to allow children_register form type
-- Run this in Supabase SQL Editor

-- Drop the old constraint
ALTER TABLE form_submissions 
DROP CONSTRAINT IF EXISTS form_submissions_form_type_check;

-- Add new constraint with children_register included
ALTER TABLE form_submissions 
ADD CONSTRAINT form_submissions_form_type_check 
CHECK (form_type IN (
  'baptism',
  'counselling', 
  'mentorship',
  'serve',
  'testimonies',
  'prayer',
  'children_register',
  'event_registration'
));
