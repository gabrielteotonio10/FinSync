import { ReactNode, useCallback, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  MainLayout,
  Header,
  HeaderContent,
  HeaderTitle,
  HeaderActions,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
  Avatar,
  Button,
  AILogo,
  ConfirmDialog,
  GlobalSearch,
  NewTransactionDialog,
  NotificationsPopover,
  SyncBrandMark,
  SyncHeaderTrigger,
  SyncFloatingCompanion,
  ToastProvider,
  TransactionDetailSheet,
} from './components'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { DashboardScreen } from './screens/Dashboard/Dashboard'
import { TransactionsScreen } from './screens/Transactions/Transactions'
import { AccountsScreen } from './screens/Accounts/Accounts'
import { SettingsScreen } from './screens/Settings/Settings'
import { InvestmentsScreen } from './screens/Investments/Investments'
import { AIAssistantScreen } from './screens/AIAssistant/AIAssistant'
import { NotificationsScreen } from './screens/Notifications/Notifications'
import { BudgetsScreen } from './screens/Budgets/Budgets'
import { BillsScreen } from './screens/Bills/Bills'
import { AccountDetailScreen } from './screens/AccountDetail/AccountDetail'
import { CardDetailScreen } from './screens/CardDetail/CardDetail'
import { InvestmentDetailScreen } from './screens/InvestmentDetail/InvestmentDetail'
import { SignInScreen } from './screens/Auth/SignIn'
import { FinanceProvider } from './data/FinanceProvider'
import { user, type Transaction } from './data/mock'
import { useFinance } from './hooks/useFinance'
import { useToast } from './hooks/useToast'
import { LanguageProvider, useLanguage, type Language } from './i18n'
import { hashToRoute, parentScreen, routeToHash, type Route, type Screen } from './lib/navigation'
import {
  ArrowLeftRight,
  Bell,
  CalendarClock,
  LayoutDashboard,
  LogOut,
  PiggyBank,
  Settings,
  Target,
  Wallet,
} from 'lucide-react'

export type { Screen } from './lib/navigation'

type TipScreen = 'dashboard' | 'accounts' | 'investments' | 'transactions' | 'settings'

const companionTips: Record<Language, Record<TipScreen, string>> = {
  pt: {
    dashboard: 'Orçamento de Refeições em 125% — quer que eu recalibre?',
    accounts: 'Analisar patrimônio consolidado de R$ 42.614,90',
    investments: 'Revisar rentabilidade dos seus 6 ativos na carteira',
    transactions: 'Descobrir onde cortar gastos neste mês',
    settings: 'Simular meta de reserva de emergência com o Sync',
  },
  en: {
    dashboard: 'Dining budget is at 125% — want me to rebalance it?',
    accounts: 'Analyze your R$ 42.614,90 consolidated net worth',
    investments: 'Review performance across your 6 portfolio holdings',
    transactions: 'Find where you can cut spending this month',
    settings: 'Simulate an emergency fund goal with Sync',
  },
  es: {
    dashboard: 'Presupuesto de Comidas al 125% — ¿lo reequilibramos?',
    accounts: 'Analizar tu patrimonio consolidado de R$ 42.614,90',
    investments: 'Revisar el rendimiento de tus 6 activos en cartera',
    transactions: 'Descubrir dónde recortar gastos este mes',
    settings: 'Simular una meta de fondo de emergencia con Sync',
  },
}

/** Screens without their own tip borrow the closest main screen's */
const tipScreenFor = (screen: Screen): TipScreen => {
  const base = parentScreen[screen] ?? screen
  return (['dashboard', 'accounts', 'investments', 'transactions', 'settings'] as const).includes(base as TipScreen)
    ? (base as TipScreen)
    : 'dashboard'
}

