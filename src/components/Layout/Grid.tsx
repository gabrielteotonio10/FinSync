import { forwardRef, ReactNode } from 'react'
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
      4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    }

    return (
      <div
        ref={ref}
        className={cn('grid gap-lg', colsMap[cols], className)}
        {...props}
      >
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
  ({ children, maxWidth = 'lg', className, ...props }, ref) => {
    const maxWidthMap = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-4xl',
      xl: 'max-w-6xl',
      '2xl': 'max-w-7xl',
      full: 'max-w-full',
    }

    return (
      <div
        ref={ref}
        className={cn('mx-auto px-lg', maxWidthMap[maxWidth], className)}
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
    <section ref={ref} className={cn('py-lg', className)} {...props}>
      {children}
    </section>
  )
)

Section.displayName = 'Section'

export { Grid, Container, Section }
