import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <div className={cn('relative', className)}>
      <select
        ref={ref}
        className={cn(
          'h-9 w-full appearance-none rounded-sm border border-input bg-surface pl-3 pr-9 text-sm text-foreground shadow-sm transition-colors',
          'focus-visible:border-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/15',
          'disabled:cursor-not-allowed disabled:opacity-50'
        )}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
    </div>
  )
)

Select.displayName = 'Select'

export { Select }
