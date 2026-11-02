import { ReactNode, useId, useMemo, useRef, useState } from 'react'
import { ArrowLeftRight, CreditCard, Landmark, LayoutGrid, Search, TrendingUp } from 'lucide-react'
import { Input } from '../Input/Input'
import { creditCards, type Transaction } from '@/data/mock'
import { useFinance } from '@/hooks/useFinance'
import { useLanguage } from '@/i18n'
import type { NavigateFn, Screen } from '@/lib/navigation'
import { cn, formatCurrency } from '@/lib/utils'

interface GlobalSearchProps {
  onNavigate: NavigateFn
  onOpenTransaction: (tx: Transaction) => void
}

interface Result {
  key: string
  group: string
  icon: ReactNode
  label: string
  meta?: string
  run: () => void
}

const MAX_PER_GROUP = 4

/** Header search across pages, transactions, accounts, cards and investments (combobox pattern) */
export function GlobalSearch({ onNavigate, onOpenTransaction }: GlobalSearchProps) {
  const { t } = useLanguage()
  const { transactions, accounts, investments } = useFinance()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listId = useId()
  const copy = t.search

  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    const match = (...values: (string | undefined)[]) => values.some((v) => v?.toLowerCase().includes(q))

    const pages: { screen: Screen; label: string }[] = [
      { screen: 'dashboard', label: t.nav.dashboard },
      { screen: 'accounts', label: t.nav.accounts },
      { screen: 'investments', label: t.nav.investments },
      { screen: 'transactions', label: t.nav.transactions },
      { screen: 'budgets', label: t.budgets.title },
      { screen: 'bills', label: t.bills.title },
      { screen: 'notifications', label: t.notifications.title },
      { screen: 'ai-assistant', label: t.nav.aiAssistant },
      { screen: 'settings', label: t.nav.settings },
    ]

    const pageResults = pages
      .filter((p) => match(p.label))
      .map<Result>((p) => ({
        key: `page-${p.screen}`,
        group: copy.groups.pages,
        icon: <LayoutGrid />,
        label: p.label,
        run: () => onNavigate(p.screen),
      }))

    const txResults = transactions
      .filter((tx) => match(tx.description, t.transactionDescriptions[tx.id], t.categories[tx.category]))
      .slice(0, MAX_PER_GROUP)
      .map<Result>((tx) => ({
        key: `tx-${tx.id}`,
        group: copy.groups.transactions,
        icon: <ArrowLeftRight />,
        label: t.transactionDescriptions[tx.id] ?? tx.description,
        meta: `${tx.type === 'income' ? '+' : '−'}${formatCurrency(tx.amount)}`,
        run: () => onOpenTransaction(tx),
      }))

    const accountResults = accounts
      .filter((a) => match(a.bank, t.accountNames[a.name] ?? a.name))
      .slice(0, MAX_PER_GROUP)
      .map<Result>((a) => ({
        key: `acc-${a.id}`,
        group: copy.groups.accounts,
        icon: <Landmark />,
        label: `${a.bank} · ${t.accountNames[a.name] ?? a.name}`,
        meta: formatCurrency(a.balance),
        run: () => onNavigate('account-detail', a.id),
      }))

    const cardResults = creditCards
      .filter((c) => match(c.name, c.bank, c.brand))
      .map<Result>((c) => ({
        key: `card-${c.id}`,
        group: copy.groups.cards,
        icon: <CreditCard />,
        label: `${c.name} ·· ${c.last4}`,
        meta: formatCurrency(c.currentInvoice),
        run: () => onNavigate('card-detail', c.id),
      }))

    const investmentResults = investments
      .filter((i) => match(i.name, t.investmentCategories[i.category]))
      .slice(0, MAX_PER_GROUP)
      .map<Result>((i) => ({
        key: `inv-${i.id}`,
        group: copy.groups.investments,
        icon: <TrendingUp />,
        label: i.name,
        meta: formatCurrency(i.current),
        run: () => onNavigate('investment-detail', i.id),
      }))

    return [...pageResults, ...txResults, ...accountResults, ...cardResults, ...investmentResults]
  }, [query, t, copy, transactions, accounts, investments, onNavigate, onOpenTransaction])

  const choose = (result: Result) => {
    result.run()
    setQuery('')
    setOpen(false)
    inputRef.current?.blur()
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault()
      choose(results[active])
    } else if (e.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
    }
  }

  const showList = open && query.trim().length > 0

  return (
    <div className="relative hidden w-full max-w-(--container-xs) md:block">
      <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
      <Input
        ref={inputRef}
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={showList && results[active] ? `${listId}-${results[active].key}` : undefined}
        placeholder={t.header.searchPlaceholder}
        className="bg-surface-muted/60 pl-9 shadow-none"
        aria-label={t.header.searchAria}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setActive(0)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        // Delay so clicks on results register before the list closes
        onBlur={() => window.setTimeout(() => setOpen(false), 120)}
        onKeyDown={onKeyDown}
      />
      {showList && (
        <div
          id={listId}
          role="listbox"
          aria-label={copy.resultsAria}
          className="absolute left-0 right-0 top-full z-50 mt-1.5 max-h-96 overflow-y-auto rounded-md border border-border bg-surface p-1 shadow-lg"
        >
          {results.length === 0 ? (
            <p className="px-sm py-lg text-center text-sm text-muted">{copy.noResults(query.trim())}</p>
          ) : (
            results.map((r, i) => (
              <div key={r.key}>
                {(i === 0 || results[i - 1].group !== r.group) && (
                  <p className="px-sm pb-1 pt-sm text-[11px] font-semibold uppercase tracking-wide text-subtle">{r.group}</p>
                )}
                <div
                  id={`${listId}-${r.key}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(r)}
                  onMouseEnter={() => setActive(i)}
                  className={cn(
                    'flex cursor-pointer items-center gap-sm rounded-sm px-sm py-1.5 text-sm [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-subtle',
                    i === active && 'bg-surface-muted'
                  )}
                >
                  {r.icon}
                  <span className="min-w-0 flex-1 truncate">{r.label}</span>
                  {r.meta && <span className="shrink-0 text-xs tabular-nums text-muted">{r.meta}</span>}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
