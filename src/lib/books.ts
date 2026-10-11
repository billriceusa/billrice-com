/**
 * The canonical record of Bill's books.
 *
 * This file started as two Amazon URLs, defined once because they were not: the
 * same ASIN was hardcoded in three places, went dead, and every copy silently
 * 404'd on the buy button. It is now the whole book registry, for the same
 * reason — the homepage cards, the /book library and each book's own page were
 * each carrying their own copy of the titles, subtitles and CTA text, and they
 * had already drifted.
 *
 * ASINs are not stable across a republish. When a listing moves, verify the new
 * URL returns 200 before changing it here — a 404 on one of these constants is
 * a dead buy button on the canonical identity property.
 */

/** The Lead Buyer's Playbook on Amazon. Verified 200 on 2026-10-11. */
export const AMAZON_LBP_URL = 'https://www.amazon.com/dp/B0G6S3GCX5'

/**
 * Sales Team of One on Amazon. Added 2026-10-11, verified 200: Kindle edition,
 * $9.99, ASIN B0HMFQ2C9G. Listed as a pre-order until the release date below.
 *
 * The URL Amazon hands you from a search carries a long tracking query string.
 * Only the /dp/<asin> form is stored here — the rest is session noise and makes
 * the canonical record unreadable.
 */
export const AMAZON_STOO_URL = 'https://www.amazon.com/dp/B0HMFQ2C9G'

/**
 * Sales Team of One's release date, and the only thing the buy CTA keys off.
 *
 * Before this date the button reads "Pre-order on Amazon"; from this date it
 * reads "Buy on Amazon". The pages revalidate hourly, so the copy flips itself
 * without a deploy — which matters because launch day is the day nobody is
 * free to go and edit a button.
 */
export const SALES_TEAM_OF_ONE_RELEASE = '2026-10-20'

export type BookChapter = {
  number: number
  title: string
  description: string
}

export type BookEntry = {
  slug: string
  title: string
  subtitle: string
  /** One paragraph, used on the homepage card and the book's own page. */
  blurb: string
  cover: { src: string; width: number; height: number; alt: string }
  amazonUrl: string | null
  /** Where the free edition or sample lives. Off-domain by design. */
  freeReadUrl: string | null
  freeReadLabel: string
  /** ISO date. Compared against today to decide pre-order vs buy. */
  releaseDate: string
  chapters: BookChapter[]
}

/**
 * The Lead Buyer's Playbook.
 *
 * The subtitle here is the PUBLISHED one. Both Sanity and this file previously
 * carried "The Enterprise Guide to Buying and Converting Leads Profitably",
 * which the book itself superseded. Corrected 2026-10-11 against three
 * independent sources that agree: the cover art on leadbuyersplaybook.com, the
 * Amazon listing for B0G6S3GCX5, and ISBN 9798994221006. The Sanity document
 * still carries the old one and needs the patch in
 * scripts/patch-book-subtitle.ts.
 *
 * Chapters are the real fifteen, read out of Sanity on 2026-10-11. The book
 * page shows the first few as a teaser rather than the full table of contents.
 */
