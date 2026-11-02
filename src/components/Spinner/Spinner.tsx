import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const spinnerVariants = cva(
  'inline-block rounded-full border-2 border-current border-t-transparent animate-spin',
  {
    variants: {
      size: {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
      },
      color: {
        primary: 'text-primary',
        white: 'text-white',
        muted: 'text-muted',
      },
    },
    defaultVariants: {
      size: 'md',
      color: 'primary',
    },
  }
)

interface SpinnerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof spinnerVariants> {}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size, color, ...props }, ref) => (
    <div ref={ref} className={cn(spinnerVariants({ size, color, className }))} {...props} />
  )
)

Spinner.displayName = 'Spinner'

export { Spinner, spinnerVariants }
