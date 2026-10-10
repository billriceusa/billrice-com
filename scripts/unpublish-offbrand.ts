/**
 * Unpublish off-brand banking / RegTech posts from the blog feed.
 *
 * Usage: npx tsx scripts/unpublish-offbrand.ts
 *
 * Sets publishedAt to null on the listed docs so they no longer appear in
 * POSTS_QUERY (which filters `publishedAt <= now()`). Documents are not
 * deleted — safe to re-publish later by setting publishedAt back.
 *
 * Requires a write-access SANITY_API_TOKEN in the environment. tsx does not read
 * .env.local -- see scripts/sanity-client.ts for the invocation that works.
 */

import { sanityScriptClient } from './sanity-client'

const client = sanityScriptClient()

const offBrandIds = [
  // Audited 2026-07-28. Machine-generated posts published 08:04 UTC on a schedule,
  // outside the editorial plan. Off-brand for the personal hub: DeFi / post-scarcity
  // speculation, unsourced statistics, expiring hard-dated predictions, and one
  // biographical claim that contradicts the canonical career record.
  'ive-originated-500m-loansheres-current-ai-underwriting',
  'last-mile-problem-defi-lending',
  'mortgage-company-building-legacy-rails-burning-investor',
  'q1-2027',
  'q3-2026',
  'q4-2026',
]

async function main() {
  for (const id of offBrandIds) {
    console.log(`Unpublishing ${id}...`)
    try {
      await client.patch(id).unset(['publishedAt']).commit()
      console.log(`  ✓ publishedAt cleared`)
    } catch (err) {
      console.error(`  ✗ Failed for ${id}:`, err)
    }
  }
  console.log(`\nDone. ${offBrandIds.length} posts removed from blog feed (not deleted).`)
  console.log('Kept published for rewrite:')
  console.log('  - mortgage-lenders-measuring-wrong-kpis')
  console.log('  - 5-lead-generation-metrics-mortgage-lender-gets-wrong')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
