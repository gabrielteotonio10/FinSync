import { useState } from 'react'
import { CheckCheck, Settings } from 'lucide-react'
import {
  Button,
  Card,
  Container,
  EmptyState,
  NotificationItem,
  PageHeader,
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components'
import type { AppNotification } from '@/data/mock'
import { useFinance } from '@/hooks/useFinance'
import { useLanguage } from '@/i18n'
import type { NavigateFn } from '@/lib/navigation'

interface NotificationsScreenProps {
  onNavigate: NavigateFn
}

const dayOrder: AppNotification['day'][] = ['today', 'yesterday', 'earlier']

export function NotificationsScreen({ onNavigate }: NotificationsScreenProps) {
  const { t } = useLanguage()
  const { notifications, unreadCount, markNotificationRead, markAllNotificationsRead, removeNotification } =
    useFinance()
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const copy = t.notifications

  const visible = notifications.filter((n) => filter === 'all' || !n.read)

  const open = (n: AppNotification) => {
    markNotificationRead(n.id)
    if (n.target) onNavigate(n.target.screen, n.target.id)
  }

  return (
    <Container maxWidth="lg" className="space-y-xl">
      <PageHeader
        title={copy.title}
        description={copy.description}
        actions={
          <>
            <Button variant="secondary" onClick={() => onNavigate('settings')}>
              <Settings />
              {copy.preferences}
            </Button>
            <Button onClick={markAllNotificationsRead} disabled={unreadCount === 0}>
              <CheckCheck />
              {copy.markAllRead}
            </Button>
          </>
        }
      />

      <Card>
        <div className="flex items-center justify-between gap-sm border-b border-border px-lg py-sm">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as 'all' | 'unread')}>
            <TabsList aria-label={copy.filterAria}>
              <TabsTrigger value="all">
                {copy.allTab}
                <span className="text-xs text-subtle">{notifications.length}</span>
              </TabsTrigger>
              <TabsTrigger value="unread">
                {copy.unreadTab}
                {unreadCount > 0 && (
                  <span className="rounded-full bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground">
                    {unreadCount}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {visible.length === 0 ? (
          <EmptyState
            title={filter === 'unread' ? copy.emptyUnread : copy.empty}
            description={copy.emptyDescription}
          />
        ) : (
          dayOrder.map((day) => {
            const items = visible.filter((n) => n.day === day)
            if (items.length === 0) return null
            return (
              <section key={day} aria-labelledby={`notif-${day}`}>
                <h2
                  id={`notif-${day}`}
                  className="bg-surface-muted/50 px-lg py-1.5 text-xs font-semibold uppercase tracking-wide text-subtle"
                >
                  {copy.days[day]}
                </h2>
                <div className="divide-y divide-border">
                  {items.map((n) => (
                    <NotificationItem key={n.id} notification={n} onOpen={open} onRemove={removeNotification} />
                  ))}
                </div>
              </section>
            )
          })
        )}
      </Card>
    </Container>
  )
}
