import { FormEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  Layers,
  PiggyBank,
  RotateCcw,
  Send,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import {
  Badge,
  Button,
  Card,
  Container,
  PageHeader,
  SyncAvatar,
  SyncMascot,
} from '@/components'
import { accounts, budgets, cashFlow, investments, user } from '@/data/mock'
import { useLanguage, type Language } from '@/i18n'
import { cn, formatCurrency } from '@/lib/utils'
import type { Screen } from '@/App'

interface AIAssistantScreenProps {
  onNavigate?: (screen: Screen) => void
  initialPrompt?: string | null
  onConsumeInitialPrompt?: () => void
}

type AnswerTopic = 'cut' | 'savings' | 'emergency' | 'investments' | 'netWorth' | 'fallback'

interface ChatEntry {
  id: string
  role: 'user' | 'assistant'
  text?: string
  topic?: AnswerTopic
}

const uiExtras: Record<
  Language,
  {
    copilotBadge: string
    newChat: string
    hoverSpeech: string
    idleSpeech: (name: string) => string
    netWorthPill: string
    savingsPill: string
    portfolioPill: string
    openDashboard: string
    openInvestments: string
    openAccounts: string
  }
> = {
  pt: {
    copilotBadge: 'Copiloto Financeiro',
    newChat: 'Nova conversa',
    hoverSpeech: 'Ótima pergunta — clique para analisar!',
    idleSpeech: (name) => `Oi, ${name}! Toque em mim ou escolha uma pergunta!`,
    netWorthPill: 'Patrimônio',
    savingsPill: 'Poupança',
    portfolioPill: 'Investido',
    openDashboard: 'Ver Orçamentos no Painel',
    openInvestments: 'Abrir Investimentos',
    openAccounts: 'Ver Contas e Patrimônio',
  },
  en: {
    copilotBadge: 'Financial Copilot',
    newChat: 'New chat',
    hoverSpeech: 'Great question — click to analyze!',
    idleSpeech: (name) => `Hi ${name}! Tap me or pick a question below!`,
    netWorthPill: 'Net worth',
    savingsPill: 'Savings rate',
    portfolioPill: 'Invested',
    openDashboard: 'View Budgets on Dashboard',
    openInvestments: 'Open Investments',
    openAccounts: 'View Accounts & Net Worth',
  },
  es: {
    copilotBadge: 'Copiloto Financiero',
    newChat: 'Nueva conversación',
    hoverSpeech: '¡Gran pregunta — haz clic para analizar!',
    idleSpeech: (name) => `¡Hola, ${name}! ¡Tócame o elige una pregunta!`,
    netWorthPill: 'Patrimonio',
    savingsPill: 'Tasa de ahorro',
    portfolioPill: 'Invertido',
    openDashboard: 'Ver Presupuestos en el Panel',
    openInvestments: 'Abrir Inversiones',
    openAccounts: 'Ver Cuentas y Patrimonio',
  },
}

const suggestionIcons: ReactNode[] = [
  <AlertTriangle key="cut" className="size-4 text-warning" />,
  <TrendingUp key="savings" className="size-4 text-success" />,
  <ShieldCheck key="emergency" className="size-4 text-[#15b2f7]" />,
  <Layers key="investments" className="size-4 text-primary" />,
]

function detectTopic(query: string): AnswerTopic {
  const q = query.toLowerCase()
  if (
    /cortar|corte|gasto|orcamento|orçamento|limite|cut|spend|budget|limit|recortar|presupuesto/.test(
      q
    )
  ) {
    return 'cut'
  }
  if (/poupanc|poupanç|taxa|saving|rate|ahorro|tasa/.test(q)) {
    return 'savings'
  }
  if (/emergenc|emergênc|reserva|meta|simul|fund|goal|fondo/.test(q)) {
    return 'emergency'
  }
  if (/invest|carteira|ativo|cdb|tesouro|fii|portfolio|holding|inversion/.test(q)) {
    return 'investments'
  }
  if (/patrimon|patrimôn|saldo|conta|total|worth|balance|account|cuenta/.test(q)) {
    return 'netWorth'
  }
  return 'fallback'
}

export function AIAssistantScreen({
  onNavigate,
  initialPrompt,
  onConsumeInitialPrompt,
}: AIAssistantScreenProps) {
  const { language, t } = useLanguage()
  const extra = uiExtras[language]
  const firstName = user.name.split(' ')[0]

  const [entries, setEntries] = useState<ChatEntry[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const endRef = useRef<HTMLDivElement>(null)

  const metrics = useMemo(() => {
    const balance = accounts.reduce((s, a) => s + a.balance, 0)
    const invested = investments.reduce((s, i) => s + i.current, 0)
    const monthlyGain = investments.reduce((s, i) => s + i.monthlyGain, 0)
    const netWorth = balance + invested
    const latest = cashFlow[cashFlow.length - 1]
    const netSavings = latest.income - latest.expenses
    const savingsPct = Math.round((netSavings / latest.income) * 100)
    const hotBudgets = [...budgets]
      .filter((b) => b.spent / b.limit >= 0.75)
      .sort((a, b) => b.spent / b.limit - a.spent / b.limit)
    const emergencyGoal = latest.expenses * 6
    const suggestedMonthly = Math.round(netSavings * 0.65)
    const emergencyMonths = Math.max(1, Math.ceil((emergencyGoal - 6412.35) / suggestedMonthly))

    return {
      balance,
      invested,
      monthlyGain,
      netWorth,
      latest,
      netSavings,
      savingsPct,
      hotBudgets,
      emergencyGoal,
      suggestedMonthly,
      emergencyMonths,
    }
  }, [])

  const sendQuestion = useCallback(
    (question: string) => {
      const trimmed = question.trim()
      if (!trimmed || isTyping) return

      const topic = detectTopic(trimmed)
      setEntries((prev) => [...prev, { id: `u-${Date.now()}`, role: 'user', text: trimmed }])
      setInput('')
      setIsTyping(true)

      setTimeout(() => {
        setEntries((prev) => [...prev, { id: `a-${Date.now()}`, role: 'assistant', topic }])
        setIsTyping(false)
      }, 650)
    },
    [isTyping]
  )

  useEffect(() => {
    if (initialPrompt) {
      sendQuestion(initialPrompt)
      onConsumeInitialPrompt?.()
    }
  }, [initialPrompt, onConsumeInitialPrompt, sendQuestion])

  useEffect(() => {
    if (entries.length > 0 || isTyping) {
      endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [entries, isTyping])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    sendQuestion(input)
  }

  const renderAssistantAnswer = (topic: AnswerTopic) => {
    switch (topic) {
      case 'cut': {
        const topCat = metrics.hotBudgets[0]
        const topCatName = topCat ? (t.categories[topCat.category] ?? topCat.category) : 'Dining'
        return (
          <div className="space-y-md">
            <p className="text-sm leading-relaxed text-foreground">{t.ai.answers.cutIntro}</p>
            <div className="space-y-sm">
              {metrics.hotBudgets.map((b) => {
                const pct = Math.round((b.spent / b.limit) * 100)
                const exceeded = pct >= 100
                const catLabel = t.categories[b.category] ?? b.category
                return (
                  <div
                    key={b.category}
                    className="rounded-md border border-border bg-surface-muted/45 p-sm"
                  >
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-foreground">{catLabel}</span>
                      <span className={cn('tabular-nums', exceeded ? 'text-danger' : 'text-warning')}>
                        {formatCurrency(b.spent)} {t.ai.answers.cutItemOf} {formatCurrency(b.limit)} ({pct}%)
                      </span>
                    </div>
                    <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                      <div
                        className={cn('h-full rounded-full', exceeded ? 'bg-danger' : 'bg-warning')}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            <p className="text-xs font-medium text-muted">{t.ai.answers.cutOutro(topCatName)}</p>
            {onNavigate && (
              <Button variant="secondary" size="sm" onClick={() => onNavigate('dashboard')}>
                {extra.openDashboard}
                <ArrowRight className="size-3.5" />
              </Button>
            )}
          </div>
        )
      }

      case 'savings': {
        const parts = t.ai.answers.savings(
          formatCurrency(metrics.latest.income),
          formatCurrency(metrics.latest.expenses),
          formatCurrency(metrics.netSavings),
          `${metrics.savingsPct}%`
        )
        return (
          <div className="space-y-md">
            <p className="text-sm leading-relaxed text-foreground">
              {parts.beforeNet}
              <strong className="font-semibold text-success tabular-nums">
                {formatCurrency(metrics.netSavings)}
              </strong>
              {parts.afterNetBeforePct}
              <strong className="font-semibold text-[#1877f2] dark:text-[#5cc4ff] tabular-nums">
                {metrics.savingsPct}%
              </strong>
              {parts.afterPct}
            </p>
            <div className="grid gap-sm sm:grid-cols-3">
              <div className="rounded-md border border-border bg-surface-muted/45 p-sm">
                <p className="text-[11px] text-muted">{t.finance.income}</p>
                <p className="text-base font-bold tabular-nums text-foreground">
                  {formatCurrency(metrics.latest.income)}
                </p>
              </div>
              <div className="rounded-md border border-border bg-surface-muted/45 p-sm">
                <p className="text-[11px] text-muted">{t.finance.expenses}</p>
                <p className="text-base font-bold tabular-nums text-foreground">
                  {formatCurrency(metrics.latest.expenses)}
                </p>
              </div>
              <div className="rounded-md border border-border bg-surface-muted/45 p-sm">
                <p className="text-[11px] text-muted">{t.dashboard.netSavings}</p>
                <p className="text-base font-bold tabular-nums text-success">
                  +{formatCurrency(metrics.netSavings)}
                </p>
              </div>
            </div>
          </div>
        )
      }

      case 'emergency': {
        return (
          <div className="space-y-md">
            <p className="text-sm leading-relaxed text-foreground">{t.ai.answers.emergencyIntro}</p>
            <div className="grid gap-sm sm:grid-cols-3">
              <div className="rounded-md border border-border bg-surface-muted/45 p-sm">
                <p className="text-[11px] text-muted">{t.ai.answers.emergencyGoalLabel}</p>
                <p className="text-base font-bold tabular-nums text-foreground">
                  {formatCurrency(metrics.emergencyGoal)}
                </p>
              </div>
              <div className="rounded-md border border-border bg-surface-muted/45 p-sm">
                <p className="text-[11px] text-muted">{t.ai.answers.emergencyMonthlyLabel}</p>
                <p className="text-base font-bold tabular-nums text-success">
                  {formatCurrency(metrics.suggestedMonthly)}
                </p>
              </div>
              <div className="rounded-md border border-border bg-surface-muted/45 p-sm">
                <p className="text-[11px] text-muted">{t.ai.answers.emergencyTimelineLabel}</p>
                <p className="text-base font-bold tabular-nums text-[#1877f2] dark:text-[#5cc4ff]">
                  {t.ai.answers.emergencyMonths(metrics.emergencyMonths)}
                </p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-muted">{t.ai.answers.emergencyTip}</p>
          </div>
        )
      }

      case 'investments': {
        const parts = t.ai.answers.investments(investments.length)
        const positive = metrics.monthlyGain >= 0
        return (
          <div className="space-y-md">
            <p className="text-sm leading-relaxed text-foreground">
              {parts.beforeTotal}
              <strong className="font-semibold tabular-nums text-foreground">
                {formatCurrency(metrics.invested)}
              </strong>
              {parts.afterTotalBeforeGain}
              <strong
                className={cn(
                  'font-semibold tabular-nums',
                  positive ? 'text-success' : 'text-danger'
                )}
              >
                {positive ? '+' : '−'}
                {formatCurrency(Math.abs(metrics.monthlyGain))}
              </strong>
              {parts.afterGain}
            </p>
            {onNavigate && (
              <Button variant="secondary" size="sm" onClick={() => onNavigate('investments')}>
                {extra.openInvestments}
                <ArrowRight className="size-3.5" />
              </Button>
            )}
          </div>
        )
      }

      case 'netWorth': {
        return (
          <div className="space-y-md">
            <p className="text-sm leading-relaxed text-foreground">
              {t.ai.answers.netWorth(
                formatCurrency(metrics.balance),
                formatCurrency(metrics.invested)
              )}
              <strong className="font-semibold tabular-nums text-foreground">
                {formatCurrency(metrics.netWorth)}
              </strong>
              .
            </p>
            {onNavigate && (
              <Button variant="secondary" size="sm" onClick={() => onNavigate('accounts')}>
                {extra.openAccounts}
                <ArrowRight className="size-3.5" />
              </Button>
            )}
          </div>
        )
      }

      default:
        return <p className="text-sm leading-relaxed text-foreground">{t.ai.answers.fallback}</p>
    }
  }

  return (
    <Container maxWidth="lg" className="flex min-h-full flex-col justify-between gap-lg">
      <div className="space-y-lg">
        <PageHeader
          title={t.ai.title}
          description={t.ai.description}
          actions={
            entries.length > 0 ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setEntries([])
                  setIsTyping(false)
                }}
              >
                <RotateCcw className="size-3.5" />
                {extra.newChat}
              </Button>
            ) : (
              <Badge variant="info">
                <Sparkles className="size-3" />
                {extra.copilotBadge}
              </Badge>
            )
          }
        />

        {/* Dynamic Mascot Showcase Card */}
        <Card className="relative overflow-hidden border-[#15b2f7]/25 bg-linear-to-br from-surface via-surface to-[#15b2f7]/[0.06]">
          <div className="flex flex-col items-center gap-lg p-lg sm:flex-row sm:items-center sm:p-xl">
            <SyncMascot
              pose={isTyping || hoveredIdx !== null || entries.length > 0 ? 'smart' : 'wave'}
              size="md"
              floating
              sparkles
              speech={
                hoveredIdx !== null
                  ? extra.hoverSpeech
                  : entries.length === 0
                    ? extra.idleSpeech(firstName)
                    : undefined
              }
              className="shrink-0"
            />

            <div className="min-w-0 flex-1 space-y-md text-center sm:text-left">
              <p className="text-sm leading-relaxed text-foreground sm:text-base">
                {t.ai.welcome(firstName)}
              </p>

              {/* Live synced financial context pills */}
              <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/90 px-3 py-1 text-xs text-muted">
                  <Wallet className="size-3.5 text-primary" />
                  {extra.netWorthPill}:{' '}
                  <strong className="font-semibold tabular-nums text-foreground">
                    {formatCurrency(metrics.netWorth)}
                  </strong>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/90 px-3 py-1 text-xs text-muted">
                  <PiggyBank className="size-3.5 text-success" />
                  {extra.savingsPill}:{' '}
                  <strong className="font-semibold tabular-nums text-success">
                    {metrics.savingsPct}%
                  </strong>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/90 px-3 py-1 text-xs text-muted">
                  <TrendingUp className="size-3.5 text-[#15b2f7]" />
                  {extra.portfolioPill}:{' '}
                  <strong className="font-semibold tabular-nums text-foreground">
                    {formatCurrency(metrics.invested)}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Suggested Prompt Cards */}
        <section aria-label={t.ai.suggestionsAria}>
          <div className="grid gap-sm sm:grid-cols-2">
            {t.ai.suggestions.map((suggestion, idx) => (
              <motion.button
                key={suggestion}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.99 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => sendQuestion(suggestion)}
                disabled={isTyping}
                className="group flex items-center justify-between gap-sm rounded-lg border border-border bg-surface p-md text-left text-sm font-medium text-foreground shadow-2xs transition-colors hover:border-[#15b2f7]/55 hover:bg-surface-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
              >
                <span className="flex items-center gap-sm">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-sm bg-surface-muted transition-colors group-hover:bg-[#15b2f7]/15">
                    {suggestionIcons[idx % suggestionIcons.length]}
                  </span>
                  <span>{suggestion}</span>
                </span>
                <ArrowUpRight className="size-4 shrink-0 text-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#15b2f7]" />
              </motion.button>
            ))}
          </div>
        </section>

        {/* Conversation Thread */}
        <AnimatePresence>
          {(entries.length > 0 || isTyping) && (
            <section
              aria-label={t.ai.conversationAria}
              aria-live="polite"
              className="space-y-md pt-sm"
            >
              {entries.map((entry) =>
                entry.role === 'user' ? (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end"
                  >
                    <div className="max-w-lg rounded-2xl rounded-br-xs bg-primary px-4 py-2.5 text-sm text-primary-foreground shadow-xs">
                      <span className="sr-only">{t.ai.youSr}</span>
                      {entry.text}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-sm"
                  >
                    <SyncAvatar size="sm" className="mt-0.5" />
                    <Card className="min-w-0 flex-1 border-border/90 p-md shadow-xs sm:p-lg">
                      {renderAssistantAnswer(entry.topic ?? 'fallback')}
                    </Card>
                  </motion.div>
                )
              )}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-sm"
                >
                  <SyncAvatar size="sm" mood="thinking" glow />
                  <div className="inline-flex items-center gap-2 rounded-2xl rounded-bl-xs border border-border bg-surface px-4 py-3 text-xs font-medium text-muted shadow-2xs">
                    <span>{t.ai.typingSr}</span>
                    <span className="inline-flex gap-1" aria-hidden="true">
                      <motion.span
                        className="size-1.5 rounded-full bg-[#15b2f7]"
                        animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="size-1.5 rounded-full bg-[#15b2f7]"
                        animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span
                        className="size-1.5 rounded-full bg-[#15b2f7]"
                        animate={{ opacity: [0.25, 1, 0.25], y: [0, -2, 0] }}
                        transition={{ duration: 0.9, repeat: Infinity, delay: 0.4 }}
                      />
                    </span>
                  </div>
                </motion.div>
              )}
              <div ref={endRef} />
            </section>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky Composer */}
      <div className="sticky bottom-0 z-10 bg-linear-to-t from-background via-background/95 to-transparent pt-sm">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-sm rounded-xl border border-border bg-surface p-2 shadow-md transition-colors focus-within:border-[#15b2f7]/60 focus-within:ring-3 focus-within:ring-[#15b2f7]/15"
        >
          <div className="hidden pl-1.5 sm:block">
            <SyncAvatar size="xs" trackMouse={false} />
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t.ai.inputPlaceholder}
            aria-label={t.ai.inputAria}
            className="h-9 flex-1 bg-transparent px-2 text-sm text-foreground outline-none placeholder:text-subtle"
          />
          <Button
            type="submit"
            size="sm"
            disabled={!input.trim() || isTyping}
            aria-label={t.ai.sendAria}
            className="rounded-lg px-3.5"
          >
            <Send className="size-3.5" />
          </Button>
        </form>
      </div>
    </Container>
  )
}
