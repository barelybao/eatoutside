# Supabase Setup Guide

This guide will help you set up Supabase and deploy your Eat Outside app to Netlify.

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Choose a name (e.g., "eat-outside")
5. Choose a database password (save it securely!)
6. Select the region closest to Singapore (recommended: "Southeast Asia (Singapore)")
7. Click "Create new project" and wait for it to be ready (2-3 minutes)

## Step 2: Create Database Table

1. In your Supabase project dashboard, go to the **SQL Editor** (left sidebar)
2. Click "New Query"
3. Paste and run this SQL:

```sql
CREATE TABLE meal_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  meal_id UUID NOT NULL,
  option_level TEXT NOT NULL CHECK (option_level IN ('light', 'caution', 'avoid')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  date DATE DEFAULT CURRENT_DATE,
  user_fingerprint TEXT
);

-- Create indexes for better performance
CREATE INDEX idx_meal_records_meal_id ON meal_records(meal_id);
CREATE INDEX idx_meal_records_date ON meal_records(date);
CREATE INDEX idx_meal_records_option_level ON meal_records(option_level);

-- Enable Row Level Security (optional, for future auth)
ALTER TABLE meal_records ENABLE ROW LEVEL SECURITY;

-- Add a policy to allow public access (for now, without auth)
CREATE POLICY "Allow public access" ON meal_records
  FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert" ON meal_records
  FOR INSERT
  WITH CHECK (true);
```

4. Verify the table was created by checking the **Table Editor** in the left sidebar

## Step 3: Get Supabase Credentials

1. In Supabase dashboard, go to **Project Settings** (gear icon) → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (long string, starts with `eyJ...`)

## Step 4: Set Up Environment Variables

### Local Development

1. Create a `.env` file in your project root:
   ```bash
   touch .env
   ```

2. Add your Supabase credentials:
   ```env
   NUXT_SUPABASE_URL=your-project-url-here
   NUXT_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. Replace `your-project-url-here` and `your-anon-key-here` with actual values from Step 3

4. Restart your dev server:
   ```bash
   npm run dev
   ```

### Netlify Deployment

1. Go to your Netlify dashboard
2. Select your site (or create a new one)
3. Go to **Site settings** → **Environment variables**
4. Add these environment variables:
   - `NUXT_SUPABASE_URL` = your Supabase project URL
   - `NUXT_SUPABASE_ANON_KEY` = your Supabase anon key

5. **Redeploy your site** after adding environment variables:
   - Go to **Deploys** → **Trigger deploy** → **Deploy site**

## Step 5: Test the Integration

1. Visit your app locally (http://localhost:3000) or on Netlify
2. Navigate to any food detail page
3. Click on an option card (Light/Caution/Avoid) - it should highlight
4. Click "I ate this!" button
5. Verify the counter increments

### Verify in Supabase Dashboard

1. Go to **Table Editor** → **meal_records**
2. You should see a new row with:
   - `meal_id`: UUID of the food
   - `option_level`: 'light', 'caution', or 'avoid'
   - `created_at`: timestamp
   - `date`: today's date
   - `user_fingerprint`: hash for duplicate prevention

## Step 6: Deploy to Netlify

If you haven't already connected your repository to Netlify:

1. Go to [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git provider (GitHub, GitLab, or Bitbucket)
4. Select your `eatoutside` repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.output/public`
6. Add environment variables (see Step 4 above)
7. Click "Deploy site"

Your site will automatically deploy whenever you push to your main branch!

## Troubleshooting

### Error: "Supabase URL is not defined"
- Make sure you've added environment variables
- Restart your dev server after adding `.env`
- On Netlify, redeploy after adding environment variables

### Error: "Database error" or "Failed to save record"
- Check that you created the `meal_records` table in Supabase
- Verify your Supabase URL and anon key are correct
- Check the Supabase logs in your dashboard

### Counter doesn't increment
- Open browser DevTools (F12) → Console tab for errors
- Check Network tab to see if API calls are failing
- Verify you selected an option before clicking "I ate this!"

### Option cards not clickable
- Make sure you've updated the OptionCard component
- Check for JavaScript errors in the console
- Clear your browser cache and reload

## Next Steps

Once everything is working:

1. **Monitor your Supabase dashboard** to see what people are eating
2. **Consider adding user authentication** for better tracking
3. **Add analytics features** (most popular foods, trends over time)
4. **Set up database backups** in Supabase settings

## Database Schema Reference

```sql
meal_records
├── id (UUID, primary key)
├── meal_id (UUID, references food.id)
├── option_level (text: 'light' | 'caution' | 'avoid')
├── created_at (timestamp with timezone)
├── date (date, for easy daily queries)
└── user_fingerprint (text, hashed IP + User-Agent)
```

## API Endpoints

- `GET /api/food/:slug/count` - Get count of how many people ate this food today
- `POST /api/food/:slug/record` - Record that you ate this food (requires `optionLevel` in body)

## Environment Variables

```env
NUXT_SUPABASE_URL=https://your-project.supabase.co
NUXT_SUPABASE_ANON_KEY=your-anon-key
```

---

Need help? Check the [Supabase Documentation](https://supabase.com/docs) or [Nuxt Documentation](https://nuxt.com).
