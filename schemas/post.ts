import { defineField, defineType } from 'sanity'
import { BookIcon } from '@sanity/icons'

export default defineType({
  name: 'post',
  title: 'Post',
  icon: BookIcon,
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'Hrvatski', value: 'hr' },
          { title: 'English', value: 'en' },
          { title: 'Español', value: 'es' },
          { title: 'Français', value: 'fr' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'translationOf',
      title: 'Translation Of',
      type: 'reference',
      to: [{ type: 'post' }],
      description: 'If this is a translation, link to the original post',
      // This filter prevents circular references and self-references
      options: {
        filter: ({ document }) => ({
          filter: '_id != $id && !defined(translationOf)',
          params: { id: document._id }
        })
      }
    }),
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
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Image caption',
              description: 'Caption displayed below the image.',
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      date: 'date',
      media: 'coverImage',
      language: 'language',
    },
    prepare({ title, media, author, date, language }) {
      const subtitles = [
        language && `[${language.toUpperCase()}]`,
        author && `by ${author}`,
        date && new Date(date).toLocaleDateString(),
      ].filter(Boolean)

      return { title, media, subtitle: subtitles.join(' ') }
    },
  },
})