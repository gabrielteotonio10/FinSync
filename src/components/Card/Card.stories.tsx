import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardContent, CardFooter } from './Card'
import { Button } from '../Button/Button'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <h3 className="font-semibold">Card Title</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm">This is a card component with multiple sections.</p>
      </CardContent>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <h3 className="font-semibold">Payment</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-md">Confirm your payment method</p>
        <p className="text-sm text-muted">Visa ending in 4242</p>
      </CardContent>
      <CardFooter className="flex gap-md">
        <Button variant="secondary" className="flex-1">
          Cancel
        </Button>
        <Button variant="primary" className="flex-1">
          Confirm
        </Button>
      </CardFooter>
    </Card>
  ),
}
