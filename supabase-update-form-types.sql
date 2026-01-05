-- Update the check constraint for form_submissions table to include 'give_life'
ALTER TABLE form_submissions DROP CONSTRAINT IF EXISTS form_submissions_form_type_check;

-- Add the new constraint with NOT VALID to ignore existing rows that might violate it
ALTER TABLE form_submissions
ADD CONSTRAINT form_submissions_form_type_check
CHECK (form_type IN ('baptism', 'counselling', 'mentorship', 'serve', 'testimonies', 'prayer', 'give_life'))
NOT VALID;
