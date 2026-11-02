import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface FieldProps {
  id: string
  label: string
  hint?: string
  error?: string
  className?: string
  children: ReactNode
}

/** Label + control + hint/error wrapper for form inputs */
export function Field({ id, label, hint, error, className, children }: FieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-xs font-medium text-danger">
          {error}
        </p>
      ) : (
        hint && <p className="text-xs text-muted">{hint}</p>
      )}
    </div>
  )
}
