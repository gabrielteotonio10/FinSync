import { Card, CardContent, CardHeader, Container, Section, Button, Input, Switch } from '@/components'
import { H1, H2, Small } from '@/components/Typography/Typography'
import { ChevronRight } from 'lucide-react'

export function SettingsScreen() {
  return (
    <Container className="space-y-lg max-w-2xl">
      {/* Header */}
      <Section>
        <H1>Settings</H1>
        <Small className="text-[var(--semantic-light-color-text-secondary)]">
          Manage your account and preferences.
        </Small>
      </Section>

      {/* Profile */}
      <Section>
        <H2>Profile</H2>
        <Card>
          <CardHeader>
            <h3 className="font-semibold">Personal Information</h3>
          </CardHeader>
          <CardContent className="space-y-md">
            <div>
              <label className="block text-sm font-medium mb-xs">Full Name</label>
              <Input defaultValue="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-xs">Email</label>
              <Input type="email" defaultValue="john@example.com" />
            </div>
            <Button variant="primary" className="mt-md">
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </Section>

      {/* Security */}
      <Section>
        <H2>Security</H2>
        <div className="space-y-md">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Change Password</h3>
                <Small className="text-[var(--semantic-light-color-text-secondary)]">
                  Update your password regularly
                </Small>
              </div>
              <ChevronRight className="w-5 h-5" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-lg flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Two-Factor Authentication</h3>
                <Small className="text-[var(--semantic-light-color-text-secondary)]">
                  Add an extra layer of security
                </Small>
              </div>
              <Switch />
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Preferences */}
      <Section>
        <H2>Preferences</H2>
        <Card>
          <CardContent className="space-y-md p-lg">
            <div className="flex justify-between items-center pb-md border-b border-[var(--semantic-light-color-border-default)]">
              <div>
                <h3 className="font-semibold">Currency</h3>
                <Small className="text-[var(--semantic-light-color-text-secondary)]">
                  Display amounts in
                </Small>
              </div>
              <select className="h-10 px-3 rounded-md border border-[var(--semantic-light-color-border-default)]">
                <option>R$ Brazilian Real</option>
                <option>US$ US Dollar</option>
                <option>€ Euro</option>
              </select>
            </div>

            <div className="flex justify-between items-center pb-md border-b border-[var(--semantic-light-color-border-default)]">
              <div>
                <h3 className="font-semibold">Notifications</h3>
                <Small className="text-[var(--semantic-light-color-text-secondary)]">
                  Receive email updates
                </Small>
              </div>
              <Switch />
            </div>

            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">Hide Balances</h3>
                <Small className="text-[var(--semantic-light-color-text-secondary)]">
                  Show masked values on dashboard
                </Small>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Danger Zone */}
      <Section>
        <H2>Danger Zone</H2>
        <Card className="border-red-200 dark:border-red-900">
          <CardContent className="p-lg">
            <p className="text-sm text-[var(--semantic-light-color-text-secondary)] mb-md">
              Deleting your account is permanent and cannot be undone. All your data will be lost.
            </p>
            <Button variant="destructive">Delete Account</Button>
          </CardContent>
        </Card>
      </Section>
    </Container>
  )
}
