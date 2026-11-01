import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface AvatarProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  initials?: string
  fallback?: string
}

const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ initials, fallback, className, src, ...props }, ref) => {
    if (src) {
      return (
        <img
          ref={ref}
          src={src}
          className={cn('size-10 rounded-full border border-border object-cover', className)}
          {...props}
        />
      )
    }

    return (
      <div
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary-soft-foreground',
          className
        )}
      >
        {initials || fallback?.[0]?.toUpperCase() || '?'}
      </div>
    )
  }
)

Avatar.displayName = 'Avatar'

export { Avatar }
