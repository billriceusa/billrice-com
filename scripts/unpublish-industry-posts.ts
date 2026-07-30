/**
 * Unpublish the machine-drafted industry posts from billrice.com.
 *
 * Usage: npx tsx scripts/unpublish-industry-posts.ts
 *
 * Context (2026-07-30, Bill's call): billrice.com is the canonical record on
 * Bill Rice, for humans and for machines. A post that was never held to that
 * standard is not neutral on this domain — it becomes the cited source. These
 * ten were drafted by an agent, staged with staggered `publishedAt`, and went
 * live on a Sanity time-gate between 2026-04-20 and 2026-05-11 without the
 * review pass the plan called for.
 *
 * What stays: the seven first-person pieces (six Career Stories + the SpringEQ
 * launch account) move to /essays.
 *
 * Sets publishedAt to null so the docs drop out of POSTS_QUERY (which filters
 * `publishedAt <= now()`). Documents are NOT deleted — re-publishable by
 * setting publishedAt back. Same reversible pattern as unpublish-offbrand.ts.
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

// Audited 2026-07-30 against content/blog-content-plan.md and the project
// memory, both of which record these as "awaiting Bill's review" before they
// were scheduled to auto-publish.
const industryPostIds = [
  // Predate the April editorial plan; rewritten by script 2026-04-15 but never
  // re-reviewed. `5-lead-generation-metrics` is the clearest case for removal:
  // it states "In 2002, I went to Quicken Loans" (canonical: 2004, and as Rock
  // Bank COO first) and "that 25-year stretch" (canonical: 30+ years) — the
  // exact two errors third-party bios of Bill keep making.
  'mortgage-lenders-measuring-wrong-kpis',
  '5-lead-generation-metrics-mortgage-lender-gets-wrong',

  // The P2/P3 industry set — staged 2026-04-15, auto-published on a time-gate.
  'post-lead-buyers-framework',
  'post-30-years-fintech-gtm-lessons',
  'post-why-i-build-niche-authority-sites',
  'post-lead-management-vs-crm',
  'post-ai-in-mortgage-marketing-real-state',
  'post-aged-lead-opportunity',
  'post-fintech-marketing-is-not-saas-marketing',
  'post-what-i-look-for-advising-fintech',
]

async function main() {
  console.log(`Unpublishing ${industryPostIds.length} industry posts...\n`)

  let unpublished = 0
  let missing = 0

  for (const id of industryPostIds) {
    const doc = await client.fetch<{ _id: string; title: string; publishedAt: string | null } | null>(
      `*[_id == $id][0]{ _id, title, publishedAt }`,
      { id }
    )

    if (!doc) {
      console.warn(`  ??  ${id} — not found, skipping`)
      missing++
      continue
    }

    if (!doc.publishedAt) {
      console.log(`  --  ${id} — already unpublished`)
      continue
    }

    await client.patch(id).set({ publishedAt: null }).commit()
    console.log(`  OK  ${id}`)
    console.log(`      "${doc.title}"`)
    unpublished++
  }

  const remaining = await client.fetch<Array<{ slug: string; publishedAt: string }>>(
    `*[_type == "post" && defined(slug.current) && publishedAt <= now()]
     | order(publishedAt asc){ "slug": slug.current, publishedAt }`
  )

  console.log(`\nUnpublished ${unpublished}, already clear ${industryPostIds.length - unpublished - missing}, not found ${missing}`)
  console.log(`\n${remaining.length} posts remain published:`)
  for (const p of remaining) {
    console.log(`  ${p.publishedAt.slice(0, 10)}  ${p.slug}`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
