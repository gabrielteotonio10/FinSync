import { useState } from 'react'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Container,
  Grid,
  NewInvestmentDialog,
  PageHeader,
  Section,
  SectionHeader,
  StatCard,
  SyncMascot,
} from '@/components'
import { investmentCategories } from '@/data/mock'
import type { InvestmentCategory } from '@/data/mock'
import { useFinance } from '@/hooks/useFinance'
import { useLanguage } from '@/i18n'
import type { NavigateFn } from '@/lib/navigation'
import { cn, formatCurrency } from '@/lib/utils'
import { ArrowRight, ChevronRight, Layers, PieChart, Plus, Sparkles, TrendingUp, Wallet } from 'lucide-react'

const categoryColors: Record<InvestmentCategory, string> = {
  'Renda Fixa': 'bg-chart-1',
  'Renda Variável': 'bg-chart-2',
  Fundos: 'bg-chart-3',
}

interface InvestmentsScreenProps {
  onNavigate?: NavigateFn
  onAskAI?: (prompt?: string) => void
}

export function InvestmentsScreen({ onNavigate, onAskAI }: InvestmentsScreenProps = {}) {
  const [accountFilter, setAccountFilter] = useState<string>('all')
  const [creating, setCreating] = useState(false)
  const { language, t } = useLanguage()
  const { accounts, investments } = useFinance()

  const formatPercent = (value: number) => {
    const decimalSeparator = language === 'en' ? '.' : ','
    return `${value >= 0 ? '+' : '−'}${Math.abs(value).toFixed(2).replace('.', decimalSeparator)}%`
  }

  const total = investments.reduce((sum, i) => sum + i.current, 0)
  const applied = investments.reduce((sum, i) => sum + i.applied, 0)
  const monthlyGain = investments.reduce((sum, i) => sum + i.monthlyGain, 0)
  const monthlyPct = (monthlyGain / (total - monthlyGain)) * 100

  const byCategory = investmentCategories.map((category) => {
    const value = investments.filter((i) => i.category === category).reduce((s, i) => s + i.current, 0)
    return { category, value, pct: total ? (value / total) * 100 : 0 }
  })
  const largest = byCategory.reduce((a, b) => (b.value > a.value ? b : a))

  const institutions = accounts.filter((a) => investments.some((i) => i.accountId === a.id))
  const visibleInstitutions = institutions.filter((a) => accountFilter === 'all' || a.id === accountFilter)
  const filters = [{ id: 'all', label: t.investments.all }, ...institutions.map((a) => ({ id: a.id, label: a.bank }))]

  return (
    <Container className="space-y-xl">
      <PageHeader
        title={t.investments.title}
        description={t.investments.description}
        actions={
          <Button onClick={() => setCreating(true)}>
            <Plus />
            {t.investments.newInvestment}
          </Button>
        }
      />

      <Grid cols={3}>
        <StatCard
          label={t.investments.totalInvested}
          value={total}
          icon={<Wallet />}
          change={((total - applied) / applied) * 100}
          hint={t.investments.onApplied(formatCurrency(applied))}
          hideable
        />
        <StatCard
          label={t.investments.earningsThisMonth}
          value={monthlyGain}
          icon={<TrendingUp />}
          change={monthlyPct}
          hint={t.investments.vsStartOfMonth}
        />
        <Card>
          <CardContent className="space-y-sm">
            <div className="flex items-center justify-between gap-sm">
              <p className="text-sm font-medium text-muted">{t.investments.portfolioDistribution}</p>
              <div className="flex size-8 items-center justify-center rounded-sm bg-surface-muted text-muted [&_svg]:size-4">
                <PieChart />
              </div>
            </div>
            <p className="text-2xl font-semibold tracking-tight tabular-nums">
              {largest.pct.toFixed(0)}%{' '}
              <span className="text-base font-medium text-muted">
                {t.investmentCategories[largest.category]}
              </span>
            </p>
            <p className="text-xs text-muted">{t.investments.assetClassesLargest(investmentCategories.length)}</p>
          </CardContent>
        </Card>
      </Grid>

      <Card>
        <CardHeader className="border-b-0 pb-0">
          <CardTitle>{t.investments.assetAllocation}</CardTitle>
          <CardDescription>{t.investments.shareByCategory}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-sm">
          <div className="flex h-2.5 w-full gap-[2px] overflow-hidden rounded-full" aria-hidden="true">
            {byCategory.map((c) => (
              <div
                key={c.category}
                className={cn('h-full first:rounded-l-full last:rounded-r-full', categoryColors[c.category])}
                style={{ width: `${c.pct}%` }}
              />
            ))}
          </div>
          <ul className="flex flex-wrap gap-x-lg gap-y-xs text-sm">
            {byCategory.map((c) => (
              <li key={c.category} className="flex items-center gap-1.5">
                <span className={cn('size-2.5 rounded-[3px]', categoryColors[c.category])} aria-hidden="true" />
                <span className="text-muted">{t.investmentCategories[c.category]}</span>
                <span className="font-medium tabular-nums">{c.pct.toFixed(0)}%</span>
                <span className="text-muted tabular-nums">· {formatCurrency(c.value)}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Sync Portfolio AI Intelligence */}
      <Card className="relative overflow-hidden border-[#15b2f7]/25 bg-linear-to-br from-[#2055f5]/[0.05] via-surface to-[#15b2f7]/[0.08]">
        <CardContent className="flex flex-col gap-md p-md sm:flex-row sm:items-center sm:justify-between sm:p-lg">
          <div className="flex items-center gap-md">
            <SyncMascot
              pose="smart"
              size="sm"
              floating
              sparkles
              onClick={() => (onAskAI ? onAskAI(t.investmentsSync.prompt) : onNavigate?.('ai-assistant'))}
              className="shrink-0"
            />
            <div className="min-w-0 space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1877f2] dark:text-[#5cc4ff]">
                <Sparkles className="size-3.5" />
                {t.investmentsSync.badge}
              </div>
              <p className="text-sm font-semibold tracking-tight text-foreground">{t.investmentsSync.title}</p>
              <p className="text-xs leading-relaxed text-muted">{t.investmentsSync.description}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-sm">
            <Button
              variant="secondary"
              size="sm"
              className="gap-1.5 bg-surface hover:bg-surface-muted"
              onClick={() => (onAskAI ? onAskAI(t.investmentsSync.prompt) : onNavigate?.('ai-assistant'))}
            >
              <Sparkles className="size-3.5 text-primary" />
              <span>{t.investmentsSync.action}</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Section>
        <SectionHeader
          title={t.investments.holdingsByInstitution}
          action={
            <div role="group" aria-label={t.investments.filterByInstitution} className="flex flex-wrap gap-xs">
              {filters.map((f) => (
                <Button
                  key={f.id}
                  size="sm"
                  variant={accountFilter === f.id ? 'primary' : 'secondary'}
                  aria-pressed={accountFilter === f.id}
                  onClick={() => setAccountFilter(f.id)}
                >
                  {f.label}
                </Button>
              ))}
            </div>
          }
        />
        <div className="space-y-lg">
          {visibleInstitutions.map((account) => {
            const items = investments.filter((i) => i.accountId === account.id)
            const subtotal = items.reduce((s, i) => s + i.current, 0)
            return (
              <Card key={account.id} role="region" aria-label={t.investments.institutionInvestmentsAria(account.bank)}>
                <CardHeader className="flex-row items-center justify-between">
                  <div className="flex items-center gap-sm">
                    <div className="flex size-9 items-center justify-center rounded-sm bg-primary-soft text-primary-soft-foreground [&_svg]:size-4">
                      <Layers />
                    </div>
                    <div>
                      <CardTitle>{account.bank}</CardTitle>
                      <CardDescription>{t.investments.holdingsCount(items.length)}</CardDescription>
                    </div>
                  </div>
                  <p className="text-lg font-semibold tabular-nums">{formatCurrency(subtotal)}</p>
                </CardHeader>
                <ul className="divide-y divide-border">
                  {items.map((i) => {
                    const gain = i.current - i.applied
                    const gainPct = (gain / i.applied) * 100
                    const positive = gain >= 0
                    return (
                      <li key={i.id} className="relative flex flex-wrap items-center justify-between gap-sm px-lg py-md transition-colors hover:bg-surface-muted/60">
                        <div className="min-w-0 space-y-1">
                          {/* Stretched link: the whole row opens the holding */}
                          <button
                            onClick={() => onNavigate?.('investment-detail', i.id)}
                            className="block truncate text-left text-sm font-medium after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-ring"
                          >
                            {i.name}
                          </button>
                          <div className="flex items-center gap-sm text-xs text-muted">
                            <Badge>{t.investmentCategories[i.category]}</Badge>
                            <span className="tabular-nums">{t.investments.appliedAmount(formatCurrency(i.applied))}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold tabular-nums">{formatCurrency(i.current)}</p>
                          <p
                            className={cn(
                              'text-xs font-medium tabular-nums',
                              positive ? 'text-success' : 'text-danger'
                            )}
                          >
                            {positive ? '+' : '−'}
                            {formatCurrency(Math.abs(gain))} · {formatPercent(gainPct)}
                          </p>
                        </div>
                        <ChevronRight className="hidden size-4 text-subtle sm:block" aria-hidden="true" />
                      </li>
                    )
                  })}
                </ul>
              </Card>
            )
          })}
        </div>
      </Section>

      <NewInvestmentDialog open={creating} onOpenChange={setCreating} />
    </Container>
  )
}
