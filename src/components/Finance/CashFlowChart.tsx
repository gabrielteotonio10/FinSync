import { useMemo, useState } from 'react'
import { HTML_LANG_MAP, useLanguage } from '@/i18n'
import { cn, formatCurrency } from '@/lib/utils'

export interface CashFlowPoint {
  month: string
  income: number
  expenses: number
}

interface CashFlowChartProps extends React.HTMLAttributes<HTMLDivElement> {
  data: CashFlowPoint[]
  height?: number
}

function niceMax(value: number) {
  const step = 10 ** Math.floor(Math.log10(value))
  return Math.ceil(value / step) * step
}

/**
 * Grouped column chart: income vs. expenses per month.
 * One axis, thin bars with a 2px gap, legend, hover/focus tooltip, sr-only table.
 */
export function CashFlowChart({ data, height = 220, className, ...props }: CashFlowChartProps) {
  const [active, setActive] = useState<number | null>(null)
  const { language, t } = useLanguage()

  const compact = useMemo(
    () => new Intl.NumberFormat(HTML_LANG_MAP[language], { notation: 'compact', maximumFractionDigits: 1 }),
    [language]
  )

  const series = [
    { key: 'income', label: t.finance.income, color: 'bg-chart-1' },
    { key: 'expenses', label: t.finance.expenses, color: 'bg-chart-2' },
  ] as const

  const max = niceMax(Math.max(...data.flatMap((d) => [d.income, d.expenses])))
  const ticks = [1, 0.75, 0.5, 0.25, 0]
  const last = data.length - 1

  return (
    <div className={cn('relative space-y-md', className)} {...props}>
      {/* Legend */}
      <div className="flex items-center gap-md text-xs text-muted" aria-hidden="true">
        {series.map((s) => (
          <span key={s.key} className="inline-flex items-center gap-1.5">
            <span className={cn('size-2.5 rounded-[3px]', s.color)} />
            {s.label}
          </span>
        ))}
      </div>

      <div className="flex gap-sm" aria-hidden="true">
        {/* Y axis */}
        <div className="relative w-10 shrink-0 text-right text-[11px] text-subtle" style={{ height }}>
          {ticks.map((tTick) => (
            <span
              key={tTick}
              className="absolute right-0 -translate-y-1/2 tabular-nums"
              style={{ top: `${(1 - tTick) * 100}%` }}
            >
              {compact.format(max * tTick)}
            </span>
          ))}
        </div>

        <div className="min-w-0 flex-1">
          {/* Plot */}
          <div className="relative" style={{ height }}>
            {/* Gridlines */}
            {ticks.map((tTick) => (
              <div
                key={tTick}
                className="absolute inset-x-0 border-t border-border"
                style={{ top: `${(1 - tTick) * 100}%` }}
              />
            ))}

            {/* Columns */}
            <div className="absolute inset-0 flex">
              {data.map((d, i) => {
                const monthLabel = t.months[d.month] ?? d.month
                return (
                  <div
                    key={d.month}
                    tabIndex={0}
                    className="group relative flex flex-1 items-end justify-center outline-none"
                    onMouseEnter={() => setActive(i)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                  >
                    {/* Hover band (hit target larger than the marks) */}
                    <div
                      className={cn(
                        'absolute inset-x-1 inset-y-0 rounded-sm transition-colors',
                        active === i && 'bg-surface-muted/70'
                      )}
                    />

                    <div className="relative flex h-full w-full max-w-14 items-end justify-center gap-[2px]">
                      {series.map((s) => {
                        const value = d[s.key]
                        return (
                          <div key={s.key} className="relative flex h-full w-full max-w-6 items-end">
                            <div
                              className={cn('w-full rounded-t-[4px] transition-opacity', s.color, active !== null && active !== i && 'opacity-40')}
                              style={{ height: `${(value / max) * 100}%` }}
                            />
                          </div>
                        )
                      })}
                    </div>

                    {/* Tooltip */}
                    {active === i && (
                      <div
                        className={cn(
                          'pointer-events-none absolute top-0 z-10 w-44 rounded-sm border border-border bg-surface p-sm text-xs shadow-lg',
                          i >= data.length - 2 ? 'right-full mr-1' : 'left-full ml-1'
                        )}
                      >
                        <p className="mb-1.5 font-medium text-foreground">{monthLabel}</p>
                        {series.map((s) => (
                          <div key={s.key} className="flex items-center justify-between gap-sm py-0.5">
                            <span className="inline-flex items-center gap-1.5 text-muted">
                              <span className={cn('size-2 rounded-[2px]', s.color)} />
                              {s.label}
                            </span>
                            <span className="font-medium tabular-nums text-foreground">
                              {formatCurrency(d[s.key])}
                            </span>
                          </div>
                        ))}
                        <div className="mt-1 flex justify-between border-t border-border pt-1">
                          <span className="text-muted">{t.finance.net}</span>
                          <span className="font-semibold tabular-nums text-foreground">
                            {formatCurrency(d.income - d.expenses)}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* X axis */}
          <div className="mt-sm flex text-[11px] text-subtle">
            {data.map((d, i) => (
              <span
                key={d.month}
                className={cn('flex-1 text-center', i === last && 'font-medium text-foreground')}
              >
                {t.months[d.month] ?? d.month}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Accessible table view */}
      <table className="sr-only">
        <caption>{t.finance.monthlyIncomeAndExpenses}</caption>
        <thead>
          <tr>
            <th scope="col">{t.finance.month}</th>
            <th scope="col">{t.finance.income}</th>
            <th scope="col">{t.finance.expenses}</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.month}>
              <th scope="row">{t.months[d.month] ?? d.month}</th>
              <td>{formatCurrency(d.income)}</td>
              <td>{formatCurrency(d.expenses)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
