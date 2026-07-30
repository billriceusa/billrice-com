/**
 * Fold Bill's 2026-07-30 answers into the EquityOnline essay and the aboutPage.
 *
 * Usage: npx tsx scripts/apply-rock-bank-and-mba.ts [--dry]
 *
 * Two corrections, both from Bill directly:
 *
 * 1. The Rock Bank story. The essay had "This wasn't to be - a story for
 *    another time," deferring the one detail that explains the whole pivot.
 *    Bill's account: he led the effort to get an OTS charter; Dan Gilbert
 *    wanted to own a professional sports franchise; the Office of Thrift
 *    Supervision was not comfortable with that adjacent risk next to a bank
 *    charter; Gilbert turned down the bank. That is what moved Bill to VP of
 *    National Home Equity and produced EquityOnline.
 *
 * 2. The MBA year. Canonical was 2003 across every surface. Bill: "2004-2005
 *    is the right span... awarded my MBA around 2004." 2003 predates his
 *    Quicken tenure, so the old value contradicted the narrative it sat inside.
 *
 * Idempotent, and exits non-zero if a target block can't be found so a missed
 * edit can't pass for a clean run.
 *
 * Requires SANITY_API_TOKEN in .env.local.
 */

import { createClient } from 'next-sanity'
import { randomUUID } from 'node:crypto'

const dryRun = process.argv.includes('--dry')

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

const POST_ID = 'post-building-equityonline-quicken-loans'

const ROCK_BANK_ANCHOR = "This wasn't to be - a story for another time."

const ROCK_BANK_PARAGRAPHS = [
  "I joined as the COO of the Rock Bank project, with the vision of giving Quicken Loans a federally chartered bank to stabilize funding for unlimited loan origination growth. I led the effort to get an OTS charter.",
  "It died on an adjacent risk. Dan Gilbert wanted to own a professional sports franchise, and the Office of Thrift Supervision was not comfortable with that sitting next to a bank charter. It was one or the other, and Dan turned down the bank.",
  "That's what opened the door to the other thing I know how to do: build consumer-direct online lending platforms. Swapping titles to Vice President of National Home Equity, my new mission was to design and build EquityOnline — Quicken Loans' first true online lending and offer platform.",
]

type Block = {
  _key?: string
  _type: string
  style?: string
  markDefs?: unknown[]
  children?: Array<{ _key?: string; _type?: string; text?: string; marks?: string[] }>
}

function paragraph(text: string): Block {
  return {
    _key: randomUUID().replace(/-/g, '').slice(0, 12),
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [
      {
        _key: randomUUID().replace(/-/g, '').slice(0, 12),
        _type: 'span',
        text,
        marks: [],
      },
    ],
  }
}

function blockText(b: Block): string {
  return (b.children || []).map((c) => c.text ?? '').join('')
}

async function main() {
  const failures: string[] = []

  // ── 1. The essay ────────────────────────────────────────────────
  const post = await client.fetch<{ _id: string; body: Block[] } | null>(
    `*[_id == $id][0]{ _id, body }`,
    { id: POST_ID }
  )
  if (!post) {
    console.error(`!! ${POST_ID} not found`)
    process.exit(1)
  }

  const body = post.body || []
  let bodyChanged = false

  const anchorIdx = body.findIndex((b) => b._type === 'block' && blockText(b).includes(ROCK_BANK_ANCHOR))

  if (anchorIdx >= 0) {
    body.splice(anchorIdx, 1, ...ROCK_BANK_PARAGRAPHS.map(paragraph))
    console.log(`OK  Rock Bank: replaced block [${anchorIdx}] with ${ROCK_BANK_PARAGRAPHS.length} paragraphs`)
    bodyChanged = true
  } else if (body.some((b) => b._type === 'block' && blockText(b).includes('Dan turned down the bank'))) {
    console.log('--  Rock Bank: already applied')
  } else {
    console.error(`!! Rock Bank: anchor not found — "${ROCK_BANK_ANCHOR}"`)
    failures.push('rock-bank anchor')
  }

  const mbaIdx = body.findIndex(
    (b) => b._type === 'block' && blockText(b).includes('University of Phoenix in 2003')
  )
  if (mbaIdx >= 0) {
    for (const span of body[mbaIdx].children || []) {
      if (typeof span.text === 'string') {
        span.text = span.text.split('University of Phoenix in 2003').join('University of Phoenix in 2004')
      }
    }
    console.log(`OK  MBA year: 2003 -> 2004 in block [${mbaIdx}]`)
    bodyChanged = true
  } else if (body.some((b) => b._type === 'block' && blockText(b).includes('University of Phoenix in 2004'))) {
    console.log('--  MBA year: already applied')
  } else {
    console.error('!! MBA year: anchor not found')
    failures.push('mba anchor')
  }

  if (bodyChanged && !dryRun) {
    await client.patch(POST_ID).set({ body }).commit()
    console.log('    -> essay patched')
  } else if (bodyChanged) {
    console.log('    -> (dry run, not written)')
  }

  // ── 2. The aboutPage doc ────────────────────────────────────────
  const about = await client.fetch<{ _id: string; timelineEvents?: Array<Record<string, unknown>>; education?: Array<Record<string, unknown>> } | null>(
    `*[_type == "aboutPage"][0]{ _id, timelineEvents, education }`
  )

  if (!about) {
    console.log('\n--  no aboutPage document in Sanity (page falls back to hardcoded content)')
  } else {
    let aboutChanged = false
    const patch: Record<string, unknown> = {}

    const timeline = about.timelineEvents || []
    for (const ev of timeline) {
      const desc = ev.description
      if (typeof desc === 'string' && desc.includes('University of Phoenix (2003)')) {
        ev.description = desc.split('University of Phoenix (2003)').join('University of Phoenix (2004)')
        aboutChanged = true
      }
      // The timeline entry said the Rock Bank initiative "wound down". It was
      // turned down, for a specific reason, and the record should say so.
      if (typeof ev.description === 'string' && ev.description.includes('When that wound down')) {
        ev.description = ev.description.split('When that wound down').join('When Dan Gilbert turned down the bank charter')
        aboutChanged = true
      }
      if (typeof ev.description === 'string' && ev.description.includes('When that initiative wound down')) {
        ev.description = ev.description
          .split('When that initiative wound down')
          .join('When Dan Gilbert turned down the bank charter')
        aboutChanged = true
      }
    }
    if (aboutChanged) patch.timelineEvents = timeline

    const education = about.education || []
    let eduChanged = false
    for (const e of education) {
      if (String(e.year) === '2003' && String(e.degree || '').includes('MBA')) {
        e.year = '2004'
        eduChanged = true
      }
    }
    if (eduChanged) {
      patch.education = education
      aboutChanged = true
    }

    if (aboutChanged) {
      console.log(`\nOK  aboutPage: MBA year and Rock Bank framing updated`)
      if (!dryRun) {
        await client.patch(about._id).set(patch).commit()
        console.log('    -> aboutPage patched')
      } else {
        console.log('    -> (dry run, not written)')
      }
    } else {
      console.log('\n--  aboutPage: nothing to change')
    }
  }

  if (failures.length) {
    console.error(`\nUnmatched: ${failures.join(', ')}`)
    process.exit(1)
  }
  console.log(`\n${dryRun ? '[DRY] ' : ''}done`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
