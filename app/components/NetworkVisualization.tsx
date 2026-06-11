'use client'

import { useEffect, useRef } from 'react'

/* ════════════════════════════════════════════════════════════
   GANTS — NetworkVisualization
   Canvas-based animated network of "companies" connected through
   glowing nodes & lines, with a pseudo-3D orbital depth feel.
   Pure visual centerpiece. No text, no labels.
   ════════════════════════════════════════════════════════════ */

interface NetworkVisualizationProps {
  className?: string
  style?: React.CSSProperties
}

/** Brand palette (rgb tuples) */
const PALETTE: ReadonlyArray<readonly [number, number, number]> = [
  [59, 130, 246], // blue
  [99, 102, 241], // indigo
  [139, 92, 246], // purple
  [6, 182, 212], // cyan
]

interface Node {
  /** base position on the unit sphere (radius ~1) */
  bx: number
  by: number
  bz: number
  /** rendered (post-rotation) coords, kept for line drawing */
  x: number
  y: number
  z: number
  /** projected screen-ish scale [0..1] */
  depth: number
  size: number
  color: readonly [number, number, number]
  hub: boolean
  /** phase offsets for organic drift / pulsing */
  driftPhase: number
  driftAmp: number
  pulsePhase: number
}

export default function NetworkVisualization({
  className,
  style,
}: NetworkVisualizationProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 1
    let height = 1
    let dpr = 1

    // ── Build nodes on a loose sphere (Fibonacci distribution) ──
    const NODE_COUNT = 28
    const HUB_COUNT = 4
    const nodes: Node[] = []
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < NODE_COUNT; i++) {
      // even-ish sphere point
      const y = 1 - (i / (NODE_COUNT - 1)) * 2 // 1 .. -1
      const r = Math.sqrt(Math.max(0, 1 - y * y))
      const theta = golden * i
      // add a touch of jitter so it reads as "loose" not perfect
      const jitter = 0.16
      const bx = Math.cos(theta) * r + (Math.random() - 0.5) * jitter
      const by = y + (Math.random() - 0.5) * jitter
      const bz = Math.sin(theta) * r + (Math.random() - 0.5) * jitter
      nodes.push({
        bx,
        by,
        bz,
        x: bx,
        y: by,
        z: bz,
        depth: 0.5,
        size: 1.6 + Math.random() * 1.4,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        hub: false,
        driftPhase: Math.random() * Math.PI * 2,
        driftAmp: 0.04 + Math.random() * 0.05,
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }
    // Promote a few spread-out nodes to "hubs" (larger + pulsing ring).
    const hubIdx = new Set<number>()
    while (hubIdx.size < HUB_COUNT) {
      hubIdx.add(Math.floor(Math.random() * NODE_COUNT))
    }
    hubIdx.forEach((idx) => {
      const n = nodes[idx]
      n.hub = true
      n.size = 3.4 + Math.random() * 1.2
    })

    // Pre-compute candidate neighbour pairs once (by base distance) to cap
    // per-frame work. Each node links to its few nearest neighbours.
    const pairs: Array<[number, number]> = []
    const MAX_LINKS_PER_NODE = 4
    for (let i = 0; i < NODE_COUNT; i++) {
      const dists: Array<{ j: number; d: number }> = []
      for (let j = 0; j < NODE_COUNT; j++) {
        if (i === j) continue
        const dx = nodes[i].bx - nodes[j].bx
        const dy = nodes[i].by - nodes[j].by
        const dz = nodes[i].bz - nodes[j].bz
        dists.push({ j, d: dx * dx + dy * dy + dz * dz })
      }
      dists.sort((a, b) => a.d - b.d)
      for (let k = 0; k < MAX_LINKS_PER_NODE && k < dists.length; k++) {
        const j = dists[k].j
        const a = Math.min(i, j)
        const b = Math.max(i, j)
        if (!pairs.some((p) => p[0] === a && p[1] === b)) pairs.push([a, b])
      }
    }

    // Reusable draw-order buffer (sorted far -> near each frame) to avoid
    // allocating a new array every frame.
    const order: Node[] = nodes.slice()

    const resize = () => {
      const rect = wrap.getBoundingClientRect()
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      dpr = Math.min(2, window.devicePixelRatio || 1)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
    }

    /** Project & render one frame. `t` is seconds. */
    const render = (t: number) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, width, height)

      const cx = width / 2
      const cy = height / 2
      // Sphere radius scaled to container; keep margin for glow.
      const R = Math.min(width, height) * 0.42

      // Camera-ish projection params.
      const FOV = 2.6 // perspective strength
      const VIEW = 2.4 // viewer distance from sphere centre (in unit-z)

      // Rotation angles (slow, calm). yaw is primary; gentle pitch wobble.
      const yaw = t * 0.12
      const pitch = Math.sin(t * 0.07) * 0.32
      const cosY = Math.cos(yaw)
      const sinY = Math.sin(yaw)
      const cosP = Math.cos(pitch)
      const sinP = Math.sin(pitch)

      // ── update node positions ──
      for (const n of nodes) {
        // organic drift on base position
        const drift = n.driftAmp
        const px = n.bx + Math.sin(t * 0.5 + n.driftPhase) * drift
        const py = n.by + Math.cos(t * 0.43 + n.driftPhase) * drift
        const pz = n.bz + Math.sin(t * 0.37 + n.driftPhase * 1.3) * drift

        // rotate around Y (yaw)
        const x1 = px * cosY - pz * sinY
        const z1 = px * sinY + pz * cosY
        // rotate around X (pitch)
        const y2 = py * cosP - z1 * sinP
        const z2 = py * sinP + z1 * cosP

        n.x = x1
        n.y = y2
        n.z = z2

        // perspective scale: closer (higher z toward viewer) => bigger
        const persp = FOV / (VIEW - z2)
        // normalized depth 0 (far) .. 1 (near) for opacity/scale shading
        n.depth = (z2 + 1) / 2
        // store projected screen coords back onto x/y for drawing
        n.x = cx + x1 * R * persp
        n.y = cy + y2 * R * persp
        // reuse z to carry perspective scale for radius
        n.z = persp
      }

      // ── draw connection lines (behind nodes) ──
      // Sort by depth so nearer lines/nodes paint over far ones.
      ctx.lineCap = 'round'
      for (const [ia, ib] of pairs) {
        const a = nodes[ia]
        const b = nodes[ib]
        // screen distance gate (cheap)
        const sdx = a.x - b.x
        const sdy = a.y - b.y
        const sdist = Math.sqrt(sdx * sdx + sdy * sdy)
        const maxLine = R * 1.15
        if (sdist > maxLine) continue

        const distFade = 1 - sdist / maxLine
        const depthFade = (a.depth + b.depth) / 2
        const alpha = distFade * distFade * (0.12 + depthFade * 0.34)
        if (alpha < 0.012) continue

        const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y)
        grad.addColorStop(
          0,
          `rgba(${a.color[0]},${a.color[1]},${a.color[2]},${alpha})`
        )
        grad.addColorStop(
          1,
          `rgba(${b.color[0]},${b.color[1]},${b.color[2]},${alpha})`
        )
        ctx.strokeStyle = grad
        ctx.lineWidth = 0.5 + depthFade * 1.1
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }

      // ── draw nodes (sorted far -> near) ──
      order.sort((p, q) => p.depth - q.depth)
      for (const n of order) {
        const [r, g, bcol] = n.color
        const radius = Math.max(0.6, n.size * (0.55 + n.depth * 0.85) * n.z)
        const op = 0.35 + n.depth * 0.6

        // pulsing ring on hubs
        if (n.hub && !reduceMotion) {
          const pulse = (Math.sin(t * 1.6 + n.pulsePhase) + 1) / 2 // 0..1
          const ringR = radius + 5 + pulse * 9
          const ringOp = (1 - pulse) * 0.5 * (0.4 + n.depth * 0.6)
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${r},${g},${bcol},${ringOp})`
          ctx.lineWidth = 1.2
          ctx.arc(n.x, n.y, ringR, 0, Math.PI * 2)
          ctx.stroke()
        } else if (n.hub) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(${r},${g},${bcol},${0.3 * (0.4 + n.depth * 0.6)})`
          ctx.lineWidth = 1.2
          ctx.arc(n.x, n.y, radius + 6, 0, Math.PI * 2)
          ctx.stroke()
        }

        // glow halo
        ctx.shadowColor = `rgba(${r},${g},${bcol},${op})`
        ctx.shadowBlur = (n.hub ? 18 : 10) * (0.5 + n.depth * 0.8)

        // core dot
        ctx.beginPath()
        ctx.fillStyle = `rgba(${r},${g},${bcol},${op})`
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2)
        ctx.fill()

        // bright inner highlight
        ctx.shadowBlur = 0
        ctx.beginPath()
        ctx.fillStyle = `rgba(255,255,255,${0.25 * op})`
        ctx.arc(n.x, n.y, Math.max(0.4, radius * 0.4), 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.shadowBlur = 0
    }

    // ── lifecycle ──
    let rafId = 0
    let start = 0
    const loop = (now: number) => {
      if (!start) start = now
      render((now - start) / 1000)
      rafId = window.requestAnimationFrame(loop)
    }

    resize()

    let ro: ResizeObserver | null = null
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => {
        resize()
        if (reduceMotion) render(0)
      })
      ro.observe(wrap)
    } else {
      window.addEventListener('resize', resize)
    }

    if (reduceMotion) {
      // single static frame, no loop
      render(0)
    } else {
      rafId = window.requestAnimationFrame(loop)
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId)
      if (ro) ro.disconnect()
      else window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        ...style,
      }}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  )
}
