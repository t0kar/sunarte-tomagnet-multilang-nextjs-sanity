'use client'

import OpenGraphInput from './OpenGraphInput'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'TechOn Magnet Blog',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      initialValue: [],
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'object',
      description: 'Used for social media previews when linking to the homepage.',
      components: {
        input: OpenGraphInput,
      },
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          initialValue: 'TechOn Magnet Blog',
        }),
      ],
    }),
  ],
})