import { pagesEn, pagesEs, pagesPt, type PagesTranslations } from './pages'

export type Language = 'pt' | 'en' | 'es'

export const SUPPORTED_LANGUAGES: readonly Language[] = ['pt', 'en', 'es'] as const

export const HTML_LANG_MAP: Record<Language, string> = {
  pt: 'pt-BR',
  en: 'en',
  es: 'es',
}

export function isSupportedLanguage(value: unknown): value is Language {
  return value === 'pt' || value === 'en' || value === 'es'
}

export function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    try {
      const stored = window.localStorage.getItem('language')
      if (isSupportedLanguage(stored)) {
        return stored
      }
    } catch {
      // Ignore storage access errors
    }

    const browserLang = window.navigator?.language?.toLowerCase() ?? ''
    if (browserLang.startsWith('pt')) return 'pt'
    if (browserLang.startsWith('es')) return 'es'
    if (browserLang.startsWith('en')) return 'en'
  }
  return 'pt'
}

interface BaseTranslations {
  common: {
    close: string
    notificationsRegion: string
  }
  nav: {
    overview: string
    account: string
    dashboard: string
    accounts: string
    investments: string
    transactions: string
    aiAssistant: string
    aiBadge: string
    settings: string
    toggleSidebar: string
  }
  header: {
    searchPlaceholder: string
    searchAria: string
    notifications: string
    openProfileSettings: string
    logOut: string
  }
  theme: {
    names: {
      light: string
      dark: string
      system: string
    }
    title: (themeName: string) => string
    toggleAria: (themeName: string) => string
  }
  categories: Record<string, string>
  transactionDescriptions: Record<string, string>
  months: Record<string, string>
  formatShortDate: (rawDate: string) => string
  statuses: {
    pending: string
    completed: string
    failed: string
  }
  accountKinds: Record<string, string>
  accountNames: Record<string, string>
  relativeTimes: Record<string, string>
  investmentCategories: {
    'Renda Fixa': string
    'Renda Variável': string
    Fundos: string
  }
  finance: {
    showValue: string
    hideValue: string
    ofLimit: (limit: string) => string
    budgetUsedAria: (category: string) => string
    left: (amount: string) => string
    approachingLimit: string
    overBudgetBy: (amount: string) => string
    income: string
    expenses: string
    net: string
    month: string
    monthlyIncomeAndExpenses: string
    currentBalance: string
    cardholder: string
    expires: string
  }
  dashboard: {
    welcomeBack: (name: string) => string
    description: string
    periodLabel: string
    addTransaction: string
    totalBalance: string
    vsLastMonth: string
    monthlyIncome: string
    sameAsLastMonth: string
    monthlyExpenses: string
    netSavings: string
    incomeSaved: (pct: string) => string
    cashFlowTitle: string
    cashFlowDescription: string
    thisMonthBadge: (amount: string) => string
    myCard: string
    budgetsTitle: string
    budgetsDescription: string
    recentTransactionsTitle: string
    recentTransactionsDescription: string
    viewAll: string
    quickActionsTitle: string
    quickActions: {
      pix: string
      payInvoice: string
      transfer: string
      newTransaction: string
    }
    accountsSection: {
      title: string
      description: string
      totalInAccounts: string
      manageAccounts: string
      connectAccount: string
    }
    cardsSection: {
      title: string
      description: string
      totalInvoices: string
      currentInvoice: string
      invoiceStatusOpen: string
      closesOn: (date: string) => string
      dueOn: (date: string) => string
      bestDay: (date: string) => string
      limitUsed: string
      limitAvailable: (amount: string) => string
      payInvoice: string
      viewDetails: string
      cardOptionsAria: (name: string) => string
    }
    monthlyExpensesSection: {
      title: string
      description: string
      dailyAverage: string
      dailyAverageHint: string
      savingsRate: string
    }
    categoryExpensesSection: {
      title: string
      description: string
      totalSpentInCategory: (amount: string) => string
    }
    upcomingBillsSection: {
      title: string
      description: string
      dueInDays: (days: number) => string
      dueSoon: string
      payNow: string
    }
    aiInsight: {
      title: string
      badge: string
      message: string
      action: string
    }
  }
  accounts: {
    title: string
    description: string
    addAccount: string
    totalNetWorth: string
    accountsSummary: (count: number) => string
    availableAccountBalance: string
    totalInvested: string
    bankAccounts: string
    accountOptionsAria: (name: string) => string
    availableBalance: string
    invested: string
    updated: (time: string) => string
    connectNewAccount: string
    creditCards: string
    statementSchedule: string
    used: string
    availableCredit: (amount: string) => string
    viewStatement: string
    manageCard: string
  }
  investments: {
    title: string
    description: string
    newInvestment: string
    totalInvested: string
    onApplied: (amount: string) => string
    earningsThisMonth: string
    vsStartOfMonth: string
    portfolioDistribution: string
    assetClassesLargest: (count: number) => string
    assetAllocation: string
    shareByCategory: string
    holdingsByInstitution: string
    filterByInstitution: string
    all: string
    institutionInvestmentsAria: (bank: string) => string
    holdingsCount: (count: number) => string
    appliedAmount: (amount: string) => string
  }
  transactions: {
    title: string
    description: string
    export: string
    addTransaction: string
    income: string
    expenses: string
    last30Days: string
    pending: string
    awaitingConfirmation: string
    searchPlaceholder: string
    searchAria: string
    filterByCategoryAria: string
    allCategories: string
    filterByStatusAria: string
    allStatuses: string
    noTransactionsFound: string
    tryDifferentSearch: string
    showingCount: (shown: number, total: number) => string
    clearFilters: string
  }
  ai: {
    title: string
    description: string
    conversationAria: string
    youSr: string
    typingSr: string
    suggestionsAria: string
    inputPlaceholder: string
    inputAria: string
    sendAria: string
    suggestions: string[]
    welcome: (firstName: string) => string
    answers: {
      cutIntro: string
      cutItemOf: string
      cutOutro: (category: string) => string
      savings: (income: string, expenses: string, net: string, pct: string) => {
        beforeNet: string
        afterNetBeforePct: string
        afterPct: string
      }
      emergencyIntro: string
      emergencyGoalLabel: string
      emergencyMonthlyLabel: string
      emergencyTimelineLabel: string
      emergencyMonths: (months: number) => string
      emergencyTip: string
      investments: (count: number) => {
        beforeTotal: string
        afterTotalBeforeGain: string
        afterGain: string
      }
      netWorth: (balance: string, invested: string) => string
      fallback: string
    }
  }
  settings: {
    title: string
    description: string
    profileTitle: string
    profileDescription: string
    changePhoto: string
    remove: string
    fullName: string
    email: string
    cancel: string
    saveChanges: string
    securityTitle: string
    securityDescription: string
    password: string
    passwordDescription: string
    update: string
    twoFactor: string
    twoFactorDescription: string
    preferencesTitle: string
    preferencesDescription: string
    language: string
    languageDescription: string
    languages: Record<Language, string>
    currency: string
    currencyDescription: string
    currencies: {
      brl: string
      usd: string
      eur: string
    }
    emailNotifications: string
    emailNotificationsDescription: string
    hideBalances: string
    hideBalancesDescription: string
    dangerZoneTitle: string
    dangerZoneDescription: string
    deleteAccount: string
    deleteAccountDescription: string
  }
}

