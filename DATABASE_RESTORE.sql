-- ============================================================================
-- EAT OUTSIDE - DATABASE RESTORATION SCRIPT
-- ============================================================================
-- Run this entire script in your Supabase SQL Editor
-- This will recreate all tables, indexes, policies, views, and add sample data
-- ============================================================================

-- ----------------------------------------------------------------------------
-- STEP 1: CREATE TABLES
-- ----------------------------------------------------------------------------

-- Users table (normalized fingerprints)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,  -- SHA-256 hash of IP + User-Agent
  first_seen TIMESTAMPTZ DEFAULT NOW(),
  last_seen TIMESTAMPTZ DEFAULT NOW(),
  record_count INTEGER DEFAULT 0
);

-- Meal records table
CREATE TABLE IF NOT EXISTS meal_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_id TEXT NOT NULL,  -- Food slug (e.g., 'chicken-rice')
  user_id TEXT NOT NULL,  -- Foreign key to users.id
  created_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ----------------------------------------------------------------------------
-- STEP 2: CREATE INDEXES
-- ----------------------------------------------------------------------------

-- Indexes for meal_records
CREATE INDEX IF NOT EXISTS idx_meal_records_meal_id ON meal_records(meal_id);
CREATE INDEX IF NOT EXISTS idx_meal_records_created_at ON meal_records(created_at);
CREATE INDEX IF NOT EXISTS idx_meal_records_user_id ON meal_records(user_id);
CREATE INDEX IF NOT EXISTS idx_meal_records_meal_date ON meal_records(meal_id, created_at);

-- Indexes for users
CREATE INDEX IF NOT EXISTS idx_users_last_seen ON users(last_seen);
CREATE INDEX IF NOT EXISTS idx_users_record_count ON users(record_count);

-- ----------------------------------------------------------------------------
-- STEP 3: ENABLE ROW LEVEL SECURITY
-- ----------------------------------------------------------------------------

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_records ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- STEP 4: CREATE RLS POLICIES
-- ----------------------------------------------------------------------------

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON users;
DROP POLICY IF EXISTS "Allow public insert" ON users;
DROP POLICY IF EXISTS "Allow public update" ON users;
DROP POLICY IF EXISTS "Allow public read access" ON meal_records;
DROP POLICY IF EXISTS "Allow public insert" ON meal_records;

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

-- ----------------------------------------------------------------------------
-- STEP 5: CREATE VIEWS
-- ----------------------------------------------------------------------------

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

-- ----------------------------------------------------------------------------
-- STEP 6: CREATE FUNCTIONS
-- ----------------------------------------------------------------------------

-- Function to increment user record count
CREATE OR REPLACE FUNCTION increment_user_record_count(user_id_param TEXT)
RETURNS void AS $$
BEGIN
  UPDATE users
  SET record_count = record_count + 1,
      last_seen = NOW()
  WHERE id = user_id_param;
END;
$$ LANGUAGE plpgsql;

-- ----------------------------------------------------------------------------
-- STEP 7: ADD DOCUMENTATION COMMENTS
-- ----------------------------------------------------------------------------

COMMENT ON TABLE users IS 'Tracks unique users (identified by fingerprint hash)';
COMMENT ON TABLE meal_records IS 'Records of user meal choices with timestamps';
COMMENT ON COLUMN users.id IS 'SHA-256 hash of IP + User-Agent for user identification';
COMMENT ON COLUMN users.first_seen IS 'First time this user recorded a meal';
COMMENT ON COLUMN users.last_seen IS 'Most recent time this user recorded a meal';
COMMENT ON COLUMN users.record_count IS 'Total number of meals recorded by this user';
COMMENT ON COLUMN meal_records.meal_id IS 'Food slug (e.g., "chicken-rice", "fish-soup")';
COMMENT ON COLUMN meal_records.user_id IS 'Foreign key reference to users table';
COMMENT ON COLUMN meal_records.created_at IS 'Timestamp of when the meal was recorded';

-- ============================================================================
-- STEP 8: ADD SAMPLE DATA (OPTIONAL - REMOVE IF YOU WANT FRESH START)
-- ============================================================================

-- Note: These are example meal records to demonstrate the structure.
-- In production, users will be created automatically when they record meals.

-- Sample users (fingerprint hashes - these are example values)
INSERT INTO users (id, first_seen, last_seen, record_count) VALUES
  ('a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6', NOW() - INTERVAL '30 days', NOW() - INTERVAL '2 days', 5),
  ('b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7', NOW() - INTERVAL '15 days', NOW() - INTERVAL '1 day', 3),
  ('c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8', NOW() - INTERVAL '7 days', NOW() - INTERVAL '5 hours', 8)
ON CONFLICT (id) DO NOTHING;

-- Sample meal records (using the food slugs from your app)
INSERT INTO meal_records (meal_id, user_id, created_at) VALUES
  -- User 1 records
  ('chicken-rice', 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6', NOW() - INTERVAL '30 days'),
  ('fish-soup', 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6', NOW() - INTERVAL '25 days'),
  ('yong-tau-foo', 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6', NOW() - INTERVAL '20 days'),
  ('ban-mian', 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6', NOW() - INTERVAL '15 days'),
  ('nasi-lemak', 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6', NOW() - INTERVAL '2 days'),

  -- User 2 records
  ('wanton-mee', 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7', NOW() - INTERVAL '15 days'),
  ('carrot-cake', 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7', NOW() - INTERVAL '10 days'),
  ('economical-rice', 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7', NOW() - INTERVAL '1 day'),

  -- User 3 records (more active user)
  ('laksa', 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8', NOW() - INTERVAL '7 days'),
  ('bak-chor-mee', 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8', NOW() - INTERVAL '6 days'),
  ('chicken-rice', 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8', NOW() - INTERVAL '5 days'),
  ('fish-soup', 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8', NOW() - INTERVAL '4 days'),
  ('yong-tau-foo', 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8', NOW() - INTERVAL '3 days'),
  ('wanton-mee', 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8', NOW() - INTERVAL '2 days'),
  ('nasi-lemak', 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8', NOW() - INTERVAL '1 day'),
  ('ban-mian', 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8', NOW() - INTERVAL '5 hours')
ON CONFLICT DO NOTHING;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Run these to verify everything is set up correctly:

-- Check tables exist
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- Check sample data
-- SELECT * FROM users;
-- SELECT * FROM meal_records ORDER BY created_at DESC;

-- Check views
-- SELECT * FROM daily_food_counts;
-- SELECT * FROM user_stats;

-- Check total counts
-- SELECT meal_id, COUNT(*) as total_records FROM meal_records GROUP BY meal_id ORDER BY total_records DESC;
