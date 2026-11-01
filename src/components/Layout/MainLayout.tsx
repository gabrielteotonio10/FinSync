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
      className={cn('flex flex-col h-screen bg-[var(--semantic-light-color-surface-default)]', className)}
      {...props}
    >
      {/* Header */}
      {header && <div className="flex-shrink-0">{header}</div>}

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebar && <div className="flex-shrink-0">{sidebar}</div>}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto">
          <div className="h-full">{children}</div>
        </main>
      </div>

      {/* Footer */}
      {footer && <div className="flex-shrink-0">{footer}</div>}
    </div>
  )
)

MainLayout.displayName = 'MainLayout'

export { MainLayout }
