'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { translations } from '@/i18n/translations'

type Language = 'en' | 'ru'
type Theme = 'light' | 'dark'

interface AppContextType {
  language: Language
  setLanguage: (lang: Language) => void
  theme: Theme
  setTheme: (theme: Theme) => void
  t: (key: string) => string
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('ru')
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Load saved preferences from localStorage
    const savedLanguage = localStorage.getItem('language') as Language
    const savedTheme = localStorage.getItem('theme') as Theme
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

    // Always default to Russian if no language is saved
    if (savedLanguage && ['en', 'ru'].includes(savedLanguage)) {
      setLanguage(savedLanguage)
    } else {
      setLanguage('ru')
      localStorage.setItem('language', 'ru')
    }
    
    if (savedTheme) {
      setTheme(savedTheme)
    } else {
      setTheme(systemTheme)
    }

    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      // Save preferences to localStorage
      localStorage.setItem('language', language)
      localStorage.setItem('theme', theme)

      // Update document language
      document.documentElement.lang = language

      // Update document theme
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [language, theme, mounted])

  const t = (key: string) => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key
      }
    }
    
    return typeof value === 'string' ? value : key
  }

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, setTheme, t }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}
