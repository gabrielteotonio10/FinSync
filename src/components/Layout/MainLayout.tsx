import { forwardRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface MainLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: ReactNode
  sidebar?: ReactNode
  children: ReactNode
  footer?: ReactNode
}

const MainLayout = forwardRef<HTMLDivElement, MainLayoutProps>(
  ({ header, sidebar, children, footer, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex h-screen overflow-hidden bg-background text-foreground', className)}
      {...props}
    >
      {/* Sidebar */}
      {sidebar}

      {/* Header + Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {header && <div className="shrink-0">{header}</div>}

        <main className="flex-1 overflow-y-auto">{children}</main>

        {footer && <div className="shrink-0">{footer}</div>}
      </div>
    </div>
  )
)

MainLayout.displayName = 'MainLayout'

export { MainLayout }
