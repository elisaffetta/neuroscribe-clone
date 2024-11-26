'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Template } from '@/types/templates'
import { Home, ArrowRight } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import AppLayout from '../AppLayout'
import { templates as templateData } from '@/data/templates'

export default function TemplatesPage() {
  const { t } = useApp()
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setTemplates(templateData)
        setLoading(false)
      } catch (err) {
        setError('Ошибка при загрузке шаблонов')
        setLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  if (loading) {
    return (
      <AppLayout>
        <div className="p-6">
          <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        </div>
      </AppLayout>
    )
  }

  if (error) {
    return (
      <AppLayout>
        <div className="p-6">
          <div className="text-red-500">{error}</div>
        </div>
      </AppLayout>
    )
  }

  return (
    <AppLayout>
      <div className="p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Link
            href="/"
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <Home size={20} />
          </Link>
          <span className="text-gray-500 dark:text-gray-400">/</span>
          <span className="text-gray-900 dark:text-white">Шаблоны</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <motion.div
              key={template.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-8 cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group"
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setHoveredId(template.id)}
              onHoverEnd={() => setHoveredId(null)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{template.icon}</div>
                <div className="px-3 py-1 text-sm rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300">
                  {t(`templates.categories.${template.category}`)}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {template.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                {template.description}
              </p>

              <Link 
                href={`/templates/${template.id}`}
                className="absolute bottom-8 right-8 w-10 h-10 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center text-white transform transition-transform group-hover:scale-110"
              >
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
