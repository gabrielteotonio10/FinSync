import {
  Badge,
  BudgetCard,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CashFlowChart,
  Container,
  CreditCard,
  Grid,
  PageHeader,
  Section,
  SectionHeader,
  StatCard,
  TransactionItem,
} from '@/components'
import { accounts, budgets, cashFlow, categoryIcons, transactions, user } from '@/data/mock'
import { formatCurrency } from '@/lib/utils'
import { ArrowRight, Calendar, Landmark, PiggyBank, Plus, TrendingDown, TrendingUp, Wallet } from 'lucide-react'
import type { Screen } from '@/App'

interface DashboardScreenProps {
  onNavigate?: (screen: Screen) => void
}

export function DashboardScreen({ onNavigate }: DashboardScreenProps) {
  const current = cashFlow[cashFlow.length - 1]
  const net = current.income - current.expenses
  const savingsRate = (net / current.income) * 100

  return (
    <Container className="space-y-xl">
      <PageHeader
        title={`Welcome back, ${user.name.split(' ')[0]}`}
        description="Here's your financial overview for November."
        actions={
          <>
            <Button variant="secondary">
              <Calendar />
              Nov 2026
            </Button>
            <Button>
              <Plus />
              Add transaction
            </Button>
          </>
        }
      />

      {/* Key Metrics */}
      <Grid cols={4}>
        <StatCard label="Total balance" value={12450.5} icon={<Wallet />} change={4.2} hint="vs last month" hideable />
        <StatCard label="Monthly income" value={current.income} icon={<TrendingUp />} hint="Same as last month" />
        <StatCard
          label="Monthly expenses"
          value={current.expenses}
          icon={<TrendingDown />}
          change={-3.5}
          increaseIsGood={false}
          hint="vs last month"
        />
        <StatCard
          label="Net savings"
          value={net}
          icon={<PiggyBank />}
          hint={`${savingsRate.toFixed(0)}% of income saved`}
        />
      </Grid>

      {/* Cash flow + card */}
      <div className="grid gap-lg lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-start justify-between border-b-0 pb-0">
            <div className="space-y-1">
              <CardTitle>Cash flow</CardTitle>
              <CardDescription>Income and expenses over the last 6 months</CardDescription>
            </div>
            <Badge variant="success">+{formatCurrency(net)} this month</Badge>
          </CardHeader>
          <CardContent>
            <CashFlowChart data={cashFlow} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="border-b-0 pb-0">
            <CardTitle>My card</CardTitle>
            <CardDescription>Nubank Mastercard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-lg">
            <CreditCard
              cardholderName={user.name}
              cardNumber="4242"
              expiryMonth={8}
              expiryYear={2029}
              cardIssuer="Mastercard"
              balance={1842.3}
              className="mx-auto"
            />
            <div className="space-y-sm">
              {accounts.map((a) => (
                <div key={a.id} className="flex items-center gap-sm">
                  <div className="flex size-8 items-center justify-center rounded-sm bg-surface-muted text-muted [&_svg]:size-4">
                    <Landmark />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{a.bank}</p>
                    <p className="text-xs text-muted">{a.kind} ·· {a.last4}</p>
                  </div>
                  <p className="text-sm font-semibold tabular-nums">{formatCurrency(a.balance)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Overview */}
      <Section>
        <SectionHeader title="Budgets" description="Spending against your monthly limits" />
        <Grid cols={4}>
          {budgets.map((b) => (
            <BudgetCard key={b.category} icon={categoryIcons[b.category]} {...b} />
          ))}
        </Grid>
      </Section>

      {/* Recent Transactions */}
      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div className="space-y-1">
            <CardTitle>Recent transactions</CardTitle>
            <CardDescription>Your latest activity across all accounts</CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={() => onNavigate?.('transactions')}>
            View all
            <ArrowRight />
          </Button>
        </CardHeader>
        <div className="divide-y divide-border">
          {transactions.slice(0, 5).map((t) => (
            <TransactionItem key={t.id} categoryIcon={categoryIcons[t.category]} {...t} />
          ))}
        </div>
      </Card>
    </Container>
  )
}
