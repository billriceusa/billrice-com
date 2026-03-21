import { defineType, defineField, defineArrayMember } from 'sanity'
import { CalendarIcon } from '@sanity/icons'

export const nowPage = defineType({
  name: 'nowPage',
  title: 'Now Page',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priorities',
      title: 'Current Strategic Priorities',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'blockContent',
            }),
          ],
          preview: {
            select: { title: 'title' },
          },
        }),
      ],
    }),
    defineField({
      name: 'speakingTopics',
      title: 'Speaking Topics',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'consultingAvailability',
      title: 'Consulting Availability',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Now Page' }
    },
  },
})
