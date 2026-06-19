# Tasks To Do

This document tracks actionable improvements and fixes for the eatoutside project, organized by priority.

---

## 🔴 CRITICAL (Security)

### 1. Update Dependencies for Security Fixes
**Status:** ⏳ Pending  
**Impact:** Fixes 33 vulnerabilities (2 critical, 14 high)

```bash
npm update nuxt @nuxtjs/i18n @nuxt/icon @supabase/supabase-js
npm audit fix
```

**Vulnerabilities addressed:**
- Critical: `shell-quote`, `simple-git` command injection
- High: `h3` path traversal, `nuxt` multiple issues, `vite` path traversal

| Package | Current | Latest | Type |
|---------|---------|--------|------|
| nuxt | 4.3.0 | 4.4.8 | Patch (security fixes) |
| @nuxtjs/i18n | 10.2.1 | 10.4.0 | Minor |
| @supabase/supabase-js | 2.91.1 | 2.108.2 | Minor |
| @nuxt/icon | 2.2.1 | 2.2.3 | Minor |

### 2. Add Security Headers
**Status:** ⏳ Pending  
**Impact:** Prevents XSS, clickjacking, MIME sniffing attacks

Install `nuxt-security` module:
```bash
npm install nuxt-security
```

Add to `nuxt.config.ts`:
```typescript
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n', 'nuxt-security'],
  // Security headers will be auto-configured
})
```

**Missing headers to add:**
- Content-Security-Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy

### 3. Add Server-Side Input Validation
**Status:** ⏳ Pending  
**Files:** `/server/api/food/[slug]/count.get.ts`, `/server/api/food/[slug]/record.post.ts`

Add validation for the `slug` parameter:
```typescript
const slug = getRouterParam(event, 'slug')
if (!slug || !/^[a-z0-9-]+$/.test(slug)) {
  throw createError({ statusCode: 400, message: 'Invalid slug' })
}
```

### 4. Add Rate Limiting
**Status:** ⏳ Pending  
**Impact:** Prevents DoS and automated bot attacks

Implement rate limiting middleware (e.g., 10 requests per minute per IP) on API endpoints.

### 5. Add CSRF Protection
**Status:** ⏳ Pending  
**File:** `/server/api/food/[slug]/record.post.ts`

Implement CSRF tokens for the POST endpoint that modifies database records.

### 6. Add Salt to Fingerprint Hash
**Status:** ⏳ Pending  
**File:** `/server/utils/fingerprint.ts`

Current implementation uses SHA-256 hash of IP + User-Agent without salt. Add server-side secret salt to prevent rainbow table attacks.

---

## 🟠 HIGH PRIORITY

### 7. Remove Legacy Nuxt 3 Compatibility Flag
**Status:** ⏳ Pending  
**File:** `nuxt.config.ts` (line 8)

Remove this deprecated option:
```typescript
// DELETE THIS:
future: { compatibilityVersion: 4 }
```

### 8. Remove Redundant Dependencies
**Status:** ⏳ Pending  
**File:** `package.json`

These packages are already included transitively by Nuxt:
```json
// REMOVE FROM package.json:
- "vue": "^3.5.13",
- "vue-router": "^4.5.0"
```

### 9. Remove Debug Console Statements
**Status:** ⏳ Pending  
**Files:** 
- `/app/composables/useShare.ts` (lines 69, 73, 80)
- `/app/utils/api.ts` (line 39)

Remove `console.log` statements from production code. Keep `console.error` for now or replace with proper logging library.

### 10. Move Hardcoded Values to Config
**Status:** ⏳ Pending

**External URLs:**
- `useShare.ts:16` - Hardcoded `'https://eatoutside.sg'`
- `PageFooter.vue:8-9` - Hardcoded Buy Me A Coffee URLs

**Locale/Timezone:**
- `api.ts:18` - Hardcoded `'en-CA'` locale and `'Asia/Singapore'` timezone
- `LanguageToggle.vue:5,7` - Hardcoded locales array

