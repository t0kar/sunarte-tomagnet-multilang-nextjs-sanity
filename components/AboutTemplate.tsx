'use client'

import { PortableText } from '@portabletext/react'
import { AboutPage } from '../lib/about.queries'
import AlertBanner from './AlertBanner'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import LanguageSelector from 'components/LanguageSelector'
import { useParams } from 'next/navigation'

export interface AboutTemplateProps {
  preview?: boolean
  loading?: boolean
  page: AboutPage
}

export default function AboutTemplate({ preview, loading, page }: AboutTemplateProps) {
  return (
    <>
      <div className="min-h-screen">
        <AlertBanner preview={preview} loading={loading} />
        <header className="flex items-center justify-between max-w-6xl mx-auto p-4">
          <Navbar />
          <div className="w-32">
            <LanguageSelector />
          </div>
        </header>
        <main>
          <div className="container mx-auto px-5">
            <article className="prose lg:prose-xl mx-auto mt-10 mb-20">
              <h1 className="text-4xl font-bold mb-10">{page.title}</h1>
              {page.content && <PortableText value={page.content} />}
            </article>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}