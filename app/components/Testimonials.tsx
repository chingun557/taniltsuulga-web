'use client'

import { motion } from 'framer-motion'

type Testimonial = {
  quote: string
  name: string
  role: string
  company: string
  initials: string
  gradient: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'GANTS-ийн AI тохироог ашиглаад бид зөвхөн долоо хоногийн дотор хоёр томоохон харилцагчтай гэрээ байгууллаа. Урьд нь сараар хайдаг байсан хамтрагчаа одоо хэдхэн секундын дотор олж байна.',
    name: 'Тэмүүлэн Батсайхан',
    role: 'Үүсгэн байгуулагч',
    company: 'Skylink Tech',
    initials: 'ТБ',
    gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
  },
  {
    quote:
      'Манай үйлдвэрт түүхий эд нийлүүлэгч олох нь үргэлж толгойны өвчин байсан. Платформын баталгаажуулсан компаниудын систем нь итгэл найдварыг өсгөж, шинэ ханган нийлүүлэгчидтэй хурдан холбогдоход тусалсан.',
    name: 'Оюунчимэг Дорж',
    role: 'Гүйцэтгэх захирал',
    company: 'Эрдэнэт Манүфэкчүр',
    initials: 'ОД',
    gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
  },
  {
    quote:
      'Бид агентлаг болохынхоо хувьд шинэ үйлчлүүлэгч тогтмол хайх шаардлагатай. GANTS-ээр дамжуулан зорилтот салбарынхаа брэндүүдтэй шууд холбогдож, борлуулалтын мөчлөгөө хоёр дахин богиносгосон.',
    name: 'Анхбаяр Ганболд',
    role: 'Маркетингийн захирал',
    company: 'Pixel Creative',
    initials: 'АГ',
    gradient: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
  },
  {
    quote:
      'Логистикийн салбарт найдвартай түнш олох нь чухал. Профайл бүр баталгаажсан байдаг тул бид эргэлзэлгүйгээр хамтран ажиллах боломжтой болж, тээврийн сүлжээгээ гурван аймагт өргөжүүллээ.',
    name: 'Сүхбат Энхтайван',
    role: 'Бизнес хөгжлийн менежер',
    company: 'TransMongol Logistics',
    initials: 'СЭ',
    gradient: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
  },
  {
    quote:
      'Стартап маань санхүүжилт хайж байх үед GANTS дээрх хөрөнгө оруулагчдын сүлжээ жинхэнэ ач холбогдолтой болсон. Бидний өсөлтийн үе шатанд тохирсон хоёр сангаас санал хүлээн авлаа.',
    name: 'Номин-Эрдэнэ Цогт',
    role: 'Үүсгэн байгуулагч',
    company: 'FinPay Solutions',
    initials: 'НЦ',
    gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
  },
  {
    quote:
      'Жижиглэн худалдааны сүлжээгээ тэлэхэд найдвартай ханган нийлүүлэгч, дистрибьютор хэрэгтэй байсан. AI тохироо нь манай хэрэгцээнд яг таарсан түншүүдийг санал болгож, цаг хугацаа маш их хэмнэсэн.',
    name: 'Болормаа Лхагва',
    role: 'Гүйцэтгэх захирал',
    company: 'UrbanMart Retail',
    initials: 'БЛ',
    gradient: 'linear-gradient(135deg, #6366f1, #06b6d4)',
  },
]

function Stars() {
  return (
    <div style={{ display: 'flex', gap: 3 }} aria-label="5 одны үнэлгээ">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="17"
          height="17"
          viewBox="0 0 24 24"
          fill="#fbbf24"
          stroke="#fbbf24"
          strokeWidth="1.6"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.57L12 17.56l-5.9 3.11 1.13-6.57-4.78-4.66 6.6-.96L12 2.5z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      style={{
        position: 'relative',
        zIndex: 1,
        paddingBlock: 'clamp(64px, 10vw, 96px)',
      }}
    >
      <div className="container-x">
        {/* Header */}
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
            marginBottom: 56,
          }}
        >
          <span className="badge">СЭТГЭГДЭЛ</span>
          <h2 className="h-section" style={{ margin: 0 }}>
            Тэргүүлэгчид юу <span className="gradient-text">хэлдэг вэ</span>
          </h2>
          <p className="text-dim" style={{ margin: 0, maxWidth: 560, fontSize: '1.05rem' }}>
            Монголын тэргүүлэх компани, стартап, агентлагууд GANTS-ийг яагаад сонгож, хэрхэн
            хурдацтай өсч байгааг тэдний үгээр сонсоорой.
          </p>
        </motion.div>

        {/* Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 20,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.article
              key={t.name}
              className="glass card-hover"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: Math.min(i * 0.08, 0.4) }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
                padding: 28,
              }}
            >
              <Stars />

              <p
                style={{
                  margin: 0,
                  fontSize: '1rem',
                  lineHeight: 1.65,
                  color: 'var(--text)',
                  flex: 1,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="hairline" style={{ marginTop: 4 }} />

              <footer style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div
                  aria-hidden
                  style={{
                    flexShrink: 0,
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: '#fff',
                    background: t.gradient,
                    boxShadow: '0 6px 18px -6px rgba(99,102,241,0.6), inset 0 1px 0 rgba(255,255,255,0.25)',
                  }}
                >
                  {t.initials}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: 'var(--text)', lineHeight: 1.3 }}>
                    {t.name}
                  </div>
                  <div className="text-dim" style={{ fontSize: '0.85rem', lineHeight: 1.35 }}>
                    {t.role} · {t.company}
                  </div>
                </div>
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
