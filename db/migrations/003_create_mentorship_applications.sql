CREATE TABLE IF NOT EXISTS mentorship_applications (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  answers JSONB NOT NULL,
  duration_seconds INTEGER NOT NULL,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);

CREATE INDEX IF NOT EXISTS mentorship_applications_created_at_idx
  ON mentorship_applications (created_at DESC);
