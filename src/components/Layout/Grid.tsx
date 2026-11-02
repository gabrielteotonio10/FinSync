import { forwardRef, ReactNode } from 'react'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  cols?: 1 | 2 | 3 | 4
}

const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ children, cols = 1, className, ...props }, ref) => {
    const colsMap = {
      1: 'grid-cols-1',
      2: 'grid-cols-1 md:grid-cols-2',
      3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-4',
    }

    return (
      <div ref={ref} className={cn('grid gap-lg', colsMap[cols], className)} {...props}>
        {children}
      </div>
    )
  }
)

Grid.displayName = 'Grid'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, maxWidth = 'xl', className, ...props }, ref) => {
    // Container widths reference --container-* explicitly: the token spacing
    // scale (--spacing-sm, --spacing-md...) would otherwise shadow max-w-sm/md.
    const maxWidthMap = {
      sm: 'max-w-(--container-sm)',
      md: 'max-w-(--container-md)',
      lg: 'max-w-(--container-4xl)',
      xl: 'max-w-(--container-6xl)',
      '2xl': 'max-w-(--container-7xl)',
      full: 'max-w-full',
    }

    return (
      <div
        ref={ref}
        className={cn('mx-auto w-full px-md py-lg sm:px-lg md:py-xl', maxWidthMap[maxWidth], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: ReactNode
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ children, className, ...props }, ref) => (
    <section ref={ref} className={cn('space-y-md', className)} {...props}>
      {children}
    </section>
  )
)

Section.displayName = 'Section'

interface PageHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  /** Renders a back link above the title (detail screens) */
  onBack?: () => void
  backLabel?: string
}

const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, description, actions, onBack, backLabel, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex flex-col gap-md sm:flex-row sm:items-end sm:justify-between', className)}
      {...props}
    >
      <div className="min-w-0 space-y-1">
        {onBack && (
          <button
            onClick={onBack}
            className="-ml-1 mb-xs inline-flex items-center gap-1 rounded-sm px-1 py-0.5 text-sm font-medium text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <ArrowLeft className="size-4" />
            {backLabel}
          </button>
        )}
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description && <p className="text-sm text-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-sm">{actions}</div>}
    </div>
  )
)

PageHeader.displayName = 'PageHeader'

interface SectionHeaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ title, description, action, className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-end justify-between gap-md', className)} {...props}>
      <div>
        <h2 className="text-base font-semibold">{title}</h2>
        {description && <p className="text-sm text-muted">{description}</p>}
      </div>
      {action}
    </div>
  )
)

SectionHeader.displayName = 'SectionHeader'

export { Grid, Container, Section, PageHeader, SectionHeader }
