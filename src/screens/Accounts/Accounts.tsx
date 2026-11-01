import {
  Badge,
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
  Container,
  CreditCard,
  Grid,
  MonetaryValue,
  PageHeader,
  Section,
  SectionHeader,
} from '@/components'
import { accounts, user } from '@/data/mock'
import { cn, formatCurrency } from '@/lib/utils'
import { Landmark, MoreHorizontal, Plus, RefreshCw } from 'lucide-react'

const accountColors = ['bg-chart-1', 'bg-chart-2']

export function AccountsScreen() {
  const total = accounts.reduce((sum, a) => sum + a.balance, 0)
  const cardLimit = 6000
  const cardUsed = 1842.3

  return (
    <Container className="space-y-xl">
      <PageHeader
        title="Accounts"
        description="Manage your bank accounts and digital wallets."
        actions={
          <Button>
            <Plus />
            Add account
          </Button>
        }
      />

      {/* Summary */}
      <Card>
        <CardContent className="space-y-lg">
          <div className="flex flex-col gap-sm sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted">Total balance across all accounts</p>
              <MonetaryValue value={total} hideable className="text-3xl" />
            </div>
            <p className="text-xs text-muted">
              {accounts.length} accounts · updated 2 hours ago
            </p>
          </div>

          {/* Distribution (part-to-whole) */}
          <div className="space-y-sm">
            <div className="flex h-2.5 w-full gap-[2px] overflow-hidden rounded-full" aria-hidden="true">
              {accounts.map((a, i) => (
                <div
                  key={a.id}
                  className={cn('h-full first:rounded-l-full last:rounded-r-full', accountColors[i])}
                  style={{ width: `${(a.balance / total) * 100}%` }}
                />
              ))}
            </div>
            <ul className="flex flex-wrap gap-x-lg gap-y-xs text-sm">
              {accounts.map((a, i) => (
                <li key={a.id} className="flex items-center gap-1.5">
                  <span className={cn('size-2.5 rounded-[3px]', accountColors[i])} />
                  <span className="text-muted">{a.bank}</span>
                  <span className="font-medium tabular-nums">
                    {((a.balance / total) * 100).toFixed(0)}%
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Accounts Grid */}
      <Section>
        <SectionHeader title="Bank accounts" />
        <Grid cols={3}>
          {accounts.map((a) => (
            <Card key={a.id} className="transition-shadow hover:shadow-md">
              <CardContent className="space-y-lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-sm">
                    <div className="flex size-10 items-center justify-center rounded-sm bg-primary-soft text-primary-soft-foreground">
                      <Landmark className="size-5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{a.name}</p>
                      <p className="text-xs text-muted">
                        {a.bank} ·· {a.last4}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="-mr-2 -mt-1 size-8" aria-label={`${a.name} options`}>
                    <MoreHorizontal />
                  </Button>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted">Available balance</p>
                  <MonetaryValue value={a.balance} className="text-2xl" />
                </div>
              </CardContent>
              <CardFooter className="justify-between text-xs text-muted">
                <span className="inline-flex items-center gap-1">
                  <RefreshCw className="size-3" />
                  Updated {a.updated}
                </span>
                <Badge>{a.kind}</Badge>
              </CardFooter>
            </Card>
          ))}

          <button className="flex min-h-48 flex-col items-center justify-center gap-sm rounded-lg border-2 border-dashed border-border text-muted transition-colors hover:border-primary/40 hover:bg-primary-soft/40 hover:text-primary-soft-foreground">
            <div className="flex size-10 items-center justify-center rounded-full bg-surface-muted">
              <Plus className="size-5" />
            </div>
            <span className="text-sm font-medium">Connect a new account</span>
          </button>
        </Grid>
      </Section>

      {/* Cards */}
      <Section>
        <SectionHeader title="Credit cards" />
        <Card>
          <div className="grid gap-lg p-lg md:grid-cols-[minmax(0,22rem)_1fr] md:items-center">
            <CreditCard
              cardholderName={user.name}
              cardNumber="4242"
              expiryMonth={8}
              expiryYear={2029}
              cardIssuer="Mastercard"
              balance={cardUsed}
            />
            <div className="space-y-lg">
              <CardHeader className="border-b-0 p-0">
                <CardTitle>Nubank Mastercard</CardTitle>
                <CardDescription>Statement closes on Nov 25 · due Dec 2</CardDescription>
              </CardHeader>
              <div className="space-y-sm">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Used</span>
                  <span className="font-medium tabular-nums">
                    {formatCurrency(cardUsed)} <span className="text-muted">/ {formatCurrency(cardLimit)}</span>
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${(cardUsed / cardLimit) * 100}%` }} />
                </div>
                <p className="text-xs text-muted">{formatCurrency(cardLimit - cardUsed)} available</p>
              </div>
              <div className="flex gap-sm">
                <Button variant="secondary" size="sm">View statement</Button>
                <Button variant="ghost" size="sm">Manage card</Button>
              </div>
            </div>
          </div>
        </Card>
      </Section>
    </Container>
  )
}
