import { useState } from 'react'
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
import { Select } from '../Select/Select'
import { useFinance } from '@/hooks/useFinance'
import { useToast } from '@/hooks/useToast'
import { useLanguage } from '@/i18n'
import { formatCurrency } from '@/lib/utils'

export interface PayableBill {
  id: string
  title: string
  amount: number
  dueDate: string
}

interface PayBillDialogProps {
  bill: PayableBill | null
  onOpenChange: (open: boolean) => void
}

export function PayBillDialog({ bill, onOpenChange }: PayBillDialogProps) {
  const { t } = useLanguage()
  const { accounts, payBill } = useFinance()
  const { toast } = useToast()
  const copy = t.payBill
  const [accountId, setAccountId] = useState(accounts[0]?.id ?? '')
  const account = accounts.find((a) => a.id === accountId)

  if (!bill) return null
  const insufficient = !!account && account.balance < bill.amount

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="max-w-(--container-sm)">
        <DialogHeader>
          <DialogTitle>{copy.title}</DialogTitle>
          <DialogDescription>{bill.title}</DialogDescription>
        </DialogHeader>
        <DialogBody className="space-y-md">
          <div className="rounded-md bg-surface-muted p-md text-center">
            <p className="text-xs font-medium text-muted">{copy.amount}</p>
            <p className="text-2xl font-semibold tabular-nums">{formatCurrency(bill.amount)}</p>
            <p className="text-xs text-muted">{copy.dueOn(bill.dueDate)}</p>
          </div>
          <Field
            id="pay-account"
            label={copy.fromAccount}
            error={insufficient ? copy.insufficient : undefined}
            hint={account ? copy.balanceAfter(formatCurrency(account.balance - bill.amount)) : undefined}
          >
            <Select id="pay-account" value={accountId} onChange={(e) => setAccountId(e.target.value)}>
              {accounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.bank} ·· {a.last4} — {formatCurrency(a.balance)}
                </option>
              ))}
            </Select>
          </Field>
        </DialogBody>
        <DialogFooter>
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            {t.common.cancel}
          </Button>
          <Button
            disabled={insufficient}
            onClick={() => {
              payBill(bill.id, accountId, bill.amount)
              toast({ title: copy.paid, description: `${bill.title} · ${formatCurrency(bill.amount)}` })
              onOpenChange(false)
            }}
          >
            {copy.submit}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
