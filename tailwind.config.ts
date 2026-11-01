import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        // Will be populated by design tokens from tokens.json
        // For now, use semantic color values
        surface: {
          default: 'hsl(var(--color-surface-default) / <alpha-value>)',
          raised: 'hsl(var(--color-surface-raised) / <alpha-value>)',
          overlay: 'hsl(var(--color-surface-overlay) / <alpha-value>)',
        },
        text: {
          primary: 'hsl(var(--color-text-primary) / <alpha-value>)',
          secondary: 'hsl(var(--color-text-secondary) / <alpha-value>)',
          disabled: 'hsl(var(--color-text-disabled) / <alpha-value>)',
        },
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '80px',
      },
      borderRadius: {
        'none': '0',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        'full': '9999px',
      },
    },
  },
  plugins: [],
}

export default config
