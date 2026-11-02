import { ReactNode, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useLanguage, type Language } from '@/i18n'
import { cn } from '@/lib/utils'

export type MascotPose = 'wave' | 'smart'

export interface SyncMascotProps {
  pose?: MascotPose
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  floating?: boolean
  sparkles?: boolean
  interactive?: boolean
  speech?: ReactNode
  className?: string
  onClick?: () => void
}

const sizeMap: Record<NonNullable<SyncMascotProps['size']>, string> = {
  xs: 'size-16',
  sm: 'size-24',
  md: 'size-32',
  lg: 'size-44',
  xl: 'size-56',
}

const playfulReactions: Record<Language, string[]> = {
  pt: [
    '3 contas sincronizadas e seguras!',
    '58% da renda poupada no mês!',
    'Carteira rendendo +R$ 145,15 (+0,54%)!',
    'De olho no orçamento de Refeições!',
    'Pronto para te ajudar a economizar!',
  ],
  en: [
    '3 accounts synced and secure!',
    '58% savings rate this month!',
    'Portfolio up +R$ 145.15 (+0.54%)!',
    'Keeping an eye on Dining budget!',
    'Ready to help you grow your wealth!',
  ],
  es: [
    '¡3 cuentas sincronizadas y seguras!',
    '¡58% de ahorro este mes!',
    '¡Cartera ganando +R$ 145,15 (+0,54%)!',
    '¡Vigilando el presupuesto de Comidas!',
    '¡Listo para ayudarte a hacer crecer tus finanzas!',
  ],
}

const mascotAlt: Record<Language, string> = {
  pt: 'Sync, a lontra mascote do FinSync',
  en: 'Sync, the FinSync otter mascot',
  es: 'Sync, la nutria mascota de FinSync',
}

const poseSrc: Record<MascotPose, string> = {
  wave: '/brand/mascot-wave.png',
  smart: '/brand/mascot-smart.png',
}

const burstColors = ['#15b2f7', '#ffd166', '#06d6a0', '#8efcf6', '#2055f5', '#ff70a6']