const ptMonths: Record<string, string> = {
  Jan: 'Jan',
  Feb: 'Fev',
  Mar: 'Mar',
  Apr: 'Abr',
  May: 'Mai',
  Jun: 'Jun',
  Jul: 'Jul',
  Aug: 'Ago',
  Sep: 'Set',
  Oct: 'Out',
  Nov: 'Nov',
  Dec: 'Dez',
}

const enMonths: Record<string, string> = {
  Jan: 'Jan',
  Feb: 'Feb',
  Mar: 'Mar',
  Apr: 'Apr',
  May: 'May',
  Jun: 'Jun',
  Jul: 'Jul',
  Aug: 'Aug',
  Sep: 'Sep',
  Oct: 'Oct',
  Nov: 'Nov',
  Dec: 'Dec',
}

const esMonths: Record<string, string> = {
  Jan: 'Ene',
  Feb: 'Feb',
  Mar: 'Mar',
  Apr: 'Abr',
  May: 'May',
  Jun: 'Jun',
  Jul: 'Jul',
  Aug: 'Ago',
  Sep: 'Sep',
  Oct: 'Oct',
  Nov: 'Nov',
  Dec: 'Dic',
}

function formatDayMonth(rawDate: string, monthsMap: Record<string, string>, order: 'dmy' | 'mdy', special: Record<string, string>): string {
  if (special[rawDate]) return special[rawDate]
  const match = /^([A-Za-z]+)\s+(\d+)$/.exec(rawDate)
  if (!match) return rawDate
  const [, mon, day] = match
  const localizedMonth = monthsMap[mon] ?? mon
  return order === 'dmy' ? `${day} ${localizedMonth.toLowerCase()}` : `${localizedMonth} ${day}`
}

