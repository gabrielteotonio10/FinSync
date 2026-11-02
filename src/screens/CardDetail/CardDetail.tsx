import { useState } from 'react'
import { CalendarClock, CalendarDays, Lock, ShoppingBag, Sparkles, Unlock } from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
  CreditCard,
  EmptyState,
  PageHeader,
  PayBillDialog,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  type PayableBill,
} from '@/components'
import { categoryIcons, creditCards, statementFor, upcomingBills } from '@/data/mock'
import type { CardSettings } from '@/data/context'
import { useCardSettings, useFinance } from '@/hooks/useFinance'
import { useToast } from '@/hooks/useToast'
import { useLanguage } from '@/i18n'
import type { NavigateFn } from '@/lib/navigation'
import { cn, formatCurrency } from '@/lib/utils'

interface CardDetailScreenProps {
  /** "<cardId>" or "<cardId>/settings" */
  routeId?: string
  onNavigate: NavigateFn
  onAskAI?: (prompt?: string) => void
}

export function CardDetailScreen({ routeId, onNavigate, onAskAI }: CardDetailScreenProps) {
  const [cardId, initialTab] = (routeId ?? '').split('/')
  const { t } = useLanguage()
  const { transactions, accounts, paidBills } = useFinance()
  const { settings, update } = useCardSettings(cardId)
  const { toast } = useToast()
  const [tab, setTab] = useState(initialTab === 'settings' ? 'settings' : 'invoice')
  const [paying, setPaying] = useState<PayableBill | null>(null)
  const copy = t.cardDetail

  const card = creditCards.find((c) => c.id === cardId)

  if (!card) {
    return (
      <Container className="space-y-xl">
        <PageHeader title={copy.notFound} onBack={() => onNavigate('accounts')} backLabel={t.nav.accounts} />
        <Card>
          <EmptyState
            title={copy.notFound}
            description={copy.notFoundDescription}
            action={<Button onClick={() => onNavigate('accounts')}>{t.nav.accounts}</Button>}
          />
        </Card>
      </Container>
    )
  }

  const statement = statementFor(card.id, transactions)
  const invoiceTotal = statement.reduce((s, i) => s + i.amount, 0)
  const bill = upcomingBills.find((b) => b.cardId === card.id)
  const invoicePaid = !!bill && paidBills.includes(bill.id)
  const usedPct = (invoiceTotal / card.limit) * 100
  const payAccount = accounts.find((a) => a.id === card.accountId)

  // Spending by category for the current invoice
  const byCategory = Object.entries(
    statement.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + item.amount
      return acc
    }, {})
  ).sort((a, b) => b[1] - a[1])

  const toggle = (key: keyof CardSettings, value: boolean) => {
    update({ [key]: value })
    if (key === 'blocked') {
      toast({ title: value ? copy.blockedToast : copy.unblockedToast, variant: value ? 'info' : 'success' })
    } else {
      toast({ title: copy.settingsSaved, variant: 'info' })
    }
  }

  const settingRows: { key: keyof CardSettings; title: string; description: string }[] = [
    { key: 'online', title: copy.onlineTitle, description: copy.onlineDescription },
    { key: 'international', title: copy.internationalTitle, description: copy.internationalDescription },
    { key: 'contactless', title: copy.contactlessTitle, description: copy.contactlessDescription },
  ]

  return (
    <Container className="space-y-xl">
      <PageHeader
        title={card.name}
        description={`${card.brand} ·· ${card.last4}`}
        onBack={() => onNavigate('accounts')}
        backLabel={t.nav.accounts}
        actions={
          <>
            {onAskAI && (
              <Button variant="secondary" onClick={() => onAskAI(copy.askPrompt(card.name))}>
                <Sparkles />
                {copy.askSync}
              </Button>
            )}
            {bill && !invoicePaid && (
              <Button onClick={() => setPaying({ id: bill.id, title: t.bills.titles[bill.id] ?? bill.title, amount: bill.amount, dueDate: bill.dueDate })}>
                {t.dashboard.cardsSection.payInvoice}
              </Button>
            )}
          </>
        }
      />

      <Card>
        <div className="grid gap-lg p-lg md:grid-cols-[minmax(0,22rem)_1fr] md:items-center">
          <div className="relative">
            <CreditCard
              cardholderName={card.cardholderName}
              cardNumber={card.last4}
              expiryMonth={card.expiryMonth}
              expiryYear={card.expiryYear}
              cardIssuer={card.brand}
              balance={invoiceTotal}
              className={cn('transition-[filter]', settings.blocked && 'grayscale')}
            />
            {settings.blocked && (
              <span className="absolute inset-0 flex items-center justify-center">
                <Badge variant="error" className="bg-surface px-3 py-1 text-sm">
                  <Lock />
                  {copy.blockedBadge}
                </Badge>
              </span>
            )}
          </div>
          <div className="space-y-lg">
            <div className="flex flex-wrap items-center gap-sm">
              {invoicePaid ? (
                <Badge variant="success">{copy.invoicePaid}</Badge>
              ) : (
                <Badge variant="info">{t.dashboard.cardsSection.invoiceStatusOpen}</Badge>
              )}
              {settings.blocked && <Badge variant="error">{copy.blockedBadge}</Badge>}
            </div>
            <div className="space-y-sm">
              <div className="flex justify-between text-sm">
                <span className="text-muted">{t.dashboard.cardsSection.limitUsed}</span>
                <span className="font-medium tabular-nums">
                  {formatCurrency(invoiceTotal)} <span className="text-muted">/ {formatCurrency(card.limit)}</span>
                </span>
              </div>
              <div
                className="h-2 overflow-hidden rounded-full bg-surface-muted"
                role="progressbar"
                aria-valuenow={Math.round(usedPct)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={t.dashboard.cardsSection.limitUsed}
              >
                <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(usedPct, 100)}%` }} />
              </div>
              <p className="text-xs text-muted">{t.dashboard.cardsSection.limitAvailable(formatCurrency(card.limit - invoiceTotal))}</p>
            </div>
            <dl className="grid gap-sm sm:grid-cols-3">
              {[
                { icon: <CalendarDays />, label: copy.closing, value: card.closingDate },
                { icon: <CalendarClock />, label: copy.due, value: card.dueDate },
                { icon: <ShoppingBag />, label: copy.bestDay, value: card.bestPurchaseDay },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-sm rounded-sm bg-surface-muted p-sm [&_svg]:size-4 [&_svg]:text-subtle">
                  {item.icon}
                  <div>
                    <dt className="text-[11px] text-muted">{item.label}</dt>
                    <dd className="text-sm font-medium">{item.value}</dd>
                  </div>
                </div>
              ))}
            </dl>
            {payAccount && <p className="text-xs text-muted">{copy.autoDebit(`${payAccount.bank} ·· ${payAccount.last4}`)}</p>}
          </div>
        </div>
      </Card>

      <Tabs value={tab} onValueChange={setTab} className="space-y-lg">
        <TabsList aria-label={card.name}>
          <TabsTrigger value="invoice">{copy.invoiceTab}</TabsTrigger>
          <TabsTrigger value="settings">{copy.settingsTab}</TabsTrigger>
        </TabsList>

        <TabsContent value="invoice">
          <div className="grid gap-lg lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader className="flex-row items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>{copy.statementTitle}</CardTitle>
                  <CardDescription>{copy.statementDescription(statement.length)}</CardDescription>
                </div>
                <p className="text-lg font-semibold tabular-nums">{formatCurrency(invoiceTotal)}</p>
              </CardHeader>
              <ul className="divide-y divide-border">
                {statement.map((item) => (
                  <li key={item.id} className="flex items-center gap-md px-lg py-md">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-sm bg-surface-muted text-muted [&_svg]:size-5">
                      {categoryIcons[item.category] ?? categoryIcons.Other}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{t.transactionDescriptions[item.id] ?? item.description}</p>
                      <p className="truncate text-xs text-muted">
                        {t.categories[item.category] ?? item.category} · {t.formatShortDate(item.date)}
                      </p>
                    </div>
                    {item.installment && <Badge>{copy.installment(item.installment)}</Badge>}
                    <p className="w-28 text-right text-sm font-semibold tabular-nums">{formatCurrency(item.amount)}</p>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="h-fit">
              <CardHeader>
                <CardTitle>{copy.byCategory}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-md">
                {byCategory.map(([category, value]) => (
                  <div key={category} className="space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <span>{t.categories[category] ?? category}</span>
                      <span className="font-medium tabular-nums">{formatCurrency(value)}</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-surface-muted">
                      <div className="h-full rounded-full bg-chart-1" style={{ width: `${(value / invoiceTotal) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid gap-lg lg:grid-cols-2">
            <Card className={cn(settings.blocked && 'border-danger/30')}>
              <CardHeader>
                <CardTitle>{copy.securityTitle}</CardTitle>
                <CardDescription>{copy.securityDescription}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-md">
                <div className="flex items-start gap-md">
                  <div
                    className={cn(
                      'flex size-10 shrink-0 items-center justify-center rounded-full [&_svg]:size-5',
                      settings.blocked ? 'bg-danger/10 text-danger' : 'bg-success/10 text-success'
                    )}
                  >
                    {settings.blocked ? <Lock /> : <Unlock />}
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <p className="text-sm font-medium">{settings.blocked ? copy.blockedTitle : copy.activeTitle}</p>
                    <p className="text-sm text-muted">{copy.blockDescription}</p>
                  </div>
                </div>
                <Button
                  variant={settings.blocked ? 'primary' : 'destructive'}
                  className="w-full"
                  onClick={() => toggle('blocked', !settings.blocked)}
                >
                  {settings.blocked ? <Unlock /> : <Lock />}
                  {settings.blocked ? copy.unblock : copy.block}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{copy.purchasesTitle}</CardTitle>
                <CardDescription>{copy.purchasesDescription}</CardDescription>
              </CardHeader>
              <div className="divide-y divide-border">
                {settingRows.map((row) => (
                  <div key={row.key} className="flex items-center justify-between gap-lg px-lg py-md">
                    <div className="space-y-0.5">
                      <label htmlFor={`card-${row.key}`} className="text-sm font-medium">
                        {row.title}
                      </label>
                      <p className="text-sm text-muted">{row.description}</p>
                    </div>
                    <Switch
                      id={`card-${row.key}`}
                      checked={settings[row.key]}
                      disabled={settings.blocked}
                      onCheckedChange={(value) => toggle(row.key, value)}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <PayBillDialog bill={paying} onOpenChange={(open) => !open && setPaying(null)} />
    </Container>
  )
}
