import { ReactNode, useCallback, useMemo, useRef, useState } from 'react'
import { FinanceContext, defaultCardSettings, type CardSettings, type FinanceContextValue } from './context'
import {
  accounts as initialAccounts,
  budgetCategoryMap,
  budgets as initialBudgets,
  investments as initialInvestments,
  notifications as initialNotifications,
  transactions as initialTransactions,
  type Account,
  type Budget,
  type Investment,
  type Transaction,
} from './mock'

/**
 * In-memory app state seeded from the mock data, so actions taken in the UI
 * (new transaction, paying a bill, reading a notification...) are reflected everywhere.
 */
export function FinanceProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets)
  const [investments, setInvestments] = useState<Investment[]>(initialInvestments)
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts)
  const [paidBills, setPaidBills] = useState<string[]>([])
  const [cardSettings, setCardSettings] = useState<Record<string, CardSettings>>({})
  const nextId = useRef(1)

  const createId = useCallback((prefix: string) => `${prefix}-new-${nextId.current++}`, [])

  /** Completed account transactions move the account balance (direction: 1 = apply, -1 = revert) */
  const applyToBalance = useCallback((tx: Transaction, direction: 1 | -1) => {
    if (!tx.accountId || tx.status !== 'completed') return
    const delta = (tx.type === 'income' ? tx.amount : -tx.amount) * direction
    setAccounts((current) => current.map((a) => (a.id === tx.accountId ? { ...a, balance: a.balance + delta } : a)))
  }, [])

  const addTransaction = useCallback(
    (tx: Omit<Transaction, 'id'>) => {
      const created = { id: createId('t'), ...tx }
      setTransactions((current) => [created, ...current])
      applyToBalance(created, 1)
      if (tx.type === 'expense') {
        setBudgets((current) =>
          current.map((b) =>
            budgetCategoryMap[b.category]?.includes(tx.category) ? { ...b, spent: b.spent + tx.amount } : b
          )
        )
      }
      return created
    },
    [createId, applyToBalance]
  )

  const removeTransaction = useCallback(
    (id: string) => {
      const target = transactions.find((tx) => tx.id === id)
      if (target) applyToBalance(target, -1)
      setTransactions((current) => current.filter((tx) => tx.id !== id))
    },
    [transactions, applyToBalance]
  )

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((current) => current.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }, [])

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((current) => current.map((n) => ({ ...n, read: true })))
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications((current) => current.filter((n) => n.id !== id))
  }, [])

  const updateBudgetLimit = useCallback((category: string, limit: number) => {
    setBudgets((current) => current.map((b) => (b.category === category ? { ...b, limit } : b)))
  }, [])

  const addInvestment = useCallback(
    (investment: Omit<Investment, 'id' | 'current' | 'monthlyGain'>) => {
      setInvestments((current) => [
        ...current,
        { id: createId('i'), current: investment.applied, monthlyGain: 0, ...investment },
      ])
      // The money leaves the account balance
      setAccounts((current) =>
        current.map((a) =>
          a.id === investment.accountId ? { ...a, balance: Math.max(0, a.balance - investment.applied) } : a
        )
      )
    },
    [createId]
  )

  const adjustInvestment = useCallback(
    (id: string, delta: number) => {
      const target = investments.find((i) => i.id === id)
      if (!target) return
      setInvestments((current) =>
        current.map((i) =>
          i.id === id
            ? {
                ...i,
                current: Math.max(0, i.current + delta),
                // Redemptions reduce the applied principal proportionally
                applied: delta >= 0 ? i.applied + delta : Math.max(0, i.applied * (1 + delta / i.current)),
              }
            : i
        )
      )
      setAccounts((current) =>
        current.map((a) => (a.id === target.accountId ? { ...a, balance: Math.max(0, a.balance - delta) } : a))
      )
    },
    [investments]
  )

  const addAccount = useCallback(
    ({ bank, kind }: Pick<Account, 'bank' | 'kind'>) => {
      const last4 = String(1000 + Math.floor(Math.random() * 9000))
      setAccounts((current) => [
        ...current,
        {
          id: createId('a'),
          name: kind === 'Savings' ? 'Savings Account' : kind === 'Brokerage' ? 'Brokerage Account' : 'Checking Account',
          bank,
          kind,
          last4,
          balance: 0,
          updated: 'just now',
          agency: '0001',
          number: `${last4}${last4}-0`,
        },
      ])
    },
    [createId]
  )

  const removeAccount = useCallback((id: string) => {
    setAccounts((current) => current.filter((a) => a.id !== id))
  }, [])

  const refreshAccount = useCallback((id: string) => {
    setAccounts((current) => current.map((a) => (a.id === id ? { ...a, updated: 'just now' } : a)))
  }, [])

  const payBill = useCallback((id: string, accountId?: string, amount = 0) => {
    setPaidBills((current) => (current.includes(id) ? current : [...current, id]))
    if (accountId) {
      setAccounts((current) => current.map((a) => (a.id === accountId ? { ...a, balance: a.balance - amount } : a)))
    }
  }, [])

  const updateCardSettings = useCallback((cardId: string, patch: Partial<CardSettings>) => {
    setCardSettings((current) => ({
      ...current,
      [cardId]: { ...defaultCardSettings, ...current[cardId], ...patch },
    }))
  }, [])

  const value = useMemo<FinanceContextValue>(
    () => ({
      transactions,
      addTransaction,
      removeTransaction,
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
      markNotificationRead,
      markAllNotificationsRead,
      removeNotification,
      budgets,
      updateBudgetLimit,
      investments,
      addInvestment,
      adjustInvestment,
      accounts,
      addAccount,
      removeAccount,
      refreshAccount,
      paidBills,
      payBill,
      cardSettings,
      updateCardSettings,
    }),
    [
      transactions,
      addTransaction,
      removeTransaction,
      notifications,
      markNotificationRead,
      markAllNotificationsRead,
      removeNotification,
      budgets,
      updateBudgetLimit,
      investments,
      addInvestment,
      adjustInvestment,
      accounts,
      addAccount,
      removeAccount,
      refreshAccount,
      paidBills,
      payBill,
      cardSettings,
      updateCardSettings,
    ]
  )

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>
}
