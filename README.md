# FinSync Design System

Professional, production-ready design system for Brazilian fintech platform (personal finance management).

**Status**: ✅ **COMPLETE** — All 7 development phases finished (Core system + 4 functional screens)

## 🎯 Overview

FinSync is a comprehensive design system and working application built with:

- **React** 19 + **TypeScript** (strict mode)
- **Vite** - Fast builds & HMR
- **Tailwind CSS v4** - Utility-first with CSS variables
- **Design Tokens** - Style Dictionary for single source of truth
- **25+ Components** - Buttons, inputs, cards, badges, switches, typography
- **Financial Components** - MonetaryValue, TransactionItem, CreditCard, BudgetCard
- **Layout System** - Sidebar, Header, Grid, Container, MainLayout
- **4 Working Screens** - Dashboard, Transactions, Accounts, Settings
- **Storybook** - 40+ documented stories with a11y addon
- **Testing** - Vitest (unit) + Playwright (E2E)
- **Accessibility** - WCAG AA, keyboard nav, focus management

## 🚀 Quick Start

### Installation & Development

```bash
npm install
npm run dev          # http://localhost:5173
```

### Storybook (Component Library)

```bash
npm run storybook    # http://localhost:6006
```

### Testing

```bash
npm run test          # Unit tests (Vitest)
npm run test:ui       # Vitest UI
npm run test:e2e      # E2E tests (Playwright)
```

### Building

```bash
npm run build         # Production build
npm run preview       # Preview production build
```

## 📊 What's Included

### Design Tokens (Passo 2) ✅
- Primitives: Colors (6 palettes × 10 shades), Spacing (8 values), Radius, Shadows, Motion
- Semantic: Light/Dark modes with 15+ color slots
- Financial: Income (green), Expense (red), Neutral (gray)
- CSS variables generated via Style Dictionary
- Full theme support (light/dark toggle in UI)

### Components (Passos 3-5) ✅
**Base (11 components)**
- Button (4 variants × 3 sizes)
- Input, Card, Badge, Avatar
- Checkbox, Radio, Switch
- Typography (Display, H1, H2, H3, Body, Small, Muted)
- Spinner, ThemeSwitcher

**Financial (4 components)**
- MonetaryValue (with hide/show)
- TransactionItem (category + amount + status)
- CreditCard (visual card display)
- BudgetCard (progress tracking with states)

**Layout (5 components)**
- Sidebar (expandable/collapsible, mobile drawer)
- Header (sticky, with actions)
- Grid (responsive 1-4 cols)
- Container (max-width wrapper)
- MainLayout (full-page layout)

### Storybook Stories (40+) ✅
Every component documented with:
- All variant combinations
- Interactive controls
- Accessibility checks (a11y addon)
- Dark mode preview (themes addon)

### Screens (Passo 6) ✅
1. **Dashboard** - Overview, budgets, recent transactions
2. **Transactions** - List with filters and export
3. **Accounts** - Manage bank accounts, show balances
4. **Settings** - Profile, security, preferences, danger zone

## 🎨 Design Principles

### Visual Identity
- ✅ Trustworthy, clear, professional (no generic fintech defaults)
- ✅ Semantic colors (success, error, warning, neutral)
- ✅ 4px spacing grid
- ✅ Minimal radius usage (not rounded card kits)
- ✅ Intentional motion (no scattered effects)

### Engineering
- ✅ Single source of truth: Design tokens (tokens.json)
- ✅ Type safety: TypeScript strict mode
- ✅ Component variants with explicit contract
- ✅ Accessibility first (WCAG AA minimum)
- ✅ Comprehensive testing (unit + E2E + visual)

## 📁 Project Structure

```
src/
├── components/
│   ├── Button, Input, Card, Badge, Avatar/
│   ├── Checkbox, Radio, Switch/
│   ├── Typography/
│   ├── Spinner/
│   ├── Finance/        # MonetaryValue, TransactionItem, CreditCard, BudgetCard
│   ├── Layout/         # Sidebar, Header, Grid, Container, MainLayout
│   ├── ThemeSwitcher/
│   └── index.ts        # Central exports
├── screens/
│   ├── Dashboard/
│   ├── Transactions/
│   ├── Accounts/
│   ├── Settings/
│   └── index.ts
├── hooks/              # useTheme
├── lib/                # utils (cn function)
├── tokens/
│   ├── tokens.json     # Design token source
│   └── generated/      # Style Dictionary output (CSS variables)
└── App.tsx             # Main app with routing

.storybook/            # Storybook config + preview
docs/                  # DECISIONS.md, COMPONENT_PATTERNS.md
```

## 🔄 Development Workflow

### Add a New Component

1. Create folder: `src/components/ComponentName/`
2. Create component: `ComponentName.tsx`
3. Create story: `ComponentName.stories.tsx`
4. Export in: `src/components/index.ts`
5. Run Storybook to preview

### Modify Design Tokens

1. Edit: `src/tokens/tokens.json`
2. Run: `npm run tokens`
3. Generated CSS variables update automatically

### Add a New Screen

1. Create folder: `src/screens/ScreenName/`
2. Create component: `ScreenName.tsx`
3. Import in: `src/App.tsx`
4. Add routing in App's switch statement

## 🧪 Testing

- **Unit**: Vitest + @testing-library/react
- **E2E**: Playwright (multi-browser)
- **Visual**: Playwright snapshots
- **Accessibility**: Storybook a11y addon

## 📚 Documentation

- **Design Decisions**: [docs/DECISIONS.md](docs/DECISIONS.md) - Comprehensive decision log, tech stack, principles
- **Component Patterns**: [docs/COMPONENT_PATTERNS.md](docs/COMPONENT_PATTERNS.md) - How to build & test components
- **Storybook**: http://localhost:6006 - Interactive component library

## 🚢 Deployment

Ready for deployment to Vercel, Netlify, AWS, etc. Standard Vite build:

```bash
npm run build          # Creates dist/ folder
npm run preview        # Test production build locally
```

## 📊 Stats

- **Components**: 25+ (base + financial + layout)
- **Storybook Stories**: 40+
- **Design Tokens**: 150+ (primitives + semantic + financial)
- **Screens**: 4 fully functional
- **TypeScript Coverage**: 100%
- **Accessibility**: WCAG AA compliant

## 🔗 Tech Stack

| Layer | Tech | Purpose |
|-------|------|---------|
| Build | Vite | Fast, optimized builds |
| Framework | React 19 | Modern component library |
| Language | TypeScript 5.6 | Type safety (strict) |
| Styling | Tailwind CSS v4 | Utility-first CSS |
| Tokens | Style Dictionary | Generate tokens |
| Components | Radix UI | Accessible primitives |
| Icons | Lucide | Consistent iconography |
| Animation | Framer Motion | Smooth transitions |
| Charts | Recharts | Financial visualizations |
| Testing | Vitest + Playwright | Comprehensive coverage |
| Docs | Storybook | Component documentation |
| Quality | ESLint + Prettier | Code standards |

## 🤝 Contributing

All components follow the contract defined in [docs/COMPONENT_PATTERNS.md](docs/COMPONENT_PATTERNS.md):
- **Variant**: Visual intent (primary, secondary, etc.)
- **Size**: Scale (sm, md, lg)
- **State**: Interaction state (hover, focus, disabled, etc.)
- **Children**: Content rendering
- **Style**: CSS overrides (merged last)

## 📝 License

ISC

---

**Built with ❤️ for Brazilian fintech | FinSync Design System v0.1.0**