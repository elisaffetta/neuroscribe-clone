'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { templates } from '@/data/templates'
import Sidebar from '@/components/layout/Sidebar'
import { Home } from 'lucide-react'

export default function TemplatesPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

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
              <h1 className="text-3xl font-bold mb-2">Шаблоны</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Выберите шаблон для быстрого создания качественного контента
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
                      <h3 className="text-xl font-semibold mb-2">{template.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {template.description}
                      </p>
                    </div>
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredId === template.id ? 1 : 0 }}
                        className="text-indigo-600 dark:text-indigo-400 font-medium"
                      >
                        Использовать шаблон →
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
