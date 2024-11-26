'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { templates } from '@/data/templates'
import { TemplateFormData } from '@/types/templates'
import Sidebar from '@/components/layout/Sidebar'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { ArrowLeft } from 'lucide-react'

export default function TemplatePage() {
  const { id } = useParams()
  const template = templates.find(t => t.id === id)
  const [formData, setFormData] = useState<TemplateFormData>({})
  const [result, setResult] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  if (!template) {
    return <div>Шаблон не найден</div>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Здесь будет вызов API OpenAI
      // Пока просто имитация задержки
      await new Promise(resolve => setTimeout(resolve, 2000))
      setResult('Здесь будет результат от API OpenAI...')
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }))
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className={`flex-1 overflow-y-auto transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link href="/" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Home className="w-5 h-5" />
            </Link>
            <Link href="/templates" className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold mb-2">{template.title}</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {template.description}
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Форма */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="text-4xl mb-4">{template.icon}</div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {template.fields.map((field) => (
                    <div key={field.id}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {field.label}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                          value={formData[field.id] as string || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          required={field.required}
                        >
                          <option value="">Выберите опцию</option>
                          {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                          value={formData[field.id] as string || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          required={field.required}
                          rows={4}
                        />
                      ) : (
                        <input
                          type={field.type}
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                          value={formData[field.id] as string || ''}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          required={field.required}
                        />
                      )}
                    </div>
                  ))}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
                  >
                    {isLoading ? 'Генерация...' : 'Создать контент'}
                  </button>
                </form>
              </div>
            </div>

            {/* Результат */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-full">
                <h2 className="text-xl font-semibold mb-4">Результат</h2>
                <AnimatePresence mode="wait">
                  {isLoading ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/6" />
                    </motion.div>
                  ) : result ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="prose dark:prose-invert max-w-none"
                    >
                      {result}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-gray-500 dark:text-gray-400 text-center py-12"
                    >
                      Здесь появится сгенерированный контент
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
