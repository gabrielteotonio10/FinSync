import { ReactNode } from 'react'
import {
  Banknote,
  Briefcase,
  Car,
  Clapperboard,
  Fuel,
  ShoppingCart,
  Tv,
  UtensilsCrossed,
  Zap,
} from 'lucide-react'
import type { CashFlowPoint } from '@/components/Finance/CashFlowChart'

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
}

export interface Transaction {
  id: string
  description: string
  category: string
  amount: number
  type: 'income' | 'expense'
  status: 'pending' | 'completed' | 'failed'
  date: string
}

export const transactions: Transaction[] = [
  { id: 't1', description: 'Mercado Central', category: 'Groceries', amount: 125.5, type: 'expense', status: 'completed', date: 'Nov 5' },
  { id: 't2', description: 'Uber ride', category: 'Transport', amount: 45.0, type: 'expense', status: 'completed', date: 'Nov 4' },
  { id: 't3', description: 'Pizza Hut', category: 'Restaurant', amount: 85.0, type: 'expense', status: 'pending', date: 'Nov 3' },
  { id: 't4', description: 'Netflix subscription', category: 'Subscriptions', amount: 39.9, type: 'expense', status: 'completed', date: 'Nov 2' },
  { id: 't5', description: 'Monthly salary', category: 'Salary', amount: 5250.0, type: 'income', status: 'completed', date: 'Nov 1' },
  { id: 't6', description: 'Electricity bill', category: 'Utilities', amount: 182.4, type: 'expense', status: 'failed', date: 'Oct 31' },
  { id: 't7', description: 'Landing page project', category: 'Freelance', amount: 1200.0, type: 'income', status: 'pending', date: 'Oct 30' },
  { id: 't8', description: 'Shell station', category: 'Fuel', amount: 210.0, type: 'expense', status: 'completed', date: 'Oct 29' },
  { id: 't9', description: 'Cinema tickets', category: 'Entertainment', amount: 64.0, type: 'expense', status: 'completed', date: 'Oct 27' },
]

export const budgets = [
  { category: 'Groceries', spent: 450, limit: 1000 },
  { category: 'Transport', spent: 380, limit: 500 },
  { category: 'Entertainment', spent: 820, limit: 1000 },
  { category: 'Dining', spent: 1250, limit: 1000 },
]

export const cashFlow: CashFlowPoint[] = [
  { month: 'Jun', income: 4800, expenses: 3120 },
  { month: 'Jul', income: 5100, expenses: 3480 },
  { month: 'Aug', income: 4950, expenses: 2890 },
  { month: 'Sep', income: 5600, expenses: 3950 },
  { month: 'Oct', income: 5250, expenses: 2260 },
  { month: 'Nov', income: 5250, expenses: 2180 },
]

export const accounts = [
  { id: 'a1', name: 'Checking Account', bank: 'Bradesco', last4: '1234', kind: 'Checking', balance: 8450.5, updated: '2 hours ago' },
  { id: 'a2', name: 'Savings Account', bank: 'Nubank', last4: '5678', kind: 'Savings', balance: 4000.0, updated: '5 hours ago' },
]

export const user = { name: 'John Doe', email: 'john@example.com', initials: 'JD' }
