import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  useCdn,
} from 'lib/sanity.api'
import {
  indexQuery,
  type Post,
  postAndMoreStoriesQuery,
  postBySlugQuery,
  postSlugsQuery,
  type Settings,
  settingsQuery,
} from 'lib/sanity.queries'
import { createClient, type SanityClient } from 'next-sanity'
import { defaultLanguage } from './i18n/languages'

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
    stega: {
      enabled: preview?.token ? true : false,
      studioUrl,
    },
  })
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'previewDrafts',
    })
  }
  return client
}

export const getSanityImageConfig = () => getClient()

export async function getSettings(client: SanityClient): Promise<Settings> {
  return (await client.fetch(settingsQuery)) || {}
}

export async function getAllPosts(
  client: SanityClient,
  language: string = 'hr'
): Promise<Post[]> {
  return (await client.fetch(indexQuery, { language })) || []
}

interface PostSlug {
  slug: string;
  language: string;
}

export async function getAllPostsSlugs(): Promise<PostSlug[]> {
  const client = getClient()
  const slugs = await client.fetch<PostSlug[]>(postSlugsQuery)
  return slugs || []
}

export async function getPostBySlug(
  client: SanityClient,
  slug: string,
  language: string = 'hr'
): Promise<Post> {
  return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
}

export async function getPostAndMoreStories(
  client: SanityClient,
  slug: string,
  language: string = 'hr'
): Promise<{ post: Post; morePosts: Post[] }> {
  return await client.fetch(postAndMoreStoriesQuery, {
    slug,
    language
  })
}