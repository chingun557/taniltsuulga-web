'use client'

import { motion, type Variants } from 'framer-motion'
import Link from 'next/link'
import NetworkVisualization from './NetworkVisualization'

/* Animated Next.js Link, so the primary CTA navigates client-side. */
const MotionLink = motion.create(Link)

/* ── Animation variants ── */

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

/* ── Small inline icons ── */

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l10.78-6.86a1 1 0 0 0 0-1.68L9.54 4.3A1 1 0 0 0 8 5.14Z" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="#fbbf24"
      aria-hidden
    >
      <path d="M12 2.5l2.9 5.88 6.49.94-4.7 4.58 1.11 6.46L12 17.77l-5.8 3.05 1.1-6.46-4.69-4.58 6.49-.94L12 2.5Z" />
    </svg>
  )
}

/* ── Floating overlay stat chip ── */

function StatChip({
  label,
  value,
  accent,
  style,
  className,
}: {
  label: string
  value: string
  accent: string
  style?: React.CSSProperties
  className?: string
}) {
  return (
    <div
      className={`glass-strong ${className ?? ''}`}
      style={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        borderRadius: 16,
        boxShadow: '0 18px 40px -18px rgba(0,0,0,0.7)',
        zIndex: 3,
        ...style,
      }}
    >
      <span
        aria-hidden
        style={{
          flexShrink: 0,
          width: 10,
          height: 10,
          borderRadius: 99,
          background: accent,
          boxShadow: `0 0 12px ${accent}`,
        }}
      />
      <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#e7eaf3' }}>
          {value}
        </span>
        <span className="text-faint" style={{ fontSize: '0.72rem' }}>
          {label}
        </span>
      </span>
    </div>
  )
}

/* ── Avatar dots for trust row ── */

const AVATAR_GRADIENTS: readonly string[] = [
  'linear-gradient(135deg, #3b82f6, #6366f1)',
  'linear-gradient(135deg, #6366f1, #8b5cf6)',
  'linear-gradient(135deg, #8b5cf6, #06b6d4)',
  'linear-gradient(135deg, #06b6d4, #3b82f6)',
]

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '92vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 140,
        paddingBottom: 'clamp(64px, 8vh, 96px)',
        overflow: 'hidden',
        zIndex: 1,
      }}
    >
      {/* Decorative glow blobs */}
      <div
        className="blob"
        aria-hidden
        style={{
          top: '6%',
          left: '-6%',
          width: 480,
          height: 480,
          background: 'radial-gradient(circle, rgba(59,130,246,0.30), transparent 65%)',
        }}
      />
      <div
        className="blob animate-float-slow"
        aria-hidden
        style={{
          top: '30%',
          right: '-8%',
          width: 520,
          height: 520,
          background: 'radial-gradient(circle, rgba(139,92,246,0.28), transparent 65%)',
        }}
      />

      <div className="container-x" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center',
          }}
        >
          {/* ── Left column: copy ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
          >
            <motion.div variants={item}>
              <span className="badge">
                <span aria-hidden>🚀</span>
                Монголын Бизнес Холболтын Шинэ Экосистем
              </span>
            </motion.div>

            <motion.h1 variants={item} className="h-display" style={{ margin: 0 }}>
              Зөв Хүнтэй, Зөв Цагт,
              <br />
              <span className="gradient-text-animated">Зөв Холбогд.</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-dim"
              style={{ maxWidth: 520, fontSize: 'clamp(1rem, 1.4vw, 1.18rem)', margin: 0 }}
            >
              Хамтрагч, харилцагч, хөрөнгө оруулагч болон үйлчилгээ үзүүлэгчдээ
              хэдхэн секундын дотор олоорой.
            </motion.p>

            {/* CTA row */}
            <motion.div
              variants={item}
              style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}
            >
              <MotionLink
                href="/register"
                className="btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Үнэгүй Эхлэх
                <ArrowIcon />
              </MotionLink>
              <motion.a
                href="#demo"
                className="btn-secondary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <PlayIcon />
                Демо Үзэх
              </motion.a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              variants={item}
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 16,
                marginTop: 4,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {AVATAR_GRADIENTS.map((g, i) => (
                  <span
                    key={i}
                    aria-hidden
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 99,
                      background: g,
                      border: '2px solid #0a0d20',
                      marginLeft: i === 0 ? 0 : -10,
                    }}
                  />
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <div style={{ display: 'flex', gap: 2 }} aria-label="5 одтой үнэлгээ">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                </div>
                <span className="text-dim" style={{ fontSize: '0.85rem' }}>
                  <strong style={{ color: '#e7eaf3' }}>10,000+</strong> бизнес аль
                  хэдийн нэгдсэн
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right column: network viz ── */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="glass"
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(360px, 48vh, 560px)',
              borderRadius: 24,
              overflow: 'hidden',
            }}
          >
            {/* Inner glow for depth */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(80% 60% at 50% 30%, rgba(99,102,241,0.18), transparent 70%)',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            />

            <NetworkVisualization style={{ position: 'absolute', inset: 0 }} />

            {/* Floating stat chips */}
            <div className="animate-float" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3 }}>
              <StatChip
                label="сүүлийн 24 цагт"
                value="+248 шинэ холболт"
                accent="#3b82f6"
                style={{ top: '12%', left: '6%', pointerEvents: 'auto' }}
              />
            </div>
            <div className="animate-float-slow" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3 }}>
              <StatChip
                label="AI тааруулалт"
                value="98% нийцэл"
                accent="#8b5cf6"
                style={{ bottom: '12%', right: '6%', pointerEvents: 'auto' }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
