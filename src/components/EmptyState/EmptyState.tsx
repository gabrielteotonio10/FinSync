import { ReactNode } from 'react'
import { SyncMascot } from '../Brand'
import { cn } from '@/lib/utils'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center gap-sm px-lg py-2xl text-center', className)}>
      <SyncMascot pose="wave" size="sm" floating sparkles={false} />
      <p className="mt-xs text-sm font-medium">{title}</p>
      {description && <p className="max-w-(--container-xs) text-sm text-muted">{description}</p>}
      {action && <div className="mt-xs">{action}</div>}
    </div>
  )
}
