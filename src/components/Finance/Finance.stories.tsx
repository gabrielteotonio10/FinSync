import type { Meta, StoryObj } from '@storybook/react'
import { MonetaryValue } from './MonetaryValue'
import { TransactionItem } from './TransactionItem'
import { CreditCard } from './CreditCard'
import { BudgetCard } from './BudgetCard'

// MonetaryValue Stories
const monetaryMeta: Meta<typeof MonetaryValue> = {
  title: 'Finance/Monetary Value',
  component: MonetaryValue,
  tags: ['autodocs'],
}

export default monetaryMeta
type MonetaryStory = StoryObj<typeof monetaryMeta>

export const Income: MonetaryStory = {
  args: {
    value: 5250.75,
    type: 'income',
  },
}

export const Expense: MonetaryStory = {
  args: {
    value: 1250.25,
    type: 'expense',
  },
}

export const Neutral: MonetaryStory = {
  args: {
    value: 3500.0,
    type: 'neutral',
  },
}

export const Hidden: MonetaryStory = {
  args: {
    value: 5250.75,
    type: 'income',
    hideable: true,
  },
}

// TransactionItem Stories
export const Transaction: StoryObj<typeof TransactionItem> = {
  render: () => (
    <div className="flex flex-col gap-md max-w-md">
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
  ),
}

// CreditCard Stories
export const CreditCardStory: StoryObj<typeof CreditCard> = {
  render: () => (
    <CreditCard
      cardholderName="John Doe"
      cardNumber="4242"
      expiryMonth={12}
      expiryYear={2025}
      cardIssuer="Visa"
    />
  ),
}

// BudgetCard Stories
export const BudgetNormal: StoryObj<typeof BudgetCard> = {
  render: () => (
    <div className="max-w-sm">
      <BudgetCard category="Groceries" icon="🛒" spent={450} limit={1000} />
    </div>
  ),
}

export const BudgetWarning: StoryObj<typeof BudgetCard> = {
  render: () => (
    <div className="max-w-sm">
      <BudgetCard category="Entertainment" icon="🎬" spent={800} limit={1000} />
    </div>
  ),
}

export const BudgetExceeded: StoryObj<typeof BudgetCard> = {
  render: () => (
    <div className="max-w-sm">
      <BudgetCard category="Dining" icon="🍽️" spent={1250} limit={1000} />
    </div>
  ),
}

export const MultipleBudgets: StoryObj<typeof BudgetCard> = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-md max-w-2xl">
      <BudgetCard category="Groceries" icon="🛒" spent={450} limit={1000} />
      <BudgetCard category="Transport" icon="🚕" spent={380} limit={500} />
      <BudgetCard category="Entertainment" icon="🎬" spent={800} limit={1000} />
      <BudgetCard category="Dining" icon="🍽️" spent={1250} limit={1000} />
    </div>
  ),
}
