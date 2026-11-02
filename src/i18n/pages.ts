/**
 * Copy for the detail screens, overlays and flows added on top of the base
 * translations (notifications, budgets, bills, detail pages, dialogs...).
 * Merged into `translations` in ./translations.ts.
 */
import type { AppNotification, Investment, NotificationKind } from '@/data/mock'

type Liquidity = NonNullable<Investment['liquidity']>
type Risk = NonNullable<Investment['risk']>

export interface PagesTranslations {
  common: {
    close: string
    cancel: string
    save: string
    back: string
    viewDetails: string
    notificationsRegion: string
    /** Full month names keyed by the English 3-letter abbreviation */
    monthNames: Record<string, string>
  }
  navExtra: {
    planning: string
  }
  dashboardExtra: {
    periodDescription: (month: string) => string
    periodAria: (period: string) => string
    manageBudgets: string
    viewAllBills: string
    perDay: string
    limitTotal: (amount: string) => string
    openCardAria: (name: string) => string
    accountDetailsAria: (name: string, bank: string) => string
    payBillAria: (title: string) => string
  }
  transactionsExtra: {
    exported: string
    exportedCount: (count: number) => string
    exportEmpty: string
    csvHeader: string[]
  }
  transactionDetail: {
    title: string
    description: string
    category: string
    date: string
    paidWith: string
    receivedIn: string
    type: string
    transactionId: string
    copyId: string
    idCopied: string
    notInformed: string
    note: string
    failedTitle: string
    failedDescription: string
    retry: string
    retried: string
    retriedDescription: string
    askSync: string
    askPrompt: (description: string) => string
    delete: string
    deleteTitle: string
    deleteDescription: (description: string) => string
    deleted: string
  }
  newTransaction: {
    title: string
    description: string
    typeLabel: string
    descriptionLabel: string
    descriptionPlaceholder: string
    descriptionRequired: string
    amountLabel: string
    amountInvalid: string
    dateLabel: string
    categoryLabel: string
    paidWithLabel: string
    receivedInLabel: string
    cardsGroup: string
    accountsGroup: string
    noteLabel: string
    notePlaceholder: string
    alreadyPaid: string
    alreadyReceived: string
    submit: string
    created: string
  }
  newInvestment: {
    title: string
    description: string
    nameLabel: string
    namePlaceholder: string
    nameRequired: string
    categoryLabel: string
    accountLabel: string
    amountLabel: string
    availableInAccount: (amount: string) => string
    insufficient: (balance: string) => string
    rateLabel: string
    ratePlaceholder: string
    submit: string
    created: string
  }
  transfer: {
    pixTitle: string
    pixDescription: string
    transferTitle: string
    transferDescription: string
    from: string
    to: string
    available: (amount: string) => string
    pixKey: string
    pixKeyPlaceholder: string
    pixKeyHint: string
    pixKeyInvalid: string
    sameAccount: string
    insufficient: (balance: string) => string
    sendPix: string
    submitTransfer: string
    sentTo: (destination: string) => string
    receivedFrom: (origin: string) => string
    pixDone: string
    transferDone: string
  }
  connectAccount: {
    title: string
    description: string
    searchPlaceholder: string
    noResults: string
    confirmTitle: (bank: string) => string
    confirmDescription: string
    kindLabel: string
    securityTitle: string
    permissions: string[]
    submit: string
    connecting: string
    connected: (bank: string) => string
    connectedDescription: string
  }
  passwordDialog: {
    title: string
    description: string
    current: string
    currentRequired: string
    next: string
    hint: string
    tooShort: string
    confirm: string
    mismatch: string
    strength: [string, string, string, string]
    submit: string
    updated: string
    updatedDescription: string
  }
  payBill: {
    title: string
    amount: string
    dueOn: (date: string) => string
    fromAccount: string
    balanceAfter: (amount: string) => string
    insufficient: string
    submit: string
    paid: string
  }
  notifications: {
    title: string
    description: string
    preferences: string
    markAllRead: string
    filterAria: string
    allTab: string
    unreadTab: string
    unreadCount: (count: number) => string
    unreadSr: string
    allCaughtUp: string
    empty: string
    emptyUnread: string
    emptyDescription: string
    viewAll: string
    remove: string
    days: Record<AppNotification['day'], string>
    kinds: Record<NotificationKind, string>
    items: Record<string, { title: string; body: string }>
  }
  budgets: {
    title: string
    description: string
    totalLimit: string
    totalSpent: string
    remaining: string
    overBudget: string
    overBudgetHint: string
    categoriesCount: (count: number) => string
    ofTotal: (pct: string) => string
    untilEndOfMonth: string
    listTitle: string
    detailDescription: string
    spent: string
    limit: string
    available: string
    exceededBy: string
    historyTitle: string
    historyAria: (category: string) => string
    average: (amount: string) => string
    transactionsTitle: string
    transactionsDescription: (category: string) => string
    noTransactions: string
    editLimit: string
    editTitle: (category: string) => string
    editDescription: string
    limitLabel: string
    currentSpent: (amount: string) => string
    limitUpdated: string
    askSync: string
    askPrompt: (category: string) => string
  }
  bills: {
    title: string
    description: string
    totalPending: string
    nextDue: string
    paidThisMonth: string
    billsCount: (count: number) => string
    filterAria: string
    pendingTab: string
    paidTab: string
    paidBadge: string
    viewInvoice: string
    allPaid: string
    allPaidDescription: string
    nonePaid: string
    titles: Record<string, string>
  }
  accountDetail: {
    notFound: string
    notFoundDescription: string
    refresh: string
    refreshed: string
    disconnect: string
    disconnectTitle: (bank: string) => string
    disconnectDescription: string
    disconnected: (bank: string) => string
    holdingsCount: (count: number) => string
    incomeMonth: string
    expensesMonth: string
    inThisAccount: string
    transactionsTitle: string
    transactionsDescription: string
    noTransactions: string
    infoTitle: string
    institution: string
    type: string
    agency: string
    accountNumber: string
    copyAria: string
    copied: string
    yield: string
    lastSync: string
    investmentsTitle: string
    noInvestments: string
    linkedCards: string
    linkedCardsDescription: string
  }
  cardDetail: {
    notFound: string
    notFoundDescription: string
    askSync: string
    askPrompt: (name: string) => string
    invoicePaid: string
    blockedBadge: string
    closing: string
    due: string
    bestDay: string
    autoDebit: (account: string) => string
    invoiceTab: string
    settingsTab: string
    statementTitle: string
    statementDescription: (count: number) => string
    installment: (value: string) => string
    byCategory: string
    securityTitle: string
    securityDescription: string
    activeTitle: string
    blockedTitle: string
    blockDescription: string
    block: string
    unblock: string
    blockedToast: string
    unblockedToast: string
    purchasesTitle: string
    purchasesDescription: string
    onlineTitle: string
    onlineDescription: string
    internationalTitle: string
    internationalDescription: string
    contactlessTitle: string
    contactlessDescription: string
    settingsSaved: string
  }
  investmentDetail: {
    notFound: string
    notFoundDescription: string
    apply: string
    redeem: string
    currentValue: string
    shareOfPortfolio: (pct: string) => string
    applied: string
    totalReturn: string
    sinceStart: string
    monthReturn: string
    historyTitle: string
    historyDescription: string
    historyAria: (name: string) => string
    infoTitle: string
    institution: string
    category: string
    rate: string
    variable: string
    liquidity: string
    liquidityLabels: Record<Liquidity, string>
    maturity: string
    noMaturity: string
    risk: string
    riskLabels: Record<Risk, string>
    syncTitle: string
    syncPositive: string
    syncNegative: string
    askSync: string
    askPrompt: (name: string) => string
    applyTitle: string
    redeemTitle: string
    amountLabel: string
    availableIn: (bank: string, amount: string) => string
    insufficient: string
    redeemHint: (amount: string) => string
    redeemExceeds: string
    appliedDone: string
    redeemedDone: string
  }
  search: {
    resultsAria: string
    noResults: (query: string) => string
    groups: {
      pages: string
      transactions: string
      accounts: string
      cards: string
      investments: string
    }
  }
  settingsExtra: {
    nameRequired: string
    emailInvalid: string
    profileSaved: string
    photoUpdated: string
    photoRemoved: string
    photoInvalid: string
    twoFactorOn: string
    twoFactorOff: string
    preferenceSaved: string
    viewNotifications: string
    deleteTitle: string
    deleteKeyword: string
    deleteConfirmLabel: (keyword: string) => string
    deleted: string
    deletedDescription: string
  }
  auth: {
    title: string
    description: string
    password: string
    invalid: string
    signIn: string
    demoHint: string
    welcomeBack: (name: string) => string
    logoutTitle: string
    logoutDescription: string
    mascotWelcome: string
  }
  investmentsSync: {
    badge: string
    title: string
    description: string
    action: string
    prompt: string
  }
  accountsSync: {
    statusBadge: string
    title: string
    subtitle: (accounts: number, cards: number) => string
    askSync: string
    prompt: string
  }
  budgetsSync: {
    badge: string
    title: string
    description: string
    action: string
    prompt: string
  }
  settingsSync: {
    title: string
    description: string
    badge: string
    characterTitle: string
    characterDescription: string
    moodNormal: string
    moodHappy: string
    moodThinking: string
  }
}

