import { useState } from 'react'
import {
  Badge,
  BudgetCard,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CashFlowChart,
  Container,
  Grid,
  MenuItem,
  MonetaryValue,
  PageHeader,
  PayBillDialog,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Section,
  SectionHeader,
  StatCard,
  SyncMascot,
  TransactionItem,
  TransferDialog,
  type PayableBill,
  type TransferMode,
} from '@/components'
import { cashFlow, categoryIcons, creditCards, upcomingBills, user, type Transaction, type UpcomingBill } from '@/data/mock'
import { useFinance } from '@/hooks/useFinance'
import { useLanguage } from '@/i18n'
import type { NavigateFn } from '@/lib/navigation'
import { cn, formatCurrency } from '@/lib/utils'
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  CheckCircle2,
  Clock,
  CreditCard as CreditCardIcon,
  Landmark,
  PiggyBank,
  Plus,
  QrCode,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react'

interface DashboardScreenProps {
  onNavigate?: NavigateFn
  onAskAI?: (prompt?: string) => void
  onOpenTransaction?: (tx: Transaction) => void
  onNewTransaction?: () => void
}

const percentChange = (current: number, previous?: number) =>
  previous ? ((current - previous) / previous) * 100 : undefined

export function DashboardScreen({ onNavigate, onAskAI, onOpenTransaction, onNewTransaction }: DashboardScreenProps) {
  const { t } = useLanguage()
  const { accounts, budgets, transactions, paidBills } = useFinance()
  const [activeCardId, setActiveCardId] = useState<string>(creditCards[0].id)
  const [period, setPeriod] = useState(cashFlow.length - 1)
  const [paying, setPaying] = useState<PayableBill | null>(null)
  const [transfer, setTransfer] = useState<TransferMode | null>(null)

  const currentMonthData = cashFlow[period]
  const previousMonthData = cashFlow[period - 1]
  const periodLabel = (month: string) => `${t.months[month] ?? month} 2026`
  const incomeChange = percentChange(currentMonthData.income, previousMonthData?.income)
  const expensesChange = percentChange(currentMonthData.expenses, previousMonthData?.expenses)

  const net = currentMonthData.income - currentMonthData.expenses
  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0)
  const savingsRate = (net / currentMonthData.income) * 100
  const dailyAverageExpenses = currentMonthData.expenses / 30
  const totalBudgetSpent = budgets.reduce((sum, b) => sum + b.spent, 0)

  const pendingBills = upcomingBills.filter((b) => !paidBills.includes(b.id))
  const unpaidCardBills = pendingBills.filter((b) => b.cardId)
  const totalInvoices = unpaidCardBills.reduce((sum, b) => sum + b.amount, 0)
  const billTitle = (bill: UpcomingBill) => t.bills.titles[bill.id] ?? bill.title
  const startPayment = (bill: UpcomingBill) =>
    setPaying({ id: bill.id, title: billTitle(bill), amount: bill.amount, dueDate: bill.dueDate })

  const quickActions = [
    { key: 'pix', icon: <QrCode className="size-4" />, label: t.dashboard.quickActions.pix, run: () => setTransfer('pix') },
    {
      key: 'invoice',
      icon: <CreditCardIcon className="size-4" />,
      label: t.dashboard.quickActions.payInvoice,
      run: () => (unpaidCardBills[0] ? startPayment(unpaidCardBills[0]) : onNavigate?.('bills')),
    },
    {
      key: 'transfer',
      icon: <ArrowUpRight className="size-4" />,
      label: t.dashboard.quickActions.transfer,
      run: () => setTransfer('transfer'),
    },
    {
      key: 'new',
      icon: <Plus className="size-4" />,
      label: t.dashboard.quickActions.newTransaction,
      run: () => (onNewTransaction ? onNewTransaction() : onNavigate?.('transactions')),
    },
  ]

  return (
    <Container className="space-y-xl">
      {/* 1. Page Header */}
      <PageHeader
        title={t.dashboard.welcomeBack(user.name.split(' ')[0])}
        description={t.dashboardExtra.periodDescription(t.common.monthNames[currentMonthData.month] ?? currentMonthData.month)}
        actions={
          <>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="secondary" aria-label={t.dashboardExtra.periodAria(periodLabel(currentMonthData.month))}>
                  <Calendar />
                  {periodLabel(currentMonthData.month)}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-48 p-1">
                {cashFlow
                  .map((point, i) => (
                    <MenuItem key={point.month} onClick={() => setPeriod(i)} aria-current={i === period}>
                      <span className="flex-1">{periodLabel(point.month)}</span>
                      {i === period && <Check className="text-primary" />}
                    </MenuItem>
                  ))
                  .reverse()}
              </PopoverContent>
            </Popover>
            <Button onClick={() => (onNewTransaction ? onNewTransaction() : onNavigate?.('transactions'))}>
              <Plus />
              {t.dashboard.addTransaction}
            </Button>
          </>
        }
      />

      {/* 2. Quick actions */}
      <div className="grid grid-cols-2 gap-sm sm:grid-cols-4">
        {quickActions.map((action) => (
          <Button
            key={action.key}
            variant="secondary"
            className="h-12 justify-start gap-sm border-border bg-surface shadow-xs hover:border-primary/40 hover:bg-surface-muted"
            onClick={action.run}
          >
            <div className="flex size-7 items-center justify-center rounded-sm bg-primary-soft text-primary-soft-foreground">
              {action.icon}
            </div>
            <span className="text-sm font-medium">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* 3. Key metrics */}
      <Grid cols={4}>
        <StatCard
          label={t.dashboard.totalBalance}
          value={totalBalance}
          icon={<Wallet />}
          change={4.2}
          hint={t.dashboard.vsLastMonth}
          hideable
        />
        <StatCard
          label={t.dashboard.monthlyExpenses}
          value={currentMonthData.expenses}
          icon={<TrendingDown />}
          change={expensesChange}
          increaseIsGood={false}
          hint={expensesChange !== undefined ? t.dashboard.vsLastMonth : undefined}
        />
        <StatCard
          label={t.dashboard.monthlyIncome}
          value={currentMonthData.income}
          icon={<TrendingUp />}
          change={incomeChange || undefined}
          hint={incomeChange ? t.dashboard.vsLastMonth : t.dashboard.sameAsLastMonth}
        />
        <StatCard
          label={t.dashboard.netSavings}
          value={net}
          icon={<PiggyBank />}
          hint={t.dashboard.incomeSaved(savingsRate.toFixed(0))}
        />
      </Grid>

      {/* 4. Balance per account */}
      <Section>
        <SectionHeader
          title={t.dashboard.accountsSection.title}
          description={t.dashboard.accountsSection.description}
          action={
            <Button variant="ghost" size="sm" onClick={() => onNavigate?.('accounts')}>
              {t.dashboard.accountsSection.manageAccounts}
              <ArrowRight />
            </Button>
          }
        />

        <Grid cols={3}>
          {accounts.map((a) => {
            const displayName = t.accountNames[a.name] ?? a.name
            const displayKind = t.accountKinds[a.kind] ?? a.kind

            return (
              <Card key={a.id} className="transition-all hover:border-primary/40 hover:shadow-xs">
                <CardContent className="space-y-md">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-sm">
                      <div className="flex size-10 items-center justify-center rounded-sm bg-primary-soft text-primary-soft-foreground">
                        <Landmark className="size-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{displayName}</p>
                        <p className="text-xs text-muted">
                          {a.bank} ·· {a.last4}
                        </p>
                      </div>
                    </div>
                    <Badge>{displayKind}</Badge>
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-xs font-medium text-muted">{t.accounts.availableBalance}</p>
                    <MonetaryValue value={a.balance} hideable className="text-xl font-bold" />
                  </div>
                </CardContent>
                <CardFooter className="justify-between border-t border-border pt-sm text-xs text-muted">
                  <span>{t.relativeTimes[a.updated] ?? a.updated}</span>
                  <button
                    className="rounded-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    onClick={() => onNavigate?.('account-detail', a.id)}
                    aria-label={t.dashboardExtra.accountDetailsAria(displayName, a.bank)}
                  >
                    {t.common.viewDetails}
                  </button>
                </CardFooter>
              </Card>
            )
          })}
        </Grid>
      </Section>

      {/* 5. Card invoices */}
      <Section>
        <SectionHeader
          title={t.dashboard.cardsSection.title}
          description={t.dashboard.cardsSection.description}
          action={
            <div className="flex items-center gap-sm">
              <span className="hidden text-xs text-muted sm:inline">{t.dashboard.cardsSection.totalInvoices}:</span>
              <Badge variant={totalInvoices > 0 ? 'warning' : 'success'} className="text-xs font-semibold tabular-nums">
                {formatCurrency(totalInvoices)}
              </Badge>
            </div>
          }
        />

        <div className="grid gap-lg lg:grid-cols-2">
          {creditCards.map((card) => {
            const limitUsedPct = (card.currentInvoice / card.limit) * 100
            const availableLimit = card.limit - card.currentInvoice
            const bill = upcomingBills.find((b) => b.cardId === card.id)
            const isPaid = !!bill && paidBills.includes(bill.id)

            return (
              <Card
                key={card.id}
                className={cn(
                  'overflow-hidden transition-all',
                  activeCardId === card.id ? 'border-primary ring-1 ring-primary/20' : 'hover:border-border'
                )}
                onClick={() => setActiveCardId(card.id)}
              >
                <CardHeader className="flex-row items-center justify-between border-b border-border bg-surface-muted/30 pb-md">
                  <div className="flex items-center gap-sm">
                    <div className="flex size-9 items-center justify-center rounded-sm bg-primary font-mono text-xs font-bold text-primary-foreground">
                      {card.brand === 'Mastercard' ? 'MC' : 'VI'}
                    </div>
                    <div>
                      <CardTitle className="text-base">{card.name}</CardTitle>
                      <CardDescription>
                        {card.bank} ···· {card.last4}
                      </CardDescription>
                    </div>
                  </div>
                  {isPaid ? (
                    <Badge variant="success">
                      <Check />
                      {t.cardDetail.invoicePaid}
                    </Badge>
                  ) : (
                    <Badge variant="default" className="border-primary/20 bg-primary-soft text-primary-soft-foreground">
                      {t.dashboard.cardsSection.invoiceStatusOpen}
                    </Badge>
                  )}
                </CardHeader>

                <CardContent className="space-y-lg pt-lg">
                  {/* Current invoice amount */}
                  <div className="flex flex-wrap items-baseline justify-between gap-x-md gap-y-sm">
                    <div>
                      <p className="text-xs font-medium text-muted">{t.dashboard.cardsSection.currentInvoice}</p>
                      <div className="mt-0.5">
                        <MonetaryValue value={card.currentInvoice} hideable className="whitespace-nowrap text-3xl font-bold tracking-tight" />
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-sm bg-warning/10 px-2 py-1 font-medium text-warning">
                        <Clock className="size-3.5" />
                        {t.dashboard.cardsSection.dueOn(card.dueDate)}
                      </span>
                      <span className="hidden text-muted sm:inline">·</span>
                      <span className="hidden text-muted sm:inline">
                        {t.dashboard.cardsSection.bestDay(card.bestPurchaseDay)}
                      </span>
                    </div>
                  </div>

                  {/* Limit usage bar */}
                  <div className="space-y-sm">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted">
                        {t.dashboard.cardsSection.limitUsed}:{' '}
                        <strong className="text-foreground">{formatCurrency(card.currentInvoice)}</strong>
                      </span>
                      <span className="font-medium text-muted">
                        {t.dashboard.cardsSection.limitAvailable(formatCurrency(availableLimit))}
                      </span>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-muted">
                      <div
                        className={cn(
                          'h-full rounded-full transition-all duration-500',
                          limitUsedPct > 80 ? 'bg-danger' : limitUsedPct > 50 ? 'bg-warning' : 'bg-primary'
                        )}
                        style={{ width: `${Math.min(limitUsedPct, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-subtle">
                      <span>0%</span>
                      <span>
                        {t.accounts.used}: {limitUsedPct.toFixed(0)}%
                      </span>
                      <span>{t.dashboardExtra.limitTotal(formatCurrency(card.limit))}</span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="justify-between border-t border-border bg-surface-muted/20">
                  <span className="text-xs text-muted">{t.dashboard.cardsSection.closesOn(card.closingDate)}</span>
                  <div className="flex gap-xs">
                    <Button variant="ghost" size="sm" onClick={() => onNavigate?.('card-detail', card.id)}>
                      {t.dashboard.cardsSection.viewDetails}
                    </Button>
                    {bill && !isPaid && (
                      <Button size="sm" onClick={() => startPayment(bill)}>
                        {t.dashboard.cardsSection.payInvoice}
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </Section>

      {/* 6. Monthly spending and spending per category */}
      <div className="grid gap-lg lg:grid-cols-3">
        <div className="space-y-lg lg:col-span-2">
          {/* Spending per category */}
          <Card>
            <CardHeader className="flex-row items-start justify-between gap-sm border-b-0 pb-0">
              <div className="space-y-1">
                <CardTitle>{t.dashboard.categoryExpensesSection.title}</CardTitle>
                <CardDescription>{t.dashboard.categoryExpensesSection.description}</CardDescription>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-xs">
                <Badge variant="default" className="font-semibold tabular-nums">
                  {t.dashboard.categoryExpensesSection.totalSpentInCategory(formatCurrency(totalBudgetSpent))}
                </Badge>
                <Button variant="ghost" size="sm" onClick={() => onNavigate?.('budgets')}>
                  {t.dashboardExtra.manageBudgets}
                  <ArrowRight />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-md pt-md">
              <Grid cols={2}>
                {budgets.map((b) => (
                  <BudgetCard key={b.category} icon={categoryIcons[b.category]} {...b} />
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Cash flow chart */}
          <Card>
            <CardHeader className="flex-row items-start justify-between border-b-0 pb-0">
              <div className="space-y-1">
                <CardTitle>{t.dashboard.cashFlowTitle}</CardTitle>
                <CardDescription>{t.dashboard.cashFlowDescription}</CardDescription>
              </div>
              <Badge variant="success">{t.dashboard.thisMonthBadge(formatCurrency(net))}</Badge>
            </CardHeader>
            <CardContent>
              <CashFlowChart data={cashFlow} />
            </CardContent>
          </Card>
        </div>

        {/* Upcoming bills, AI insight, daily average */}
        <div className="space-y-lg">
          <Card>
            <CardHeader className="border-b border-border pb-md">
              <div className="flex items-center justify-between gap-sm">
                <CardTitle className="text-base">{t.dashboard.upcomingBillsSection.title}</CardTitle>
                <Button variant="ghost" size="sm" className="-mr-2 h-7 px-2 text-xs" onClick={() => onNavigate?.('bills')}>
                  {t.dashboardExtra.viewAllBills}
                  <ArrowRight />
                </Button>
              </div>
              <CardDescription>{t.dashboard.upcomingBillsSection.description}</CardDescription>
            </CardHeader>
            {pendingBills.length > 0 ? (
              <div className="divide-y divide-border">
                {pendingBills.map((bill) => (
                  <div key={bill.id} className="flex items-center justify-between gap-sm px-lg py-md">
                    <div className="min-w-0 space-y-0.5">
                      <p className="truncate text-sm font-medium text-foreground">{billTitle(bill)}</p>
                      <div className="flex items-center gap-xs text-xs text-muted">
                        {bill.status === 'urgent' ? (
                          <span className="inline-flex items-center gap-1 font-medium text-danger">
                            <AlertCircle className="size-3" />
                            {t.dashboard.upcomingBillsSection.dueSoon}
                          </span>
                        ) : (
                          <span>{t.dashboard.upcomingBillsSection.dueInDays(bill.daysUntilDue)}</span>
                        )}
                        <span>·</span>
                        <span>{bill.dueDate}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold tabular-nums text-foreground">{formatCurrency(bill.amount)}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 text-xs text-primary hover:text-primary"
                        onClick={() => startPayment(bill)}
                        aria-label={t.dashboardExtra.payBillAria(billTitle(bill))}
                      >
                        {t.dashboard.upcomingBillsSection.payNow}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="flex items-center justify-center gap-sm px-lg py-xl text-sm text-muted">
                <Check className="size-4 text-success" />
                {t.bills.allPaid}
              </p>
            )}
          </Card>

          {/* FinSync AI insight with the Sync mascot */}
          <Card className="border-[#15b2f7]/25 bg-linear-to-br from-[#2055f5]/[0.06] via-surface to-[#15b2f7]/[0.08]">
            <CardHeader className="pb-sm">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1877f2] dark:text-[#5cc4ff]">
                  <Sparkles className="size-3.5" />
                  {t.dashboard.aiInsight.badge}
                </div>
                <Badge variant="default" className="text-[10px] py-0 px-1.5">
                  FinSync AI
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-md">
              <div className="flex items-center gap-md">
                <SyncMascot
                  pose="smart"
                  size="sm"
                  floating
                  sparkles
                  speech={t.dashboard.aiInsight.badge}
                  onClick={() => (onAskAI ? onAskAI(t.ai.suggestions[0]) : onNavigate?.('ai-assistant'))}
                  className="shrink-0"
                />
                <p className="text-xs leading-relaxed text-muted">{t.dashboard.aiInsight.message}</p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-center gap-sm bg-surface font-medium hover:bg-surface-muted"
                onClick={() => (onAskAI ? onAskAI(t.ai.suggestions[0]) : onNavigate?.('ai-assistant'))}
              >
                <span>{t.dashboard.aiInsight.action}</span>
                <ArrowRight className="size-3.5" />
              </Button>
            </CardContent>
          </Card>

          {/* Daily average spending */}
          <Card>
            <CardContent className="space-y-sm pt-lg">
              <div className="flex items-center justify-between text-muted">
                <span className="text-xs font-medium uppercase tracking-wider">
                  {t.dashboard.monthlyExpensesSection.dailyAverage}
                </span>
                <CheckCircle2 className="size-4 text-success" />
              </div>
              <p className="text-2xl font-bold tracking-tight text-foreground tabular-nums">
                {formatCurrency(dailyAverageExpenses)}{' '}
                <span className="text-xs font-normal text-muted">{t.dashboardExtra.perDay}</span>
              </p>
              <p className="text-xs text-muted">{t.dashboard.monthlyExpensesSection.dailyAverageHint}</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* 7. Recent transactions */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle>{t.dashboard.recentTransactionsTitle}</CardTitle>
            <CardDescription>{t.dashboard.recentTransactionsDescription}</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onNavigate?.('transactions')}>
            {t.dashboard.viewAll}
            <ArrowRight />
          </Button>
        </CardHeader>
        <div className="divide-y divide-border">
          {transactions.slice(0, 5).map((tx) => (
            <TransactionItem
              key={tx.id}
              categoryIcon={categoryIcons[tx.category]}
              {...tx}
              onClick={onOpenTransaction ? () => onOpenTransaction(tx) : undefined}
            />
          ))}
        </div>
      </Card>

      <PayBillDialog bill={paying} onOpenChange={(open) => !open && setPaying(null)} />
      <TransferDialog mode={transfer} onOpenChange={(open) => !open && setTransfer(null)} />
    </Container>
  )
}
