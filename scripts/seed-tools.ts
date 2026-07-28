/**
 * Seed free tools as individual Sanity documents.
 *
 * Gumroad playbooks were removed 2026-07-28 (being phased out) and DemoLeadGen
 * was removed (domain 404s after the 2026-06-05 archive). Do not re-add.
 *
 * Usage: npx tsx scripts/seed-tools.ts
 *
 * Requires SANITY_API_TOKEN in .env.local.
 * Safe to re-run — upserts by deterministic _id per tool.
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

type ToolSeed = {
  key: string
  name: string
  description: string
  url: string
  category: 'ai-tool' | 'playbook'
  price: string
  order: number
}

const tools: ToolSeed[] = [
  { key: 'writemysalesscript', order: 10, category: 'ai-tool', price: 'Free', name: 'WriteMySalesScript', description: 'AI-powered sales script generation for B2B teams', url: 'https://writemysalesscript.com/' },
  { key: 'visibilityanalyzer', order: 20, category: 'ai-tool', price: 'Free', name: 'VisibilityAnalyzer', description: 'SEO and LLM visibility analysis and optimization', url: 'https://visibilityanalyzer.com/' },
  { key: 'b2bbattlecard', order: 30, category: 'ai-tool', price: 'Free', name: 'B2B Marketing Battlecard', description: 'Competitive intelligence and strategic insights', url: 'https://b2bmarketingbattlecard.com/' },
]

async function main() {
  for (const t of tools) {
    const id = `tool.${t.key}`
    const doc = {
      _id: id,
      _type: 'tool',
      name: t.name,
      description: t.description,
      url: t.url,
      category: t.category,
      price: t.price,
      order: t.order,
    }
    console.log(`Upserting ${id}...`)
    await client.createOrReplace(doc)
  }
  console.log(`✓ Seeded ${tools.length} tools`)
}

main().catch((err) => {
  console.error('Failed to seed tools:', err)
  process.exit(1)
})
