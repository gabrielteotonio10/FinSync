import { ReactNode } from 'react'
import {
  Banknote,
  Briefcase,
  Car,
  Clapperboard,
  CreditCard as CreditCardIcon,
  Fuel,
  GraduationCap,
  HeartPulse,
  Plane,
  Receipt,
  ShoppingBag,
  ShoppingCart,
  Tv,
  UtensilsCrossed,
  Zap,
} from 'lucide-react'
import type { CashFlowPoint } from '@/components/Finance/CashFlowChart'
import type { Screen } from '@/lib/navigation'

export const categoryIcons: Record<string, ReactNode> = {
  Groceries: <ShoppingCart />,
  Salary: <Banknote />,
  Freelance: <Briefcase />,
  Transport: <Car />,
  Fuel: <Fuel />,
  Restaurant: <UtensilsCrossed />,
  Dining: <UtensilsCrossed />,
  Entertainment: <Clapperboard />,
  Subscriptions: <Tv />,
  Utilities: <Zap />,
  CreditCard: <CreditCardIcon />,
  Shopping: <ShoppingBag />,
  Health: <HeartPulse />,
  Travel: <Plane />,
  Education: <GraduationCap />,
  Other: <Receipt />,
}

/** Categories offered when creating a transaction */
export const expenseCategories = [
  'Groceries',
  'Restaurant',
  'Transport',
  'Fuel',
  'Entertainment',
  'Subscriptions',
  'Utilities',
  'Shopping',
  'Health',
  'Travel',
  'Education',
  'Other',
]
export const incomeCategories = ['Salary', 'Freelance', 'Other']

export interface Transaction {
  id: string
  description: string
  category: string
  amount: number
  type: 'income' | 'expense'
  status: 'pending' | 'completed' | 'failed'
  date: string
  /** Bank account the money moved through */
  accountId?: string
  /** Credit card the purchase was charged to */
  cardId?: string
  time?: string
  note?: string
}

export const transactions: Transaction[] = [
  { id: 't1', description: 'Mercado Central', category: 'Groceries', amount: 125.5, type: 'expense', status: 'completed', date: 'Nov 5', cardId: 'c1', time: '18:42' },
  { id: 't2', description: 'Uber ride', category: 'Transport', amount: 45.0, type: 'expense', status: 'completed', date: 'Nov 4', cardId: 'c1', time: '08:15' },
  { id: 't3', description: 'Pizza Hut', category: 'Restaurant', amount: 85.0, type: 'expense', status: 'pending', date: 'Nov 3', cardId: 'c1', time: '21:03' },
  { id: 't4', description: 'Netflix subscription', category: 'Subscriptions', amount: 39.9, type: 'expense', status: 'completed', date: 'Nov 2', cardId: 'c2', time: '03:00' },
  { id: 't5', description: 'Monthly salary', category: 'Salary', amount: 5250.0, type: 'income', status: 'completed', date: 'Nov 1', accountId: 'a1', time: '06:30' },
  { id: 't6', description: 'Electricity bill', category: 'Utilities', amount: 182.4, type: 'expense', status: 'failed', date: 'Oct 31', accountId: 'a1', time: '10:12' },
  { id: 't7', description: 'Landing page project', category: 'Freelance', amount: 1200.0, type: 'income', status: 'pending', date: 'Oct 30', accountId: 'a2', time: '14:47' },
  { id: 't8', description: 'Shell station', category: 'Fuel', amount: 210.0, type: 'expense', status: 'completed', date: 'Oct 29', cardId: 'c2', time: '19:20' },
  { id: 't9', description: 'Cinema tickets', category: 'Entertainment', amount: 64.0, type: 'expense', status: 'completed', date: 'Oct 27', cardId: 'c1', time: '20:05' },
]

export interface Budget {
  category: string
  spent: number
  limit: number
}

export const budgets: Budget[] = [
  { category: 'Groceries', spent: 450, limit: 1000 },
  { category: 'Transport', spent: 380, limit: 500 },
  { category: 'Entertainment', spent: 820, limit: 1000 },
  { category: 'Dining', spent: 1250, limit: 1000 },
]

