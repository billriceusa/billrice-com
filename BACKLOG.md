# billrice.com Backlog

## Planned: Migrate to Next.js + Sanity.io Architecture

**Priority:** Medium
**Status:** Backlog
**Target:** TBD

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

1. **Create Sanity project** for billrice.com (or add a dataset to an existing project like Verified Vector / `m8s1spuc`)
2. **Define schemas**: Page, Project, Company, Tool, Playbook, Book, SiteSettings
3. **Migrate static content** from `page.tsx` and `now/page.tsx` into Sanity documents
4. **Update Next.js pages** to fetch content via GROQ queries instead of hardcoded JSX
5. **Set up Sanity Studio** (embedded or standalone)
6. **Preserve SEO**: structured data, meta tags, sitemap generation from Sanity content
7. **Deploy**: Vercel with Sanity webhook for ISR/on-demand revalidation

### Notes

- The site is small (3 pages + API route), so this is a lightweight migration
- Could potentially share a Sanity project with Verified Vector or BRSG
- Consider adding a blog/articles section during migration to support SEO and content marketing for the personal brand
