'use client'

import StandardLayout from '@/components/layout/StandardLayout'
import { Search, Upload, Grid, List } from 'lucide-react'
import { useApp } from '@/context/AppContext'

export default function Documents() {
  const { t } = useApp()

  return (
    <StandardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {t('common.documents')}
          </h1>
          <div className="flex space-x-4">
            <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-blue-600">
              <Upload className="w-4 h-4 mr-2" />
              {t('common.upload')}
            </button>
          </div>
        </div>

        {/* Search and View Controls */}
        <div className="flex items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder={t('common.search') + '...'}
              className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <div className="flex space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <Grid className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Document Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Document items will be mapped here */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="aspect-w-3 aspect-h-4 bg-gray-100 dark:bg-gray-700 rounded-md mb-4">
                {/* Document preview */}
              </div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                {t('common.documents')} {item}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {t('common.lastModified')} 2 {t('common.daysAgo')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </StandardLayout>
  )
}
