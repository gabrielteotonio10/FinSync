import { ReactNode } from 'react'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Container,
  Input,
  PageHeader,
  Select,
  Switch,
} from '@/components'
import { user } from '@/data/mock'
import { cn } from '@/lib/utils'

interface SettingRowProps {
  id: string
  title: string
  description: string
  control: ReactNode
}

function SettingRow({ id, title, description, control }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between gap-lg px-lg py-md">
      <div className="space-y-0.5">
        <label htmlFor={id} className="text-sm font-medium">
          {title}
        </label>
        <p className="text-sm text-muted">{description}</p>
      </div>
      {control}
    </div>
  )
}

function Field({ id, label, className, ...props }: { id: string; label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <Input id={id} {...props} />
    </div>
  )
}

export function SettingsScreen() {
  return (
    <Container maxWidth="lg" className="space-y-xl">
      <PageHeader title="Settings" description="Manage your account and preferences." />

      {/* Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>This information is visible only to you.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-lg">
          <div className="flex items-center gap-md">
            <Avatar initials={user.initials} className="size-14 text-base" />
            <div className="flex gap-sm">
              <Button variant="secondary" size="sm">Change photo</Button>
              <Button variant="ghost" size="sm">Remove</Button>
            </div>
          </div>
          <div className="grid gap-md sm:grid-cols-2">
            <Field id="name" label="Full name" defaultValue={user.name} />
            <Field id="email" label="Email" type="email" defaultValue={user.email} />
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-sm">
          <Button variant="ghost">Cancel</Button>
          <Button>Save changes</Button>
        </CardFooter>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Keep your account protected.</CardDescription>
        </CardHeader>
        <div className="divide-y divide-border">
          <SettingRow
            id="password"
            title="Password"
            description="Last changed 3 months ago"
            control={
              <Button id="password" variant="secondary" size="sm">
                Update
              </Button>
            }
          />
          <SettingRow
            id="two-factor"
            title="Two-factor authentication"
            description="Add an extra layer of security to your account"
            control={<Switch id="two-factor" />}
          />
        </div>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Customize how FinSync works for you.</CardDescription>
        </CardHeader>
        <div className="divide-y divide-border">
          <SettingRow
            id="currency"
            title="Currency"
            description="Display amounts in"
            control={
              <Select id="currency" className="w-48">
                <option>R$ Brazilian Real</option>
                <option>US$ US Dollar</option>
                <option>€ Euro</option>
              </Select>
            }
          />
          <SettingRow
            id="notifications"
            title="Email notifications"
            description="Receive weekly summaries and alerts"
            control={<Switch id="notifications" defaultChecked />}
          />
          <SettingRow
            id="hide-balances"
            title="Hide balances"
            description="Mask values on the dashboard by default"
            control={<Switch id="hide-balances" />}
          />
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-danger/30">
        <CardHeader className="border-danger/20">
          <CardTitle className="text-danger">Danger zone</CardTitle>
          <CardDescription>Irreversible actions for your account.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-md sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-0.5">
            <p className="text-sm font-medium">Delete account</p>
            <p className="text-sm text-muted">
              Permanently remove your account and all of its data. This cannot be undone.
            </p>
          </div>
          <Button variant="destructive" className="shrink-0">
            Delete account
          </Button>
        </CardContent>
      </Card>
    </Container>
  )
}
