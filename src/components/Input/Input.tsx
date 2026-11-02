import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'flex h-9 w-full rounded-sm border border-input bg-surface px-3 text-sm text-foreground shadow-sm transition-colors placeholder:text-subtle',
      'focus-visible:border-primary focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary/15',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  />
))

Input.displayName = 'Input'

export { Input }
