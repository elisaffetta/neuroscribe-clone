'use client'

import StandardLayout from '@/components/layout/StandardLayout'
import { Play, Search } from 'lucide-react'
import { useApp } from '@/context/AppContext'

export default function VideoTutorials() {
  const { t } = useApp()

  const tutorials = [
    {
      title: t('videoTutorials.gettingStarted'),
      duration: '10:25',
      thumbnail: '/thumbnails/getting-started.jpg'
    },
    {
      title: t('videoTutorials.advanced'),
      duration: '15:30',
      thumbnail: '/thumbnails/advanced.jpg'
    },
    {
      title: t('videoTutorials.tips'),
      duration: '8:45',
      thumbnail: '/thumbnails/tips.jpg'
    }
  ]

  return (
    <StandardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            {t('videoTutorials.title')}
          </h1>
          <div className="relative w-64">
            <input
              type="text"
              placeholder={t('videoTutorials.searchPlaceholder')}
              className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
            >
              <div className="relative">
                <div className="aspect-video bg-gray-100 dark:bg-gray-700">
                  {/* Placeholder for video thumbnail */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="p-3 bg-white/90 rounded-full shadow-lg hover:bg-white transition-colors">
                      <Play className="w-6 h-6 text-primary" />
                    </button>
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 px-2 py-1 text-xs text-white bg-black/60 rounded">
                  {tutorial.duration}
                </span>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {tutorial.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </StandardLayout>
  )
}
