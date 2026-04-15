/**
 * Seed / update the singleton nowPage document in Sanity.
 *
 * Usage: npx tsx scripts/seed-now-page.ts
 *
 * Requires SANITY_API_TOKEN in .env.local (write access to st1plnki).
 * Safe to re-run — upserts by _id = "nowPage".
 */

import { createClient } from 'next-sanity'
import { randomUUID } from 'crypto'

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

// Minimal helper: build a block-content paragraph from plain text with optional
// inline link spans. Marks refs use auto-generated keys.
function paragraph(segments: Array<string | { text: string; href: string }>) {
  const markDefs: Array<{ _key: string; _type: 'link'; href: string }> = []
  const children = segments.map((seg) => {
    if (typeof seg === 'string') {
      return { _type: 'span', _key: randomUUID(), text: seg, marks: [] as string[] }
    }
    const key = randomUUID()
    markDefs.push({ _key: key, _type: 'link', href: seg.href })
    return { _type: 'span', _key: randomUUID(), text: seg.text, marks: [key] }
  })
  return {
    _type: 'block',
    _key: randomUUID(),
    style: 'normal',
    markDefs,
    children,
  }
}

const doc = {
  _id: 'nowPage',
  _type: 'nowPage',
  lastUpdated: new Date().toISOString().slice(0, 10),
  priorities: [
    {
      _key: randomUUID(),
      title: "The Lead Buyer's Playbook",
      description: [
        paragraph([
          'Published my first book — ',
          { text: "The Lead Buyer's Playbook", href: 'https://www.leadbuyerplaybook.com/' },
          '. The enterprise guide to buying and converting leads profitably, drawing on 30+ years in lead generation and mortgage lending. Available ',
          { text: 'free online', href: 'https://www.leadbuyerplaybook.com/' },
          ' and on Amazon.',
        ]),
      ],
    },
    {
      _key: randomUUID(),
      title: 'Building Niche Authority Sites',
      description: [
        paragraph([
          'Growing a portfolio of authority-driven education platforms, each built on Next.js and Sanity.io: ',
          { text: 'AgedLeadSales.com', href: 'https://agedleadsales.com/' },
          ' (aged lead training), ',
          { text: 'ProInvestorHub.com', href: 'https://proinvestorhub.com/' },
          ' (real estate investing education), and ',
          { text: 'CryptoLendingHub.com', href: 'https://cryptolendinghub.com/' },
          ' (crypto lending reviews and education).',
        ]),
      ],
    },
    {
      _key: randomUUID(),
      title: 'The Lead Brief Newsletter & Podcast',
      description: [
        paragraph([
          'Rebranded My Executive Brief to ',
          { text: 'The Lead Brief', href: 'https://theleadbrief.com' },
          '. Weekly tactics for buying, generating, and converting more leads. Now includes a podcast alongside the newsletter.',
        ]),
      ],
    },
    {
      _key: randomUUID(),
      title: 'AI-Powered Marketing Systems',
      description: [
        paragraph([
          'Continuing to develop compliance-ready AI marketing solutions for fintech companies through ',
          { text: 'Verified Vector', href: 'https://verifiedvector.com' },
          '. Leveraging AI agents and LLMs to dramatically increase content productivity while maintaining regulatory compliance.',
        ]),
      ],
    },
    {
      _key: randomUUID(),
      title: 'B2B Strategy Consulting',
      description: [
        paragraph([
          'Working with strategic engagements through ',
          { text: 'Bill Rice Strategy', href: 'https://billricestrategy.com' },
          ', helping fintech and B2B companies build predictable revenue pipelines and demand generation systems.',
        ]),
      ],
    },
  ],
  speakingTopics: [
    'Enterprise Lead Buying Strategy',
    'AI-Powered Marketing for Fintech Companies',
    'Building Predictable B2B Revenue Pipelines',
    'Building Authority-Driven Niche Content Sites',
    'Compliance-First Marketing in Regulated Industries',
  ],
  consultingAvailability:
    'Currently accepting strategic consulting engagements for fintech companies and B2B organizations looking to build or optimize their marketing and growth systems.',
}

async function main() {
  console.log(`Upserting nowPage document (_id: ${doc._id})...`)
  const result = await client.createOrReplace(doc)
  console.log('✓ Seeded:', result._id, 'lastUpdated:', result.lastUpdated)
}

main().catch((err) => {
  console.error('Failed to seed nowPage:', err)
  process.exit(1)
})
