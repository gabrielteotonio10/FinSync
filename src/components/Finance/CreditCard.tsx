import { forwardRef } from 'react'
import { useLanguage } from '@/i18n'
import { cn, formatCurrency } from '@/lib/utils'

interface CreditCardProps extends React.HTMLAttributes<HTMLDivElement> {
  cardholderName: string
  cardNumber: string // Last 4 digits: "4242"
  expiryMonth: number
  expiryYear: number
  cardIssuer?: string // "Visa", "Mastercard", etc.
  balance?: number
}

const CreditCard = forwardRef<HTMLDivElement, CreditCardProps>(
  (
    {
      cardholderName,
      cardNumber,
      expiryMonth,
      expiryYear,
      cardIssuer = 'Card',
      balance,
      className,
      ...props
    },
    ref
  ) => {
    const { t } = useLanguage()
    const expiryDisplay = `${String(expiryMonth).padStart(2, '0')}/${String(expiryYear % 100).padStart(2, '0')}`

    return (
      <div
        ref={ref}
        className={cn(
          'relative w-full max-w-(--container-sm) overflow-hidden rounded-lg p-lg text-white shadow-lg',
          'bg-linear-to-br from-[var(--primitives-color-primary-800)] via-[var(--primitives-color-primary-700)] to-[var(--primitives-color-primary-600)]',
          'flex aspect-[1.586] flex-col justify-between',
          className
        )}
        {...props}
      >
        {/* Decorative glow */}
        <div className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-10 size-48 rounded-full bg-[var(--primitives-color-primary-400)]/20 blur-2xl" />

        {/* Top: Issuer + balance */}
        <div className="relative flex items-start justify-between">
          <div>
            {balance !== undefined && (
              <>
                <p className="text-xs text-white/60">{t.finance.currentBalance}</p>
                <p className="text-xl font-semibold tabular-nums tracking-tight">
                  {formatCurrency(balance)}
                </p>
              </>
            )}
          </div>
          <span className="text-sm font-semibold italic tracking-wide text-white/90">{cardIssuer}</span>
        </div>

        {/* Middle: chip + number */}
        <div className="relative space-y-sm">
          <div className="h-7 w-10 rounded-[5px] bg-linear-to-br from-amber-200 to-amber-400 opacity-90" />
          <p className="font-mono text-base tracking-[0.12em] text-white/90">
            •••• •••• •••• {cardNumber}
          </p>
        </div>

        {/* Bottom: Cardholder & Expiry */}
        <div className="relative flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-white/60">{t.finance.cardholder}</p>
            <p className="text-sm font-medium">{cardholderName}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wider text-white/60">{t.finance.expires}</p>
            <p className="font-mono text-sm">{expiryDisplay}</p>
          </div>
        </div>
      </div>
    )
  }
)

CreditCard.displayName = 'CreditCard'

export { CreditCard }