const plural = (count: number, one: string, many: string) => `${count} ${count === 1 ? one : many}`

export const pagesPt: PagesTranslations = {
  common: {
    close: 'Fechar',
    cancel: 'Cancelar',
    save: 'Salvar',
    back: 'Voltar',
    viewDetails: 'Ver detalhes',
    notificationsRegion: 'Avisos',
    monthNames: {
      Jan: 'janeiro', Feb: 'fevereiro', Mar: 'março', Apr: 'abril', May: 'maio', Jun: 'junho',
      Jul: 'julho', Aug: 'agosto', Sep: 'setembro', Oct: 'outubro', Nov: 'novembro', Dec: 'dezembro',
    },
  },
  navExtra: {
    planning: 'Planejamento',
  },
  dashboardExtra: {
    periodDescription: (month) => `Aqui está o seu resumo financeiro de ${month}.`,
    periodAria: (period) => `Período: ${period}. Alterar período`,
    manageBudgets: 'Gerenciar orçamentos',
    viewAllBills: 'Ver vencimentos',
    perDay: '/ dia',
    limitTotal: (amount) => `Limite: ${amount}`,
    openCardAria: (name) => `Abrir cartão ${name}`,
    accountDetailsAria: (name, bank) => `Ver detalhes de ${name} (${bank})`,
    payBillAria: (title) => `Pagar ${title}`,
  },
  transactionsExtra: {
    exported: 'Exportação concluída',
    exportedCount: (count) => `${plural(count, 'transação exportada', 'transações exportadas')} em CSV`,
    exportEmpty: 'Nenhuma transação para exportar com os filtros atuais',
    csvHeader: ['Data', 'Descrição', 'Categoria', 'Tipo', 'Status', 'Valor (R$)'],
  },
  transactionDetail: {
    title: 'Detalhes da transação',
    description: 'Informações completas do lançamento',
    category: 'Categoria',
    date: 'Data',
    paidWith: 'Pago com',
    receivedIn: 'Recebido em',
    type: 'Tipo',
    transactionId: 'ID da transação',
    copyId: 'Copiar ID da transação',
    idCopied: 'ID copiado',
    notInformed: 'Não informado',
    note: 'Observação',
    failedTitle: 'Pagamento não concluído',
    failedDescription: 'O débito foi recusado pelo banco. Verifique o saldo da conta e tente novamente.',
    retry: 'Tentar novamente',
    retried: 'Nova tentativa enviada',
    retriedDescription: 'Você será notificado quando o banco confirmar.',
    askSync: 'Perguntar ao Sync sobre esta transação',
    askPrompt: (description) => `Me explique a transação "${description}" e se ela foge do meu padrão de gastos`,
    delete: 'Excluir',
    deleteTitle: 'Excluir transação?',
    deleteDescription: (description) => `"${description}" será removida do seu histórico. Esta ação não pode ser desfeita.`,
    deleted: 'Transação excluída',
  },
  newTransaction: {
    title: 'Nova transação',
    description: 'Registre uma despesa ou receita manualmente.',
    typeLabel: 'Tipo de transação',
    descriptionLabel: 'Descrição',
    descriptionPlaceholder: 'Ex.: Padaria, Freelance, Farmácia',
    descriptionRequired: 'Informe uma descrição',
    amountLabel: 'Valor',
    amountInvalid: 'Informe um valor maior que zero (ex.: 125,50)',
    dateLabel: 'Data',
    categoryLabel: 'Categoria',
    paidWithLabel: 'Pago com',
    receivedInLabel: 'Recebido em',
    cardsGroup: 'Cartões de crédito',
    accountsGroup: 'Contas',
    noteLabel: 'Observação (opcional)',
    notePlaceholder: 'Adicione um detalhe para lembrar depois',
    alreadyPaid: 'Já foi paga',
    alreadyReceived: 'Já foi recebida',
    submit: 'Adicionar transação',
    created: 'Transação adicionada',
  },
  newInvestment: {
    title: 'Novo investimento',
    description: 'Registre uma aplicação. O valor sai do saldo da conta escolhida.',
    nameLabel: 'Nome do ativo',
    namePlaceholder: 'Ex.: CDB Banco Inter 110% CDI',
    nameRequired: 'Informe o nome do ativo',
    categoryLabel: 'Classe',
    accountLabel: 'Instituição',
    amountLabel: 'Valor aplicado',
    availableInAccount: (amount) => `Disponível na conta: ${amount}`,
    insufficient: (balance) => `Saldo insuficiente. Disponível: ${balance}`,
    rateLabel: 'Rentabilidade (opcional)',
    ratePlaceholder: 'Ex.: 110% CDI',
    submit: 'Aplicar',
    created: 'Investimento registrado',
  },
  transfer: {
    pixTitle: 'Área Pix',
    pixDescription: 'Envie um Pix usando CPF, e-mail, telefone ou chave aleatória.',
    transferTitle: 'Transferir entre contas',
    transferDescription: 'Mova dinheiro entre suas contas conectadas.',
    from: 'De',
    to: 'Para',
    available: (amount) => `Disponível: ${amount}`,
    pixKey: 'Chave Pix',
    pixKeyPlaceholder: 'CPF, e-mail, telefone ou chave aleatória',
    pixKeyHint: 'Confira os dados do destinatário antes de enviar.',
    pixKeyInvalid: 'Informe uma chave Pix válida',
    sameAccount: 'Escolha uma conta de destino diferente da origem',
    insufficient: (balance) => `Saldo insuficiente. Disponível: ${balance}`,
    sendPix: 'Enviar Pix',
    submitTransfer: 'Transferir',
    sentTo: (destination) => `Pix enviado · ${destination}`,
    receivedFrom: (origin) => `Transferência recebida · ${origin}`,
    pixDone: 'Pix enviado',
    transferDone: 'Transferência realizada',
  },
  connectAccount: {
    title: 'Conectar nova conta',
    description: 'Escolha a instituição. A conexão usa o Open Finance do Banco Central.',
    searchPlaceholder: 'Buscar instituição',
    noResults: 'Nenhuma instituição encontrada.',
    confirmTitle: (bank) => `Conectar ${bank}`,
    confirmDescription: 'Revise o tipo de conta e as permissões solicitadas.',
    kindLabel: 'Tipo de conta',
    securityTitle: 'O FinSync terá acesso somente leitura a:',
    permissions: ['Saldo e extrato da conta', 'Dados cadastrais básicos', 'Faturas e limites de cartões vinculados'],
    submit: 'Autorizar conexão',
    connecting: 'Conectando…',
    connected: (bank) => `${bank} conectado`,
    connectedDescription: 'Os dados da conta serão sincronizados em instantes.',
  },
  passwordDialog: {
    title: 'Atualizar senha',
    description: 'Use uma senha forte que você não utiliza em outros serviços.',
    current: 'Senha atual',
    currentRequired: 'Informe a senha atual',
    next: 'Nova senha',
    hint: 'Mínimo de 8 caracteres, com letras, números e símbolos.',
    tooShort: 'A nova senha precisa ter pelo menos 8 caracteres',
    confirm: 'Confirmar nova senha',
    mismatch: 'As senhas não coincidem',
    strength: ['Senha fraca', 'Senha razoável', 'Senha boa', 'Senha forte'],
    submit: 'Atualizar senha',
    updated: 'Senha atualizada',
    updatedDescription: 'Use a nova senha no próximo acesso.',
  },
  payBill: {
    title: 'Pagar conta',
    amount: 'Valor',
    dueOn: (date) => `Vencimento em ${date}`,
    fromAccount: 'Pagar com a conta',
    balanceAfter: (amount) => `Saldo após o pagamento: ${amount}`,
    insufficient: 'Saldo insuficiente nesta conta',
    submit: 'Confirmar pagamento',
    paid: 'Pagamento realizado',
  },
  notifications: {
    title: 'Notificações',
    description: 'Alertas de contas, orçamentos, investimentos e segurança.',
    preferences: 'Preferências',
    markAllRead: 'Marcar todas como lidas',
    filterAria: 'Filtrar notificações',
    allTab: 'Todas',
    unreadTab: 'Não lidas',
    unreadCount: (count) => plural(count, 'não lida', 'não lidas'),
    unreadSr: 'Não lida',
    allCaughtUp: 'Tudo em dia',
    empty: 'Nenhuma notificação',
    emptyUnread: 'Nenhuma notificação não lida',
    emptyDescription: 'Avisaremos aqui sobre vencimentos, orçamentos e movimentações importantes.',
    viewAll: 'Ver todas as notificações',
    remove: 'Remover notificação',
    days: { today: 'Hoje', yesterday: 'Ontem', earlier: 'Anteriores' },
    kinds: {
      bill: 'Vencimento',
      budget: 'Orçamento',
      transaction: 'Transação',
      investment: 'Investimento',
      security: 'Segurança',
      ai: 'FinSync AI',
    },
    items: {
      n1: { title: 'Fatura Nubank vence em 2 dias', body: 'Sua fatura de R$ 1.842,30 vence em 02 Dez. Pague agora para evitar juros.' },
      n2: { title: 'Orçamento de Refeições estourado', body: 'Você gastou R$ 1.250,00 de R$ 1.000,00 (125%) em Refeições neste mês.' },
      n3: { title: 'Salário recebido', body: 'R$ 5.250,00 foram creditados na sua conta Bradesco.' },
      n4: { title: 'Tesouro Selic rendeu R$ 91,40', body: 'Seu Tesouro Selic 2029 acumula +7,6% desde a aplicação.' },
      n5: { title: 'Novo acesso detectado', body: 'Login em um novo dispositivo (Chrome, Windows) em São Paulo. Não foi você? Revise sua segurança.' },
      n6: { title: 'O Sync tem uma nova sugestão', body: 'Identifiquei cerca de R$ 200 de economia possível em delivery. Quer ver o plano?' },
      n7: { title: 'Conta de luz perto do vencimento', body: 'A conta da Enel de R$ 182,40 vence em 05 Dez.' },
      n8: { title: 'Pagamento da conta de luz falhou', body: 'Não conseguimos debitar R$ 182,40 da conta Bradesco. Tente novamente.' },
    },
  },
  budgets: {
    title: 'Orçamentos',
    description: 'Acompanhe e ajuste os limites mensais de cada categoria.',
    totalLimit: 'Limite total',
    totalSpent: 'Total gasto',
    remaining: 'Disponível',
    overBudget: 'Acima do limite',
    overBudgetHint: 'categorias estouradas neste mês',
    categoriesCount: (count) => plural(count, 'categoria', 'categorias'),
    ofTotal: (pct) => `${pct}% do limite total`,
    untilEndOfMonth: 'até o fim do mês',
    listTitle: 'Categorias',
    detailDescription: 'Gastos do mês em relação ao limite definido',
    spent: 'Gasto',
    limit: 'Limite',
    available: 'Disponível',
    exceededBy: 'Excedido em',
    historyTitle: 'Últimos 6 meses',
    historyAria: (category) => `Gastos mensais em ${category}`,
    average: (amount) => `Média: ${amount}`,
    transactionsTitle: 'Transações da categoria',
    transactionsDescription: (category) => `Lançamentos que contam para o orçamento de ${category}`,
    noTransactions: 'Nenhuma transação nesta categoria',
    editLimit: 'Editar limite',
    editTitle: (category) => `Limite de ${category}`,
    editDescription: 'Defina quanto você pretende gastar por mês nesta categoria.',
    limitLabel: 'Limite mensal',
    currentSpent: (amount) => `Gasto atual: ${amount}`,
    limitUpdated: 'Limite atualizado',
    askSync: 'Pedir ajuda ao Sync',
    askPrompt: (category) => `Como posso reduzir meus gastos com ${category}?`,
  },
  bills: {
    title: 'Vencimentos',
    description: 'Contas a pagar e faturas programadas.',
    totalPending: 'Total a pagar',
    nextDue: 'Próximo vencimento',
    paidThisMonth: 'Pago neste mês',
    billsCount: (count) => plural(count, 'conta', 'contas'),
    filterAria: 'Filtrar contas',
    pendingTab: 'A pagar',
    paidTab: 'Pagas',
    paidBadge: 'Paga',
    viewInvoice: 'Ver fatura',
    allPaid: 'Todas as contas estão pagas',
    allPaidDescription: 'Nenhum vencimento pendente para os próximos dias.',
    nonePaid: 'Nenhuma conta paga ainda',
    titles: {
      b1: 'Fatura Nubank Mastercard',
      b2: 'Conta de Luz (Enel)',
      b3: 'Assinatura Netflix',
      b4: 'Fatura XP Visa Infinite',
    },
  },
  accountDetail: {
    notFound: 'Conta não encontrada',
    notFoundDescription: 'Esta conta pode ter sido desconectada.',
    refresh: 'Atualizar saldo',
    refreshed: 'Saldo atualizado',
    disconnect: 'Desconectar',
    disconnectTitle: (bank) => `Desconectar ${bank}?`,
    disconnectDescription: 'O FinSync deixará de sincronizar saldo e transações desta conta. Você pode conectá-la novamente quando quiser.',
    disconnected: (bank) => `${bank} desconectado`,
    holdingsCount: (count) => plural(count, 'ativo nesta conta', 'ativos nesta conta'),
    incomeMonth: 'Entradas',
    expensesMonth: 'Saídas',
    inThisAccount: 'movimentado nesta conta',
    transactionsTitle: 'Movimentações',
    transactionsDescription: 'Entradas e saídas registradas nesta conta',
    noTransactions: 'Nenhuma movimentação nesta conta',
    infoTitle: 'Dados da conta',
    institution: 'Instituição',
    type: 'Tipo',
    agency: 'Agência',
    accountNumber: 'Conta',
    copyAria: 'Copiar agência e conta',
    copied: 'Agência e conta copiadas',
    yield: 'Rendimento',
    lastSync: 'Última sincronização',
    investmentsTitle: 'Investimentos',
    noInvestments: 'Nenhum investimento nesta instituição.',
    linkedCards: 'Cartões vinculados',
    linkedCardsDescription: 'Faturas debitadas automaticamente desta conta',
  },
  cardDetail: {
    notFound: 'Cartão não encontrado',
    notFoundDescription: 'Este cartão não está mais disponível.',
    askSync: 'Analisar fatura',
    askPrompt: (name) => `Analise a fatura do cartão ${name} e me diga onde posso economizar`,
    invoicePaid: 'Fatura paga',
    blockedBadge: 'Bloqueado',
    closing: 'Fechamento',
    due: 'Vencimento',
    bestDay: 'Melhor dia',
    autoDebit: (account) => `Débito automático da fatura na conta ${account}`,
    invoiceTab: 'Fatura atual',
    settingsTab: 'Configurações',
    statementTitle: 'Lançamentos da fatura',
    statementDescription: (count) => plural(count, 'lançamento', 'lançamentos'),
    installment: (value) => `Parcela ${value}`,
    byCategory: 'Por categoria',
    securityTitle: 'Bloqueio do cartão',
    securityDescription: 'Bloqueie temporariamente em caso de perda ou suspeita de uso indevido.',
    activeTitle: 'Cartão ativo',
    blockedTitle: 'Cartão bloqueado temporariamente',
    blockDescription: 'Enquanto bloqueado, nenhuma compra nova será aprovada. Débitos recorrentes continuam.',
    block: 'Bloquear cartão',
    unblock: 'Desbloquear cartão',
    blockedToast: 'Cartão bloqueado',
    unblockedToast: 'Cartão desbloqueado',
    purchasesTitle: 'Tipos de compra',
    purchasesDescription: 'Escolha onde o cartão pode ser usado.',
    onlineTitle: 'Compras online',
    onlineDescription: 'Sites, apps e assinaturas',
    internationalTitle: 'Compras internacionais',
    internationalDescription: 'Compras em moeda estrangeira e sites do exterior',
    contactlessTitle: 'Pagamento por aproximação',
    contactlessDescription: 'Compras sem contato (NFC)',
    settingsSaved: 'Configuração do cartão salva',
  },
  investmentDetail: {
    notFound: 'Investimento não encontrado',
    notFoundDescription: 'Este ativo pode ter sido resgatado.',
    apply: 'Aplicar',
    redeem: 'Resgatar',
    currentValue: 'Valor atual',
    shareOfPortfolio: (pct) => `${pct}% da carteira`,
    applied: 'Valor aplicado',
    totalReturn: 'Rentabilidade total',
    sinceStart: 'desde a aplicação',
    monthReturn: 'Rendimento no mês',
    historyTitle: 'Evolução',
    historyDescription: 'Valor do ativo nos últimos 6 meses',
    historyAria: (name) => `Evolução mensal de ${name}`,
    infoTitle: 'Características',
    institution: 'Instituição',
    category: 'Classe',
    rate: 'Rentabilidade',
    variable: 'Variável',
    liquidity: 'Liquidez',
    liquidityLabels: { daily: 'Diária', d2: 'D+2', d30: 'D+30', maturity: 'No vencimento' },
    maturity: 'Vencimento',
    noMaturity: 'Sem vencimento',
    risk: 'Risco',
    riskLabels: { low: 'Baixo', medium: 'Moderado', high: 'Alto' },
    syncTitle: 'Leitura do Sync',
    syncPositive: 'Este ativo está rendendo acima da inflação no período. Bom candidato para aportes recorrentes.',
    syncNegative: 'Este ativo oscilou negativamente no mês. Para renda variável, avalie o horizonte antes de resgatar.',
    askSync: 'Conversar com o Sync',
    askPrompt: (name) => `Vale a pena aumentar minha posição em ${name}?`,
    applyTitle: 'Aplicar mais',
    redeemTitle: 'Resgatar',
    amountLabel: 'Valor',
    availableIn: (bank, amount) => `Disponível em ${bank}: ${amount}`,
    insufficient: 'Saldo insuficiente na conta vinculada',
    redeemHint: (amount) => `Disponível para resgate: ${amount}`,
    redeemExceeds: 'O valor excede o saldo do investimento',
    appliedDone: 'Aplicação realizada',
    redeemedDone: 'Resgate solicitado',
  },
  search: {
    resultsAria: 'Resultados da busca',
    noResults: (query) => `Nada encontrado para "${query}"`,
    groups: {
      pages: 'Páginas',
      transactions: 'Transações',
      accounts: 'Contas',
      cards: 'Cartões',
      investments: 'Investimentos',
    },
  },
  settingsExtra: {
    nameRequired: 'Informe seu nome',
    emailInvalid: 'Informe um e-mail válido',
    profileSaved: 'Perfil atualizado',
    photoUpdated: 'Foto atualizada',
    photoRemoved: 'Foto removida',
    photoInvalid: 'Escolha um arquivo de imagem',
    twoFactorOn: 'Autenticação em dois fatores ativada',
    twoFactorOff: 'Autenticação em dois fatores desativada',
    preferenceSaved: 'Preferência salva',
    viewNotifications: 'Ver notificações',
    deleteTitle: 'Excluir sua conta?',
    deleteKeyword: 'EXCLUIR',
    deleteConfirmLabel: (keyword) => `Digite ${keyword} para confirmar`,
    deleted: 'Conta excluída',
    deletedDescription: 'Sentiremos sua falta. (Demonstração: nenhum dado foi apagado.)',
  },
  auth: {
    title: 'Entrar no FinSync',
    description: 'Você saiu da sua conta.',
    password: 'Senha',
    invalid: 'Informe um e-mail válido e sua senha',
    signIn: 'Entrar',
    demoHint: 'Demonstração: qualquer senha funciona.',
    welcomeBack: (name) => `Bem-vindo de volta, ${name}!`,
    logoutTitle: 'Sair do FinSync?',
    logoutDescription: 'Você precisará entrar novamente para acessar suas finanças.',
    mascotWelcome: 'Olá! Que bom te ver de volta! 👋',
  },
  investmentsSync: {
    badge: 'Sync Portfolio AI',
    title: 'Rendimento acumulado em alta este mês (+R$ 145,15)',
    description: 'Sua carteira está bem equilibrada com 60% em Renda Fixa. Deseja simular um aporte estratégico para acelerar sua meta?',
    action: 'Pedir recomendação ao Sync',
    prompt: 'Analise minha carteira de investimentos e sugira onde aportar para otimizar meus rendimentos.',
  },
  accountsSync: {
    statusBadge: 'Sincronizado & Protegido',
    title: 'Auditoria de Patrimônio Ativa',
    subtitle: (acc, cards) =>
      `Sync monitorando ${acc} contas e ${cards} cartões em tempo real via Open Finance com criptografia bancária.`,
    askSync: 'Diagnóstico com Sync',
    prompt: 'Faça um diagnóstico completo do meu patrimônio e saúde financeira atual.',
  },
  budgetsSync: {
    badge: 'Sync Budget Coach',
    title: 'Refeições acima da meta (+25%) — Ajuste recomendado',
    description: 'Você economizou em Transporte e Mercado. Quer que eu recalibre suas metas para você fechar o mês no azul?',
    action: 'Recalibrar com o Sync',
    prompt: 'Como recalibrar meus orçamentos de Refeições e Transporte para fechar o mês no azul?',
  },
  settingsSync: {
    title: 'Sync — Mascote & Inteligência Artificial',
    description: 'Interaja com o mascote do FinSync e experimente suas expressões dinâmicas em tempo real.',
    badge: 'IA Ativa',
    characterTitle: 'Sync (Lontra Inteligente)',
    characterDescription: 'Os olhos seguem seu cursor e piscam naturalmente enquanto você navega pelas telas.',
    moodNormal: 'Normal',
    moodHappy: 'Feliz',
    moodThinking: 'Pensando',
  },
}

