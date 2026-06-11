'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface Step {
  num: string
  title: string
  desc: string
  icon: ReactNode
}

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Бүртгүүлэх',
    desc: 'Хэдхэн секундын дотор үнэгүй бүртгэл үүсгээд экосистемд нэгдээрэй.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="url(#hiw-grad)" />
        <circle cx="9" cy="7" r="4" stroke="url(#hiw-grad)" />
        <path d="M19 8v6M22 11h-6" stroke="url(#hiw-grad)" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Профайл Үүсгэх',
    desc: 'Байгууллагынхаа танилцуулга, үйлчилгээ, давуу талаа дэлгэрэнгүй харуулаарай.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" stroke="url(#hiw-grad)" />
        <circle cx="8" cy="11" r="2.3" stroke="url(#hiw-grad)" />
        <path d="M4.8 16.2c.5-1.7 2-2.7 3.2-2.7s2.7 1 3.2 2.7" stroke="url(#hiw-grad)" />
        <path d="M14.5 9.5h4M14.5 13h4M14.5 16h2.5" stroke="url(#hiw-grad)" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Хамтрагчаа Олох',
    desc: 'Ухаалаг хайлт болон AI зөвлөмжөөр өөртөө тохирох түншээ хурдан олоорой.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <circle cx="11" cy="11" r="6" stroke="url(#hiw-grad)" />
        <path d="m20 20-3.3-3.3" stroke="url(#hiw-grad)" />
        <path d="M11 8.6a2.2 2.2 0 1 1 0 4.4 2.2 2.2 0 0 1 0-4.4Z" stroke="url(#hiw-grad)" />
        <path d="M7.7 14.3c.4-1.3 1.7-2 3.3-2s2.9.7 3.3 2" stroke="url(#hiw-grad)" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Холбогдож Хамтран Ажиллах',
    desc: 'Шууд холбоо тогтоож, хэлэлцээр хийн хамтын ажиллагаагаа эхлүүлээрэй.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d="M11 7 8.5 9.5a2.1 2.1 0 0 0 0 3l.3.3a2.1 2.1 0 0 0 3 0L13 12" stroke="url(#hiw-grad)" />
        <path d="m13 17 2.5-2.5a2.1 2.1 0 0 0 0-3l-.3-.3a2.1 2.1 0 0 0-3 0L11 12.5" stroke="url(#hiw-grad)" />
        <path d="M4 8.5 6.5 6M17.5 18 20 15.5" stroke="url(#hiw-grad)" />
      </svg>
    ),
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how"
      style={{
        position: 'relative',
        zIndex: 1,
        paddingBlock: 'clamp(64px, 10vw, 96px)',
      }}
    >
      {/* Shared gradient def for all step icons */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <defs>
          <linearGradient id="hiw-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container-x">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 18,
            marginBottom: 'clamp(48px, 7vw, 72px)',
          }}
        >
          <span className="badge">
            <span
              aria-hidden
              style={{
                width: 6,
                height: 6,
                borderRadius: 99,
                background: 'linear-gradient(120deg, #60a5fa, #a78bfa)',
              }}
            />
            ХЭРХЭН АЖИЛЛАДАГ
          </span>

          <h2 className="h-section" style={{ margin: 0, maxWidth: 720 }}>
            Дөрвөн алхамаар <span className="gradient-text">эхлээрэй</span>
          </h2>

          <p className="text-dim" style={{ margin: 0, maxWidth: 560, fontSize: '1.05rem' }}>
            GANTS дээр бизнесээ холбоход төвөгтэй зүйл байхгүй. Дөрвөн энгийн алхмаар
            зөв хамтрагчдаа олж, хамтын ажиллагаагаа эхлүүлээрэй.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{ position: 'relative' }}>
          {/* Desktop connector line behind the badges */}
          <div
            aria-hidden
            className="hiw-connector"
            style={{
              position: 'absolute',
              top: 37,
              left: '12.5%',
              right: '12.5%',
              height: 2,
              background:
                'linear-gradient(to right, transparent, rgba(59,130,246,0.5), rgba(139,92,246,0.55), rgba(6,182,212,0.5), transparent)',
              borderRadius: 99,
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'clamp(28px, 4vw, 36px)',
              position: 'relative',
            }}
          >
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.12 }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: 16,
                }}
              >
                {/* Circular number badge with gradient border + icon */}
                <motion.div
                  whileHover={{ scale: 1.06 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                  style={{
                    position: 'relative',
                    width: 76,
                    height: 76,
                    borderRadius: 99,
                    padding: 2,
                    background: 'linear-gradient(135deg, #3b82f6, #6366f1 45%, #8b5cf6 75%, #06b6d4)',
                    boxShadow: '0 12px 32px -12px rgba(99,102,241,0.6)',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 99,
                      background: 'rgba(10,13,32,0.92)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      display: 'grid',
                      placeItems: 'center',
                      color: '#e7eaf3',
                    }}
                  >
                    <span style={{ width: 30, height: 30, display: 'block' }}>{step.icon}</span>
                  </div>

                  {/* Floating step number chip */}
                  <span
                    style={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      minWidth: 26,
                      height: 22,
                      padding: '0 7px',
                      borderRadius: 99,
                      display: 'grid',
                      placeItems: 'center',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                      color: '#fff',
                      background: 'linear-gradient(120deg, #6366f1, #8b5cf6)',
                      border: '1.5px solid rgba(6,8,21,0.9)',
                      boxShadow: '0 4px 12px -4px rgba(139,92,246,0.7)',
                    }}
                  >
                    {step.num}
                  </span>
                </motion.div>

                <h3
                  style={{
                    margin: 0,
                    fontSize: '1.12rem',
                    fontWeight: 700,
                    color: '#e7eaf3',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {step.title}
                </h3>

                <p
                  className="text-dim"
                  style={{
                    margin: 0,
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    maxWidth: 280,
                  }}
                >
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Hide the connector when the grid wraps / on mobile */}
      <style>{`
        @media (max-width: 1024px) {
          .hiw-connector { display: none; }
        }
      `}</style>
    </section>
  )
}