/** Transaction categories that count towards each budget */
export const budgetCategoryMap: Record<string, string[]> = {
  Groceries: ['Groceries'],
  Transport: ['Transport', 'Fuel'],
  Entertainment: ['Entertainment', 'Subscriptions'],
  Dining: ['Restaurant', 'Dining'],
}

/** Spending per budget over the last 6 months (oldest first, last = current) */
export const budgetHistory: Record<string, number[]> = {
  Groceries: [620, 710, 580, 690, 540, 450],
  Transport: [410, 450, 390, 520, 470, 380],
  Entertainment: [540, 610, 700, 820, 760, 820],
  Dining: [880, 940, 1020, 1100, 1180, 1250],
}

export const cashFlow: CashFlowPoint[] = [
  { month: 'Jun', income: 4800, expenses: 3120 },
  { month: 'Jul', income: 5100, expenses: 3480 },
  { month: 'Aug', income: 4950, expenses: 2890 },
  { month: 'Sep', income: 5600, expenses: 3950 },
  { month: 'Oct', income: 5250, expenses: 2260 },
  { month: 'Nov', income: 5250, expenses: 2180 },
]

export interface Account {
  id: string
  name: string
  bank: string
  last4: string
  kind: string
  balance: number
  updated: string
  agency: string
  number: string
  /** Yield on the idle balance, when the account pays one */
  yieldRate?: string
}

export const accounts: Account[] = [
  { id: 'a1', name: 'Checking Account', bank: 'Bradesco', last4: '1234', kind: 'Checking', balance: 8450.5, updated: '2 hours ago', agency: '0412', number: '00981234-5' },
  { id: 'a2', name: 'Savings Account', bank: 'Nubank', last4: '5678', kind: 'Savings', balance: 4000.0, updated: '5 hours ago', agency: '0001', number: '7745678-2', yieldRate: '100% CDI' },
  { id: 'a3', name: 'Brokerage Account', bank: 'XP Investimentos', last4: '9012', kind: 'Brokerage', balance: 320.0, updated: '1 day ago', agency: '0001', number: '3319012-0' },
]

/** Institutions offered in the "connect account" flow */
export const availableBanks = ['Itaú', 'Banco do Brasil', 'Caixa', 'Santander', 'Inter', 'C6 Bank', 'BTG Pactual', 'PicPay']

export interface CreditCardData {
  id: string
  name: string
  bank: string
  brand: 'Mastercard' | 'Visa'
  last4: string
  cardholderName: string
  currentInvoice: number
  limit: number
  closingDate: string
  dueDate: string
  bestPurchaseDay: string
  status: 'open' | 'closed' | 'overdue'
  expiryMonth: number
  expiryYear: number
  /** Bank account used for automatic invoice payment */
  accountId: string
}

export const creditCards: CreditCardData[] = [
  {
    id: 'c1',
    name: 'Nubank Ultravioleta',
    bank: 'Nubank',
    brand: 'Mastercard',
    last4: '4242',
    cardholderName: 'John Doe',
    currentInvoice: 1842.3,
    limit: 6000.0,
    closingDate: '25 Nov',
    dueDate: '02 Dez',
    bestPurchaseDay: '26 Nov',
    status: 'open',
    expiryMonth: 8,
    expiryYear: 2029,
    accountId: 'a2',
  },
  {
    id: 'c2',
    name: 'XP Visa Infinite',
    bank: 'XP Investimentos',
    brand: 'Visa',
    last4: '8831',
    cardholderName: 'John Doe',
    currentInvoice: 954.2,
    limit: 15000.0,
    closingDate: '03 Dez',
    dueDate: '10 Dez',
    bestPurchaseDay: '04 Dez',
    status: 'open',
    expiryMonth: 3,
    expiryYear: 2031,
    accountId: 'a1',
  },
]

export interface StatementItem {
  id: string
  cardId: string
  description: string
  category: string
  amount: number
  date: string
  /** e.g. "3/10" for the 3rd of 10 installments */
  installment?: string
}

