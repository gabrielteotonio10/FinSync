import { useState } from 'react'
import { Check, Clock, Copy, CreditCard, Landmark, RotateCcw, Sparkles, Trash2, X } from 'lucide-react'
import { Badge } from '../Badge/Badge'
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
import { MonetaryValue } from '../Finance/MonetaryValue'
import { ConfirmDialog } from './ConfirmDialog'
import { categoryIcons, creditCards, type Transaction } from '@/data/mock'
import { useFinance } from '@/hooks/useFinance'
import { useToast } from '@/hooks/useToast'
import { useLanguage } from '@/i18n'
import type { NavigateFn } from '@/lib/navigation'
import { cn } from '@/lib/utils'

interface TransactionDetailSheetProps {
  transaction: Transaction | null
  onOpenChange: (open: boolean) => void
  onNavigate?: NavigateFn
  onAskAI?: (prompt?: string) => void
}

const statusConfig = {
  pending: { variant: 'warning', Icon: Clock },
  completed: { variant: 'success', Icon: Check },
  failed: { variant: 'error', Icon: X },
} as const

export function TransactionDetailSheet({
  transaction,
  onOpenChange,
  onNavigate,
  onAskAI,
}: TransactionDetailSheetProps) {
  const { t } = useLanguage()
  const { accounts, removeTransaction } = useFinance()
  const { toast } = useToast()
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (!transaction) return null

  const tx = transaction
  const copy = t.transactionDetail
  const description = t.transactionDescriptions[tx.id] ?? tx.description
  const category = t.categories[tx.category] ?? tx.category
  const account = accounts.find((a) => a.id === tx.accountId)
  const card = creditCards.find((c) => c.id === tx.cardId)
  const status = statusConfig[tx.status]

  const go: NavigateFn = (screen, id) => {
    onOpenChange(false)
    onNavigate?.(screen, id)
  }

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: copy.category, value: category },
    {
      label: copy.date,
      value: `${t.formatShortDate(tx.date)}${tx.time ? ` · ${tx.time}` : ''}`,
    },
    {
      label: tx.type === 'income' ? copy.receivedIn : copy.paidWith,
      value: card ? (
        <button className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline" onClick={() => go('card-detail', card.id)}>
          <CreditCard className="size-3.5" />
          {card.name} ·· {card.last4}
        </button>
      ) : account ? (
        <button className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline" onClick={() => go('account-detail', account.id)}>
          <Landmark className="size-3.5" />
          {account.bank} ·· {account.last4}
        </button>
      ) : (
        copy.notInformed
      ),
    },
    { label: copy.type, value: tx.type === 'income' ? t.finance.income : t.finance.expenses },
    {
      label: copy.transactionId,
      value: (
        <button
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted hover:text-foreground"
          onClick={() => {
            navigator.clipboard?.writeText(tx.id).catch(() => {})
            toast({ title: copy.idCopied, variant: 'info' })
          }}
          aria-label={copy.copyId}
        >
          {tx.id.toUpperCase()}
          <Copy className="size-3" />
        </button>
      ),
    },
  ]

  return (
    <>
      <Dialog open onOpenChange={onOpenChange}>
        <DialogContent side="right">
          <DialogHeader>
            <DialogTitle>{copy.title}</DialogTitle>
            <DialogDescription>{copy.description}</DialogDescription>
          </DialogHeader>
          <DialogBody className="space-y-lg">
            <div className="flex flex-col items-center gap-sm rounded-md bg-surface-muted px-md py-lg text-center">
              <div
                className={cn(
                  'flex size-12 items-center justify-center rounded-full [&_svg]:size-6',
                  tx.type === 'income' ? 'bg-success/10 text-success' : 'bg-surface text-muted'
                )}
              >
                {categoryIcons[tx.category] ?? categoryIcons.Other}
              </div>
              <p className="text-sm font-medium">{description}</p>
              <MonetaryValue
                value={tx.type === 'income' ? tx.amount : -tx.amount}
                type={tx.type}
                showSign
                className="text-3xl"
              />
              <Badge variant={status.variant}>
                <status.Icon />
                {t.statuses[tx.status]}
              </Badge>
            </div>

            {tx.status === 'failed' && (
              <div className="rounded-md border border-danger/30 bg-danger/5 p-md text-sm">
                <p className="font-medium text-danger">{copy.failedTitle}</p>
                <p className="mt-0.5 text-muted">{copy.failedDescription}</p>
              </div>
            )}

            <dl className="divide-y divide-border rounded-md border border-border">
              {rows.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-md px-md py-sm text-sm">
                  <dt className="text-muted">{row.label}</dt>
                  <dd className="text-right">{row.value}</dd>
                </div>
              ))}
            </dl>

            {tx.note && (
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted">{copy.note}</p>
                <p className="text-sm">{tx.note}</p>
              </div>
            )}

            {onAskAI && (
              <button
                onClick={() => {
                  onOpenChange(false)
                  onAskAI(copy.askPrompt(description))
                }}
                className="flex w-full items-center gap-sm rounded-md border border-[#15b2f7]/25 bg-linear-to-r from-[#2055f5]/[0.05] to-[#15b2f7]/[0.07] p-md text-left text-sm transition-colors hover:border-[#15b2f7]/50"
              >
                <Sparkles className="size-4 shrink-0 text-[#1877f2] dark:text-[#5cc4ff]" />
                <span className="flex-1">{copy.askSync}</span>
              </button>
            )}
          </DialogBody>
          <DialogFooter className="justify-between">
            <Button variant="ghost" className="text-danger hover:bg-danger/10 hover:text-danger" onClick={() => setConfirmDelete(true)}>
              <Trash2 />
              {copy.delete}
            </Button>
            {tx.status === 'failed' ? (
              <Button
                onClick={() => {
                  toast({ title: copy.retried, description: copy.retriedDescription, variant: 'info' })
                  onOpenChange(false)
                }}
              >
                <RotateCcw />
                {copy.retry}
              </Button>
            ) : (
              <Button variant="secondary" onClick={() => onOpenChange(false)}>
                {t.common.close}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title={copy.deleteTitle}
        description={copy.deleteDescription(description)}
        confirmLabel={copy.delete}
        destructive
        onConfirm={() => {
          removeTransaction(tx.id)
          onOpenChange(false)
          toast({ title: copy.deleted, description })
        }}
      />
    </>
  )
}
