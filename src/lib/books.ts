/**
 * Canonical record of Bill's books and the series they belong to.
 *
 * Defined once because they were not: the same Amazon ASIN was hardcoded in
 * three places, went dead, and every copy silently 404'd on the buy button.
 * The same thing was starting to happen to the subtitles — see the note on
 * LEAD_BUYERS_PLAYBOOK below.
 *
 * ASINs are not stable across a republish. When a listing moves, verify the
 * new URL returns 200 before changing it here — a 404 on this constant is a
 * dead buy button on the canonical identity property.
 *
 * Two traps if you re-verify these by hand:
 *  - Amazon answers HEAD with 405. Check with GET and a browser UA or you will
 *    read a live page as broken.
 *  - Repeated polling earns a 503. Back off; it is throttling, not a dead page.
 */

/**
 * The series. Name decided 9 Oct 2026 in books-shared/series/SERIES-BIBLE.md,
 * which is the governing document — *The Founder's Library* and *The Solo
 * Operator* were considered and rejected there. Do not reintroduce either.
 *
 * It is a LIBRARY, not a sequence: no reading order, every volume opens cold
 * and assumes nothing from the others. That is why no node here carries a
 * `position` — implying an order is the one thing the model exists to refuse.
 *
 * Eight volumes are planned. Only the ones with a public commitment appear in
 * BOOKS; an unannounced title is not a fact about the person yet.
 */
export const SERIES_NAME = 'Team of One'
export const SERIES_ID = 'https://billrice.com/#series-team-of-one'
export const SERIES_PLANNED_VOLUMES = 8

/** Where a book is in the world. Drives CTA copy and whether we emit an offer. */
export type BookStatus = 'published' | 'preorder' | 'in-development'

export type Book = {
  /** Stable key for @id minting and React keys. Never reuse one. */
  id: string
  title: string
  /** Omitted when the real subtitle is not settled — see BROKE_AT_A_MILLION. */
  subtitle?: string
  status: BookStatus
  /** The book's own site. Canonical URL for its Book node. */
  url: string
  /** Full text free to read online, where that is offered. */
  freeReadUrl?: string
  /** Retail. null when there is no listing to point at yet. */
  amazonUrl: string | null
  /** ISO 8601, as precise as is actually known. Absent until a date is real. */
  datePublished?: string
  /** Pre-order only: the announced release date, from the live listing. */
  releaseDate?: string
  /** Pre-order only: price as listed, for schema offers. */
  priceUsd?: number
  isbn?: string
  /** Whether this title sits inside SERIES_NAME. The Playbook does not. */
  inSeries: boolean
  /** One line, in Bill's framing of the constraint the book addresses. */
  blurb: string
}

/**
 * Verified 2026-07-31, re-verified 2026-10-10: B0G6S3GCX5 resolves to the
 * paperback, ISBN 9798994221006. The Kindle edition is a different ASIN
 * (B0G8LS1BCC) reached through the same listing, so this one URL covers both.
 *
 * NOTE ON THE SUBTITLE. The published subtitle is "How to Turn Third-Party
 * Leads Into a Predictable Revenue Engine" — that is what is on the cover, the
 * Amazon listing and the Author Central page. "The Enterprise Guide to Buying
 * and Converting Leads Profitably" was an earlier working subtitle that
 * outlived the book and had been copied into five places on this site. It is
 * not an alternateName; it is wrong. Do not put it back.
 */
export const AMAZON_LBP_URL = 'https://www.amazon.com/dp/B0G6S3GCX5'

export const LEAD_BUYERS_PLAYBOOK: Book = {
  id: 'lead-buyers-playbook',
  title: "The Lead Buyer's Playbook",
  subtitle: 'How to Turn Third-Party Leads Into a Predictable Revenue Engine',
  status: 'published',
  url: 'https://leadbuyersplaybook.com/',
  freeReadUrl: 'https://leadbuyersplaybook.com/',
  amazonUrl: AMAZON_LBP_URL,
  datePublished: '2025-11',
  isbn: '9798994221006',
  inSeries: false,
  blurb:
    'The systems book for companies buying third-party leads at volume — validation, vendor portfolio risk, true cost per lead, and the operational architecture that turns bought data into pipeline.',
}

/**
 * Pre-order verified 2026-10-10 on Author Central: Kindle ASIN B0HMFQ2C9G,
 * $9.99, "This title will be released on October 20, 2026."
 *
 * This constant was `null` with the comment "not on Amazon yet — free chapters
 * only" until the listing went up. Flip `status` to 'published' on release and
 * drop releaseDate; the offer node keys off status, so nothing else changes.
 */
export const AMAZON_STOO_URL = 'https://www.amazon.com/dp/B0HMFQ2C9G'

export const SALES_TEAM_OF_ONE: Book = {
  id: 'sales-team-of-one',
  title: 'Sales Team of One',
  subtitle: 'How to Stay Irreplaceable When AI Comes for the Sales Team',
  status: 'preorder',
  url: 'https://salesteamofone.com/',
  freeReadUrl: 'https://salesteamofone.com/read/introduction',
  amazonUrl: AMAZON_STOO_URL,
  releaseDate: '2026-10-20',
  priceUsd: 9.99,
  inSeries: true,
  blurb:
    'The sales org that used to feed a seller is collapsing into software. The one edge a machine cannot counterfeit is a person who went genuinely deep on something — and this is how you build that, then wield the machine with it.',
}

/**
 * Book two of Team of One, in development. brokeatamillion.com is registered
 * (10 Oct 2026) but not yet serving the book.
 *
 * DELIBERATELY NO SUBTITLE. The candidate — "Why Your Best Year Takes All Your
 * Cash, and the Five Numbers That Warn You" — is marked PROPOSED and "STILL
 * NEEDS BILL'S RULING" in broke-at-a-million/src/lib/site.ts. Publishing an
 * unratified subtitle to the canonical identity record is how a wrong string
 * ends up in every downstream citation, which is exactly what happened to the
 * Playbook. Add it here once Bill rules, not before.
 *
 * Also absent on purpose: datePublished and isbn. The copyright year in the
 * manuscript is a 2027 placeholder and no ISBN has been pulled from the Bowker
 * block. A forthcoming book with no date is honest; a guessed date is not.
 */
export const BROKE_AT_A_MILLION: Book = {
  id: 'broke-at-a-million',
  title: 'Broke at a Million',
  status: 'in-development',
  url: 'https://brokeatamillion.com',
  amazonUrl: null,
  inSeries: true,
  blurb:
    'Your best year on record and eleven days of payroll in the bank. Both are true at once, and from the inside they feel identical to doing well. Five numbers, read against each other every week, tell you which one you are living in.',
}

/** Reverse-chronological by public commitment: shipped, shipping, being written. */
export const BOOKS: readonly Book[] = [
  LEAD_BUYERS_PLAYBOOK,
  SALES_TEAM_OF_ONE,
  BROKE_AT_A_MILLION,
] as const

/** The @id for a book's schema.org node. Stable across title edits. */
export function bookNodeId(book: Book): string {
  return `${book.url.replace(/\/$/, '')}/#book`
}

/** Books that are out or orderable — what "author of" can point a reader at. */
export const AVAILABLE_BOOKS = BOOKS.filter((b) => b.status !== 'in-development')
