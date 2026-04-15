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
      'I started as a Special Agent and case officer with the U.S. Air Force Office of Special Investigations (AFOSI), running counterespionage operations. From there I joined DeepGreen Bank as Employee #7 — one of the first internet-only banks, where we grew to about 80 people running what functionally behaved like a billion-dollar bank. After DeepGreen sold to LightYear Capital in 2004, I built EquityOnline at Quicken Loans — their first true online lending platform.',
    ),
    block(
      'In 2005 I founded Kaleidico, starting as a lead management software company before pivoting to the demand generation agency it is today. I coined "lead management" as a category and authored the original Wikipedia page. From 2016 to 2018 I also owned and operated Velocity Lending, a DTC mortgage lender, as a live proof-of-concept for the playbook we were teaching clients.',
    ),
    block(
      'Today I run three companies. Kaleidico, where I\'m CRO following the agency\'s acquisition — I retained 10% and continue to lead business development, sales, and marketing strategy and execution. Bill Rice Strategy Group, my B2B strategic agency for fintech clients. And Verified Vector, my AI-first agency with no employees — just AI agents and me, every deliverable produced in code. Alongside the companies, I operate a portfolio of authority content sites across lead generation, real estate investing, and crypto lending.',
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