export function SyncMascot({
  pose = 'wave',
  size = 'lg',
  floating = true,
  sparkles = true,
  interactive = true,
  speech,
  className,
  onClick,
}: SyncMascotProps) {
  const { language } = useLanguage()
  const [reactionIdx, setReactionIdx] = useState<number | null>(null)
  const [bounceKey, setBounceKey] = useState(0)

  const reactions = playfulReactions[language] ?? playfulReactions.pt

  const handleInteract = () => {
    if (!interactive) return
    setBounceKey((k) => k + 1)
    setReactionIdx((prev) => (prev === null ? 0 : (prev + 1) % reactions.length))
    onClick?.()
  }

  const activeBubble = speech ?? (reactionIdx !== null ? reactions[reactionIdx] : null)

  return (
    <div className={cn('relative inline-flex select-none flex-col items-center justify-center', className)}>
      {/* Floating speech pill with comic tail */}
      <AnimatePresence mode="wait">
        {activeBubble && (
          <motion.div
            key={typeof activeBubble === 'string' ? activeBubble : `speech-${bounceKey}`}
            initial={{ opacity: 0, y: 6, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative mb-2.5 inline-flex max-w-72 items-center gap-1.5 rounded-full border border-[#15b2f7]/35 bg-surface/95 px-3.5 py-1.5 text-xs font-medium text-foreground shadow-lg backdrop-blur-xs"
          >
            <Sparkles className="size-3.5 shrink-0 text-[#15b2f7]" />
            <span className="truncate">{activeBubble}</span>
            <div
              aria-hidden="true"
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 size-2 rotate-45 border-b border-r border-[#15b2f7]/35 bg-surface"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className={cn('relative flex items-center justify-center', sizeMap[size])}>
        {/* Soft bioluminescent aura behind Sync */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[8%] rounded-full bg-radial from-[#15b2f7]/30 via-[#2055f5]/14 to-transparent blur-xl"
          animate={{
            scale: [0.92, 1.1, 0.92],
            opacity: [0.55, 0.9, 0.55],
          }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Twinkling ambient particles */}
        {sparkles && (
          <>
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute right-[8%] top-[10%] size-2 rounded-full bg-[#8efcf6] shadow-[0_0_10px_#15b2f7]"
              animate={{ y: [0, -8, 0], opacity: [0.3, 1, 0.3], scale: [0.8, 1.25, 0.8] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute left-[10%] top-[22%] size-1.5 rounded-full bg-[#15b2f7] shadow-[0_0_8px_#15b2f7]"
              animate={{ y: [0, -6, 0], opacity: [0.2, 0.9, 0.2], scale: [0.7, 1.2, 0.7] }}
              transition={{ duration: 3.1, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[20%] right-[6%] size-1.5 rounded-full bg-[#2055f5]"
              animate={{ y: [0, -7, 0], opacity: [0.25, 0.85, 0.25] }}
              transition={{ duration: 2.8, delay: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}

        {/* Celebratory Starburst Particles on Tap/Click */}
        {bounceKey > 0 && (
          <div key={`burst-${bounceKey}`} className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
            {[0, 60, 120, 180, 240, 300].map((deg, i) => {
              const rad = (deg * Math.PI) / 180
              const dist = size === 'xs' ? 36 : size === 'sm' ? 52 : size === 'md' ? 68 : 84
              const tx = Math.cos(rad) * dist
              const ty = Math.sin(rad) * dist
              return (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, scale: 0.5, opacity: 1 }}
                  animate={{
                    x: tx,
                    y: ty,
                    scale: [0.5, 1.3, 0],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                  className="absolute size-2 rounded-full shadow-xs"
                  style={{ backgroundColor: burstColors[i % burstColors.length] }}
                />
              )
            })}
          </div>
        )}

        {/* Character body with hover, tap & levitation physics */}
        <motion.button
          key={bounceKey}
          type="button"
          onClick={handleInteract}
          aria-label={mascotAlt[language]}
          whileHover={interactive ? { scale: 1.08, rotate: pose === 'wave' ? -3 : 3 } : undefined}
          whileTap={interactive ? { scale: 0.93 } : undefined}
          animate={
            bounceKey > 0
              ? { scale: [1, 1.16, 0.94, 1.05, 1], y: [0, -16, 2, -3, 0] }
              : floating
                ? { y: [0, -7, 0] }
                : undefined
          }
          transition={
            bounceKey > 0
              ? { duration: 0.55, ease: 'easeOut' }
              : floating
                ? { y: { duration: 3.4, repeat: Infinity, ease: 'easeInOut' } }
                : undefined
          }
          className={cn(
            'group relative z-10 flex size-full items-center justify-center rounded-2xl outline-none transition-transform focus-visible:ring-2 focus-visible:ring-ring',
            !interactive && 'pointer-events-none cursor-default'
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={pose}
              src={poseSrc[pose]}
              alt={mascotAlt[language]}
              draggable={false}
              initial={{ opacity: 0, scale: 0.92, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -4 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="size-full object-contain drop-shadow-[0_12px_24px_rgba(16,28,66,0.22)] transition-transform duration-300 group-hover:drop-shadow-[0_16px_28px_rgba(21,178,247,0.3)] dark:drop-shadow-[0_12px_26px_rgba(21,178,247,0.24)]"
            />
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Synchronized ground shadow */}
      {floating && (
        <motion.div
          aria-hidden="true"
          className="mt-0.5 h-2 w-1/2 rounded-full bg-[#101c42]/15 blur-[3px] dark:bg-[#15b2f7]/20"
          animate={{
            scaleX: [1, 0.8, 1],
            opacity: [0.45, 0.2, 0.45],
          }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
    </div>
  )
}
