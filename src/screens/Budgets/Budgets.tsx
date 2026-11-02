import { useState } from 'react'
import { ArrowRight, CircleAlert, Pencil, PiggyBank, Sparkles, Target, Wallet } from 'lucide-react'
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
  SyncMascot,
  TransactionItem,
  ValueTrendChart,
} from '@/components'
import { budgetCategoryMap, budgetHistory, cashFlow, categoryIcons, type Transaction } from '@/data/mock'
import { useFinance } from '@/hooks/useFinance'
import { useToast } from '@/hooks/useToast'
import { useLanguage } from '@/i18n'
import { cn, formatCurrency } from '@/lib/utils'

interface BudgetsScreenProps {
  onAskAI?: (prompt?: string) => void
  onOpenTransaction: (tx: Transaction) => void
}

function budgetStatus(pct: number) {
  if (pct >= 100) return { variant: 'error', bar: 'bg-danger' } as const
  if (pct >= 80) return { variant: 'warning', bar: 'bg-warning' } as const
  return { variant: 'default', bar: 'bg-primary' } as const
}

export function BudgetsScreen({ onAskAI, onOpenTransaction }: BudgetsScreenProps) {
  const { t } = useLanguage()
  const { budgets, transactions, updateBudgetLimit } = useFinance()
  const { toast } = useToast()
  const [selected, setSelected] = useState(budgets[0]?.category)
  const [editing, setEditing] = useState(false)
  const copy = t.budgets

  const totalLimit = budgets.reduce((s, b) => s + b.limit, 0)
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0)
  const overCount = budgets.filter((b) => b.spent > b.limit).length

  const budget = budgets.find((b) => b.category === selected) ?? budgets[0]
  const budgetName = t.categories[budget.category] ?? budget.category
  const history = [...(budgetHistory[budget.category] ?? []).slice(0, -1), budget.spent]
  const monthLabels = cashFlow.map((p) => t.months[p.month] ?? p.month)
  const average = history.reduce((s, v) => s + v, 0) / history.length
  const related = transactions.filter(
    (tx) => tx.type === 'expense' && budgetCategoryMap[budget.category]?.includes(tx.category)
  )
  const pct = (budget.spent / budget.limit) * 100

  return (
    <Container className="space-y-xl">
      <PageHeader
        title={copy.title}
        description={copy.description}
      />

      <Grid cols={4}>
        <StatCard label={copy.totalLimit} value={totalLimit} icon={<Target />} hint={copy.categoriesCount(budgets.length)} />
        <StatCard label={copy.totalSpent} value={totalSpent} icon={<Wallet />} hint={copy.ofTotal(((totalSpent / totalLimit) * 100).toFixed(0))} />
        <StatCard label={copy.remaining} value={Math.max(totalLimit - totalSpent, 0)} icon={<PiggyBank />} hint={copy.untilEndOfMonth} />
        <Card>
          <CardContent className="space-y-sm">
            <div className="flex items-center justify-between gap-sm">
              <p className="text-sm font-medium text-muted">{copy.overBudget}</p>
              <div className="flex size-8 items-center justify-center rounded-sm bg-surface-muted text-muted [&_svg]:size-4">
                <CircleAlert />
              </div>
            </div>
            <p className={cn('text-2xl font-semibold tabular-nums', overCount > 0 && 'text-danger')}>{overCount}</p>
            <p className="text-xs text-muted">{copy.overBudgetHint}</p>
          </CardContent>
        </Card>
      </Grid>

      {/* Sync Budget Coach Intelligence */}
      <Card className="relative overflow-hidden border-[#15b2f7]/25 bg-linear-to-br from-[#2055f5]/[0.05] via-surface to-[#15b2f7]/[0.08]">
        <CardContent className="flex flex-col gap-md p-md sm:flex-row sm:items-center sm:justify-between sm:p-lg">
          <div className="flex items-center gap-md">
            <SyncMascot
              pose="smart"
              size="sm"
              floating
              sparkles
              onClick={() => onAskAI?.(t.budgetsSync.prompt)}
              className="shrink-0"
            />
            <div className="min-w-0 space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1877f2] dark:text-[#5cc4ff]">
                <Sparkles className="size-3.5" />
                {t.budgetsSync.badge}
              </div>
              <p className="text-sm font-semibold tracking-tight text-foreground">{t.budgetsSync.title}</p>
              <p className="text-xs leading-relaxed text-muted">{t.budgetsSync.description}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-sm">
            <Button
              variant="secondary"
              size="sm"
              className="gap-1.5 bg-surface hover:bg-surface-muted"
              onClick={() => onAskAI?.(t.budgetsSync.prompt)}
            >
              <Sparkles className="size-3.5 text-primary" />
              <span>{t.budgetsSync.action}</span>
              <ArrowRight className="size-3.5" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-lg lg:grid-cols-[minmax(0,20rem)_1fr]">
        {/* Budget list */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>{copy.listTitle}</CardTitle>
          </CardHeader>
          <ul className="divide-y divide-border" role="listbox" aria-label={copy.listTitle}>
            {budgets.map((b) => {
              const p = (b.spent / b.limit) * 100
              const status = budgetStatus(p)
              const isActive = b.category === budget.category
              return (
                <li key={b.category} role="option" aria-selected={isActive}>
                  <button
                    onClick={() => setSelected(b.category)}
                    className={cn(
                      'w-full space-y-sm px-lg py-md text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
                      isActive ? 'bg-primary-soft/50' : 'hover:bg-surface-muted/60'
                    )}
                  >
                    <span className="flex items-center gap-sm">
                      <span className="flex size-8 items-center justify-center rounded-sm bg-primary-soft text-primary-soft-foreground [&_svg]:size-4">
                        {categoryIcons[b.category]}
                      </span>
                      <span className="flex-1 text-sm font-medium">{t.categories[b.category] ?? b.category}</span>
                      <Badge variant={status.variant}>{p.toFixed(0)}%</Badge>
                    </span>
                    <span className="block h-1.5 overflow-hidden rounded-full bg-surface-muted">
                      <span className={cn('block h-full rounded-full', status.bar)} style={{ width: `${Math.min(p, 100)}%` }} />
                    </span>
                    <span className="flex justify-between text-xs text-muted tabular-nums">
                      <span>{formatCurrency(b.spent)}</span>
                      <span>{formatCurrency(b.limit)}</span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </Card>

        {/* Selected budget */}
        <div className="space-y-lg">
          <Card>
            <CardHeader className="flex-row items-start justify-between gap-md">
              <div className="space-y-1">
                <CardTitle>{budgetName}</CardTitle>
                <CardDescription>{copy.detailDescription}</CardDescription>
              </div>
              <div className="flex gap-sm">
                {onAskAI && (
                  <Button variant="ghost" size="sm" onClick={() => onAskAI(copy.askPrompt(budgetName))}>
                    <Sparkles />
                    <span className="hidden sm:inline">{copy.askSync}</span>
                  </Button>
                )}
                <Button variant="secondary" size="sm" onClick={() => setEditing(true)}>
                  <Pencil />
                  {copy.editLimit}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-lg">
              <dl className="grid gap-md sm:grid-cols-3">
                {[
                  { label: copy.spent, value: formatCurrency(budget.spent), tone: pct >= 100 ? 'text-danger' : '' },
                  { label: copy.limit, value: formatCurrency(budget.limit), tone: '' },
                  {
                    label: budget.spent > budget.limit ? copy.exceededBy : copy.available,
                    value: formatCurrency(Math.abs(budget.limit - budget.spent)),
                    tone: budget.spent > budget.limit ? 'text-danger' : 'text-success',
                  },
                ].map((item) => (
                  <div key={item.label} className="space-y-1 rounded-sm bg-surface-muted p-md">
                    <dt className="text-xs font-medium text-muted">{item.label}</dt>
                    <dd className={cn('text-lg font-semibold tabular-nums', item.tone)}>{item.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="space-y-sm">
                <div className="flex items-baseline justify-between">
                  <p className="text-sm font-medium">{copy.historyTitle}</p>
                  <p className="text-xs text-muted">{copy.average(formatCurrency(average))}</p>
                </div>
                <ValueTrendChart
                  values={history}
                  labels={monthLabels}
                  label={copy.historyAria(budgetName)}
                  reference={{ value: budget.limit, label: copy.limit }}
                  tone={pct >= 100 ? 'danger' : 'primary'}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{copy.transactionsTitle}</CardTitle>
              <CardDescription>{copy.transactionsDescription(budgetName)}</CardDescription>
            </CardHeader>
            {related.length > 0 ? (
              <div className="divide-y divide-border">
                {related.map((tx) => (
                  <TransactionItem
                    key={tx.id}
                    categoryIcon={categoryIcons[tx.category]}
                    {...tx}
                    onClick={() => onOpenTransaction(tx)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState title={copy.noTransactions} />
            )}
          </Card>
        </div>
      </div>

      <AmountDialog
        key={budget.category}
        open={editing}
        onOpenChange={setEditing}
        title={copy.editTitle(budgetName)}
        description={copy.editDescription}
        label={copy.limitLabel}
        submitLabel={t.common.save}
        hint={copy.currentSpent(formatCurrency(budget.spent))}
        initialValue={budget.limit}
        onSubmit={(value) => {
          updateBudgetLimit(budget.category, value)
          toast({ title: copy.limitUpdated, description: `${budgetName} · ${formatCurrency(value)}` })
        }}
      />
    </Container>
  )
}
