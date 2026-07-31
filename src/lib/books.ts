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
