'use client'

import { useRouter, usePathname } from 'next/navigation'
import { languages } from '../lib/i18n/languages'
import { Post } from '../lib/sanity.queries'

interface LanguageSelectorProps {
  post?: Post
}

export default function LanguageSelector({ post }: LanguageSelectorProps) {
  const router = useRouter()
  const pathname = usePathname() || ''
  const currentLang = pathname.split('/')[1] || 'hr'

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value
    console.log('Changing to language:', newLang)

    // If we're on a post page and have the post data
    if (post && pathname.includes('/posts/')) {
      // Check for a direct translation
      const translation = post.translations?.find((t) => t.language === newLang)
      if (translation) {
        console.log('Found translation:', translation)
        window.location.href = `/${newLang}/posts/${translation.slug}`
        return
      }

      // If this is a translation, check if the target language is the original
      if (post.translationOf && post.translationOf.language === newLang) {
        console.log('Going to original post:', post.translationOf)
        window.location.href = `/${newLang}/posts/${post.translationOf.slug}`
        return
      }
    }

    // For homepage or when no translation exists
    window.location.href = `/${newLang}`
  }

  return (
    <div className="relative inline-block text-left w-full">
      <select
        value={currentLang}
        onChange={handleLanguageChange}
        className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
      >
        {languages.map((lang) => (
          <option key={lang.id} value={lang.id}>
            {lang.title}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  )
}
