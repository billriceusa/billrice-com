/**
 * Canonical Bill Rice identity — the single source of truth for entity markup.
 *
 * THIS FILE IS MIRRORED across every property Bill owns. The spec lives at
 * ~/Code/_shared-docs/bill-rice-identity.md. Change the spec, then change every
 * copy — a divergent copy silently splits the entity back apart.
 *
 * The model:
 *   1. ONE URI for the person (BILL_RICE_ID), used as @id on every domain.
 *      @id is a URI, not a URL that must live on the emitting host — reusing
 *      billrice.com/#person everywhere is what merges the graph.
 *   2. billrice.com holds the authoritative DESCRIPTION (bio, occupations,
 *      education, worksFor, author). Every other site emits a reference node.
 *   3. sameAs is identity ONLY — accounts that *are* Bill Rice. A site he owns
 *      is a relationship (worksFor / founder / author), never a sameAs.
 *   4. Never inline an anonymous Person. author/founder/publisher reference
 *      { "@id": BILL_RICE_ID }.
 */

/** One URI for the person, on every domain. Never re-mint this per site. */
export const BILL_RICE_ID = 'https://billrice.com/#person'

/** The person's own canonical page — schema.org `url`, not a sameAs entry. */
export const BILL_RICE_URL = 'https://billrice.com'

/**
 * Identity profiles only. First five verified 2026-07-29:
 *  - Wikidata Q139037772 "Bill Rice, American marketing strategist and lead
 *    generation expert", official website billrice.com. The strongest
 *    disambiguator in the set — an authority-controlled entity ID.
 *  - LinkedIn /in/billrice is canonical. /in/billricemortgage has no evidence
 *    of existing and must never be reintroduced.
 *  - YouTube channel UCybXcF5WUxxwjhefKItztsA resolves to this same handle.
 *
 * Substack verified and added 2026-07-31. It earns its slot for a specific
 * reason: theleadbrief.com is a Substack, and every post there emits an
 * anonymous Person for Bill — no @id, stale description — that we cannot
 * edit. Profile user 62504742 matches the identifier in that node, so this
 * entry is the only edge tying it back to this entity.
 *
 * Amazon Author Central verified and added 2026-08-06. Bill supplied the vanity
 * URL amazon.com/author/billricestrategy; that form 302s, and the page itself
 * declares rel=canonical amazon.com/stores/author/B0HCDKK6LQ, so the canonical
 * is what goes here. Both forms were fetched and return the same page, titled
 * "Amazon.com: Bill Rice: books, biography, latest update".
 *
 * This is a profile that IS Bill, so it belongs in sameAs. The Amazon *product*
 * pages for his books are a different thing entirely and live in
 * src/lib/books.ts — a retail destination is not an identity.
 *
 * Two traps if you ever re-verify these by hand:
 *  - Amazon answers HEAD with 405. Check with GET and a browser UA or you will
 *    read a live page as broken.
 *  - Repeated polling earns a 503. Back off; it is throttling, not a dead page.
 */
export const BILL_RICE_SAME_AS = [
  'https://www.wikidata.org/wiki/Q139037772',
  'https://www.linkedin.com/in/billrice/',
  'https://x.com/billrice',
  'https://www.youtube.com/@billricestrategy',
  'https://medium.com/@billrice',
  'https://substack.com/@billrice',
  'https://www.amazon.com/stores/author/B0HCDKK6LQ',
] as const

/**
 * The reference node every site EXCEPT billrice.com emits. Small on purpose:
 * enough to identify and consolidate on a single-page crawl, not a competing
 * description of the person.
 */
export const billRicePersonRef = {
  '@type': 'Person',
  '@id': BILL_RICE_ID,
  name: 'Bill Rice',
  url: BILL_RICE_URL,
  sameAs: [...BILL_RICE_SAME_AS],
}

/** Reference-by-id, for author / founder / publisher slots. */
export const billRiceRef = { '@id': BILL_RICE_ID }
