/* ════════════════════════════════════════════════════════════
   GANTS — Profile (/profile)
   Protected route. Lets the signed-in user edit their details and
   change their password.
   ════════════════════════════════════════════════════════════ */

import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/session'
import LogoutButton from '../dashboard/LogoutButton'
import ProfileForm from './ProfileForm'
import PasswordForm from './PasswordForm'

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  const letters = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '')
  return letters.join('') || 'G'
}

function memberSince(iso: string): string {
  try {
    return new Intl.DateTimeFormat('mn-MN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(iso))
  } catch {
    return iso.slice(0, 10)
  }
}

export default async function ProfilePage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')

  const subtitle = [user.role, user.company].filter(Boolean).join(' · ')

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
            <Link href="/dashboard" className="app-navlink">
              Самбар
            </Link>
            <LogoutButton />
          </nav>
        </header>

        {/* Summary */}
        <section className="glass-strong app-card">
          <div className="app-avatar" aria-hidden="true">
            {initials(user.name)}
          </div>
          <p className="eyebrow gradient-text" style={{ marginBottom: 8 }}>
            Профайл
          </p>
          <h1 className="app-title" style={{ marginBottom: 6 }}>
            {user.name}
          </h1>
          {subtitle && (
            <p className="text-dim" style={{ margin: '0 0 4px' }}>
              {subtitle}
            </p>
          )}
          <p className="text-dim" style={{ margin: 0, fontSize: '0.92rem' }}>
            {user.email} · {memberSince(user.createdAt)}-нд элссэн
          </p>
        </section>

        {/* Edit profile */}
        <section className="glass-strong app-card">
          <h2 className="app-section-title">Профайл мэдээлэл</h2>
          <p className="text-dim" style={{ margin: '0 0 24px', fontSize: '0.92rem' }}>
            Бусдад харагдах мэдээллээ шинэчилнэ үү.
          </p>
          <ProfileForm
            initial={{
              name: user.name,
              email: user.email,
              company: user.company ?? '',
              role: user.role ?? '',
              bio: user.bio ?? '',
            }}
          />
        </section>

        {/* Change password */}
        <section className="glass-strong app-card">
          <h2 className="app-section-title">Нууц үг солих</h2>
          <p className="text-dim" style={{ margin: '0 0 24px', fontSize: '0.92rem' }}>
            Аюулгүй байдлын үүднээс нууц үгээ тогтмол шинэчилж байгаарай.
          </p>
          <PasswordForm />
        </section>
      </div>
    </main>
  )
}
