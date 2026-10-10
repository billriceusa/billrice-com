# billrice.com Backlog

Single source of truth for billrice.com work. Last updated 2026-10-10.

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
- [x] **Amazon Author Central added to `sameAs` on billrice.com** (2026-08-06, `c6aa5f1`). Verified live before shipping. **The five BRSG copies are still pending** — different scope, see below.
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

- [x] **Link the homepage hero line to `/essays/all-four-sides`.** Done — shipped in
  PR #15 and verified in code 2026-10-10: the tagline is wrapped in a `Link` to the
  essay. This box was left open after the work landed.
- [x] **Exactly one CTA on the essay: The Lead Brief.** Done in the draft.
- [ ] **Audit whether the Lead Brief CTA can stay on-domain** rather than opening
  `theleadbrief.com` in a new tab, so a piece that lands well doesn't leak.
- [x] **Article schema `author` → canonical Person URI.** Done — `articleJsonLd`
  references `billRiceRef` and the per-essay `authorName` argument is gone. Duplicated
  the already-ticked entry in the P2 queue below; both were the same item.
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
- [x] **`vercel.json` pinned `NODE_VERSION: "18.x"`** — fixed 2026-10-10, and the
  diagnosis was understated in one direction and overstated in the other. Vercel has no
  Node version key in `vercel.json` at all; `NODE_VERSION` as a build env var is a
  Netlify convention. So nothing was pinned to 18 — the block was inert, and all it did
  was tell a reader Node was pinned when it was not. Vercel reads Project Settings or
  `engines.node`; it now supports 20.x, 22.x and 24.x, and 18.x is off the list. Dropped
  the block, set `engines.node` to `"22.x"`.
- [ ] **`/api/bio` has no `tools` key** — it exposes `companies`, `projects`, `books`.

---

## 2026-10-10 — session log

### Shipped

- **The lint script had been dead since the Next 16 upgrade.** `next lint` was removed in
  Next 16, so `npm run lint` failed with "Invalid project directory ... /lint" — an error
  that reads like a path bug. `eslint .` did not work either: `eslint.config.mjs` built
  its config through `FlatCompat`, and the translated `next/core-web-vitals` object
  contains a cycle, which the eslintrc validator hit while JSON.stringify-ing the config
  to format errors. Both fixed; `@eslint/eslintrc` dropped, flat configs spread directly.
  Added `typecheck`. With lint running it immediately found a dead `baseUrl` in
  `json-ld.tsx`. **Run `npm run lint` before pushing — it works now.**
- **Aged-lead domains consolidated.** `agedleadsales.com` and `howtoworkleads.com` both
  301 to `workagedleads.com` (both fetched 2026-10-10). Merged into a single **Work Aged
  Leads** entry rather than repointing two cards at one site. Live on `/api/bio` and
  `llms.txt` (both static). Also dropped DemoLeadGen from a retired post that still
  listed it.
- **Books are addressed by slug, not position.** `BOOK_QUERY` was `*[_type=="book"][0]`
  with no ordering — GROQ promises no order, so the day a second book document landed
  `/book` could have rendered the wrong book under Playbook metadata, a Playbook
  canonical and a Playbook JSON-LD node, silently. Replaced with `BOOK_BY_SLUG_QUERY` and
  an explicitly totally-ordered `BOOKS_QUERY`. Added `/books` and `/books/[slug]`; `/book`
  keeps its URL, its fallbacks and its place in the nav. Fixed an inlined anonymous
  Person in the Book JSON-LD on the way — same entity-splitting the essays were fixed for.
- **The scripts no longer let the shell choose the project.** See below; this one was
  close to a live incident.

### The script project-id hazard — what it actually was

All twelve scripts took `projectId` from `NEXT_PUBLIC_SANITY_PROJECT_ID` with
`'st1plnki'` only as a fallback, and ten of them mutate the published dataset. **The
cloud container this ran in had that variable set to a different project entirely**, so
every script here was one command away from writing Bill's canonical content somewhere
unknown, with no dry run and no confirmation.

Project and dataset are now pinned in `scripts/sanity-client.ts` and a disagreeing
environment variable is a hard stop, not an override. The nine scripts telling readers to
put the token in `.env.local` were corrected too — tsx never reads it, so that advice
fails in a way that looks like a bad token rather than an unset one.

### Stale checkboxes corrected

Both of these were already done in code and still showed open above:

- **Homepage hero link** — shipped in PR #15. `page.tsx` wraps the tagline in a `Link` to
  `/essays/all-four-sides`. The open box under "Ships with the essay" was wrong.
- **Article schema `author` → canonical Person URI** — done. `articleJsonLd` references
  `billRiceRef`; the per-essay `authorName` argument is gone.

### Open — needs Sanity access

Nothing below can be done from a cloud session as currently configured: **the Sanity API
is blocked by the environment's network policy** (403 on CONNECT to `*.api.sanity.io`,
confirmed both by curl and through the Sanity client itself). There is also no write
token here, only `SANITY_API_READ_TOKEN`. Both need fixing before any of this runs.

