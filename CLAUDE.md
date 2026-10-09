# CropWatch 日本 website — project notes

Japanese-only marketing site (SvelteKit 5, runes). Deploys to cropwatch.co.jp.
Design tokens live in `src/lib/styles/cropwatch-tokens.css`; shared layout in
`cropwatch-site.css`; header/footer in `cropwatch-chrome.css`.

## Responsive requirement (MUST hold)

The site MUST look good and have **no horizontal scroll** at every one of these
targets. Verify all of them before considering any UI change done:

| Target | Width | Notes |
|---|---|---|
| Phone (iPhone X) | 375 px | single column; burger nav; no utility top bar |
| Tablet portrait (iPad Air) | ~820 px | burger nav; 2-col grids |
| Tablet landscape / full tablet | ~1024–1180 px | full desktop nav |
| Desktop | ≥1140 px | content max-width 1140 px (`--jp-maxw`) |

Quick check: at 375 px on **every** route, `document.documentElement.scrollWidth`
must be `<= window.innerWidth` (no page-level horizontal scroll).

### Standard breakpoints (`cropwatch-chrome.css` / `cropwatch-site.css`)
- **1140 px** — header switches to the burger + hides the utility top bar
  (the full 7-item nav only fits at/above the 1140 px design width).
- **980 px** — grids drop to 2-col (`.boxgrid--3/4`, `.stats`, footer, etc.).
- **600 px** — phone: single column, `.wrap` gutter 18 px, header demo CTA
  hidden (it's in the burger).

Reuse these when possible. A few components intentionally use their own and
that's fine: home `820` (cards vs accordion), contact `880`, testimonials
`1000/760`, replacement-sensors picker `720`, help `600/900/1200`. The home accordion also
uses `@media (hover: none)` for tap-to-expand on touch.

Touch devices can't hover: hover-only UI must have a tap/`@media (hover: none)`
path (e.g. the home accordion uses tap-to-expand on touch).

## Load-bearing features — do NOT break when refactoring
- Home slanted accordion — `src/routes/+page.svelte` (hover on desktop,
  tap-to-expand on touch, `≤820px` stacked-card fallback).
- Sensor picker tabs + spec panel on `replacement-sensors`
  (`src/routes/replacement-sensors/+page.svelte`, honors `?sensor=` deep links).
- Babylon 3D viewer on `replacement-case` (its own CDN loader; the old local
  Babylon viewer on `replacement-sensors` was removed 2026-07-20).
- PartsOrigin donut chart — `src/lib/components/PartsOrigin.svelte`.
- reCAPTCHA contact form — `src/routes/contact/`.

## Working conventions
- `cropwatch-site.css` / `cropwatch-chrome.css` are used site-wide — after
  editing them, re-verify several pages, not just one.
- Run `npx svelte-check` (expect 0 errors/0 warnings) before finishing.
- Copy is Japanese; use plain hyphens, avoid em/en dashes in body copy.

## SEO artifacts must stay in sync (no stale SEO)
Any content or route change must update, **in the same commit**:
- `src/lib/seo/pages.ts`: the page's `summary` + bump `lastmod`. This one
  registry feeds `/sitemap.xml` and `/llms.txt`. New public page = new entry
  (`src/lib/seo/pages.test.ts` fails otherwise).
- The page's `<Seo>` title/description (keep `summary` in line with it).
- `src/lib/seo/schema.ts` JSON-LD if prices, products, org facts or FAQ changed.
- コラム: `src/lib/content/columns.ts` (`dateModified`). News: `static/news/*.json`.
- `src/lib/seo/alternates.ts` PAIRS for a new cross-site page (identical on
  both deploy branches).
Then run `npx vitest --run --project server`. A PostToolUse hook
(`.claude/hooks/seo-reminder.sh`) prints this reminder when content files change.

## Analytics
`src/lib/components/Analytics.svelte` (shared with the .io branch) owns GA4:
lazy gtag load, one `page_view` per navigation, `ai_referral` + `ai_source`
user property for ChatGPT/Perplexity/etc. visits (`src/lib/analytics/ai-referrer.ts`),
`contact_click` (tel/mailto/LINE), `generate_lead` (contact form success).
Don't add gtag calls elsewhere; use `trackEvent` from `$lib/analytics/gtag`.
IndexNow is pinged from `.github/workflows/deploy.yml` after each prod deploy
(key file `static/<key>.txt`).
