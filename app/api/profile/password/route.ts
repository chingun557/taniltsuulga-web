import { getCurrentUser } from '@/lib/session'
import { findUserById, updateUser } from '@/lib/users'
import { verifyPassword, hashPassword } from '@/lib/auth'

export async function POST(request: Request) {
  const current = await getCurrentUser()
  if (!current) {
    return Response.json({ error: 'Нэвтрээгүй байна.' }, { status: 401 })
  }

  let body: { currentPassword?: unknown; newPassword?: unknown }
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Хүсэлт буруу байна.' }, { status: 400 })
  }

  const currentPassword = String(body.currentPassword ?? '')
  const newPassword = String(body.newPassword ?? '')

  if (newPassword.length < 8) {
    return Response.json(
      { error: 'Шинэ нууц үг дор хаяж 8 тэмдэгт байх ёстой.' },
      { status: 400 },
    )
  }

  const user = await findUserById(current.id)
  if (!user) {
    return Response.json({ error: 'Хэрэглэгч олдсонгүй.' }, { status: 404 })
  }
  if (!verifyPassword(currentPassword, user.passwordHash)) {
    return Response.json(
      { error: 'Одоогийн нууц үг буруу байна.' },
      { status: 400 },
    )
  }

  await updateUser(user.id, { passwordHash: hashPassword(newPassword) })
  return Response.json({ ok: true })
}
