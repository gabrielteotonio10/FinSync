import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { useLanguage } from '@/i18n'
import { Button } from './Button/Button'

const icons = { light: Sun, dark: Moon, system: Monitor }

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useLanguage()
  const Icon = icons[theme]
  const themeName = t.theme.names[theme]

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      title={t.theme.title(themeName)}
      aria-label={t.theme.toggleAria(themeName)}
    >
      <Icon />
    </Button>
  )
}
