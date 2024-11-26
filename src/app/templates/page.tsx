'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Template } from '@/types/templates'
import Sidebar from '@/components/layout/Sidebar'
import { Home } from 'lucide-react'
import { useApp } from '@/context/AppContext'

export default function TemplatesPage() {
  const { t } = useApp()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetch('/api/templates')
        if (!response.ok) {
          throw new Error('Failed to fetch templates')
        }
        const data = await response.json()
        setTemplates(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch templates')
      } finally {
        setLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
          <div className="container mx-auto px-4 py-8">
            <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
              <div className="text-red-600 dark:text-red-400">{error}</div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Link href="/" className="mr-4">
              <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <Home className="w-5 h-5" />
              </button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold mb-2">{t('templates.title')}</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {t('templates.description')}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setHoveredId(template.id)}
                onHoverEnd={() => setHoveredId(null)}
              >
                <Link href={`/templates/${template.id}`}>
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 h-full">
                    <div className="p-6">
                      <div className="text-4xl mb-4">{template.icon}</div>
                      <h3 className="text-xl font-semibold mb-2">{t(`templates.${template.id}.title`)}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {t(`templates.${template.id}.description`)}
                      </p>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredId === template.id ? 1 : 0 }}
                        className="text-indigo-600 dark:text-indigo-400 font-medium"
                      >
                        {t('templates.useTemplate')} →
                      </motion.div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
