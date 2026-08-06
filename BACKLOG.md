# billrice.com Backlog

Single source of truth for billrice.com work. Last updated 2026-07-30.

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

- [ ] **Define the essay set.** 3–5 pieces, each one Bill's thinking rather than industry commentary. Leading candidates from current work: the four-sides thesis; "contact isn't scarce anymore, welcome is"; the conversation becoming the unit of commerce; what 30 years says about which parts of selling survive automation. **The referenced slate file `~/.buzz/PLANS/BILLRICE_COM_ESSAY_SLATE.md` does not exist** (checked 2026-08-06) — this list is the only surviving record of the slate. Treat it as canonical or rebuild the file.
- [x] **Decide the surface** (2026-07-30) — `/essays` is now the only writing surface. `/blog` is gone; nav reads Essays.
- [x] **Retire the chronological blog** (2026-07-30) — see below.
- [x] **Essay 1: All Four Sides — drafted** (2026-08-06). Unblocked by interview, written, revised. See below.
- [x] **Essay 1: All Four Sides — PUBLISHED** (2026-08-06). Merged as `ac2baf5` (PR #15), then published to Sanity. Live at `/essays/all-four-sides`, listed on `/essays`, in `sitemap.xml`, IndexNow pinged. Merge first, publish second — the order is the rule, not a preference.
- [ ] **Add the Amazon Author Central page to the identity `sameAs` set.** `https://www.amazon.com/author/billricestrategy` — Bill's new author page, given 2026-08-06. **Still 404 as of this writing**; do not add an unverified URL to `sameAs`, for the same reason `books.ts` demands a 200 before changing an ASIN. See "Pending — Amazon author sameAs" below for the full file list.
- [ ] **New slate entry: "The Regulators Are Behind Your Customers."** Split out of All Four Sides on Bill's call, 2026-08-05 — regulators lagging consumer preference on text messaging. Real and live in the compliance work, but it pulled a 1,300-word argument sideways.

### Essay 1: "All Four Sides" — drafted 2026-08-06, awaiting publish

**Status:** written. `content/essays/all-four-sides/draft.md` on branch
`essay-all-four-sides`, 1,632 words. Source interview captured alongside it in
`interview.md` (working notes, not for publication). Unblocked 2026-08-05 by a two-round
interview with Bill; every number in the essay is his, verbatim from that interview.

**Why this essay first:** cheapest to write (source material already assembled in
`~/Code/memory/shared/reference_bill_positioning_four_sides.md`), and it is the only
essay that fixes a live defect on the homepage.

#### Two premises in the original spec were wrong — corrected by the interview

The spec below is preserved because its *diagnosis* was right. Two of its *assumptions*
were not, and the essay had to go elsewhere:

1. **The CAC premise was wrong.** The spec assumed the buyer-leg receipt was "what a
   funded loan actually cost versus what he assumed going in." It wasn't. Bill had a good
   read going in and held Velocity to a consistent **~$1,500 CAC per funded loan**. He was
   not humbled on price. The real receipt is that he budgeted ~30 days to stand up the
   sales operation and it took **~6 months** — he knew leads cold and underestimated the
   machine that receives them.
2. **"The cost of the twelfth dial" was not Bill's.** The phrase appeared in the spec
   unattributed; flagged as possibly invented by a prior session, and it was. Bill's
   actual mechanism: speed to *contact* (text first), then whether the LO could take a
   clean app and file on the first call — which put pull-through over 50%. Not dial count.
   **Do not reuse the twelfth-dial phrasing anywhere.**

#### Editorial decisions on the draft (Bill, 2026-08-06)

- **CTA:** one, The Lead Brief, with a subscription ask. Set below the closing line.
- **Named the next book.** *Sales Team of One* is named and linked to SalesTeamofOne.com
  as written-in-the-open.
- **The "we were first" claim stands flat**, with a present-day defense rather than a
  hedge: the platforms that own the category (Salesforce, GoHighLevel, Velocify, Shape)
  are functionally expensive spreadsheets, and conversion-pattern prioritization inside
  them takes a pile of professional services.
- **Client build-examples held back — Bill approved the holdback 2026-08-06.** He offered
  ProPair plus four current engagements as supporting evidence. Naming vendors under
  critique is fair; naming clients as build examples is disclosure. The text says "a
  third-party layer" and "the companies I work with" instead. See
  `feedback_critique_vendors_by_name_never_clients`.
- **Length accepted at 1,632** against the spec's 1,500 ceiling. Every word over came from
  the rulings above.

#### The three problems it solves

1. **The hero claim has nowhere to land.** `I've stood on all four sides of the
   consumer-direct lead.` renders as plain unlinked text on `/`. The only two buttons on
   the page — Read the Playbook, Subscribe to The Lead Brief — both point off-domain and
   open in new tabs. A reader who thinks *"prove it"* has no next click that stays on
   billrice.com. Verified against production 2026-07-30.
2. **The buyer leg has no evidence on the site.** `/essays` holds seven pieces
   (DeepGreen, EquityOnline/Quicken, Quizzle→Bankrate, coining lead management, Kaleidico
   post-acquisition, AFOSI→fintech, SpringEQ). Every one is *software*, *agency*, or
   *operator inside someone else's company*. **Velocity Lending appears nowhere in
   `/essays`** — only as a line in `/about`, `/api/bio`, and `llms.txt`. That is the one
   leg nobody else on a lead-gen panel has, and the one third-party bios reliably drop.
   Six essays defending the legs that need no defense; zero defending the one that does.
3. **It is currently a claim, not an argument.** "I've done four things" is a résumé.
   Nobody cites a résumé.

#### The thesis — write it as an argument, not a seventh career retrospective

**Each side of the lead has a blind spot only the other three can see.**

- *Software* (icoSales, 2005) thinks the problem is routing and speed. It isn't.
- *Agency* (Kaleidico + MPL) thinks it's volume and source mix.
- *Lender* (Velocity Lending, 2016–2018, Bill's own P&L) thinks it's price per lead —
  ~~then finds out it's the cost of the twelfth dial.~~ **Superseded, see above:** he was
  right about price and wrong about how long the receiving operation takes to build.
- *Author* (**The Lead Buyer's Playbook**, Nov 2025) thinks it's process, and has to
  concede process is the last 20%.

Payoff: everyone on every panel is optimizing their own blind spot. The fourth bullet is
what makes it credible — an essay where the author's own book places last is not a brag,
and readers can tell.

#### ~~BLOCKER~~ — RESOLVED 2026-08-05 by interview

Bill supplied the Velocity receipt directly. Captured verbatim in
`content/essays/all-four-sides/interview.md`. Decision from 2026-07-30 held: **carried
inside the Four Sides essay**, not written as a standalone eighth career essay.

#### Ships with the essay — do not ship separately

- [ ] **Link the homepage hero line to `/essays/all-four-sides`.** Still unlinked —
  re-verified against production 2026-08-06, it is a bare `<p>` with no anchor
  (`src/app/(site)/page.tsx:132`, `FALLBACK_HERO_TAGLINE`). An unlinked hero sentence
  after this essay exists is a bug.
- [x] **Exactly one CTA on the essay: The Lead Brief.** Done in the draft.
- [ ] **Audit whether the Lead Brief CTA can stay on-domain** rather than opening
  `theleadbrief.com` in a new tab, so a piece that lands well doesn't leak.
- [ ] **Article schema `author` → canonical Person URI.** Still not done, and it is
  broader than this essay: `src/app/(site)/essays/[slug]/page.tsx:82` passes
  `authorName: post.author?.name || 'Bill Rice'`, which inlines a fresh Person on all
  seven live essay pages instead of referencing `BILL_RICE_ID`. Partially undoes PR #11.
- [ ] Link the existing seven `/essays` pieces as the supporting receipts for legs 1–3.

**Length:** spec said 1,200–1,500; **shipped at 1,632 with Bill's approval.**
**Sequencing after this:** I Work in Code → Contact/Welcome → What Survives →
Conversation, plus the new Regulators piece. One every 4–6 weeks; if it slips, let it.

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

## P2 — queue <!-- added 2026-08-06 /session -->

Found in a live spot-audit 2026-08-06. Nothing here is bleeding: `/` and `/essays` both
return 200 and all seven essay slugs resolve.

- [x] **Article schema inlines an author** — fixed in PR #15, verified live: every essay
  now emits `"author":{"@id":"https://billrice.com/#person"}`.
- [x] **Delete `public/sitemap.xml`** — done in PR #15. `/sitemap.xml` serves as a route.
- [x] **Close PR #12** — closed 2026-08-06 with a comment recording what superseded it.
- [ ] **`vercel.json` pins `NODE_VERSION: "18.x"`** under Next.js 16, which needs 20+.
- [ ] **`/api/bio` has no `tools` key** — it exposes `companies`, `projects`, `books`.

---

## Pending — Amazon author `sameAs` <!-- 2026-08-06 -->

Bill created an Amazon Author Central page and gave the URL on 2026-08-06:
`https://www.amazon.com/author/billricestrategy`. It belongs in the identity set — it is
a profile that *is* Bill, the same class as the Medium and Substack entries, not a retail
destination (those live in `src/lib/books.ts`).

**Blocked on verification, deliberately.** The URL still returned 404 ~30 minutes after
Bill said it would be live. Author Central pages can take hours to become publicly
visible. `books.ts` already carries the scar tissue for this exact mistake — a hardcoded
Amazon ASIN went dead and 404'd the buy button in three places — and its header now
demands a 200 before the constant changes. A `sameAs` pointing at a 404 is worse than an
absent one: it is an assertion to a crawler that a nonexistent page is this person.

**Note that Amazon returns 405 to HEAD.** Verify with a GET and a browser user-agent, or
you will read a live page as broken.

When it returns 200, add it to `BILL_RICE_SAME_AS`. The file is mirrored, so this is
**seven edits, not one** — the spec plus six copies:

- [ ] `~/Code/_shared-docs/bill-rice-identity.md` — the spec; change it first
- [ ] `sites/personal/billrice.com/src/lib/identity.ts` (this repo — Personal scope)
- [ ] `sites/brsg/owned/billricestrategy.com/src/lib/identity.ts`
- [ ] `sites/brsg/owned/agedleadsales.com/lib/identity.ts` (note: `lib/`, not `src/lib/`)
- [ ] `sites/brsg/owned/proinvestorhub.com/src/lib/identity.ts`
- [ ] `sites/brsg/owned/leadcompliancehub.com/src/lib/identity.ts`
- [ ] `sites/brsg/owned/cryptolendinghub.com/src/lib/identity.ts`

The five BRSG copies are a **different business scope** and should be done from a BRSG
session, not this one. Divergence here is additive rather than entity-splitting — the
`@id` is what merges the graph, and that stays identical — but the file's own header is
explicit that copies must not drift, so finish the set.

Worth checking while there: `selfemployedlendinghub.com`, `theestategap.com`, and
`verifiedvector.com` have **no `identity.ts` at all** and so emit no reference node.

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
- `publish-post.ts` — markdown → Sanity (upsert by slug). **Go-live action**, not a
  staging step: it writes straight to the published dataset and pings IndexNow. Two
  gotchas fixed 2026-08-06 (`53be536`): it emitted a literal `---` paragraph for a
  markdown horizontal rule (caught on the live all-four-sides page, republished same
  day), and its header wrongly claimed `SANITY_API_TOKEN` could live in `.env.local` —
  tsx never reads that file. The Sanity CLI login token on disk works; the exact
  invocation is now in the script header.
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
