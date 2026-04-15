/**
 * Seed / update the singleton siteSettings document.
 *
 * Usage: npx tsx scripts/seed-site-settings.ts
 *
 * Requires SANITY_API_TOKEN in .env.local.
 * Safe to re-run — upserts by _id = "siteSettings".
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

function block(text: string) {
  return {
    _type: 'block',
    _key: randomUUID(),
    style: 'normal',
    markDefs: [],
    children: [{ _type: 'span', _key: randomUUID(), text, marks: [] }],
  }
}

const doc = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  title: 'Bill Rice',
  description:
    'Fintech marketing pioneer. Coined "lead management." 30+ years building lead generation platforms and revenue systems for financial services companies.',
  heroTitle: 'Bill Rice',
  heroTagline: 'Fintech Marketing Pioneer & Lead Generation Strategist',
  heroSubtext:
    '30+ years building lead generation platforms and revenue systems for financial services companies. Coined "lead management." Built platforms at DeepGreen Bank and Quicken Loans.',
  aboutBio: [
    block(
      'I started as a Special Agent and case officer with the U.S. Air Force Office of Special Investigations (AFOSI), running counterespionage operations, then became Employee #7 at DeepGreen Bank — one of the first internet-only banks. At Quicken Loans, I built EquityOnline, their first true online lending platform.',
    ),
    block(
      'I coined the term "lead management" to differentiate platforms that work leads from CRMs that manage customers. I authored the original Wikipedia page for the category. The frameworks I built are now industry standard.',
    ),
    block(
      'Today I run three companies — Kaleidico, Bill Rice Strategy Group, and Verified Vector — and operate a portfolio of authority content sites across lead generation, real estate investing, and fintech.',
    ),
  ],
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/billrice/',
    twitter: 'https://twitter.com/billrice',
    youtube: 'https://www.youtube.com/@billricestrategy',
  },
  copyrightName: 'Bill Rice',
}

async function main() {
  console.log(`Upserting siteSettings (_id: ${doc._id})...`)
  const result = await client.createOrReplace(doc)
  console.log('✓ Seeded:', result._id)
}

main().catch((err) => {
  console.error('Failed to seed siteSettings:', err)
  process.exit(1)
})
