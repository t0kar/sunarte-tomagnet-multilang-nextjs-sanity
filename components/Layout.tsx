import AlertBanner from './AlertBanner'
import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import LanguageSelector from 'components/LanguageSelector'
import { Post } from '../lib/sanity.queries'

interface LayoutProps {
  preview?: boolean
  loading?: boolean
  children: React.ReactNode
  post?: Post
}

export default function Layout({
  preview,
  loading,
  children,
  post,
}: LayoutProps) {
  return (
    <>
      <div className="min-h-screen">
        <AlertBanner preview={preview} loading={loading} />
        <header className="flex items-center justify-between max-w-6xl mx-auto p-4">
          <Navbar />
          <div className="w-32">
            <LanguageSelector post={post} />
          </div>
        </header>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
