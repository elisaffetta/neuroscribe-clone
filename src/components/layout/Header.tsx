'use client'

import { FC } from 'react'
import { Bell, Moon, Sun, User } from 'lucide-react'

interface HeaderProps {
  isDarkMode: boolean
  onThemeToggle: () => void
}

const Header: FC<HeaderProps> = ({ isDarkMode, onThemeToggle }) => {
  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={onThemeToggle}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          aria-label="Toggle theme"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-500" />
          )}
        </button>
        <button 
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
        <button 
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          aria-label="User profile"
        >
          <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>
    </header>
  )
}

export default Header