const pt: BaseTranslations = {
  common: {
    close: 'Fechar',
    notificationsRegion: 'Notificações',
  },
  nav: {
    overview: 'Visão geral',
    account: 'Conta',
    dashboard: 'Painel',
    accounts: 'Contas',
    investments: 'Investimentos',
    transactions: 'Transações',
    aiAssistant: 'FinSync AI',
    aiBadge: 'IA',
    settings: 'Configurações',
    toggleSidebar: 'Alternar menu lateral',
  },
  header: {
    searchPlaceholder: 'Buscar...',
    searchAria: 'Buscar',
    notifications: 'Notificações',
    openProfileSettings: 'Abrir configurações do perfil',
    logOut: 'Sair',
  },
  theme: {
    names: {
      light: 'claro',
      dark: 'escuro',
      system: 'sistema',
    },
    title: (themeName) => `Tema: ${themeName}`,
    toggleAria: (themeName) => `Alternar tema (atual: ${themeName})`,
  },
  categories: {
    Groceries: 'Mercado',
    Salary: 'Salário',
    Freelance: 'Freelance',
    Transport: 'Transporte',
    Fuel: 'Combustível',
    Restaurant: 'Restaurante',
    Dining: 'Refeições',
    Entertainment: 'Lazer',
    Subscriptions: 'Assinaturas',
    Utilities: 'Contas de consumo',
    CreditCard: 'Fatura de Cartão',
    Shopping: 'Compras',
    Health: 'Saúde',
    Travel: 'Viagem',
    Education: 'Educação',
    Other: 'Outros',
  },
  transactionDescriptions: {
    t1: 'Mercado Central',
    t2: 'Corrida Uber',
    t3: 'Pizza Hut',
    t4: 'Assinatura Netflix',
    t5: 'Salário mensal',
    t6: 'Conta de luz',
    t7: 'Projeto de landing page',
    t8: 'Posto Shell',
    t9: 'Ingressos de cinema',
  },
  months: ptMonths,
  formatShortDate: (rawDate) =>
    formatDayMonth(rawDate, ptMonths, 'dmy', { Today: 'Hoje', Yesterday: 'Ontem' }),
  statuses: {
    pending: 'Pendente',
    completed: 'Concluída',
    failed: 'Falhou',
  },
  accountKinds: {
    Checking: 'Corrente',
    Savings: 'Poupança',
    Brokerage: 'Corretora',
  },
  accountNames: {
    'Checking Account': 'Conta Corrente',
    'Savings Account': 'Conta Poupança',
    'Brokerage Account': 'Conta Investimento',
  },
  relativeTimes: {
    '2 hours ago': 'há 2 horas',
    '5 hours ago': 'há 5 horas',
    '1 day ago': 'há 1 dia',
    'just now': 'agora mesmo',
  },
  investmentCategories: {
    'Renda Fixa': 'Renda Fixa',
    'Renda Variável': 'Renda Variável',
    Fundos: 'Fundos',
  },
  finance: {
    showValue: 'Mostrar valor',
    hideValue: 'Ocultar valor',
    ofLimit: (limit) => `de ${limit}`,
    budgetUsedAria: (category) => `Orçamento de ${category} utilizado`,
    left: (amount) => `${amount} restante`,
    approachingLimit: 'Próximo do limite',
    overBudgetBy: (amount) => `Acima do limite em ${amount}`,
    income: 'Receitas',
    expenses: 'Despesas',
    net: 'Saldo',
    month: 'Mês',
    monthlyIncomeAndExpenses: 'Receitas e despesas mensais',
    currentBalance: 'Fatura atual',
    cardholder: 'Titular',
    expires: 'Validade',
  },
  dashboard: {
    welcomeBack: (name) => `Bem-vindo de volta, ${name}`,
    description: 'Aqui está o seu resumo financeiro de novembro.',
    periodLabel: 'Nov 2026',
    addTransaction: 'Nova transação',
    totalBalance: 'Saldo total',
    vsLastMonth: 'vs mês anterior',
    monthlyIncome: 'Receita mensal',
    sameAsLastMonth: 'Igual ao mês anterior',
    monthlyExpenses: 'Despesas mensais',
    netSavings: 'Economia líquida',
    incomeSaved: (pct) => `${pct}% da receita poupada`,
    cashFlowTitle: 'Fluxo de caixa',
    cashFlowDescription: 'Receitas e despesas nos últimos 6 meses',
    thisMonthBadge: (amount) => `+${amount} neste mês`,
    myCard: 'Meu cartão',
    budgetsTitle: 'Orçamentos',
    budgetsDescription: 'Gastos em relação aos seus limites mensais',
    recentTransactionsTitle: 'Transações recentes',
    recentTransactionsDescription: 'Sua atividade mais recente em todas as contas',
    viewAll: 'Ver todas',
    quickActionsTitle: 'Ações rápidas',
    quickActions: {
      pix: 'Área Pix',
      payInvoice: 'Pagar fatura',
      transfer: 'Transferir',
      newTransaction: 'Nova transação',
    },
    accountsSection: {
      title: 'Saldo em cada conta',
      description: 'Visão consolidada do saldo disponível em suas instituições financeiras',
      totalInAccounts: 'Saldo total em contas',
      manageAccounts: 'Gerenciar contas',
      connectAccount: 'Conectar nova conta',
    },
    cardsSection: {
      title: 'Faturas dos cartões',
      description: 'Acompanhe faturas em aberto, limites disponíveis e datas de fechamento',
      totalInvoices: 'Total em faturas abertas',
      currentInvoice: 'Fatura atual',
      invoiceStatusOpen: 'Fatura aberta',
      closesOn: (date) => `Fecha em ${date}`,
      dueOn: (date) => `Vence em ${date}`,
      bestDay: (date) => `Melhor dia de compra: ${date}`,
      limitUsed: 'Limite utilizado',
      limitAvailable: (amount) => `${amount} disponível`,
      payInvoice: 'Pagar fatura',
      viewDetails: 'Ver lançamentos',
      cardOptionsAria: (name) => `Opções do cartão ${name}`,
    },
    monthlyExpensesSection: {
      title: 'Gastos do mês',
      description: 'Despesas acumuladas em novembro e comparativo de desempenho financeiro',
      dailyAverage: 'Média diária',
      dailyAverageHint: 'Estimativa para 30 dias',
      savingsRate: 'Taxa de economia',
    },
    categoryExpensesSection: {
      title: 'Gastos por categoria',
      description: 'Distribuição dos seus gastos por categoria com acompanhamento de metas',
      totalSpentInCategory: (amount) => `${amount} gastos no mês`,
    },
    upcomingBillsSection: {
      title: 'Próximos vencimentos',
      description: 'Contas a pagar e faturas programadas para os próximos dias',
      dueInDays: (days) => `Vence em ${days} dias`,
      dueSoon: 'Vence em 2 dias',
      payNow: 'Pagar',
    },
    aiInsight: {
      title: 'FinSync AI Insights',
      badge: 'Dica do Assistente',
      message:
        'Você economizou 15% em Transporte este mês, mas os gastos com Refeições atingiram 125% da meta. Que tal limitar pedidos de delivery no fim de semana para economizar cerca de R$ 200?',
      action: 'Conversar com a FinSync AI',
    },
  },
  accounts: {
    title: 'Contas',
    description: 'Gerencie suas contas bancárias e carteiras digitais.',
    addAccount: 'Adicionar conta',
    totalNetWorth: 'Patrimônio total',
    accountsSummary: (count) => `${count} contas · atualizado há 2 horas`,
    availableAccountBalance: 'Saldo em conta (disponível)',
    totalInvested: 'Total investido',
    bankAccounts: 'Contas bancárias',
    accountOptionsAria: (name) => `Opções de ${name}`,
    availableBalance: 'Saldo disponível',
    invested: 'Investido',
    updated: (time) => `Atualizado ${time}`,
    connectNewAccount: 'Conectar nova conta',
    creditCards: 'Cartões de crédito',
    statementSchedule: 'Fatura fecha em 25 nov · vence em 2 dez',
    used: 'Utilizado',
    availableCredit: (amount) => `${amount} disponível`,
    viewStatement: 'Ver fatura',
    manageCard: 'Gerenciar cartão',
  },
  investments: {
    title: 'Investimentos',
    description: 'Acompanhe sua carteira em todas as instituições.',
    newInvestment: 'Novo investimento',
    totalInvested: 'Total investido',
    onApplied: (amount) => `sobre ${amount} aplicados`,
    earningsThisMonth: 'Rendimento no mês',
    vsStartOfMonth: 'vs. início do mês',
    portfolioDistribution: 'Distribuição da carteira',
    assetClassesLargest: (count) => `${count} classes de ativos · maior alocação`,
    assetAllocation: 'Alocação de ativos',
    shareByCategory: 'Participação da carteira por categoria',
    holdingsByInstitution: 'Ativos por instituição',
    filterByInstitution: 'Filtrar por instituição',
    all: 'Todas',
    institutionInvestmentsAria: (bank) => `Investimentos em ${bank}`,
    holdingsCount: (count) => `${count} ativos`,
    appliedAmount: (amount) => `Aplicado ${amount}`,
  },
  transactions: {
    title: 'Transações',
    description: 'Visualize e gerencie todas as suas transações financeiras.',
    export: 'Exportar',
    addTransaction: 'Nova transação',
    income: 'Receitas',
    expenses: 'Despesas',
    last30Days: 'Últimos 30 dias',
    pending: 'Pendente',
    awaitingConfirmation: 'Aguardando confirmação',
    searchPlaceholder: 'Buscar transações...',
    searchAria: 'Buscar transações',
    filterByCategoryAria: 'Filtrar por categoria',
    allCategories: 'Todas as categorias',
    filterByStatusAria: 'Filtrar por status',
    allStatuses: 'Todos os status',
    noTransactionsFound: 'Nenhuma transação encontrada',
    tryDifferentSearch: 'Tente uma busca ou filtro diferente.',
    showingCount: (shown, total) => `Exibindo ${shown} de ${total} transações`,
    clearFilters: 'Limpar filtros',
  },
  ai: {
    title: 'FinSync AI',
    description: 'Pergunte sobre seus gastos, metas de economia e investimentos.',
    conversationAria: 'Conversa',
    youSr: 'Você: ',
    typingSr: 'FinSync AI está digitando…',
    suggestionsAria: 'Perguntas sugeridas',
    inputPlaceholder: 'Pergunte algo sobre suas finanças…',
    inputAria: 'Mensagem para FinSync AI',
    sendAria: 'Enviar mensagem',
    suggestions: [
      'Onde posso cortar gastos neste mês?',
      'Qual a minha taxa de poupança atual?',
      'Simule uma meta de reserva de emergência',
      'Como está minha carteira de investimentos?',
    ],
    welcome: (firstName) =>
      `Olá, ${firstName}! Sou a FinSync AI. Posso analisar seus gastos, simular metas e resumir seus investimentos. Escolha uma sugestão ou escreva sua pergunta.`,
    answers: {
      cutIntro: 'Estas categorias estão perto ou acima do limite mensal:',
      cutItemOf: 'de',
      cutOutro: (category) => `Começar por ${category} é o corte de maior impacto.`,
      savings: (income, expenses) => ({
        beforeNet: `Neste mês você recebeu ${income} e gastou ${expenses}, poupando `,
        afterNetBeforePct: '. Isso é uma taxa de poupança de ',
        afterPct: ', acima dos 20% geralmente recomendados.',
      }),
      emergencyIntro: 'Simulação de reserva de emergência (6 meses de despesas):',
      emergencyGoalLabel: 'Meta',
      emergencyMonthlyLabel: 'Aporte mensal sugerido',
      emergencyTimelineLabel: 'Prazo estimado',
      emergencyMonths: (months) => `${months} meses`,
      emergencyTip: 'Mantenha a reserva em um ativo com liquidez diária, como Tesouro Selic ou CDB 100% CDI.',
      investments: (count) => ({
        beforeTotal: 'Sua carteira soma ',
        afterTotalBeforeGain: ` em ${count} ativos, com resultado de `,
        afterGain: ' no mês. Veja o detalhamento na tela Investimentos.',
      }),
      netWorth: (balance, invested) =>
        `Você tem ${balance} em conta e ${invested} investidos: patrimônio total de `,
      fallback:
        'Ainda estou aprendendo sobre isso. Experimente perguntar sobre gastos, taxa de poupança, reserva de emergência, investimentos ou patrimônio.',
    },
  },
  settings: {
    title: 'Configurações',
    description: 'Gerencie sua conta e preferências.',
    profileTitle: 'Perfil',
    profileDescription: 'Essas informações são visíveis apenas para você.',
    changePhoto: 'Alterar foto',
    remove: 'Remover',
    fullName: 'Nome completo',
    email: 'E-mail',
    cancel: 'Cancelar',
    saveChanges: 'Salvar alterações',
    securityTitle: 'Segurança',
    securityDescription: 'Mantenha sua conta protegida.',
    password: 'Senha',
    passwordDescription: 'Alterada pela última vez há 3 meses',
    update: 'Atualizar',
    twoFactor: 'Autenticação em dois fatores',
    twoFactorDescription: 'Adicione uma camada extra de segurança à sua conta',
    preferencesTitle: 'Preferências',
    preferencesDescription: 'Personalize como o FinSync funciona para você.',
    language: 'Idioma',
    languageDescription: 'Selecione o idioma da interface',
    languages: {
      pt: 'Português',
      en: 'Inglês',
      es: 'Espanhol',
    },
    currency: 'Moeda',
    currencyDescription: 'Exibir valores em',
    currencies: {
      brl: 'R$ Real Brasileiro',
      usd: 'US$ Dólar Americano',
      eur: '€ Euro',
    },
    emailNotifications: 'Notificações por e-mail',
    emailNotificationsDescription: 'Receba resumos semanais e alertas',
    hideBalances: 'Ocultar saldos',
    hideBalancesDescription: 'Mascarar valores no painel por padrão',
    dangerZoneTitle: 'Zona de perigo',
    dangerZoneDescription: 'Ações irreversíveis para sua conta.',
    deleteAccount: 'Excluir conta',
    deleteAccountDescription:
      'Remova permanentemente sua conta e todos os seus dados. Esta ação não pode ser desfeita.',
  },
}

