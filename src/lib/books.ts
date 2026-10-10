/**
 * Canonical retail destinations for Bill's books.
 *
 * Defined once because they were not: the same Amazon ASIN was hardcoded in
 * three places, went dead, and every copy silently 404'd on the buy button.
 *
 * ASINs are not stable across a republish. When a listing moves, verify the
 * new URL returns 200 before changing it here — a 404 on this constant is a
 * dead buy button on the canonical identity property.
 *
 * Verified 2026-07-31: B0G6S3GCX5 resolves to "The Lead Buyer's Playbook:
 * How to Turn Third-Party Leads Into a Predictable Revenue Engine"
 * (ISBN 9798994221006). The prior value B0DRBK6QJZ returned Page Not Found.
 */

/** The Lead Buyer's Playbook on Amazon. */
export const AMAZON_LBP_URL = 'https://www.amazon.com/dp/B0G6S3GCX5'

/** Sales Team of One is not on Amazon yet — free chapters only. */
export const AMAZON_STOO_URL = null

/**
 * The Lead Buyer's Playbook's slug in Sanity.
 *
 * /book is pinned to this one book rather than to "whichever book comes first".
 * It is in the main nav, the sitemap and llms.txt, and its metadata, canonical
 * tag and Book JSON-LD all name the Playbook specifically, so it must keep
 * resolving to the Playbook once Sales Team of One and the third book get
 * documents of their own. The library at /books is the page that grows.
 *
 * UNVERIFIED against the dataset: this value could not be read back when it was
 * added (2026-10-10) because the Sanity API is not reachable from the
 * environment it was written in. If it does not match the Playbook document's
 * slug, /book quietly serves its hardcoded fallbacks instead of Sanity content
 * — the same page a reader gets today, so the failure is invisible rather than
 * broken. Confirm it against the dataset and delete this paragraph.
 */
export const LEAD_BUYERS_PLAYBOOK_SLUG = 'the-lead-buyers-playbook'
