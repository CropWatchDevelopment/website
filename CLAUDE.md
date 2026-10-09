# CropWatch website (cropwatch.io) — project notes

US / global English marketing site (SvelteKit 5). This branch line
(develop -> master) deploys to cropwatch.io; the Japanese site lives on the
`Japan-website` branch (cropwatch.co.jp). Copy uses plain hyphens, no em/en dashes.

## SEO artifacts must stay in sync (no stale SEO)
Any content or route change must update, **in the same commit**:
- `src/lib/seo/pages.ts`: the page's `summary` (+ set/bump `lastmod`). This one
  registry feeds `/sitemap.xml` and `/llms.txt`. New public page = new entry
  (`src/lib/seo/pages.test.ts` fails otherwise).
- The page's `<title>` / meta description (keep `summary` in line with it).
- `src/lib/seo/schema.ts` JSON-LD if prices, products, org facts or FAQ changed
  (`schema.ts` is byte-identical across both branches).
- News: `static/news/*.json`.
- `src/lib/seo/alternates.ts` PAIRS for a new cross-site page (identical on
  both deploy branches).
Then run `npx vitest --run --project server`. A PostToolUse hook
(`.claude/hooks/seo-reminder.sh`) prints this reminder when content files change.

## Analytics
`src/lib/components/Analytics.svelte` (shared with Japan-website) owns GA4:
lazy gtag load, one `page_view` per navigation, `ai_referral` + `ai_source`
user property for ChatGPT/Perplexity/etc. visits (`src/lib/analytics/ai-referrer.ts`),
`contact_click` (tel/mailto/LINE), `generate_lead` (contact form success).
Don't add gtag calls elsewhere; use `trackEvent` from `$lib/analytics/gtag`.
IndexNow is pinged from `.github/workflows/deploy.yml` after each prod deploy
(key file `static/<key>.txt`).
