import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
  },
}

export const Success: Story = {
  args: {
    children: '✓ Active',
    variant: 'success',
  },
}

export const Error: Story = {
  args: {
    children: '✕ Error',
    variant: 'error',
  },
}

export const Warning: Story = {
  args: {
    children: '⚠ Warning',
    variant: 'warning',
  },
}

export const Info: Story = {
  args: {
    children: 'ℹ Info',
    variant: 'info',
  },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-md flex-wrap">
      <Badge variant="default">Default</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
}
