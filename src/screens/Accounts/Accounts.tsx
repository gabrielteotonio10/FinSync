import { Card, CardContent, CardHeader, Container, Section, Button, Grid } from '@/components'
import { MonetaryValue } from '@/components'
import { H1, H2, Body, Small } from '@/components/Typography/Typography'
import { Plus } from 'lucide-react'

export function AccountsScreen() {
  return (
    <Container className="space-y-lg">
      {/* Header */}
      <Section>
        <div className="flex justify-between items-start">
          <div>
            <H1>Accounts</H1>
            <Body className="text-[var(--semantic-light-color-text-secondary)]">
              Manage your bank accounts and digital wallets.
            </Body>
          </div>
          <Button variant="primary" className="gap-md">
            <Plus className="w-4 h-4" />
            Add Account
          </Button>
        </div>
      </Section>

      {/* Summary */}
      <Card>
        <CardContent className="p-lg">
          <p className="text-sm font-medium text-[var(--semantic-light-color-text-secondary)]">
            Total Balance Across All Accounts
          </p>
          <MonetaryValue
            value={12450.5}
            type="neutral"
            className="mt-md text-2xl"
          />
        </CardContent>
      </Card>

      {/* Accounts Grid */}
      <Section>
        <H2>Your Accounts</H2>
        <Grid cols={2}>
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <h3 className="font-semibold">Checking Account</h3>
              <Small className="text-[var(--semantic-light-color-text-secondary)]">
                Bradesco • Ending in 1234
              </Small>
            </CardHeader>
            <CardContent className="space-y-md">
              <div>
                <p className="text-sm font-medium text-[var(--semantic-light-color-text-secondary)]">
                  Available Balance
                </p>
                <MonetaryValue value={8450.5} type="neutral" className="mt-xs" />
              </div>
              <div className="pt-md border-t border-[var(--semantic-light-color-border-default)]">
                <p className="text-xs text-[var(--semantic-light-color-text-secondary)]">
                  Last updated: 2 hours ago
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <h3 className="font-semibold">Savings Account</h3>
              <Small className="text-[var(--semantic-light-color-text-secondary)]">
                Nubank • Ending in 5678
              </Small>
            </CardHeader>
            <CardContent className="space-y-md">
              <div>
                <p className="text-sm font-medium text-[var(--semantic-light-color-text-secondary)]">
                  Available Balance
                </p>
                <MonetaryValue value={4000.0} type="neutral" className="mt-xs" />
              </div>
              <div className="pt-md border-t border-[var(--semantic-light-color-border-default)]">
                <p className="text-xs text-[var(--semantic-light-color-text-secondary)]">
                  Last updated: 5 hours ago
                </p>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Section>
    </Container>
  )
}
