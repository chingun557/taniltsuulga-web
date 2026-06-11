/* ════════════════════════════════════════════════════════════
   GANTS — Auth primitives (server-only)
   Password hashing (scrypt) + signed session tokens (HMAC).
   Uses only Node's built-in crypto — no external dependencies.
   ════════════════════════════════════════════════════════════ */

import {
  scryptSync,
  randomBytes,
  timingSafeEqual,
  createHmac,
} from 'node:crypto'

/**
 * Resolve the signing secret lazily (at request time, not import time) so a
 * missing secret never breaks `next build`. In production we refuse to fall
 * back to the well-known dev secret — signing with it would let anyone forge
 * session tokens.
 */
function getSecret(): string {
  const secret = process.env.AUTH_SECRET
  if (secret && secret.length > 0) return secret
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'AUTH_SECRET is not set. Set it to a long random string in production ' +
        '(generate one with `openssl rand -hex 32`).',
    )
  }
  return 'dev-insecure-secret-change-me-in-production'
}

export const SESSION_COOKIE = 'gants_session'
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 days, in seconds

/* ── Password hashing ── */

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${hash}`
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, key] = stored.split(':')
  if (!salt || !key) return false
  const hash = scryptSync(password, salt, 64)
  const keyBuf = Buffer.from(key, 'hex')
  if (keyBuf.length !== hash.length) return false
  return timingSafeEqual(hash, keyBuf)
}

/* ── Session tokens (payload.signature, both base64url) ── */

export interface SessionPayload {
  userId: string
  email: string
  exp: number // expiry, epoch seconds
}

function sign(data: string): string {
  return createHmac('sha256', getSecret()).update(data).digest('base64url')
}

export function createSessionToken(payload: SessionPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString('base64url')
  return `${body}.${sign(body)}`
}

export function verifySessionToken(
  token: string | undefined | null,
): SessionPayload | null {
  if (!token) return null
  const [body, sig] = token.split('.')
  if (!body || !sig) return null

  const expected = sign(body)
  const sigBuf = Buffer.from(sig)
  const expBuf = Buffer.from(expected)
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) {
    return null
  }

  try {
    const payload = JSON.parse(
      Buffer.from(body, 'base64url').toString(),
    ) as SessionPayload
    if (typeof payload.exp !== 'number' || payload.exp * 1000 < Date.now()) {
      return null
    }
    return payload
  } catch {
    return null
  }
}

/* ── Cookie options shared by all auth route handlers ── */

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  }
}
