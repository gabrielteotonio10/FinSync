# FinSync Design System

Professional design system for a Brazilian fintech personal finance platform.

## Overview

FinSync is a comprehensive design system built with:
- **React** + **TypeScript** - Modern UI framework
- **Vite** - Fast build tooling
- **Tailwind CSS v4** - Utility-first styling with CSS variables
- **shadcn/ui** - Accessible component primitives
- **Storybook** - Component documentation and testing
- **Vitest** - Unit testing
- **Playwright** - Visual and E2E testing

## Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Storybook

```bash
npm run storybook
```

### Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

### Building

```bash
npm run build
```

## Design System Architecture

- **Single source of truth**: Design tokens (tokens.json)
- **Component variants**: Explicit visual contract (variant, size, state)
- **Semantic colors**: Success (green), error (red), warning (amber), neutral (gray)
- **4px spacing grid**: xs=4, sm=8, md=16, lg=24, xl=32, 2xl=48, 3xl=64, 4xl=80
- **Accessibility first**: WCAG AA compliance, keyboard navigation, focus management

## Project Structure

```
src/
├── components/          # Reusable UI components
├── layouts/            # Page-level layouts
├── screens/            # Full-page views
├── tokens/             # Design tokens (tokens.json)
├── lib/                # Utilities and helpers
├── tests/              # Unit and E2E tests
└── index.css           # Global styles (Tailwind)

.storybook/            # Storybook configuration
docs/                  # Design system documentation
```

## Status

**Current Phase**: Passo 1 - Project Initialization ✅

Next phases:
- Passo 2: Token system and integration
- Passo 3: Base components library
- Passo 4: Financial domain components
- Passo 5+: Screens and advanced features

---

For detailed design decisions, see [../docs/DECISIONS.md](../docs/DECISIONS.md)