'use client'

import { FC } from 'react'

interface UsageGraphProps {
  data: number[]
  labels: string[]
}

const UsageGraph: FC<UsageGraphProps> = ({ data, labels }) => {
  const maxValue = Math.max(...data)

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Weekly Symbols Usage</h2>
      <div className="h-64 flex items-end justify-between space-x-2">
        {data.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="w-full">
              <div
                className="bg-primary rounded-t transition-all duration-300 hover:bg-primary/80"
                style={{ height: `${(value / maxValue) * 100}%` }}
              />
            </div>
            <span className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {labels[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UsageGraph
