'use client'

import { FC } from 'react'
import { PlayCircle } from 'lucide-react'

interface VideoTutorialProps {
  id: number
  title: string
  duration: string
}

const VideoTutorial: FC<VideoTutorialProps> = ({ title, duration }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow group hover:shadow-lg transition-shadow">
      <div className="relative bg-gray-100 dark:bg-gray-700 h-48 flex items-center justify-center">
        <PlayCircle className="w-16 h-16 text-red-600 opacity-80 group-hover:opacity-100 transition-opacity" />
        <span className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm">
          {duration}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-primary transition-colors">
          {title}
        </h3>
      </div>
    </div>
  )
}

export default VideoTutorial
