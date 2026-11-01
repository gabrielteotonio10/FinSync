import { forwardRef, ReactNode, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  /** Initial open state on mobile. Always visible from md up. */
  defaultOpen?: boolean
}

const Sidebar = forwardRef<HTMLDivElement, SidebarProps>(
  ({ children, defaultOpen = false, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(defaultOpen)

    return (
      <>
        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed left-3 top-3 z-50 flex size-10 items-center justify-center rounded-sm text-muted transition-colors hover:bg-surface-muted hover:text-foreground md:hidden"
          aria-label="Toggle sidebar"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>

        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-[1px] md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside
          ref={ref}
          className={cn(
            'fixed inset-y-0 left-0 z-40 flex w-64 shrink-0 flex-col border-r border-border bg-surface transition-transform duration-300',
            'md:static md:translate-x-0',
            !isOpen && '-translate-x-full',
            className
          )}
          // Close the mobile drawer once a navigation link is chosen
          onClickCapture={(e) => {
            if ((e.target as HTMLElement).closest('a')) setIsOpen(false)
          }}
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
      className={cn('flex h-16 shrink-0 items-center gap-sm border-b border-border px-lg', className)}
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
    <div ref={ref} className={cn('flex-1 space-y-lg overflow-y-auto px-md py-lg', className)} {...props}>
      {children}
    </div>
  )
)

SidebarContent.displayName = 'SidebarContent'

interface SidebarLabelProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode
}

const SidebarLabel = forwardRef<HTMLParagraphElement, SidebarLabelProps>(
  ({ children, className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('mb-sm px-sm text-xs font-medium uppercase tracking-wider text-subtle', className)}
      {...props}
    >
      {children}
    </p>
  )
)

SidebarLabel.displayName = 'SidebarLabel'

interface SidebarMenuProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const SidebarMenu = forwardRef<HTMLDivElement, SidebarMenuProps>(
  ({ children, className, ...props }, ref) => (
    <nav ref={ref} className={cn('space-y-1', className)} {...props}>
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
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex items-center gap-sm rounded-sm px-sm py-2 text-sm font-medium transition-colors [&_svg]:size-[18px]',
        active
          ? 'bg-primary-soft text-primary-soft-foreground'
          : 'text-muted hover:bg-surface-muted hover:text-foreground',
        className
      )}
      {...props}
    >
      {icon && <span className="flex shrink-0">{icon}</span>}
      <span className="flex-1">{label}</span>
    </a>
  )
)

SidebarMenuItem.displayName = 'SidebarMenuItem'

interface SidebarFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={cn('shrink-0 border-t border-border p-md', className)} {...props}>
      {children}
    </div>
  )
)

SidebarFooter.displayName = 'SidebarFooter'

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
}
