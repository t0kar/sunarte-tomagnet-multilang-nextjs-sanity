import BlogHeader from 'components/BlogHeader'
import Layout from 'components/Layout'
import HeroPost from 'components/HeroPost'
import MoreStories from 'components/MoreStories'
import { Settings } from 'lib/sanity.queries'
import { useParams } from 'next/navigation'
import { translations } from '../lib/i18n/translations'

export interface IndexPageProps {
  preview?: boolean
  loading?: boolean
  posts: any[]
  settings: Settings
}

export default function IndexPage(props: IndexPageProps) {
  const { preview, loading, posts, settings } = props
  const params = useParams()
  const currentLang = (params?.lang as string) || 'hr'
  const t = translations[currentLang as keyof typeof translations]
  
  const [heroPost, ...morePosts] = posts || []

  return (
    <Layout preview={preview} loading={loading}>
      <div className="container mx-auto px-5">
        <BlogHeader title={t.blogTitle} level={1} />
        {posts.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-lg text-gray-600">{t.noPosts}</p>
          </div>
        ) : (
          <>
            {heroPost && (
              <HeroPost
                title={heroPost.title}
                coverImage={heroPost.coverImage}
                date={heroPost.date}
                author={heroPost.author}
                slug={heroPost.slug}
                excerpt={heroPost.excerpt}
              />
            )}
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </div>
    </Layout>
  )
}