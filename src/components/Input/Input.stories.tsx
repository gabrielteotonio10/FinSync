import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <label className="font-medium text-sm">Email</label>
      <Input type="email" placeholder="example@mail.com" />
    </div>
  ),
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password',
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
}

export const WithError: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Input type="email" placeholder="example@mail.com" />
      <p className="text-sm text-red-500">Invalid email address</p>
    </div>
  ),
}
