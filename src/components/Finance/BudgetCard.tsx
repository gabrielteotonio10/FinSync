import { forwardRef } from 'react'
import { Card, CardContent } from '../Card/Card'
import { MonetaryValue } from './MonetaryValue'
import { Badge } from '../Badge/Badge'
import { cn } from '@/lib/utils'

interface BudgetCardProps extends React.HTMLAttributes<HTMLDivElement> {
  category: string
  spent: number
  limit: number
  icon?: string
}

const BudgetCard = forwardRef<HTMLDivElement, BudgetCardProps>(
  ({ category, spent, limit, icon = '📊', className, ...props }, ref) => {
    const percentage = (spent / limit) * 100
    let status: 'normal' | 'warning' | 'exceeded' = 'normal'
    let badgeVariant: 'success' | 'warning' | 'error' = 'success'

    if (percentage >= 100) {
      status = 'exceeded'
      badgeVariant = 'error'
    } else if (percentage >= 80) {
      status = 'warning'
      badgeVariant = 'warning'
    }

    return (
      <Card ref={ref} className={className} {...props}>
        <CardContent className="p-lg">
          <div className="flex items-start justify-between mb-md">
            <div>
              <p className="text-sm text-[var(--semantic-light-color-text-secondary)]">
                {icon} {category}
              </p>
              <MonetaryValue value={spent} type="expense" className="mt-xs" />
              <p className="text-xs text-[var(--semantic-light-color-text-secondary)] mt-xs">
                of
                <MonetaryValue value={limit} type="neutral" className="ml-xs inline-flex" />
              </p>
            </div>
            <Badge variant={badgeVariant} className="text-xs">
              {percentage.toFixed(0)}%
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className={cn(
                'h-full transition-all duration-300',
                status === 'normal' && 'bg-[var(--semantic-light-color-finance-income)]',
                status === 'warning' && 'bg-[var(--semantic-light-color-feedback-warning)]',
                status === 'exceeded' && 'bg-[var(--semantic-light-color-feedback-error)]'
              )}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>

          {/* Status Message */}
          {status === 'warning' && (
            <p className="text-xs text-[var(--semantic-light-color-feedback-warning)] mt-md font-medium">
              ⚠️ Approaching limit
            </p>
          )}
          {status === 'exceeded' && (
            <p className="text-xs text-[var(--semantic-light-color-feedback-error)] mt-md font-medium">
              ✕ Budget exceeded by R$ {(spent - limit).toFixed(2)}
            </p>
          )}
        </CardContent>
      </Card>
    )
  }
)

BudgetCard.displayName = 'BudgetCard'

export { BudgetCard }
