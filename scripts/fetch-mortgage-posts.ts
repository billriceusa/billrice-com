/**
 * Fetch the 2 mortgage KPI/metrics posts flagged for rewrite.
 * Read-only — prints title, excerpt, and portable-text body preview.
 *
 * Usage: npx tsx scripts/fetch-mortgage-posts.ts
 */

import { createClient } from 'next-sanity'

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('Missing SANITY_API_TOKEN')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'st1plnki',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-03-21',
  useCdn: false,
  token,
})

const ids = [
  'mortgage-lenders-measuring-wrong-kpis',
  '5-lead-generation-metrics-mortgage-lender-gets-wrong',
]

async function main() {
  for (const id of ids) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const doc = await client.fetch<any>(`*[_id == $id][0]`, { id })
    if (!doc) {
      console.log(`\n[NOT FOUND] ${id}`)
      continue
    }
    console.log(`\n=== ${doc._id} ===`)
    console.log('Title:', doc.title)
    console.log('Slug:', doc.slug?.current)
    console.log('PublishedAt:', doc.publishedAt)
    console.log('Excerpt:', doc.excerpt)
    console.log('\nBody (JSON):')
    console.log(JSON.stringify(doc.body, null, 2))
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
