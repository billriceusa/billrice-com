/**
 * Seed / update the singleton nowPage document in Sanity.
 *
 * Usage: npx tsx scripts/seed-now-page.ts
 *
 * Requires a write-access SANITY_API_TOKEN in the environment. tsx does not read
 * .env.local -- see scripts/sanity-client.ts for the invocation that works.
 * Safe to re-run — upserts by _id = "nowPage".
 *
 * The copy lives in src/lib/now.ts, not here. /now renders that same content
 * when Sanity does not answer, and keeping one copy is the only way the page
 * and the dataset cannot end up saying different things. This file is just the
 * portable-text adapter.
 *
 * It also deletes any OTHER nowPage document. There were two in the dataset as
 * of 2026-10-11 — the canonical `nowPage` and a stray UUID one — and
 * NOW_PAGE_QUERY takes `[0]` with no ordering, so which one a reader got was
 * not defined. A singleton with a duplicate is not a singleton.
 */

import { sanityScriptClient } from './sanity-client'
import { randomUUID } from 'crypto'
import {
  NOW_CONSULTING_AVAILABILITY,
  NOW_LAST_UPDATED,
  NOW_PRIORITIES,
  NOW_SPEAKING_TOPICS,
  type NowSegment,
} from '../src/lib/now'

const client = sanityScriptClient()

const CANONICAL_ID = 'nowPage'

/** Build a block-content paragraph from plain text with optional link spans. */
function paragraph(segments: NowSegment[]) {
  const markDefs: Array<{ _key: string; _type: 'link'; href: string }> = []
  const children = segments.map((seg) => {
    if (typeof seg === 'string') {
      return { _type: 'span', _key: randomUUID(), text: seg, marks: [] as string[] }
    }
    const key = randomUUID()
    markDefs.push({ _key: key, _type: 'link', href: seg.href })
    return { _type: 'span', _key: randomUUID(), text: seg.text, marks: [key] }
  })
  return { _type: 'block', _key: randomUUID(), style: 'normal', markDefs, children }
}

const doc = {
  _id: CANONICAL_ID,
  _type: 'nowPage',
  lastUpdated: NOW_LAST_UPDATED,
  priorities: NOW_PRIORITIES.map((p) => ({
    _key: randomUUID(),
    title: p.title,
    description: [paragraph(p.body)],
  })),
  speakingTopics: [...NOW_SPEAKING_TOPICS],
  consultingAvailability: NOW_CONSULTING_AVAILABILITY,
}

async function main() {
  console.log(`Upserting nowPage document (_id: ${CANONICAL_ID})...`)
  const result = await client.createOrReplace(doc)
  console.log('✓ Seeded:', result._id, 'lastUpdated:', result.lastUpdated)

  const strays: string[] = await client.fetch(
    `*[_type == "nowPage" && _id != $id]._id`,
    { id: CANONICAL_ID }
  )
  if (strays.length === 0) {
    console.log('✓ No duplicate nowPage documents.')
    return
  }
  console.log(`Deleting ${strays.length} duplicate nowPage document(s): ${strays.join(', ')}`)
  for (const id of strays) {
    await client.delete(id)
  }
  console.log('✓ Duplicates removed — /now now has one defined source.')
}

main().catch((err) => {
  console.error('Failed to seed nowPage:', err)
  process.exit(1)
})