const leadBuyersPlaybook: BookEntry = {
  slug: 'lead-buyers-playbook',
  title: "The Lead Buyer's Playbook",
  subtitle: 'How to Turn Third-Party Leads Into a Predictable Revenue Engine',
  blurb:
    'Stop treating lead generation as a procurement problem. The systematic approach that turns lead buying from a cost center into a competitive advantage — vendor selection, lead quality, speed to lead, aged leads, compliance, and unit economics.',
  cover: {
    src: '/lead-buyers-playbook-cover.jpg',
    width: 528,
    height: 860,
    alt: "Cover of The Lead Buyer's Playbook by Bill Rice",
  },
  amazonUrl: AMAZON_LBP_URL,
  freeReadUrl: 'https://leadbuyersplaybook.com',
  freeReadLabel: 'Read the free web edition',
  releaseDate: '2025-11-01',
  chapters: [
    { number: 1, title: 'The Lead Buying Landscape', description: 'Understanding the modern lead marketplace and why traditional approaches fail' },
    { number: 2, title: 'Strategic Foundations', description: 'Building the framework for profitable lead acquisition' },
    { number: 3, title: 'Vendor Selection & Management', description: 'How to evaluate, negotiate with, and manage lead vendors' },
    { number: 4, title: 'Lead Quality Frameworks', description: 'Measuring and improving the quality of purchased leads' },
    { number: 5, title: 'Contact Strategy Design', description: 'Designing multi-touch contact strategies that convert' },
    { number: 6, title: 'Speed to Lead', description: 'Why response time is the single biggest conversion factor' },
    { number: 7, title: 'Sales Script Architecture', description: 'Building scripts that work for purchased leads specifically' },
    { number: 8, title: 'Aged Lead Strategy', description: 'Extracting maximum value from aged and recycled leads' },
    { number: 9, title: 'Technology Stack', description: 'CRM, dialers, and automation for lead buying operations' },
    { number: 10, title: 'Compliance & Risk', description: 'TCPA, DNC, and regulatory compliance for lead buyers' },
    { number: 11, title: 'Financial Modeling', description: 'Unit economics, ROI tracking, and budget optimization' },
    { number: 12, title: 'Team Structure', description: 'Hiring, training, and managing a lead conversion team' },
    { number: 13, title: 'Scaling Operations', description: 'Growing from hundreds to thousands of leads per month' },
    { number: 14, title: 'Advanced Strategies', description: 'Exclusive leads, co-registration, and hybrid models' },
    { number: 15, title: 'Where This Is Heading', description: 'AI, intent data, and where the industry is heading' },
  ],
}

/**
 * Sales Team of One.
 *
 * Written in the open at salesteamofone.com, which hosts the full draft free.
 * No chapter list here on purpose: the site publishes the chapters but no
 * machine-readable table of contents, and inventing chapter titles for a book
 * on this domain is exactly the kind of unreviewed content the blog was retired
 * over. Add them from the manuscript when there is a real list to copy.
 */
const salesTeamOfOne: BookEntry = {
  slug: 'sales-team-of-one',
  title: 'Sales Team of One',
  subtitle: 'How to Stay Irreplaceable When AI Comes for the Sales Team',
  blurb:
    'The sales org that used to feed a seller — SDRs, marketing, ops, enablement — is being automated out from under the people standing on it. There is one safe seat left: be the whole team yourself, and wield the very thing that is coming for everyone else.',
  cover: {
    src: '/sales-team-of-one-cover.jpg',
    width: 800,
    height: 1280,
    alt: 'Cover of Sales Team of One by Bill Rice',
  },
  amazonUrl: AMAZON_STOO_URL,
  freeReadUrl: 'https://salesteamofone.com',
  freeReadLabel: 'Read the chapters free',
  releaseDate: SALES_TEAM_OF_ONE_RELEASE,
  chapters: [],
}

/** Newest first. The library and the homepage cards both read this order. */
export const BOOKS: BookEntry[] = [salesTeamOfOne, leadBuyersPlaybook]

/** The Playbook's slug in Sanity. Verified against the dataset 2026-10-11. */
export const LEAD_BUYERS_PLAYBOOK_SLUG = leadBuyersPlaybook.slug

export function getBook(slug: string): BookEntry | undefined {
  return BOOKS.find((b) => b.slug === slug)
}

/**
 * Has the book come out yet?
 *
 * Compared date-only, in UTC, so the answer does not depend on the server's
 * timezone — a release is a calendar date, not an instant.
 */
export function isReleased(book: BookEntry, now: Date = new Date()): boolean {
  return now.toISOString().slice(0, 10) >= book.releaseDate
}

/** "Buy on Amazon" once it is out, "Pre-order on Amazon" until then. */
export function buyLabel(book: BookEntry, now: Date = new Date()): string {
  return isReleased(book, now) ? 'Buy on Amazon' : 'Pre-order on Amazon'
}

/** The eyebrow above each card: "Published · …" or "Pre-order · releases …". */
export function statusLabel(book: BookEntry, now: Date = new Date()): string {
  const formatted = new Date(`${book.releaseDate}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  })
  return isReleased(book, now) ? `Published · ${formatted}` : `Pre-order · releases ${formatted}`
}
