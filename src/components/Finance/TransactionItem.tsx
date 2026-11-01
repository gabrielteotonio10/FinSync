import { forwardRef, ReactNode } from 'react'
import { Badge } from '../Badge/Badge'
import { Avatar } from '../Avatar/Avatar'
import { MonetaryValue } from './MonetaryValue'

interface TransactionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  category: string
  categoryIcon?: string
  description: string
  amount: number
  type: 'income' | 'expense'
  status?: 'pending' | 'completed' | 'failed'
  date?: string
}

const statusVariants = {
  pending: 'warning',
  completed: 'success',
  failed: 'error',
} as const

const TransactionItem = forwardRef<HTMLDivElement, TransactionItemProps>(
  (
    {
      category,
      categoryIcon = '📝',
      description,
      amount,
      type,
      status,
      date,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="flex items-center gap-md p-md rounded-md border border-[var(--semantic-light-color-border-default)] hover:bg-[var(--semantic-light-color-surface-raised)] transition-colors"
        {...props}
      >
        {/* Icon/Avatar */}
        <Avatar initials={categoryIcon} className="w-10 h-10" />

        {/* Description */}
        <div className="flex-1 min-w-0">
          <p className="font-medium truncate">{description}</p>
          <p className="text-sm text-[var(--semantic-light-color-text-secondary)]">
            {category}
            {date && ` • ${date}`}
          </p>
        </div>

        {/* Amount */}
        <div className="text-right">
          <MonetaryValue
            value={type === 'income' ? amount : -amount}
            type={type === 'income' ? 'income' : 'expense'}
          />
          {status && (
            <Badge
              variant={statusVariants[status]}
              className="text-xs mt-xs w-full justify-center"
            >
              {status === 'pending' ? '⏳' : status === 'completed' ? '✓' : '✕'}
              {' '}
              {status}
            </Badge>
          )}
        </div>
      </div>
    )
  }
)

TransactionItem.displayName = 'TransactionItem'

export { TransactionItem }
