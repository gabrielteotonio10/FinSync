import { useContext } from 'react'
import { FinanceContext, defaultCardSettings } from '@/data/context'

export function useFinance() {
  return useContext(FinanceContext)
}

/** Settings of a single card, falling back to the defaults */
export function useCardSettings(cardId: string) {
  const { cardSettings, updateCardSettings } = useFinance()
  return {
    settings: { ...defaultCardSettings, ...cardSettings[cardId] },
    update: (patch: Parameters<typeof updateCardSettings>[1]) => updateCardSettings(cardId, patch),
  }
}
