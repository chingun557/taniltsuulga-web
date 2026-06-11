/* ════════════════════════════════════════════════════════════
   GANTS — User store (server-only)
   A simple JSON-file backed store at data/users.json. Good enough
   for a self-contained demo; swap for a real database later by
   keeping this module's public API the same.
   ════════════════════════════════════════════════════════════ */

import { promises as fs } from 'node:fs'
import path from 'node:path'
import { randomBytes } from 'node:crypto'
import { hashPassword } from './auth'

export interface User {
  id: string
  name: string
  email: string
  passwordHash: string
  company?: string
  role?: string
  bio?: string
  createdAt: string
  updatedAt?: string
}

/** User shape safe to send to the client (no password hash). */
export interface PublicUser {
  id: string
  name: string
  email: string
  company?: string
  role?: string
  bio?: string
  createdAt: string
}

const DATA_DIR = path.join(process.cwd(), 'data')
const USERS_FILE = path.join(DATA_DIR, 'users.json')

async function readUsers(): Promise<User[]> {
  try {
    const raw = await fs.readFile(USERS_FILE, 'utf8')
    return JSON.parse(raw) as User[]
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return []
    throw err
  }
}

async function writeUsers(users: User[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8')
}

export function toPublicUser(u: User): PublicUser {
  return {
    id: u.id,
    name: u.name,
    email: u.email,
    company: u.company,
    role: u.role,
    bio: u.bio,
    createdAt: u.createdAt,
  }
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const norm = normalizeEmail(email)
  const users = await readUsers()
  return users.find((u) => u.email === norm) ?? null
}

export async function findUserById(id: string): Promise<User | null> {
  const users = await readUsers()
  return users.find((u) => u.id === id) ?? null
}

export async function createUser(input: {
  name: string
  email: string
  password: string
}): Promise<User> {
  const email = normalizeEmail(input.email)
  const users = await readUsers()
  if (users.some((u) => u.email === email)) {
    throw new Error('EMAIL_TAKEN')
  }
  const user: User = {
    id: randomBytes(12).toString('hex'),
    name: input.name.trim(),
    email,
    passwordHash: hashPassword(input.password),
    createdAt: new Date().toISOString(),
  }
  users.push(user)
  await writeUsers(users)
  return user
}

/** Fields a user is allowed to change on their own account. */
type UpdatablePatch = Partial<
  Pick<User, 'name' | 'email' | 'company' | 'role' | 'bio' | 'passwordHash'>
>

export async function updateUser(
  id: string,
  patch: UpdatablePatch,
): Promise<User> {
  const users = await readUsers()
  const idx = users.findIndex((u) => u.id === id)
  if (idx === -1) throw new Error('NOT_FOUND')

  const next: User = { ...users[idx] }

  if (patch.email !== undefined) {
    const email = normalizeEmail(patch.email)
    if (users.some((u) => u.id !== id && u.email === email)) {
      throw new Error('EMAIL_TAKEN')
    }
    next.email = email
  }
  if (patch.name !== undefined) next.name = patch.name.trim()
  if (patch.company !== undefined) next.company = patch.company.trim()
  if (patch.role !== undefined) next.role = patch.role.trim()
  if (patch.bio !== undefined) next.bio = patch.bio.trim()
  if (patch.passwordHash !== undefined) next.passwordHash = patch.passwordHash

  next.updatedAt = new Date().toISOString()
  users[idx] = next
  await writeUsers(users)
  return next
}
