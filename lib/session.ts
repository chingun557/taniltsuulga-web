/* ════════════════════════════════════════════════════════════
   GANTS — Session helper (server-only)
   Reads the session cookie and resolves the current user. Use from
   Server Components and Route Handlers.
   ════════════════════════════════════════════════════════════ */

import { cookies } from 'next/headers'
import { SESSION_COOKIE, verifySessionToken } from './auth'
import { findUserById, toPublicUser, type PublicUser } from './users'

export async function getCurrentUser(): Promise<PublicUser | null> {
  const store = await cookies()
  const token = store.get(SESSION_COOKIE)?.value
  const payload = verifySessionToken(token)
  if (!payload) return null

  const user = await findUserById(payload.userId)
  return user ? toPublicUser(user) : null
}
