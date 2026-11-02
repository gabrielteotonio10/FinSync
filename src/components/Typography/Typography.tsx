import { forwardRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode
}

const Display = forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ className, ...props }, ref) => (
    <h1
      ref={ref}
      className={cn('text-4xl font-semibold leading-tight tracking-tight', className)}
      {...props}
    />
  )
)
Display.displayName = 'Display'

const H1 = forwardRef<HTMLHeadingElement, TypographyProps>(({ className, ...props }, ref) => (
  <h1 ref={ref} className={cn('text-2xl font-semibold tracking-tight', className)} {...props} />
))
H1.displayName = 'H1'

const H2 = forwardRef<HTMLHeadingElement, TypographyProps>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn('text-lg font-semibold tracking-tight', className)} {...props} />
))
H2.displayName = 'H2'

const H3 = forwardRef<HTMLHeadingElement, TypographyProps>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn('text-base font-semibold', className)} {...props} />
))
H3.displayName = 'H3'

const Body = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-base text-foreground', className)} {...props} />
  )
)
Body.displayName = 'Body'

const Small = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm', className)} {...props} />
  )
)
Small.displayName = 'Small'

const Muted = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted', className)} {...props} />
  )
)
Muted.displayName = 'Muted'

export { Display, H1, H2, H3, Body, Small, Muted }
