import { Card, CardContent, Grid, Container, Section } from '@/components'
import { MonetaryValue, BudgetCard, TransactionItem } from '@/components'
import { H1, H2, Body } from '@/components/Typography/Typography'

export function DashboardScreen() {
  return (
    <Container className="space-y-lg">
      {/* Header */}
      <Section>
        <H1>Dashboard</H1>
        <Body className="text-[var(--semantic-light-color-text-secondary)]">
          Welcome back! Here's your financial overview.
        </Body>
      </Section>

      {/* Key Metrics */}
      <Grid cols={3}>
        <Card>
          <CardContent className="p-lg">
            <p className="text-sm font-medium text-[var(--semantic-light-color-text-secondary)]">
              Total Balance
            </p>
            <MonetaryValue
              value={12450.5}
              type="neutral"
              className="mt-md"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-lg">
            <p className="text-sm font-medium text-[var(--semantic-light-color-text-secondary)]">
              Monthly Income
            </p>
            <MonetaryValue
              value={5250.0}
              type="income"
              className="mt-md"
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-lg">
            <p className="text-sm font-medium text-[var(--semantic-light-color-text-secondary)]">
              Monthly Expenses
            </p>
            <MonetaryValue
              value={2180.25}
              type="expense"
              className="mt-md"
            />
          </CardContent>
        </Card>
      </Grid>

      {/* Budget Overview */}
      <Section>
        <H2>Budget Overview</H2>
        <Grid cols={2}>
          <BudgetCard category="Groceries" icon="🛒" spent={450} limit={1000} />
          <BudgetCard category="Transport" icon="🚕" spent={380} limit={500} />
          <BudgetCard category="Entertainment" icon="🎬" spent={800} limit={1000} />
          <BudgetCard category="Dining" icon="🍽️" spent={1250} limit={1000} />
        </Grid>
      </Section>

      {/* Recent Transactions */}
      <Section>
        <H2>Recent Transactions</H2>
        <div className="space-y-md">
          <TransactionItem
            category="Groceries"
            categoryIcon="🛒"
            description="Mercado Central"
            amount={125.5}
            type="expense"
            status="completed"
            date="Today"
          />
          <TransactionItem
            category="Salary"
            categoryIcon="💰"
            description="Monthly salary"
            amount={5250.0}
            type="income"
            status="completed"
            date="Nov 1"
          />
          <TransactionItem
            category="Restaurant"
            categoryIcon="🍽️"
            description="Burger Place"
            amount={65.0}
            type="expense"
            status="pending"
            date="Yesterday"
          />
        </div>
      </Section>
    </Container>
  )
}
