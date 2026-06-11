'use client'

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export interface ProfileInitial {
  name: string
  email: string
  company: string
  role: string
  bio: string
}

export default function ProfileForm({ initial }: { initial: ProfileInitial }) {
  const router = useRouter()
  const [name, setName] = useState<string>(initial.name)
  const [email, setEmail] = useState<string>(initial.email)
  const [company, setCompany] = useState<string>(initial.company)
  const [role, setRole] = useState<string>(initial.role)
  const [bio, setBio] = useState<string>(initial.bio)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setLoading(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, role, bio }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error ?? 'Хадгалахад алдаа гарлаа. Дахин оролдоно уу.')
        return
      }
      setSuccess(true)
      router.refresh()
    } catch {
      setError('Сервертэй холбогдоход алдаа гарлаа. Дахин оролдоно уу.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form" noValidate>
      {error && (
        <div className="auth-error" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="app-success" role="status">
          Профайл амжилттай хадгалагдлаа.
        </div>
      )}

      <div className="app-grid">
        <label className="auth-field">
          <span className="auth-label">Нэр</span>
          <input
            type="text"
            className="auth-input"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="auth-field">
          <span className="auth-label">Имэйл хаяг</span>
          <input
            type="email"
            className="auth-input"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="auth-field">
          <span className="auth-label">Байгууллага</span>
          <input
            type="text"
            className="auth-input"
            autoComplete="organization"
            placeholder="Компанийн нэр"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
        <label className="auth-field">
          <span className="auth-label">Албан тушаал</span>
          <input
            type="text"
            className="auth-input"
            autoComplete="organization-title"
            placeholder="Жишээ нь: Гүйцэтгэх захирал"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </label>
      </div>

      <label className="auth-field">
        <span className="auth-label">Танилцуулга</span>
        <textarea
          className="auth-input"
          maxLength={500}
          placeholder="Өөрийгөө болон бизнесээ товч танилцуулна уу."
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <span className="auth-hint text-faint">{bio.length}/500 тэмдэгт</span>
      </label>

      <div className="app-actions">
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Хадгалж байна…' : 'Хадгалах'}
        </button>
      </div>
    </form>
  )
}
