import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, id, ...props }, ref) => (
    <div className="flex items-center gap-md">
      <input
        ref={ref}
        type="radio"
        id={id}
        className={cn(
          'w-5 h-5 rounded-full border border-border cursor-pointer accent-primary transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        {...props}
      />
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium cursor-pointer select-none text-foreground"
        >
          {label}
        </label>
      )}
    </div>
  )
)

Radio.displayName = 'Radio'

export { Radio }
