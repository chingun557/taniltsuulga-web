import type { ReactNode } from 'react'

/* ────────────────────────────────────────────────────────────
   GANTS — Footer
   Server component (no interactivity / hooks): all hover states
   are handled via the scoped <style> block below so it can stay
   on the server while still feeling premium.
   ──────────────────────────────────────────────────────────── */

type LinkGroup = {
  title: string
  links: string[]
}

const LINK_GROUPS: LinkGroup[] = [
  { title: 'Компани', links: ['Бидний Тухай', 'Боломжууд', 'Үнэ', 'Түншлэл'] },
  { title: 'Хууль эрх зүй', links: ['Нууцлалын Бодлого', 'Үйлчилгээний Нөхцөл'] },
  { title: 'Дэмжлэг', links: ['Тусламж', 'Холбоо Барих'] },
]

const LEGAL_LINKS: string[] = ['Нууцлалын Бодлого', 'Үйлчилгээний Нөхцөл', 'Күүки']

type Social = {
  label: string
  icon: ReactNode
}

const SOCIALS: Social[] = [
  {
    label: 'Facebook',
    icon: (
      <path d="M14 8.5h2.2V5.6h-2.6c-2 0-3.4 1.3-3.4 3.5v1.6H8v2.9h2.2V20h3v-6.4h2.3l.4-2.9h-2.7V9.4c0-.6.3-.9 1-.9z" />
    ),
  },
  {
    label: 'Instagram',
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="5" />
        <circle cx="12" cy="12" r="3.6" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: 'LinkedIn',
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="3.5" />
        <line x1="8" y1="11" x2="8" y2="16.5" />
        <line x1="8" y1="8.2" x2="8" y2="8.2" />
        <path d="M11.5 16.5V12c0-1 .7-1.9 1.9-1.9s1.9.9 1.9 2.1v4.3" />
      </>
    ),
  },
  {
    label: 'X',
    icon: (
      <path d="M5.5 5.5l5.6 7.2L5.8 18.5h1.7l4.4-4.7 3.6 4.7h3.2l-5.9-7.6 4.9-5.4h-1.7l-4 4.4-3.4-4.4z" fill="currentColor" stroke="none" />
    ),
  },
  {
    label: 'YouTube',
    icon: (
      <>
        <rect x="3.5" y="6.5" width="17" height="11" rx="3.4" />
        <path d="M10.6 9.7l4.3 2.3-4.3 2.3z" fill="currentColor" stroke="none" />
      </>
    ),
  },
]

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        background: 'transparent',
        paddingTop: 'clamp(64px, 9vw, 96px)',
        paddingBottom: 'clamp(28px, 4vw, 40px)',
      }}
    >
      {/* scoped CSS so this stays a server component */}
      <style>{`
        .nx-foot-social {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 99px;
          color: var(--text-dim);
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: color .3s ease, background .3s ease,
                      border-color .3s ease, transform .3s ease,
                      box-shadow .3s ease;
        }
        .nx-foot-social:hover {
          color: #fff;
          transform: translateY(-3px);
          background: rgba(99, 102, 241, 0.16);
          border-color: rgba(139, 92, 246, 0.5);
          box-shadow: 0 12px 30px -12px rgba(99, 102, 241, 0.7);
        }
        .nx-foot-link {
          position: relative;
          color: var(--text-dim);
          text-decoration: none;
          font-size: 0.95rem;
          width: fit-content;
          transition: color .25s ease, transform .25s ease;
        }
        .nx-foot-link:hover { color: var(--text); transform: translateX(3px); }
        .nx-foot-legal {
          color: var(--text-faint);
          text-decoration: none;
          font-size: 0.84rem;
          transition: color .25s ease;
        }
        .nx-foot-legal:hover { color: var(--text); }
        .nx-foot-news-input {
          flex: 1 1 200px;
          min-width: 0;
          padding: 13px 16px;
          border-radius: 14px;
          color: var(--text);
          font-size: 0.92rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          outline: none;
          transition: border-color .3s ease, background .3s ease;
        }
        .nx-foot-news-input::placeholder { color: var(--text-faint); }
        .nx-foot-news-input:focus {
          border-color: rgba(139, 92, 246, 0.55);
          background: rgba(255, 255, 255, 0.06);
        }
      `}</style>

      <div className="container-x">
        {/* top divider */}
        <div className="hairline" style={{ marginBottom: 'clamp(40px, 6vw, 64px)' }} />

        {/* main grid: brand block + link columns
           (auto-fit + min(100%, …) so it collapses to 1 column on mobile
            without overflowing at 360px) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))',
            gap: 'clamp(36px, 5vw, 56px)',
            alignItems: 'start',
          }}
        >
          {/* ── Brand block ── */}
          <div style={{ maxWidth: 380 }}>
            {/* logo mark + wordmark */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <span
                aria-hidden
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #3b82f6, #6366f1 50%, #8b5cf6)',
                  boxShadow: '0 8px 24px -8px rgba(99,102,241,0.7), inset 0 1px 0 rgba(255,255,255,0.25)',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <circle cx="6" cy="6" r="2.4" />
                  <circle cx="18" cy="6" r="2.4" />
                  <circle cx="12" cy="18" r="2.4" />
                  <line x1="7.7" y1="7.6" x2="10.6" y2="16.2" />
                  <line x1="16.3" y1="7.6" x2="13.4" y2="16.2" />
                  <line x1="8" y1="6" x2="16" y2="6" />
                </svg>
              </span>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                <span className="gradient-text">GANTS</span>
              </span>
            </div>

            <p className="text-dim" style={{ fontSize: '0.95rem', lineHeight: 1.65, marginBottom: 24, maxWidth: 300 }}>
              Монголын бизнес холболтын шинэ экосистем.
            </p>

            {/* social icon buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="nx-foot-social"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* ── Link columns ── */}
          {LINK_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3
                className="eyebrow"
                style={{ marginBottom: 18, color: 'var(--text)' }}
              >
                {group.title}
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="nx-foot-link">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* ── Newsletter ── */}
        <div
          className="glass"
          style={{
            marginTop: 'clamp(40px, 6vw, 56px)',
            padding: 'clamp(24px, 3vw, 32px)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          <div style={{ flex: '1 1 280px', minWidth: 0 }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, marginBottom: 6 }}>
              Шинэ мэдээллийг <span className="gradient-text">эхэлж аваарай</span>
            </h3>
            <p className="text-dim" style={{ fontSize: '0.9rem', margin: 0 }}>
              Бизнесийн боломж, шинэ түнш, бүтээгдэхүүний шинэчлэлийг и-мэйлээр.
            </p>
          </div>

          <form
            style={{ display: 'flex', flexWrap: 'wrap', gap: 12, flex: '1 1 320px', minWidth: 0 }}
            aria-label="Шинэ мэдээллийн бүртгэл"
          >
            <input
              type="email"
              name="email"
              placeholder="И-мэйл хаягаа оруулна уу"
              aria-label="И-мэйл хаяг"
              className="nx-foot-news-input"
            />
            <button type="submit" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
              Бүртгүүлэх
            </button>
          </form>
        </div>

        {/* ── Bottom bar ── */}
        <div className="hairline" style={{ marginTop: 'clamp(40px, 6vw, 56px)', marginBottom: 28 }} />

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <p className="text-faint" style={{ fontSize: '0.84rem', margin: 0 }}>
            © 2025 GANTS. Бүх эрх хуулиар хамгаалагдсан.
          </p>

          <nav aria-label="Хуулийн холбоосууд" style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(14px, 2vw, 24px)' }}>
            {LEGAL_LINKS.map((link) => (
              <a key={link} href="#" className="nx-foot-legal">
                {link}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
