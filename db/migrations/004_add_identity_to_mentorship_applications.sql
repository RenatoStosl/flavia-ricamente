ALTER TABLE mentorship_applications
  ADD COLUMN IF NOT EXISTS full_name TEXT,
  ADD COLUMN IF NOT EXISTS email TEXT;

CREATE INDEX IF NOT EXISTS mentorship_applications_email_idx
  ON mentorship_applications (email);
