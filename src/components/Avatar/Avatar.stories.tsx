import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from './Avatar'

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const WithInitials: Story = {
  args: {
    initials: 'JD',
  },
}

export const WithFallback: Story = {
  args: {
    fallback: 'John Doe',
  },
}

export const WithImage: Story = {
  args: {
    src: 'https://avatars.githubusercontent.com/u/1234567?v=4',
    alt: 'User avatar',
  },
}

export const Multiple: Story = {
  render: () => (
    <div className="flex gap-md">
      <Avatar initials="JD" />
      <Avatar initials="AB" />
      <Avatar fallback="Maria Silva" />
      <Avatar fallback="Carlos Santos" />
    </div>
  ),
}
