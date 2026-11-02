export type Screen =
  | 'dashboard'
  | 'transactions'
  | 'accounts'
  | 'investments'
  | 'ai-assistant'
  | 'settings'
  | 'notifications'
  | 'budgets'
  | 'bills'
  | 'account-detail'
  | 'card-detail'
  | 'investment-detail'

export const SCREENS: readonly Screen[] = [
  'dashboard',
  'transactions',
  'accounts',
  'investments',
  'ai-assistant',
  'settings',
  'notifications',
  'budgets',
  'bills',
  'account-detail',
  'card-detail',
  'investment-detail',
]

export interface Route {
  screen: Screen
  /** Entity id for detail screens (account, card, investment), optionally with a sub-path */
  id?: string
}

export type NavigateFn = (screen: Screen, id?: string) => void

/** Detail screens highlight their parent entry in the sidebar */
export const parentScreen: Partial<Record<Screen, Screen>> = {
  'account-detail': 'accounts',
  'card-detail': 'accounts',
  'investment-detail': 'investments',
}

export function routeToHash({ screen, id }: Route) {
  return `#/${screen}${id ? `/${id}` : ''}`
}

export function hashToRoute(hash: string): Route {
  // The id may carry a sub-path, e.g. "c1/settings" opens a card on its settings tab
  const [, screen, ...rest] = hash.replace(/^#/, '').split('/')
  const id = rest.join('/')
  if (SCREENS.includes(screen as Screen)) return { screen: screen as Screen, id: id || undefined }
  return { screen: 'dashboard' }
}
