/**
 * Author pillar — Sanity side.
 *
 * The code in src/ is only half of each of these pages. Sanity holds the real
 * content and the code holds a fallback, so a field that exists in Sanity WINS
 * and the code change is invisible. The clearest case: the `book` document
 * carries the superseded subtitle "The Enterprise Guide to Buying and
 * Converting Leads Profitably", which is what /book renders today regardless
 * of what src/lib/books.ts says.
 *
 * Usage:
 *   npx tsx scripts/patch-author-pillar.ts            # dry run — prints the diff, writes nothing
 *   npx tsx scripts/patch-author-pillar.ts --apply     # writes
 *
 * Reads are public on this dataset, so the dry run needs no credentials.
 * --apply requires a write-scoped SANITY_API_TOKEN (Editor) in the environment.
 *
 * Safe to re-run: every change is computed as a target value and compared to
 * what is live, so a second run reports "already applied" and writes nothing.
 *
 * What it does NOT do, on purpose:
 *   - It does not create a `book` document for Sales Team of One or Broke at a
 *     Million. BOOK_QUERY in src/sanity/lib/queries.ts is `*[_type=="book"][0]`
 *     — unordered — so a second book document would make /book render an
 *     arbitrary one. Those documents land with the /books library work, which
 *     is where the query gets a slug and an order.
 *   - It does not touch the `project` documents for the old aged-lead domains.
 *     That is the domain-consolidation change, tracked separately.
 */

import { createClient } from 'next-sanity'
import { randomUUID } from 'crypto'
import {
  BROKE_AT_A_MILLION,
  LEAD_BUYERS_PLAYBOOK,
  SALES_TEAM_OF_ONE,
  SERIES_NAME,
  SERIES_PLANNED_VOLUMES,
} from '../src/lib/books'

const APPLY = process.argv.includes('--apply')

/**
 * PINNED, not read from the environment.
 *
 * Every other script in this directory does
 * `process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'st1plnki'`, which is a loaded
 * gun in any shell that has another site's Sanity project exported — a cloud
 * session provisioned for a different repo, or a terminal left over from one.
 * The env var wins there, so the script silently points at the wrong dataset
 * and a write lands in somebody else's production content.
 *
 * This script only ever has one correct target, so it names it and refuses to
 * be redirected. If the environment disagrees, that is the environment's bug.
 */
const PROJECT_ID = 'st1plnki'
const DATASET = 'production'

const envProject = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
if (envProject && envProject !== PROJECT_ID) {
  console.warn(
    `WARNING: NEXT_PUBLIC_SANITY_PROJECT_ID is "${envProject}", which is not ` +
      `billrice.com (${PROJECT_ID}). Ignoring it. If you meant to work on another ` +
      `site, you are in the wrong repo.\n`
  )
}

const projectId = PROJECT_ID
const dataset = DATASET
const token = process.env.SANITY_API_TOKEN

if (APPLY && !token) {
  console.error(
    'Missing SANITY_API_TOKEN. --apply needs a write-scoped (Editor) token.\n' +
      'Run without --apply to see the diff; reads on this dataset are public.'
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-03-21',
  useCdn: false,
  ...(token ? { token } : {}),
})

// ── Portable Text helpers ────────────────────────────────────────────────────
// Keys must be stable across runs or every dry run reports a spurious change,
// so a block's key is derived from its id rather than randomly generated.

type Span = { _key: string; _type: 'span'; marks: string[]; text: string }
type Block = {
  _key: string
  _type: 'block'
  style: 'normal'
  markDefs: []
  children: Span[]
}

function block(key: string, text: string): Block {
  return {
    _key: key,
    _type: 'block',
    style: 'normal',
    markDefs: [],
    children: [{ _key: `${key}s`, _type: 'span', marks: [], text }],
  }
}

/**
 * Compare ignoring keys — keys are ours, prose is the thing under review.
 *
 * Returns '' for anything that is not Portable Text, so callers can fall back
 * to JSON. Without that guard an array of plain objects (currentVentures,
 * timelineEvents) maps to a run of empty strings, which is still truthy once
 * joined, and the diff prints blank lines instead of the change.
 */
