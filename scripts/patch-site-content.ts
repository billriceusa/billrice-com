/**
 * Bring the Sanity dataset in line with the code, October 2026.
 *
 *   npx tsx scripts/patch-site-content.ts            # review the diff
 *   npx tsx scripts/patch-site-content.ts --apply    # write it
 *
 * Dry run by default: it prints every change it would make and touches
 * nothing. Requires a write-access SANITY_API_TOKEN for project st1plnki --
 * tsx does not read .env.local, see scripts/sanity-client.ts for the
 * invocation that works. Idempotent; safe to re-run.
 *
 * WHY THIS EXISTS
 *
 * Three sections of billrice.com render from Sanity and only fall back to code
 * when a query returns nothing: the homepage Companies and Projects lists, and
 * /now. So the following changes are complete in the repo but invisible on the
 * live site until this runs:
 *
 *   1. Verified Vector is retired. Bill is focused on Kaleidico and BRSG, and
 *      it has been removed from every surface the repo controls.
 *   2. agedleadsales.com and howtoworkleads.com both 301 to workagedleads.com.
 *      Two project cards pointed at one site; they become one.
 *   3. The Playbook's subtitle in Sanity was superseded by the printed book.
 *
 * Deletions here are real deletions — a `company` or `project` document has no
 * publishedAt to clear, so there is no unpublish to hide behind. Every document
 * it removes is printed in full first, so the log is the undo.
 *
 * This does NOT touch nowPage, siteSettings or aboutPage. Those have their own
 * idempotent seeds, and running them is the second half of this job:
 *
 *   npx tsx scripts/seed-now-page.ts
 *   npx tsx scripts/seed-site-settings.ts
 *   npx tsx scripts/seed-about-page.ts
 */

import { sanityScriptClient } from './sanity-client'

const APPLY = process.argv.includes('--apply')
const client = sanityScriptClient()

/** The published subtitle, off the printed cover and ISBN 9798994221006. */
const PLAYBOOK_SUBTITLE = 'How to Turn Third-Party Leads Into a Predictable Revenue Engine'
const PLAYBOOK_SUBTITLE_SUPERSEDED = 'The Enterprise Guide to Buying and Converting Leads Profitably'

const WORK_AGED_LEADS = {
  name: 'Work Aged Leads',
  slug: 'work-aged-leads',
  url: 'https://workagedleads.com/',
  description:
    "The aged-lead operator's manual — scripts, cadences, and unit economics for records 30 to 365 days old, plus independent provider reviews, a quarterly lead price index, and free pipeline calculators across 15+ verticals.",
}

type Doc = Record<string, unknown> & { _id: string }

let changes = 0

function plan(label: string, detail?: unknown) {
  changes++
  console.log(`\n${APPLY ? '→' : '[dry run]'} ${label}`)
  if (detail !== undefined) {
    console.log(JSON.stringify(detail, null, 2).split('\n').map((l) => `    ${l}`).join('\n'))
  }
}

async function retireVerifiedVector() {
  const docs: Doc[] = await client.fetch(
    `*[_type == "company" && (slug.current == "verified-vector" || name match "Verified Vector")]`
  )
  if (docs.length === 0) {
    console.log('✓ No Verified Vector company document — already retired.')
    return
  }
  for (const doc of docs) {
    plan(`DELETE company ${doc._id} (Verified Vector) — full document below, this is the undo`, doc)
    if (APPLY) await client.delete(doc._id)
  }
}

async function consolidateAgedLeadProjects() {
  const keep: Doc | null = await client.fetch(
    `*[_type == "project" && slug.current == "aged-lead-sales"][0]`
  )
  const drop: Doc[] = await client.fetch(
    `*[_type == "project" && slug.current == "how-to-work-leads"]`
  )
  const already: Doc | null = await client.fetch(
    `*[_type == "project" && slug.current == $slug][0]`,
    { slug: WORK_AGED_LEADS.slug }
  )

  if (!keep && already) {
    console.log('✓ Projects already consolidated into Work Aged Leads.')
  } else if (keep) {
    // Repurpose the existing document rather than delete-and-create: it keeps
    // the document id, and with it anything that references this project.
    plan(`PATCH project ${keep._id} ("${keep.name}") → Work Aged Leads`, {
      from: { name: keep.name, url: keep.url, slug: (keep.slug as { current?: string })?.current },
      to: { name: WORK_AGED_LEADS.name, url: WORK_AGED_LEADS.url, slug: WORK_AGED_LEADS.slug },
    })
    if (APPLY) {
      await client
        .patch(keep._id)
        .set({
          name: WORK_AGED_LEADS.name,
          slug: { _type: 'slug', current: WORK_AGED_LEADS.slug },
          url: WORK_AGED_LEADS.url,
          description: WORK_AGED_LEADS.description,
        })
        .commit()
    }
  }

  for (const doc of drop) {
    plan(
      `DELETE project ${doc._id} ("${doc.name}") — consolidated into Work Aged Leads; full document below`,
      doc
    )
    if (APPLY) await client.delete(doc._id)
  }
}

async function correctPlaybookSubtitle() {
  const book: Doc | null = await client.fetch(
    `*[_type == "book" && subtitle == $old][0]{_id, title, subtitle}`,
    { old: PLAYBOOK_SUBTITLE_SUPERSEDED }
  )
  if (!book) {
    console.log('✓ No book carrying the superseded subtitle.')
    return
  }
  plan(`PATCH book ${book._id} — subtitle superseded by the printed cover`, {
    from: book.subtitle,
    to: PLAYBOOK_SUBTITLE,
  })
  if (APPLY) await client.patch(book._id).set({ subtitle: PLAYBOOK_SUBTITLE }).commit()
}

async function main() {
  console.log(APPLY ? 'APPLYING changes to Sanity.\n' : 'DRY RUN — nothing will be written.\n')

  await retireVerifiedVector()
  await consolidateAgedLeadProjects()
  await correctPlaybookSubtitle()

  console.log(`\n${changes} change(s) ${APPLY ? 'applied' : 'pending'}.`)
  if (!APPLY && changes > 0) {
    console.log('Re-run with --apply to write them.')
  }
  if (APPLY) {
    console.log('\nNow refresh the prose documents:')
    console.log('  npx tsx scripts/seed-now-page.ts')
    console.log('  npx tsx scripts/seed-site-settings.ts')
    console.log('  npx tsx scripts/seed-about-page.ts')
  }
}

main().catch((err) => {
  console.error('Failed:', err)
  process.exit(1)
})