/** Invoice items that are not already listed in `transactions` */
const extraStatementItems: StatementItem[] = [
  { id: 's1', cardId: 'c1', description: 'Amazon', category: 'Shopping', amount: 189.9, date: 'Nov 4', installment: '3/10' },
  { id: 's2', cardId: 'c1', description: 'iFood', category: 'Restaurant', amount: 312.4, date: 'Nov 2' },
  { id: 's3', cardId: 'c1', description: 'Zara', category: 'Shopping', amount: 459.0, date: 'Oct 31' },
  { id: 's4', cardId: 'c1', description: 'Drogasil', category: 'Health', amount: 86.7, date: 'Oct 30' },
  { id: 's5', cardId: 'c1', description: 'Spotify', category: 'Subscriptions', amount: 21.9, date: 'Oct 28' },
  { id: 's6', cardId: 'c1', description: 'Posto Ipiranga', category: 'Fuel', amount: 230.0, date: 'Oct 28' },
  { id: 's7', cardId: 'c1', description: 'Airbnb', category: 'Travel', amount: 222.9, date: 'Oct 26', installment: '2/4' },
  { id: 's8', cardId: 'c2', description: 'Livraria Cultura', category: 'Education', amount: 148.3, date: 'Nov 3' },
  { id: 's9', cardId: 'c2', description: 'LATAM Airlines', category: 'Travel', amount: 412.0, date: 'Nov 1', installment: '1/6' },
  { id: 's10', cardId: 'c2', description: 'Starbucks', category: 'Restaurant', amount: 44.0, date: 'Oct 30' },
  { id: 's11', cardId: 'c2', description: 'Apple iCloud', category: 'Subscriptions', amount: 14.9, date: 'Oct 29' },
  { id: 's12', cardId: 'c2', description: 'Uber Eats', category: 'Restaurant', amount: 85.1, date: 'Oct 27' },
]

/** Current invoice items for a card: its transactions first, then the remaining purchases */
export function statementFor(cardId: string, txs: Transaction[] = transactions): StatementItem[] {
  const fromTransactions = txs
    .filter((tx) => tx.cardId === cardId && tx.type === 'expense')
    .map(({ id, description, category, amount, date }) => ({ id, cardId, description, category, amount, date }))
  return [...fromTransactions, ...extraStatementItems.filter((i) => i.cardId === cardId)]
}

export interface UpcomingBill {
  id: string
  title: string
  category: string
  amount: number
  dueDate: string
  daysUntilDue: number
  status: 'pending' | 'urgent'
  /** Credit card id when the bill is a card invoice */
  cardId?: string
}

export const upcomingBills: UpcomingBill[] = [
  {
    id: 'b1',
    title: 'Fatura Nubank Mastercard',
    category: 'CreditCard',
    amount: 1842.3,
    dueDate: '02 Dez',
    daysUntilDue: 2,
    status: 'urgent',
    cardId: 'c1',
  },
  {
    id: 'b2',
    title: 'Conta de Luz (Enel)',
    category: 'Utilities',
    amount: 182.4,
    dueDate: '05 Dez',
    daysUntilDue: 5,
    status: 'pending',
  },
  {
    id: 'b3',
    title: 'Assinatura Netflix',
    category: 'Subscriptions',
    amount: 39.9,
    dueDate: '08 Dez',
    daysUntilDue: 8,
    status: 'pending',
  },
  {
    id: 'b4',
    title: 'Fatura XP Visa Infinite',
    category: 'CreditCard',
    amount: 954.2,
    dueDate: '10 Dez',
    daysUntilDue: 10,
    status: 'pending',
    cardId: 'c2',
  },
]

export type InvestmentCategory = 'Renda Fixa' | 'Renda Variável' | 'Fundos'

export interface Investment {
  id: string
  accountId: string
  name: string
  category: InvestmentCategory
  /** Amount originally applied */
  applied: number
  /** Current market value */
  current: number
  /** Gain/loss in the current month, in R$ */
  monthlyGain: number
  /** Contracted yield, e.g. "100% CDI" */
  rate?: string
  liquidity?: 'daily' | 'd2' | 'd30' | 'maturity'
  maturity?: string
  risk?: 'low' | 'medium' | 'high'
}

export const investmentCategories: InvestmentCategory[] = ['Renda Fixa', 'Renda Variável', 'Fundos']

