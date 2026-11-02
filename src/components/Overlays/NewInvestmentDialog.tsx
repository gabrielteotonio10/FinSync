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
import { investmentCategories, type Investment, type InvestmentCategory } from '@/data/mock'
import { useFinance } from '@/hooks/useFinance'
import { useToast } from '@/hooks/useToast'
import { useLanguage } from '@/i18n'
import { formatCurrency, parseAmount } from '@/lib/utils'

interface NewInvestmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const liquidityOptions: NonNullable<Investment['liquidity']>[] = ['daily', 'd2', 'd30', 'maturity']

export function NewInvestmentDialog({ open, onOpenChange }: NewInvestmentDialogProps) {
  const { t } = useLanguage()
  const { accounts, addInvestment } = useFinance()
  const { toast } = useToast()
  const copy = t.newInvestment

  const [name, setName] = useState('')
  const [category, setCategory] = useState<InvestmentCategory>('Renda Fixa')
  const [accountId, setAccountId] = useState(accounts[0]?.id ?? '')
  const [amount, setAmount] = useState('')
  const [rate, setRate] = useState('')
  const [liquidity, setLiquidity] = useState<NonNullable<Investment['liquidity']>>('daily')
  const [errors, setErrors] = useState<{ name?: string; amount?: string }>({})

  const account = accounts.find((a) => a.id === accountId)

  const reset = () => {
    setName('')
    setCategory('Renda Fixa')
    setAccountId(accounts[0]?.id ?? '')
    setAmount('')
    setRate('')
    setLiquidity('daily')
    setErrors({})
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const value = parseAmount(amount)
    const nextErrors = {
      name: name.trim() ? undefined : copy.nameRequired,
      amount: !(value > 0)
        ? t.newTransaction.amountInvalid
        : account && value > account.balance
          ? copy.insufficient(formatCurrency(account.balance))
          : undefined,
    }
    setErrors(nextErrors)
    if (nextErrors.name || nextErrors.amount) return

    addInvestment({
      name: name.trim(),
      category,
      accountId,
      applied: value,
      rate: rate.trim() || undefined,
      liquidity,
      risk: category === 'Renda Variável' ? 'high' : category === 'Fundos' ? 'medium' : 'low',
    })
    toast({ title: copy.created, description: `${name.trim()} · ${formatCurrency(value)}` })
    reset()
    onOpenChange(false)
  }

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
            <Field id="inv-name" label={copy.nameLabel} error={errors.name}>
              <Input
                id="inv-name"
                autoFocus
                placeholder={copy.namePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-invalid={!!errors.name}
              />
            </Field>
            <div className="grid gap-md sm:grid-cols-2">
              <Field id="inv-category" label={copy.categoryLabel}>
                <Select id="inv-category" value={category} onChange={(e) => setCategory(e.target.value as InvestmentCategory)}>
                  {investmentCategories.map((c) => (
                    <option key={c} value={c}>
                      {t.investmentCategories[c]}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field id="inv-account" label={copy.accountLabel}>
                <Select id="inv-account" value={accountId} onChange={(e) => setAccountId(e.target.value)}>
                  {accounts.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.bank}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
            <Field
              id="inv-amount"
              label={copy.amountLabel}
              error={errors.amount}
              hint={account ? copy.availableInAccount(formatCurrency(account.balance)) : undefined}
            >
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-subtle">R$</span>
                <Input
                  id="inv-amount"
                  inputMode="decimal"
                  placeholder="0,00"
                  className="pl-9 tabular-nums"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  aria-invalid={!!errors.amount}
                />
              </div>
            </Field>
            <div className="grid gap-md sm:grid-cols-2">
              <Field id="inv-rate" label={copy.rateLabel}>
                <Input id="inv-rate" placeholder={copy.ratePlaceholder} value={rate} onChange={(e) => setRate(e.target.value)} />
              </Field>
              <Field id="inv-liquidity" label={t.investmentDetail.liquidity}>
                <Select
                  id="inv-liquidity"
                  value={liquidity}
                  onChange={(e) => setLiquidity(e.target.value as NonNullable<Investment['liquidity']>)}
                >
                  {liquidityOptions.map((l) => (
                    <option key={l} value={l}>
                      {t.investmentDetail.liquidityLabels[l]}
                    </option>
                  ))}
                </Select>
              </Field>
            </div>
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
