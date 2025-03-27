import { getAboutPage } from '../../../lib/about.queries'
import { getClient } from '../../../lib/sanity.client'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from '../../_app'
import { languages, defaultLanguage } from '../../../lib/i18n/languages'
import AboutTemplate from '../../../components/AboutTemplate'

interface PageProps extends SharedPageProps {
  page: any
  language: string
}

interface Query {
  lang: string
}

export default function AboutPage(props: PageProps) {
  const { page, preview, loading } = props
  return <AboutTemplate page={page} preview={preview} loading={loading} />
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { params = {} } = ctx
  const client = getClient()
  const language = params.lang || defaultLanguage?.id || 'hr'

  try {
    const page = await getAboutPage(client, language)

    if (!page) {
      console.log('About page not found for language:', language)
      return { notFound: true }
    }

    return {
      props: {
        page,
        language,
        preview: false,
        loading: false
      },
      revalidate: 1,
    }
  } catch (error) {
    console.error('Error fetching about page:', error)
    return { notFound: true }
  }
}

export const getStaticPaths = async () => {
  const paths = languages.map((lang) => ({
    params: { lang: lang.id },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}