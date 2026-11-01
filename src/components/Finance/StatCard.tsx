import { forwardRef, ReactNode } from 'react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { Card, CardContent } from '../Card/Card'
import { MonetaryValue } from './MonetaryValue'
import { cn } from '@/lib/utils'

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string
  value: number
  icon?: ReactNode
  /** Change vs. previous period, in percent */
  change?: number
  /** Whether an increase is good news (false for expenses) */
  increaseIsGood?: boolean
  hint?: string
  hideable?: boolean
}

const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  (
    { label, value, icon, change, increaseIsGood = true, hint, hideable, className, ...props },
    ref
  ) => {
    const isUp = (change ?? 0) >= 0
    const isGood = isUp === increaseIsGood

    return (
      <Card ref={ref} className={className} {...props}>
        <CardContent className="space-y-sm">
          <div className="flex items-center justify-between gap-sm">
            <p className="text-sm font-medium text-muted">{label}</p>
            {icon && (
              <div className="flex size-8 items-center justify-center rounded-sm bg-surface-muted text-muted [&_svg]:size-4">
                {icon}
              </div>
            )}
          </div>
          <MonetaryValue value={value} hideable={hideable} className="text-2xl" />
          {(change !== undefined || hint) && (
            <p className="flex items-center gap-1.5 text-xs text-muted">
              {change !== undefined && (
                <span
                  className={cn(
                    'inline-flex items-center gap-0.5 font-medium [&_svg]:size-3.5',
                    isGood ? 'text-success' : 'text-danger'
                  )}
                >
                  {isUp ? <ArrowUpRight /> : <ArrowDownRight />}
                  {Math.abs(change).toFixed(1)}%
                </span>
              )}
              {hint}
            </p>
          )}
        </CardContent>
      </Card>
    )
  }
)

StatCard.displayName = 'StatCard'

export { StatCard }
