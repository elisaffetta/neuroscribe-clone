'use client'

import { useState } from 'react'
import StandardLayout from '@/components/layout/StandardLayout'
import { Settings, Play, Save, RotateCcw, Sliders } from 'lucide-react'

export default function Neurogate() {
  const [selectedTab, setSelectedTab] = useState('visualization')

  return (
    <StandardLayout>
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Control Panel */}
        <div className="w-80 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Network Controls</h2>
              <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {/* Parameter Controls */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Learning Rate
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Batch Size
                </label>
                <input
                  type="number"
                  className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-white dark:border-gray-600"
                  placeholder="Enter batch size"
                />
              </div>
              {/* Add more parameters here */}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 space-y-3">
              <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-blue-600">
                <Play className="w-4 h-4 mr-2" />
                Start Training
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600">
                <Save className="w-4 h-4 mr-2" />
                Save Model
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-white dark:border-gray-600">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {['Visualization', 'Results', 'Data'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab.toLowerCase())}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    selectedTab === tab.toLowerCase()
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6">
            {selectedTab === 'visualization' && (
              <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Network Visualization</h3>
                  <button className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                    <Sliders className="w-5 h-5" />
                  </button>
                </div>
                <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg">
                  {/* Network visualization will go here */}
                </div>
              </div>
            )}

            {selectedTab === 'results' && (
              <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Training Results</h3>
                <div className="space-y-6">
                  {/* Results charts and metrics will go here */}
                </div>
              </div>
            )}

            {selectedTab === 'data' && (
              <div className="h-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Data Management</h3>
                <div className="space-y-6">
                  {/* Data upload and management interface will go here */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </StandardLayout>
  )
}
