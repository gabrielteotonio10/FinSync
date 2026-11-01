import { Card, CardContent, Container, Section, Input, Button } from '@/components'
import { TransactionItem } from '@/components'
import { H1, H2, Body } from '@/components/Typography/Typography'
import { Search, Download } from 'lucide-react'

export function TransactionsScreen() {
  return (
    <Container className="space-y-lg">
      {/* Header */}
      <Section>
        <div className="flex justify-between items-start">
          <div>
            <H1>Transactions</H1>
            <Body className="text-[var(--semantic-light-color-text-secondary)]">
              View and manage all your financial transactions.
            </Body>
          </div>
          <Button variant="secondary" className="gap-md">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </Section>

      {/* Filters */}
      <Card>
        <CardContent className="p-lg">
          <div className="flex gap-md items-end">
            <div className="flex-1 relative">
              <label className="block text-sm font-medium mb-xs">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-9"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-xs">Category</label>
              <select className="h-10 px-3 rounded-md border border-[var(--semantic-light-color-border-default)]">
                <option>All categories</option>
                <option>Groceries</option>
                <option>Transport</option>
                <option>Entertainment</option>
              </select>
            </div>
            <Button variant="secondary">Filter</Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Section>
        <H2>All Transactions</H2>
        <div className="space-y-md">
          <TransactionItem
            category="Groceries"
            categoryIcon="🛒"
            description="Mercado Central"
            amount={125.5}
            type="expense"
            status="completed"
            date="Nov 5"
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
            category="Transport"
            categoryIcon="🚕"
            description="Uber ride"
            amount={45.0}
            type="expense"
            status="completed"
            date="Nov 4"
          />
          <TransactionItem
            category="Restaurant"
            categoryIcon="🍽️"
            description="Pizza Hut"
            amount={85.0}
            type="expense"
            status="pending"
            date="Nov 3"
          />
          <TransactionItem
            category="Entertainment"
            categoryIcon="🎬"
            description="Netflix subscription"
            amount={39.9}
            type="expense"
            status="completed"
            date="Nov 2"
          />
        </div>
      </Section>
    </Container>
  )
}
