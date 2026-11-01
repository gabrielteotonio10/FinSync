import { ReactNode, useState } from 'react'
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
  Input,
} from './components'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { DashboardScreen } from './screens/Dashboard/Dashboard'
import { TransactionsScreen } from './screens/Transactions/Transactions'
import { AccountsScreen } from './screens/Accounts/Accounts'
import { SettingsScreen } from './screens/Settings/Settings'
import { user } from './data/mock'
import { ArrowLeftRight, Bell, LayoutDashboard, LogOut, Search, Settings, Wallet } from 'lucide-react'

export type Screen = 'dashboard' | 'transactions' | 'accounts' | 'settings'

const navigation: { id: Screen; label: string; icon: ReactNode }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard /> },
  { id: 'accounts', label: 'Accounts', icon: <Wallet /> },
  { id: 'transactions', label: 'Transactions', icon: <ArrowLeftRight /> },
]

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard')

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen onNavigate={setCurrentScreen} />
      case 'transactions':
        return <TransactionsScreen />
      case 'accounts':
        return <AccountsScreen />
      case 'settings':
        return <SettingsScreen />
      default:
        return <DashboardScreen onNavigate={setCurrentScreen} />
    }
  }

  const navItem = (id: Screen, label: string, icon: ReactNode) => (
    <SidebarMenuItem
      key={id}
      href="#"
      icon={icon}
      label={label}
      active={currentScreen === id}
      onClick={(e) => {
        e.preventDefault()
        setCurrentScreen(id)
      }}
    />
  )

  return (
    <MainLayout
      header={
        <Header>
          <HeaderContent>
            <HeaderTitle>
              <div className="relative hidden w-full max-w-(--container-xs) md:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
                <Input placeholder="Search..." className="bg-surface-muted/60 pl-9 shadow-none" aria-label="Search" />
              </div>
            </HeaderTitle>
            <HeaderActions>
              <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
                <Bell />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-danger ring-2 ring-surface" />
              </Button>
              <ThemeSwitcher />
              <div className="ml-sm hidden h-6 w-px bg-border sm:block" />
              <button
                className="ml-xs flex items-center gap-sm rounded-sm p-1 transition-colors hover:bg-surface-muted"
                onClick={() => setCurrentScreen('settings')}
                aria-label="Open profile settings"
              >
                <Avatar initials={user.initials} className="size-8 text-xs" />
              </button>
            </HeaderActions>
          </HeaderContent>
        </Header>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <div className="flex size-8 items-center justify-center rounded-sm bg-primary text-sm font-bold text-primary-foreground">
              F
            </div>
            <span className="text-lg font-semibold tracking-tight">FinSync</span>
          </SidebarHeader>
          <SidebarContent>
            <div>
              <SidebarLabel>Overview</SidebarLabel>
              <SidebarMenu>{navigation.map((n) => navItem(n.id, n.label, n.icon))}</SidebarMenu>
            </div>
            <div>
              <SidebarLabel>Account</SidebarLabel>
              <SidebarMenu>{navItem('settings', 'Settings', <Settings />)}</SidebarMenu>
            </div>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-sm">
              <Avatar initials={user.initials} className="size-9 text-xs" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{user.name}</p>
                <p className="truncate text-xs text-muted">{user.email}</p>
              </div>
              <Button variant="ghost" size="icon" aria-label="Log out" title="Log out">
                <LogOut />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {renderScreen()}
    </MainLayout>
  )
}
