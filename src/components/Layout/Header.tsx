import { forwardRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode
}

const Header = forwardRef<HTMLElement, HeaderProps>(({ children, className, ...props }, ref) => (
  <header
    ref={ref}
    className={cn('sticky top-0 z-20 border-b border-border bg-surface/80 backdrop-blur', className)}
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
      // Left padding on mobile leaves room for the sidebar toggle
      className={cn('flex h-16 items-center justify-between gap-md pl-16 pr-lg md:pl-lg', className)}
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
    <div ref={ref} className={cn('flex min-w-0 flex-1 items-center gap-md', className)} {...props}>
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
    <div ref={ref} className={cn('flex items-center gap-xs', className)} {...props}>
      {children}
    </div>
  )
)

HeaderActions.displayName = 'HeaderActions'

export { Header, HeaderContent, HeaderTitle, HeaderActions }
