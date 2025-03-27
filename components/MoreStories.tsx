import PostPreview from 'components/PostPreview'
import type { Post } from 'lib/sanity.queries'
import { useParams } from 'next/navigation'
import { translations } from '../lib/i18n/translations'

export default function MoreStories({ posts }: { posts: Post[] }) {
  const params = useParams()
  const currentLang = (params?.lang as string) || 'hr'
  const t = translations[currentLang as keyof typeof translations]

  return (
    <section>
      <h2 className="mb-8 text-6xl font-bold leading-tight tracking-tighter">
        {t.moreStories}
      </h2>
      <div className="mb-32 grid grid-cols-1 gap-y-20 md:grid-cols-2 md:gap-x-16 md:gap-y-32 lg:gap-x-32">
        {posts.map((post) => (
          <PostPreview
            key={post._id}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  )
}