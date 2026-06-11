import { cookies } from 'next/headers'
import {
  createSessionToken,
  sessionCookieOptions,
  verifyPassword,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from '@/lib/auth'
import { findUserByEmail, toPublicUser } from '@/lib/users'

export async function POST(request: Request) {
  let body: { email?: string; password?: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Хүсэлт буруу байна.' }, { status: 400 })
  }

  const email = (body.email ?? '').trim()
  const password = body.password ?? ''

  if (!email || !password) {
    return Response.json(
      { error: 'Имэйл болон нууц үгээ оруулна уу.' },
      { status: 400 },
    )
  }

  const user = await findUserByEmail(email)
  // Generic message either way, so we don't reveal which field was wrong.
  if (!user || !verifyPassword(password, user.passwordHash)) {
    return Response.json(
      { error: 'Имэйл эсвэл нууц үг буруу байна.' },
      { status: 401 },
    )
  }

  const token = createSessionToken({
    userId: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  })
  const store = await cookies()
  store.set(SESSION_COOKIE, token, sessionCookieOptions())

  return Response.json({ user: toPublicUser(user) })
}
