import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles, X } from 'lucide-react'
import { useLanguage } from '@/i18n'
import { SyncAvatar } from './SyncLogo'
import { cn } from '@/lib/utils'

export interface SyncHeaderTriggerProps {
  active?: boolean
  onClick: () => void
  className?: string
}

export function SyncHeaderTrigger({ active = false, onClick, className }: SyncHeaderTriggerProps) {
  const { t } = useLanguage()

  return (
    <div className="group relative">
      <motion.button
        type="button"
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        aria-label={t.nav.aiAssistant}
        aria-describedby="ai-tooltip"
        aria-current={active ? 'page' : undefined}
        className={cn(
          'relative inline-flex h-9 items-center gap-2 rounded-full border px-2 sm:px-3 text-xs font-semibold transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring',
          active
            ? 'border-[#15b2f7]/60 bg-[#101c42] text-white shadow-sm'
            : 'border-[#15b2f7]/30 bg-linear-to-r from-[#2055f5]/8 via-[#15b2f7]/12 to-[#2055f5]/8 text-foreground hover:border-[#15b2f7]/60 hover:from-[#2055f5]/16 hover:to-[#15b2f7]/20',
          className
        )}
      >
        <SyncAvatar size="xs" glow={active} className="size-6" />
        <span className="hidden sm:inline">{t.nav.aiAssistant}</span>
        <kbd
          className={cn(
            'hidden lg:inline-flex items-center rounded-[5px] px-1.5 py-0.5 font-mono text-[10px] font-medium',
            active ? 'bg-white/15 text-white/85' : 'border border-border bg-surface/80 text-muted'
          )}
        >
          ⌘K
        </kbd>
        {!active && (
          <span
            aria-hidden="true"
            className="size-1.5 rounded-full bg-[#15b2f7] shadow-[0_0_6px_#15b2f7]"
          />
        )}
      </motion.button>
      <span
        id="ai-tooltip"
        role="tooltip"
        className="pointer-events-none absolute right-0 top-full z-30 mt-xs whitespace-nowrap rounded-sm bg-foreground px-sm py-1 text-xs font-medium text-background opacity-0 shadow-md transition-opacity group-focus-within:opacity-100 group-hover:opacity-100"
      >
        {t.nav.aiAssistant}
      </span>
    </div>
  )
}

export interface SyncFloatingCompanionProps {
  tip: string
  promptOnOpen?: string
  onOpenAI: (initialPrompt?: string) => void
}

export function SyncFloatingCompanion({
  tip,
  promptOnOpen,
  onOpenAI,
}: SyncFloatingCompanionProps) {
  const { t } = useLanguage()
  const [hovered, setHovered] = useState(false)
  const [dismissedTip, setDismissedTip] = useState(false)

  return (
    <div
      className="fixed bottom-5 right-5 z-30 flex items-center gap-2.5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence>
        {hovered && !dismissedTip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="hidden sm:flex items-center gap-2 rounded-lg border border-[#15b2f7]/35 bg-surface/95 px-3.5 py-2.5 text-xs shadow-lg backdrop-blur-md"
          >
            <Sparkles className="size-3.5 shrink-0 text-[#15b2f7]" />
            <button
              type="button"
              onClick={() => onOpenAI(promptOnOpen)}
              className="max-w-64 text-left font-medium text-foreground hover:text-primary"
            >
              {tip}
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setDismissedTip(true)
              }}
              aria-label="Close"
              className="ml-1 rounded-xs p-0.5 text-subtle hover:bg-surface-muted hover:text-foreground"
            >
              <X className="size-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => onOpenAI(promptOnOpen)}
        whileHover={{ scale: 1.07, y: -2 }}
        whileTap={{ scale: 0.94 }}
        aria-label={t.nav.aiAssistant}
        className="group relative flex size-13 items-center justify-center rounded-2xl bg-[#101c42] p-1.5 shadow-[0_10px_28px_rgba(16,28,66,0.35)] ring-1 ring-[#15b2f7]/45 transition-shadow hover:shadow-[0_12px_32px_rgba(21,178,247,0.38)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <SyncAvatar size="md" badged={false} glow className="size-full" />
        <span
          aria-hidden="true"
          className="absolute -right-0.5 -top-0.5 flex size-3.5 items-center justify-center rounded-full bg-surface"
        >
          <span className="size-2 rounded-full bg-success" />
        </span>
      </motion.button>
    </div>
  )
}
