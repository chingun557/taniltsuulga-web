'use client'

import { useState, type FormEvent } from 'react'

export default function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    if (newPassword.length < 8) {
      setError('Шинэ нууц үг дор хаяж 8 тэмдэгт байх ёстой.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/profile/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error ?? 'Нууц үг солиход алдаа гарлаа. Дахин оролдоно уу.')
        return
      }
      setSuccess(true)
      setCurrentPassword('')
      setNewPassword('')
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
          Нууц үг амжилттай солигдлоо.
        </div>
      )}

      <div className="app-grid">
        <label className="auth-field">
          <span className="auth-label">Одоогийн нууц үг</span>
          <input
            type="password"
            className="auth-input"
            autoComplete="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </label>
        <label className="auth-field">
          <span className="auth-label">Шинэ нууц үг</span>
          <input
            type="password"
            className="auth-input"
            autoComplete="new-password"
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <span className="auth-hint text-faint">Дор хаяж 8 тэмдэгт.</span>
        </label>
      </div>

      <div className="app-actions">
        <button type="submit" className="btn-secondary" disabled={loading}>
          {loading ? 'Солиж байна…' : 'Нууц үг солих'}
        </button>
      </div>
    </form>
  )
}
