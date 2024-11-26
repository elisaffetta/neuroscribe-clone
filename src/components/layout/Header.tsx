'use client'

import { FC } from 'react'
import { Bell, Moon, Sun, User, Globe } from 'lucide-react'
import { useApp } from '@/context/AppContext'

const Header: FC = () => {
  const { theme, setTheme, language, setLanguage, t } = useApp()

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          {t('common.neuroscribe')}
        </h1>
      </div>
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={t('common.darkMode')}
        >
          {theme === 'dark' ? (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>

        {/* Language Toggle */}
        <div className="relative">
          <button
            onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
            className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={t('common.language')}
          >
            <Globe className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {language.toUpperCase()}
            </span>
          </button>
        </div>

        {/* Notifications */}
        <button 
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          aria-label={t('common.notifications')}
        >
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Profile */}
        <button 
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          aria-label={t('common.profile')}
        >
          <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </header>
  )
}

export default Header
