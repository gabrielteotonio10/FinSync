import { forwardRef, ReactNode } from 'react'
import { CircleAlert, PiggyBank, TriangleAlert } from 'lucide-react'
import { Card, CardContent } from '../Card/Card'
import { Badge } from '../Badge/Badge'
import { cn, formatCurrency } from '@/lib/utils'

interface BudgetCardProps extends React.HTMLAttributes<HTMLDivElement> {
  category: string
  spent: number
  limit: number
  icon?: ReactNode
}

const BudgetCard = forwardRef<HTMLDivElement, BudgetCardProps>(
  ({ category, spent, limit, icon = <PiggyBank />, className, ...props }, ref) => {
    const percentage = (spent / limit) * 100
    let status: 'normal' | 'warning' | 'exceeded' = 'normal'
    let badgeVariant: 'default' | 'warning' | 'error' = 'default'

    if (percentage >= 100) {
      status = 'exceeded'
      badgeVariant = 'error'
    } else if (percentage >= 80) {
      status = 'warning'
      badgeVariant = 'warning'
    }

    return (
      <Card ref={ref} className={className} {...props}>
        <CardContent className="space-y-md">
          <div className="flex items-start justify-between gap-sm">
            <div className="flex items-center gap-sm">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-sm bg-primary-soft text-base text-primary-soft-foreground [&_svg]:size-[18px]">
                {icon}
              </div>
              <p className="text-sm font-medium text-foreground">{category}</p>
            </div>
            <Badge variant={badgeVariant}>{percentage.toFixed(0)}%</Badge>
          </div>

          <div>
            <p className="text-lg font-semibold tabular-nums tracking-tight">
              {formatCurrency(spent)}
            </p>
            <p className="text-xs text-muted">of {formatCurrency(limit)}</p>
          </div>

          {/* Progress Bar */}
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-surface-muted"
            role="progressbar"
            aria-valuenow={Math.round(percentage)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${category} budget used`}
          >
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                status === 'normal' && 'bg-primary',
                status === 'warning' && 'bg-warning',
                status === 'exceeded' && 'bg-danger'
              )}
              style={{ width: `${Math.min(percentage, 100)}%` }}
            />
          </div>

          {/* Status Message */}
          <p
            className={cn(
              'flex items-center gap-1 text-xs font-medium [&_svg]:size-3.5',
              status === 'normal' && 'text-muted',
              status === 'warning' && 'text-warning',
              status === 'exceeded' && 'text-danger'
            )}
          >
            {status === 'normal' && <>{formatCurrency(limit - spent)} left</>}
            {status === 'warning' && (
              <>
                <TriangleAlert /> Approaching limit
              </>
            )}
            {status === 'exceeded' && (
              <>
                <CircleAlert /> Over budget by {formatCurrency(spent - limit)}
              </>
            )}
          </p>
        </CardContent>
      </Card>
    )
  }
)

BudgetCard.displayName = 'BudgetCard'

export { BudgetCard }
