import { useState } from 'react'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  ConfirmDialog,
  ConnectAccountDialog,
  Container,
  CreditCard,
  Grid,
  MenuItem,
  MonetaryValue,
  PageHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Section,
  SectionHeader,
  SyncAvatar,
} from '@/components'
import { creditCards, investedByAccount, type Account } from '@/data/mock'
import { useCardSettings, useFinance } from '@/hooks/useFinance'
import { useToast } from '@/hooks/useToast'
import { useLanguage } from '@/i18n'
import type { NavigateFn } from '@/lib/navigation'
import { cn, formatCurrency } from '@/lib/utils'
import { CheckCircle2, Eye, Landmark, Lock, MoreHorizontal, Plus, RefreshCw, Sparkles, Unlink } from 'lucide-react'

const accountColors = ['bg-chart-1', 'bg-chart-2', 'bg-chart-3', 'bg-primary', 'bg-warning', 'bg-success']

interface AccountsScreenProps {
  onNavigate?: NavigateFn
  onAskAI?: (prompt?: string) => void
}

function CardRow({ cardId, onNavigate }: { cardId: string; onNavigate?: NavigateFn }) {
  const { t } = useLanguage()
  const { settings } = useCardSettings(cardId)
  const card = creditCards.find((c) => c.id === cardId)!
  const usedPct = (card.currentInvoice / card.limit) * 100

  return (
    <Card>
      <div className="grid gap-lg p-lg md:grid-cols-[minmax(0,22rem)_1fr] md:items-center">
        <button
          onClick={() => onNavigate?.('card-detail', card.id)}
          className="block w-full rounded-lg text-left transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={t.dashboardExtra.openCardAria(card.name)}
        >
          <CreditCard
            cardholderName={card.cardholderName}
            cardNumber={card.last4}
            expiryMonth={card.expiryMonth}
            expiryYear={card.expiryYear}
            cardIssuer={card.brand}
            balance={card.currentInvoice}
            className={cn(settings.blocked && 'grayscale')}
          />
        </button>
        <div className="space-y-lg">
          <CardHeader className="flex-row items-start justify-between gap-sm border-b-0 p-0">
            <div className="space-y-1">
              <CardTitle>{card.name}</CardTitle>
              <CardDescription>
                {t.dashboard.cardsSection.closesOn(card.closingDate)} · {t.dashboard.cardsSection.dueOn(card.dueDate)}
              </CardDescription>
            </div>
            {settings.blocked && (
              <Badge variant="error">
                <Lock />
                {t.cardDetail.blockedBadge}
              </Badge>
            )}
          </CardHeader>
          <div className="space-y-sm">
            <div className="flex justify-between text-sm">
              <span className="text-muted">{t.accounts.used}</span>
              <span className="font-medium tabular-nums">
                {formatCurrency(card.currentInvoice)} <span className="text-muted">/ {formatCurrency(card.limit)}</span>
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-muted">
              <div className="h-full rounded-full bg-primary" style={{ width: `${usedPct}%` }} />
            </div>
            <p className="text-xs text-muted">{t.accounts.availableCredit(formatCurrency(card.limit - card.currentInvoice))}</p>
          </div>
          <div className="flex gap-sm">
            <Button variant="secondary" size="sm" onClick={() => onNavigate?.('card-detail', card.id)}>
              {t.accounts.viewStatement}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onNavigate?.('card-detail', `${card.id}/settings`)}>
              {t.accounts.manageCard}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

export function AccountsScreen({ onNavigate, onAskAI }: AccountsScreenProps = {}) {
  const { t } = useLanguage()
  const { accounts, investments, refreshAccount, removeAccount } = useFinance()
  const { toast } = useToast()
  const [connecting, setConnecting] = useState(false)
  const [disconnecting, setDisconnecting] = useState<Account | null>(null)

  const balanceTotal = accounts.reduce((sum, a) => sum + a.balance, 0)
  const investedTotal = investments.reduce((sum, i) => sum + i.current, 0)
  const total = balanceTotal + investedTotal
  const shareOf = (a: Account) => (total ? ((a.balance + investedByAccount(a.id, investments)) / total) * 100 : 0)

  return (
    <Container className="space-y-xl">
      <PageHeader
        title={t.accounts.title}
        description={t.accounts.description}
        actions={
          <Button onClick={() => setConnecting(true)}>
            <Plus />
            {t.accounts.addAccount}
          </Button>
        }
      />

      {/* Summary */}
      <Card>
        <CardContent className="space-y-lg">
          <div className="flex flex-col gap-sm sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted">{t.accounts.totalNetWorth}</p>
              <MonetaryValue value={total} hideable className="text-3xl" />
            </div>
            <p className="text-xs text-muted">{t.accounts.accountsSummary(accounts.length)}</p>
          </div>

          <dl className="grid gap-md sm:grid-cols-2">
            <div className="space-y-1 rounded-sm bg-surface-muted p-md">
              <dt className="text-xs font-medium text-muted">{t.accounts.availableAccountBalance}</dt>
              <dd>
                <MonetaryValue value={balanceTotal} hideable className="text-xl" />
              </dd>
            </div>
            <div className="space-y-1 rounded-sm bg-surface-muted p-md">
              <dt className="text-xs font-medium text-muted">{t.accounts.totalInvested}</dt>
              <dd>
                <MonetaryValue value={investedTotal} hideable className="text-xl" />
              </dd>
            </div>
          </dl>

          {/* Distribution (part-to-whole) */}
          <div className="space-y-sm">
            <div className="flex h-2.5 w-full gap-[2px] overflow-hidden rounded-full" aria-hidden="true">
              {accounts.map((a, i) => (
                <div
                  key={a.id}
                  className={cn('h-full first:rounded-l-full last:rounded-r-full', accountColors[i % accountColors.length])}
                  style={{ width: `${shareOf(a)}%` }}
                />
              ))}
            </div>
            <ul className="flex flex-wrap gap-x-lg gap-y-xs text-sm">
              {accounts.map((a, i) => (
                <li key={a.id} className="flex items-center gap-1.5">
                  <span className={cn('size-2.5 rounded-[3px]', accountColors[i % accountColors.length])} />
                  <span className="text-muted">{a.bank}</span>
                  <span className="font-medium tabular-nums">{shareOf(a).toFixed(0)}%</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Sync Net Worth Live Audit Banner */}
      <Card className="relative overflow-hidden border-[#15b2f7]/20 bg-linear-to-r from-surface via-surface to-[#15b2f7]/[0.05]">
        <CardContent className="flex flex-col gap-md p-md sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-md">
            <SyncAvatar size="md" mood="happy" glow className="shrink-0" />
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <Badge variant="success" className="px-1.5 py-0 text-[10px]">
                  <CheckCircle2 className="mr-1 size-3" />
                  {t.accountsSync.statusBadge}
                </Badge>
                <span className="text-xs text-muted">Open Finance v3.2</span>
              </div>
              <p className="text-sm font-medium text-foreground">{t.accountsSync.title}</p>
              <p className="text-xs text-muted">{t.accountsSync.subtitle(accounts.length, creditCards.length)}</p>
            </div>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="gap-1.5 self-start sm:self-auto"
            onClick={() => (onAskAI ? onAskAI(t.accountsSync.prompt) : onNavigate?.('ai-assistant'))}
          >
            <Sparkles className="size-3.5 text-primary" />
            {t.accountsSync.askSync}
          </Button>
        </CardContent>
      </Card>

      {/* Accounts grid */}
      <Section>
        <SectionHeader title={t.accounts.bankAccounts} />
        <Grid cols={3}>
          {accounts.map((a) => {
            const displayName = t.accountNames[a.name] ?? a.name
            const displayKind = t.accountKinds[a.kind] ?? a.kind
            const displayUpdated = t.relativeTimes[a.updated] ?? a.updated
            return (
              <Card key={a.id} className="relative transition-shadow hover:shadow-md">
                <CardContent className="space-y-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-sm">
                      <div className="flex size-10 items-center justify-center rounded-sm bg-primary-soft text-primary-soft-foreground">
                        <Landmark className="size-5" />
                      </div>
                      <div>
                        {/* Stretched link: the whole card opens the account */}
                        <button
                          onClick={() => onNavigate?.('account-detail', a.id)}
                          className="text-left text-sm font-semibold after:absolute after:inset-0 after:rounded-lg focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-ring"
                        >
                          {displayName}
                        </button>
                        <p className="text-xs text-muted">
                          {a.bank} ·· {a.last4}
                        </p>
                      </div>
                    </div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="relative z-10 -mr-2 -mt-1 size-8"
                          aria-label={t.accounts.accountOptionsAria(displayName)}
                        >
                          <MoreHorizontal />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-52 p-1">
                        <MenuItem onClick={() => onNavigate?.('account-detail', a.id)}>
                          <Eye />
                          {t.common.viewDetails}
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            refreshAccount(a.id)
                            toast({ title: t.accountDetail.refreshed, description: a.bank })
                          }}
                        >
                          <RefreshCw />
                          {t.accountDetail.refresh}
                        </MenuItem>
                        <MenuItem destructive onClick={() => setDisconnecting(a)}>
                          <Unlink />
                          {t.accountDetail.disconnect}
                        </MenuItem>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted">{t.accounts.availableBalance}</p>
                    <MonetaryValue value={a.balance} className="text-2xl" />
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-md text-sm">
                    <span className="text-muted">{t.accounts.invested}</span>
                    <span className="font-semibold tabular-nums">{formatCurrency(investedByAccount(a.id, investments))}</span>
                  </div>
                </CardContent>
                <CardFooter className="justify-between text-xs text-muted">
                  <span className="inline-flex items-center gap-1">
                    <RefreshCw className="size-3" />
                    {t.accounts.updated(displayUpdated)}
                  </span>
                  <Badge>{displayKind}</Badge>
                </CardFooter>
              </Card>
            )
          })}

          <button
            onClick={() => setConnecting(true)}
            className="flex min-h-48 flex-col items-center justify-center gap-sm rounded-lg border-2 border-dashed border-border text-muted transition-colors hover:border-primary/40 hover:bg-primary-soft/40 hover:text-primary-soft-foreground"
          >
            <div className="flex size-10 items-center justify-center rounded-full bg-surface-muted">
              <Plus className="size-5" />
            </div>
            <span className="text-sm font-medium">{t.accounts.connectNewAccount}</span>
          </button>
        </Grid>
      </Section>

      {/* Credit cards */}
      <Section>
        <SectionHeader title={t.accounts.creditCards} />
        <div className="space-y-lg">
          {creditCards.map((card) => (
            <CardRow key={card.id} cardId={card.id} onNavigate={onNavigate} />
          ))}
        </div>
      </Section>

      <ConnectAccountDialog open={connecting} onOpenChange={setConnecting} />
      <ConfirmDialog
        open={!!disconnecting}
        onOpenChange={(open) => !open && setDisconnecting(null)}
        title={t.accountDetail.disconnectTitle(disconnecting?.bank ?? '')}
        description={t.accountDetail.disconnectDescription}
        confirmLabel={t.accountDetail.disconnect}
        destructive
        onConfirm={() => {
          if (!disconnecting) return
          removeAccount(disconnecting.id)
          toast({ title: t.accountDetail.disconnected(disconnecting.bank) })
        }}
      />
    </Container>
  )
}
