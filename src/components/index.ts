// Button
export { Button, buttonVariants } from './Button/Button'
export type { ButtonProps } from './Button/Button'

// Input
export { Input } from './Input/Input'
export type { InputProps } from './Input/Input'

// Select
export { Select } from './Select/Select'
export type { SelectProps } from './Select/Select'

// Card
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card/Card'

// Badge
export { Badge, badgeVariants } from './Badge/Badge'
export type { BadgeProps } from './Badge/Badge'

// Avatar
export { Avatar } from './Avatar/Avatar'

// Form Components
export { Checkbox } from './Checkbox/Checkbox'
export { Radio } from './Radio/Radio'
export { Switch } from './Switch/Switch'

// Typography
export { Display, H1, H2, H3, Body, Small, Muted } from './Typography/Typography'

// Spinner
export { Spinner, spinnerVariants } from './Spinner/Spinner'

// Theme
export { ThemeSwitcher } from './ThemeSwitcher'

// Brand & Mascot
export {
  SyncAvatar,
  SyncBrandMark,
  SyncMascot,
  SyncHeaderTrigger,
  SyncFloatingCompanion,
} from './Brand'
export type {
  MascotMood,
  MascotPose,
  SyncAvatarProps,
  SyncBrandMarkProps,
  SyncMascotProps,
} from './Brand'

// Finance Components
export { MonetaryValue } from './Finance/MonetaryValue'
export { TransactionItem } from './Finance/TransactionItem'
export { CreditCard } from './Finance/CreditCard'
export { BudgetCard } from './Finance/BudgetCard'
export { StatCard } from './Finance/StatCard'
export { CashFlowChart } from './Finance/CashFlowChart'
export type { CashFlowPoint } from './Finance/CashFlowChart'

// Layout Components
export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarFooter,
} from './Layout/Sidebar'
export { Header, HeaderContent, HeaderTitle, HeaderActions } from './Layout/Header'
export { Grid, Container, Section, PageHeader, SectionHeader } from './Layout/Grid'
export { MainLayout } from './Layout/MainLayout'

// Brand
export { AILogo } from './Brand/AILogo'

// Overlay primitives
export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from './Dialog/Dialog'
export { Popover, PopoverTrigger, PopoverContent, PopoverClose, MenuItem } from './Popover/Popover'
export { Tabs, TabsList, TabsTrigger, TabsContent } from './Tabs/Tabs'
export { ToastProvider } from './Toast/Toast'

// Forms & feedback
export { Field } from './Field/Field'
export { EmptyState } from './EmptyState/EmptyState'
export { ValueTrendChart } from './Finance/ValueTrendChart'

// App overlays (dialogs, sheets, popovers)
export { ConfirmDialog } from './Overlays/ConfirmDialog'
export { AmountDialog } from './Overlays/AmountDialog'
export { TransactionDetailSheet } from './Overlays/TransactionDetailSheet'
export { NewTransactionDialog } from './Overlays/NewTransactionDialog'
export { NewInvestmentDialog } from './Overlays/NewInvestmentDialog'
export { ConnectAccountDialog } from './Overlays/ConnectAccountDialog'
export { ChangePasswordDialog } from './Overlays/ChangePasswordDialog'
export { PayBillDialog } from './Overlays/PayBillDialog'
export type { PayableBill } from './Overlays/PayBillDialog'
export { NotificationItem } from './Overlays/NotificationItem'
export { NotificationsPopover } from './Overlays/NotificationsPopover'
export { GlobalSearch } from './Overlays/GlobalSearch'
export { TransferDialog } from './Overlays/TransferDialog'
export type { TransferMode } from './Overlays/TransferDialog'
