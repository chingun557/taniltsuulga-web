export default function AuroraBackground() {
  return (
    <div
      aria-hidden
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}
    >
      {/* Base vertical gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(120% 80% at 50% -10%, rgba(99,102,241,0.16), transparent 60%), linear-gradient(180deg, #060815 0%, #070a1c 50%, #060815 100%)',
        }}
      />

      {/* Aurora blobs */}
      <div
        className="blob animate-float-slow"
        style={{
          top: '-8%', left: '-6%', width: 520, height: 520,
          background: 'radial-gradient(circle, rgba(59,130,246,0.40), transparent 65%)',
        }}
      />
      <div
        className="blob animate-float"
        style={{
          top: '20%', right: '-8%', width: 460, height: 460,
          background: 'radial-gradient(circle, rgba(139,92,246,0.38), transparent 65%)',
          animationDelay: '1.5s',
        }}
      />
      <div
        className="blob animate-float-slow"
        style={{
          bottom: '-10%', left: '25%', width: 540, height: 540,
          background: 'radial-gradient(circle, rgba(6,182,212,0.30), transparent 65%)',
          animationDelay: '3s',
        }}
      />

      {/* Fine grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.4,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 40%, transparent 100%)',
        }}
      />

      {/* Bottom fade for legibility */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0, height: '30%',
          background: 'linear-gradient(to top, #060815, transparent)',
        }}
      />
    </div>
  )
}