function proseOf(blocks: unknown): string {
  if (!Array.isArray(blocks)) return ''
  const isPortableText = blocks.some((b) => Array.isArray((b as Block)?.children))
  if (!isPortableText) return ''
  return blocks
    .map((b) =>
      Array.isArray((b as Block).children)
        ? (b as Block).children.map((c) => c.text).join('')
        : ''
    )
    .join('\n\n')
}

// ── The target content ───────────────────────────────────────────────────────

const AUTHOR_LINE =
  `author of The Lead Buyer's Playbook and Sales Team of One, and of ${SERIES_NAME} — ` +
  `a planned ${SERIES_PLANNED_VOLUMES} short books for the person who is the whole company`

const SITE_TITLE = 'Bill Rice — Author, Founder & Lead Generation Strategist'

const SITE_DESCRIPTION =
  `Bill Rice is the ${AUTHOR_LINE}. Founder, CRO and co-owner of Kaleidico; founder, ` +
  `principal and owner of Bill Rice Strategy Group. He coined "lead management" and has ` +
  `spent 30+ years on every side of the consumer-direct lead.`

/**
 * siteSettings.aboutBio — the homepage/about bio. The live version does not
 * mention a single book, which is the whole problem this change exists to fix.
 */
const ABOUT_BIO: Block[] = [
  block(
    'bio1',
    `Bill Rice is a business author and a veteran strategist in high-performance lead ` +
      `generation. He wrote The Lead Buyer's Playbook (2025) and Sales Team of One (2026), ` +
      `and is writing ${SERIES_NAME} — a planned ${SERIES_PLANNED_VOLUMES} short books for ` +
      `solo consultants and bootstrapping founders, each named for the constraint currently ` +
      `binding the business rather than for a department. Book two, ${BROKE_AT_A_MILLION.title}, ` +
      `is in development.`
  ),
  block(
    'bio2',
    `The books come out of thirty years of operating. He founded Kaleidico in 2005, coined ` +
      `the term "lead management" to name the category, and remains its CRO and co-owner ` +
      `following the agency's acquisition. He is also founder, principal and owner of Bill ` +
      `Rice Strategy Group, his B2B strategic agency for fintech companies. Earlier he was ` +
      `employee number seven at DeepGreen Bank, built EquityOnline at Quicken Loans, and ` +
      `owned Velocity Lending — a direct-to-consumer mortgage lender he ran as a live ` +
      `proof-of-concept for his own playbook.`
  ),
  block(
    'bio3',
    `That sequence is why the writing is specific: he has stood on all four sides of the ` +
      `consumer-direct lead — building the software that managed it, generating it as an ` +
      `agency, buying it as a lender with his own P&L, and now writing down the systems. ` +
      `The disciplined approach underneath it traces back to his first career as a Special ` +
      `Agent and case officer in Air Force intelligence.`
  ),
]

/** aboutPage.speakingWriting — currently opens "Author of " and lists one book. */
const SPEAKING_WRITING: Block[] = [
  block(
    'sw1',
    `Author of The Lead Buyer's Playbook (2025), ${LEAD_BUYERS_PLAYBOOK.subtitle}, and of ` +
      `Sales Team of One (2026), ${SALES_TEAM_OF_ONE.subtitle}. Currently writing ` +
      `${SERIES_NAME}, a planned ${SERIES_PLANNED_VOLUMES} short books for solo consultants ` +
      `and bootstrapping founders — ${BROKE_AT_A_MILLION.title} is book two.`
  ),
  block(
    'sw2',
    `Publisher of The Lead Brief newsletter. Regular speaker at Lead Generation World and ` +
      `fintech industry conferences, and a featured guest on 30+ marketing and business ` +
      `podcasts.`
  ),
  block(
    'sw3',
    `Topics: founder-led sales in the AI era, demand generation, lead management systems, ` +
      `small business cash flow, B2B growth, aged lead reconversion, and go-to-market ` +
      `strategy for fintech startups.`
  ),
]

const VENTURE_ROLES: Record<string, string> = {
  Kaleidico: 'Founder, CRO & Co-Owner',
  'Bill Rice Strategy Group': 'Founder, Principal & Owner',
}

const LBP_TIMELINE_SUBTITLE = LEAD_BUYERS_PLAYBOOK.subtitle!
const LBP_TIMELINE_DESCRIPTION =
  `Published The Lead Buyer's Playbook. Drawing on 30+ years in lead generation, the book ` +
  `covers strategic foundations, vendor portfolio risk, validation, compliance, true cost ` +
  `per lead, and scaling operations — the systems a company needs before it buys another lead.`

