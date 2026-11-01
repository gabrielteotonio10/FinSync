import type { Meta, StoryObj } from '@storybook/react'
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
  Container,
  Grid,
} from '.'
import { Avatar } from '../Avatar/Avatar'
import { Button } from '../Button/Button'
import { Card, CardContent } from '../Card/Card'
import { Input } from '../Input/Input'
import { ThemeSwitcher } from '../ThemeSwitcher'
import {
  Home,
  Wallet,
  TrendingUp,
  Settings,
  LogOut,
  Search,
  Bell,
} from 'lucide-react'

const meta: Meta = {
  title: 'Layouts/Main Layout',
  tags: ['autodocs'],
}

export default meta

export const Dashboard: StoryObj = {
  render: () => (
    <MainLayout
      header={
        <Header>
          <HeaderContent>
            <HeaderTitle>
              <h1 className="text-2xl font-bold">FinSync</h1>
            </HeaderTitle>
            <HeaderActions>
              <div className="hidden md:flex items-center gap-md flex-1 max-w-xs">
                <Search className="w-4 h-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  className="border-0 bg-gray-100 dark:bg-gray-900"
                />
              </div>
              <button className="p-md hover:bg-gray-100 dark:hover:bg-gray-900 rounded-md transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <ThemeSwitcher />
              <Avatar initials="JD" />
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
                active
              />
              <SidebarMenuItem
                href="#"
                icon={<Wallet className="w-4 h-4" />}
                label="Accounts"
              />
              <SidebarMenuItem
                href="#"
                icon={<TrendingUp className="w-4 h-4" />}
                label="Investments"
              />
              <SidebarMenuItem
                href="#"
                icon={<Settings className="w-4 h-4" />}
                label="Settings"
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
      <Container className="py-lg">
        <div className="space-y-lg">
          <div>
            <h2 className="text-2xl font-bold mb-md">Dashboard</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back to your financial overview
            </p>
          </div>

          <Grid cols={3}>
            <Card>
              <CardContent className="p-lg">
                <p className="text-sm font-medium text-gray-600">Total Balance</p>
                <p className="text-3xl font-bold mt-md">R$ 12,450.50</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-lg">
                <p className="text-sm font-medium text-gray-600">Monthly Income</p>
                <p className="text-3xl font-bold text-green-600 mt-md">R$ 5,250.00</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-lg">
                <p className="text-sm font-medium text-gray-600">Monthly Expenses</p>
                <p className="text-3xl font-bold text-red-600 mt-md">R$ 2,180.25</p>
              </CardContent>
            </Card>
          </Grid>

          <Card>
            <CardContent className="p-lg">
              <h3 className="font-bold mb-md">Recent Transactions</h3>
              <div className="space-y-sm text-sm text-gray-600">
                <div>Loading transactions...</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </MainLayout>
  ),
}