export const pagesEn: PagesTranslations = {
  common: {
    close: 'Close',
    cancel: 'Cancel',
    save: 'Save',
    back: 'Back',
    viewDetails: 'View details',
    notificationsRegion: 'Alerts',
    monthNames: {
      Jan: 'January', Feb: 'February', Mar: 'March', Apr: 'April', May: 'May', Jun: 'June',
      Jul: 'July', Aug: 'August', Sep: 'September', Oct: 'October', Nov: 'November', Dec: 'December',
    },
  },
  navExtra: {
    planning: 'Planning',
  },
  dashboardExtra: {
    periodDescription: (month) => `Here is your financial summary for ${month}.`,
    periodAria: (period) => `Period: ${period}. Change period`,
    manageBudgets: 'Manage budgets',
    viewAllBills: 'View bills',
    perDay: '/ day',
    limitTotal: (amount) => `Limit: ${amount}`,
    openCardAria: (name) => `Open card ${name}`,
    accountDetailsAria: (name, bank) => `View details of ${name} (${bank})`,
    payBillAria: (title) => `Pay ${title}`,
  },
  transactionsExtra: {
    exported: 'Export complete',
    exportedCount: (count) => `${plural(count, 'transaction', 'transactions')} exported as CSV`,
    exportEmpty: 'No transactions to export with the current filters',
    csvHeader: ['Date', 'Description', 'Category', 'Type', 'Status', 'Amount (R$)'],
  },
  transactionDetail: {
    title: 'Transaction details',
    description: 'Full information about this entry',
    category: 'Category',
    date: 'Date',
    paidWith: 'Paid with',
    receivedIn: 'Received in',
    type: 'Type',
    transactionId: 'Transaction ID',
    copyId: 'Copy transaction ID',
    idCopied: 'ID copied',
    notInformed: 'Not provided',
    note: 'Note',
    failedTitle: 'Payment not completed',
    failedDescription: 'The bank declined the debit. Check the account balance and try again.',
    retry: 'Try again',
    retried: 'Retry sent',
    retriedDescription: 'We will notify you once the bank confirms.',
    askSync: 'Ask Sync about this transaction',
    askPrompt: (description) => `Explain the transaction "${description}" and whether it breaks my spending pattern`,
    delete: 'Delete',
    deleteTitle: 'Delete transaction?',
    deleteDescription: (description) => `"${description}" will be removed from your history. This cannot be undone.`,
    deleted: 'Transaction deleted',
  },
  newTransaction: {
    title: 'New transaction',
    description: 'Record an expense or income manually.',
    typeLabel: 'Transaction type',
    descriptionLabel: 'Description',
    descriptionPlaceholder: 'e.g. Bakery, Freelance, Pharmacy',
    descriptionRequired: 'Enter a description',
    amountLabel: 'Amount',
    amountInvalid: 'Enter an amount greater than zero (e.g. 125.50)',
    dateLabel: 'Date',
    categoryLabel: 'Category',
    paidWithLabel: 'Paid with',
    receivedInLabel: 'Received in',
    cardsGroup: 'Credit cards',
    accountsGroup: 'Accounts',
    noteLabel: 'Note (optional)',
    notePlaceholder: 'Add a detail to remember later',
    alreadyPaid: 'Already paid',
    alreadyReceived: 'Already received',
    submit: 'Add transaction',
    created: 'Transaction added',
  },
  newInvestment: {
    title: 'New investment',
    description: 'Record an investment. The amount is taken from the chosen account.',
    nameLabel: 'Asset name',
    namePlaceholder: 'e.g. CDB Banco Inter 110% CDI',
    nameRequired: 'Enter the asset name',
    categoryLabel: 'Asset class',
    accountLabel: 'Institution',
    amountLabel: 'Amount invested',
    availableInAccount: (amount) => `Available in account: ${amount}`,
    insufficient: (balance) => `Insufficient balance. Available: ${balance}`,
    rateLabel: 'Yield (optional)',
    ratePlaceholder: 'e.g. 110% CDI',
    submit: 'Invest',
    created: 'Investment recorded',
  },
  transfer: {
    pixTitle: 'Pix',
    pixDescription: 'Send a Pix using a CPF, email, phone or random key.',
    transferTitle: 'Transfer between accounts',
    transferDescription: 'Move money between your connected accounts.',
    from: 'From',
    to: 'To',
    available: (amount) => `Available: ${amount}`,
    pixKey: 'Pix key',
    pixKeyPlaceholder: 'CPF, email, phone or random key',
    pixKeyHint: 'Double-check the recipient before sending.',
    pixKeyInvalid: 'Enter a valid Pix key',
    sameAccount: 'Choose a destination different from the origin',
    insufficient: (balance) => `Insufficient balance. Available: ${balance}`,
    sendPix: 'Send Pix',
    submitTransfer: 'Transfer',
    sentTo: (destination) => `Pix sent · ${destination}`,
    receivedFrom: (origin) => `Transfer received · ${origin}`,
    pixDone: 'Pix sent',
    transferDone: 'Transfer completed',
  },
  connectAccount: {
    title: 'Connect a new account',
    description: 'Choose the institution. The connection uses Brazil’s Open Finance.',
    searchPlaceholder: 'Search institution',
    noResults: 'No institution found.',
    confirmTitle: (bank) => `Connect ${bank}`,
    confirmDescription: 'Review the account type and requested permissions.',
    kindLabel: 'Account type',
    securityTitle: 'FinSync will have read-only access to:',
    permissions: ['Account balance and statement', 'Basic profile data', 'Invoices and limits of linked cards'],
    submit: 'Authorize connection',
    connecting: 'Connecting…',
    connected: (bank) => `${bank} connected`,
    connectedDescription: 'Account data will sync in a moment.',
  },
  passwordDialog: {
    title: 'Update password',
    description: 'Use a strong password you don’t use anywhere else.',
    current: 'Current password',
    currentRequired: 'Enter your current password',
    next: 'New password',
    hint: 'At least 8 characters, with letters, numbers and symbols.',
    tooShort: 'The new password must be at least 8 characters',
    confirm: 'Confirm new password',
    mismatch: 'Passwords do not match',
    strength: ['Weak password', 'Fair password', 'Good password', 'Strong password'],
    submit: 'Update password',
    updated: 'Password updated',
    updatedDescription: 'Use your new password next time you sign in.',
  },
  payBill: {
    title: 'Pay bill',
    amount: 'Amount',
    dueOn: (date) => `Due on ${date}`,
    fromAccount: 'Pay from account',
    balanceAfter: (amount) => `Balance after payment: ${amount}`,
    insufficient: 'Insufficient balance in this account',
    submit: 'Confirm payment',
    paid: 'Payment completed',
  },
  notifications: {
    title: 'Notifications',
    description: 'Alerts about bills, budgets, investments and security.',
    preferences: 'Preferences',
    markAllRead: 'Mark all as read',
    filterAria: 'Filter notifications',
    allTab: 'All',
    unreadTab: 'Unread',
    unreadCount: (count) => `${count} unread`,
    unreadSr: 'Unread',
    allCaughtUp: 'All caught up',
    empty: 'No notifications',
    emptyUnread: 'No unread notifications',
    emptyDescription: 'We will let you know here about due dates, budgets and important activity.',
    viewAll: 'View all notifications',
    remove: 'Remove notification',
    days: { today: 'Today', yesterday: 'Yesterday', earlier: 'Earlier' },
    kinds: {
      bill: 'Due date',
      budget: 'Budget',
      transaction: 'Transaction',
      investment: 'Investment',
      security: 'Security',
      ai: 'FinSync AI',
    },
    items: {
      n1: { title: 'Nubank invoice due in 2 days', body: 'Your R$ 1.842,30 invoice is due on Dec 02. Pay now to avoid interest.' },
      n2: { title: 'Dining budget exceeded', body: 'You spent R$ 1.250,00 of R$ 1.000,00 (125%) on Dining this month.' },
      n3: { title: 'Salary received', body: 'R$ 5.250,00 was credited to your Bradesco account.' },
      n4: { title: 'Tesouro Selic earned R$ 91,40', body: 'Your Tesouro Selic 2029 is up +7.6% since you invested.' },
      n5: { title: 'New sign-in detected', body: 'Sign-in from a new device (Chrome, Windows) in São Paulo. Wasn’t you? Review your security.' },
      n6: { title: 'Sync has a new suggestion', body: 'I found about R$ 200 in possible savings on delivery. Want to see the plan?' },
      n7: { title: 'Electricity bill due soon', body: 'Your R$ 182,40 Enel bill is due on Dec 05.' },
      n8: { title: 'Electricity bill payment failed', body: 'We couldn’t debit R$ 182,40 from your Bradesco account. Please try again.' },
    },
  },
  budgets: {
    title: 'Budgets',
    description: 'Track and adjust the monthly limit for each category.',
    totalLimit: 'Total limit',
    totalSpent: 'Total spent',
    remaining: 'Available',
    overBudget: 'Over budget',
    overBudgetHint: 'categories exceeded this month',
    categoriesCount: (count) => plural(count, 'category', 'categories'),
    ofTotal: (pct) => `${pct}% of the total limit`,
    untilEndOfMonth: 'until the end of the month',
    listTitle: 'Categories',
    detailDescription: 'This month’s spending against the limit you set',
    spent: 'Spent',
    limit: 'Limit',
    available: 'Available',
    exceededBy: 'Exceeded by',
    historyTitle: 'Last 6 months',
    historyAria: (category) => `Monthly spending on ${category}`,
    average: (amount) => `Average: ${amount}`,
    transactionsTitle: 'Category transactions',
    transactionsDescription: (category) => `Entries that count towards the ${category} budget`,
    noTransactions: 'No transactions in this category',
    editLimit: 'Edit limit',
    editTitle: (category) => `${category} limit`,
    editDescription: 'Set how much you plan to spend per month in this category.',
    limitLabel: 'Monthly limit',
    currentSpent: (amount) => `Spent so far: ${amount}`,
    limitUpdated: 'Limit updated',
    askSync: 'Ask Sync for help',
    askPrompt: (category) => `How can I reduce my spending on ${category}?`,
  },
  bills: {
    title: 'Bills',
    description: 'Upcoming bills and scheduled invoices.',
    totalPending: 'Total due',
    nextDue: 'Next due',
    paidThisMonth: 'Paid this month',
    billsCount: (count) => plural(count, 'bill', 'bills'),
    filterAria: 'Filter bills',
    pendingTab: 'To pay',
    paidTab: 'Paid',
    paidBadge: 'Paid',
    viewInvoice: 'View invoice',
    allPaid: 'All bills are paid',
    allPaidDescription: 'Nothing due in the coming days.',
    nonePaid: 'No bills paid yet',
    titles: {
      b1: 'Nubank Mastercard invoice',
      b2: 'Electricity bill (Enel)',
      b3: 'Netflix subscription',
      b4: 'XP Visa Infinite invoice',
    },
  },
  accountDetail: {
    notFound: 'Account not found',
    notFoundDescription: 'This account may have been disconnected.',
    refresh: 'Refresh balance',
    refreshed: 'Balance refreshed',
    disconnect: 'Disconnect',
    disconnectTitle: (bank) => `Disconnect ${bank}?`,
    disconnectDescription: 'FinSync will stop syncing the balance and transactions of this account. You can reconnect it anytime.',
    disconnected: (bank) => `${bank} disconnected`,
    holdingsCount: (count) => plural(count, 'holding in this account', 'holdings in this account'),
    incomeMonth: 'Money in',
    expensesMonth: 'Money out',
    inThisAccount: 'moved through this account',
    transactionsTitle: 'Activity',
    transactionsDescription: 'Money in and out recorded in this account',
    noTransactions: 'No activity in this account',
    infoTitle: 'Account details',
    institution: 'Institution',
    type: 'Type',
    agency: 'Branch',
    accountNumber: 'Account',
    copyAria: 'Copy branch and account number',
    copied: 'Branch and account copied',
    yield: 'Yield',
    lastSync: 'Last sync',
    investmentsTitle: 'Investments',
    noInvestments: 'No investments at this institution.',
    linkedCards: 'Linked cards',
    linkedCardsDescription: 'Invoices automatically debited from this account',
  },
  cardDetail: {
    notFound: 'Card not found',
    notFoundDescription: 'This card is no longer available.',
    askSync: 'Analyze invoice',
    askPrompt: (name) => `Analyze the ${name} invoice and tell me where I can save`,
    invoicePaid: 'Invoice paid',
    blockedBadge: 'Blocked',
    closing: 'Closing',
    due: 'Due',
    bestDay: 'Best day',
    autoDebit: (account) => `Invoice auto-debited from ${account}`,
    invoiceTab: 'Current invoice',
    settingsTab: 'Settings',
    statementTitle: 'Invoice entries',
    statementDescription: (count) => plural(count, 'entry', 'entries'),
    installment: (value) => `Installment ${value}`,
    byCategory: 'By category',
    securityTitle: 'Card lock',
    securityDescription: 'Lock it temporarily if it is lost or you suspect misuse.',
    activeTitle: 'Card active',
    blockedTitle: 'Card temporarily locked',
    blockDescription: 'While locked, no new purchases are approved. Recurring charges continue.',
    block: 'Lock card',
    unblock: 'Unlock card',
    blockedToast: 'Card locked',
    unblockedToast: 'Card unlocked',
    purchasesTitle: 'Purchase types',
    purchasesDescription: 'Choose where the card can be used.',
    onlineTitle: 'Online purchases',
    onlineDescription: 'Websites, apps and subscriptions',
    internationalTitle: 'International purchases',
    internationalDescription: 'Foreign currency and overseas websites',
    contactlessTitle: 'Contactless payments',
    contactlessDescription: 'Tap-to-pay purchases (NFC)',
    settingsSaved: 'Card setting saved',
  },
  investmentDetail: {
    notFound: 'Investment not found',
    notFoundDescription: 'This holding may have been redeemed.',
    apply: 'Invest',
    redeem: 'Redeem',
    currentValue: 'Current value',
    shareOfPortfolio: (pct) => `${pct}% of portfolio`,
    applied: 'Amount invested',
    totalReturn: 'Total return',
    sinceStart: 'since you invested',
    monthReturn: 'Earnings this month',
    historyTitle: 'Performance',
    historyDescription: 'Holding value over the last 6 months',
    historyAria: (name) => `Monthly value of ${name}`,
    infoTitle: 'Characteristics',
    institution: 'Institution',
    category: 'Asset class',
    rate: 'Yield',
    variable: 'Variable',
    liquidity: 'Liquidity',
    liquidityLabels: { daily: 'Daily', d2: 'T+2', d30: 'T+30', maturity: 'At maturity' },
    maturity: 'Maturity',
    noMaturity: 'No maturity',
    risk: 'Risk',
    riskLabels: { low: 'Low', medium: 'Moderate', high: 'High' },
    syncTitle: 'Sync’s take',
    syncPositive: 'This holding is beating inflation over the period. A good candidate for recurring contributions.',
    syncNegative: 'This holding dipped this month. For equities, consider your horizon before redeeming.',
    askSync: 'Chat with Sync',
    askPrompt: (name) => `Is it worth increasing my position in ${name}?`,
    applyTitle: 'Invest more',
    redeemTitle: 'Redeem',
    amountLabel: 'Amount',
    availableIn: (bank, amount) => `Available at ${bank}: ${amount}`,
    insufficient: 'Insufficient balance in the linked account',
    redeemHint: (amount) => `Available to redeem: ${amount}`,
    redeemExceeds: 'The amount exceeds the holding balance',
    appliedDone: 'Investment made',
    redeemedDone: 'Redemption requested',
  },
  search: {
    resultsAria: 'Search results',
    noResults: (query) => `Nothing found for "${query}"`,
    groups: {
      pages: 'Pages',
      transactions: 'Transactions',
      accounts: 'Accounts',
      cards: 'Cards',
      investments: 'Investments',
    },
  },
  settingsExtra: {
    nameRequired: 'Enter your name',
    emailInvalid: 'Enter a valid email',
    profileSaved: 'Profile updated',
    photoUpdated: 'Photo updated',
    photoRemoved: 'Photo removed',
    photoInvalid: 'Choose an image file',
    twoFactorOn: 'Two-factor authentication enabled',
    twoFactorOff: 'Two-factor authentication disabled',
    preferenceSaved: 'Preference saved',
    viewNotifications: 'View notifications',
    deleteTitle: 'Delete your account?',
    deleteKeyword: 'DELETE',
    deleteConfirmLabel: (keyword) => `Type ${keyword} to confirm`,
    deleted: 'Account deleted',
    deletedDescription: 'We’ll miss you. (Demo: no data was deleted.)',
  },
  auth: {
    title: 'Sign in to FinSync',
    description: 'You have signed out.',
    password: 'Password',
    invalid: 'Enter a valid email and your password',
    signIn: 'Sign in',
    demoHint: 'Demo: any password works.',
    welcomeBack: (name) => `Welcome back, ${name}!`,
    logoutTitle: 'Sign out of FinSync?',
    logoutDescription: 'You will need to sign in again to access your finances.',
    mascotWelcome: 'Hey there! Great to have you back! 👋',
  },
  investmentsSync: {
    badge: 'Sync Portfolio AI',
    title: 'Portfolio earnings on the rise this month (+R$ 145.15)',
    description: 'Your holdings are well-balanced with 60% in Fixed Income. Would you like to simulate a strategic contribution to accelerate goals?',
    action: 'Ask Sync for advice',
    prompt: 'Analyze my investment portfolio and suggest where to contribute to maximize my returns.',
  },
  accountsSync: {
    statusBadge: 'Synced & Protected',
    title: 'Live Net Worth Auditing',
    subtitle: (acc, cards) =>
      `Sync is monitoring ${acc} accounts and ${cards} cards in real time via Open Finance with bank-grade encryption.`,
    askSync: 'Audit with Sync',
    prompt: 'Run a full audit on my net worth and current financial health.',
  },
  budgetsSync: {
    badge: 'Sync Budget Coach',
    title: 'Dining exceeded limit (+25%) — Rebalance recommended',
    description: 'You saved on Transit and Groceries. Want me to reallocate budget limits so you finish the month in the green?',
    action: 'Rebalance with Sync',
    prompt: 'How can I rebalance my Dining and Transit budgets to stay in the green this month?',
  },
  settingsSync: {
    title: 'Sync — Mascot & AI Companion',
    description: 'Interact with the FinSync otter mascot and preview dynamic expressions in real time.',
    badge: 'AI Active',
    characterTitle: 'Sync (Smart Otter)',
    characterDescription: 'Eyes track your cursor and blink naturally as you browse through the app.',
    moodNormal: 'Idle',
    moodHappy: 'Happy',
    moodThinking: 'Thinking',
  },
}

