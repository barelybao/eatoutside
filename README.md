# Eat Outside 🍜

A Singapore hawker food guide that helps people make healthier choices with ease. Built with Nuxt 4, Vue 3, and Supabase.

## Features

- **Bilingual**: English and Chinese (Simplified) support
- **Health-Conscious**: Three-tier options (Light, Caution, Avoid) for each dish
- **Social Tracking**: See how many people ate each dish today
- **Modern Stack**: Built with Nuxt 4, Vue 3, TypeScript, and Supabase
- **Responsive**: Works great on mobile and desktop
- **Interactive**: Select your preferred option and track your choices

## Tech Stack

- **Framework**: [Nuxt 4](https://nuxt.com) with Vue 3.5+
- **Language**: TypeScript (strict mode)
- **Database**: [Supabase](https://supabase.com) (PostgreSQL)
- **Styling**: CSS with CSS variables
- **Deployment**: Netlify (serverless functions)
- **i18n**: @nuxtjs/i18n for internationalization

## Project Structure

```
eatoutside/
├── app/
│   ├── components/       # Vue components
│   │   ├── FoodDetail.vue
│   │   ├── FoodCard.vue
│   │   ├── OptionCard.vue
│   │   └── ...
│   ├── composables/      # Shared logic
│   │   └── useFood.ts
│   ├── data/            # Static data
│   │   └── foods.ts
│   ├── pages/           # File-based routing
│   ├── types/           # TypeScript definitions
│   ├── utils/           # Utility functions
│   └── supabase.ts      # Supabase client
├── server/
│   ├── api/             # Server API routes
│   │   └── food/[slug]/
│   └── utils/           # Server utilities
├── public/
│   └── img/             # Images
├── supabase/
│   └── migration.sql    # Database migration
├── .env.example         # Environment variables template
├── netlify.toml         # Netlify configuration
└── SUPABASE_SETUP.md    # Setup guide
```

## Quick Start

### Prerequisites

- Node.js 18+ installed
- Supabase account (free tier works!)
- Netlify account (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd eatoutside
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Follow the detailed guide in [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
   - Create a Supabase project
   - Run the SQL migration from `supabase/migration.sql`
   - Get your Supabase credentials

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Supabase credentials:
   ```env
   NUXT_SUPABASE_URL=https://your-project.supabase.co
   NUXT_SUPABASE_ANON_KEY=your-anon-key
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

   Visit http://localhost:3000

## Deployment

### Deploy to Netlify

1. **Connect your repository to Netlify**
   - Go to Netlify dashboard
   - Click "Add new site" → "Import an existing project"
   - Select your repository

2. **Configure build settings**
   - **Build command**: `npm run build`
   - **Publish directory**: `.output/public`

3. **Add environment variables**
   - `NUXT_SUPABASE_URL` = your Supabase project URL
   - `NUXT_SUPABASE_ANON_KEY` = your Supabase anon key

4. **Deploy!**

Netlify will automatically deploy when you push to your main branch.

For detailed deployment instructions, see [SUPABASE_SETUP.md](SUPABASE_SETUP.md).

## API Endpoints

### GET `/api/food/:slug/count`
Get the count of how many people ate this food today.

**Response:**
```json
{
  "count": 12,
  "date": "2026-01-25"
}
```

### POST `/api/food/:slug/record`
Record that you ate this food with a specific option level.

**Request:**
```json
{
  "optionLevel": "light" | "caution" | "avoid"
}
```

**Response:**
```json
{
  "count": 13,
  "date": "2026-01-25",
  "alreadyRecorded": false
}
```

## Database Schema

```sql
meal_records
├── id (UUID, primary key)
├── meal_id (UUID, references food.id)
├── option_level (text: 'light' | 'caution' | 'avoid')
├── created_at (timestamp with timezone)
├── date (date, for easy daily queries)
└── user_fingerprint (text, hashed IP + User-Agent)
```

## Features in Detail

### Health Options
Each food item has three options:
- **Light** (🟢): The healthiest choice
- **Caution** (🟡): Moderate choice
- **Avoid** (🔴): Least healthy option

### Social Counter
See how many people ate each dish today:
- "Be the first to eat this today"
- "X people ate this today"

### Option Selection
Users must select their chosen option before recording:
1. Click on an option card (Light/Caution/Avoid)
2. The card highlights to show selection
3. Click "I ate this!" to record
4. Counter updates with new count

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For setup issues, see [SUPABASE_SETUP.md](SUPABASE_SETUP.md).

For bugs and feature requests, please [open an issue](https://github.com/yourusername/eatoutside/issues).

## Acknowledgments

- Built with [Nuxt](https://nuxt.com)
- Database powered by [Supabase](https://supabase.com)
- Hosted on [Netlify](https://netlify.com)
