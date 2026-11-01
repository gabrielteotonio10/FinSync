import { forwardRef, ReactNode, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  defaultOpen?: boolean
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ children, defaultOpen = true, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
      <>
        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-50 md:hidden p-md rounded-md hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
          aria-label="Toggle sidebar"
        >
          {isOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside
          ref={ref}
          className={cn(
            'fixed md:sticky left-0 top-0 h-screen w-64 border-r border-[var(--semantic-light-color-border-default)] bg-[var(--semantic-light-color-surface-default)] overflow-y-auto transition-transform duration-300 z-40',
            'flex flex-col',
            !isOpen && '-translate-x-full md:translate-x-0',
            className
          )}
          {...props}
        >
          {children}
        </aside>
      </>
    )
  }
)

Sidebar.displayName = 'Sidebar'

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-lg border-b border-[var(--semantic-light-color-border-default)]', className)}
      {...props}
    >
      {children}
    </div>
  )
)

SidebarHeader.displayName = 'SidebarHeader'

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const SidebarContent = forwardRef<HTMLDivElement, SidebarContentProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('flex-1 p-lg space-y-md', className)} {...props}>
      {children}
    </div>
  )
)

SidebarContent.displayName = 'SidebarContent'

interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const SidebarMenu = forwardRef<HTMLDivElement, SidebarMenuProps>(
  ({ children, className, ...props }, ref) => (
    <nav ref={ref} className={cn('space-y-xs', className)} {...props}>
      {children}
    </nav>
  )
)

SidebarMenu.displayName = 'SidebarMenu'

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string
  active?: boolean
  icon?: ReactNode
  label: string
  children?: ReactNode
}

const SidebarMenuItem = forwardRef<HTMLAnchorElement, SidebarMenuItemProps>(
  ({ href, active = false, icon, label, className, ...props }, ref) => (
    <a
      ref={ref}
      href={href}
      className={cn(
        'flex items-center gap-md px-md py-sm rounded-md transition-colors',
        active
          ? 'bg-[var(--semantic-light-color-action-primary)] text-white'
          : 'text-[var(--semantic-light-color-text-primary)] hover:bg-[var(--semantic-light-color-surface-raised)]',
        className
      )}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="flex-1 text-sm font-medium">{label}</span>
    </a>
  )
)

SidebarMenuItem.displayName = 'SidebarMenuItem'

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('p-lg border-t border-[var(--semantic-light-color-border-default)]', className)}
      {...props}
    >
      {children}
    </div>
  )
)

SidebarFooter.displayName = 'SidebarFooter'

export { Sidebar, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarFooter }
