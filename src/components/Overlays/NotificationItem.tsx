import { ReactNode } from 'react'
import { CalendarClock, ArrowLeftRight, PiggyBank, ShieldAlert, Sparkles, TrendingUp, X } from 'lucide-react'
import type { AppNotification, NotificationKind } from '@/data/mock'
import { useLanguage } from '@/i18n'
import { cn } from '@/lib/utils'

const kindConfig: Record<NotificationKind, { icon: ReactNode; className: string }> = {
  bill: { icon: <CalendarClock />, className: 'bg-warning/10 text-warning' },
  budget: { icon: <PiggyBank />, className: 'bg-danger/10 text-danger' },
  transaction: { icon: <ArrowLeftRight />, className: 'bg-success/10 text-success' },
  investment: { icon: <TrendingUp />, className: 'bg-primary-soft text-primary-soft-foreground' },
  security: { icon: <ShieldAlert />, className: 'bg-surface-muted text-muted' },
  ai: { icon: <Sparkles />, className: 'bg-[#15b2f7]/10 text-[#1877f2] dark:text-[#5cc4ff]' },
}

interface NotificationItemProps {
  notification: AppNotification
  onOpen: (notification: AppNotification) => void
  onRemove?: (id: string) => void
  compact?: boolean
}

export function NotificationItem({ notification, onOpen, onRemove, compact }: NotificationItemProps) {
  const { t } = useLanguage()
  const copy = t.notifications.items[notification.id]
  const kind = kindConfig[notification.kind]
  const time = notification.day === 'earlier' ? t.formatShortDate(notification.time) : notification.time

  return (
    <div className={cn('group relative flex gap-sm transition-colors hover:bg-surface-muted/60', compact ? 'px-md py-sm' : 'px-lg py-md')}>
      <div className={cn('flex size-9 shrink-0 items-center justify-center rounded-full [&_svg]:size-4', kind.className)}>
        {kind.icon}
      </div>
      <button
        onClick={() => onOpen(notification)}
        className="min-w-0 flex-1 text-left after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-ring"
      >
        <span className="flex items-start gap-sm">
          <span className={cn('flex-1 text-sm', notification.read ? 'font-medium text-muted' : 'font-semibold text-foreground')}>
            {copy?.title}
          </span>
          <span className="shrink-0 text-xs text-subtle">{time}</span>
        </span>
        <span className={cn('mt-0.5 block text-xs text-muted', compact && 'line-clamp-2')}>{copy?.body}</span>
        <span className="sr-only">
          {notification.read ? '' : t.notifications.unreadSr} · {t.notifications.kinds[notification.kind]}
        </span>
      </button>
      {!notification.read && (
        <span className="absolute left-1.5 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-primary" aria-hidden="true" />
      )}
      {onRemove && (
        <button
          onClick={() => onRemove(notification.id)}
          className="relative z-10 self-start rounded-sm p-1 text-subtle opacity-0 transition-opacity hover:bg-surface-muted hover:text-foreground focus-visible:opacity-100 group-hover:opacity-100"
          aria-label={t.notifications.remove}
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  )
}
