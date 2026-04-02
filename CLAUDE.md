# OffMarket Phuket — Collaboration Protocol

## Project Overview
Next.js 15 (App Router) + Tailwind CSS 4 portal for distress/resale properties in Phuket.
Deployed on Vercel from `main` branch (auto-deploy on push).
Live: https://app-nine-bice.vercel.app

## Tech Stack
- Next.js 15, TypeScript, Tailwind CSS 4 (`@tailwindcss/postcss`)
- App dir: `app/src/`
- Data: `app/src/data/properties.json` (static JSON, no DB yet)
- i18n: file-based, `app/src/data/dictionaries/en.json` + `ru.json`
- Photos: `app/public/photos/{property_id}/`

## Git Workflow — IMPORTANT

### Branch Rules
- **NEVER push directly to `main`** — it auto-deploys to production
- Always create a feature branch: `feat/<short-description>` or `fix/<short-description>`
- Open a Pull Request to `main` and wait for review before merging
- Use descriptive commit messages in English

### Before Starting Work
```bash
git checkout main
git pull origin main
git checkout -b feat/my-feature
```

### Before Pushing
```bash
cd app && npm run build   # make sure the build passes
```

### Naming Conventions
- Branches: `feat/add-map`, `fix/photo-fallback`, `content/update-prices`
- Commits: `feat: add property map component`, `fix: handle missing photos gracefully`

## Project Structure
```
app/
  src/
    app/
      en/          # English pages
      ru/          # Russian pages (mirror of /en)
    components/    # Shared React components
    data/
      properties.json   # Property database (21 objects)
      types.ts          # TypeScript interfaces
      dictionaries/     # en.json, ru.json
    lib/
      i18n.ts           # Locale type, dictionary loader
      properties.ts     # Data access helpers, formatPrice
  public/
    photos/        # Property photos by ID
```

## Key Rules for AI Assistants (Claude Code)

1. **Always read the file before editing it** — never guess the contents
2. **Both locales must stay in sync** — if you change `/en/page.tsx`, change `/ru/page.tsx` too
3. **Both dictionaries must stay in sync** — if you add a key to `en.json`, add it to `ru.json` too
4. **Do not modify `properties.json` without explicit request** — it's the source of truth
5. **Do not delete or rename existing files** without discussing first
6. **Run `npm run build` before committing** to catch errors early
7. **Keep the Property interface (`types.ts`) and `properties.json` in sync** — changing one means updating the other

## Current Status
- MVP is live with 21 properties, catalog, filters, detail pages, about page
- Photos available for 6 properties (IDs: 1-5, 12), rest use emoji fallback
- Inquiry form is frontend-only (no backend yet)

## Pending Work
See PROJECT.md for full backlog. Key items:
- Hero image for homepage
- Photos for remaining 15 properties
- Supabase integration (inquiry form, broker auth)
- Map integration
