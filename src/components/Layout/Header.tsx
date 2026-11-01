import { forwardRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode
}

const Header = forwardRef<HTMLElement, HeaderProps>(({ children, className, ...props }, ref) => (
  <header
    ref={ref}
    className={cn(
      'sticky top-0 z-20 border-b border-[var(--semantic-light-color-border-default)] bg-[var(--semantic-light-color-surface-default)] shadow-sm',
      className
    )}
    {...props}
  >
    {children}
  </header>
))

Header.displayName = 'Header'

interface HeaderContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const HeaderContent = forwardRef<HTMLDivElement, HeaderContentProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center justify-between gap-md p-lg', className)}
      {...props}
    >
      {children}
    </div>
  )
)

HeaderContent.displayName = 'HeaderContent'

interface HeaderTitleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const HeaderTitle = forwardRef<HTMLDivElement, HeaderTitleProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1', className)} {...props}>
      {children}
    </div>
  )
)

HeaderTitle.displayName = 'HeaderTitle'

interface HeaderActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const HeaderActions = forwardRef<HTMLDivElement, HeaderActionsProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center gap-md', className)} {...props}>
      {children}
    </div>
  )
)

HeaderActions.displayName = 'HeaderActions'

export { Header, HeaderContent, HeaderTitle, HeaderActions }
