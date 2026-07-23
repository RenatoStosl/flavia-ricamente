CREATE TABLE IF NOT EXISTS responses (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  score INTEGER NOT NULL,
  level TEXT NOT NULL,
  answers JSONB NOT NULL,
  duration_seconds INTEGER NOT NULL,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT
);

CREATE INDEX IF NOT EXISTS responses_created_at_idx ON responses (created_at DESC);
CREATE INDEX IF NOT EXISTS responses_level_idx ON responses (level);
