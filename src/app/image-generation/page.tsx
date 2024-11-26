'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import { Toast } from '@/components/ui/Toast'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'
import { getRandomPrompt } from '@/utils/randomPrompts'
import { ImageModal } from '@/components/ui/ImageModal'
import ReactConfetti from 'react-confetti'

interface ImageSettings {
  size: '256x256' | '512x512' | '1024x1024'
  style: 'natural' | 'artistic' | 'cinematic' | 'anime'
  numberOfImages: 1 | 2 | 3 | 4
}

export default function ImageGenerationPage() {
  const { t } = useTranslation()
  const [prompt, setPrompt] = useState('')
  const [settings, setSettings] = useState<ImageSettings>({
    size: '512x512',
    style: 'natural',
    numberOfImages: 1
  })
  const [images, setImages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Пожалуйста, введите описание изображения')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const stylePrompts = {
        natural: '',
        artistic: ', artistic style, digital art',
        cinematic: ', cinematic style, dramatic lighting',
        anime: ', anime style, manga art'
      }

      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `${prompt}${stylePrompts[settings.style]}`,
          n: settings.numberOfImages,
          size: settings.size,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate images')
      }

      const data = await response.json()
      setImages(data.images)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000) // Скрываем конфетти через 5 секунд
    } catch (error) {
      console.error('Error:', error)
      setError('Не удалось сгенерировать изображения. Попробуйте еще раз.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRandomPrompt = () => {
    setPrompt(getRandomPrompt())
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {error && (
        <Toast
          message={error}
          type="error"
          onClose={() => setError(null)}
        />
      )}
      <Sidebar collapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className={`flex-1 overflow-hidden transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        {showConfetti && <ReactConfetti />}
        <Header />
        <div className="h-[calc(100vh-4rem)] overflow-y-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Генерация изображений</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Создавайте уникальные изображения с помощью искусственного интеллекта
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Описание изображения
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full h-32 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  placeholder="Опишите желаемое изображение..."
                />
                <button
                  onClick={handleRandomPrompt}
                  className="mt-2 px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Случайное описание
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Размер
                  </label>
                  <select
                    value={settings.size}
                    onChange={(e) => setSettings(prev => ({ ...prev, size: e.target.value as ImageSettings['size'] }))}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="256x256">256x256</option>
                    <option value="512x512">512x512</option>
                    <option value="1024x1024">1024x1024</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Стиль
                  </label>
                  <select
                    value={settings.style}
                    onChange={(e) => setSettings(prev => ({ ...prev, style: e.target.value as ImageSettings['style'] }))}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value="natural">Естественный</option>
                    <option value="artistic">Художественный</option>
                    <option value="cinematic">Кинематографический</option>
                    <option value="anime">Аниме</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Количество изображений
                  </label>
                  <select
                    value={settings.numberOfImages}
                    onChange={(e) => setSettings(prev => ({ ...prev, numberOfImages: Number(e.target.value) as ImageSettings['numberOfImages'] }))}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  >
                    <option value={1}>1 изображение</option>
                    <option value={2}>2 изображения</option>
                    <option value={3}>3 изображения</option>
                    <option value={4}>4 изображения</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className={`w-full py-3 px-6 text-white font-medium rounded-lg transition-colors ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {isLoading ? 'Генерация...' : 'Создать изображение'}
              </button>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {Array.from({ length: settings.numberOfImages }).map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-200 dark:bg-gray-700 rounded-lg w-[300px] h-[300px] mx-auto animate-pulse"
                  />
                ))}
              </div>
            ) : images.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {images.map((imageUrl, index) => (
                  <div 
                    key={index} 
                    className="relative w-[300px] h-[300px] mx-auto rounded-lg overflow-hidden shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedImage(imageUrl)}
                  >
                    <Image
                      src={imageUrl}
                      alt={`Generated image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </main>
      {selectedImage && (
        <ImageModal
          imageUrl={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  )
}
