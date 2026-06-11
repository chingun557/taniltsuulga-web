'use client'

/* ════════════════════════════════════════════════════════════
   GANTS — Register page (/register)
   Posts to /api/auth/register, then redirects to the dashboard.
   Styling lives in the shared .auth-* classes in globals.css.
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
        <linearGradient id="register-mark-grad" x1="0" y1="0" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="0.5" stopColor="#6366f1" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect width="30" height="30" rx="9" fill="url(#register-mark-grad)" />
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

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('Нууц үг дор хаяж 8 тэмдэгт байх ёстой.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error ?? 'Бүртгэхэд алдаа гарлаа. Дахин оролдоно уу.')
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
        <Link href="/" className="auth-back">
          <span aria-hidden="true">←</span> Нүүр хуудас руу буцах
        </Link>

        <section className="glass-strong auth-card">
          <Link href="/" className="auth-brand" aria-label="GANTS нүүр хуудас">
            <BrandMark />
            <span className="auth-brand-word">
              <span style={{ color: '#fff' }}>GA</span>
              <span className="gradient-text">NTS</span>
            </span>
          </Link>

          <h1 className="auth-title">
            Бизнесээ <span className="gradient-text">холбоё</span>
          </h1>
          <p className="auth-sub text-dim">
            Үнэгүй бүртгэл үүсгээд Монголын бизнес сүлжээнд нэгдээрэй.
          </p>

          {error && (
            <div className="auth-error" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <label className="auth-field">
              <span className="auth-label">Нэр</span>
              <input
                type="text"
                name="name"
                autoComplete="name"
                required
                placeholder="Таны нэр"
                className="auth-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

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
              <span className="auth-label">Нууц үг</span>
              <span className="auth-input-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="new-password"
                  required
                  minLength={8}
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
              <span className="auth-hint text-faint">
                Дор хаяж 8 тэмдэгт.
              </span>
            </label>

            <button
              type="submit"
              className="btn-primary auth-submit"
              disabled={loading}
            >
              {loading ? 'Бүртгэж байна…' : 'Үнэгүй бүртгүүлэх'}
            </button>
          </form>

          <p className="auth-foot text-dim">
            Бүртгэлтэй юу?{' '}
            <Link href="/login" className="auth-link">
              Нэвтрэх
            </Link>
          </p>
        </section>
      </div>
    </main>
  )
}
