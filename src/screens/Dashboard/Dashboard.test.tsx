import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { DashboardScreen } from './Dashboard'
import { LanguageProvider } from '@/i18n'

describe('DashboardScreen - Seções Principais', () => {
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

  it('renderiza todas as partes principais solicitadas pelo usuário', () => {
    const onNavigate = vi.fn()
    const onAskAI = vi.fn()

    render(
      <LanguageProvider defaultLanguage="pt">
        <DashboardScreen onNavigate={onNavigate} onAskAI={onAskAI} />
      </LanguageProvider>
    )

    // 1. Saldo em cada conta e saldo total
    expect(screen.getByText('Saldo total')).toBeTruthy()
    expect(screen.getByText('Saldo em cada conta')).toBeTruthy()
    expect(screen.getByText(/Bradesco/i)).toBeTruthy()
    expect(screen.getByText(/Conta Poupança/i)).toBeTruthy()
    expect(screen.getAllByText(/XP Investimentos/i).length).toBeGreaterThanOrEqual(1)

    // 2. Faturas dos cartões
    expect(screen.getByText('Faturas dos cartões')).toBeTruthy()
    expect(screen.getByText('Nubank Ultravioleta')).toBeTruthy()
    expect(screen.getByText('XP Visa Infinite')).toBeTruthy()
    expect(screen.getAllByText('Fatura aberta').length).toBeGreaterThan(0)
    expect(screen.getByText(/Vence em 02 Dez/i)).toBeTruthy()
    expect(screen.getByText(/Vence em 10 Dez/i)).toBeTruthy()
    expect(screen.getAllByText('Pagar fatura').length).toBeGreaterThan(0)

    // 3. Gastos do mês
    expect(screen.getByText('Despesas mensais')).toBeTruthy()
    expect(screen.getByText('Fluxo de caixa')).toBeTruthy()
    expect(screen.getByText(/Média diária/i)).toBeTruthy()

    // 4. Gastos por categoria
    expect(screen.getByText('Gastos por categoria')).toBeTruthy()
    expect(screen.getByText('Mercado')).toBeTruthy()
    expect(screen.getByText('Transporte')).toBeTruthy()
    expect(screen.getByText('Lazer')).toBeTruthy()
    expect(screen.getByText('Refeições')).toBeTruthy()

    // 5. Transações recentes
    expect(screen.getByText('Transações recentes')).toBeTruthy()
    expect(screen.getByText('Mercado Central')).toBeTruthy()
    expect(screen.getByText('Corrida Uber')).toBeTruthy()
    expect(screen.getByText('Pizza Hut')).toBeTruthy()

    // 6. Outras coisas importantes: Ações Rápidas, Próximos Vencimentos, FinSync AI
    expect(screen.getByText('Área Pix')).toBeTruthy()
    expect(screen.getByText('Transferir')).toBeTruthy()
    expect(screen.getByText('Próximos vencimentos')).toBeTruthy()
    expect(screen.getByText('Conta de Luz (Enel)')).toBeTruthy()
    expect(screen.getByText('FinSync AI')).toBeTruthy()

    // Testar navegação
    fireEvent.click(screen.getByRole('button', { name: /ver todas/i }))
    expect(onNavigate).toHaveBeenCalledWith('transactions')
  })
})
