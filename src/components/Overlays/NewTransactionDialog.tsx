import { FormEvent, useState } from 'react'
import { Button } from '../Button/Button'
import { Checkbox } from '../Checkbox/Checkbox'
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
import { creditCards, expenseCategories, incomeCategories } from '@/data/mock'
import { useFinance } from '@/hooks/useFinance'
import { useToast } from '@/hooks/useToast'
import { useLanguage } from '@/i18n'
import { cn, formatCurrency, isoToShortDate, parseAmount, todayIso } from '@/lib/utils'

interface NewTransactionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type TxType = 'expense' | 'income'

export function NewTransactionDialog({ open, onOpenChange }: NewTransactionDialogProps) {
  const { t } = useLanguage()
  const { accounts, addTransaction } = useFinance()
  const { toast } = useToast()
  const copy = t.newTransaction

  const [type, setType] = useState<TxType>('expense')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(expenseCategories[0])
  const [date, setDate] = useState(todayIso())
  const [source, setSource] = useState(`card:${creditCards[0].id}`)
  const [settled, setSettled] = useState(true)
  const [note, setNote] = useState('')
  const [errors, setErrors] = useState<{ description?: string; amount?: string }>({})

  const reset = () => {
    setType('expense')
    setDescription('')
    setAmount('')
    setCategory(expenseCategories[0])
    setDate(todayIso())
    setSource(`card:${creditCards[0].id}`)
    setSettled(true)
    setNote('')
    setErrors({})
  }

  const changeType = (next: TxType) => {
    setType(next)
    setCategory(next === 'expense' ? expenseCategories[0] : incomeCategories[0])
    // Income can only land in a bank account
    if (next === 'income' && source.startsWith('card:')) setSource(`account:${accounts[0]?.id}`)
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const value = parseAmount(amount)
    const nextErrors = {
      description: description.trim() ? undefined : copy.descriptionRequired,
      amount: value > 0 ? undefined : copy.amountInvalid,
    }
    setErrors(nextErrors)
    if (nextErrors.description || nextErrors.amount) return

    const [kind, id] = source.split(':')
    addTransaction({
      description: description.trim(),
      amount: value,
      type,
      category,
      date: isoToShortDate(date),
      status: settled ? 'completed' : 'pending',
      accountId: kind === 'account' ? id : undefined,
      cardId: kind === 'card' ? id : undefined,
      time: new Date().toTimeString().slice(0, 5),
      note: note.trim() || undefined,
    })
    toast({ title: copy.created, description: `${description.trim()} · ${formatCurrency(value)}` })
    reset()
    onOpenChange(false)
  }

  const categories = type === 'expense' ? expenseCategories : incomeCategories

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) reset()
        onOpenChange(next)
      }}
    >
      <DialogContent>
        <form onSubmit={submit} className="flex min-h-0 flex-1 flex-col" noValidate>
          <DialogHeader>
            <DialogTitle>{copy.title}</DialogTitle>
            <DialogDescription>{copy.description}</DialogDescription>
          </DialogHeader>
          <DialogBody className="space-y-md">
            <div role="radiogroup" aria-label={copy.typeLabel} className="grid grid-cols-2 gap-1 rounded-sm bg-surface-muted p-1">
              {(['expense', 'income'] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  role="radio"
                  aria-checked={type === option}
                  onClick={() => changeType(option)}
                  className={cn(
                    'h-8 rounded-[6px] text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    type === option
                      ? cn('bg-surface shadow-sm', option === 'income' ? 'text-success' : 'text-danger')
                      : 'text-muted hover:text-foreground'
                  )}
                >
                  {option === 'expense' ? t.finance.expenses : t.finance.income}
                </button>
              ))}
            </div>

            <Field id="tx-description" label={copy.descriptionLabel} error={errors.description}>
              <Input
                id="tx-description"
                autoFocus
                placeholder={copy.descriptionPlaceholder}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                aria-invalid={!!errors.description}
                aria-describedby={errors.description ? 'tx-description-error' : undefined}
              />
            </Field>

            <div className="grid gap-md sm:grid-cols-2">
              <Field id="tx-amount" label={copy.amountLabel} error={errors.amount}>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-subtle">R$</span>
                  <Input
                    id="tx-amount"
                    inputMode="decimal"
                    placeholder="0,00"
                    className="pl-9 tabular-nums"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    aria-invalid={!!errors.amount}
                    aria-describedby={errors.amount ? 'tx-amount-error' : undefined}
                  />
                </div>
              </Field>
              <Field id="tx-date" label={copy.dateLabel}>
                <Input id="tx-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </Field>
            </div>

            <div className="grid gap-md sm:grid-cols-2">
              <Field id="tx-category" label={copy.categoryLabel}>
                <Select id="tx-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {t.categories[c] ?? c}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field id="tx-source" label={type === 'expense' ? copy.paidWithLabel : copy.receivedInLabel}>
                <Select id="tx-source" value={source} onChange={(e) => setSource(e.target.value)}>
                  {type === 'expense' && (
                    <optgroup label={copy.cardsGroup}>
                      {creditCards.map((c) => (
                        <option key={c.id} value={`card:${c.id}`}>
                          {c.name} ·· {c.last4}
                        </option>
                      ))}
                    </optgroup>
                  )}
                  <optgroup label={copy.accountsGroup}>
                    {accounts.map((a) => (
                      <option key={a.id} value={`account:${a.id}`}>
                        {a.bank} ·· {a.last4}
                      </option>
                    ))}
                  </optgroup>
                </Select>
              </Field>
            </div>

            <Field id="tx-note" label={copy.noteLabel}>
              <Input id="tx-note" placeholder={copy.notePlaceholder} value={note} onChange={(e) => setNote(e.target.value)} />
            </Field>

            <label className="flex items-center gap-sm text-sm">
              <Checkbox checked={settled} onChange={(e) => setSettled(e.target.checked)} />
              {type === 'expense' ? copy.alreadyPaid : copy.alreadyReceived}
            </label>
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
