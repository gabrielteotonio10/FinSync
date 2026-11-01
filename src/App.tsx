import { useState } from 'react'
import {
  MainLayout,
  Header,
  HeaderContent,
  HeaderTitle,
  HeaderActions,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
  Button,
} from './components'
import { ThemeSwitcher } from './components/ThemeSwitcher'
import { DashboardScreen } from './screens/Dashboard/Dashboard'
import { TransactionsScreen } from './screens/Transactions/Transactions'
import { AccountsScreen } from './screens/Accounts/Accounts'
import { SettingsScreen } from './screens/Settings/Settings'
import { Home, Wallet, TrendingUp, Settings, LogOut, Bell } from 'lucide-react'

type Screen = 'dashboard' | 'transactions' | 'accounts' | 'settings'

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard')

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return <DashboardScreen />
      case 'transactions':
        return <TransactionsScreen />
      case 'accounts':
        return <AccountsScreen />
      case 'settings':
        return <SettingsScreen />
      default:
        return <DashboardScreen />
    }
  }

  return (
    <MainLayout
      header={
        <Header>
          <HeaderContent>
            <HeaderTitle>
              <h1 className="text-2xl font-bold">FinSync</h1>
            </HeaderTitle>
            <HeaderActions>
              <button className="p-md hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <ThemeSwitcher />
            </HeaderActions>
          </HeaderContent>
        </Header>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <h2 className="text-lg font-bold">Menu</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem
                href="#"
                icon={<Home className="w-4 h-4" />}
                label="Dashboard"
                active={currentScreen === 'dashboard'}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentScreen('dashboard')
                }}
              />
              <SidebarMenuItem
                href="#"
                icon={<Wallet className="w-4 h-4" />}
                label="Accounts"
                active={currentScreen === 'accounts'}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentScreen('accounts')
                }}
              />
              <SidebarMenuItem
                href="#"
                icon={<TrendingUp className="w-4 h-4" />}
                label="Transactions"
                active={currentScreen === 'transactions'}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentScreen('transactions')
                }}
              />
              <SidebarMenuItem
                href="#"
                icon={<Settings className="w-4 h-4" />}
                label="Settings"
                active={currentScreen === 'settings'}
                onClick={(e) => {
                  e.preventDefault()
                  setCurrentScreen('settings')
                }}
              />
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <Button variant="ghost" className="w-full justify-start">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {renderScreen()}
    </MainLayout>
  )
}
