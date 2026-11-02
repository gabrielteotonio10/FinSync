import { useState } from 'react'
import {
  ArrowDownLeft,
  ArrowUpRight,
  Copy,
  CreditCard as CreditCardIcon,
  Landmark,
  PiggyBank,
  RefreshCw,
  Unlink,
} from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ConfirmDialog,
  Container,
  EmptyState,
  Grid,
  MonetaryValue,
  PageHeader,
  StatCard,
  TransactionItem,
} from '@/components'
import { categoryIcons, creditCards, type Transaction } from '@/data/mock'
import { useFinance } from '@/hooks/useFinance'
import { useToast } from '@/hooks/useToast'
import { useLanguage } from '@/i18n'
import type { NavigateFn } from '@/lib/navigation'
import { formatCurrency } from '@/lib/utils'

interface AccountDetailScreenProps {
  accountId?: string
  onNavigate: NavigateFn
  onOpenTransaction: (tx: Transaction) => void
}

export function AccountDetailScreen({ accountId, onNavigate, onOpenTransaction }: AccountDetailScreenProps) {
  const { t } = useLanguage()
  const { accounts, transactions, investments, refreshAccount, removeAccount } = useFinance()
  const { toast } = useToast()
  const [refreshing, setRefreshing] = useState(false)
  const [confirmDisconnect, setConfirmDisconnect] = useState(false)
  const copy = t.accountDetail

  const account = accounts.find((a) => a.id === accountId)

  if (!account) {
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

  const name = t.accountNames[account.name] ?? account.name
  const kind = t.accountKinds[account.kind] ?? account.kind
  const updated = t.relativeTimes[account.updated] ?? account.updated
  const accountTx = transactions.filter((tx) => tx.accountId === account.id)
  const accountInvestments = investments.filter((i) => i.accountId === account.id)
  const invested = accountInvestments.reduce((s, i) => s + i.current, 0)
  const linkedCards = creditCards.filter((c) => c.accountId === account.id)
  // Failed transactions never moved money
  const settled = accountTx.filter((tx) => tx.status !== 'failed')
  const income = settled.filter((tx) => tx.type === 'income').reduce((s, tx) => s + tx.amount, 0)
  const expenses = settled.filter((tx) => tx.type === 'expense').reduce((s, tx) => s + tx.amount, 0)

  const refresh = () => {
    setRefreshing(true)
    window.setTimeout(() => {
      refreshAccount(account.id)
      setRefreshing(false)
      toast({ title: copy.refreshed, description: account.bank })
    }, 800)
  }

  const info = [
    { label: copy.institution, value: account.bank },
    { label: copy.type, value: kind },
    { label: copy.agency, value: account.agency },
    {
      label: copy.accountNumber,
      value: (
        <button
          className="inline-flex items-center gap-1.5 font-mono tabular-nums hover:text-primary"
          onClick={() => {
            navigator.clipboard?.writeText(`${account.agency} ${account.number}`).catch(() => {})
            toast({ title: copy.copied, variant: 'info' })
          }}
          aria-label={copy.copyAria}
        >
          {account.number}
          <Copy className="size-3.5 text-subtle" />
        </button>
      ),
    },
    ...(account.yieldRate ? [{ label: copy.yield, value: account.yieldRate }] : []),
    { label: copy.lastSync, value: updated },
  ]

  return (
    <Container className="space-y-xl">
      <PageHeader
        title={
          <span className="flex items-center gap-sm">
            <span className="flex size-9 items-center justify-center rounded-sm bg-primary-soft text-primary-soft-foreground">
              <Landmark className="size-5" />
            </span>
            {name}
          </span>
        }
        description={`${account.bank} ·· ${account.last4}`}
        onBack={() => onNavigate('accounts')}
        backLabel={t.nav.accounts}
        actions={
          <>
            <Button variant="secondary" onClick={refresh} isLoading={refreshing}>
              {!refreshing && <RefreshCw />}
              {copy.refresh}
            </Button>
            <Button variant="ghost" className="text-danger hover:bg-danger/10 hover:text-danger" onClick={() => setConfirmDisconnect(true)}>
              <Unlink />
              {copy.disconnect}
            </Button>
          </>
        }
      />

      <Grid cols={4}>
        <Card>
          <CardContent className="space-y-sm">
            <p className="text-sm font-medium text-muted">{t.accounts.availableBalance}</p>
            <MonetaryValue value={account.balance} hideable className="text-2xl" />
            <p className="text-xs text-muted">{t.accounts.updated(updated)}</p>
          </CardContent>
        </Card>
        <StatCard label={t.accounts.invested} value={invested} icon={<PiggyBank />} hint={copy.holdingsCount(accountInvestments.length)} />
        <StatCard label={copy.incomeMonth} value={income} icon={<ArrowDownLeft />} hint={copy.inThisAccount} />
        <StatCard label={copy.expensesMonth} value={expenses} icon={<ArrowUpRight />} hint={copy.inThisAccount} />
      </Grid>

      <div className="grid gap-lg lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{copy.transactionsTitle}</CardTitle>
            <CardDescription>{copy.transactionsDescription}</CardDescription>
          </CardHeader>
          {accountTx.length > 0 ? (
            <div className="divide-y divide-border">
              {accountTx.map((tx) => (
                <TransactionItem key={tx.id} categoryIcon={categoryIcons[tx.category]} {...tx} onClick={() => onOpenTransaction(tx)} />
              ))}
            </div>
          ) : (
            <EmptyState title={copy.noTransactions} />
          )}
        </Card>

        <div className="space-y-lg">
          <Card>
            <CardHeader>
              <CardTitle>{copy.infoTitle}</CardTitle>
            </CardHeader>
            <dl className="divide-y divide-border">
              {info.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-md px-lg py-sm text-sm">
                  <dt className="text-muted">{row.label}</dt>
                  <dd className="text-right font-medium">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{copy.investmentsTitle}</CardTitle>
            </CardHeader>
            {accountInvestments.length > 0 ? (
              <ul className="divide-y divide-border">
                {accountInvestments.map((i) => (
                  <li key={i.id}>
                    <button
                      onClick={() => onNavigate('investment-detail', i.id)}
                      className="flex w-full items-center justify-between gap-sm px-lg py-sm text-left text-sm transition-colors hover:bg-surface-muted/60"
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-medium">{i.name}</span>
                        <span className="text-xs text-muted">{t.investmentCategories[i.category]}</span>
                      </span>
                      <span className="shrink-0 font-semibold tabular-nums">{formatCurrency(i.current)}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-lg py-md text-sm text-muted">{copy.noInvestments}</p>
            )}
          </Card>

          {linkedCards.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{copy.linkedCards}</CardTitle>
                <CardDescription>{copy.linkedCardsDescription}</CardDescription>
              </CardHeader>
              <ul className="divide-y divide-border">
                {linkedCards.map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => onNavigate('card-detail', c.id)}
                      className="flex w-full items-center gap-sm px-lg py-sm text-left text-sm transition-colors hover:bg-surface-muted/60"
                    >
                      <CreditCardIcon className="size-4 text-subtle" />
                      <span className="flex-1 font-medium">{c.name}</span>
                      <Badge>·· {c.last4}</Badge>
                    </button>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmDisconnect}
        onOpenChange={setConfirmDisconnect}
        title={copy.disconnectTitle(account.bank)}
        description={copy.disconnectDescription}
        confirmLabel={copy.disconnect}
        destructive
        onConfirm={() => {
          removeAccount(account.id)
          toast({ title: copy.disconnected(account.bank) })
          onNavigate('accounts')
        }}
      />
    </Container>
  )
}
