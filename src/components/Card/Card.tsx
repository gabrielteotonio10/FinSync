import { forwardRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-[var(--primitives-radius-md)] border border-[var(--semantic-light-color-border-default)] bg-[var(--semantic-light-color-surface-raised)] text-[var(--semantic-light-color-text-primary)] shadow-[var(--primitives-shadow-sm)] transition-shadow hover:shadow-[var(--primitives-shadow-md)]',
      className
    )}
    {...props}
  />
))

Card.displayName = 'Card'

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-[var(--primitives-spacing-lg)] border-b border-inherit', className)}
      {...props}
    />
  )
)

CardHeader.displayName = 'CardHeader'

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-[var(--primitives-spacing-lg)]', className)} {...props} />
  )
)

CardContent.displayName = 'CardContent'

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-[var(--primitives-spacing-lg)] border-t border-inherit', className)}
      {...props}
    />
  )
)

CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardContent, CardFooter }
