import IndexPage from 'components/IndexPage'
import PreviewIndexPage from 'components/PreviewIndexPage'
import { readToken } from 'lib/sanity.api'
import { getAllPosts, getClient, getSettings } from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'
import { languages } from '../../lib/i18n/languages'

interface PageProps extends SharedPageProps {
  posts: Post[]
  settings: Settings
  language: string
}

interface Query {
  lang: string
  [key: string]: string
}

export default function Page(props: PageProps) {
  const { posts, settings, draftMode } = props

  if (draftMode) {
    return <PreviewIndexPage posts={posts} settings={settings} />
  }

  return <IndexPage posts={posts} settings={settings} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  
  // Ensure we have a language parameter
  if (!params?.lang) {
    return { notFound: true }
  }

  // Get the language from params
  const language = params.lang

  // Log the language we're using
  console.log('Fetching posts for language:', language)

  const [settings, posts = []] = await Promise.all([
    getSettings(client),
    getAllPosts(client, language),
  ])

  // Log how many posts we found
  console.log(`Found ${posts.length} posts for language: ${language}`)

  return {
    props: {
      posts,
      settings,
      draftMode,
      token: draftMode ? readToken : '',
      language,
    },
  }
}

export async function getStaticPaths() {
  // Generate paths for all supported languages
  const paths = languages.map((lang) => ({
    params: { lang: lang.id },
  }))

  console.log('Generated homepage paths:', paths)

  return {
    paths,
    fallback: false,
  }
}