import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Teach tailwind-merge the design-token spacing scale (p-md, gap-lg...)
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      spacing: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const numberFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatCurrency(value: number, prefix = 'R$ ') {
  return `${prefix}${numberFormatter.format(value)}`
}

const MONTH_KEYS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** "2026-11-05" → "Nov 5" (the raw format used by mock data and `t.formatShortDate`) */
export function isoToShortDate(iso: string) {
  const [, month, day] = iso.split('-').map(Number)
  if (!month || !day) return iso
  return `${MONTH_KEYS[month - 1]} ${day}`
}

/** Parses "1.234,56", "1234,56" or "1234.56" into a number (NaN when invalid) */
export function parseAmount(raw: string) {
  const cleaned = raw.replace(/[R$\s]/g, '')
  if (!cleaned) return NaN
  const normalized = cleaned.includes(',') ? cleaned.replace(/\./g, '').replace(',', '.') : cleaned
  return /^\d+(\.\d{1,2})?$/.test(normalized) ? Number(normalized) : NaN
}

/** Today's date as YYYY-MM-DD in local time (for date inputs) */
export function todayIso() {
  const now = new Date()
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}
