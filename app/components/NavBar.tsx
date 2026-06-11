'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

type NavLink = { label: string; href: string }

const NAV_LINKS: NavLink[] = [
  { label: 'Нүүр', href: '#home' },
  { label: 'Боломжууд', href: '#features' },
  { label: 'Хэрхэн Ажилладаг', href: '#how-it-works' },
  { label: 'Үнэ', href: '#pricing' },
  { label: 'Түншлэл', href: '#partners' },
  { label: 'Холбоо Барих', href: '#contact' },
]

function BrandMark() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id="nexus-mark-grad" x1="0" y1="0" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3b82f6" />
          <stop offset="0.5" stopColor="#6366f1" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <rect width="30" height="30" rx="9" fill="url(#nexus-mark-grad)" />
      <g stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 9 L21 21" opacity="0.85" />
        <path d="M9 21 L21 9" opacity="0.85" />
        <circle cx="9" cy="9" r="2.4" fill="#fff" stroke="none" />
        <circle cx="21" cy="9" r="2.4" fill="#fff" stroke="none" />
        <circle cx="9" cy="21" r="2.4" fill="#fff" stroke="none" />
        <circle cx="21" cy="21" r="2.4" fill="#fff" stroke="none" />
        <circle cx="15" cy="15" r="2.8" fill="#fff" stroke="none" />
      </g>
    </svg>
  )
}

export default function NavBar() {
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    const onScroll = (): void => {
      setScrolled(window.scrollY > 30)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile panel is open.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
    return undefined
  }, [open])

  const closeMenu = (): void => setOpen(false)

  return (
    <motion.nav
      initial={{ y: -88, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition:
          'background-color 0.4s ease, backdrop-filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
        backgroundColor: scrolled ? 'rgba(6, 8, 21, 0.7)' : 'rgba(6, 8, 21, 0)',
        backdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'blur(0px)',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'blur(0px)',
        borderBottom: `1px solid ${scrolled ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0)'}`,
        boxShadow: scrolled ? '0 8px 30px -16px rgba(0, 0, 0, 0.6)' : 'none',
      }}
    >
      <div
        className="container-x"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 'clamp(60px, 8vw, 72px)',
          gap: '16px',
        }}
      >
        {/* Brand */}
        <a
          href="#home"
          onClick={closeMenu}
          aria-label="GANTS нүүр хуудас"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none',
            flexShrink: 0,
          }}
        >
          <motion.span
            whileHover={{ rotate: 8, scale: 1.06 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
            style={{
              display: 'inline-flex',
              filter: 'drop-shadow(0 6px 16px rgba(99, 102, 241, 0.5))',
            }}
          >
            <BrandMark />
          </motion.span>
          <span
            style={{
              fontWeight: 800,
              fontSize: '1.3rem',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            <span style={{ color: '#fff' }}>GA</span>
            <span className="gradient-text">NTS</span>
          </span>
        </a>

        {/* Center links (desktop) */}
        <div className="nexus-nav-links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="nexus-nav-link">
              {link.label}
            </a>
          ))}
        </div>

        {/* Right CTAs (desktop) */}
        <div className="nexus-nav-cta">
          <Link
            href="/login"
            className="btn-secondary"
            style={{ padding: '10px 20px', fontSize: '0.9rem', borderRadius: '12px' }}
          >
            Нэвтрэх
          </Link>
          <Link
            href="/register"
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '0.9rem', borderRadius: '12px' }}
          >
            Үнэгүй Эхлэх
          </Link>
        </div>

        {/* Hamburger (mobile) */}
        <button
          type="button"
          className="nexus-nav-burger"
          aria-label={open ? 'Цэс хаах' : 'Цэс нээх'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            cursor: 'pointer',
            color: 'var(--text)',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            flexShrink: 0,
          }}
        >
          <span
            aria-hidden="true"
            style={{
              position: 'relative',
              display: 'block',
              width: '20px',
              height: '14px',
            }}
          >
            <motion.span
              animate={open ? { top: '6px', rotate: 45 } : { top: '0px', rotate: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: '20px',
                height: '2px',
                borderRadius: '99px',
                background: 'currentColor',
              }}
            />
            <motion.span
              animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                left: 0,
                top: '6px',
                width: '20px',
                height: '2px',
                borderRadius: '99px',
                background: 'currentColor',
              }}
            />
            <motion.span
              animate={open ? { top: '6px', rotate: -45 } : { top: '12px', rotate: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                left: 0,
                top: '12px',
                width: '20px',
                height: '2px',
                borderRadius: '99px',
                background: 'currentColor',
              }}
            />
          </span>
        </button>
      </div>

      {/* Mobile dropdown panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="nexus-nav-panel-wrap"
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '12px 24px 24px' }}>
              <div
                className="glass-strong"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '14px',
                  gap: '4px',
                }}
              >
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.05, duration: 0.3 }}
                    style={{
                      display: 'block',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      color: 'var(--text)',
                      textDecoration: 'none',
                      fontWeight: 500,
                      fontSize: '1rem',
                    }}
                  >
                    {link.label}
                  </motion.a>
                ))}

                <div className="hairline" style={{ margin: '10px 0' }} />

                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="btn-secondary"
                  style={{ width: '100%', padding: '12px 20px' }}
                >
                  Нэвтрэх
                </Link>
                <Link
                  href="/register"
                  onClick={closeMenu}
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px 20px', marginTop: '8px' }}
                >
                  Үнэгүй Эхлэх
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nexus-nav-links {
          display: flex;
          align-items: center;
          gap: clamp(14px, 2vw, 30px);
        }
        .nexus-nav-link {
          position: relative;
          color: var(--text-dim);
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 500;
          padding: 6px 2px;
          white-space: nowrap;
          transition: color 0.25s ease;
        }
        .nexus-nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          width: 100%;
          border-radius: 99px;
          background: linear-gradient(120deg, #60a5fa, #a78bfa, #22d3ee);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .nexus-nav-link:hover {
          color: var(--text);
        }
        .nexus-nav-link:hover::after {
          transform: scaleX(1);
        }
        .nexus-nav-cta {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        @media (max-width: 900px) {
          .nexus-nav-links,
          .nexus-nav-cta {
            display: none !important;
          }
          .nexus-nav-burger {
            display: inline-flex !important;
          }
        }
        @media (min-width: 901px) {
          .nexus-nav-panel-wrap {
            display: none !important;
          }
        }
      `}</style>
    </motion.nav>
  )
}
