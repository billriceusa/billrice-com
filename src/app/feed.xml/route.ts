import { client } from '@/sanity/lib/client'

export const dynamic = 'force-dynamic'

export async function GET() {
  const posts = await client.fetch(
    `*[_type == "post" && defined(slug.current) && publishedAt <= now()]
     | order(publishedAt desc) [0...50] {
       title,
       "slug": slug.current,
       excerpt,
       publishedAt,
       author->{ name }
     }`
  )

  const baseUrl = 'https://billrice.com'
  const items = (posts || [])
    .map(
      (post: { title: string; slug: string; excerpt: string; publishedAt: string; author: { name: string } | null }) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description><![CDATA[${post.excerpt || ''}]]></description>
      <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
      <guid>${baseUrl}/blog/${post.slug}</guid>
      ${post.author ? `<dc:creator><![CDATA[${post.author.name}]]></dc:creator>` : ''}
    </item>`
    )
    .join('')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Bill Rice Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Insights on lead generation, B2B marketing strategy, and building revenue engines.</description>
    <language>en-US</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`

  return new Response(feed, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
