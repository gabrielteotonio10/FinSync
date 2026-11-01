import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

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
    const expiryDisplay = `${String(expiryMonth).padStart(2, '0')}/${expiryYear % 100}`

    return (
      <div
        ref={ref}
        className={cn(
          'w-full max-w-sm rounded-xl p-lg text-white shadow-lg',
          'bg-gradient-to-br from-[var(--semantic-light-color-action-primary)] to-[var(--semantic-light-color-action-primary-hover)]',
          'aspect-video flex flex-col justify-between',
          className
        )}
        {...props}
      >
        {/* Top: Issuer */}
        <div className="flex justify-between items-start">
          <span className="text-sm font-semibold opacity-75">{cardIssuer}</span>
          <span className="text-sm">💳</span>
        </div>

        {/* Middle: Card Number (Last 4) */}
        <div className="flex items-center gap-md">
          <div className="flex gap-sm">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-xs">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="w-2 h-2 rounded-full bg-white opacity-40" />
                ))}
              </div>
            ))}
          </div>
          <span className="text-lg font-mono font-bold">{cardNumber}</span>
        </div>

        {/* Bottom: Cardholder & Expiry */}
        <div className="flex justify-between items-end">
          <div>
            <p className="text-xs opacity-75">Cardholder</p>
            <p className="font-semibold text-sm">{cardholderName}</p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-75">Expiry</p>
            <p className="font-mono text-sm">{expiryDisplay}</p>
          </div>
        </div>
      </div>
    )
  }
)

CreditCard.displayName = 'CreditCard'

export { CreditCard }
