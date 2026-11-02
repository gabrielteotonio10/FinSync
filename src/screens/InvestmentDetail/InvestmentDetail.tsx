import { useState } from 'react'
import { ArrowDownToLine, ArrowUpFromLine, PieChart, Sparkles, TrendingUp, Wallet } from 'lucide-react'
import {
  AmountDialog,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
  EmptyState,
  Grid,
  PageHeader,
  StatCard,
  ValueTrendChart,
} from '@/components'
import { cashFlow, investmentHistory } from '@/data/mock'
import { useFinance } from '@/hooks/useFinance'
import { useToast } from '@/hooks/useToast'
import { useLanguage } from '@/i18n'
import type { NavigateFn } from '@/lib/navigation'
import { formatCurrency } from '@/lib/utils'

interface InvestmentDetailScreenProps {
  investmentId?: string
  onNavigate: NavigateFn
  onAskAI?: (prompt?: string) => void
}

const riskVariant = { low: 'success', medium: 'warning', high: 'error' } as const

export function InvestmentDetailScreen({ investmentId, onNavigate, onAskAI }: InvestmentDetailScreenProps) {
  const { language, t } = useLanguage()
  const { investments, accounts, adjustInvestment } = useFinance()
  const { toast } = useToast()
  const [dialog, setDialog] = useState<'apply' | 'redeem' | null>(null)
  const copy = t.investmentDetail

  const investment = investments.find((i) => i.id === investmentId)

  if (!investment) {
    return (
      <Container className="space-y-xl">
        <PageHeader title={copy.notFound} onBack={() => onNavigate('investments')} backLabel={t.nav.investments} />
        <Card>
          <EmptyState
            title={copy.notFound}
            description={copy.notFoundDescription}
            action={<Button onClick={() => onNavigate('investments')}>{t.nav.investments}</Button>}
          />
        </Card>
      </Container>
    )
  }

  const formatPercent = (value: number) => {
    const sep = language === 'en' ? '.' : ','
    return `${value >= 0 ? '+' : '−'}${Math.abs(value).toFixed(2).replace('.', sep)}%`
  }

  const account = accounts.find((a) => a.id === investment.accountId)
  const portfolio = investments.reduce((s, i) => s + i.current, 0)
  const gain = investment.current - investment.applied
  const gainPct = investment.applied ? (gain / investment.applied) * 100 : 0
  const monthPct = investment.current ? (investment.monthlyGain / (investment.current - investment.monthlyGain)) * 100 : 0
  const history = investmentHistory(investment)
  const positive = history[history.length - 1] >= history[0]

  const info = [
    { label: copy.institution, value: account?.bank ?? '—' },
    { label: copy.category, value: t.investmentCategories[investment.category] },
    { label: copy.rate, value: investment.rate ?? copy.variable },
    { label: copy.liquidity, value: investment.liquidity ? copy.liquidityLabels[investment.liquidity] : '—' },
    { label: copy.maturity, value: investment.maturity ?? copy.noMaturity },
    {
      label: copy.risk,
      value: investment.risk ? <Badge variant={riskVariant[investment.risk]}>{copy.riskLabels[investment.risk]}</Badge> : '—',
    },
  ]

  return (
    <Container className="space-y-xl">
      <PageHeader
        title={investment.name}
        description={`${t.investmentCategories[investment.category]}${account ? ` · ${account.bank}` : ''}`}
        onBack={() => onNavigate('investments')}
        backLabel={t.nav.investments}
        actions={
          <>
            <Button variant="secondary" onClick={() => setDialog('redeem')}>
              <ArrowUpFromLine />
              {copy.redeem}
            </Button>
            <Button onClick={() => setDialog('apply')}>
              <ArrowDownToLine />
              {copy.apply}
            </Button>
          </>
        }
      />

      <Grid cols={4}>
        <StatCard label={copy.currentValue} value={investment.current} icon={<Wallet />} hideable hint={copy.shareOfPortfolio(((investment.current / portfolio) * 100).toFixed(1))} />
        <StatCard label={copy.applied} value={investment.applied} icon={<PieChart />} />
        <StatCard
          label={copy.totalReturn}
          value={gain}
          valueType={gain >= 0 ? 'income' : 'expense'}
          icon={<TrendingUp />}
          change={gainPct}
          hint={copy.sinceStart}
        />
        <StatCard
          label={copy.monthReturn}
          value={investment.monthlyGain}
          valueType={investment.monthlyGain >= 0 ? 'income' : 'expense'}
          icon={<TrendingUp />}
          change={monthPct}
          hint={t.investments.vsStartOfMonth}
        />
      </Grid>

      <div className="grid gap-lg lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-start justify-between border-b-0 pb-0">
            <div className="space-y-1">
              <CardTitle>{copy.historyTitle}</CardTitle>
              <CardDescription>{copy.historyDescription}</CardDescription>
            </div>
            <Badge variant={gain >= 0 ? 'success' : 'error'}>{formatPercent(gainPct)}</Badge>
          </CardHeader>
          <CardContent>
            <ValueTrendChart
              values={history}
              labels={cashFlow.map((p) => t.months[p.month] ?? p.month)}
              label={copy.historyAria(investment.name)}
              tone={positive ? 'success' : 'danger'}
              height={220}
            />
          </CardContent>
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

          {onAskAI && (
            <Card className="border-[#15b2f7]/25 bg-linear-to-br from-[#2055f5]/[0.05] to-[#15b2f7]/[0.07]">
              <CardContent className="space-y-sm">
                <p className="flex items-center gap-1.5 text-xs font-semibold text-[#1877f2] dark:text-[#5cc4ff]">
                  <Sparkles className="size-3.5" />
                  {copy.syncTitle}
                </p>
                <p className="text-sm">
                  {investment.monthlyGain < 0 ? copy.syncNegative : copy.syncPositive}
                </p>
                <Button size="sm" variant="secondary" onClick={() => onAskAI(copy.askPrompt(investment.name))}>
                  {copy.askSync}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <AmountDialog
        key={`apply-${investment.id}`}
        open={dialog === 'apply'}
        onOpenChange={(open) => !open && setDialog(null)}
        title={copy.applyTitle}
        description={investment.name}
        label={copy.amountLabel}
        submitLabel={copy.apply}
        hint={account ? copy.availableIn(account.bank, formatCurrency(account.balance)) : undefined}
        validate={(value) => (account && value > account.balance ? copy.insufficient : undefined)}
        onSubmit={(value) => {
          adjustInvestment(investment.id, value)
          toast({ title: copy.appliedDone, description: `${investment.name} · ${formatCurrency(value)}` })
        }}
      />
      <AmountDialog
        key={`redeem-${investment.id}`}
        open={dialog === 'redeem'}
        onOpenChange={(open) => !open && setDialog(null)}
        title={copy.redeemTitle}
        description={investment.name}
        label={copy.amountLabel}
        submitLabel={copy.redeem}
        hint={copy.redeemHint(formatCurrency(investment.current))}
        validate={(value) => (value > investment.current ? copy.redeemExceeds : undefined)}
        onSubmit={(value) => {
          adjustInvestment(investment.id, -value)
          toast({ title: copy.redeemedDone, description: `${investment.name} · ${formatCurrency(value)}` })
        }}
      />
    </Container>
  )
}
