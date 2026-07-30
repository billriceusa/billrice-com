/**
 * Correct canonical-fact defects in the seven essays before they move to /essays.
 *
 * Usage: npx tsx scripts/fix-canonical-facts.ts [--dry]
 *
 * Found 2026-07-30 by reading all seven kept posts against the editorial
 * rulebook in BACKLOG.md. These are the mechanical, unambiguous ones — the two
 * that need Bill's judgment (the missing Rock Bank COO step, and the MBA-1n-2003
 * vs Quicken-in-2004 sequencing) are deliberately NOT touched here.
 *
 * Patches the specific text spans in place rather than re-running
 * publish-post.ts, which does a createOrReplace and would drop mainImage, seo,
 * and anything edited in Studio since April.
 *
 * Idempotent: a replacement whose "before" text is already gone is reported as
 * "already applied" rather than failing. Any needle that matches nothing at all
 * exits non-zero, so a silently-missed fix can't pass for a clean run.
 *
 * Requires SANITY_API_TOKEN in .env.local.
 */

import { createClient } from 'next-sanity'

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

type Fix = { before: string; after: string; why: string }

const FIXES: Record<string, Fix[]> = {
  // Canonical: Bill joined Quicken Loans in 2004, not 2002. The post's own lede
  // and section headings already say 2004 — these three body references are
  // residue from the pre-correction draft, so the piece currently contradicts
  // itself three times.
  'post-building-equityonline-quicken-loans': [
    {
      before: 'But in 2002, that version of the company',
      after: 'But in 2004, that version of the company',
      why: 'Quicken Loans tenure is 2004-2005; the lede already says 2004',
    },
    {
      before: 'more sophisticated lead forms than what existed in 2002',
      after: 'more sophisticated lead forms than what existed in 2004',
      why: 'same 2002/2004 residue',
    },
    {
      before: 'In 2002, they worried about entering their Social Security number.',
      after: 'In 2004, they worried about entering their Social Security number.',
      why: 'same 2002/2004 residue',
    },
    {
      before: 'killed all my call center lender clients. a digital marketing agency',
      after: 'killed all my call center lender clients, a digital marketing agency',
      why: 'sentence fragment — period mid-clause followed by lowercase',
    },
  ],

  // Canonical career length is 30+ years. "25 years" is the exact undercount
  // third-party bios keep making; it should not appear in Bill's own voice on
  // the domain that exists to correct them. Rewritten to carry no number rather
  // than swapping one for another, since the sentence is scoped to "since 2000".
  'post-employee-7-deepgreen-bank': [
    {
      before: "I've spent the last 25 years proving it",
      after: "I've spent every year since proving it",
      why: '"25 years" contradicts the canonical 30+ framing',
    },
  ],

  // Editorial rule 1: Kaleidico launched in 2005 as lead-management software
  // (icoSales) and became an agency only after 2008. Paragraph 21 of this same
  // post gets that right; the opening line does not.
  'post-staying-at-kaleidico-as-cro-after-acquisition': [
    {
      before: 'Kaleidico — the demand generation agency I founded in 2005 —',
      after: 'Kaleidico — the company I founded in 2005 —',
      why: 'Kaleidico was software-first; not an agency from inception',
    },
  ],
}

type Block = { _type: string; children?: Array<{ text?: string }> }

async function main() {
  let applied = 0
  let alreadyApplied = 0
  const notFound: string[] = []

  for (const [id, fixes] of Object.entries(FIXES)) {
    const doc = await client.fetch<{ _id: string; title: string; body: Block[] } | null>(
      `*[_id == $id][0]{ _id, title, body }`,
      { id }
    )

    if (!doc) {
      console.error(`\n!!  ${id} — document not found`)
      notFound.push(`${id} (whole document)`)
      continue
    }

    console.log(`\n=== ${doc.title}`)
    const body = doc.body || []
    let changed = false

    for (const fix of fixes) {
      let hit = false

      for (const block of body) {
        if (block._type !== 'block' || !block.children) continue
        for (const span of block.children) {
          if (typeof span.text !== 'string') continue
          if (span.text.includes(fix.before)) {
            span.text = span.text.split(fix.before).join(fix.after)
            hit = true
            changed = true
          }
        }
      }

      if (hit) {
        console.log(`  OK  ${fix.why}`)
        console.log(`      - ${fix.before}`)
        console.log(`      + ${fix.after}`)
        applied++
      } else {
        // Already-corrected text means a prior run; text that matches neither
        // the before nor the after is a real miss.
        const present = body.some(
          (b) =>
            b._type === 'block' &&
            (b.children || []).some((c) => typeof c.text === 'string' && c.text.includes(fix.after))
        )
        if (present) {
          console.log(`  --  already applied: ${fix.why}`)
          alreadyApplied++
        } else {
          console.error(`  !!  NOT FOUND: "${fix.before}"`)
          notFound.push(`${id}: ${fix.before}`)
        }
      }
    }

    if (changed && !dryRun) {
      await client.patch(doc._id).set({ body }).commit()
      console.log(`  -> patched`)
    } else if (changed) {
      console.log(`  -> (dry run, not written)`)
    }
  }

  console.log(
    `\n${dryRun ? '[DRY] ' : ''}applied ${applied}, already applied ${alreadyApplied}, not found ${notFound.length}`
  )

  if (notFound.length) {
    console.error('\nUnmatched — the source text changed and these fixes need re-deriving:')
    for (const n of notFound) console.error(`  ${n}`)
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
