import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'flex h-10 w-full px-3 py-2 text-base border border-[var(--semantic-light-color-border-default)] rounded-md bg-[var(--semantic-light-color-surface-default)] text-[var(--semantic-light-color-text-primary)] placeholder:text-[var(--semantic-light-color-text-disabled)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--semantic-light-color-border-focus)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
      className
    )}
    {...props}
  />
))

Input.displayName = 'Input'

export { Input }
