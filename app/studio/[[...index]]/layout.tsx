export const metadata = {
  title: 'TechOn Magnet Blog',
  description: 'TechOn Magnet Blog',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div style={{ height: '100vh' }}>{children}</div>
}