- [ ] **`scripts/patch-author-pillar.ts` does not exist.** Handed over as the first task
  of this session — review its seven-field diff, then `--apply`. It is not on disk, not
  in any branch, and not in history on any ref; the session that wrote it never committed
  it, and the container was a fresh clone. It has to be rewritten. Until something runs,
  `/book` still renders the superseded subtitle from Sanity, which wins over the code
  fallback.
- [ ] **Confirm `LEAD_BUYERS_PLAYBOOK_SLUG`** in `src/lib/books.ts` against the dataset.
  Written as `the-lead-buyers-playbook` but never read back. If it is wrong, `/book`
  serves its hardcoded fallbacks — the same page a reader sees today, so the failure is
  invisible rather than loud. Delete the caveat on the constant once checked.
- [ ] **Patch the two stale `project` documents in Sanity** to the merged Work Aged Leads
  entry. The homepage reads `PROJECTS_QUERY` and only falls back to the array in
  `page.tsx`, so the live homepage still shows the two old cards.
- [ ] **The Sanity bodies of the two retired posts** still carry the old aged-lead URLs.
  Inert while they stay unpublished; both 301 anyway.

### Other open items from this session

- [ ] **Decide when the nav moves from `/book` to `/books`.** Right while one book is
  published; wrong once the second ships. `/books` is currently linked only from `/book`,
  which keeps it off the orphan list but is thin.
- [ ] **`colorScheme`, `themeColor` and `viewport` sit in a `metadata` export**, which
  Next 16 warns about on every build and wants in a `viewport` export instead.
  Pre-existing, cosmetic today, a deprecation later. Small fix, not taken.
- [ ] **An unknown dynamic slug 500s rather than 404s when Sanity is unreachable** —
  `sanityFetch` throws before `notFound()`. Pre-existing and identical on `/essays/*` and
  `/projects/*`, so `/books/[slug]` matches the house pattern rather than fixing it
  alone. Arguably correct (a 500 asks a crawler to retry; a 404 tells it to drop the
  page) but worth a deliberate decision.

### Carried over verbatim from the previous session

**The series is "Team of One," not "The Founder's Library."** Decided 9 Oct 2026 in
`books-shared/series/SERIES-BIBLE.md`, which explicitly rejected the latter. The stale
name still sits in `broke-at-a-million`'s `CLAUDE.md` and `README`, so a fresh session
reading those will repeat the mistake. **That is a different repo and out of scope from
here** — recorded so it is not lost a second time. Nothing in billrice.com uses either
name; checked.

---

## Amazon author `sameAs` — done here, pending on BRSG <!-- 2026-08-06 -->

Bill created an Amazon Author Central page on 2026-08-06. Added to
`BILL_RICE_SAME_AS` as the canonical `https://www.amazon.com/stores/author/B0HCDKK6LQ`.
It is a profile that *is* Bill — same class as Medium and Substack — not a retail
destination; those stay in `src/lib/books.ts`.

This closes the gap the identity spec had carried since 2026-07-31 as its
**highest-value missing profile**: two published books and no author profile to point at.

**On the URL form.** Bill supplied the vanity `amazon.com/author/billricestrategy`. That
form 302s, and the page declares `rel=canonical` to the `/stores/author/` form, so the
canonical is what we list. Both were fetched and serve the same page.

**Verification took ~45 minutes and was worth waiting for.** The URL 404'd well past the
~30 minutes Bill expected. It was not added until it returned 200 *and* the body was
read — title "Amazon.com: Bill Rice: books, biography, latest update". `books.ts` already
carries the scar tissue for shipping an unverified Amazon URL, and a `sameAs` pointing at
a 404 is worse than an absent one: it asserts to a crawler that a nonexistent page is
this person.

Two traps for whoever re-verifies an Amazon URL by hand:

- **Amazon answers `HEAD` with 405.** A status-only check reads a live page as broken.
- **Repeated polling earns a 503.** That is throttling, not a dead page. Back off.

### Still to do — five BRSG copies

`identity.ts` is mirrored. Spec and this repo are done; the rest are **not**:

- [x] `~/Code/_shared-docs/bill-rice-identity.md` — spec updated, gap marked closed
- [x] `sites/personal/billrice.com/src/lib/identity.ts` — this repo (`c6aa5f1`)
- [ ] `sites/brsg/owned/billricestrategy.com/src/lib/identity.ts`
- [ ] `sites/brsg/owned/agedleadsales.com/lib/identity.ts` (note: `lib/`, not `src/lib/`)
- [ ] `sites/brsg/owned/proinvestorhub.com/src/lib/identity.ts`
- [ ] `sites/brsg/owned/leadcompliancehub.com/src/lib/identity.ts`
- [ ] `sites/brsg/owned/cryptolendinghub.com/src/lib/identity.ts`

Those five are a **different business scope** and should be done from a BRSG session, not
this one. The drift is additive rather than entity-splitting — the `@id` is identical
everywhere and `@id` is what merges the graph — so this is a reason not to panic, not a
reason to leave it.

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
