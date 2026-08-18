export function Container({
  children,
  className = '',
  width = 'default',
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  width?: 'default' | 'prose' | 'wide'
  as?: 'div' | 'header' | 'section' | 'footer'
}) {
  const max =
    width === 'prose' ? 'max-w-[76ch]' : width === 'wide' ? 'max-w-[1400px]' : 'max-w-[1200px]'
  return (
    <Tag className={`mx-auto w-full ${max} px-6 sm:px-8 lg:px-10 ${className}`}>{children}</Tag>
  )
}
