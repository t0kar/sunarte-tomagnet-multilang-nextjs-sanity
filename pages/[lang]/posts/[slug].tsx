import PostPage from 'components/PostPage'
import PreviewPostPage from 'components/PreviewPostPage'
import { readToken } from 'lib/sanity.api'
import {
  getAllPostsSlugs,
  getClient,
  getPostAndMoreStories,
  getSettings,
} from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'
import { languages, defaultLanguage } from '../../../lib/i18n/languages'

interface PageProps extends SharedPageProps {
  post: Post
  morePosts: Post[]
  settings?: Settings
  language: string
}

interface Query {
  lang: string
  slug: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { settings, post, morePosts, draftMode } = props

  if (draftMode) {
    return (
      <PreviewPostPage post={post} morePosts={morePosts} settings={settings} />
    )
  }

  return <PostPage post={post} morePosts={morePosts} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const language = params.lang || 'hr'

  try {
    const [settings, { post, morePosts }] = await Promise.all([
      getSettings(client),
      getPostAndMoreStories(client, params.slug, language),
    ])

    if (!post) {
      console.log('Post not found:', params.slug, language)
      return { notFound: true }
    }

    console.log('Found post:', post._id, 'in language:', language)
    return {
      props: {
        post,
        morePosts,
        settings,
        draftMode,
        token: draftMode ? readToken : '',
        language,
      },
      revalidate: 1, // Add ISR with a 1 second revalidation period
    }
  } catch (error) {
    console.error('Error fetching post:', error)
    return { notFound: true }
  }
}

export const getStaticPaths = async () => {
  try {
    const slugs = await getAllPostsSlugs()
    console.log('Found slugs:', slugs)

    // Create paths only for existing posts
    const paths = slugs.map(({ slug, language }) => ({
      params: { lang: language, slug }
    }))

    console.log('Generated paths:', paths)

    return {
      paths,
      fallback: 'blocking'
    }
  } catch (error) {
    console.error('Error generating paths:', error)
    return {
      paths: [],
      fallback: 'blocking'
    }
  }
}