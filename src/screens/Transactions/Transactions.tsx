import { useMemo, useState } from 'react'
import {
  Button,
  Card,
  CardHeader,
  Container,
  Grid,
  Input,
  PageHeader,
  Select,
  StatCard,
  TransactionItem,
} from '@/components'
import { categoryIcons, transactions } from '@/data/mock'
import { Clock, Download, Inbox, Plus, Search, TrendingDown, TrendingUp } from 'lucide-react'

const categories = Array.from(new Set(transactions.map((t) => t.category))).sort()

export function TransactionsScreen() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')

  const filtered = useMemo(
    () =>
      transactions.filter(
        (t) =>
          (category === 'all' || t.category === category) &&
          (status === 'all' || t.status === status) &&
          `${t.description} ${t.category}`.toLowerCase().includes(query.trim().toLowerCase())
      ),
    [query, category, status]
  )

  const income = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expenses = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const pending = transactions.filter((t) => t.status === 'pending').reduce((s, t) => s + t.amount, 0)

  const hasFilters = query !== '' || category !== 'all' || status !== 'all'

  return (
    <Container className="space-y-xl">
      <PageHeader
        title="Transactions"
        description="View and manage all your financial transactions."
        actions={
          <>
            <Button variant="secondary">
              <Download />
              Export
            </Button>
            <Button>
              <Plus />
              Add transaction
            </Button>
          </>
        }
      />

      <Grid cols={3}>
        <StatCard label="Income" value={income} icon={<TrendingUp />} hint="Last 30 days" />
        <StatCard label="Expenses" value={expenses} icon={<TrendingDown />} hint="Last 30 days" />
        <StatCard label="Pending" value={pending} icon={<Clock />} hint="Awaiting confirmation" />
      </Grid>

      <Card>
        {/* Toolbar */}
        <CardHeader className="flex-col gap-sm sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
            <Input
              placeholder="Search transactions..."
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search transactions"
            />
          </div>
          <div className="flex gap-sm">
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label="Filter by category"
              className="w-full sm:w-44"
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </Select>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-label="Filter by status"
              className="w-full sm:w-36"
            >
              <option value="all">All statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </Select>
          </div>
        </CardHeader>

        {/* List */}
        {filtered.length > 0 ? (
          <div className="divide-y divide-border">
            {filtered.map((t) => (
              <TransactionItem key={t.id} categoryIcon={categoryIcons[t.category]} {...t} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-sm px-lg py-3xl text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-surface-muted text-muted">
              <Inbox className="size-5" />
            </div>
            <p className="text-sm font-medium">No transactions found</p>
            <p className="text-sm text-muted">Try a different search or filter.</p>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border px-lg py-md text-sm text-muted">
          <span>
            Showing {filtered.length} of {transactions.length} transactions
          </span>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setQuery('')
                setCategory('all')
                setStatus('all')
              }}
            >
              Clear filters
            </Button>
          )}
        </div>
      </Card>
    </Container>
  )
}