Move these to runtime config in `nuxt.config.ts`.

### 11. Remove Unused Variable
**Status:** ⏳ Pending  
**File:** `/app/components/FoodDetail.vue` (line 14)

Remove unused `foodTip` computed property.

---

## 🟡 MEDIUM PRIORITY

### 12. Add Rendering Strategy
**Status:** ⏳ Pending  
**File:** `nuxt.config.ts`

Add `routeRules` for better performance:
```typescript
routeRules: {
  '/': { prerender: true },
  '/**': { isr: 60 } // or static for fully static
}
```

### 13. Add Viewport Meta Tag
**Status:** ⏳ Pending  
**File:** `nuxt.config.ts`

Add missing viewport tag for mobile responsiveness:
```typescript
{ name: 'viewport', content: 'width=device-width, initial-scale=1' }
```

### 14. Add Open Graph Tags
**Status:** ⏳ Pending  
**File:** `nuxt.config.ts`

Add OG meta tags for better social sharing.

### 15. Fix CSS Inconsistencies
**Status:** ⏳ Pending  
**File:** `/app/components/OptionCard.vue`

Replace hardcoded CSS values with CSS variables:
- `rgb(8, 177, 60)` → `var(--color-primary)`
- `rgb(96, 135, 212)` → use CSS variable
- Hardcoded spacing → `var(--spacing-md)`, etc.
- Hardcoded font sizes → `var(--font-size-base)`, etc.

### 16. Standardize Error Handling
**Status:** ⏳ Pending

Current codebase has inconsistent error handling patterns:
- `FoodDetail.vue`: Catches, logs, sets default
- `ShareButton.vue`: Catches, only logs
- `api.ts`: Returns default response object

Choose one consistent pattern across all files.

---

## 🟢 LOW PRIORITY

### 17. Consider Adding Image Optimization
**Status:** ⏳ Pending  
**Impact:** Better performance for food photos

```bash
npm install @nuxt/image
```

Add to `nuxt.config.ts`:
```typescript
modules: ['@nuxt/image']
```

### 18. Standardize Ref Type Annotations
**Status:** ⏳ Pending

Mix of typed and untyped refs across components:
- `FoodDetail.vue`: `ref<number>(0)`, `ref<boolean>(true)`
- `ShareButton.vue`: `ref(false)`

Choose consistent approach (typed vs inferred).

### 19. Review sg-SG Locale
**Status:** ⏳ Pending  
**Note:** The sg-SG locale was added in commit c7195f4 but removed in commit b08b632

If restoring, update to match current schema:
- Add missing `ui.portionTip` and `ui.sauceTip`
- Update option keys to: `safer`, `sometimes`, `better-not`
- Add missing `foods.*.reasons` objects

### 20. Fix i18n Emoji Inconsistency
**Status:** ⏳ Pending  
**Files:** `en-GB.json`, `zh-CN.json`

Chinese version has emojis (👍⚠️🚫) in `ui.options` that English lacks. Decide whether to add to English or remove from Chinese.

### 21. Add Netlify Node Version
**Status:** ⏳ Pending  
**File:** `netlify.toml`

Ensure correct Node.js version during builds:
```toml
[build.environment]
  NODE_VERSION = "20"
```

---

## ✅ COMPLETED

- [x] Supabase client refactoring (commit d80daf2)
- [x] Add "Buy Me A Coffee" link to PageFooter (commit a35214c)
- [x] Enhance layout with site title (commit c7195f4)
- [x] Database restoration script created (DATABASE_RESTORE.sql)

---

## 📊 Progress Tracking

- **Total Tasks:** 21
- **Completed:** 4
- **In Progress:** 0
- **Pending:** 17

**Priority Breakdown:**
- Critical: 6 remaining
- High: 5 remaining
- Medium: 6 remaining
- Low: 5 remaining

---

*Last updated: 2025-06-17*
