/* ════════════════════════════════════════════════════════════
   GANTS — Dashboard (/dashboard)
   Protected route: server-side checks the session and redirects
   to /login when there is no authenticated user.
   ════════════════════════════════════════════════════════════ */

import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/session'
import LogoutButton from './LogoutButton'

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const letters = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '')
  return letters.join('') || 'G'
}

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')

  return (
    <main className="app-root">
      <div className="blob auth-blob-a" />
      <div className="blob auth-blob-b" />

      <div className="app-shell">
        <header className="app-top">
          <Link href="/" className="auth-brand" aria-label="GANTS нүүр хуудас" style={{ marginBottom: 0 }}>
            <span className="auth-brand-word">
              <span style={{ color: '#fff' }}>GA</span>
              <span className="gradient-text">NTS</span>
            </span>
          </Link>
          <nav className="app-nav">
            <Link href="/profile" className="app-navlink">
              Профайл
            </Link>
            <LogoutButton />
          </nav>
        </header>

        <section className="glass-strong app-card">
          <div className="app-avatar" aria-hidden="true">
            {initials(user.name)}
          </div>
          <p className="eyebrow gradient-text" style={{ marginBottom: 8 }}>
            Хяналтын самбар
          </p>
          <h1 className="app-title">
            Сайн байна уу, <span className="gradient-text">{user.name}</span> 👋
          </h1>
          <p className="text-dim" style={{ margin: '0 0 4px' }}>
            Та амжилттай нэвтэрлээ. Бүртгэлтэй имэйл:
          </p>
          <p style={{ margin: 0, fontWeight: 600 }}>{user.email}</p>

          <div className="hairline" style={{ margin: '28px 0' }} />

          <p className="text-dim" style={{ margin: 0, fontSize: '0.95rem' }}>
            Энэ бол таны хувийн самбар. Удахгүй энд хамтрагч, харилцагч, хөрөнгө
            оруулагчдын холболтууд гарч ирнэ.
          </p>
        </section>
      </div>
    </main>
  )
}
