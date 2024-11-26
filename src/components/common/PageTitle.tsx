import React from 'react'

interface PageTitleProps {
  title: string
  description?: string
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, description }) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h1>
      {description && (
        <p className="text-gray-600 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  )
}
