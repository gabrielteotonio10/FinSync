import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-surface-default text-text-primary">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-md py-lg">
          <h1 className="text-3xl font-bold">FinSync Design System</h1>
          <p className="text-text-secondary mt-xs">
            Professional design system for Brazilian fintech platform
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-md py-lg">
        <section>
          <h2 className="text-2xl font-bold mb-md">Welcome</h2>
          <p className="text-text-secondary mb-lg">
            This is the foundation of the FinSync design system. Components and tokens will be
            added here.
          </p>

          <div className="mt-lg p-lg bg-surface-raised rounded-md border border-gray-200 dark:border-gray-800">
            <p className="text-sm text-text-secondary">
              Counter: <span className="font-mono font-bold text-text-primary">{count}</span>
            </p>
            <button
              onClick={() => setCount((c) => c + 1)}
              className="mt-md px-md py-xs bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Increment
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
