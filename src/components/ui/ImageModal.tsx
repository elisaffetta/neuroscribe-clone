import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Copy, Download, X } from 'lucide-react'
import { Toast } from './Toast'
import { useState } from 'react'

interface ImageModalProps {
  imageUrl: string
  onClose: () => void
}

export function ImageModal({ imageUrl, onClose }: ImageModalProps) {
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(imageUrl)
      setSuccessMessage('URL изображения скопирован!')
      setTimeout(() => setSuccessMessage(null), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleDownload = () => {
    try {
      const link = document.createElement('a')
      link.href = imageUrl
      link.download = `image-${Date.now()}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      setSuccessMessage('Изображение сохранено!')
      setTimeout(() => setSuccessMessage(null), 2000)
    } catch (err) {
      console.error('Failed to download:', err)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      {successMessage && (
        <Toast
          message={successMessage}
          type="success"
          onClose={() => setSuccessMessage(null)}
        />
      )}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-lg p-4 max-w-4xl w-full relative"
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="relative aspect-square mb-4">
          <Image
            src={imageUrl}
            alt="Generated image"
            fill
            className="object-contain rounded-lg"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            <Copy className="w-4 h-4" />
            <span>Копировать URL</span>
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Сохранить</span>
          </button>
        </div>
      </motion.div>
    </div>
  )
}
