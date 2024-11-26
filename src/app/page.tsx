'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import StatisticsCard from '@/components/dashboard/StatisticsCard'
import VideoTutorial from '@/components/dashboard/VideoTutorial'
import UsageGraph from '@/components/dashboard/UsageGraph'

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

const weeklyData = [40, 60, 45, 75, 50, 30, 65]
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar
        collapsed={isSidebarCollapsed}
        onToggle={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <main className={`transition-all ${isSidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <Header
          isDarkMode={isDarkMode}
          onThemeToggle={() => setIsDarkMode(!isDarkMode)}
        />

        <div className="p-6">
          {/* Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatisticsCard title="Symbols" value="193,370" color="blue-600" />
            <StatisticsCard title="Images" value="0/5,350" color="green-600" />
            <StatisticsCard title="Text" value="0/60" color="purple-600" />
          </div>

          {/* Video Tutorials */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Video Tutorials</h2>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <ChevronLeft className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <ChevronRight className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoTutorials.map((video) => (
                <VideoTutorial key={video.id} {...video} />
              ))}
            </div>
          </div>

          {/* Weekly Usage Graph */}
          <UsageGraph data={weeklyData} labels={weekDays} />
        </div>
      </main>
    </div>
  )
}