const AUTHOR_TIMELINE_EVENT = {
  year: '2026',
  title: `Full author mode — Sales Team of One and the ${SERIES_NAME} library`,
  subtitle: `${SERIES_PLANNED_VOLUMES} short books for the person who is the whole company`,
  description:
    `Published Sales Team of One, on staying irreplaceable when AI comes for the sales team, ` +
    `and began ${SERIES_NAME} — a planned ${SERIES_PLANNED_VOLUMES}-volume library for solo ` +
    `consultants and bootstrapping founders. Each book is named for the constraint currently ` +
    `binding the business, and each stands alone with no reading order. Book two, ` +
    `${BROKE_AT_A_MILLION.title}, is in development.`,
}

// ── Diff plumbing ────────────────────────────────────────────────────────────

type Change = {
  doc: string
  field: string
  from: string
  to: string
  value: unknown
  elementDiff: string[] | null
}
const changes: Change[] = []
const unchanged: string[] = []

function show(v: unknown): string {
  const s = typeof v === 'string' ? v : proseOf(v) || JSON.stringify(v)
  return s.length > 220 ? `${s.slice(0, 220)}…` : s
}

type Keyed = { _key?: string; [k: string]: unknown }

/**
 * Element-level diff for the object arrays (currentVentures, timelineEvents).
 *
 * Printing the whole array truncated at 220 chars hides the only part that
 * changed — a role buried mid-array, or an event appended at the end — and the
 * entire reason this script is a dry run first is that someone reads the diff
 * and decides. So show the changed and added entries, field by field.
 * Returns null when the field is not a keyed object array.
 */
function arrayElementDiff(live: unknown, target: unknown): string[] | null {
  if (!Array.isArray(live) || !Array.isArray(target)) return null
  if (!target.every((e) => e && typeof e === 'object' && !Array.isArray(e))) return null

  const liveByKey = new Map<string, Keyed>()
  ;(live as Keyed[]).forEach((e, i) => liveByKey.set(e?._key ?? `#${i}`, e))

  const lines: string[] = []
  ;(target as Keyed[]).forEach((entry, i) => {
    const key = entry?._key ?? `#${i}`
    const before = liveByKey.get(key)
    const label = String(entry.name ?? entry.title ?? key)

    if (!before) {
      lines.push(`   + ADDED "${label}"`)
      for (const [k, v] of Object.entries(entry)) {
        if (k === '_key') continue
        lines.push(`       ${k}: ${show(v)}`)
      }
      return
    }

    for (const [k, v] of Object.entries(entry)) {
      if (k === '_key') continue
      if (JSON.stringify(before[k]) === JSON.stringify(v)) continue
      lines.push(`   ~ "${label}" ${k}`)
      lines.push(`       FROM: ${show(before[k])}`)
      lines.push(`       TO:   ${show(v)}`)
    }
  })

  const targetKeys = new Set((target as Keyed[]).map((e, i) => e?._key ?? `#${i}`))
  for (const [key, entry] of liveByKey) {
    if (!targetKeys.has(key)) {
      lines.push(`   - REMOVED "${String(entry.name ?? entry.title ?? key)}"`)
    }
  }

  return lines.length ? lines : ['   (no element-level differences)']
}

function plan(doc: string, field: string, live: unknown, target: unknown, compare?: (a: unknown, b: unknown) => boolean) {
  const same = compare ? compare(live, target) : JSON.stringify(live) === JSON.stringify(target)
  if (same) {
    unchanged.push(`${doc}.${field}`)
    return
  }
  changes.push({
    doc,
    field,
    from: show(live),
    to: show(target),
    value: target,
    elementDiff: arrayElementDiff(live, target),
  })
}

