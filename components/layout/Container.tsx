export function Container({
  children,
  className = '',
  width = 'default',
}: {
  children: React.ReactNode
  className?: string
  width?: 'default' | 'prose' | 'wide'
}) {
  const max =
    width === 'prose' ? 'max-w-[76ch]' : width === 'wide' ? 'max-w-[1400px]' : 'max-w-[1200px]'
  return <div className={`mx-auto w-full ${max} px-6 sm:px-8 lg:px-10 ${className}`}>{children}</div>
}
