'use client'

import StandardLayout from '@/components/layout/StandardLayout'
import { Search, Printer, ChevronRight } from 'lucide-react'

export default function Instructions() {
  return (
    <StandardLayout>
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Table of Contents Sidebar */}
        <div className="w-64 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search instructions..."
                className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <nav className="space-y-1 px-2">
            {['Getting Started', 'Basic Usage', 'Advanced Features', 'Troubleshooting'].map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-900 dark:text-white rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {item}
                <ChevronRight className="ml-auto h-4 w-4" />
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Instructions</h1>
              <button className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700">
                <Printer className="w-4 h-4 mr-2" />
                Print
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <span>Section 1 of 4</span>
                <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div className="w-1/4 h-1 bg-primary rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Content Sections */}
            <div className="prose dark:prose-invert max-w-none">
              <h2>Getting Started</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Welcome to our comprehensive guide. This section will walk you through the basics of using our platform.
              </p>
              {/* Add more content sections here */}
            </div>
          </div>
        </div>
      </div>
    </StandardLayout>
  )
}
