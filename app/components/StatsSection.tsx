'use client'

import { useEffect, useRef } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  animate,
  type MotionValue,
} from 'framer-motion'

/* ── Stat data model ──────────────────────────────────────────── */
interface Stat {
  target: number
  suffix: string
  label: string
}

const STATS: readonly Stat[] = [
  { target: 10000, suffix: '+', label: 'Бизнес' },
  { target: 50000, suffix: '+', label: 'Холболт' },
  { target: 100, suffix: '+', label: 'Салбар' },
  { target: 25, suffix: '+', label: 'Улс' },
]

const formatNumber = (value: number): string =>
  Math.round(value).toLocaleString('en-US')

/* ── Single animated counter ──────────────────────────────────── */
interface CounterProps {
  stat: Stat
  index: number
  inView: boolean
}

function Counter({ stat, index, inView }: CounterProps) {
  const numberRef = useRef<HTMLSpanElement>(null)
  const count: MotionValue<number> = useMotionValue(0)

  useEffect(() => {
    const node = numberRef.current
    if (!node) return

    const unsubscribe = count.on('change', (latest: number) => {
      node.textContent = formatNumber(latest)
    })

    if (inView) {
      const controls = animate(count, stat.target, {
        duration: 1.8,
        ease: 'easeOut',
        delay: index * 0.12,
      })
      return () => {
        controls.stop()
        unsubscribe()
      }
    }

    // Keep showing 0 (formatted) until in view.
    node.textContent = formatNumber(count.get())
    return unsubscribe
  }, [count, inView, stat.target, index])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.08 }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 8,
        padding: '8px 12px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'center',
          fontWeight: 800,
          lineHeight: 1,
          fontSize: 'clamp(2.4rem, 5.2vw, 3.4rem)',
          letterSpacing: '-0.02em',
        }}
      >
        <span ref={numberRef} className="gradient-text">
          0
        </span>
        <span
          className="gradient-text"
          style={{ fontSize: '0.7em', marginLeft: 2 }}
          aria-hidden="true"
        >
          {stat.suffix}
        </span>
      </div>
      <span
        className="text-dim"
        style={{
          fontSize: '0.95rem',
          fontWeight: 500,
          letterSpacing: '0.01em',
        }}
      >
        {stat.label}
      </span>
    </motion.div>
  )
}

/* ── Section ──────────────────────────────────────────────────── */
export default function StatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-120px' })

  return (
    <section
      style={{
        position: 'relative',
        paddingBlock: 'clamp(64px, 10vw, 96px)',
      }}
      aria-label="Статистик"
    >
      <div className="container-x">
        {/* Eyebrow header */}
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
            gap: 16,
            marginBottom: 'clamp(32px, 5vw, 48px)',
          }}
        >
          <span className="badge">БИДЭНД ИТГЭДЭГ</span>
          <h2
            className="h-section"
            style={{ maxWidth: 620, margin: 0 }}
          >
            Бодит үр дүнгээр{' '}
            <span className="gradient-text">хэмжигдсэн</span> өсөлт
          </h2>
        </motion.div>

        {/* Stats panel */}
        <motion.div
          ref={sectionRef}
          className="glass-strong"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 0,
            padding: 'clamp(28px, 4vw, 40px) clamp(20px, 3vw, 32px)',
            overflow: 'hidden',
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                position: 'relative',
                paddingInline: 'clamp(12px, 2vw, 24px)',
                paddingBlock: 12,
              }}
            >
              {/* Vertical separator (between columns, hidden on the first of a row visually via subtle styling) */}
              {i > 0 && (
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '15%',
                    bottom: '15%',
                    width: 1,
                    background:
                      'linear-gradient(to bottom, transparent, rgba(255,255,255,0.12), transparent)',
                  }}
                />
              )}
              <Counter stat={stat} index={i} inView={inView} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
