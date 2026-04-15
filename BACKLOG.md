# billrice.com Backlog

Single source of truth for billrice.com work. Last updated 2026-04-15.

**Stack**: Next.js 16 + Sanity.io (`st1plnki`) + Tailwind v4 + Resend
**Repo**: `~/Documents/_projects/brsg-projects/billrice-com` (canonical)

---

## Shipped

### Infrastructure
- Sanity CMS migration (schemas: post, project, company, book, tool, author, category, nowPage, aboutPage, siteSettings, blockContent)
- Embedded Studio at `/studio`
- Blog: `/blog`, `/blog/[slug]`, `/blog/category/[slug]`, RSS at `/feed.xml`, ISR (1hr)
- Book page: `/book` (Sanity-backed)
- Projects: `/projects`, `/projects/[slug]`
- Companies: `/companies/[slug]`
- About page with career narrative (Sanity-driven)
- `/now` page wired to `nowPage` schema
- Homepage wired to `siteSettings` + `COMPANIES_QUERY` + `PROJECTS_QUERY` + `TOOLS_QUERY`
- `/api/bio` endpoint (multiple lengths + sections, CORS enabled)
- SEO: Person/Org/Website schema, `llms.txt`, `sameAs` to 13 domains, dynamic sitemap, OG image
- Branded default featured image for blog posts

### Scripts
- `publish-post.ts` — markdown → Sanity (upsert by slug)
- `audit-posts.ts` — read-only post inventory
- `fetch-mortgage-posts.ts` — inspect post body
- `seed-*.ts` — siteSettings, aboutPage, nowPage, tools (all idempotent)
- `unpublish-offbrand.ts` — clear publishedAt without deleting
- `rewrite-mortgage-posts.ts` — rewrote 2 mortgage KPI posts in Bill's voice

### Content
- **Published career stories (live or scheduled):**
  - Employee #7: What I Learned Building One of the First Internet Banks (2026-04-10)
  - From AFOSI to Fintech (2026-04-12)
  - Building EquityOnline at Quicken Loans (2026-04-14)
  - How I Coined Lead Management (2026-04-15)
  - How Quizzle Became Bankrate's Customer Acquisition Engine (2026-04-15)
- **P2/P3 expertise & industry posts — staged with staggered `publishedAt`, auto-publish via Sanity time-gate + ISR:**
  - 2026-04-20 — lead-buyers-framework
  - 2026-04-22 — 30-years-fintech-gtm-lessons
  - 2026-04-24 — staying-at-kaleidico-as-cro-after-acquisition
  - 2026-04-27 — springeq-launch-gtm-case-study
  - 2026-04-29 — why-i-build-niche-authority-sites
  - 2026-05-01 — lead-management-vs-crm
  - 2026-05-04 — ai-in-mortgage-marketing-real-state
  - 2026-05-06 — aged-lead-opportunity
  - 2026-05-08 — fintech-marketing-is-not-saas-marketing
  - 2026-05-11 — what-i-look-for-advising-fintech
- **Content sweeps completed (2026-04-15):**
  - 4 off-brand banking/RegTech posts unpublished (publishedAt cleared)
  - 2 mortgage KPI/metrics posts rewritten in Bill's voice
  - Editorial rules applied (LightYear Capital, DTC not D2C, Velocity Lending, Kaleidico CRO/acquisition framing, Verified Vector AI-first, BRSG client confidentiality, no buyer named)

---

## Next up

### Single-source-of-truth hardening
- [ ] Verify each staged post renders correctly on its `publishedAt` date (spot-check 2-3 in the next two weeks)
- [ ] Confirm `/api/bio` reflects the re-seeded `siteSettings.aboutBio` narrative (Velocity Lending, Kaleidico CRO, Verified Vector AI-first)
- [ ] Verify `sameAs` links in Person schema include all owned domains (current list: 13 — audit against what's actually owned as of today)
- [ ] Flag: confirm SpringEQ 2018 start date against LinkedIn (https://www.linkedin.com/in/billrice/) — currently published as 2018

### Potential small follow-ups
- [ ] React component fallbacks in `/about/page.tsx` and homepage still have pre-correction hardcoded content — refresh to match the current Sanity data (cosmetic; Sanity wins at runtime)
- [ ] Consider updating `employee-7-deepgreen-bank.md` published post to lightly reinforce the ~80-people operational scale context (optional — Bill reviewed and approved the current version)

---

## Ideas / Someday

- Book chapter previews + testimonials on `/book`
- Newsletter archive page (pulls The Lead Brief issues)
- Cross-linking automation: related projects on blog posts, related posts on project pages
- Speaker/press kit page (pulls from existing bio files in `~/Documents/Business/Bio/` and `/api/bio`)
- `Past Ventures` section on `/about` (Velocity Lending, Quizzle, SpringEQ) if the current Current Ventures section gets crowded
- Seed script for companies + projects docs (currently assumed seeded via Studio; would help onboarding a new clone)

---

## Editorial rulebook (must respect on all content)

All five rules live in Claude memory; enforced on every draft and edit:
1. **Canonical career facts** — DeepGreen 2000-2004 (Employee #7, ~80 people, sold to LightYear Capital), Quicken Loans 2004-2005 (Rock Bank COO → VP Home Equity), Kaleidico 2005 (software-first, agency after 2008), Velocity Lending 2016-2018 (DTC mortgage lender), SpringEQ 2018 (verify), BRSG 2020, Verified Vector 2024. LinkedIn is source of truth.
2. **BRSG client confidentiality** — no named current-client tactics (Figure, Boldin). Anonymize or use Bill-owned examples (Velocity Lending, Kaleidico patterns, content portfolio).
3. **Lending terminology** — DTC (not D2C); B2B2C / wholesale for broker channels.
4. **Kaleidico sale framing** — acquisition / liquidity event + 10% retained + CRO role (BD, sales, marketing strategy & execution); never name the buyer.
5. **BRSG + Verified Vector framing** — BRSG = B2B agency for longtime fintech referral partners ("satellites in the same ecosystem"); Verified Vector = AI-first, no employees, every deliverable in code.

---

## Notes

- `scripts/` is excluded from `tsconfig.json` to keep Vercel builds green — do not re-include
- Sanity CLI auth is Google (bill@billrice.com), NOT GitHub — different user IDs
- Blog uses ISR (revalidate=3600); staged posts appear when `publishedAt` ≤ now
- Default featured image: `/public/default-featured.jpg`
- Pages have hardcoded fallbacks so they render correctly even if a seed script hasn't been run