const en: BaseTranslations = {
  common: {
    close: 'Close',
    notificationsRegion: 'Notifications',
  },
  nav: {
    overview: 'Overview',
    account: 'Account',
    dashboard: 'Dashboard',
    accounts: 'Accounts',
    investments: 'Investments',
    transactions: 'Transactions',
    aiAssistant: 'FinSync AI',
    aiBadge: 'AI',
    settings: 'Settings',
    toggleSidebar: 'Toggle sidebar',
  },
  header: {
    searchPlaceholder: 'Search...',
    searchAria: 'Search',
    notifications: 'Notifications',
    openProfileSettings: 'Open profile settings',
    logOut: 'Log out',
  },
  theme: {
    names: {
      light: 'light',
      dark: 'dark',
      system: 'system',
    },
    title: (themeName) => `Theme: ${themeName}`,
    toggleAria: (themeName) => `Toggle theme (current: ${themeName})`,
  },
  categories: {
    Groceries: 'Groceries',
    Salary: 'Salary',
    Freelance: 'Freelance',
    Transport: 'Transport',
    Fuel: 'Fuel',
    Restaurant: 'Restaurant',
    Dining: 'Dining',
    Entertainment: 'Entertainment',
    Subscriptions: 'Subscriptions',
    Utilities: 'Utilities',
    CreditCard: 'Credit Card',
    Shopping: 'Shopping',
    Health: 'Health',
    Travel: 'Travel',
    Education: 'Education',
    Other: 'Other',
  },
  transactionDescriptions: {
    t1: 'Mercado Central',
    t2: 'Uber ride',
    t3: 'Pizza Hut',
    t4: 'Netflix subscription',
    t5: 'Monthly salary',
    t6: 'Electricity bill',
    t7: 'Landing page project',
    t8: 'Shell station',
    t9: 'Cinema tickets',
  },
  months: enMonths,
  formatShortDate: (rawDate) =>
    formatDayMonth(rawDate, enMonths, 'mdy', { Today: 'Today', Yesterday: 'Yesterday' }),
  statuses: {
    pending: 'Pending',
    completed: 'Completed',
    failed: 'Failed',
  },
  accountKinds: {
    Checking: 'Checking',
    Savings: 'Savings',
    Brokerage: 'Brokerage',
  },
  accountNames: {
    'Checking Account': 'Checking Account',
    'Savings Account': 'Savings Account',
    'Brokerage Account': 'Brokerage Account',
  },
  relativeTimes: {
    '2 hours ago': '2 hours ago',
    '5 hours ago': '5 hours ago',
    '1 day ago': '1 day ago',
    'just now': 'just now',
  },
  investmentCategories: {
    'Renda Fixa': 'Fixed Income',
    'Renda Variável': 'Equities',
    Fundos: 'Funds',
  },
  finance: {
    showValue: 'Show value',
    hideValue: 'Hide value',
    ofLimit: (limit) => `of ${limit}`,
    budgetUsedAria: (category) => `${category} budget used`,
    left: (amount) => `${amount} left`,
    approachingLimit: 'Approaching limit',
    overBudgetBy: (amount) => `Over budget by ${amount}`,
    income: 'Income',
    expenses: 'Expenses',
    net: 'Net',
    month: 'Month',
    monthlyIncomeAndExpenses: 'Monthly income and expenses',
    currentBalance: 'Current balance',
    cardholder: 'Cardholder',
    expires: 'Expires',
  },
  dashboard: {
    welcomeBack: (name) => `Welcome back, ${name}`,
    description: "Here's your financial overview for November.",
    periodLabel: 'Nov 2026',
    addTransaction: 'Add transaction',
    totalBalance: 'Total balance',
    vsLastMonth: 'vs last month',
    monthlyIncome: 'Monthly income',
    sameAsLastMonth: 'Same as last month',
    monthlyExpenses: 'Monthly expenses',
    netSavings: 'Net savings',
    incomeSaved: (pct) => `${pct}% of income saved`,
    cashFlowTitle: 'Cash flow',
    cashFlowDescription: 'Income and expenses over the last 6 months',
    thisMonthBadge: (amount) => `+${amount} this month`,
    myCard: 'My card',
    budgetsTitle: 'Budgets',
    budgetsDescription: 'Spending against your monthly limits',
    recentTransactionsTitle: 'Recent transactions',
    recentTransactionsDescription: 'Your latest activity across all accounts',
    viewAll: 'View all',
    quickActionsTitle: 'Quick actions',
    quickActions: {
      pix: 'Instant Pix',
      payInvoice: 'Pay invoice',
      transfer: 'Transfer',
      newTransaction: 'New transaction',
    },
    accountsSection: {
      title: 'Account balances',
      description: 'Consolidated view of balances available across your financial accounts',
      totalInAccounts: 'Total in accounts',
      manageAccounts: 'Manage accounts',
      connectAccount: 'Connect new account',
    },
    cardsSection: {
      title: 'Credit card invoices',
      description: 'Track open statement amounts, available limits and statement closing dates',
      totalInvoices: 'Total in open statements',
      currentInvoice: 'Current invoice',
      invoiceStatusOpen: 'Open statement',
      closesOn: (date) => `Closes on ${date}`,
      dueOn: (date) => `Due on ${date}`,
      bestDay: (date) => `Best purchase day: ${date}`,
      limitUsed: 'Limit used',
      limitAvailable: (amount) => `${amount} available`,
      payInvoice: 'Pay invoice',
      viewDetails: 'View charges',
      cardOptionsAria: (name) => `${name} card options`,
    },
    monthlyExpensesSection: {
      title: 'Monthly spending',
      description: 'Accumulated expenses in November and overall financial performance',
      dailyAverage: 'Daily average',
      dailyAverageHint: 'Estimated over 30 days',
      savingsRate: 'Savings rate',
    },
    categoryExpensesSection: {
      title: 'Spending by category',
      description: 'Breakdown of monthly spending across categories with target limits',
      totalSpentInCategory: (amount) => `${amount} spent this month`,
    },
    upcomingBillsSection: {
      title: 'Upcoming bills',
      description: 'Bills and credit card statements due in the next few days',
      dueInDays: (days) => `Due in ${days} days`,
      dueSoon: 'Due in 2 days',
      payNow: 'Pay',
    },
    aiInsight: {
      title: 'FinSync AI Insights',
      badge: 'Assistant Tip',
      message:
        'You saved 15% on Transport this month, but Dining reached 125% of its monthly limit. Reducing weekend food delivery could save you approximately $40.',
      action: 'Chat with FinSync AI',
    },
  },
  accounts: {
    title: 'Accounts',
    description: 'Manage your bank accounts and digital wallets.',
    addAccount: 'Add account',
    totalNetWorth: 'Total net worth',
    accountsSummary: (count) => `${count} accounts · updated 2 hours ago`,
    availableAccountBalance: 'Account balance (available)',
    totalInvested: 'Total invested',
    bankAccounts: 'Bank accounts',
    accountOptionsAria: (name) => `${name} options`,
    availableBalance: 'Available balance',
    invested: 'Invested',
    updated: (time) => `Updated ${time}`,
    connectNewAccount: 'Connect a new account',
    creditCards: 'Credit cards',
    statementSchedule: 'Statement closes on Nov 25 · due Dec 2',
    used: 'Used',
    availableCredit: (amount) => `${amount} available`,
    viewStatement: 'View statement',
    manageCard: 'Manage card',
  },
  investments: {
    title: 'Investments',
    description: 'Track your portfolio across every institution.',
    newInvestment: 'New investment',
    totalInvested: 'Total invested',
    onApplied: (amount) => `on ${amount} applied`,
    earningsThisMonth: 'Earnings this month',
    vsStartOfMonth: 'vs. start of month',
    portfolioDistribution: 'Portfolio distribution',
    assetClassesLargest: (count) => `${count} asset classes · largest allocation`,
    assetAllocation: 'Asset allocation',
    shareByCategory: 'Share of the portfolio by category',
    holdingsByInstitution: 'Holdings by institution',
    filterByInstitution: 'Filter by institution',
    all: 'All',
    institutionInvestmentsAria: (bank) => `${bank} investments`,
    holdingsCount: (count) => `${count} holdings`,
    appliedAmount: (amount) => `Applied ${amount}`,
  },
  transactions: {
    title: 'Transactions',
    description: 'View and manage all your financial transactions.',
    export: 'Export',
    addTransaction: 'Add transaction',
    income: 'Income',
    expenses: 'Expenses',
    last30Days: 'Last 30 days',
    pending: 'Pending',
    awaitingConfirmation: 'Awaiting confirmation',
    searchPlaceholder: 'Search transactions...',
    searchAria: 'Search transactions',
    filterByCategoryAria: 'Filter by category',
    allCategories: 'All categories',
    filterByStatusAria: 'Filter by status',
    allStatuses: 'All statuses',
    noTransactionsFound: 'No transactions found',
    tryDifferentSearch: 'Try a different search or filter.',
    showingCount: (shown, total) => `Showing ${shown} of ${total} transactions`,
    clearFilters: 'Clear filters',
  },
  ai: {
    title: 'FinSync AI',
    description: 'Ask about your spending, savings goals and investments.',
    conversationAria: 'Conversation',
    youSr: 'You: ',
    typingSr: 'FinSync AI is typing…',
    suggestionsAria: 'Suggested questions',
    inputPlaceholder: 'Ask something about your finances…',
    inputAria: 'Message to FinSync AI',
    sendAria: 'Send message',
    suggestions: [
      'Where can I cut spending this month?',
      'What is my current savings rate?',
      'Simulate an emergency fund goal',
      'How is my investment portfolio doing?',
    ],
    welcome: (firstName) =>
      `Hi, ${firstName}! I'm FinSync AI. I can analyze your spending, simulate goals, and summarize your investments. Pick a suggestion or type your question.`,
    answers: {
      cutIntro: 'These categories are close to or over the monthly limit:',
      cutItemOf: 'of',
      cutOutro: (category) => `Starting with ${category} will have the biggest impact.`,
      savings: (income, expenses) => ({
        beforeNet: `This month you earned ${income} and spent ${expenses}, saving `,
        afterNetBeforePct: '. That is a savings rate of ',
        afterPct: ', above the commonly recommended 20%.',
      }),
      emergencyIntro: 'Emergency fund simulation (6 months of expenses):',
      emergencyGoalLabel: 'Target',
      emergencyMonthlyLabel: 'Suggested monthly contribution',
      emergencyTimelineLabel: 'Estimated timeline',
      emergencyMonths: (months) => `${months} months`,
      emergencyTip: 'Keep your emergency fund in a daily-liquidity asset, such as Tesouro Selic or a 100% CDI CDB.',
      investments: (count) => ({
        beforeTotal: 'Your portfolio totals ',
        afterTotalBeforeGain: ` across ${count} holdings, with a monthly result of `,
        afterGain: '. See the full breakdown on the Investments screen.',
      }),
      netWorth: (balance, invested) =>
        `You have ${balance} in cash accounts and ${invested} invested: total net worth of `,
      fallback:
        "I'm still learning about that. Try asking about spending, savings rate, emergency fund, investments, or net worth.",
    },
  },
  settings: {
    title: 'Settings',
    description: 'Manage your account and preferences.',
    profileTitle: 'Profile',
    profileDescription: 'This information is visible only to you.',
    changePhoto: 'Change photo',
    remove: 'Remove',
    fullName: 'Full name',
    email: 'Email',
    cancel: 'Cancel',
    saveChanges: 'Save changes',
    securityTitle: 'Security',
    securityDescription: 'Keep your account protected.',
    password: 'Password',
    passwordDescription: 'Last changed 3 months ago',
    update: 'Update',
    twoFactor: 'Two-factor authentication',
    twoFactorDescription: 'Add an extra layer of security to your account',
    preferencesTitle: 'Preferences',
    preferencesDescription: 'Customize how FinSync works for you.',
    language: 'Language',
    languageDescription: 'Choose the interface language',
    languages: {
      pt: 'Portuguese',
      en: 'English',
      es: 'Spanish',
    },
    currency: 'Currency',
    currencyDescription: 'Display amounts in',
    currencies: {
      brl: 'R$ Brazilian Real',
      usd: 'US$ US Dollar',
      eur: '€ Euro',
    },
    emailNotifications: 'Email notifications',
    emailNotificationsDescription: 'Receive weekly summaries and alerts',
    hideBalances: 'Hide balances',
    hideBalancesDescription: 'Mask values on the dashboard by default',
    dangerZoneTitle: 'Danger zone',
    dangerZoneDescription: 'Irreversible actions for your account.',
    deleteAccount: 'Delete account',
    deleteAccountDescription:
      'Permanently remove your account and all of its data. This cannot be undone.',
  },
}

