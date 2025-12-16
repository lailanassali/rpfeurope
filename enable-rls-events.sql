-- Enable RLS on events table
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Create policy to allow read access for all users
DROP POLICY IF EXISTS "Enable read access for all users" ON events;

CREATE POLICY "Enable read access for all users" 
ON events FOR SELECT 
USING (true);

-- Note: No policies are needed for INSERT/UPDATE/DELETE for the 'anon' role
-- as enabling RLS implicitly denies these actions if no policy allows them.
-- The admin application uses the service role key which bypasses RLS.
