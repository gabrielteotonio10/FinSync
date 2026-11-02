import { FormEvent, useState } from 'react'
import { Button } from '../Button/Button'
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../Dialog/Dialog'
import { Field } from '../Field/Field'
import { Input } from '../Input/Input'
import { useToast } from '@/hooks/useToast'
import { useLanguage } from '@/i18n'
import { cn } from '@/lib/utils'

interface ChangePasswordDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function strength(password: string) {
  let score = 0
  if (password.length >= 8) score++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  return score
}

export function ChangePasswordDialog({ open, onOpenChange }: ChangePasswordDialogProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const copy = t.passwordDialog

  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState<{ current?: string; next?: string; confirm?: string }>({})

  const reset = () => {
    setCurrent('')
    setNext('')
    setConfirm('')
    setErrors({})
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const nextErrors = {
      current: current ? undefined : copy.currentRequired,
      next: next.length >= 8 ? undefined : copy.tooShort,
      confirm: confirm === next ? undefined : copy.mismatch,
    }
    setErrors(nextErrors)
    if (nextErrors.current || nextErrors.next || nextErrors.confirm) return
    toast({ title: copy.updated, description: copy.updatedDescription })
    reset()
    onOpenChange(false)
  }

  const score = strength(next)

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) reset()
        onOpenChange(value)
      }}
    >
      <DialogContent className="max-w-(--container-sm)">
        <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col" noValidate>
          <DialogHeader>
            <DialogTitle>{copy.title}</DialogTitle>
            <DialogDescription>{copy.description}</DialogDescription>
          </DialogHeader>
          <DialogBody className="space-y-md">
            <Field id="pw-current" label={copy.current} error={errors.current}>
              <Input
                id="pw-current"
                type="password"
                autoComplete="current-password"
                autoFocus
                value={current}
                onChange={(e) => setCurrent(e.target.value)}
                aria-invalid={!!errors.current}
              />
            </Field>
            <Field id="pw-new" label={copy.next} error={errors.next} hint={copy.hint}>
              <Input
                id="pw-new"
                type="password"
                autoComplete="new-password"
                value={next}
                onChange={(e) => setNext(e.target.value)}
                aria-invalid={!!errors.next}
              />
            </Field>
            {next && (
              <div className="space-y-1" aria-live="polite">
                <div className="flex gap-1" aria-hidden="true">
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className={cn(
                        'h-1 flex-1 rounded-full',
                        i < score
                          ? score <= 1
                            ? 'bg-danger'
                            : score <= 2
                              ? 'bg-warning'
                              : 'bg-success'
                          : 'bg-surface-muted'
                      )}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted">{copy.strength[Math.max(score - 1, 0)]}</p>
              </div>
            )}
            <Field id="pw-confirm" label={copy.confirm} error={errors.confirm}>
              <Input
                id="pw-confirm"
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                aria-invalid={!!errors.confirm}
              />
            </Field>
          </DialogBody>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>
              {t.common.cancel}
            </Button>
            <Button type="submit">{copy.submit}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
