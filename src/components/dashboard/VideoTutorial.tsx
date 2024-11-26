'use client'

import { FC } from 'react'
import Image from 'next/image'

interface VideoTutorialProps {
  id: number
  title: string
  thumbnail: string
  duration: string
}

const VideoTutorial: FC<VideoTutorialProps> = ({ title, thumbnail, duration }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow group hover:shadow-lg transition-shadow">
      <div className="relative">
        <Image
          src={thumbnail}
          alt={title}
          width={320}
          height={180}
          className="w-full h-48 object-cover transition-transform group-hover:scale-105"
        />
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
