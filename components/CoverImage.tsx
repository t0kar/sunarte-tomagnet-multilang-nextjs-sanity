import cn from 'classnames'
import { urlForImage } from 'lib/sanity.image'
import Image from 'next/image'
import Link from 'next/link'
import { getPostUrl } from 'lib/urls'
import { useParams } from 'next/navigation'

interface CoverImageProps {
  title: string
  slug?: string
  image: any
  priority?: boolean
  language?: string
}

export default function CoverImage(props: CoverImageProps) {
  const { title, slug, image: source, priority, language } = props
  const params = useParams()
  const currentLang = (params?.lang as string) || language || 'en'

  const image = source?.asset?._ref ? (
    <div
      className={cn('shadow-small', {
        'transition-shadow duration-200 hover:shadow-medium': slug,
      })}
    >
      <Image
        className="h-auto w-full"
        width={2000}
        height={1000}
        alt=""
        src={urlForImage(source).height(1000).width(2000).url()}
        sizes="100vw"
        priority={priority}
      />
    </div>
  ) : (
    <div style={{ paddingTop: '50%', backgroundColor: '#ddd' }} />
  )

  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link href={getPostUrl(slug, currentLang)} aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  )
}