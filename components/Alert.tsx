import AlertBanner from './AlertBanner'
import { useParams } from 'next/navigation'
import { translations } from '../lib/i18n/translations'

interface AlertProps {
  preview?: boolean
  loading?: boolean
}

export default function Alert({ preview, loading }: AlertProps) {
  const params = useParams()
  const currentLang = (params?.lang as string) || 'hr'
  const t = translations[currentLang as keyof typeof translations]

  if (!preview && !loading) return null

  return (
    <div className="border-b bg-accent-7 border-accent-7 text-white">
      <div className="py-2 text-center text-sm">
        {loading ? (
          <>{t.loading}</>
        ) : (
          <>
            {t.preview}{' '}
            <a
              href="/api/exit-preview"
              className="underline hover:text-cyan duration-200 transition-colors"
            >
              {t.exitPreview}
            </a>
          </>
        )}
      </div>
    </div>
  )
}