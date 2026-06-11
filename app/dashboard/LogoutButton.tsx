'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  const handleLogout = async (): Promise<void> => {
    setLoading(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/login')
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      type="button"
      className="btn-secondary"
      onClick={handleLogout}
      disabled={loading}
      style={{ opacity: loading ? 0.65 : 1 }}
    >
      {loading ? 'Гарч байна…' : 'Гарах'}
    </button>
  )
}
