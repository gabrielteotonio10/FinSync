import { useState } from 'react'
import { ThemeSwitcher } from './components/ThemeSwitcher'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen">
      <header
        className="border-b transition-colors"
        style={{ borderColor: 'var(--semantic-light-color-border-default)' }}
      >
        <div className="max-w-7xl mx-auto px-[var(--primitives-spacing-lg)] py-[var(--primitives-spacing-lg)] flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">FinSync</h1>
            <p className="mt-xs" style={{ color: 'var(--semantic-light-color-text-secondary)' }}>
              Design System v0.1.0
            </p>
          </div>
          <ThemeSwitcher />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-[var(--primitives-spacing-lg)] py-[var(--primitives-spacing-lg)]">
        <section>
          <h2 className="text-2xl font-bold mb-[var(--primitives-spacing-md)]">
            Token System Active
          </h2>
          <p className="mb-[var(--primitives-spacing-lg)]">
            Design tokens are now integrated with Tailwind CSS and CSS variables.
          </p>

          <div
            className="mt-[var(--primitives-spacing-lg)] p-[var(--primitives-spacing-lg)] rounded-[var(--primitives-radius-md)] border transition-colors"
            style={{
              backgroundColor: 'var(--semantic-light-color-surface-raised)',
              borderColor: 'var(--semantic-light-color-border-default)',
            }}
          >
            <div className="grid grid-cols-2 gap-[var(--primitives-spacing-md)]">
              <div>
                <h3 className="font-semibold">Counter Demo</h3>
                <p
                  className="text-3xl font-mono font-bold mt-xs"
                  style={{ color: 'var(--semantic-light-color-action-primary)' }}
                >
                  {count}
                </p>
              </div>

              <div>
                <h3 className="font-semibold">Token Status</h3>
                <p className="text-sm mt-xs">
                  ✅ CSS Variables Generated
                  <br />✅ Light/Dark Modes
                  <br />✅ Theme Switcher
                </p>
              </div>
            </div>

            <button
              onClick={() => setCount((c) => c + 1)}
              className="mt-[var(--primitives-spacing-md)] px-[var(--primitives-spacing-md)] py-[var(--primitives-spacing-sm)] rounded-[var(--primitives-radius-md)] font-medium transition-colors text-white"
              style={{
                backgroundColor: 'var(--semantic-light-color-action-primary)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  'var(--semantic-light-color-action-primary-hover)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  'var(--semantic-light-color-action-primary)'
              }}
            >
              Increment
            </button>
          </div>

          <div className="mt-[var(--primitives-spacing-2xl)] p-[var(--primitives-spacing-lg)] rounded-[var(--primitives-radius-md)] border"
            style={{
              backgroundColor: 'var(--semantic-light-color-surface-default)',
              borderColor: 'var(--semantic-light-color-border-default)',
            }}
          >
            <h3 className="font-semibold mb-md">Design Tokens Demo</h3>
            <div className="space-y-sm">
              <div>
                <span className="text-sm font-mono">Spacing:</span>
                <div className="flex gap-xs mt-xs">
                  <div
                    className="bg-primary-500"
                    style={{
                      width: 'var(--primitives-spacing-xs)',
                      height: 'var(--primitives-spacing-xs)',
                    }}
                  />
                  <div
                    className="bg-primary-500"
                    style={{
                      width: 'var(--primitives-spacing-sm)',
                      height: 'var(--primitives-spacing-sm)',
                    }}
                  />
                  <div
                    className="bg-primary-500"
                    style={{
                      width: 'var(--primitives-spacing-md)',
                      height: 'var(--primitives-spacing-md)',
                    }}
                  />
                  <div
                    className="bg-primary-500"
                    style={{
                      width: 'var(--primitives-spacing-lg)',
                      height: 'var(--primitives-spacing-lg)',
                    }}
                  />
                </div>
              </div>

              <div>
                <span className="text-sm font-mono">Radius:</span>
                <div className="flex gap-sm mt-xs">
                  <div
                    className="w-12 h-12 bg-success-500"
                    style={{ borderRadius: 'var(--primitives-radius-sm)' }}
                  />
                  <div
                    className="w-12 h-12 bg-success-500"
                    style={{ borderRadius: 'var(--primitives-radius-md)' }}
                  />
                  <div
                    className="w-12 h-12 bg-success-500"
                    style={{ borderRadius: 'var(--primitives-radius-lg)' }}
                  />
                  <div
                    className="w-12 h-12 bg-success-500"
                    style={{ borderRadius: 'var(--primitives-radius-full)' }}
                  />
                </div>
              </div>

              <div>
                <span className="text-sm font-mono">Finance Colors:</span>
                <div className="flex gap-sm mt-xs">
                  <div
                    className="px-md py-sm rounded-md text-white font-medium"
                    style={{
                      backgroundColor: 'var(--semantic-light-color-finance-income)',
                    }}
                  >
                    Income
                  </div>
                  <div
                    className="px-md py-sm rounded-md text-white font-medium"
                    style={{
                      backgroundColor: 'var(--semantic-light-color-finance-expense)',
                    }}
                  >
                    Expense
                  </div>
                  <div
                    className="px-md py-sm rounded-md text-white font-medium"
                    style={{
                      backgroundColor: 'var(--semantic-light-color-finance-neutral)',
                    }}
                  >
                    Neutral
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
