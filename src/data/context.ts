import { createContext } from 'react'
import {
  accounts,
  budgets,
  investments,
  notifications,
  transactions,
  type Account,
  type AppNotification,
  type Budget,
  type Investment,
  type Transaction,
} from './mock'

export interface CardSettings {
  blocked: boolean
  online: boolean
  international: boolean
  contactless: boolean
}

export const defaultCardSettings: CardSettings = {
  blocked: false,
  online: true,
  international: false,
  contactless: true,
}

export interface FinanceContextValue {
  transactions: Transaction[]
  addTransaction: (tx: Omit<Transaction, 'id'>) => Transaction
  removeTransaction: (id: string) => void

  notifications: AppNotification[]
  unreadCount: number
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  removeNotification: (id: string) => void

  budgets: Budget[]
  updateBudgetLimit: (category: string, limit: number) => void

  investments: Investment[]
  addInvestment: (investment: Omit<Investment, 'id' | 'current' | 'monthlyGain'>) => void
  /** Apply (positive) or redeem (negative) money, moving it from/to the linked account */
  adjustInvestment: (id: string, delta: number) => void

  accounts: Account[]
  addAccount: (account: Pick<Account, 'bank' | 'kind'>) => void
  removeAccount: (id: string) => void
  refreshAccount: (id: string) => void

  paidBills: string[]
  /** Marks a bill as paid, debiting the amount from the chosen account */
  payBill: (id: string, accountId?: string, amount?: number) => void

  cardSettings: Record<string, CardSettings>
  updateCardSettings: (cardId: string, patch: Partial<CardSettings>) => void
}

const noop = () => {}

export const FinanceContext = createContext<FinanceContextValue>({
  transactions,
  addTransaction: (tx) => ({ id: 'tmp', ...tx }),
  removeTransaction: noop,
  notifications,
  unreadCount: notifications.filter((n) => !n.read).length,
  markNotificationRead: noop,
  markAllNotificationsRead: noop,
  removeNotification: noop,
  budgets,
  updateBudgetLimit: noop,
  investments,
  addInvestment: noop,
  adjustInvestment: noop,
  accounts,
  addAccount: noop,
  removeAccount: noop,
  refreshAccount: noop,
  paidBills: [],
  payBill: noop,
  cardSettings: {},
  updateCardSettings: noop,
})
