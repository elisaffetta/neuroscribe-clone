'use client'

import { FC } from 'react'

interface StatisticsCardProps {
  title: string
  value: string
  color: string
}

const StatisticsCard: FC<StatisticsCardProps> = ({ title, value, color }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
      <p className={`text-3xl font-bold text-${color}`}>{value}</p>
    </div>
  )
}

export default StatisticsCard
