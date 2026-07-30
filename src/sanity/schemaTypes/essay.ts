import { defineType, defineField } from 'sanity'
import { BookIcon } from '@sanity/icons'

/**
 * Essay — the durable tier.
 *
 * Deliberately NOT a `post`. Posts are chronological: career stories and
 * industry pieces, ordered by date and read as "what Bill published recently."
 * Essays are the small set of pieces that only Bill can write, and they are
 * meant to stay true years from now — so the surface shows no dates and the
 * order is editorial, not chronological.
 *
 * `publishedAt` still exists, because the site needs a publish gate and the
 * sitemap needs a lastmod. It is a GATE, not a display field: nothing in
 * /essays renders it. Keep it that way — a visible date turns a durable essay
 * back into a perishable post.
 */
export const essay = defineType({
  name: 'essay',
  title: 'Essay',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'standfirst',
      title: 'Standfirst',
      type: 'text',
      rows: 3,
      description:
        'The short framing line that sits under the title — what this argues, in one or two sentences. Shown on both the index and the essay itself.',
      validation: (rule) =>
        rule.required().max(280).warning('Keep it to a sentence or two'),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description:
        'Editorial position on /essays, ascending — 1 sits at the top. Essays are ordered by argument, not by date. Ties fall back to most recently published.',
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish gate (not displayed)',
      type: 'datetime',
      description:
        'Publish gate only. The essay appears once this is set and in the past. It is never rendered on the page — essays are deliberately undated.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social share image',
      type: 'image',
      options: { hotspot: true },
      description:
        'Used for Open Graph / social cards only — not rendered on the page. Falls back to the site OG image.',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          validation: (rule) => rule.max(60).warning('Keep under 60 characters'),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          validation: (rule) =>
            rule.max(160).warning('Keep under 160 characters'),
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: 'Editorial order',
      name: 'editorialOrder',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'publishedAt', direction: 'desc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      standfirst: 'standfirst',
      order: 'order',
    },
    prepare({ title, standfirst, order }) {
      return {
        title,
        subtitle: order != null ? `${order}. ${standfirst ?? ''}` : standfirst,
      }
    },
  },
})
