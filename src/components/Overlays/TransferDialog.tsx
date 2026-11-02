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
import { Select } from '../Select/Select'
import { useFinance } from '@/hooks/useFinance'
import { useToast } from '@/hooks/useToast'
import { useLanguage } from '@/i18n'
import { formatCurrency, isoToShortDate, parseAmount, todayIso } from '@/lib/utils'

export type TransferMode = 'pix' | 'transfer'

interface TransferDialogProps {
  mode: TransferMode | null
  onOpenChange: (open: boolean) => void
}

/** Pix to a key, or transfer between the user's own accounts */
export function TransferDialog({ mode, onOpenChange }: TransferDialogProps) {
  const { t } = useLanguage()
  const { accounts, addTransaction } = useFinance()
  const { toast } = useToast()
  const copy = t.transfer

  const [fromId, setFromId] = useState(accounts[0]?.id ?? '')
  const [toId, setToId] = useState(accounts[1]?.id ?? '')
  const [pixKey, setPixKey] = useState('')
  const [amount, setAmount] = useState('')
  const [errors, setErrors] = useState<{ destination?: string; amount?: string }>({})

  if (!mode) return null

  const from = accounts.find((a) => a.id === fromId)
  const to = accounts.find((a) => a.id === toId)

  const reset = () => {
    setPixKey('')
    setAmount('')
    setErrors({})
  }

  const close = (next: boolean) => {
    if (!next) reset()
    onOpenChange(next)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const value = parseAmount(amount)
    const nextErrors = {
      destination:
        mode === 'pix'
          ? pixKey.trim().length >= 5
            ? undefined
            : copy.pixKeyInvalid
          : toId && toId !== fromId
            ? undefined
            : copy.sameAccount,
      amount: !(value > 0)
        ? t.newTransaction.amountInvalid
        : from && value > from.balance
          ? copy.insufficient(formatCurrency(from.balance))
          : undefined,
    }
    setErrors(nextErrors)
    if (nextErrors.destination || nextErrors.amount) return

    const destination = mode === 'pix' ? pixKey.trim() : `${to?.bank} ·· ${to?.last4}`
    const base = {
      category: 'Other',
      amount: value,
      status: 'completed' as const,
      date: isoToShortDate(todayIso()),
      time: new Date().toTimeString().slice(0, 5),
    }
    addTransaction({ ...base, type: 'expense', description: copy.sentTo(destination), accountId: fromId })
    if (mode === 'transfer') {
      addTransaction({ ...base, type: 'income', description: copy.receivedFrom(`${from?.bank} ·· ${from?.last4}`), accountId: toId })
    }
    toast({ title: mode === 'pix' ? copy.pixDone : copy.transferDone, description: `${destination} · ${formatCurrency(value)}` })
    close(false)
  }

  return (
    <Dialog open onOpenChange={close}>
      <DialogContent className="max-w-(--container-sm)">
        <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col" noValidate>
          <DialogHeader>
            <DialogTitle>{mode === 'pix' ? copy.pixTitle : copy.transferTitle}</DialogTitle>
            <DialogDescription>{mode === 'pix' ? copy.pixDescription : copy.transferDescription}</DialogDescription>
          </DialogHeader>
          <DialogBody className="space-y-md">
            <Field
              id="transfer-from"
              label={copy.from}
              hint={from ? copy.available(formatCurrency(from.balance)) : undefined}
            >
              <Select id="transfer-from" value={fromId} onChange={(e) => setFromId(e.target.value)}>
                {accounts.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.bank} ·· {a.last4}
                  </option>
                ))}
              </Select>
            </Field>
            {mode === 'pix' ? (
              <Field id="transfer-key" label={copy.pixKey} hint={copy.pixKeyHint} error={errors.destination}>
                <Input
                  id="transfer-key"
                  autoFocus
                  placeholder={copy.pixKeyPlaceholder}
                  value={pixKey}
                  onChange={(e) => setPixKey(e.target.value)}
                  aria-invalid={!!errors.destination}
                />
              </Field>
            ) : (
              <Field id="transfer-to" label={copy.to} error={errors.destination}>
                <Select id="transfer-to" value={toId} onChange={(e) => setToId(e.target.value)} aria-invalid={!!errors.destination}>
                  {accounts.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.bank} ·· {a.last4}
                    </option>
                  ))}
                </Select>
              </Field>
            )}
            <Field id="transfer-amount" label={t.newTransaction.amountLabel} error={errors.amount}>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-subtle">R$</span>
                <Input
                  id="transfer-amount"
                  inputMode="decimal"
                  placeholder="0,00"
                  className="pl-9 tabular-nums"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  aria-invalid={!!errors.amount}
                />
              </div>
            </Field>
          </DialogBody>
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => close(false)}>
              {t.common.cancel}
            </Button>
            <Button type="submit">{mode === 'pix' ? copy.sendPix : copy.submitTransfer}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