export const investments: Investment[] = [
  { id: 'i1', accountId: 'a2', name: 'Caixinha — CDB 100% CDI', category: 'Renda Fixa', applied: 6000, current: 6412.35, monthlyGain: 58.9, rate: '100% CDI', liquidity: 'daily', risk: 'low' },
  { id: 'i2', accountId: 'a1', name: 'Tesouro Selic 2029', category: 'Renda Fixa', applied: 9000, current: 9684.2, monthlyGain: 91.4, rate: 'Selic + 0,07%', liquidity: 'daily', maturity: '01/03/2029', risk: 'low' },
  { id: 'i3', accountId: 'a1', name: 'Fundo DI Bradesco Premium', category: 'Fundos', applied: 3000, current: 3128.6, monthlyGain: 24.15, rate: '98% CDI', liquidity: 'd2', risk: 'low' },
  { id: 'i4', accountId: 'a3', name: 'Ações — ITUB4 / WEGE3', category: 'Renda Variável', applied: 4500, current: 4873.1, monthlyGain: -62.4, liquidity: 'd2', risk: 'high' },
  { id: 'i5', accountId: 'a3', name: 'FIIs — HGLG11 / MXRF11', category: 'Renda Variável', applied: 3500, current: 3689.75, monthlyGain: 41.3, liquidity: 'd2', risk: 'medium' },
  { id: 'i6', accountId: 'a3', name: 'Fundo Multimercado XP', category: 'Fundos', applied: 2000, current: 2056.4, monthlyGain: -8.2, rate: 'CDI + 2% a.a.', liquidity: 'd30', risk: 'medium' },
]

/**
 * Deterministic 6-month value history (oldest first) ending at the current value.
 * Fixed income grows smoothly; funds and variable income wobble.
 */
export function investmentHistory(investment: Investment): number[] {
  const points = 6
  const wobble =
    investment.category === 'Renda Variável' ? 0.035 : investment.category === 'Fundos' ? 0.01 : 0
  const seed = Number(investment.id.replace(/\D/g, '')) || 1
  return Array.from({ length: points }, (_, i) => {
    const base = investment.applied + (investment.current - investment.applied) * (i / (points - 1))
    const noise = i === points - 1 ? 0 : Math.sin((i + 1) * seed * 1.7) * wobble * investment.applied
    return Math.round((base + noise) * 100) / 100
  })
}

export const investedByAccount = (accountId: string, list: Investment[] = investments) =>
  list.filter((i) => i.accountId === accountId).reduce((sum, i) => sum + i.current, 0)

export type NotificationKind = 'bill' | 'budget' | 'investment' | 'security' | 'transaction' | 'ai'

export interface AppNotification {
  id: string
  kind: NotificationKind
  /** Relative day bucket used for grouping */
  day: 'today' | 'yesterday' | 'earlier'
  /** Time of day for recent items, short date for older ones */
  time: string
  read: boolean
  /** Where the notification leads when opened */
  target?: { screen: Screen; id?: string }
}

/** Notification copy lives in i18n (`t.notifications.items[id]`) */
export const notifications: AppNotification[] = [
  { id: 'n1', kind: 'bill', day: 'today', time: '09:12', read: false, target: { screen: 'card-detail', id: 'c1' } },
  { id: 'n2', kind: 'budget', day: 'today', time: '08:40', read: false, target: { screen: 'budgets' } },
  { id: 'n3', kind: 'transaction', day: 'today', time: '06:31', read: false, target: { screen: 'account-detail', id: 'a1' } },
  { id: 'n4', kind: 'investment', day: 'yesterday', time: '18:05', read: true, target: { screen: 'investment-detail', id: 'i2' } },
  { id: 'n5', kind: 'security', day: 'yesterday', time: '11:22', read: true, target: { screen: 'settings' } },
  { id: 'n6', kind: 'ai', day: 'earlier', time: 'Oct 29', read: true, target: { screen: 'ai-assistant' } },
  { id: 'n7', kind: 'bill', day: 'earlier', time: 'Oct 28', read: true, target: { screen: 'bills' } },
  { id: 'n8', kind: 'transaction', day: 'earlier', time: 'Oct 27', read: true, target: { screen: 'transactions' } },
]

export const user = { name: 'John Doe', email: 'john@example.com', initials: 'JD' }
