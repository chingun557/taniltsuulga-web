'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Feature = {
  title: string
  description: string
  icon: ReactNode
  /** gradient tint stops for the icon tile background + stroke color */
  from: string
  to: string
  stroke: string
}

const iconProps = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const FEATURES: Feature[] = [
  {
    title: 'Ухаалаг Бизнес Хайлт',
    description:
      'Салбар, байршил, хэмжээ зэрэг шүүлтүүрээр хүссэн компаниа хэдхэн секундын дотор олж, шууд холбогдоорой.',
    from: 'rgba(59,130,246,0.22)',
    to: 'rgba(59,130,246,0.04)',
    stroke: '#60a5fa',
    icon: (
      <svg {...iconProps}>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.2-3.2" />
      </svg>
    ),
  },
  {
    title: 'AI Санал Болголт',
    description:
      'Хиймэл оюун таны бизнест хамгийн тохирох хамтрагч, харилцагчдыг өгөгдөл дээр үндэслэн ухаалгаар санал болгоно.',
    from: 'rgba(139,92,246,0.22)',
    to: 'rgba(139,92,246,0.04)',
    stroke: '#a78bfa',
    icon: (
      <svg {...iconProps}>
        <path d="M12 3.5l1.9 4.6L18.5 10l-4.6 1.9L12 16.5l-1.9-4.6L5.5 10l4.6-1.9L12 3.5Z" />
        <path d="M18.5 16.5l.7 1.6 1.6.7-1.6.7-.7 1.6-.7-1.6-1.6-.7 1.6-.7.7-1.6Z" />
      </svg>
    ),
  },
  {
    title: 'Шууд Холбоо Барих',
    description:
      'Платформ дотроосоо шууд мессеж бичиж, хүсэлт илгээн, аливаа байгууллагатай хурдан, найдвартай харилцаарай.',
    from: 'rgba(6,182,212,0.22)',
    to: 'rgba(6,182,212,0.04)',
    stroke: '#22d3ee',
    icon: (
      <svg {...iconProps}>
        <path d="M20 11.5a7.5 7.5 0 0 1-10.9 6.7L4 19.5l1.3-5.1A7.5 7.5 0 1 1 20 11.5Z" />
        <path d="M9 11h.01M12 11h.01M15 11h.01" />
      </svg>
    ),
  },
  {
    title: 'Баталгаажсан Байгууллагууд',
    description:
      'Бүх компанийн мэдээллийг шалгаж баталгаажуулдаг тул та зөвхөн итгэлтэй, найдвартай түншүүдтэй ажиллана.',
    from: 'rgba(99,102,241,0.22)',
    to: 'rgba(99,102,241,0.04)',
    stroke: '#818cf8',
    icon: (
      <svg {...iconProps}>
        <path d="M12 3 5 6v5.5c0 4.3 2.9 7.4 7 9 4.1-1.6 7-4.7 7-9V6l-7-3Z" />
        <path d="m9 11.5 2 2 4-4.2" />
      </svg>
    ),
  },
  {
    title: 'Төсөл Хамтын Ажиллагаа',
    description:
      'Нэг орон зайд төсөл үүсгэж, баг бүрдүүлэн, түншүүдтэйгээ хамтран ажиллаж, үр дүнг хамтдаа хүргээрэй.',
    from: 'rgba(59,130,246,0.2)',
    to: 'rgba(139,92,246,0.05)',
    stroke: '#60a5fa',
    icon: (
      <svg {...iconProps}>
        <path d="m12 3 8 4.5-8 4.5-8-4.5L12 3Z" />
        <path d="m4 12 8 4.5L20 12" />
        <path d="m4 16.5 8 4.5 8-4.5" />
      </svg>
    ),
  },
  {
    title: 'Бизнес Аналитик',
    description:
      'Профайлын идэвх, холболт, өсөлтийн чиг хандлагыг харуулсан дашбордоор шийдвэрээ тоон мэдээлэлд тулгуурлан гаргаарай.',
    from: 'rgba(6,182,212,0.2)',
    to: 'rgba(99,102,241,0.05)',
    stroke: '#22d3ee',
    icon: (
      <svg {...iconProps}>
        <path d="M4 20V4" />
        <path d="M4 20h16" />
        <path d="M8 20v-6" />
        <path d="M13 20V9" />
        <path d="M18 20v-9" />
      </svg>
    ),
  },
]

export default function FeaturesSection() {
  return (
    <section
      id="features"
      style={{
        position: 'relative',
        paddingBlock: 'clamp(64px, 10vw, 96px)',
      }}
    >
      {/* decorative glow */}
      <div
        aria-hidden
        className="blob"
        style={{
          top: '12%',
          left: '-6%',
          width: 360,
          height: 360,
          background:
            'radial-gradient(circle, rgba(99,102,241,0.5), transparent 70%)',
          opacity: 0.32,
        }}
      />
      <div
        aria-hidden
        className="blob"
        style={{
          bottom: '6%',
          right: '-8%',
          width: 380,
          height: 380,
          background:
            'radial-gradient(circle, rgba(6,182,212,0.45), transparent 70%)',
          opacity: 0.26,
        }}
      />

      <div className="container-x" style={{ position: 'relative' }}>
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
            marginBottom: 'clamp(40px, 6vw, 64px)',
          }}
        >
          <span className="badge">БОЛОМЖУУД</span>
          <h2 className="h-section" style={{ margin: 0, maxWidth: 720 }}>
            Бизнесээ өсгөх бүх <span className="gradient-text">хэрэгсэл</span>
          </h2>
          <p
            className="text-dim"
            style={{ margin: 0, maxWidth: 560, fontSize: '1.05rem' }}
          >
            Хайлтаас эхлээд хамтын ажиллагаа, аналитик хүртэл — таны бизнесийг
            нэг дороос холбож, өсгөх бүхий л боломжийг GANTS нэгтгэв.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
          }}
        >
          {FEATURES.map((feature, index) => (
            <motion.article
              key={feature.title}
              className="glass card-hover"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay: Math.min(index * 0.08, 0.4),
              }}
              whileHover={{ y: -6 }}
              style={{
                padding: 28,
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
                height: '100%',
              }}
            >
              {/* Icon tile */}
              <div
                aria-hidden
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  display: 'grid',
                  placeItems: 'center',
                  color: feature.stroke,
                  background: `linear-gradient(135deg, ${feature.from}, ${feature.to})`,
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                {feature.icon}
              </div>

              <h3
                style={{
                  margin: 0,
                  fontSize: '1.15rem',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                }}
              >
                {feature.title}
              </h3>

              <p
                className="text-dim"
                style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.65 }}
              >
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
