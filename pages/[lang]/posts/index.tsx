import { GetStaticProps } from 'next'
import { languages, defaultLanguage } from '../../lib/i18n/languages'
import { NextResponse } from 'next/server'

interface Props {
  lang: string
}

// This component won't render - it just handles redirects
export default function Page() {
  return null
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const lang = params?.lang || defaultLanguage?.id || 'hr'

  return {
    redirect: {
      destination: `/${lang}`,
      permanent: false,
    },
    props: {},
  }
}

export async function getStaticPaths() {
  const paths = languages.map((lang) => ({
    params: {
      lang: lang.id,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}