import { groq } from 'next-sanity'

export const aboutQuery = groq`
*[_type == "about" && language == $language][0] {
  _id,
  title,
  content,
  language,
  translationOf->{
    _id,
    language
  },
  "translations": *[_type == "about" && references(^._id)]{
    _id,
    language
  }
}`

export interface AboutPage {
  _id: string
  title?: string
  content?: any
  language?: string
  translationOf?: {
    _id: string
    language: string
  }
  translations?: {
    _id: string
    language: string
  }[]
}

export async function getAboutPage(client: any, language: string = 'hr'): Promise<AboutPage> {
  try {
    return await client.fetch(aboutQuery, { language }) || {}
  } catch (error) {
    console.error('Error fetching about page:', error)
    return {}
  }
}