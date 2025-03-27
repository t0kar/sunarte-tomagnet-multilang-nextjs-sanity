import Link from 'next/link'
import { useParams } from 'next/navigation'
import { translations } from '../lib/i18n/translations'

export default function Navbar() {
  const params = useParams()
  const currentLang = (params?.lang as string) || 'hr'
  const t = translations[currentLang as keyof typeof translations]

  return (
    <nav className="flex space-x-4">
      <Link 
        href={`/${currentLang}`}
        className="text-lg font-medium text-gray-900 hover:text-gray-700"
      >
        {t.home}
      </Link>
      <Link 
        href={`/${currentLang}/about`}
        className="text-lg font-medium text-gray-900 hover:text-gray-700"
      >
        {t.about}
      </Link>
    </nav>
  )
}