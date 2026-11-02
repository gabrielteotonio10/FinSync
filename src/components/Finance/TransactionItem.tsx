import { forwardRef, ReactNode } from 'react'
import { Check, Clock, Receipt, X } from 'lucide-react'
import { Badge } from '../Badge/Badge'
import { MonetaryValue } from './MonetaryValue'
import { useLanguage } from '@/i18n'
import { cn } from '@/lib/utils'

interface TransactionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  category: string
  categoryIcon?: ReactNode
  description: string
  amount: number
  type: 'income' | 'expense'
  status?: 'pending' | 'completed' | 'failed'
  date?: string
  cardId?: string
  accountId?: string
  time?: string
}

const statusConfig = {
  pending: { variant: 'warning', Icon: Clock },
  completed: { variant: 'success', Icon: Check },
  failed: { variant: 'error', Icon: X },
} as const

const TransactionItem = forwardRef<HTMLDivElement, TransactionItemProps>(
  (
    {
      id,
      category,
      categoryIcon = <Receipt />,
      description,
      amount,
      type,
      status,
      date,
      className,
      onClick,
      cardId: _cardId,
      accountId: _accountId,
      time: _time,
      ...props
    },
    ref
  ) => {
    const { t } = useLanguage()
    const statusInfo = status ? statusConfig[status] : null
    const displayDescription = (id && t.transactionDescriptions[id]) || description
    const displayCategory = t.categories[category] ?? category
    const displayDate = date ? t.formatShortDate(date) : undefined

    return (
      <div
        ref={ref}
        id={id}
        className={cn(
          'flex items-center gap-md px-lg py-md transition-colors hover:bg-surface-muted/60',
          onClick &&
            'cursor-pointer focus-visible:bg-surface-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
          className
        )}
        {...(onClick && {
          onClick,
          role: 'button',
          tabIndex: 0,
          onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              e.currentTarget.click()
            }
          },
        })}
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
          <p className="truncate text-sm font-medium text-foreground">{displayDescription}</p>
          <p className="truncate text-xs text-muted">
            {displayCategory}
            {displayDate && ` · ${displayDate}`}
          </p>
        </div>

        {/* Status */}
        {statusInfo && status && (
          <Badge variant={statusInfo.variant} className="hidden sm:inline-flex">
            <statusInfo.Icon />
            {t.statuses[status]}
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
