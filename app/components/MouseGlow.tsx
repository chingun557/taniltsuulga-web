'use client'

import { useEffect, useRef } from 'react'

/**
 * Mouse-follow radial glow. A single fixed element whose transform is
 * updated via rAF for smooth, GPU-friendly tracking. Disabled on touch /
 * coarse pointers where it adds no value.
 */
export default function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const el = ref.current
    if (!el) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let curX = targetX
    let curY = targetY
    let raf = 0

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      if (el.style.opacity !== '1') el.style.opacity = '1'
    }

    const loop = () => {
      curX += (targetX - curX) * 0.12
      curY += (targetY - curY) * 0.12
      el.style.transform = `translate3d(${curX - 250}px, ${curY - 250}px, 0)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 500,
        height: 500,
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 1,
        opacity: 0,
        transition: 'opacity 0.6s ease',
        background:
          'radial-gradient(circle, rgba(99,102,241,0.10) 0%, rgba(6,182,212,0.05) 35%, transparent 70%)',
      }}
    />
  )
}
