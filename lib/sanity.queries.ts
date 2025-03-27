import { groq } from 'next-sanity'

const postFields = groq`
  _id,
  title,
  date,
  _updatedAt,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
  language,
  translationOf->{
    _id,
    "slug": slug.current,
    language
  }
`

export const settingsQuery = groq`*[_type == "settings"][0]`

export const indexQuery = groq`
*[_type == "post" && language == $language] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const allPostsQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

export const postAndMoreStoriesQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug && language == $language][0] {
    ${postFields},
    content,
    "translations": *[_type == "post" && references(^._id)] {
      _id,
      language,
      "slug": slug.current
    }
  },
  "morePosts": *[_type == "post" && slug.current != $slug && language == $language] | order(date desc, _updatedAt desc) [0...2] {
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)]{
  "slug": slug.current,
  language
}`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields},
  content
}`

export interface Translation {
  _id: string
  slug: string
  language: string
}

export interface Post {
  _id: string
  title?: string
  coverImage?: any
  date?: string
  _updatedAt?: string
  excerpt?: string
  author?: Author
  slug?: string
  content?: any
  language?: string
  translationOf?: Translation
  translations?: Translation[]
}

export interface Author {
  name?: string
  picture?: any
}

export interface Settings {
  title?: string
  description?: any[]
  ogImage?: {
    title?: string
  }
}