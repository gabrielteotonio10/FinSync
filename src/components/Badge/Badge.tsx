import { forwardRef, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset [&_svg]:size-3',
  {
    variants: {
      variant: {
        default: 'bg-surface-muted text-muted ring-border',
        success: 'bg-success/10 text-success ring-success/20',
        error: 'bg-danger/10 text-danger ring-danger/20',
        warning: 'bg-warning/10 text-warning ring-warning/25',
        info: 'bg-primary-soft text-primary-soft-foreground ring-primary/20',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: ReactNode
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span ref={ref} className={cn(badgeVariants({ variant, className }))} {...props} />
  )
)

Badge.displayName = 'Badge'

export { Badge, badgeVariants }
