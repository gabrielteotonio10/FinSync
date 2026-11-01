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
          className={cn(
            'w-10 h-10 rounded-full object-cover border border-[var(--semantic-light-color-border-default)]',
            className
          )}
          {...props}
        />
      )
    }

    return (
      <div
        className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm text-white bg-[var(--semantic-light-color-action-primary)]',
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
