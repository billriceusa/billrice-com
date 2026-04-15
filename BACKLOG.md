# billrice.com Backlog

Single source of truth for billrice.com work. Last updated 2026-04-15.

**Stack**: Next.js 16 + Sanity.io (`st1plnki`) + Tailwind v4 + Resend
**Repo**: `~/Documents/_projects/brsg-projects/billrice-com`

---

## Shipped

- Sanity CMS migration (schemas: post, project, company, book, tool, author, category, nowPage, aboutPage, siteSettings, blockContent)
- Embedded Studio at `/studio`
- Blog: `/blog`, `/blog/[slug]`, `/blog/category/[slug]`, RSS at `/feed.xml`, ISR (1hr)
- Book page: `/book` (Sanity-backed)
- Projects: `/projects`, `/projects/[slug]`
- Companies: `/companies/[slug]`
- About page with career narrative (Sanity-driven with fallback)
- `/now` page wired to `nowPage` schema (with fallback)
- Homepage wired to `siteSettings` + `COMPANIES_QUERY` + `PROJECTS_QUERY` + `TOOLS_QUERY`
- `/api/bio` endpoint (multiple lengths + sections, CORS enabled)
- SEO: Person/Org/Website schema, `llms.txt`, `sameAs` to 13 domains, dynamic sitemap, OG image
- Branded default featured image for blog posts
- Publish script: `npx tsx scripts/publish-post.ts content/posts/<file>.md`
- Audit script: `npx tsx scripts/audit-posts.ts` (read-only)
- Seed scripts: `seed-now-page.ts`, `seed-site-settings.ts`, `seed-about-page.ts`, `seed-tools.ts`
- Unpublished 4 off-brand banking/RegTech posts (2026-04-15)

---

## Action items — awaiting Bill

### Seed Sanity docs (requires SANITY_API_TOKEN in .env.local)

Run in any order; all scripts are idempotent (upsert by `_id`):

```bash
npx tsx scripts/seed-site-settings.ts
npx tsx scripts/seed-now-page.ts
npx tsx scripts/seed-about-page.ts
npx tsx scripts/seed-tools.ts
```

Each script seeds the current hardcoded content, so pages will render identically to today. After seeding, edits in Sanity Studio will be live on the site.

### Review and publish P0 drafted career stories

Three already in `content/posts/`:
- [ ] `how-i-coined-lead-management.md`
- [ ] `building-equityonline-quicken-loans.md`
- [ ] `how-quizzle-became-bankrate.md`

Run `npx tsx scripts/publish-post.ts content/posts/<file>.md` for each after review.

### Review and publish 10 new expertise/industry posts (2026-04-15 drafts)

**Priority 2 — Expertise / Authority:**
- [ ] `lead-buyers-framework.md`
- [ ] `staying-at-kaleidico-as-cro-after-acquisition.md` (reframed 2026-04-15 per editorial rules: acquisition/liquidity event, 10% retained, CRO role, no buyer named)
- [ ] `30-years-fintech-gtm-lessons.md` (Figure references anonymized 2026-04-15; Velocity Lending added)
- [ ] `springeq-launch-gtm-case-study.md` (D2C→DTC sweep 2026-04-15)
- [ ] `why-i-build-niche-authority-sites.md`

**Priority 3 — Industry Insight:**
- [ ] `ai-in-mortgage-marketing-real-state.md` (Figure reference removed, Velocity Lending + CRO role added 2026-04-15)
- [ ] `lead-management-vs-crm.md`
- [ ] `aged-lead-opportunity.md`
- [ ] `fintech-marketing-is-not-saas-marketing.md`
- [ ] `what-i-look-for-advising-fintech.md`

### Rewrite 2 mortgage metrics posts in Bill's voice

Kept published for rewrite (not unpublished) per content plan — currently generic AI-generated, intros need personal perspective:
- [ ] `mortgage-lenders-measuring-wrong-kpis` (in Sanity)
- [ ] `5-lead-generation-metrics-mortgage-lender-gets-wrong` (in Sanity)

---

## Ideas / Someday

- Book chapter previews + testimonials on `/book`
- Newsletter archive page (pulls The Lead Brief issues)
- Cross-linking automation: related projects on blog posts, related posts on project pages
- Speaker/press kit page (pulls from existing bio files in `~/Documents/Business/Bio/`)
- Seed script for companies + projects docs (not currently scripted — existing docs assumed live in Sanity via Studio)

---

## Notes

- `scripts/` is excluded from `tsconfig.json` to keep Vercel builds green — do not re-include
- Sanity CLI auth is Google (bill@billrice.com), NOT GitHub — different user IDs
- Blog uses ISR (revalidate=3600); new posts appear without redeploy
- Default featured image: `/public/default-featured.jpg`
- All pages have hardcoded fallbacks so they render correctly even if a seed script hasn't been run
