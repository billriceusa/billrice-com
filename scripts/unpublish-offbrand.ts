/**
 * Unpublish off-brand banking / RegTech posts from the blog feed.
 *
 * Usage: npx tsx scripts/unpublish-offbrand.ts
 *
 * Sets publishedAt to null on the listed docs so they no longer appear in
 * POSTS_QUERY (which filters `publishedAt <= now()`). Documents are not
 * deleted — safe to re-publish later by setting publishedAt back.
 *
 * Requires SANITY_API_TOKEN in .env.local.
 */

import { createClient } from 'next-sanity'

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('Missing SANITY_API_TOKEN in environment. Set it in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'st1plnki',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-03-21',
  useCdn: false,
  token,
})

// Docs audited 2026-04-15. Off-brand for personal site — industry infrastructure
// / banking RegTech pieces, not Bill Rice's personal voice.
const offBrandIds = [
  '24-trillion-mortgage-infrastructure-obsolete-2029',
  'compliance-automation-stack',
  '847b-legacy-core-banking-migration-crisis',
  'legacy-core-banking-migration-ainative-architecture',
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