async function main() {
  console.log(`\nAuthor pillar — Sanity patch`)
  console.log(`project ${projectId} / dataset ${dataset}`)
  console.log(APPLY ? 'mode: APPLY (writing)\n' : 'mode: DRY RUN (nothing will be written)\n')

  const [bookDoc, settings, about] = await Promise.all([
    client.fetch<{ _id: string; subtitle?: string } | null>(
      `*[_type=="book" && title=="The Lead Buyer's Playbook"][0]{_id, subtitle}`
    ),
    client.fetch<{ _id: string; title?: string; description?: string; aboutBio?: unknown } | null>(
      `*[_type=="siteSettings"][0]{_id, title, description, aboutBio}`
    ),
    client.fetch<{
      _id: string
      speakingWriting?: unknown
      currentVentures?: { _key: string; name: string; role?: string }[]
      timelineEvents?: { _key: string; year: string; title: string; subtitle?: string; description?: string }[]
    } | null>(
      `*[_id=="aboutPage"][0]{_id, speakingWriting, currentVentures, timelineEvents}`
    ),
  ])

  if (!bookDoc) throw new Error('No `book` document titled "The Lead Buyer\'s Playbook" found.')
  if (!settings) throw new Error('No `siteSettings` document found.')
  if (!about) throw new Error('No `aboutPage` document found.')

  // 1. The book subtitle. This is the one that is visibly wrong on /book today.
  plan('book', 'subtitle', bookDoc.subtitle, LEAD_BUYERS_PLAYBOOK.subtitle)

  // 2. Site-level title, description and bio.
  plan('siteSettings', 'title', settings.title, SITE_TITLE)
  plan('siteSettings', 'description', settings.description, SITE_DESCRIPTION)
  plan('siteSettings', 'aboutBio', settings.aboutBio, ABOUT_BIO, (a, b) => proseOf(a) === proseOf(b))

  // 3. About page prose.
  plan('aboutPage', 'speakingWriting', about.speakingWriting, SPEAKING_WRITING, (a, b) => proseOf(a) === proseOf(b))

  // 4. Venture roles — keys preserved so Studio history stays attached.
  const ventures = (about.currentVentures ?? []).map((v) =>
    VENTURE_ROLES[v.name] ? { ...v, role: VENTURE_ROLES[v.name] } : v
  )
  plan('aboutPage', 'currentVentures', about.currentVentures, ventures)

  // 5. Timeline: correct the Playbook entry, then append the 2026 author entry.
  const liveEvents = about.timelineEvents ?? []
  let events = liveEvents.map((e) =>
    e.title === "Published The Lead Buyer's Playbook"
      ? { ...e, subtitle: LBP_TIMELINE_SUBTITLE, description: LBP_TIMELINE_DESCRIPTION }
      : e
  )
  const hasAuthorEvent = events.some((e) => e.title === AUTHOR_TIMELINE_EVENT.title)
  if (!hasAuthorEvent) {
    // Appended rather than slotted after 2025: the preceding entry is the
    // open-ended "2025-Present" bucket, so chronological order puts this last.
    events = [...events, { _key: randomUUID(), ...AUTHOR_TIMELINE_EVENT }]
  }
  plan('aboutPage', 'timelineEvents', liveEvents, events)

  // ── Report ────────────────────────────────────────────────────────────────
  if (unchanged.length) {
    console.log(`already applied (${unchanged.length}):`)
    unchanged.forEach((f) => console.log(`  = ${f}`))
    console.log()
  }

  if (!changes.length) {
    console.log('Nothing to do — Sanity already matches the target content.')
    return
  }

  console.log(`${changes.length} field(s) to change:\n`)
  for (const c of changes) {
    console.log(`── ${c.doc}.${c.field}`)
    if (c.elementDiff) {
      c.elementDiff.forEach((line) => console.log(line))
      console.log()
    } else {
      console.log(`   FROM: ${c.from}`)
      console.log(`   TO:   ${c.to}\n`)
    }
  }

  if (!APPLY) {
    console.log('Dry run — nothing written. Re-run with --apply to write these.')
    return
  }

  const byDoc = new Map<string, Record<string, unknown>>()
  const docIds: Record<string, string> = {
    book: bookDoc._id,
    siteSettings: settings._id,
    aboutPage: about._id,
  }
  for (const c of changes) {
    const existing = byDoc.get(c.doc) ?? {}
    existing[c.field] = c.value
    byDoc.set(c.doc, existing)
  }

  const tx = client.transaction()
  for (const [doc, fields] of byDoc) tx.patch(docIds[doc], (p) => p.set(fields))
  await tx.commit()

  console.log(`Applied ${changes.length} field(s) across ${byDoc.size} document(s).`)
  console.log('Pages are ISR/live-queried — revalidate or wait for the cache to roll.')
}

main().catch((err) => {
  console.error('\nFailed:', err instanceof Error ? err.message : err)
  process.exit(1)
})
