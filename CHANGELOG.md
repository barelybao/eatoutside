# Changelog

## [2.0.0] - 2026-01-25

### Added
- **Nuxt 4 framework** with Vue 3.5+ and Nitro server
- **TypeScript** with strict mode for type safety
- **Component-based architecture** with reusable Vue components
- **File-based routing** - pages automatically generate routes
- **Auto-imports** for components and composables
- **CSS variables** for consistent design tokens
- **Layouts system** - separate layouts for home (yellow) and detail pages (white)

### Changed
- Migrated from static HTML/CSS/JS to Nuxt 4
- Reorganized project structure:
  - `app/components/` - Vue components
  - `app/pages/` - route pages
  - `app/composables/` - shared logic
  - `app/layouts/` - page layouts
  - `public/img/` - static assets
- Moved food data to typed TypeScript module
- Images now served from `public/` directory

### Removed
- Static HTML files (`index.html`, `about.html`, `disclaimer.html`)
- Original JPG images (keeping optimized WebP only)
- Inline CSS and JavaScript

### Technical Details
- **Routes**: `/`, `/food/:id`, `/about`, `/disclaimer`
- **Components**: BackButton, FoodCard, FoodDetail, FoodList, OptionCard, PageFooter
- **Composable**: `useFood()` for food data access and utilities
- **Types**: `Food`, `FoodOptions`, `OptionLevel`, `OptionConfig`
