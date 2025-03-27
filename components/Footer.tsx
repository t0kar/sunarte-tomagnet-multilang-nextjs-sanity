import Link from 'next/link'
import { useParams } from 'next/navigation'
import { translations } from '../lib/i18n/translations'

export default function Footer() {
  const params = useParams()
  const currentLang = (params?.lang as string) || 'hr'
  const t = translations[currentLang as keyof typeof translations]

  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <div className="container mx-auto px-5">
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            TechOn Magnet
          </h3>
          <div className="flex flex-col lg:flex-row justify-end items-center lg:pl-4 lg:w-1/2">
            <a
              href="https://sanity.io"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              {t.readDocs}
            </a>
            <a
              href="https://github.com/sanity-io/nextjs-blog-cms-sanity-v3"
              className="mx-3 font-bold hover:underline"
            >
              {t.viewGithub}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}