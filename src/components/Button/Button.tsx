import { forwardRef, ReactNode } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-md whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      variant: {
        primary:
          'text-white hover:shadow-md active:shadow-sm disabled:hover:shadow-none',
        secondary:
          'border border-current text-current hover:bg-gray-100 dark:hover:bg-gray-900 active:bg-gray-50 dark:active:bg-gray-950',
        ghost:
          'hover:bg-gray-100 dark:hover:bg-gray-900 active:bg-gray-50 dark:active:bg-gray-950',
        destructive:
          'text-white hover:shadow-md active:shadow-sm disabled:hover:shadow-none',
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-md',
        md: 'h-10 px-4 text-base rounded-md',
        lg: 'h-12 px-6 text-lg rounded-lg',
      },
    },
    compoundVariants: [
      {
        variant: 'primary',
        className:
          'bg-[var(--semantic-light-color-action-primary)] hover:bg-[var(--semantic-light-color-action-primary-hover)]',
      },
      {
        variant: 'destructive',
        className: 'bg-[var(--semantic-light-color-feedback-error)] hover:bg-red-700',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  children: ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, disabled, children, ...props }, ref) => (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading || disabled}
      ref={ref}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  )
)

Button.displayName = 'Button'

export { Button, buttonVariants }
