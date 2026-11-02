import { useState } from 'react'
import { Bell, CheckCheck } from 'lucide-react'
import { Button } from '../Button/Button'
import { Popover, PopoverContent, PopoverTrigger } from '../Popover/Popover'
import { NotificationItem } from './NotificationItem'
import type { AppNotification } from '@/data/mock'
import { useFinance } from '@/hooks/useFinance'
import { useLanguage } from '@/i18n'
import type { NavigateFn } from '@/lib/navigation'

interface NotificationsPopoverProps {
  onNavigate: NavigateFn
}

export function NotificationsPopover({ onNavigate }: NotificationsPopoverProps) {
  const { t } = useLanguage()
  const { notifications, unreadCount, markNotificationRead, markAllNotificationsRead } = useFinance()
  const [open, setOpen] = useState(false)
  const copy = t.notifications

  const openNotification = (n: AppNotification) => {
    markNotificationRead(n.id)
    setOpen(false)
    if (n.target) onNavigate(n.target.screen, n.target.id)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={unreadCount ? `${t.header.notifications} (${copy.unreadCount(unreadCount)})` : t.header.notifications}
          className="relative"
        >
          <Bell />
          {unreadCount > 0 && (
            <span className="absolute right-1.5 top-1.5 flex min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold leading-4 text-white ring-2 ring-surface">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[min(24rem,calc(100vw-1.5rem))] p-0">
        <div className="flex items-center justify-between gap-sm border-b border-border px-md py-sm">
          <div>
            <p className="text-sm font-semibold">{copy.title}</p>
            <p className="text-xs text-muted">
              {unreadCount ? copy.unreadCount(unreadCount) : copy.allCaughtUp}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllNotificationsRead}>
              <CheckCheck />
              {copy.markAllRead}
            </Button>
          )}
        </div>
        <div className="max-h-96 divide-y divide-border overflow-y-auto">
          {notifications.length > 0 ? (
            notifications
              .slice(0, 5)
              .map((n) => <NotificationItem key={n.id} notification={n} onOpen={openNotification} compact />)
          ) : (
            <p className="px-md py-xl text-center text-sm text-muted">{copy.empty}</p>
          )}
        </div>
        <div className="border-t border-border p-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => {
              setOpen(false)
              onNavigate('notifications')
            }}
          >
            {copy.viewAll}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
