import { SyncAvatar } from './SyncLogo'
import { cn } from '@/lib/utils'

interface AILogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  glow?: boolean
}

/**
 * Official FinSync Otter Mascot Mark — interactive with live blinking & cursor-tracking eyes.
 */
export function AILogo({ className, glow = false, ...props }: AILogoProps) {
  return (
    <span
      aria-hidden="true"
      className={cn('inline-flex size-8 shrink-0 items-center justify-center', className)}
      {...props}
    >
      <SyncAvatar size="sm" glow={glow} className="size-full" />
    </span>
  )
}