const es: BaseTranslations = {
  common: {
    close: 'Cerrar',
    notificationsRegion: 'Notificaciones',
  },
  nav: {
    overview: 'Resumen',
    account: 'Cuenta',
    dashboard: 'Panel',
    accounts: 'Cuentas',
    investments: 'Inversiones',
    transactions: 'Transacciones',
    aiAssistant: 'FinSync AI',
    aiBadge: 'IA',
    settings: 'Configuración',
    toggleSidebar: 'Alternar barra lateral',
  },
  header: {
    searchPlaceholder: 'Buscar...',
    searchAria: 'Buscar',
    notifications: 'Notificaciones',
    openProfileSettings: 'Abrir configuración del perfil',
    logOut: 'Cerrar sesión',
  },
  theme: {
    names: {
      light: 'claro',
      dark: 'oscuro',
      system: 'sistema',
    },
    title: (themeName) => `Tema: ${themeName}`,
    toggleAria: (themeName) => `Cambiar tema (actual: ${themeName})`,
  },
  categories: {
    Groceries: 'Supermercado',
    Salary: 'Salario',
    Freelance: 'Freelance',
    Transport: 'Transporte',
    Fuel: 'Combustible',
    Restaurant: 'Restaurante',
    Dining: 'Comidas',
    Entertainment: 'Entretenimiento',
    Subscriptions: 'Suscripciones',
    Utilities: 'Servicios',
    CreditCard: 'Tarjeta de Crédito',
    Shopping: 'Compras',
    Health: 'Salud',
    Travel: 'Viajes',
    Education: 'Educación',
    Other: 'Otros',
  },
  transactionDescriptions: {
    t1: 'Mercado Central',
    t2: 'Viaje en Uber',
    t3: 'Pizza Hut',
    t4: 'Suscripción Netflix',
    t5: 'Salario mensual',
    t6: 'Factura de electricidad',
    t7: 'Proyecto de landing page',
    t8: 'Estación Shell',
    t9: 'Entradas de cine',
  },
  months: esMonths,
  formatShortDate: (rawDate) =>
    formatDayMonth(rawDate, esMonths, 'dmy', { Today: 'Hoy', Yesterday: 'Ayer' }),
  statuses: {
    pending: 'Pendiente',
    completed: 'Completada',
    failed: 'Fallida',
  },
  accountKinds: {
    Checking: 'Corriente',
    Savings: 'Ahorros',
    Brokerage: 'Inversión',
  },
  accountNames: {
    'Checking Account': 'Cuenta Corriente',
    'Savings Account': 'Cuenta de Ahorros',
    'Brokerage Account': 'Cuenta de Inversión',
  },
  relativeTimes: {
    '2 hours ago': 'hace 2 horas',
    '5 hours ago': 'hace 5 horas',
    '1 day ago': 'hace 1 día',
    'just now': 'justo ahora',
  },
  investmentCategories: {
    'Renda Fixa': 'Renta Fija',
    'Renda Variável': 'Renta Variable',
    Fundos: 'Fondos',
  },
  finance: {
    showValue: 'Mostrar valor',
    hideValue: 'Ocultar valor',
    ofLimit: (limit) => `de ${limit}`,
    budgetUsedAria: (category) => `Presupuesto de ${category} usado`,
    left: (amount) => `${amount} disponible`,
    approachingLimit: 'Cerca del límite',
    overBudgetBy: (amount) => `Excedido por ${amount}`,
    income: 'Ingresos',
    expenses: 'Gastos',
    net: 'Neto',
    month: 'Mes',
    monthlyIncomeAndExpenses: 'Ingresos y gastos mensuales',
    currentBalance: 'Saldo actual',
    cardholder: 'Titular',
    expires: 'Vence',
  },
  dashboard: {
    welcomeBack: (name) => `Bienvenido de nuevo, ${name}`,
    description: 'Aquí tienes tu resumen financiero de noviembre.',
    periodLabel: 'Nov 2026',
    addTransaction: 'Añadir transacción',
    totalBalance: 'Saldo total',
    vsLastMonth: 'vs mes anterior',
    monthlyIncome: 'Ingresos mensuales',
    sameAsLastMonth: 'Igual que el mes pasado',
    monthlyExpenses: 'Gastos mensuales',
    netSavings: 'Ahorro neto',
    incomeSaved: (pct) => `${pct}% de los ingresos ahorrados`,
    cashFlowTitle: 'Flujo de caja',
    cashFlowDescription: 'Ingresos y gastos en los últimos 6 meses',
    thisMonthBadge: (amount) => `+${amount} este mes`,
    myCard: 'Mi tarjeta',
    budgetsTitle: 'Presupuestos',
    budgetsDescription: 'Gastos frente a tus límites mensuales',
    recentTransactionsTitle: 'Transacciones recientes',
    recentTransactionsDescription: 'Tu actividad más reciente en todas las cuentas',
    viewAll: 'Ver todas',
    quickActionsTitle: 'Acciones rápidas',
    quickActions: {
      pix: 'Área Pix',
      payInvoice: 'Pagar factura',
      transfer: 'Transferir',
      newTransaction: 'Nueva transacción',
    },
    accountsSection: {
      title: 'Saldo en cada cuenta',
      description: 'Vista consolidada del saldo disponible en tus instituciones financieras',
      totalInAccounts: 'Saldo total en cuentas',
      manageAccounts: 'Administrar cuentas',
      connectAccount: 'Conectar nueva cuenta',
    },
    cardsSection: {
      title: 'Facturas de tarjetas',
      description: 'Monitorea facturas abiertas, límites disponibles y fechas de corte',
      totalInvoices: 'Total en facturas abiertas',
      currentInvoice: 'Factura actual',
      invoiceStatusOpen: 'Factura abierta',
      closesOn: (date) => `Cierra el ${date}`,
      dueOn: (date) => `Vence el ${date}`,
      bestDay: (date) => `Mejor día de compra: ${date}`,
      limitUsed: 'Límite utilizado',
      limitAvailable: (amount) => `${amount} disponible`,
      payInvoice: 'Pagar factura',
      viewDetails: 'Ver consumos',
      cardOptionsAria: (name) => `Opciones de la tarjeta ${name}`,
    },
    monthlyExpensesSection: {
      title: 'Gastos del mes',
      description: 'Gastos acumulados en noviembre y comparativa de rendimiento financiero',
      dailyAverage: 'Promedio diario',
      dailyAverageHint: 'Estimación para 30 días',
      savingsRate: 'Tasa de ahorro',
    },
    categoryExpensesSection: {
      title: 'Gastos por categoría',
      description: 'Distribución de tus gastos por categoría con seguimiento de metas',
      totalSpentInCategory: (amount) => `${amount} gastados en el mes`,
    },
    upcomingBillsSection: {
      title: 'Próximos vencimientos',
      description: 'Facturas y cuentas por pagar en los próximos días',
      dueInDays: (days) => `Vence en ${days} días`,
      dueSoon: 'Vence en 2 días',
      payNow: 'Pagar',
    },
    aiInsight: {
      title: 'FinSync AI Insights',
      badge: 'Consejo del Asistente',
      message:
        'Ahorraste 15% en Transporte este mes, pero los gastos en Comidas alcanzaron el 125% de la meta. ¿Qué tal limitar los pedidos de entrega a domicilio este fin de semana para ahorrar cerca de $40?',
      action: 'Hablar con FinSync AI',
    },
  },
  accounts: {
    title: 'Cuentas',
    description: 'Administra tus cuentas bancarias y billeteras digitales.',
    addAccount: 'Añadir cuenta',
    totalNetWorth: 'Patrimonio neto total',
    accountsSummary: (count) => `${count} cuentas · actualizado hace 2 horas`,
    availableAccountBalance: 'Saldo en cuenta (disponible)',
    totalInvested: 'Total invertido',
    bankAccounts: 'Cuentas bancarias',
    accountOptionsAria: (name) => `Opciones de ${name}`,
    availableBalance: 'Saldo disponible',
    invested: 'Invertido',
    updated: (time) => `Actualizado ${time}`,
    connectNewAccount: 'Conectar una nueva cuenta',
    creditCards: 'Tarjetas de crédito',
    statementSchedule: 'Cierre el 25 nov · vence el 2 dic',
    used: 'Usado',
    availableCredit: (amount) => `${amount} disponible`,
    viewStatement: 'Ver estado de cuenta',
    manageCard: 'Administrar tarjeta',
  },
  investments: {
    title: 'Inversiones',
    description: 'Sigue tu cartera en cada institución.',
    newInvestment: 'Nueva inversión',
    totalInvested: 'Total invertido',
    onApplied: (amount) => `sobre ${amount} invertidos`,
    earningsThisMonth: 'Rendimiento del mes',
    vsStartOfMonth: 'vs. inicio de mes',
    portfolioDistribution: 'Distribución de la cartera',
    assetClassesLargest: (count) => `${count} clases de activos · mayor asignación`,
    assetAllocation: 'Asignación de activos',
    shareByCategory: 'Participación de la cartera por categoría',
    holdingsByInstitution: 'Activos por institución',
    filterByInstitution: 'Filtrar por institución',
    all: 'Todas',
    institutionInvestmentsAria: (bank) => `Inversiones en ${bank}`,
    holdingsCount: (count) => `${count} activos`,
    appliedAmount: (amount) => `Invertido ${amount}`,
  },
  transactions: {
    title: 'Transacciones',
    description: 'Visualiza y administra todas tus transacciones financieras.',
    export: 'Exportar',
    addTransaction: 'Añadir transacción',
    income: 'Ingresos',
    expenses: 'Gastos',
    last30Days: 'Últimos 30 días',
    pending: 'Pendiente',
    awaitingConfirmation: 'Esperando confirmación',
    searchPlaceholder: 'Buscar transacciones...',
    searchAria: 'Buscar transacciones',
    filterByCategoryAria: 'Filtrar por categoría',
    allCategories: 'Todas las categorías',
    filterByStatusAria: 'Filtrar por estado',
    allStatuses: 'Todos los estados',
    noTransactionsFound: 'No se encontraron transacciones',
    tryDifferentSearch: 'Prueba con otra búsqueda o filtro.',
    showingCount: (shown, total) => `Mostrando ${shown} de ${total} transacciones`,
    clearFilters: 'Limpiar filtros',
  },
  ai: {
    title: 'FinSync AI',
    description: 'Pregunta sobre tus gastos, metas de ahorro e inversiones.',
    conversationAria: 'Conversación',
    youSr: 'Tú: ',
    typingSr: 'FinSync AI está escribiendo…',
    suggestionsAria: 'Preguntas sugeridas',
    inputPlaceholder: 'Pregunta algo sobre tus finanzas…',
    inputAria: 'Mensaje para FinSync AI',
    sendAria: 'Enviar mensaje',
    suggestions: [
      '¿Dónde puedo recortar gastos este mes?',
      '¿Cuál es mi tasa de ahorro actual?',
      'Simula una meta de fondo de emergencia',
      '¿Cómo va mi cartera de inversiones?',
    ],
    welcome: (firstName) =>
      `¡Hola, ${firstName}! Soy FinSync AI. Puedo analizar tus gastos, simular metas y resumir tus inversiones. Elige una sugerencia o escribe tu pregunta.`,
    answers: {
      cutIntro: 'Estas categorías están cerca o por encima del límite mensual:',
      cutItemOf: 'de',
      cutOutro: (category) => `Empezar por ${category} tendrá el mayor impacto.`,
      savings: (income, expenses) => ({
        beforeNet: `Este mes recibiste ${income} y gastaste ${expenses}, ahorrando `,
        afterNetBeforePct: '. Eso representa una tasa de ahorro del ',
        afterPct: ', por encima del 20% generalmente recomendado.',
      }),
      emergencyIntro: 'Simulación de fondo de emergencia (6 meses de gastos):',
      emergencyGoalLabel: 'Meta',
      emergencyMonthlyLabel: 'Aporte mensual sugerido',
      emergencyTimelineLabel: 'Plazo estimado',
      emergencyMonths: (months) => `${months} meses`,
      emergencyTip: 'Mantén el fondo en un activo con liquidez diaria, como Tesouro Selic o CDB 100% CDI.',
      investments: (count) => ({
        beforeTotal: 'Tu cartera suma ',
        afterTotalBeforeGain: ` en ${count} activos, con un resultado mensual de `,
        afterGain: '. Consulta el detalle en la pantalla Inversiones.',
      }),
      netWorth: (balance, invested) =>
        `Tienes ${balance} en cuenta y ${invested} invertidos: patrimonio total de `,
      fallback:
        'Todavía estoy aprendiendo sobre eso. Prueba preguntar sobre gastos, tasa de ahorro, fondo de emergencia, inversiones o patrimonio.',
    },
  },
  settings: {
    title: 'Configuración',
    description: 'Administra tu cuenta y preferencias.',
    profileTitle: 'Perfil',
    profileDescription: 'Esta información solo es visible para ti.',
    changePhoto: 'Cambiar foto',
    remove: 'Eliminar',
    fullName: 'Nombre completo',
    email: 'Correo electrónico',
    cancel: 'Cancelar',
    saveChanges: 'Guardar cambios',
    securityTitle: 'Seguridad',
    securityDescription: 'Mantén tu cuenta protegida.',
    password: 'Contraseña',
    passwordDescription: 'Cambiada por última vez hace 3 meses',
    update: 'Actualizar',
    twoFactor: 'Autenticación de dos factores',
    twoFactorDescription: 'Añade una capa extra de seguridad a tu cuenta',
    preferencesTitle: 'Preferencias',
    preferencesDescription: 'Personaliza cómo funciona FinSync para ti.',
    language: 'Idioma',
    languageDescription: 'Selecciona el idioma de la interfaz',
    languages: {
      pt: 'Portugués',
      en: 'Inglés',
      es: 'Español',
    },
    currency: 'Moneda',
    currencyDescription: 'Mostrar importes en',
    currencies: {
      brl: 'R$ Real brasileño',
      usd: 'US$ Dólar estadounidense',
      eur: '€ Euro',
    },
    emailNotifications: 'Notificaciones por correo',
    emailNotificationsDescription: 'Recibe resúmenes semanales y alertas',
    hideBalances: 'Ocultar saldos',
    hideBalancesDescription: 'Ocultar valores en el panel de forma predeterminada',
    dangerZoneTitle: 'Zona de peligro',
    dangerZoneDescription: 'Acciones irreversibles para tu cuenta.',
    deleteAccount: 'Eliminar cuenta',
    deleteAccountDescription:
      'Elimina permanentemente tu cuenta y todos sus datos. Esta acción no se puede deshacer.',
  },
}

export type Translations = BaseTranslations & PagesTranslations

export const translations: Record<Language, Translations> = {
  pt: { ...pt, ...pagesPt },
  en: { ...en, ...pagesEn },
  es: { ...es, ...pagesEs },
}
