/**
 * Publish a markdown blog post to Sanity CMS
 *
 * Usage: npx tsx scripts/publish-post.ts content/posts/my-post.md
 *
 * Requires SANITY_API_TOKEN in .env.local (must have write access to project st1plnki)
 *
 * Markdown frontmatter format:
 * ---
 * title: "Post Title"
 * slug: post-slug
 * excerpt: "Short description"
 * categories: ["Category 1", "Category 2"]
 * publishedAt: "2026-04-08"
 * ---
 */

import { createClient } from 'next-sanity'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('Missing SANITY_API_TOKEN in environment. Set it in .env.local')
  process.exit(1)
}

const filePath = process.argv[2]
if (!filePath) {
  console.error('Usage: npx tsx scripts/publish-post.ts <path-to-markdown>')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'st1plnki',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-03-21',
  useCdn: false,
  token,
})

// Parse frontmatter and body
function parseMarkdown(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) throw new Error('Invalid frontmatter')

  const frontmatter: Record<string, string | string[]> = {}
  for (const line of match[1].split('\n')) {
    const kvMatch = line.match(/^(\w+):\s*(.+)$/)
    if (kvMatch) {
      let value = kvMatch[2].trim()
      // Handle arrays
      if (value.startsWith('[')) {
        frontmatter[kvMatch[1]] = JSON.parse(value.replace(/'/g, '"'))
      } else {
        // Strip surrounding quotes
        frontmatter[kvMatch[1]] = value.replace(/^["']|["']$/g, '')
      }
    }
  }

  return { frontmatter, body: match[2].trim() }
}

// Convert markdown to Sanity portable text blocks
function markdownToBlocks(markdown: string) {
  const blocks: Array<Record<string, unknown>> = []
  const lines = markdown.split('\n')
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Skip empty lines
    if (line.trim() === '') {
      i++
      continue
    }

    // Headers
    const headerMatch = line.match(/^(#{1,4})\s+(.+)$/)
    if (headerMatch) {
      const level = headerMatch[1].length
      const style = level === 1 ? 'h1' : level === 2 ? 'h2' : level === 3 ? 'h3' : 'h4'
      blocks.push({
        _type: 'block',
        _key: `block_${blocks.length}`,
        style,
        children: [{ _type: 'span', _key: `span_${blocks.length}_0`, text: headerMatch[2], marks: [] }],
        markDefs: [],
      })
      i++
      continue
    }

    // Collect paragraph lines (until empty line or header)
    const paraLines: string[] = []
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].match(/^#{1,4}\s/)) {
      paraLines.push(lines[i])
      i++
    }

    if (paraLines.length > 0) {
      const text = paraLines.join(' ')
      // Parse inline formatting (bold, italic, links)
      const children = parseInlineFormatting(text, blocks.length)
      blocks.push({
        _type: 'block',
        _key: `block_${blocks.length}`,
        style: 'normal',
        children,
        markDefs: children.flatMap((c: Record<string, unknown>) => {
          const marks = c.marks as string[] | undefined
          return marks
            ? marks
                .filter((m: string) => m.startsWith('link_'))
                .map((m: string) => ({
                  _key: m,
                  _type: 'link',
                  href: (c as Record<string, unknown>).__href || '',
                }))
            : []
        }),
      })
    }
  }

  return blocks
}

function parseInlineFormatting(text: string, blockIdx: number) {
  // Simple approach: split on bold/italic markers and create spans
  const children: Array<Record<string, unknown>> = []
  let remaining = text
  let spanIdx = 0

  // Process bold (**text**)
  while (remaining.length > 0) {
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
    const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/)
    const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/)

    // Find earliest match
    let earliest: { type: string; index: number; length: number; text: string; href?: string } | null = null

    if (boldMatch && boldMatch.index !== undefined) {
      if (!earliest || boldMatch.index < earliest.index) {
        earliest = { type: 'bold', index: boldMatch.index, length: boldMatch[0].length, text: boldMatch[1] }
      }
    }
    if (linkMatch && linkMatch.index !== undefined) {
      if (!earliest || linkMatch.index < earliest.index) {
        earliest = { type: 'link', index: linkMatch.index, length: linkMatch[0].length, text: linkMatch[1], href: linkMatch[2] }
      }
    }
    if (italicMatch && italicMatch.index !== undefined) {
      if (!earliest || italicMatch.index < earliest.index) {
        earliest = { type: 'italic', index: italicMatch.index, length: italicMatch[0].length, text: italicMatch[1] }
      }
    }

    if (!earliest) {
      // No more formatting, add remaining text
      if (remaining.trim()) {
        children.push({
          _type: 'span',
          _key: `span_${blockIdx}_${spanIdx++}`,
          text: remaining,
          marks: [],
        })
      }
      break
    }

    // Add text before the match
    if (earliest.index > 0) {
      children.push({
        _type: 'span',
        _key: `span_${blockIdx}_${spanIdx++}`,
        text: remaining.substring(0, earliest.index),
        marks: [],
      })
    }

    // Add the formatted text
    if (earliest.type === 'bold') {
      children.push({
        _type: 'span',
        _key: `span_${blockIdx}_${spanIdx++}`,
        text: earliest.text,
        marks: ['strong'],
      })
    } else if (earliest.type === 'italic') {
      children.push({
        _type: 'span',
        _key: `span_${blockIdx}_${spanIdx++}`,
        text: earliest.text,
        marks: ['em'],
      })
    } else if (earliest.type === 'link') {
      const linkKey = `link_${blockIdx}_${spanIdx}`
      children.push({
        _type: 'span',
        _key: `span_${blockIdx}_${spanIdx++}`,
        text: earliest.text,
        marks: [linkKey],
        __href: earliest.href,
      })
    }

    remaining = remaining.substring(earliest.index + earliest.length)
  }

  if (children.length === 0) {
    children.push({
      _type: 'span',
      _key: `span_${blockIdx}_0`,
      text,
      marks: [],
    })
  }

  return children
}

async function main() {
  const absolutePath = resolve(filePath)
  const content = readFileSync(absolutePath, 'utf-8')
  const { frontmatter, body } = parseMarkdown(content)

  const slug = frontmatter.slug as string
  const title = frontmatter.title as string
  const excerpt = frontmatter.excerpt as string
  const publishedAt = frontmatter.publishedAt as string
  const categoryNames = (frontmatter.categories || []) as string[]

  console.log(`Publishing: ${title}`)
  console.log(`Slug: ${slug}`)

  // Ensure categories exist
  const categoryRefs: Array<{ _type: 'reference'; _ref: string; _key: string }> = []
  for (const catName of categoryNames) {
    const catSlug = catName.toLowerCase().replace(/\s+/g, '-')
    const catId = `cat-${catSlug}`

    await client.createIfNotExists({
      _id: catId,
      _type: 'category',
      title: catName,
      slug: { _type: 'slug', current: catSlug },
    })

    categoryRefs.push({ _type: 'reference', _ref: catId, _key: `catref_${categoryRefs.length}` })
    console.log(`  Category: ${catName} (${catId})`)
  }

  // Convert markdown body to portable text
  const bodyBlocks = markdownToBlocks(body)

  // Author reference
  const authorId = '3f8277bd-cb65-43c7-9500-a45643bbfdc3' // Bill Rice

  // Create or update the post
  const postId = `post-${slug}`
  const doc = {
    _id: postId,
    _type: 'post',
    title,
    slug: { _type: 'slug', current: slug },
    excerpt,
    publishedAt: new Date(publishedAt).toISOString(),
    author: { _type: 'reference', _ref: authorId },
    categories: categoryRefs,
    body: bodyBlocks,
  }

  await client.createOrReplace(doc)
  console.log(`\nPublished: https://billrice.com/blog/${slug}`)

  // Notify IndexNow (Bing/Yandex)
  try {
    const indexnowKey = '58e67ed8f262d121576ae18a808d14c9'
    const url = `https://billrice.com/blog/${slug}`
    const params = new URLSearchParams({ url, key: indexnowKey })
    const res = await fetch(`https://api.indexnow.org/IndexNow?${params}`)
    console.log(`IndexNow: HTTP ${res.status}`)
  } catch (err) {
    console.warn('IndexNow notification failed (non-fatal):', err)
  }
}

main().catch((err) => {
  console.error('Error:', err.message)
  process.exit(1)
})
