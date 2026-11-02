import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from '@/App'
import { LanguageProvider } from '@/i18n'
import { SettingsScreen } from './Settings'

describe('Settings language selector', () => {
  beforeEach(() => {
    window.localStorage.clear()
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

  it('renders Portuguese, English, and Spanish options in Settings', () => {
    render(
      <LanguageProvider defaultLanguage="pt">
        <SettingsScreen />
      </LanguageProvider>
    )

    const select = screen.getByLabelText('Idioma') as HTMLSelectElement
    expect(select).toBeTruthy()
    expect(select.value).toBe('pt')

    const options = Array.from(select.options).map((o) => ({ value: o.value, text: o.text }))
    expect(options).toEqual([
      { value: 'pt', text: 'Português' },
      { value: 'en', text: 'Inglês' },
      { value: 'es', text: 'Espanhol' },
    ])
  })

  it('switches language between Portuguese, English, and Spanish and persists selection', () => {
    render(
      <LanguageProvider defaultLanguage="pt">
        <SettingsScreen />
      </LanguageProvider>
    )

    expect(screen.getByRole('heading', { name: 'Configurações' })).toBeTruthy()
    expect(document.documentElement.lang).toBe('pt-BR')

    // Switch to English
    fireEvent.change(screen.getByLabelText('Idioma'), { target: { value: 'en' } })
    expect(screen.getByRole('heading', { name: 'Settings' })).toBeTruthy()
    expect((screen.getByLabelText('Language') as HTMLSelectElement).value).toBe('en')
    expect(window.localStorage.getItem('language')).toBe('en')
    expect(document.documentElement.lang).toBe('en')

    // Switch to Spanish
    fireEvent.change(screen.getByLabelText('Language'), { target: { value: 'es' } })
    expect(screen.getByRole('heading', { name: 'Configuración' })).toBeTruthy()
    expect((screen.getByLabelText('Idioma') as HTMLSelectElement).value).toBe('es')
    expect(window.localStorage.getItem('language')).toBe('es')
    expect(document.documentElement.lang).toBe('es')

    // Switch back to Portuguese
    fireEvent.change(screen.getByLabelText('Idioma'), { target: { value: 'pt' } })
    expect(screen.getByRole('heading', { name: 'Configurações' })).toBeTruthy()
    expect(window.localStorage.getItem('language')).toBe('pt')
    expect(document.documentElement.lang).toBe('pt-BR')
  })

  it('updates the entire application UI when language is changed in Settings', () => {
    window.localStorage.setItem('language', 'pt')
    render(<App />)

    // Navigate to Settings from sidebar
    fireEvent.click(screen.getByRole('link', { name: /configurações/i }))
    expect(screen.getByRole('heading', { name: 'Configurações' })).toBeTruthy()

    // Change to Spanish
    fireEvent.change(screen.getByLabelText('Idioma'), { target: { value: 'es' } })
    expect(screen.getByRole('link', { name: /panel/i })).toBeTruthy()
    expect(screen.getByRole('link', { name: /cuentas/i })).toBeTruthy()
    expect(screen.getByRole('link', { name: /inversiones/i })).toBeTruthy()
    expect(screen.getByRole('link', { name: /transacciones/i })).toBeTruthy()

    // Navigate to Dashboard in Spanish
    fireEvent.click(screen.getByRole('link', { name: /panel/i }))
    expect(screen.getByRole('heading', { name: /bienvenido de nuevo/i })).toBeTruthy()

    // Navigate to Investments in Spanish
    fireEvent.click(screen.getByRole('link', { name: /inversiones/i }))
    expect(screen.getByRole('heading', { name: 'Inversiones' })).toBeTruthy()
    expect(screen.getAllByText('Renta Fija').length).toBeGreaterThan(0)
  })
})
