import { defineType, defineField, defineArrayMember } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'headline',
      title: 'Page Headline',
      type: 'string',
      initialValue: 'About Bill Rice',
    }),
    defineField({
      name: 'heroTagline',
      title: 'Hero Tagline',
      type: 'text',
      rows: 3,
      description: 'Short positioning statement shown next to the headshot',
    }),
    defineField({
      name: 'shortVersion',
      title: 'The Short Version',
      type: 'blockContent',
      description: 'Narrative career story — shown under "The Short Version" heading',
    }),
    defineField({
      name: 'differentiators',
      title: 'What Makes My Background Unusual',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
    }),
    defineField({
      name: 'timelineEvents',
      title: 'Career Timeline',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'year', title: 'Year(s)', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 4 }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'year' },
            prepare: ({ title, subtitle }) => ({ title, subtitle }),
          },
        }),
      ],
    }),
    defineField({
      name: 'expertiseAreas',
      title: 'Areas of Expertise',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'area', title: 'Area', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'detail', title: 'Detail', type: 'string' }),
          ],
          preview: { select: { title: 'area' } },
        }),
      ],
    }),
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'degree', title: 'Degree', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'institution', title: 'Institution', type: 'string' }),
            defineField({ name: 'year', title: 'Year', type: 'string' }),
          ],
          preview: {
            select: { title: 'degree', subtitle: 'institution' },
          },
        }),
      ],
    }),
    defineField({
      name: 'currentVentures',
      title: 'Current Ventures',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
            defineField({ name: 'role', title: 'Role', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
            defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
          ],
          preview: { select: { title: 'name', subtitle: 'role' } },
        }),
      ],
    }),
    defineField({
      name: 'speakingWriting',
      title: 'Speaking & Writing',
      type: 'blockContent',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'About Page' }
    },
  },
})
