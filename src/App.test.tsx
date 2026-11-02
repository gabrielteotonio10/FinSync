import { act, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '@/App'

// Radix popovers measure their anchor with ResizeObserver, which jsdom lacks
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeEach(() => {
  window.localStorage.setItem('language', 'pt')
  window.history.replaceState(null, '', '/')
  vi.stubGlobal('ResizeObserver', ResizeObserverStub)
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

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

const goTo = (name: RegExp) => fireEvent.click(screen.getByRole('link', { name }))

describe('App navigation and new pages', () => {
  it('opens notifications from the bell, marks them as read and shows the full page', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /notificações \(3 não lidas\)/i }))
    expect(screen.getByText('Fatura Nubank vence em 2 dias')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: /marcar todas como lidas/i }))
    expect(screen.getByText('Tudo em dia')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: /ver todas as notificações/i }))
    expect(screen.getByRole('heading', { level: 1, name: 'Notificações' })).toBeTruthy()
    expect(window.location.hash).toBe('#/notifications')
  })

  it('opening a notification navigates to its target', () => {
    render(<App />)
    goTo(/^notificações/i)
    fireEvent.click(screen.getByRole('button', { name: /tesouro selic rendeu/i }))
    expect(screen.getByRole('heading', { level: 1, name: 'Tesouro Selic 2029' })).toBeTruthy()
    expect(screen.getByText('Características')).toBeTruthy()
  })

  it('creates a transaction and shows it in the list and in its detail sheet', () => {
    render(<App />)
    goTo(/transações/i)

    fireEvent.click(screen.getByRole('button', { name: /nova transação/i }))
    const dialog = screen.getByRole('dialog', { name: 'Nova transação' })

    // Validation
    fireEvent.click(within(dialog).getByRole('button', { name: /adicionar transação/i }))
    expect(within(dialog).getByText('Informe uma descrição')).toBeTruthy()

    fireEvent.change(within(dialog).getByLabelText('Descrição'), { target: { value: 'Padaria do bairro' } })
    fireEvent.change(within(dialog).getByLabelText('Valor'), { target: { value: '23,90' } })
    fireEvent.click(within(dialog).getByRole('button', { name: /adicionar transação/i }))

    expect(screen.queryByRole('dialog', { name: 'Nova transação' })).toBeNull()
    expect(screen.getByText('Transação adicionada')).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: /padaria do bairro/i }))
    const sheet = screen.getByRole('dialog', { name: 'Detalhes da transação' })
    expect(within(sheet).getByText('Padaria do bairro')).toBeTruthy()
    expect(within(sheet).getByText('Nubank Ultravioleta ·· 4242')).toBeTruthy()
  })

  it('navigates from the accounts list to an account detail page and back', () => {
    render(<App />)
    goTo(/^contas/i)

    fireEvent.click(screen.getByRole('button', { name: 'Conta Corrente' }))
    expect(screen.getByRole('heading', { level: 1, name: /conta corrente/i })).toBeTruthy()
    expect(screen.getByText('Dados da conta')).toBeTruthy()
    expect(window.location.hash).toBe('#/account-detail/a1')

    fireEvent.click(screen.getByRole('button', { name: /^contas$/i }))
    expect(screen.getByRole('heading', { level: 1, name: 'Contas' })).toBeTruthy()
  })

  it('manages a credit card: opens settings tab and locks the card', () => {
    render(<App />)
    goTo(/^contas/i)

    fireEvent.click(screen.getAllByRole('button', { name: 'Gerenciar cartão' })[0])
    expect(screen.getByRole('heading', { level: 1, name: 'Nubank Ultravioleta' })).toBeTruthy()

    fireEvent.click(screen.getByRole('button', { name: /bloquear cartão/i }))
    expect(screen.getAllByText('Bloqueado').length).toBeGreaterThan(0)
    expect((screen.getByRole('switch', { name: /compras online/i }) as HTMLButtonElement).disabled).toBe(true)
  })

  it('pays a bill and moves it to the paid tab', () => {
    render(<App />)
    goTo(/vencimentos/i)

    fireEvent.click(screen.getAllByRole('button', { name: 'Pagar' })[0])
    fireEvent.click(screen.getByRole('button', { name: /confirmar pagamento/i }))
    expect(screen.getByText('Pagamento realizado')).toBeTruthy()

    fireEvent.mouseDown(screen.getByRole('tab', { name: /pagas/i }))
    expect(screen.getByText('Paga')).toBeTruthy()
  })

  it('edits a budget limit', () => {
    render(<App />)
    goTo(/orçamentos/i)

    fireEvent.click(screen.getByRole('button', { name: /editar limite/i }))
    const dialog = screen.getByRole('dialog', { name: 'Limite de Mercado' })
    fireEvent.change(within(dialog).getByLabelText('Limite mensal'), { target: { value: '1200' } })
    fireEvent.click(within(dialog).getByRole('button', { name: 'Salvar' }))
    expect(screen.getByText('Limite atualizado')).toBeTruthy()
  })

  it('finds a transaction with the global search', () => {
    render(<App />)
    const search = screen.getByRole('combobox', { name: 'Buscar' })
    fireEvent.change(search, { target: { value: 'uber' } })
    expect(screen.getByRole('option', { name: /corrida uber/i })).toBeTruthy()
    fireEvent.keyDown(search, { key: 'Enter' })
    expect(screen.getByRole('dialog', { name: 'Detalhes da transação' })).toBeTruthy()
  })

  it('logs out after confirmation and signs back in', () => {
    vi.useFakeTimers()
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Sair' }))
    fireEvent.click(within(screen.getByRole('alertdialog')).getByRole('button', { name: 'Sair' }))
    expect(screen.getByRole('heading', { name: 'Entrar no FinSync' })).toBeTruthy()

    fireEvent.change(screen.getByLabelText('Senha'), { target: { value: 'demo' } })
    fireEvent.click(screen.getByRole('button', { name: 'Entrar' }))
    act(() => {
      vi.advanceTimersByTime(700)
    })
    expect(screen.getByRole('heading', { name: /bem-vindo de volta/i })).toBeTruthy()
  })
})
