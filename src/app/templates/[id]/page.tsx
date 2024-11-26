'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { templates } from '@/data/templates'
import { TemplateFormData } from '@/types/templates'
import Sidebar from '@/components/layout/Sidebar'
import Link from 'next/link'
import { Home, ArrowLeft, Copy, Download } from 'lucide-react'
import { Toast } from '@/components/ui/Toast'
import Confetti from 'react-confetti'
import useSound from 'use-sound'
import { useWindowSize } from '@/hooks/useWindowSize'

export default function TemplatePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const template = templates.find((t) => t.id === id)
  const [formData, setFormData] = useState<TemplateFormData>({})
  const [result, setResult] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const { width, height } = useWindowSize()
  const [playSuccess] = useSound('/sounds/success.mp3')

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [showConfetti])

  if (!template) {
    return <div>Шаблон не найден</div>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setResult('')
    setError(null)
    setShowConfetti(false)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template: template.id,
          formData
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate content')
      }

      const data = await response.json()
      setResult(data.result)
      setShowConfetti(true)
      playSuccess()
    } catch (error) {
      console.error('Error:', error)
      setError('Не удалось сгенерировать контент. Попробуйте еще раз.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (fieldId: string, value: string | boolean | number | string[]) => {
    setFormData((prev: TemplateFormData) => ({ ...prev, [fieldId]: value }))
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result)
      setSuccessMessage('Текст скопирован!')
      setTimeout(() => setSuccessMessage(null), 2000)
    } catch (err) {
      setError('Не удалось скопировать текст')
    }
  }

  const handleDownload = () => {
    try {
      const blob = new Blob([result], { type: 'text/plain;charset=utf-8' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${template.title}.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      setSuccessMessage('Файл сохранен!')
      setTimeout(() => setSuccessMessage(null), 2000)
    } catch (err) {
      setError('Не удалось сохранить файл')
    }
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {showConfetti && <Confetti width={width} height={height} recycle={false} />}
      {error && (
        <Toast
          message={error}
          type="error"
          onClose={() => setError(null)}
        />
      )}
      {successMessage && (
        <Toast
          message={successMessage}
          type="success"
          onClose={() => setSuccessMessage(null)}
        />
      )}
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
                          value={String(formData[field.id] || field.defaultValue || '')}
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
                          value={String(formData[field.id] || field.defaultValue || '')}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          required={field.required}
                        />
                      ) : field.type === 'text' ? (
                        <input
                          type="text"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                          value={String(formData[field.id] || field.defaultValue || '')}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                          placeholder={field.placeholder}
                          required={field.required}
                        />
                      ) : field.type === 'number' ? (
                        <input
                          type="number"
                          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                          value={Number(formData[field.id] || field.defaultValue || 0)}
                          onChange={(e) => handleInputChange(field.id, Number(e.target.value))}
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          required={field.required}
                        />
                      ) : field.type === 'range' ? (
                        <input
                          type="range"
                          className="w-full"
                          value={Number(formData[field.id] || field.defaultValue || field.min || 0)}
                          onChange={(e) => handleInputChange(field.id, Number(e.target.value))}
                          min={field.min}
                          max={field.max}
                          step={field.step}
                        />
                      ) : field.type === 'toggle' ? (
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                          checked={Boolean(formData[field.id] || field.defaultValue || false)}
                          onChange={(e) => handleInputChange(field.id, e.target.checked)}
                        />
                      ) : field.type === 'checkbox' ? (
                        <div className="space-y-2">
                          {field.options?.map((option) => (
                            <label key={option.value} className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                value={option.value}
                                checked={Array.isArray(formData[field.id]) && (formData[field.id] as string[]).includes(option.value)}
                                onChange={(e) => {
                                  const currentValues = (formData[field.id] as string[]) || [];
                                  const newValues = e.target.checked
                                    ? [...currentValues, option.value]
                                    : currentValues.filter((v) => v !== option.value);
                                  handleInputChange(field.id, newValues);
                                }}
                              />
                              <span>{option.label}</span>
                            </label>
                          ))}
                        </div>
                      ) : field.type === 'radio' ? (
                        <div className="space-y-2">
                          {field.options?.map((option) => (
                            <label key={option.value} className="flex items-center space-x-2">
                              <input
                                type="radio"
                                className="w-4 h-4 border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                                value={option.value}
                                checked={String(formData[field.id]) === option.value}
                                onChange={(e) => handleInputChange(field.id, e.target.value)}
                                name={field.id}
                              />
                              <span>{option.label}</span>
                            </label>
                          ))}
                        </div>
                      ) : null}
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
                      <div className="flex justify-end space-x-2 mb-4">
                        <button
                          onClick={handleCopy}
                          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        >
                          <Copy className="w-4 h-4" />
                          <span>Копировать</span>
                        </button>
                        <button
                          onClick={handleDownload}
                          className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          <span>Сохранить</span>
                        </button>
                      </div>
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
