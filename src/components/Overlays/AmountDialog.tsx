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
import { useLanguage } from '@/i18n'
import { parseAmount } from '@/lib/utils'

interface AmountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  label: string
  submitLabel: string
  hint?: string
  initialValue?: number
  /** Returns an error message, or undefined when the value is acceptable */
  validate?: (value: number) => string | undefined
  onSubmit: (value: number) => void
}

/** Single money input dialog (apply/redeem, edit budget limit...) */
export function AmountDialog({
  open,
  onOpenChange,
  title,
  description,
  label,
  submitLabel,
  hint,
  initialValue,
  validate,
  onSubmit,
}: AmountDialogProps) {
  const { t } = useLanguage()
  const initial = initialValue ? initialValue.toFixed(2).replace('.', ',') : ''
  const [raw, setRaw] = useState(initial)
  const [error, setError] = useState<string>()

  const change = (next: boolean) => {
    if (!next) {
      setRaw(initial)
      setError(undefined)
    }
    onOpenChange(next)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const value = parseAmount(raw)
    const message = !(value > 0) ? t.newTransaction.amountInvalid : validate?.(value)
    setError(message)
    if (message) return
    onSubmit(value)
    change(false)
  }

  return (
    <Dialog open={open} onOpenChange={change}>
      <DialogContent className="max-w-(--container-sm)">
        <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col" noValidate>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <Field id="amount-dialog" label={label} error={error} hint={hint}>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-subtle">R$</span>
                <Input
                  id="amount-dialog"
                  autoFocus
                  inputMode="decimal"
                  placeholder="0,00"
                  className="pl-9 tabular-nums"
                  value={raw}
                  onChange={(e) => setRaw(e.target.value)}
                  aria-invalid={!!error}
                />
              </div>
            </Field>
          </DialogBody>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => change(false)}>
              {t.common.cancel}
            </Button>
            <Button type="submit">{submitLabel}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
