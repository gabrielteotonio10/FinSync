import { forwardRef, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-xs px-md py-xs rounded-full font-medium text-sm',
  {
    variants: {
      variant: {
        default:
          'bg-[var(--semantic-light-color-surface-raised)] text-[var(--semantic-light-color-text-primary)] border border-[var(--semantic-light-color-border-default)]',
        success:
          'bg-[var(--semantic-light-color-feedback-success)]/10 text-[var(--semantic-light-color-feedback-success)] border border-[var(--semantic-light-color-feedback-success)]/20',
        error:
          'bg-[var(--semantic-light-color-feedback-error)]/10 text-[var(--semantic-light-color-feedback-error)] border border-[var(--semantic-light-color-feedback-error)]/20',
        warning:
          'bg-[var(--semantic-light-color-feedback-warning)]/10 text-[var(--semantic-light-color-feedback-warning)] border border-[var(--semantic-light-color-feedback-warning)]/20',
        info: 'bg-[var(--semantic-light-color-action-primary)]/10 text-[var(--semantic-light-color-action-primary)] border border-[var(--semantic-light-color-action-primary)]/20',
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
