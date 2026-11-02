import { ReactNode, useCallback, useMemo, useRef, useState } from 'react'
import { CircleAlert, CircleCheck, Info, X } from 'lucide-react'
import { useLanguage } from '@/i18n'
import { cn } from '@/lib/utils'
import { ToastContext, type ToastOptions } from './context'

interface ToastItem extends ToastOptions {
  id: number
}

const variantConfig = {
  success: { Icon: CircleCheck, className: 'text-success' },
  error: { Icon: CircleAlert, className: 'text-danger' },
  info: { Icon: Info, className: 'text-primary' },
} as const

const TOAST_DURATION = 4000

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const nextId = useRef(0)
  const { t } = useLanguage()

  const dismiss = useCallback((id: number) => {
    setToasts((current) => current.filter((item) => item.id !== id))
  }, [])

  const toast = useCallback(
    (options: ToastOptions) => {
      const id = nextId.current++
      setToasts((current) => [...current.slice(-2), { id, variant: 'success', ...options }])
      window.setTimeout(() => dismiss(id), TOAST_DURATION)
    },
    [dismiss]
  )

  const value = useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        role="region"
        aria-label={t.common.notificationsRegion}
        aria-live="polite"
        className="pointer-events-none fixed bottom-4 left-1/2 z-[60] flex w-[calc(100%-2rem)] max-w-(--container-sm) -translate-x-1/2 flex-col gap-sm sm:left-auto sm:right-4 sm:translate-x-0"
      >
        {toasts.map((item) => {
          const { Icon, className } = variantConfig[item.variant ?? 'success']
          return (
            <div
              key={item.id}
              role="status"
              className="pointer-events-auto flex items-start gap-sm rounded-md border border-border bg-surface p-md shadow-lg animate-[toast-in_180ms_ease-out]"
            >
              <Icon className={cn('mt-0.5 size-4 shrink-0', className)} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{item.title}</p>
                {item.description && <p className="mt-0.5 text-xs text-muted">{item.description}</p>}
              </div>
              <button
                onClick={() => dismiss(item.id)}
                className="rounded-sm p-0.5 text-subtle transition-colors hover:text-foreground"
                aria-label={t.common.close}
              >
                <X className="size-3.5" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}
