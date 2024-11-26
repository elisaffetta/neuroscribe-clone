'use client'

import { useState } from 'react'
import QuickActions from '@/components/neuroscribe/QuickActions'
import Statistics from '@/components/neuroscribe/Statistics'
import NewsSection from '@/components/neuroscribe/NewsSection'
import VideoTutorial from '@/components/dashboard/VideoTutorial'
import AppLayout from './AppLayout'

const videoTutorials = [
  {
    id: 1,
    title: 'Getting Started with Analysis',
    thumbnail: 'https://picsum.photos/320/180?random=1',
    duration: '5:30'
  },
  {
    id: 2,
    title: 'Advanced Text Processing',
    thumbnail: 'https://picsum.photos/320/180?random=2',
    duration: '8:45'
  },
  {
    id: 3,
    title: 'Data Visualization Tips',
    thumbnail: 'https://picsum.photos/320/180?random=3',
    duration: '6:15'
  }
]

export default function Home() {
  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Добро пожаловать в NeuroScribe
        </h1>
        
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Быстрые действия
          </h2>
          <QuickActions />
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Статистика использования
          </h2>
          <Statistics />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Видеоинструкции
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {videoTutorials.map((tutorial) => (
                  <VideoTutorial key={tutorial.id} {...tutorial} />
                ))}
              </div>
            </section>
          </div>
          
          <div>
            <NewsSection />
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
