import { forwardRef, ReactNode } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { X } from 'lucide-react'
import { useLanguage } from '@/i18n'
import { cn } from '@/lib/utils'

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogClose = DialogPrimitive.Close

const contentVariants = cva(
  'fixed z-50 flex flex-col border border-border bg-surface text-foreground shadow-lg focus:outline-none',
  {
    variants: {
      side: {
        // Centered modal
        center:
          'left-1/2 top-1/2 max-h-[90vh] w-[calc(100%-2rem)] max-w-(--container-md) -translate-x-1/2 -translate-y-1/2 rounded-lg',
        // Right-side drawer (sheet)
        right: 'inset-y-0 right-0 h-full w-full max-w-(--container-md) border-y-0 border-r-0',
      },
    },
    defaultVariants: {
      side: 'center',
    },
  }
)

interface DialogContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof contentVariants> {
  children: ReactNode
  hideClose?: boolean
}

const DialogContent = forwardRef<React.ElementRef<typeof DialogPrimitive.Content>, DialogContentProps>(
  ({ className, side, hideClose, children, ...props }, ref) => {
    const { t } = useLanguage()
    return (
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] data-[state=open]:animate-[fade-in_150ms_ease-out]" />
        <DialogPrimitive.Content
          ref={ref}
          className={cn(
            contentVariants({ side }),
            side === 'right'
              ? 'data-[state=open]:animate-[slide-in-right_200ms_ease-out]'
              : 'data-[state=open]:animate-[dialog-in_150ms_ease-out]',
            className
          )}
          {...props}
        >
          {children}
          {!hideClose && (
            <DialogPrimitive.Close
              className="absolute right-3 top-3 rounded-sm p-1.5 text-subtle transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={t.common.close}
            >
              <X className="size-4" />
            </DialogPrimitive.Close>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    )
  }
)

DialogContent.displayName = 'DialogContent'

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col gap-1 border-b border-border px-lg py-md pr-12', className)} {...props} />
)

const DialogBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex-1 overflow-y-auto p-lg', className)} {...props} />
)

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-wrap items-center justify-end gap-sm border-t border-border px-lg py-md', className)}
    {...props}
  />
)

const DialogTitle = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn('text-base font-semibold', className)} {...props} />
))

DialogTitle.displayName = 'DialogTitle'

const DialogDescription = forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn('text-sm text-muted', className)} {...props} />
))

DialogDescription.displayName = 'DialogDescription'

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
