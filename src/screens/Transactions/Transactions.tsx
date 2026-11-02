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
  SyncMascot,
  TransactionItem,
} from '@/components'
import { categoryIcons, type Transaction } from '@/data/mock'
import { useFinance } from '@/hooks/useFinance'
import { useToast } from '@/hooks/useToast'
import { HTML_LANG_MAP, useLanguage } from '@/i18n'
import { Clock, Download, Plus, Search, TrendingDown, TrendingUp } from 'lucide-react'

interface TransactionsScreenProps {
  onOpenTransaction?: (tx: Transaction) => void
  onNewTransaction?: () => void
}

/** Quotes a CSV cell when needed */
const csvCell = (value: string | number) => {
  const text = String(value)
  return /[";\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text
}

export function TransactionsScreen({ onOpenTransaction, onNewTransaction }: TransactionsScreenProps = {}) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [status, setStatus] = useState('all')
  const { language, t } = useLanguage()
  const { transactions } = useFinance()
  const { toast } = useToast()

  const sortedCategories = useMemo(
    () =>
      Array.from(new Set(transactions.map((tx) => tx.category))).sort((a, b) =>
        (t.categories[a] ?? a).localeCompare(t.categories[b] ?? b, HTML_LANG_MAP[language])
      ),
    [transactions, language, t]
  )

  const filtered = useMemo(
    () =>
      transactions.filter((tx) => {
        const localizedDesc = t.transactionDescriptions[tx.id] ?? tx.description
        const localizedCat = t.categories[tx.category] ?? tx.category
        return (
          (category === 'all' || tx.category === category) &&
          (status === 'all' || tx.status === status) &&
          `${tx.description} ${localizedDesc} ${tx.category} ${localizedCat}`
            .toLowerCase()
            .includes(query.trim().toLowerCase())
        )
      }),
    [transactions, query, category, status, t]
  )

  // Exports the currently filtered list as a semicolon-separated CSV (Excel pt-BR friendly)
  const exportCsv = () => {
    if (filtered.length === 0) {
      toast({ title: t.transactionsExtra.exportEmpty, variant: 'error' })
      return
    }
    const header = t.transactionsExtra.csvHeader
    const rows = filtered.map((tx) =>
      [
        t.formatShortDate(tx.date),
        t.transactionDescriptions[tx.id] ?? tx.description,
        t.categories[tx.category] ?? tx.category,
        tx.type === 'income' ? t.finance.income : t.finance.expenses,
        t.statuses[tx.status],
        (tx.type === 'income' ? tx.amount : -tx.amount).toFixed(2).replace('.', ','),
      ]
        .map(csvCell)
        .join(';')
    )
    // BOM so Excel detects UTF-8
    const blob = new Blob(['﻿' + [header.join(';'), ...rows].join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'finsync-transacoes.csv'
    link.click()
    URL.revokeObjectURL(url)
    toast({ title: t.transactionsExtra.exported, description: t.transactionsExtra.exportedCount(filtered.length) })
  }

  const income = transactions.filter((tx) => tx.type === 'income').reduce((s, tx) => s + tx.amount, 0)
  const expenses = transactions.filter((tx) => tx.type === 'expense').reduce((s, tx) => s + tx.amount, 0)
  const pending = transactions.filter((tx) => tx.status === 'pending').reduce((s, tx) => s + tx.amount, 0)

  const hasFilters = query !== '' || category !== 'all' || status !== 'all'

  return (
    <Container className="space-y-xl">
      <PageHeader
        title={t.transactions.title}
        description={t.transactions.description}
        actions={
          <>
            <Button variant="secondary" onClick={exportCsv}>
              <Download />
              {t.transactions.export}
            </Button>
            <Button onClick={onNewTransaction}>
              <Plus />
              {t.transactions.addTransaction}
            </Button>
          </>
        }
      />

      <Grid cols={3}>
        <StatCard label={t.transactions.income} value={income} icon={<TrendingUp />} hint={t.transactions.last30Days} />
        <StatCard label={t.transactions.expenses} value={expenses} icon={<TrendingDown />} hint={t.transactions.last30Days} />
        <StatCard label={t.transactions.pending} value={pending} icon={<Clock />} hint={t.transactions.awaitingConfirmation} />
      </Grid>

      <Card>
        {/* Toolbar */}
        <CardHeader className="flex-col gap-sm sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
            <Input
              placeholder={t.transactions.searchPlaceholder}
              className="pl-9"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={t.transactions.searchAria}
            />
          </div>
          <div className="flex gap-sm">
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              aria-label={t.transactions.filterByCategoryAria}
              className="w-full sm:w-44"
            >
              <option value="all">{t.transactions.allCategories}</option>
              {sortedCategories.map((c) => (
                <option key={c} value={c}>
                  {t.categories[c] ?? c}
                </option>
              ))}
            </Select>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-label={t.transactions.filterByStatusAria}
              className="w-full sm:w-36"
            >
              <option value="all">{t.transactions.allStatuses}</option>
              <option value="completed">{t.statuses.completed}</option>
              <option value="pending">{t.statuses.pending}</option>
              <option value="failed">{t.statuses.failed}</option>
            </Select>
          </div>
        </CardHeader>

        {/* List */}
        {filtered.length > 0 ? (
          <div className="divide-y divide-border">
            {filtered.map((tx) => (
              <TransactionItem
                key={tx.id}
                categoryIcon={categoryIcons[tx.category]}
                {...tx}
                onClick={onOpenTransaction ? () => onOpenTransaction(tx) : undefined}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-sm px-lg py-2xl text-center">
            <SyncMascot pose="wave" size="sm" floating sparkles={false} />
            <p className="mt-xs text-sm font-medium">{t.transactions.noTransactionsFound}</p>
            <p className="text-sm text-muted">{t.transactions.tryDifferentSearch}</p>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border px-lg py-md text-sm text-muted">
          <span>
            {t.transactions.showingCount(filtered.length, transactions.length)}
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
              {t.transactions.clearFilters}
            </Button>
          )}
        </div>
      </Card>
    </Container>
  )
}
