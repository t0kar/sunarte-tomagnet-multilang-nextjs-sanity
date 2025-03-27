import AuthorAvatar from 'components/AuthorAvatar'
import CoverImage from 'components/CoverImage'
import Date from 'components/PostDate'
import type { Post } from 'lib/sanity.queries'
import Link from 'next/link'
import { getPostUrl } from 'lib/urls'
import { useParams } from 'next/navigation'

export default function HeroPost(
  props: Pick<
    Post,
    'title' | 'coverImage' | 'date' | 'excerpt' | 'author' | 'slug' | 'language'
  >,
) {
  const { title, coverImage, date, excerpt, author, slug, language } = props
  const params = useParams()
  const currentLang = (params?.lang as string) || language || 'en'

  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage slug={slug} title={title} image={coverImage} priority />
      </div>
      <div className="mb-20 md:mb-28 md:grid md:grid-cols-2 md:gap-x-16 lg:gap-x-8">
        <div>
          <h3 className="mb-4 text-4xl leading-tight lg:text-6xl text-balance">
            <Link href={getPostUrl(slug, currentLang)} className="hover:underline">
              {title || 'Untitled'}
            </Link>
          </h3>
          <div className="mb-4 text-lg md:mb-0">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          {excerpt && (
            <p className="mb-4 text-lg leading-relaxed text-pretty">
              {excerpt}
            </p>
          )}
          {author && (
            <AuthorAvatar name={author.name} picture={author.picture} />
          )}
        </div>
      </div>
    </section>
  )
}