-- Supabase Migration Script for Eat Outside App
-- Run this in Supabase SQL Editor

-- Users table (normalized fingerprints)
CREATE TABLE users (
  id TEXT PRIMARY KEY,  -- SHA-256 hash of IP + User-Agent
  first_seen TIMESTAMPTZ DEFAULT NOW(),
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  record_count INTEGER DEFAULT 0
);

-- Meal records table (simplified)
CREATE TABLE meal_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_id TEXT NOT NULL,  -- Food slug (e.g., 'chicken-rice')
  user_id TEXT NOT NULL,  -- Foreign key to users.id
  created_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for meal_records
CREATE INDEX idx_meal_records_meal_id ON meal_records(meal_id);
CREATE INDEX idx_meal_records_created_at ON meal_records(created_at);
CREATE INDEX idx_meal_records_user_id ON meal_records(user_id);
CREATE INDEX idx_meal_records_meal_date ON meal_records(meal_id, created_at);

-- Indexes for users
CREATE INDEX idx_users_last_seen ON users(last_seen);
CREATE INDEX idx_users_record_count ON users(record_count);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_records ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public access
CREATE POLICY "Allow public read access" ON users
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert" ON users
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update" ON users
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow public read access" ON meal_records
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert" ON meal_records
  FOR INSERT
  WITH CHECK (true);

-- View for daily food counts
CREATE OR REPLACE VIEW daily_food_counts AS
SELECT
  created_at::date as date,
  meal_id,
  COUNT(*) as count
FROM meal_records
GROUP BY created_at::date, meal_id
ORDER BY date DESC, count DESC;

-- View for user statistics
CREATE OR REPLACE VIEW user_stats AS
SELECT
  u.id,
  u.first_seen,
  u.last_seen,
  u.record_count,
  COUNT(DISTINCT mr.meal_id) as unique_foods_tried
FROM users u
LEFT JOIN meal_records mr ON mr.user_id = u.id
GROUP BY u.id, u.first_seen, u.last_seen, u.record_count;

-- Function to increment user record count
CREATE OR REPLACE FUNCTION increment_user_record_count(user_id TEXT)
RETURNS void AS $$
BEGIN
  UPDATE users
  SET record_count = record_count + 1,
      last_seen = NOW()
  WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Comments for documentation
COMMENT ON TABLE users IS 'Tracks unique users (identified by fingerprint hash)';
COMMENT ON TABLE meal_records IS 'Records of user meal choices with timestamps';
COMMENT ON COLUMN users.id IS 'SHA-256 hash of IP + User-Agent for user identification';
COMMENT ON COLUMN users.first_seen IS 'First time this user recorded a meal';
COMMENT ON COLUMN users.last_seen IS 'Most recent time this user recorded a meal';
COMMENT ON COLUMN users.record_count IS 'Total number of meals recorded by this user';
COMMENT ON COLUMN meal_records.meal_id IS 'Food slug (e.g., "chicken-rice", "fish-soup")';
COMMENT ON COLUMN meal_records.user_id IS 'Foreign key reference to users table';
COMMENT ON COLUMN meal_records.created_at IS 'Timestamp of when the meal was recorded';
