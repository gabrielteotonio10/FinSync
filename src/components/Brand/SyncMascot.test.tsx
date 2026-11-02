import { act, fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '@/App'
import { LanguageProvider } from '@/i18n'
import { SyncAvatar, SyncBrandMark } from './SyncLogo'
import { SyncMascot } from './SyncMascotStage'

describe('Sync Brand & Animated Mascot System', () => {
  beforeEach(() => {
    window.localStorage.clear()
    Element.prototype.scrollIntoView = vi.fn()
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    })
  })

  it('renders SyncAvatar and SyncBrandMark with the official live otter mark', () => {
    const onBrandClick = vi.fn()
    const { container } = render(
      <div>
        <SyncAvatar size="md" mood="thinking" glow />
        <SyncBrandMark subtitle="Smart Finance" onClick={onBrandClick} />
      </div>
    )

    expect(container.querySelectorAll('img[src="/brand/logo-mark-live.png"]').length).toBe(2)
    fireEvent.click(screen.getByRole('button', { name: /finsync/i }))
    expect(onBrandClick).toHaveBeenCalledTimes(1)
  })

  it('cycles localized speech reactions when clicking SyncMascot and calls onClick', () => {
    const handleClick = vi.fn()
    render(
      <LanguageProvider defaultLanguage="pt">
        <SyncMascot pose="wave" size="md" onClick={handleClick} />
      </LanguageProvider>
    )

    const mascotBtn = screen.getByRole('button', { name: /lontra mascote/i })
    fireEvent.click(mascotBtn)
    expect(screen.getByText(/3 contas sincronizadas/i)).toBeTruthy()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('opens FinSync AI from the global header button and answers suggested questions', () => {
    vi.useFakeTimers()
    window.localStorage.setItem('language', 'pt')
    render(<App />)

    // Click the Header FinSync AI button
    const headerButtons = screen.getAllByRole('button', { name: 'FinSync AI' })
    fireEvent.click(headerButtons[0])

    expect(screen.getByRole('heading', { name: 'FinSync AI' })).toBeTruthy()

    // Click a suggested question
    fireEvent.click(screen.getByRole('button', { name: /onde posso cortar gastos/i }))

    act(() => {
      vi.advanceTimersByTime(800)
    })

    expect(screen.getByText(/estas categorias estão perto ou acima do limite/i)).toBeTruthy()
    vi.useRealTimers()
  })

  it('renders Sync AI cards on Investments and navigates with recommendation prompt', () => {
    window.localStorage.setItem('language', 'pt')
    window.location.hash = '#/investments'
    render(<App />)

    expect(screen.getByText('Sync Portfolio AI')).toBeTruthy()
    expect(screen.getByText(/Rendimento acumulado em alta este mês/i)).toBeTruthy()

    // Clicking the CTA navigates to AI assistant
    fireEvent.click(screen.getByRole('button', { name: /pedir recomendação ao sync/i }))
    expect(screen.getByRole('heading', { name: 'FinSync AI' })).toBeTruthy()
  })

  it('allows switching Sync mascot moods in Settings screen', () => {
    window.localStorage.setItem('language', 'pt')
    window.location.hash = '#/settings'
    render(<App />)

    expect(screen.getByText('Sync — Mascote & Inteligência Artificial')).toBeTruthy()
    const happyBtn = screen.getByRole('button', { name: 'Feliz' })
    const thinkingBtn = screen.getByRole('button', { name: 'Pensando' })

    fireEvent.click(happyBtn)
    fireEvent.click(thinkingBtn)
  })
})
