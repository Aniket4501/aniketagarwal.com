export function Container({
  children,
  className = '',
  width = 'default',
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  width?: 'default' | 'prose' | 'wide' | 'narrow'
  as?: 'div' | 'header' | 'section' | 'footer' | 'article'
}) {
  const max = {
    narrow: 'max-w-[52rem]',
    prose: 'max-w-[var(--measure)]',
    default: 'max-w-[76rem]',
    wide: 'max-w-[88rem]',
  }[width]
  return (
    <Tag className={`mx-auto w-full ${max} px-3 sm:px-5 lg:px-6 ${className}`}>{children}</Tag>
  )
}
