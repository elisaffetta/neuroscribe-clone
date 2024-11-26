'use client'

import { useState } from 'react'
import InteractiveLayout from '@/components/layout/InteractiveLayout'
import { Play, Pause, SkipBack, SkipForward, List, MessageSquare } from 'lucide-react'

export default function VideoInstructions() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showTranscript, setShowTranscript] = useState(true)

  const FloatingControls = () => (
    <div className="flex items-center space-x-6">
      <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
        <SkipBack className="w-5 h-5" />
      </button>
      <button
        className="p-3 bg-primary text-white rounded-full hover:bg-blue-600"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
      </button>
      <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
        <SkipForward className="w-5 h-5" />
      </button>
    </div>
  )

  return (
    <InteractiveLayout floatingControls={<FloatingControls />}>
      <div className="h-full flex">
        {/* Playlist Sidebar */}
        <div className="w-80 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Video Playlist</h2>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((video) => (
                <div
                  key={video}
                  className="flex items-start p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg cursor-pointer"
                >
                  <div className="w-24 h-16 bg-gray-200 dark:bg-gray-700 rounded-md flex-shrink-0" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Video Tutorial {video}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">5:30</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Video Player */}
          <div className="relative w-full bg-black aspect-video">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white text-opacity-50">Video Player</span>
            </div>
          </div>

          {/* Video Info and Controls */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Getting Started with Analysis</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Chapter 1 • 5:30</p>
              </div>
              <div className="flex space-x-4">
                <button
                  className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  onClick={() => setShowTranscript(!showTranscript)}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Transcript
                </button>
                <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600">
                  <List className="w-4 h-4 mr-2" />
                  Chapters
                </button>
              </div>
            </div>

            {/* Transcript */}
            {showTranscript && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mt-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Transcript</h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300">
                  <p>
                    Welcome to this video tutorial. Today we'll be covering the basics of data analysis using our platform.
                  </p>
                  {/* Add more transcript content here */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </InteractiveLayout>
  )
}
