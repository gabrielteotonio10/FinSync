import { useState } from 'react'
import { ChevronRight, Landmark, Search, ShieldCheck } from 'lucide-react'
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
import { availableBanks } from '@/data/mock'
import { useFinance } from '@/hooks/useFinance'
import { useToast } from '@/hooks/useToast'
import { useLanguage } from '@/i18n'

interface ConnectAccountDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

/** Two-step Open Finance style flow: choose the institution, then confirm consent */
export function ConnectAccountDialog({ open, onOpenChange }: ConnectAccountDialogProps) {
  const { t } = useLanguage()
  const { addAccount } = useFinance()
  const { toast } = useToast()
  const copy = t.connectAccount

  const [query, setQuery] = useState('')
  const [bank, setBank] = useState<string | null>(null)
  const [kind, setKind] = useState('Checking')
  const [connecting, setConnecting] = useState(false)

  const reset = () => {
    setQuery('')
    setBank(null)
    setKind('Checking')
    setConnecting(false)
  }

  const close = (next: boolean) => {
    if (!next) reset()
    onOpenChange(next)
  }

  const connect = () => {
    if (!bank) return
    setConnecting(true)
    // Simulated institution handshake
    window.setTimeout(() => {
      addAccount({ bank, kind })
      toast({ title: copy.connected(bank), description: copy.connectedDescription })
      close(false)
    }, 900)
  }

  const results = availableBanks.filter((b) => b.toLowerCase().includes(query.trim().toLowerCase()))

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{bank ? copy.confirmTitle(bank) : copy.title}</DialogTitle>
          <DialogDescription>{bank ? copy.confirmDescription : copy.description}</DialogDescription>
        </DialogHeader>

        {!bank ? (
          <DialogBody className="space-y-md">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
              <Input
                autoFocus
                placeholder={copy.searchPlaceholder}
                aria-label={copy.searchPlaceholder}
                className="pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            {results.length > 0 ? (
              <ul className="divide-y divide-border rounded-md border border-border">
                {results.map((b) => (
                  <li key={b}>
                    <button
                      onClick={() => setBank(b)}
                      className="flex w-full items-center gap-sm px-md py-sm text-left text-sm transition-colors hover:bg-surface-muted focus-visible:bg-surface-muted focus-visible:outline-none"
                    >
                      <span className="flex size-8 items-center justify-center rounded-sm bg-primary-soft text-primary-soft-foreground">
                        <Landmark className="size-4" />
                      </span>
                      <span className="flex-1 font-medium">{b}</span>
                      <ChevronRight className="size-4 text-subtle" />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="py-lg text-center text-sm text-muted">{copy.noResults}</p>
            )}
          </DialogBody>
        ) : (
          <DialogBody className="space-y-md">
            <Field id="connect-kind" label={copy.kindLabel}>
              <Select id="connect-kind" value={kind} onChange={(e) => setKind(e.target.value)}>
                {['Checking', 'Savings', 'Brokerage'].map((k) => (
                  <option key={k} value={k}>
                    {t.accountKinds[k] ?? k}
                  </option>
                ))}
              </Select>
            </Field>
            <div className="space-y-sm rounded-md bg-surface-muted p-md text-sm">
              <p className="flex items-center gap-sm font-medium">
                <ShieldCheck className="size-4 text-success" />
                {copy.securityTitle}
              </p>
              <ul className="list-disc space-y-1 pl-lg text-muted">
                {copy.permissions.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </DialogBody>
        )}

        <DialogFooter>
          {bank ? (
            <>
              <Button variant="ghost" onClick={() => setBank(null)} disabled={connecting}>
                {t.common.back}
              </Button>
              <Button onClick={connect} isLoading={connecting}>
                {connecting ? copy.connecting : copy.submit}
              </Button>
            </>
          ) : (
            <Button variant="ghost" onClick={() => close(false)}>
              {t.common.cancel}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
