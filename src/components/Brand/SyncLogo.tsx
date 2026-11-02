import { useEffect, useId, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'

export type MascotMood = 'idle' | 'happy' | 'thinking' | 'waving'

export interface SyncAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  mood?: MascotMood
  /** Subtly moves eye catchlights toward mouse cursor */
  trackMouse?: boolean
  /** Renders inside the signature dark-navy rounded squircle badge */
  badged?: boolean
  /** Adds an animated AI aura ring */
  glow?: boolean
  className?: string
}

const sizeClasses: Record<NonNullable<SyncAvatarProps['size']>, string> = {
  xs: 'size-6',
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-14',
  xl: 'size-20',
}

export function SyncAvatar({
  size = 'md',
  mood = 'idle',
  trackMouse = true,
  badged = true,
  glow = false,
  className,
}: SyncAvatarProps) {
  const uid = useId().replace(/:/g, '')
  const containerRef = useRef<HTMLDivElement>(null)
  const [blinking, setBlinking] = useState(false)
  const [hovered, setHovered] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const eyeX = useSpring(rawX, { stiffness: 260, damping: 22 })
  const eyeY = useSpring(rawY, { stiffness: 260, damping: 22 })

  // Natural randomized blink cycle
  useEffect(() => {
    let blinkTimeout: ReturnType<typeof setTimeout>
    let openTimeout: ReturnType<typeof setTimeout>
    let doubleTimeout: ReturnType<typeof setTimeout>

    const scheduleNextBlink = () => {
      const delay = 3000 + Math.random() * 3600
      blinkTimeout = setTimeout(() => {
        setBlinking(true)
        openTimeout = setTimeout(() => {
          setBlinking(false)
          // Occasional cute double-blink (25% chance)
          if (Math.random() < 0.25) {
            doubleTimeout = setTimeout(() => {
              setBlinking(true)
              openTimeout = setTimeout(() => {
                setBlinking(false)
                scheduleNextBlink()
              }, 120)
            }, 130)
          } else {
            scheduleNextBlink()
          }
        }, 140)
      }, delay)
    }

    scheduleNextBlink()
    return () => {
      clearTimeout(blinkTimeout)
      clearTimeout(openTimeout)
      clearTimeout(doubleTimeout)
    }
  }, [])

  // Cursor eye-tracking without React re-renders
  useEffect(() => {
    if (!trackMouse || mood === 'thinking') {
      rawX.set(0)
      rawY.set(0)
      return
    }

    const handleMove = (e: MouseEvent) => {
      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy) || 1
      const factor = Math.min(dist / 220, 1) * 7.5
      rawX.set((dx / dist) * factor)
      rawY.set((dy / dist) * factor)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [trackMouse, mood, rawX, rawY])

  const effectiveMood: MascotMood = hovered && mood === 'idle' ? 'happy' : mood

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'relative inline-flex shrink-0 select-none items-center justify-center',
        sizeClasses[size],
        badged &&
          'rounded-[28%] bg-[#101c42] p-[8%] shadow-sm ring-1 ring-inset ring-[#15b2f7]/35',
        className
      )}
    >
      {/* Optional ambient AI glow */}
      {(glow || mood === 'thinking') && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-1 rounded-[32%] bg-linear-to-tr from-[#2055f5]/45 via-[#15b2f7]/45 to-[#8efcf6]/45 blur-xs"
          animate={{
            opacity: mood === 'thinking' ? [0.45, 0.9, 0.45] : [0.3, 0.55, 0.3],
            scale: mood === 'thinking' ? [0.96, 1.08, 0.96] : [0.98, 1.03, 0.98],
          }}
          transition={{ duration: mood === 'thinking' ? 1.4 : 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <motion.div
        className="relative size-full"
        animate={
          effectiveMood === 'thinking'
            ? { rotate: [-2, 2, -2], y: [0, -1.5, 0] }
            : effectiveMood === 'happy'
              ? { rotate: [0, -4, 4, 0], scale: 1.05 }
              : { y: [0, -0.8, 0] }
        }
        transition={
          effectiveMood === 'thinking'
            ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
            : effectiveMood === 'happy'
              ? { duration: 0.45, ease: 'easeOut' }
              : { duration: 3.6, repeat: Infinity, ease: 'easeInOut' }
        }
      >
        <img
          src="/brand/logo-mark-live.png"
          alt=""
          draggable={false}
          className="pointer-events-none block size-full object-contain"
        />

        {/* Precision SVG Eye Rig matching 512x512 coordinates */}
        <svg
          viewBox="0 0 512 512"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <defs>
            <clipPath id={`eye-l-${uid}`}>
              <circle cx="145" cy="189.5" r="25.5" />
            </clipPath>
            <clipPath id={`eye-r-${uid}`}>
              <circle cx="365.5" cy="189.5" r="25.5" />
            </clipPath>
          </defs>

          {/* Left Eye */}
          <g clipPath={`url(#eye-l-${uid})`}>
            {effectiveMood === 'happy' ? (
              <>
                <circle cx="145" cy="189.5" r="26" fill="#14b3f7" />
                <path
                  d="M 124 196 Q 145 173 166 196"
                  fill="none"
                  stroke="#121f47"
                  strokeWidth="9.5"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                <motion.g
                  style={
                    effectiveMood === 'thinking'
                      ? undefined
                      : { x: eyeX, y: eyeY }
                  }
                  animate={
                    effectiveMood === 'thinking'
                      ? { x: [-6, 6, -6], y: [-4, -6, -4] }
                      : undefined
                  }
                  transition={
                    effectiveMood === 'thinking'
                      ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
                      : undefined
                  }
                >
                  <circle cx="138" cy="181.5" r="8.5" fill="#b8fff9" />
                  <circle cx="151" cy="197" r="3.2" fill="#ffffff" fillOpacity="0.65" />
                </motion.g>
                <motion.rect
                  x="116"
                  y="160"
                  width="58"
                  height="58"
                  fill="#14b3f7"
                  initial={false}
                  animate={{ y: blinking ? 0 : -58 }}
                  transition={{ duration: 0.09, ease: 'easeInOut' }}
                />
              </>
            )}
          </g>

          {/* Right Eye */}
          <g clipPath={`url(#eye-r-${uid})`}>
            {effectiveMood === 'happy' ? (
              <>
                <circle cx="365.5" cy="189.5" r="26" fill="#14b3f7" />
                <path
                  d="M 344.5 196 Q 365.5 173 386.5 196"
                  fill="none"
                  stroke="#121f47"
                  strokeWidth="9.5"
                  strokeLinecap="round"
                />
              </>
            ) : (
              <>
                <motion.g
                  style={
                    effectiveMood === 'thinking'
                      ? undefined
                      : { x: eyeX, y: eyeY }
                  }
                  animate={
                    effectiveMood === 'thinking'
                      ? { x: [-6, 6, -6], y: [-4, -6, -4] }
                      : undefined
                  }
                  transition={
                    effectiveMood === 'thinking'
                      ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' }
                      : undefined
                  }
                >
                  <circle cx="358.5" cy="181.5" r="8.5" fill="#b8fff9" />
                  <circle cx="371.5" cy="197" r="3.2" fill="#ffffff" fillOpacity="0.65" />
                </motion.g>
                <motion.rect
                  x="336.5"
                  y="160"
                  width="58"
                  height="58"
                  fill="#14b3f7"
                  initial={false}
                  animate={{ y: blinking ? 0 : -58 }}
                  transition={{ duration: 0.09, ease: 'easeInOut' }}
                />
              </>
            )}
          </g>
        </svg>
      </motion.div>
    </div>
  )
}

export interface SyncBrandMarkProps {
  onClick?: () => void
  subtitle?: string
  className?: string
}

export function SyncBrandMark({ onClick, subtitle, className }: SyncBrandMarkProps) {
  const [clicked, setClicked] = useState(false)
  const handleClick = () => {
    setClicked(true)
    window.setTimeout(() => setClicked(false), 900)
    onClick?.()
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        'group inline-flex items-center gap-2.5 rounded-sm text-left outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className
      )}
    >
      <SyncAvatar
        size="sm"
        mood={clicked ? 'happy' : 'idle'}
        className="transition-transform duration-200 group-hover:scale-108"
      />
      <div className="min-w-0 leading-none">
        <div className="flex items-center gap-1.5">
          <span className="text-lg font-bold tracking-tight text-foreground">
            Fin<span className="text-[#1877f2] dark:text-[#45b8ff]">Sync</span>
          </span>
        </div>
        {subtitle && <p className="mt-0.5 text-[11px] font-medium text-muted">{subtitle}</p>}
      </div>
    </button>
  )
}
