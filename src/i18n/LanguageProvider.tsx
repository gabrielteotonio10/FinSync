import { ReactNode, useEffect, useMemo, useState } from 'react'
import { LanguageContext } from './context'
import { getInitialLanguage, HTML_LANG_MAP, translations, type Language } from './translations'

interface LanguageProviderProps {
  children: ReactNode
  defaultLanguage?: Language
}

export function LanguageProvider({ children, defaultLanguage }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => defaultLanguage ?? getInitialLanguage())

  useEffect(() => {
    document.documentElement.lang = HTML_LANG_MAP[language]
    try {
      window.localStorage.setItem('language', language)
    } catch {
      // Ignore storage write errors
    }
  }, [language])

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: translations[language],
    }),
    [language]
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
