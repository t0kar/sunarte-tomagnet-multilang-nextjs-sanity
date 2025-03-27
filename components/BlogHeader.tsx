interface BlogHeaderProps {
  title?: string
  level?: 1 | 2
  className?: string
}

export default function BlogHeader({ 
  title = '', 
  level = 1,
  className = ''
}: BlogHeaderProps) {
  const Tag = level === 1 ? 'h1' : 'h2'
  const titleClasses = level === 1 
    ? 'text-6xl font-bold leading-tight tracking-tighter' 
    : 'text-4xl font-bold tracking-tight'

  return (
    <header className={`mt-16 mb-10 flex flex-col items-center ${className}`}>
      <Tag className={`${titleClasses} text-center`}>
        {title}
      </Tag>
    </header>
  )
}