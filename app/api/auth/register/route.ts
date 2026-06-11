import { cookies } from 'next/headers'
import {
  createSessionToken,
  sessionCookieOptions,
  SESSION_COOKIE,
  SESSION_MAX_AGE,
} from '@/lib/auth'
import { createUser, toPublicUser } from '@/lib/users'

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

export async function POST(request: Request) {
  let body: { name?: string; email?: string; password?: string }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Хүсэлт буруу байна.' }, { status: 400 })
  }

  const name = (body.name ?? '').trim()
  const email = (body.email ?? '').trim()
  const password = body.password ?? ''

  if (name.length < 2) {
    return Response.json({ error: 'Нэрээ оруулна уу.' }, { status: 400 })
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: 'Имэйл хаяг буруу байна.' }, { status: 400 })
  }
  if (password.length < 8) {
    return Response.json(
      { error: 'Нууц үг дор хаяж 8 тэмдэгт байх ёстой.' },
      { status: 400 },
    )
  }

  let user
  try {
    user = await createUser({ name, email, password })
  } catch (err) {
    if (err instanceof Error && err.message === 'EMAIL_TAKEN') {
      return Response.json(
        { error: 'Энэ имэйл хаягаар бүртгэл аль хэдийн үүссэн байна.' },
        { status: 409 },
      )
    }
    throw err
  }

  const token = createSessionToken({
    userId: user.id,
    email: user.email,
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  })
  const store = await cookies()
  store.set(SESSION_COOKIE, token, sessionCookieOptions())

  return Response.json({ user: toPublicUser(user) }, { status: 201 })
}
