import { createContext } from 'react'
import { getInitialLanguage, translations, type Language, type Translations } from './translations'

export interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  t: Translations
}

const initialLanguage = getInitialLanguage()

export const LanguageContext = createContext<LanguageContextValue>({
  language: initialLanguage,
  setLanguage: () => {},
  t: translations[initialLanguage],
})
