import { forwardRef } from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '@/lib/utils'

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverClose = PopoverPrimitive.Close

const PopoverContent = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'end', sideOffset = 6, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 rounded-md border border-border bg-surface text-foreground shadow-lg focus:outline-none',
        'data-[state=open]:animate-[dialog-in_120ms_ease-out]',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))

PopoverContent.displayName = 'PopoverContent'

interface MenuItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  destructive?: boolean
}

/** Button row used inside a Popover to build simple action menus */
const MenuItem = forwardRef<HTMLButtonElement, MenuItemProps>(
  ({ className, destructive, ...props }, ref) => (
    <PopoverPrimitive.Close asChild>
      <button
        ref={ref}
        className={cn(
          'flex w-full items-center gap-sm rounded-sm px-sm py-1.5 text-left text-sm transition-colors [&_svg]:size-4 [&_svg]:shrink-0',
          'focus-visible:bg-surface-muted focus-visible:outline-none',
          destructive ? 'text-danger hover:bg-danger/10' : 'text-foreground hover:bg-surface-muted',
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Close>
  )
)

MenuItem.displayName = 'MenuItem'

export { Popover, PopoverTrigger, PopoverContent, PopoverClose, MenuItem }
