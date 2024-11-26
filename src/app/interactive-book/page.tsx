'use client'

import { useState } from 'react'
import InteractiveLayout from '@/components/layout/InteractiveLayout'
import { ChevronLeft, ChevronRight, Bookmark, BookOpen } from 'lucide-react'
import { useApp } from '@/context/AppContext'

export default function InteractiveBook() {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 10
  const { t } = useApp()

  const FloatingControls = () => (
    <div className="flex items-center space-x-4">
      <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
        <ChevronLeft className="w-6 h-6" />
      </button>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {t('common.page')} {currentPage} {t('common.of')} {totalPages}
      </span>
      <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )

  return (
    <InteractiveLayout floatingControls={<FloatingControls />}>
      <div className="h-full flex">
        {/* Sidebar with Chapters */}
        <div className="w-64 border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('common.chapters')}
            </h2>
            <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <BookOpen className="w-5 h-5" />
            </button>
          </div>
          <nav className="space-y-1">
            {['Введение', 'Глава 1', 'Глава 2', 'Глава 3'].map((chapter, index) => (
              <button
                key={index}
                className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {chapter}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/* Book Pages */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Глава 1: Начало работы
                </h1>
                <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
              <div className="prose dark:prose-invert">
                <p>
                  Добро пожаловать в интерактивную книгу. Эта глава проведет вас через основы нашей платформы.
                </p>
                {/* Add more content here */}
              </div>

              {/* Interactive Exercise Example */}
              <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Интерактивное упражнение
                </h3>
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    Попробуйте применить полученные знания, выполнив это упражнение.
                  </p>
                  {/* Add interactive elements here */}
                </div>
              </div>
            </div>
          </div>

          {/* Notes Panel */}
          <div className="w-64 border-l border-gray-200 dark:border-gray-700 p-4 overflow-y-auto">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {t('common.notes')}
            </h2>
            <textarea
              className="w-full h-48 p-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
              placeholder={t('common.addNotes')}
            />
          </div>
        </div>
      </div>
    </InteractiveLayout>
  )
}
