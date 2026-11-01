import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Button } from './Button/Button'

const icons = { light: Sun, dark: Moon, system: Monitor }

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()
  const Icon = icons[theme]

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      title={`Theme: ${theme}`}
      aria-label={`Toggle theme (current: ${theme})`}
    >
      <Icon />
    </Button>
  )
}
