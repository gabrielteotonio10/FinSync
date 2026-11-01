import { forwardRef, ReactNode } from 'react'
import { Check, Clock, Receipt, X } from 'lucide-react'
import { Badge } from '../Badge/Badge'
import { MonetaryValue } from './MonetaryValue'
import { cn } from '@/lib/utils'

interface TransactionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  category: string
  categoryIcon?: ReactNode
  description: string
  amount: number
  type: 'income' | 'expense'
  status?: 'pending' | 'completed' | 'failed'
  date?: string
}

const statusConfig = {
  pending: { variant: 'warning', label: 'Pending', Icon: Clock },
  completed: { variant: 'success', label: 'Completed', Icon: Check },
  failed: { variant: 'error', label: 'Failed', Icon: X },
} as const

const TransactionItem = forwardRef<HTMLDivElement, TransactionItemProps>(
  (
    {
      category,
      categoryIcon = <Receipt />,
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
    const statusInfo = status ? statusConfig[status] : null

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-md px-lg py-md transition-colors hover:bg-surface-muted/60',
          className
        )}
        {...props}
      >
        {/* Category icon */}
        <div
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-sm text-lg [&_svg]:size-5',
            type === 'income' ? 'bg-success/10 text-success' : 'bg-surface-muted text-muted'
          )}
        >
          {categoryIcon}
        </div>

        {/* Description */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">{description}</p>
          <p className="truncate text-xs text-muted">
            {category}
            {date && ` · ${date}`}
          </p>
        </div>

        {/* Status */}
        {statusInfo && (
          <Badge variant={statusInfo.variant} className="hidden sm:inline-flex">
            <statusInfo.Icon />
            {statusInfo.label}
          </Badge>
        )}

        {/* Amount */}
        <MonetaryValue
          value={type === 'income' ? amount : -amount}
          type={type}
          showSign
          className="w-32 justify-end text-sm"
        />
      </div>
    )
  }
)

TransactionItem.displayName = 'TransactionItem'

export { TransactionItem }