function AppShell() {
  const [route, setRoute] = useState<Route>(() => hashToRoute(window.location.hash))
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null)
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)
  const [creatingTx, setCreatingTx] = useState(false)
  const [confirmLogout, setConfirmLogout] = useState(false)
  const [signedOut, setSignedOut] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const { language, t } = useLanguage()
  const { unreadCount } = useFinance()
  const { toast } = useToast()
  const currentScreen = route.screen

  const navigate = useCallback((screen: Screen, id?: string) => {
    const next = { screen, id }
    setRoute(next)
    const hash = routeToHash(next)
    if (window.location.hash !== hash) window.history.pushState(null, '', hash)
    document.querySelector('main')?.scrollTo?.({ top: 0 })
  }, [])

  // Browser back/forward and manually edited URLs
  useEffect(() => {
    const sync = () => setRoute(hashToRoute(window.location.hash))
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('hashchange', sync)
    }
  }, [])

  const openAIWithPrompt = useCallback(
    (prompt?: string) => {
      if (prompt) setPendingPrompt(prompt)
      navigate('ai-assistant')
    },
    [navigate]
  )

  // Global Cmd+K / Ctrl+K shortcut to jump straight to FinSync AI
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        navigate('ai-assistant')
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])

  const navigation: { id: Screen; label: string; icon: ReactNode }[] = [
    { id: 'dashboard', label: t.nav.dashboard, icon: <LayoutDashboard /> },
    { id: 'accounts', label: t.nav.accounts, icon: <Wallet /> },
    { id: 'investments', label: t.nav.investments, icon: <PiggyBank /> },
    { id: 'transactions', label: t.nav.transactions, icon: <ArrowLeftRight /> },
  ]

  const planning: { id: Screen; label: string; icon: ReactNode; badge?: string }[] = [
    { id: 'budgets', label: t.budgets.title, icon: <Target /> },
    { id: 'bills', label: t.bills.title, icon: <CalendarClock /> },
    {
      id: 'notifications',
      label: t.notifications.title,
      icon: <Bell />,
      badge: unreadCount ? String(unreadCount) : undefined,
    },
  ]

  const screenPromptMap: Record<TipScreen, string> = {
    dashboard: t.ai.suggestions[0],
    accounts: t.ai.suggestions[1],
    investments: t.ai.suggestions[3],
    transactions: t.ai.suggestions[0],
    settings: t.ai.suggestions[2],
  }

  const signOut = () => {
    setSignedOut(true)
    navigate('dashboard')
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return (
          <DashboardScreen
            onNavigate={navigate}
            onAskAI={openAIWithPrompt}
            onOpenTransaction={setSelectedTx}
            onNewTransaction={() => setCreatingTx(true)}
          />
        )
      case 'transactions':
        return <TransactionsScreen onOpenTransaction={setSelectedTx} onNewTransaction={() => setCreatingTx(true)} />
      case 'accounts':
        return <AccountsScreen onNavigate={navigate} onAskAI={openAIWithPrompt} />
      case 'investments':
        return <InvestmentsScreen onNavigate={navigate} onAskAI={openAIWithPrompt} />
      case 'ai-assistant':
        return (
          <AIAssistantScreen
            onNavigate={navigate}
            initialPrompt={pendingPrompt}
            onConsumeInitialPrompt={() => setPendingPrompt(null)}
          />
        )
      case 'settings':
        return (
          <SettingsScreen onNavigate={navigate} onSignOut={signOut} avatarUrl={avatarUrl} onAvatarChange={setAvatarUrl} />
        )
      case 'notifications':
        return <NotificationsScreen onNavigate={navigate} />
      case 'budgets':
        return <BudgetsScreen onAskAI={openAIWithPrompt} onOpenTransaction={setSelectedTx} />
      case 'bills':
        return <BillsScreen onNavigate={navigate} />
      case 'account-detail':
        return <AccountDetailScreen accountId={route.id} onNavigate={navigate} onOpenTransaction={setSelectedTx} />
      case 'card-detail':
        return <CardDetailScreen routeId={route.id} onNavigate={navigate} onAskAI={openAIWithPrompt} />
      case 'investment-detail':
        return <InvestmentDetailScreen investmentId={route.id} onNavigate={navigate} onAskAI={openAIWithPrompt} />
      default:
        return <DashboardScreen onNavigate={navigate} onAskAI={openAIWithPrompt} />
    }
  }

  const activeNav = parentScreen[currentScreen] ?? currentScreen

  const navItem = (id: Screen, label: string, icon: ReactNode, badge?: string) => (
    <SidebarMenuItem
      key={id}
      href={routeToHash({ screen: id })}
      icon={icon}
      label={label}
      active={activeNav === id}
      badge={badge}
      onClick={(e) => {
        e.preventDefault()
        navigate(id)
      }}
    />
  )

  if (signedOut) {
    return (
      <SignInScreen
        onSignIn={() => {
          setSignedOut(false)
          toast({ title: t.auth.welcomeBack(user.name.split(' ')[0]) })
        }}
      />
    )
  }

  return (
    <MainLayout
      header={
        <Header>
          <HeaderContent>
            <HeaderTitle>
              <GlobalSearch onNavigate={navigate} onOpenTransaction={setSelectedTx} />
            </HeaderTitle>
            <HeaderActions>
              <SyncHeaderTrigger active={currentScreen === 'ai-assistant'} onClick={() => navigate('ai-assistant')} />
              <NotificationsPopover onNavigate={navigate} />
              <ThemeSwitcher />
              <div className="ml-sm hidden h-6 w-px bg-border sm:block" />
              <button
                className="ml-xs flex items-center gap-sm rounded-sm p-1 transition-colors hover:bg-surface-muted"
                onClick={() => navigate('settings')}
                aria-label={t.header.openProfileSettings}
              >
                <Avatar src={avatarUrl ?? undefined} initials={user.initials} alt="" className="size-8 text-xs" />
              </button>
            </HeaderActions>
          </HeaderContent>
        </Header>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <SyncBrandMark onClick={() => navigate('dashboard')} />
          </SidebarHeader>
          <SidebarContent>
            <div>
              <SidebarLabel>{t.nav.overview}</SidebarLabel>
              <SidebarMenu>
                {navigation.map((n) => navItem(n.id, n.label, n.icon))}
                {navItem('ai-assistant', t.nav.aiAssistant, <AILogo className="size-5" />, t.nav.aiBadge)}
              </SidebarMenu>
            </div>
            <div>
              <SidebarLabel>{t.navExtra.planning}</SidebarLabel>
              <SidebarMenu>{planning.map((n) => navItem(n.id, n.label, n.icon, n.badge))}</SidebarMenu>
            </div>
            <div>
              <SidebarLabel>{t.nav.account}</SidebarLabel>
              <SidebarMenu>{navItem('settings', t.nav.settings, <Settings />)}</SidebarMenu>
            </div>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-sm">
              <Avatar src={avatarUrl ?? undefined} initials={user.initials} alt="" className="size-9 text-xs" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{user.name}</p>
                <p className="truncate text-xs text-muted">{user.email}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                aria-label={t.header.logOut}
                title={t.header.logOut}
                onClick={() => setConfirmLogout(true)}
              >
                <LogOut />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
      }
    >
      <motion.div
        key={`${currentScreen}/${route.id ?? ''}`}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="min-h-full"
      >
        {renderScreen()}
      </motion.div>

      {currentScreen !== 'ai-assistant' && (
        <SyncFloatingCompanion
          tip={companionTips[language][tipScreenFor(currentScreen)]}
          promptOnOpen={screenPromptMap[tipScreenFor(currentScreen)]}
          onOpenAI={openAIWithPrompt}
        />
      )}

      <TransactionDetailSheet
        key={selectedTx?.id}
        transaction={selectedTx}
        onOpenChange={(open) => !open && setSelectedTx(null)}
        onNavigate={navigate}
        onAskAI={openAIWithPrompt}
      />
      <NewTransactionDialog open={creatingTx} onOpenChange={setCreatingTx} />
      <ConfirmDialog
        open={confirmLogout}
        onOpenChange={setConfirmLogout}
        title={t.auth.logoutTitle}
        description={t.auth.logoutDescription}
        confirmLabel={t.header.logOut}
        onConfirm={signOut}
      />
    </MainLayout>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <ToastProvider>
        <FinanceProvider>
          <AppShell />
        </FinanceProvider>
      </ToastProvider>
    </LanguageProvider>
  )
}
