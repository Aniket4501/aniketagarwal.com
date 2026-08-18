import Link from 'next/link'
import { Container } from '@/components/layout/Container'

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center gap-3 py-10">
      <p className="eyebrow">404</p>
      <h1 className="max-w-[20ch] text-[length:var(--text-3xl)] leading-[1.1] font-semibold tracking-[var(--track-h2)]">
        That page isn&rsquo;t here.
      </h1>
      <p className="max-w-[52ch] text-[var(--text-base)] leading-relaxed text-[var(--color-muted)]">
        Nothing on this site has moved, so this is most likely a mistyped URL.
      </p>
      <p className="flex flex-wrap gap-x-3 gap-y-1 font-[family-name:var(--font-mono)] text-[var(--text-sm)]">
        <Link href="/" className="text-[var(--color-signal)]">
          Home
        </Link>
        <Link href="/work" className="text-[var(--color-signal)]">
          The work
        </Link>
        <Link href="/lab/grounded" className="text-[var(--color-signal)]">
          Grounded
        </Link>
      </p>
    </Container>
  )
}
