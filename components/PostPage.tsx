import PostTitle from 'components/PostTitle'
import PostHeader from 'components/PostHeader'
import PostBody from 'components/PostBody'
import MoreStories from 'components/MoreStories'
import Layout from 'components/Layout'
import { Post } from '../lib/sanity.queries'

interface PostPageProps {
  preview?: boolean
  loading?: boolean
  post: Post
  morePosts: any[]
  settings?: any
}

export default function PostPage(props: PostPageProps) {
  const { preview, loading, post, morePosts, settings } = props
  
  return (
    <Layout preview={preview} loading={loading} post={post}>
      <article className="mb-32">
        <PostTitle title={post.title} />
        <PostHeader
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
        />
        <PostBody content={post.content} />
      </article>
      {morePosts?.length > 0 && <MoreStories posts={morePosts} />}
    </Layout>
  )
}