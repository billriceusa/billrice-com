/**
 * Audit existing blog posts in Sanity for on-brand vs off-brand classification.
 *
 * Usage: npx tsx -r dotenv/config scripts/audit-posts.ts dotenv_config_path=.env.local
 *    OR: set SANITY_API_TOKEN in env and run: npx tsx scripts/audit-posts.ts
 *
 * Read-only — does not modify anything.
 */

import { sanityScriptClient } from './sanity-client'

const client = sanityScriptClient({ perspective: 'raw' })

async function main() {
  const posts = await client.fetch<
    Array<{
      _id: string
      title: string
      slug: string
      publishedAt: string | null
      excerpt: string | null
      categories: string[] | null
    }>
  >(`*[_type == "post"] | order(publishedAt asc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    "categories": categories[]->title
  }`)

  console.log(`Found ${posts.length} posts:\n`)
  for (const p of posts) {
    const date = p.publishedAt ? p.publishedAt.slice(0, 10) : 'unpublished'
    const cats = (p.categories ?? []).join(', ') || '(no category)'
    console.log(`- [${date}] ${p.title}`)
    console.log(`    slug: ${p.slug}`)
    console.log(`    cats: ${cats}`)
    console.log(`    id:   ${p._id}`)
    if (p.excerpt) console.log(`    excerpt: ${p.excerpt.slice(0, 160)}`)
    console.log('')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
