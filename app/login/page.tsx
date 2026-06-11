'use client'

/* ════════════════════════════════════════════════════════════
   GANTS — Login page (/login)
   Posts credentials to /api/auth/login, then redirects to the
   dashboard. Styling lives in the shared .auth-* classes in
   globals.css.
   ════════════════════════════════════════════════════════════ */

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function BrandMark() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="login-mark-grad" x1="0" y1="0" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="0.5" stopColor="#6366f1" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect width="30" height="30" rx="9" fill="url(#login-mark-grad)" />
      <g stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 9 L21 21" opacity="0.85" />
        <path d="M9 21 L21 9" opacity="0.85" />
        <circle cx="9" cy="9" r="2.4" fill="#fff" stroke="none" />
        <circle cx="21" cy="9" r="2.4" fill="#fff" stroke="none" />
        <circle cx="9" cy="21" r="2.4" fill="#fff" stroke="none" />
        <circle cx="21" cy="21" r="2.4" fill="#fff" stroke="none" />
        <circle cx="15" cy="15" r="2.8" fill="#fff" stroke="none" />
      </g>
    </svg>
  )
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" style={{ display: 'block' }}>
      <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
      <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.02-3.7H.96v2.34A9 9 0 0 0 9 18z" />
      <path fill="#FBBC05" d="M3.98 10.72a5.4 5.4 0 0 1 0-3.44V4.94H.96a9 9 0 0 0 0 8.12l3.02-2.34z" />
      <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.46 3.44 1.35l2.58-2.58A9 9 0 0 0 .96 4.94l3.02 2.34C4.68 5.16 6.66 3.58 9 3.58z" />
    </svg>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error ?? 'Нэвтрэхэд алдаа гарлаа. Дахин оролдоно уу.')
        return
      }
      router.push('/dashboard')
      router.refresh()
    } catch {
      setError('Сервертэй холбогдоход алдаа гарлаа. Дахин оролдоно уу.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-root">
      {/* Ambient decorative blobs */}
      <div className="blob auth-blob-a" />
      <div className="blob auth-blob-b" />

      <div className="auth-shell">
        {/* Back to home */}
        <Link href="/" className="auth-back">
          <span aria-hidden="true">←</span> Нүүр хуудас руу буцах
        </Link>

        <section className="glass-strong auth-card">
          {/* Brand */}
          <Link href="/" className="auth-brand" aria-label="GANTS нүүр хуудас">
            <BrandMark />
            <span className="auth-brand-word">
              <span style={{ color: '#fff' }}>GA</span>
              <span className="gradient-text">NTS</span>
            </span>
          </Link>

          <h1 className="auth-title">
            Эргэн <span className="gradient-text">тавтай морил</span>
          </h1>
          <p className="auth-sub text-dim">
            Бизнесийн сүлжээгээ үргэлжлүүлэхийн тулд бүртгэлдээ нэвтэрнэ үү.
          </p>

          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <label className="auth-field">
              <span className="auth-label">Имэйл хаяг</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                placeholder="ta@kompani.mn"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="auth-field">
              <span className="auth-label-row">
                <span className="auth-label">Нууц үг</span>
                <a href="#forgot" className="auth-link auth-forgot">
                  Нууц үгээ мартсан уу?
                </a>
              </span>
              <span className="auth-input-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  className="auth-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="auth-eye"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Нууц үг нуух' : 'Нууц үг харах'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? 'Нуух' : 'Харах'}
                </button>
              </span>
            </label>

            <label className="auth-remember">
              <input type="checkbox" name="remember" className="auth-check" />
              <span className="text-dim">Намайг сана</span>
            </label>

            <button
              type="submit"
              className="btn-primary auth-submit"
              disabled={loading}
            >
              {loading ? 'Нэвтэрч байна…' : 'Нэвтрэх'}
            </button>
          </form>

          <div className="auth-divider">
            <span className="hairline" />
            <span className="auth-or text-faint">эсвэл</span>
            <span className="hairline" />
          </div>

          <button type="button" className="btn-secondary auth-google">
            <GoogleMark />
            Google-ээр нэвтрэх
          </button>

          <p className="auth-foot text-dim">
            Бүртгэл байхгүй юу?{' '}
            <Link href="/register" className="auth-link">
              Үнэгүй бүртгүүлэх
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}
