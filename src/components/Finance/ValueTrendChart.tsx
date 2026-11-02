import { useId, useState } from 'react'
import { cn, formatCurrency } from '@/lib/utils'

interface ValueTrendChartProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Values oldest → newest */
  values: number[]
  /** One label per value */
  labels: string[]
  /** Accessible name for the chart's data table */
  label: string
  height?: number
  /** Optional horizontal reference line (e.g. budget limit) */
  reference?: { value: number; label: string }
  tone?: 'primary' | 'success' | 'danger'
}

const toneColor = {
  primary: 'var(--color-primary)',
  success: 'var(--color-success)',
  danger: 'var(--color-danger)',
}

/** Single-series area/line chart with hover/focus tooltip and an sr-only table */
export function ValueTrendChart({
  values,
  labels,
  label,
  height = 180,
  reference,
  tone = 'primary',
  className,
  ...props
}: ValueTrendChartProps) {
  const [active, setActive] = useState<number | null>(null)
  const gradientId = useId()
  const width = 600
  const padY = 12

  const all = reference ? [...values, reference.value] : values
  const min = Math.min(...all)
  const max = Math.max(...all)
  const span = max - min || 1
  // Give the line breathing room above and below
  const lo = min - span * 0.15
  const hi = max + span * 0.15

  const x = (i: number) => (values.length === 1 ? width / 2 : (i / (values.length - 1)) * width)
  const y = (v: number) => padY + (1 - (v - lo) / (hi - lo)) * (height - padY * 2)

  const line = values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(v)}`).join(' ')
  const area = `${line} L${x(values.length - 1)},${height} L${x(0)},${height} Z`
  const color = toneColor[tone]
  const shown = active ?? values.length - 1

  return (
    <div className={cn('space-y-sm', className)} {...props}>
      <div className="relative" style={{ height }} aria-hidden="true">
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="size-full overflow-visible">
          <defs>
            <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.18" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1="0"
              x2={width}
              y1={height * f}
              y2={height * f}
              stroke="var(--color-border)"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {reference && (
            <line
              x1="0"
              x2={width}
              y1={y(reference.value)}
              y2={y(reference.value)}
              stroke="var(--color-danger)"
              strokeDasharray="6 4"
              vectorEffect="non-scaling-stroke"
            />
          )}
          <path d={area} fill={`url(#${gradientId})`} />
          <path d={line} fill="none" stroke={color} strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Points are HTML so they stay round regardless of the SVG aspect ratio */}
        {values.map((v, i) => (
          <span
            key={i}
            className={cn(
              'absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface transition-transform',
              shown === i ? 'scale-125' : 'scale-0'
            )}
            style={{ left: `${(x(i) / width) * 100}%`, top: y(v), background: color }}
          />
        ))}

        {reference && (
          <span
            className="absolute left-0 -translate-y-full pb-0.5 text-[11px] font-medium text-danger"
            style={{ top: y(reference.value) }}
          >
            {reference.label}
          </span>
        )}

        {/* Hover columns */}
        <div className="absolute inset-0 flex">
          {values.map((_, i) => (
            <div
              key={i}
              className="h-full flex-1"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            />
          ))}
        </div>

        <div
          className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-sm border border-border bg-surface px-2 py-1 text-xs shadow-md"
          style={{
            left: `${Math.min(Math.max((x(shown) / width) * 100, 12), 88)}%`,
          }}
        >
          <span className="text-muted">{labels[shown]} · </span>
          <span className="font-semibold tabular-nums">{formatCurrency(values[shown])}</span>
        </div>
      </div>

      <div className="flex justify-between text-[11px] text-subtle" aria-hidden="true">
        {labels.map((l, i) => (
          <span key={i} className={cn(shown === i && 'font-medium text-foreground')}>
            {l}
          </span>
        ))}
      </div>

      <table className="sr-only">
        <caption>{label}</caption>
        <tbody>
          {values.map((v, i) => (
            <tr key={i}>
              <th scope="row">{labels[i]}</th>
              <td>{formatCurrency(v)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
