# billrice.com Backlog

## Phase 1: Sanity.io Architecture Migration

**Priority:** High
**Status:** In Progress

### Overview

Migrate billrice.com from a static Next.js site (all content hardcoded in `.tsx` files) to a Next.js + Sanity.io CMS architecture, consistent with the rest of the portfolio:

- **ProInvestorHub.com** — Next.js + Sanity (project: `eytfm25g`)
- **CryptoLendingHub.com** — Next.js + Sanity (project: `h7wh2wa3`)
- **AgedLeadSales.com** — Next.js + Sanity
- **BillRiceStrategy.com** — Next.js + Sanity

### Why

- Content updates currently require code changes and redeployment
- No ability to manage content from a CMS dashboard
- Inconsistent architecture across the portfolio makes maintenance harder
- Sanity enables structured content, image optimization, and preview workflows

### Scope

1. **Create dedicated Sanity project** for billrice.com (personal brand deserves its own content space)
2. **Define schemas**: Page, Post, Project, Company, Tool, Playbook, Book, Author, Category, SiteSettings
3. **Set up Sanity Studio** (embedded at `/studio`)
4. **Migrate static content** from `page.tsx` and `now/page.tsx` into Sanity documents
5. **Update Next.js pages** to fetch content via GROQ queries instead of hardcoded JSX
6. **Preserve SEO**: structured data, meta tags, sitemap generation from Sanity content
7. **Deploy**: Vercel with Sanity webhook for ISR/on-demand revalidation

---

## Phase 2: Blog / Articles Section

**Priority:** High
**Status:** Backlog
**Depends on:** Phase 1

### Why

- billrice.com currently has zero indexable content pages beyond homepage and /now
- Need a place for thought leadership that doesn't fit the niche sites
- Create internal links to portfolio sites (AgedLeadSales, ProInvestorHub, CryptoLendingHub)
- Support the book with companion content (chapter deep dives, case studies)
- Strengthen personal brand SEO

### Scope

1. **Post schema** with portable text, categories, featured image, SEO fields
2. **Blog index page** at `/blog` with pagination
3. **Individual post pages** at `/blog/[slug]`
4. **Category pages** at `/blog/category/[slug]`
5. **Author page** (single author site, but needed for structured data)
6. **RSS feed** generation from Sanity content

---

## Phase 3: Dedicated Book Page

**Priority:** High
**Status:** Backlog
**Depends on:** Phase 1

### Why

- The book is currently just a section on the homepage — not shareable or SEO-friendly
- A dedicated `/book` route supports chapter previews, testimonials, and multiple purchase options
- Better landing page for social sharing and marketing campaigns

### Scope

1. **Book schema** in Sanity with chapters, description, purchase links, testimonials
2. **Dedicated `/book` or `/lead-buyers-playbook` page**
3. **Chapter preview sections** with expandable content
4. **Purchase CTAs** (Amazon, free online edition)
5. **Schema.org Book structured data** on dedicated page
6. **Cross-link** from blog posts, homepage, and /now page

---

## Phase 4: Project Detail Pages

**Priority:** Medium
**Status:** Backlog
**Depends on:** Phase 1

### Why

- Projects currently only have cards with external links
- Richer project pages make billrice.com a proper portfolio
- Each project page can include descriptions, screenshots, results, and the story behind the project
- Better for SEO — more indexable content tied to your name

### Scope

1. **Project schema** in Sanity with rich description, screenshots, tech stack, URL, status
2. **Project index page** at `/projects`
3. **Individual project pages** at `/projects/[slug]`
4. **Company detail pages** at `/companies/[slug]` (Kaleidico, BRSG, Verified Vector)
5. **Cross-linking** between blog posts and related projects
