import { useState } from 'react'
import { CalendarCheck, CalendarClock, Check, CircleAlert, Receipt } from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  Container,
  EmptyState,
  Grid,
  PageHeader,
  PayBillDialog,
  StatCard,
  Tabs,
  TabsList,
  TabsTrigger,
  type PayableBill,
} from '@/components'
import { categoryIcons, upcomingBills } from '@/data/mock'
import { useFinance } from '@/hooks/useFinance'
import { useLanguage } from '@/i18n'
import type { NavigateFn } from '@/lib/navigation'
import { cn, formatCurrency } from '@/lib/utils'

interface BillsScreenProps {
  onNavigate: NavigateFn
}

export function BillsScreen({ onNavigate }: BillsScreenProps) {
  const { t } = useLanguage()
  const { paidBills } = useFinance()
  const [tab, setTab] = useState<'pending' | 'paid'>('pending')
  const [paying, setPaying] = useState<PayableBill | null>(null)
  const copy = t.bills

  const pending = upcomingBills.filter((b) => !paidBills.includes(b.id))
  const paid = upcomingBills.filter((b) => paidBills.includes(b.id))
  const list = tab === 'pending' ? pending : paid
  const totalPending = pending.reduce((s, b) => s + b.amount, 0)
  const next = pending[0]

  return (
    <Container className="space-y-xl">
      <PageHeader
        title={copy.title}
        description={copy.description}
      />

      <Grid cols={3}>
        <StatCard label={copy.totalPending} value={totalPending} icon={<Receipt />} hint={copy.billsCount(pending.length)} />
        <StatCard
          label={copy.nextDue}
          value={next?.amount ?? 0}
          icon={<CalendarClock />}
          hint={next ? `${copy.titles[next.id] ?? next.title} · ${next.dueDate}` : copy.allPaid}
        />
        <StatCard
          label={copy.paidThisMonth}
          value={paid.reduce((s, b) => s + b.amount, 0)}
          icon={<CalendarCheck />}
          hint={copy.billsCount(paid.length)}
        />
      </Grid>

      <Card>
        <div className="border-b border-border px-lg py-sm">
          <Tabs value={tab} onValueChange={(v) => setTab(v as 'pending' | 'paid')}>
            <TabsList aria-label={copy.filterAria}>
              <TabsTrigger value="pending">
                {copy.pendingTab}
                <span className="text-xs text-subtle">{pending.length}</span>
              </TabsTrigger>
              <TabsTrigger value="paid">
                {copy.paidTab}
                <span className="text-xs text-subtle">{paid.length}</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {list.length === 0 ? (
          <EmptyState
            title={tab === 'pending' ? copy.allPaid : copy.nonePaid}
            description={tab === 'pending' ? copy.allPaidDescription : undefined}
          />
        ) : (
          <ul className="divide-y divide-border">
            {list.map((bill) => {
              const title = copy.titles[bill.id] ?? bill.title
              const isPaid = paidBills.includes(bill.id)
              const urgent = !isPaid && bill.status === 'urgent'
              return (
                <li key={bill.id} className="flex flex-wrap items-center gap-md px-lg py-md">
                  <div
                    className={cn(
                      'flex size-10 shrink-0 items-center justify-center rounded-sm [&_svg]:size-5',
                      urgent ? 'bg-danger/10 text-danger' : 'bg-surface-muted text-muted'
                    )}
                  >
                    {categoryIcons[bill.category]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{title}</p>
                    <p className="flex items-center gap-1 text-xs text-muted">
                      {t.categories[bill.category] ?? bill.category} · {t.dashboard.cardsSection.dueOn(bill.dueDate)}
                    </p>
                  </div>
                  {isPaid ? (
                    <Badge variant="success">
                      <Check />
                      {copy.paidBadge}
                    </Badge>
                  ) : (
                    <Badge variant={urgent ? 'error' : 'warning'}>
                      {urgent && <CircleAlert />}
                      {t.dashboard.upcomingBillsSection.dueInDays(bill.daysUntilDue)}
                    </Badge>
                  )}
                  <p className="w-28 text-right text-sm font-semibold tabular-nums">{formatCurrency(bill.amount)}</p>
                  <div className="flex gap-xs">
                    {bill.cardId && (
                      <Button variant="ghost" size="sm" onClick={() => onNavigate('card-detail', bill.cardId)}>
                        {copy.viewInvoice}
                      </Button>
                    )}
                    {!isPaid && (
                      <Button
                        size="sm"
                        variant={urgent ? 'primary' : 'secondary'}
                        onClick={() => setPaying({ id: bill.id, title, amount: bill.amount, dueDate: bill.dueDate })}
                      >
                        {t.dashboard.upcomingBillsSection.payNow}
                      </Button>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </Card>

      <PayBillDialog bill={paying} onOpenChange={(open) => !open && setPaying(null)} />
    </Container>
  )
}
