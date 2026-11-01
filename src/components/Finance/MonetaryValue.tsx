import { forwardRef, ReactNode } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const valueVariants = cva('font-mono font-bold text-lg transition-colors', {
  variants: {
    type: {
      income: 'text-[var(--semantic-light-color-finance-income)]',
      expense: 'text-[var(--semantic-light-color-finance-expense)]',
      neutral: 'text-[var(--semantic-light-color-finance-neutral)]',
    },
  },
  defaultVariants: {
    type: 'neutral',
  },
})

interface MonetaryValueProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof valueVariants> {
  value: number
  type?: 'income' | 'expense' | 'neutral'
  hideable?: boolean
  prefix?: string
  suffix?: string
  children?: ReactNode
}

const MonetaryValue = forwardRef<HTMLDivElement, MonetaryValueProps>(
  (
    { value, type = 'neutral', hideable = false, prefix = 'R$ ', suffix = '', className, ...props },
    ref
  ) => {
    const [hidden, setHidden] = useState(false)
    const isNegative = value < 0
    const displayValue = Math.abs(value).toFixed(2)
    const sign = isNegative && type !== 'neutral' ? '-' : ''

    return (
      <div
        ref={ref}
        className={cn('inline-flex items-center gap-sm', className)}
        {...props}
      >
        <div className={cn(valueVariants({ type }))}>
          {sign}
          {hidden ? '••••••' : `${prefix}${displayValue}${suffix}`}
        </div>
        {hideable && (
          <button
            onClick={() => setHidden(!hidden)}
            className="p-xs hover:bg-gray-100 dark:hover:bg-gray-900 rounded transition-colors"
            aria-label={hidden ? 'Show value' : 'Hide value'}
          >
            {hidden ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
    )
  }
)

MonetaryValue.displayName = 'MonetaryValue'

export { MonetaryValue }
