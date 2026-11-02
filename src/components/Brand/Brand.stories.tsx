import type { Meta, StoryObj } from '@storybook/react'
import { SyncAvatar, SyncBrandMark } from './SyncLogo'
import { SyncMascot } from './SyncMascotStage'

const meta: Meta<typeof SyncAvatar> = {
  title: 'Brand/Sync Mascot',
  component: SyncAvatar,
  tags: ['autodocs'],
}

export default meta

export const AvatarMoods: StoryObj<typeof SyncAvatar> = {
  render: () => (
    <div className="flex flex-wrap items-center gap-lg p-md">
      <div className="flex flex-col items-center gap-xs">
        <SyncAvatar size="lg" mood="idle" />
        <span className="text-xs text-muted">Idle (cursor tracking)</span>
      </div>
      <div className="flex flex-col items-center gap-xs">
        <SyncAvatar size="lg" mood="happy" />
        <span className="text-xs text-muted">Happy (hover / smile)</span>
      </div>
      <div className="flex flex-col items-center gap-xs">
        <SyncAvatar size="lg" mood="thinking" glow />
        <span className="text-xs text-muted">Thinking (AI active)</span>
      </div>
    </div>
  ),
}

export const BrandMark: StoryObj<typeof SyncBrandMark> = {
  render: () => (
    <div className="p-md">
      <SyncBrandMark subtitle="Smart Personal Finance" />
    </div>
  ),
}

export const FullBodyPoses: StoryObj<typeof SyncMascot> = {
  render: () => (
    <div className="flex flex-wrap items-end gap-2xl p-lg">
      <SyncMascot pose="wave" size="lg" speech="Olá! Eu sou o Sync!" />
      <SyncMascot pose="smart" size="lg" speech="Analisando sua carteira!" />
    </div>
  ),
}
