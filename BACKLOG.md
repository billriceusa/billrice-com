# billrice.com Backlog

Single source of truth for billrice.com work. Last updated 2026-07-28.

**Stack**: Next.js 16 + Sanity.io (`st1plnki`) + Tailwind v4 + Resend
**Repo**: `~/Code/sites/personal/billrice.com` (canonical)

---

## 2026-07-28 — What this site is for (Bill's direction)

**The site is the hub to all of Bill's work** — and, over time, the home for **a few seminal essays** on his thinking, philosophy, and predictions about where the industry goes. Not a content mill. A small number of pieces that only he can write.

Everything on the site should be judged against that. Concretely:

- **Gumroad is being phased out.** All four $9 playbooks removed from the homepage, the Person schema `offers`, and Sanity (2026-07-28). They are also removed from `seed-tools.ts` so a re-run cannot restore them. Do not re-add.
- **DemoLeadGen is dead** — `demoleadgen.com` returns 404 after the 2026-06-05 archive. Removed from `sameAs`, `/api/bio`, `llms.txt`, the homepage, and Sanity.
- The blog's job is **not** cadence. It is a small set of durable essays plus the career stories that evidence the four-sides positioning. See the strategy doc's "Selected Writing" recommendation — but note Bill's framing supersedes it: **seminal essays, not curated archives.**

### Open — essays direction

- [ ] **Define the essay set.** 3–5 pieces, each one Bill's thinking rather than industry commentary. Leading candidates from current work: the four-sides thesis; "contact isn't scarce anymore, welcome is"; the conversation becoming the unit of commerce; what 30 years says about which parts of selling survive automation. Proposed slate + sequencing: `~/.buzz/PLANS/BILLRICE_COM_ESSAY_SLATE.md`.
- [x] **Decide the surface** (2026-07-30) — `/essays` is now the only writing surface. `/blog` is gone; nav reads Essays.
- [x] **Retire the chronological blog** (2026-07-30) — see below.

### 2026-07-30 — the blog is gone

Bill's call: the blog was AI-written and never held to the QC standard this domain needs. On a site that is the canonical record on Bill Rice for humans *and* machines, an unreviewed post is not neutral — it becomes the cited source.

- **Ten industry posts unpublished** (`scripts/unpublish-industry-posts.ts`). Reversible — `publishedAt` cleared, nothing deleted. Their URLs 308 to the homepage; they have no topical successor here.
- **Seven first-person pieces kept** and moved to `/essays`: the six Career Stories plus the SpringEQ launch account. Old `/blog/*` URLs 308 to the matching `/essays/*`.
- **Six canonical-fact defects corrected** (`scripts/fix-canonical-facts.ts`) — three 2002/2004 contradictions in the EquityOnline post, a sentence fragment, a "25 years" that should not appear in Bill's voice, and a Kaleidico agency-from-inception line.
- **Root cause of the escaped-quote titles fixed** in `publish-post.ts` — the frontmatter parser stripped outer quotes without unescaping inner ones.

**The mechanism that failed, and the rule that replaces it:** the ten were staged with staggered `publishedAt` and auto-published on a Sanity time-gate while the plan still recorded them as "awaiting Bill's review." The gate wasn't skipped, it was scheduled around. **Nothing on this domain goes live on a date. Only on a merge.**

Answered by Bill 2026-07-30 and applied:
- [x] **The Rock Bank story is now in the essay.** It previously read "This wasn't to be - a story for another time." Bill's account: he led the effort to get an OTS charter; Dan Gilbert wanted to own a professional sports franchise; the OTS was not comfortable with that adjacent risk next to a bank charter; Gilbert turned down the bank. That is what moved him to VP National Home Equity and produced EquityOnline.
- [x] **MBA corrected 2003 → 2004** everywhere (`/api/bio`, `llms.txt`, `/about` fallback + timeline, `seed-about-page.ts`, the aboutPage doc in Sanity, and the essay). 2003 predated the Quicken tenure it was described as happening "during," so it contradicted the narrative it sat inside.
- [x] **SpringEQ stays in `/essays`** — Bill: "another defining moment... once again helping to build another consumer direct online home equity platform."

### Canonical fact corrections (2026-07-30)

Supersedes the prior record. Both are now consistent across every surface:

- **MBA Marketing, University of Phoenix — 2004** (was 2003).
- **Rock Bank did not "wind down."** Bill led the OTS charter effort and Dan Gilbert turned it down rather than give up owning a professional sports franchise, which the OTS treated as adjacent risk to a bank charter.

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
- [x] `/api/bio` updated with full editorial-rule-compliant bios, companies, career highlights (2026-04-15)
- [x] `llms.txt` timeline + About Bill Rice section + Companies section updated (2026-04-15)
- [x] `/about` fallback content (timeline, differentiators, ventures) brought into alignment with canonical facts (2026-04-15)
- [x] SpringEQ year corrected 2018 → 2016 across drafts, published posts, aboutPage Sanity doc, /api/bio, llms.txt (2026-04-15)
- [x] Owned-site footer audit (2026-04-15): all 7 owned sites (billricestrategy, agedleadsales, proinvestorhub, cryptolendinghub, howtoworkleads, verifiedvector, demoleadgen) correctly link to billrice.com/about. sameAs list in Person schema comprehensive (13 entries).

### Duplicate directory risks (resolved 2026-04-15)
- [x] **BRSG duplicate clones resolved**: `~/billricestrategy` confirmed canonical (recent commits); stale `~/Documents/_projects/billricestrategy/` archived to `~/Documents/_projects/_archive/billricestrategy.old/`. Archived clone had a stash containing only a `.gitignore` addition for `.env*.local` (travels with archive, recoverable if needed).
- [x] **Corrupt dirs archived**: `agedlead-sales-corrupt/` and `howtoworkleads-corrupt/` moved to `_archive/` (neither was a git repo — extraction debris only).
- [x] **`verified-vector-projects/` inspected, left alone** — not a duplicate clone; parent dir holding multiple distinct sub-projects (arep-vibe-audit, battlecard-app, bill-rice-linktree, etc.).

### Owner action items flagged during cleanup (BRSG repo — not billrice.com)
- [ ] **Uncommitted work in canonical BRSG clone**: `src/lib/cron/performance-backlog.ts` is a legitimate file (cron for daily-performance recommendation persistence to GitHub) but uncommitted. Decide whether to commit or remove.

### Potential small follow-ups
- [ ] Consider updating `employee-7-deepgreen-bank.md` published post to lightly reinforce the ~80-people operational scale context (optional — Bill reviewed and approved the current version)

---

## Ideas / Someday

- Book chapter previews + testimonials on `/book`
- Newsletter archive page (pulls The Lead Brief issues)
- Cross-linking automation: related projects on blog posts, related posts on project pages
- Speaker/press kit page (pulls from existing bio files in `~/Documents/Personal/professional/bio/` and `/api/bio`)
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
