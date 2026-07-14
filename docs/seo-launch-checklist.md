# SEO launch checklist

## Deploy the server, not a static SPA fallback

This repository now requires the Node/Express server in `server.ts` in production. It serves the blog, `robots.txt`, and `sitemap.xml` before the SPA fallback.

For the existing Render service, set:

- Build command: `npm ci && npm run build`
- Start command: `npm start`
- Health check: `/api/health`
- Environment variable: `NODE_ENV=production`

`render.yaml` records the same configuration for new Blueprint deployments. After deploying, confirm these URLs return the indicated content type and content (not the homepage HTML):

- `/robots.txt` → `text/plain`
- `/sitemap.xml` → `application/xml`
- `/blog` → the blog index
- `/blog/kant-vs-hegel` → article HTML and `Article` JSON-LD

## Google Search Console

1. Verify the `knowphilosophers.site` domain property.
2. Submit `https://www.knowphilosophers.site/sitemap.xml`.
3. Inspect the homepage, `/blog`, and the first three article URLs. Request indexing only after the live response checks pass.
4. Review Indexing and Core Web Vitals weekly; do not use the URL inspection tool as a daily traffic metric.

## GA4 measurement

The frontend now sends these events when Google Analytics is available:

- `view_philosopher_dossier`
- `view_product_area`
- `engaged_60_seconds`
- `copy_philosopher_quote`
- `open_philosophy_guides`

In GA4, wait for the events to arrive, then mark `view_philosopher_dossier`, `engaged_60_seconds`, and `open_philosophy_guides` as key events. Exclude internal traffic and enable Google Signals only if its privacy implications are acceptable.

## UTM convention for distribution

Always tag links shared outside the site. Use lowercase, hyphenated values:

`https://www.knowphilosophers.site/blog/<slug>?utm_source=zhihu&utm_medium=organic-social&utm_campaign=philosophy-guides`

Recommended sources: `zhihu`, `xiaohongshu`, `wechat`, `bilibili`, `github`, `newsletter`.

Recommended campaign names: `philosophy-guides`, `ai-and-philosophy`, `philosopher-comparisons`.
