import { getCurrentUser } from '@/lib/session'
import { updateUser, toPublicUser } from '@/lib/users'

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
const MAX_BIO = 500

export async function PATCH(request: Request) {
  const current = await getCurrentUser()
  if (!current) {
    return Response.json({ error: 'Нэвтрээгүй байна.' }, { status: 401 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Хүсэлт буруу байна.' }, { status: 400 })
  }

  const patch: {
    name?: string
    email?: string
    company?: string
    role?: string
    bio?: string
  } = {}

  if (body.name !== undefined) {
    const name = String(body.name).trim()
    if (name.length < 2) {
      return Response.json({ error: 'Нэрээ оруулна уу.' }, { status: 400 })
    }
    patch.name = name
  }
  if (body.email !== undefined) {
    const email = String(body.email).trim()
    if (!EMAIL_RE.test(email)) {
      return Response.json({ error: 'Имэйл хаяг буруу байна.' }, { status: 400 })
    }
    patch.email = email
  }
  if (body.company !== undefined) patch.company = String(body.company).slice(0, 120)
  if (body.role !== undefined) patch.role = String(body.role).slice(0, 120)
  if (body.bio !== undefined) patch.bio = String(body.bio).slice(0, MAX_BIO)

  try {
    const updated = await updateUser(current.id, patch)
    return Response.json({ user: toPublicUser(updated) })
  } catch (err) {
    if (err instanceof Error && err.message === 'EMAIL_TAKEN') {
      return Response.json(
        { error: 'Энэ имэйл хаяг өөр бүртгэлд ашиглагдсан байна.' },
        { status: 409 },
      )
    }
    throw err
  }
}