export const pagesEs: PagesTranslations = {
  common: {
    close: 'Cerrar',
    cancel: 'Cancelar',
    save: 'Guardar',
    back: 'Volver',
    viewDetails: 'Ver detalles',
    notificationsRegion: 'Avisos',
    monthNames: {
      Jan: 'enero', Feb: 'febrero', Mar: 'marzo', Apr: 'abril', May: 'mayo', Jun: 'junio',
      Jul: 'julio', Aug: 'agosto', Sep: 'septiembre', Oct: 'octubre', Nov: 'noviembre', Dec: 'diciembre',
    },
  },
  navExtra: {
    planning: 'Planificación',
  },
  dashboardExtra: {
    periodDescription: (month) => `Este es tu resumen financiero de ${month}.`,
    periodAria: (period) => `Período: ${period}. Cambiar período`,
    manageBudgets: 'Gestionar presupuestos',
    viewAllBills: 'Ver vencimientos',
    perDay: '/ día',
    limitTotal: (amount) => `Límite: ${amount}`,
    openCardAria: (name) => `Abrir tarjeta ${name}`,
    accountDetailsAria: (name, bank) => `Ver detalles de ${name} (${bank})`,
    payBillAria: (title) => `Pagar ${title}`,
  },
  transactionsExtra: {
    exported: 'Exportación completada',
    exportedCount: (count) => `${plural(count, 'transacción exportada', 'transacciones exportadas')} en CSV`,
    exportEmpty: 'No hay transacciones para exportar con los filtros actuales',
    csvHeader: ['Fecha', 'Descripción', 'Categoría', 'Tipo', 'Estado', 'Importe (R$)'],
  },
  transactionDetail: {
    title: 'Detalles de la transacción',
    description: 'Información completa del movimiento',
    category: 'Categoría',
    date: 'Fecha',
    paidWith: 'Pagado con',
    receivedIn: 'Recibido en',
    type: 'Tipo',
    transactionId: 'ID de la transacción',
    copyId: 'Copiar ID de la transacción',
    idCopied: 'ID copiado',
    notInformed: 'No informado',
    note: 'Nota',
    failedTitle: 'Pago no completado',
    failedDescription: 'El banco rechazó el débito. Revisa el saldo de la cuenta e inténtalo de nuevo.',
    retry: 'Reintentar',
    retried: 'Reintento enviado',
    retriedDescription: 'Te avisaremos cuando el banco lo confirme.',
    askSync: 'Preguntar a Sync sobre esta transacción',
    askPrompt: (description) => `Explícame la transacción "${description}" y si se sale de mi patrón de gastos`,
    delete: 'Eliminar',
    deleteTitle: '¿Eliminar transacción?',
    deleteDescription: (description) => `"${description}" se eliminará de tu historial. Esta acción no se puede deshacer.`,
    deleted: 'Transacción eliminada',
  },
  newTransaction: {
    title: 'Nueva transacción',
    description: 'Registra un gasto o ingreso manualmente.',
    typeLabel: 'Tipo de transacción',
    descriptionLabel: 'Descripción',
    descriptionPlaceholder: 'Ej.: Panadería, Freelance, Farmacia',
    descriptionRequired: 'Introduce una descripción',
    amountLabel: 'Importe',
    amountInvalid: 'Introduce un importe mayor que cero (ej.: 125,50)',
    dateLabel: 'Fecha',
    categoryLabel: 'Categoría',
    paidWithLabel: 'Pagado con',
    receivedInLabel: 'Recibido en',
    cardsGroup: 'Tarjetas de crédito',
    accountsGroup: 'Cuentas',
    noteLabel: 'Nota (opcional)',
    notePlaceholder: 'Añade un detalle para recordarlo después',
    alreadyPaid: 'Ya está pagada',
    alreadyReceived: 'Ya fue recibida',
    submit: 'Añadir transacción',
    created: 'Transacción añadida',
  },
  newInvestment: {
    title: 'Nueva inversión',
    description: 'Registra una inversión. El importe sale del saldo de la cuenta elegida.',
    nameLabel: 'Nombre del activo',
    namePlaceholder: 'Ej.: CDB Banco Inter 110% CDI',
    nameRequired: 'Introduce el nombre del activo',
    categoryLabel: 'Clase',
    accountLabel: 'Institución',
    amountLabel: 'Importe invertido',
    availableInAccount: (amount) => `Disponible en la cuenta: ${amount}`,
    insufficient: (balance) => `Saldo insuficiente. Disponible: ${balance}`,
    rateLabel: 'Rentabilidad (opcional)',
    ratePlaceholder: 'Ej.: 110% CDI',
    submit: 'Invertir',
    created: 'Inversión registrada',
  },
  transfer: {
    pixTitle: 'Área Pix',
    pixDescription: 'Envía un Pix con CPF, correo, teléfono o clave aleatoria.',
    transferTitle: 'Transferir entre cuentas',
    transferDescription: 'Mueve dinero entre tus cuentas conectadas.',
    from: 'Desde',
    to: 'Hacia',
    available: (amount) => `Disponible: ${amount}`,
    pixKey: 'Clave Pix',
    pixKeyPlaceholder: 'CPF, correo, teléfono o clave aleatoria',
    pixKeyHint: 'Revisa los datos del destinatario antes de enviar.',
    pixKeyInvalid: 'Introduce una clave Pix válida',
    sameAccount: 'Elige una cuenta de destino distinta de la de origen',
    insufficient: (balance) => `Saldo insuficiente. Disponible: ${balance}`,
    sendPix: 'Enviar Pix',
    submitTransfer: 'Transferir',
    sentTo: (destination) => `Pix enviado · ${destination}`,
    receivedFrom: (origin) => `Transferencia recibida · ${origin}`,
    pixDone: 'Pix enviado',
    transferDone: 'Transferencia realizada',
  },
  connectAccount: {
    title: 'Conectar nueva cuenta',
    description: 'Elige la institución. La conexión usa el Open Finance de Brasil.',
    searchPlaceholder: 'Buscar institución',
    noResults: 'No se encontró ninguna institución.',
    confirmTitle: (bank) => `Conectar ${bank}`,
    confirmDescription: 'Revisa el tipo de cuenta y los permisos solicitados.',
    kindLabel: 'Tipo de cuenta',
    securityTitle: 'FinSync tendrá acceso de solo lectura a:',
    permissions: ['Saldo y extracto de la cuenta', 'Datos básicos del perfil', 'Facturas y límites de las tarjetas vinculadas'],
    submit: 'Autorizar conexión',
    connecting: 'Conectando…',
    connected: (bank) => `${bank} conectado`,
    connectedDescription: 'Los datos de la cuenta se sincronizarán en breve.',
  },
  passwordDialog: {
    title: 'Actualizar contraseña',
    description: 'Usa una contraseña segura que no utilices en otros servicios.',
    current: 'Contraseña actual',
    currentRequired: 'Introduce tu contraseña actual',
    next: 'Nueva contraseña',
    hint: 'Mínimo 8 caracteres, con letras, números y símbolos.',
    tooShort: 'La nueva contraseña debe tener al menos 8 caracteres',
    confirm: 'Confirmar nueva contraseña',
    mismatch: 'Las contraseñas no coinciden',
    strength: ['Contraseña débil', 'Contraseña aceptable', 'Contraseña buena', 'Contraseña fuerte'],
    submit: 'Actualizar contraseña',
    updated: 'Contraseña actualizada',
    updatedDescription: 'Usa la nueva contraseña en tu próximo acceso.',
  },
  payBill: {
    title: 'Pagar cuenta',
    amount: 'Importe',
    dueOn: (date) => `Vence el ${date}`,
    fromAccount: 'Pagar con la cuenta',
    balanceAfter: (amount) => `Saldo tras el pago: ${amount}`,
    insufficient: 'Saldo insuficiente en esta cuenta',
    submit: 'Confirmar pago',
    paid: 'Pago realizado',
  },
  notifications: {
    title: 'Notificaciones',
    description: 'Alertas de cuentas, presupuestos, inversiones y seguridad.',
    preferences: 'Preferencias',
    markAllRead: 'Marcar todas como leídas',
    filterAria: 'Filtrar notificaciones',
    allTab: 'Todas',
    unreadTab: 'No leídas',
    unreadCount: (count) => plural(count, 'no leída', 'no leídas'),
    unreadSr: 'No leída',
    allCaughtUp: 'Todo al día',
    empty: 'Sin notificaciones',
    emptyUnread: 'Sin notificaciones no leídas',
    emptyDescription: 'Te avisaremos aquí sobre vencimientos, presupuestos y movimientos importantes.',
    viewAll: 'Ver todas las notificaciones',
    remove: 'Eliminar notificación',
    days: { today: 'Hoy', yesterday: 'Ayer', earlier: 'Anteriores' },
    kinds: {
      bill: 'Vencimiento',
      budget: 'Presupuesto',
      transaction: 'Transacción',
      investment: 'Inversión',
      security: 'Seguridad',
      ai: 'FinSync AI',
    },
    items: {
      n1: { title: 'La factura Nubank vence en 2 días', body: 'Tu factura de R$ 1.842,30 vence el 02 Dic. Págala ahora para evitar intereses.' },
      n2: { title: 'Presupuesto de Comidas superado', body: 'Gastaste R$ 1.250,00 de R$ 1.000,00 (125%) en Comidas este mes.' },
      n3: { title: 'Salario recibido', body: 'Se acreditaron R$ 5.250,00 en tu cuenta Bradesco.' },
      n4: { title: 'Tesouro Selic rindió R$ 91,40', body: 'Tu Tesouro Selic 2029 acumula +7,6% desde la inversión.' },
      n5: { title: 'Nuevo acceso detectado', body: 'Inicio de sesión desde un nuevo dispositivo (Chrome, Windows) en São Paulo. ¿No fuiste tú? Revisa tu seguridad.' },
      n6: { title: 'Sync tiene una nueva sugerencia', body: 'Encontré unos R$ 200 de ahorro posible en delivery. ¿Quieres ver el plan?' },
      n7: { title: 'Factura de luz próxima a vencer', body: 'La factura de Enel de R$ 182,40 vence el 05 Dic.' },
      n8: { title: 'Falló el pago de la luz', body: 'No pudimos debitar R$ 182,40 de tu cuenta Bradesco. Inténtalo de nuevo.' },
    },
  },
  budgets: {
    title: 'Presupuestos',
    description: 'Sigue y ajusta el límite mensual de cada categoría.',
    totalLimit: 'Límite total',
    totalSpent: 'Total gastado',
    remaining: 'Disponible',
    overBudget: 'Sobre el límite',
    overBudgetHint: 'categorías superadas este mes',
    categoriesCount: (count) => plural(count, 'categoría', 'categorías'),
    ofTotal: (pct) => `${pct}% del límite total`,
    untilEndOfMonth: 'hasta fin de mes',
    listTitle: 'Categorías',
    detailDescription: 'Gastos del mes frente al límite definido',
    spent: 'Gastado',
    limit: 'Límite',
    available: 'Disponible',
    exceededBy: 'Excedido en',
    historyTitle: 'Últimos 6 meses',
    historyAria: (category) => `Gastos mensuales en ${category}`,
    average: (amount) => `Promedio: ${amount}`,
    transactionsTitle: 'Transacciones de la categoría',
    transactionsDescription: (category) => `Movimientos que cuentan para el presupuesto de ${category}`,
    noTransactions: 'No hay transacciones en esta categoría',
    editLimit: 'Editar límite',
    editTitle: (category) => `Límite de ${category}`,
    editDescription: 'Define cuánto planeas gastar al mes en esta categoría.',
    limitLabel: 'Límite mensual',
    currentSpent: (amount) => `Gasto actual: ${amount}`,
    limitUpdated: 'Límite actualizado',
    askSync: 'Pedir ayuda a Sync',
    askPrompt: (category) => `¿Cómo puedo reducir mis gastos en ${category}?`,
  },
  bills: {
    title: 'Vencimientos',
    description: 'Cuentas por pagar y facturas programadas.',
    totalPending: 'Total por pagar',
    nextDue: 'Próximo vencimiento',
    paidThisMonth: 'Pagado este mes',
    billsCount: (count) => plural(count, 'cuenta', 'cuentas'),
    filterAria: 'Filtrar cuentas',
    pendingTab: 'Por pagar',
    paidTab: 'Pagadas',
    paidBadge: 'Pagada',
    viewInvoice: 'Ver factura',
    allPaid: 'Todas las cuentas están pagadas',
    allPaidDescription: 'No hay vencimientos pendientes en los próximos días.',
    nonePaid: 'Aún no hay cuentas pagadas',
    titles: {
      b1: 'Factura Nubank Mastercard',
      b2: 'Factura de luz (Enel)',
      b3: 'Suscripción Netflix',
      b4: 'Factura XP Visa Infinite',
    },
  },
  accountDetail: {
    notFound: 'Cuenta no encontrada',
    notFoundDescription: 'Es posible que esta cuenta se haya desconectado.',
    refresh: 'Actualizar saldo',
    refreshed: 'Saldo actualizado',
    disconnect: 'Desconectar',
    disconnectTitle: (bank) => `¿Desconectar ${bank}?`,
    disconnectDescription: 'FinSync dejará de sincronizar el saldo y las transacciones de esta cuenta. Puedes volver a conectarla cuando quieras.',
    disconnected: (bank) => `${bank} desconectado`,
    holdingsCount: (count) => plural(count, 'activo en esta cuenta', 'activos en esta cuenta'),
    incomeMonth: 'Entradas',
    expensesMonth: 'Salidas',
    inThisAccount: 'movido en esta cuenta',
    transactionsTitle: 'Movimientos',
    transactionsDescription: 'Entradas y salidas registradas en esta cuenta',
    noTransactions: 'Sin movimientos en esta cuenta',
    infoTitle: 'Datos de la cuenta',
    institution: 'Institución',
    type: 'Tipo',
    agency: 'Sucursal',
    accountNumber: 'Cuenta',
    copyAria: 'Copiar sucursal y cuenta',
    copied: 'Sucursal y cuenta copiadas',
    yield: 'Rendimiento',
    lastSync: 'Última sincronización',
    investmentsTitle: 'Inversiones',
    noInvestments: 'No hay inversiones en esta institución.',
    linkedCards: 'Tarjetas vinculadas',
    linkedCardsDescription: 'Facturas debitadas automáticamente de esta cuenta',
  },
  cardDetail: {
    notFound: 'Tarjeta no encontrada',
    notFoundDescription: 'Esta tarjeta ya no está disponible.',
    askSync: 'Analizar factura',
    askPrompt: (name) => `Analiza la factura de la tarjeta ${name} y dime dónde puedo ahorrar`,
    invoicePaid: 'Factura pagada',
    blockedBadge: 'Bloqueada',
    closing: 'Cierre',
    due: 'Vencimiento',
    bestDay: 'Mejor día',
    autoDebit: (account) => `Débito automático de la factura en la cuenta ${account}`,
    invoiceTab: 'Factura actual',
    settingsTab: 'Configuración',
    statementTitle: 'Movimientos de la factura',
    statementDescription: (count) => plural(count, 'movimiento', 'movimientos'),
    installment: (value) => `Cuota ${value}`,
    byCategory: 'Por categoría',
    securityTitle: 'Bloqueo de la tarjeta',
    securityDescription: 'Bloquéala temporalmente en caso de pérdida o sospecha de uso indebido.',
    activeTitle: 'Tarjeta activa',
    blockedTitle: 'Tarjeta bloqueada temporalmente',
    blockDescription: 'Mientras esté bloqueada no se aprobarán compras nuevas. Los cargos recurrentes continúan.',
    block: 'Bloquear tarjeta',
    unblock: 'Desbloquear tarjeta',
    blockedToast: 'Tarjeta bloqueada',
    unblockedToast: 'Tarjeta desbloqueada',
    purchasesTitle: 'Tipos de compra',
    purchasesDescription: 'Elige dónde se puede usar la tarjeta.',
    onlineTitle: 'Compras online',
    onlineDescription: 'Sitios web, apps y suscripciones',
    internationalTitle: 'Compras internacionales',
    internationalDescription: 'Compras en moneda extranjera y sitios del exterior',
    contactlessTitle: 'Pago sin contacto',
    contactlessDescription: 'Compras por aproximación (NFC)',
    settingsSaved: 'Configuración de la tarjeta guardada',
  },
  investmentDetail: {
    notFound: 'Inversión no encontrada',
    notFoundDescription: 'Es posible que este activo se haya rescatado.',
    apply: 'Invertir',
    redeem: 'Rescatar',
    currentValue: 'Valor actual',
    shareOfPortfolio: (pct) => `${pct}% de la cartera`,
    applied: 'Importe invertido',
    totalReturn: 'Rentabilidad total',
    sinceStart: 'desde la inversión',
    monthReturn: 'Rendimiento del mes',
    historyTitle: 'Evolución',
    historyDescription: 'Valor del activo en los últimos 6 meses',
    historyAria: (name) => `Evolución mensual de ${name}`,
    infoTitle: 'Características',
    institution: 'Institución',
    category: 'Clase',
    rate: 'Rentabilidad',
    variable: 'Variable',
    liquidity: 'Liquidez',
    liquidityLabels: { daily: 'Diaria', d2: 'D+2', d30: 'D+30', maturity: 'Al vencimiento' },
    maturity: 'Vencimiento',
    noMaturity: 'Sin vencimiento',
    risk: 'Riesgo',
    riskLabels: { low: 'Bajo', medium: 'Moderado', high: 'Alto' },
    syncTitle: 'La lectura de Sync',
    syncPositive: 'Este activo rinde por encima de la inflación en el período. Buen candidato para aportes recurrentes.',
    syncNegative: 'Este activo bajó en el mes. En renta variable, evalúa tu horizonte antes de rescatar.',
    askSync: 'Hablar con Sync',
    askPrompt: (name) => `¿Vale la pena aumentar mi posición en ${name}?`,
    applyTitle: 'Invertir más',
    redeemTitle: 'Rescatar',
    amountLabel: 'Importe',
    availableIn: (bank, amount) => `Disponible en ${bank}: ${amount}`,
    insufficient: 'Saldo insuficiente en la cuenta vinculada',
    redeemHint: (amount) => `Disponible para rescatar: ${amount}`,
    redeemExceeds: 'El importe supera el saldo de la inversión',
    appliedDone: 'Inversión realizada',
    redeemedDone: 'Rescate solicitado',
  },
  search: {
    resultsAria: 'Resultados de búsqueda',
    noResults: (query) => `No se encontró nada para "${query}"`,
    groups: {
      pages: 'Páginas',
      transactions: 'Transacciones',
      accounts: 'Cuentas',
      cards: 'Tarjetas',
      investments: 'Inversiones',
    },
  },
  settingsExtra: {
    nameRequired: 'Introduce tu nombre',
    emailInvalid: 'Introduce un correo válido',
    profileSaved: 'Perfil actualizado',
    photoUpdated: 'Foto actualizada',
    photoRemoved: 'Foto eliminada',
    photoInvalid: 'Elige un archivo de imagen',
    twoFactorOn: 'Autenticación en dos pasos activada',
    twoFactorOff: 'Autenticación en dos pasos desactivada',
    preferenceSaved: 'Preferencia guardada',
    viewNotifications: 'Ver notificaciones',
    deleteTitle: '¿Eliminar tu cuenta?',
    deleteKeyword: 'ELIMINAR',
    deleteConfirmLabel: (keyword) => `Escribe ${keyword} para confirmar`,
    deleted: 'Cuenta eliminada',
    deletedDescription: 'Te echaremos de menos. (Demostración: no se borró ningún dato.)',
  },
  auth: {
    title: 'Entrar en FinSync',
    description: 'Has cerrado sesión.',
    password: 'Contraseña',
    invalid: 'Introduce un correo válido y tu contraseña',
    signIn: 'Entrar',
    demoHint: 'Demostración: cualquier contraseña funciona.',
    welcomeBack: (name) => `¡Bienvenido de nuevo, ${name}!`,
    logoutTitle: '¿Salir de FinSync?',
    logoutDescription: 'Tendrás que volver a entrar para acceder a tus finanzas.',
    mascotWelcome: '¡Hola! ¡Qué bueno tenerte de vuelta! 👋',
  },
  investmentsSync: {
    badge: 'Sync Portfolio AI',
    title: 'Rendimientos en alza este mes (+R$ 145,15)',
    description: 'Tu cartera está bien equilibrada con un 60% en Renta Fija. ¿Quieres simular un aporte estratégico para acelerar tus metas?',
    action: 'Pedir recomendación a Sync',
    prompt: 'Analiza mi cartera de inversiones y sugiere dónde aportar para optimizar mis rendimientos.',
  },
  accountsSync: {
    statusBadge: 'Sincronizado y Protegido',
    title: 'Auditoría de Patrimonio Activa',
    subtitle: (acc, cards) =>
      `Sync monitorea ${acc} cuentas y ${cards} tarjetas en tiempo real mediante Open Finance con cifrado bancario.`,
    askSync: 'Diagnóstico con Sync',
    prompt: 'Haz un diagnóstico completo de mi patrimonio y salud financiera actual.',
  },
  budgetsSync: {
    badge: 'Sync Budget Coach',
    title: 'Comidas superó el límite (+25%) — Ajuste recomendado',
    description: 'Ahorraste en Transporte y Mercado. ¿Quieres que recalibre tus metas para cerrar el mes en verde?',
    action: 'Recalibrar con Sync',
    prompt: '¿Cómo recalibrar mis presupuestos de Comidas y Transporte para cerrar el mes en verde?',
  },
  settingsSync: {
    title: 'Sync — Mascota e Inteligencia Artificial',
    description: 'Interactúa con la nutria mascota de FinSync y prueba sus expresiones dinámicas en tiempo real.',
    badge: 'IA Activa',
    characterTitle: 'Sync (Nutria Inteligente)',
    characterDescription: 'Los ojos siguen tu cursor y parpadean con naturalidad mientras navegas por la app.',
    moodNormal: 'Normal',
    moodHappy: 'Feliz',
    moodThinking: 'Pensando',
  },
}
