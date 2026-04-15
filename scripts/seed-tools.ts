/**
 * Seed tools and playbooks as individual Sanity documents.
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
  { key: 'demoleadgen', order: 40, category: 'ai-tool', price: 'Free', name: 'DemoLeadGen', description: 'Interactive lead generation demo platform', url: 'https://demoleadgen.com/' },
  { key: '90day-toolkit', order: 110, category: 'playbook', price: '$9', name: '90-Day B2B Growth Toolkit', description: 'Complete Notion-based growth system for B2B founders and lean GTM teams', url: 'https://billriceconsulting.gumroad.com/l/90dayB2Btoolkit' },
  { key: 'sales-scripts-course', order: 120, category: 'playbook', price: '$9', name: 'Complete Sales Scripts Course', description: 'Step-by-step guide to designing, writing, and optimizing sales scripts for consistent results', url: 'https://billriceconsulting.gumroad.com/l/sales-scripts' },
  { key: 'aged-leads-playbook', order: 130, category: 'playbook', price: '$9', name: 'Aged Leads Sales Playbook', description: 'Transform dormant aged leads into active customers with proven scripts and strategies', url: 'https://billriceconsulting.gumroad.com/l/aged-leads-scripts' },
  { key: 'mortgage-sales-system', order: 140, category: 'playbook', price: '$9', name: 'Mortgage Sales System', description: 'Complete mortgage sales system with scripts, strategies, and lead management automation', url: 'https://billriceconsulting.gumroad.com/l/mortgage-scripts' },
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
