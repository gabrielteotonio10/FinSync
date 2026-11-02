import { forwardRef, ReactNode, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { useLanguage } from '@/i18n'
import { cn, formatCurrency } from '@/lib/utils'

const valueVariants = cva('font-semibold tabular-nums tracking-tight transition-colors', {
  variants: {
    type: {
      income: 'text-success',
      expense: 'text-danger',
      neutral: 'text-foreground',
    },
  },
  defaultVariants: {
    type: 'neutral',
  },
})

interface MonetaryValueProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof valueVariants> {
  value: number
  type?: 'income' | 'expense' | 'neutral'
  hideable?: boolean
  /** Prefix income with "+" and expenses with "−" */
  showSign?: boolean
  prefix?: string
  suffix?: string
  children?: ReactNode
}

const MonetaryValue = forwardRef<HTMLSpanElement, MonetaryValueProps>(
  (
    {
      value,
      type = 'neutral',
      hideable = false,
      showSign = false,
      prefix = 'R$ ',
      suffix = '',
      className,
      ...props
    },
    ref
  ) => {
    const [hidden, setHidden] = useState(false)
    const { t } = useLanguage()
    let sign = ''
    if (type !== 'neutral' && value < 0) sign = '−'
    else if (showSign && type === 'income') sign = '+'

    return (
      <span
        ref={ref}
        className={cn('inline-flex items-center gap-sm text-lg', className)}
        {...props}
      >
        <span className={cn(valueVariants({ type }))}>
          {hidden ? `${prefix}••••••` : `${sign}${formatCurrency(Math.abs(value), prefix)}${suffix}`}
        </span>
        {hideable && (
          <button
            type="button"
            onClick={() => setHidden(!hidden)}
            className="rounded-sm p-1 text-subtle transition-colors hover:bg-surface-muted hover:text-foreground"
            aria-label={hidden ? t.finance.showValue : t.finance.hideValue}
          >
            {hidden ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        )}
      </span>
    )
  }
)

MonetaryValue.displayName = 'MonetaryValue'

export { MonetaryValue }
