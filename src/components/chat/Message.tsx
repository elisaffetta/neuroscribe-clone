'use client'

import { FC } from 'react'
import { Message as MessageType } from '@/types/chat'
import { Copy, RotateCw } from 'lucide-react'
import { useApp } from '@/context/AppContext'
import { toast } from 'react-hot-toast'

interface MessageProps {
  message: MessageType
  onRegenerate?: () => void
}

const Message: FC<MessageProps> = ({ message, onRegenerate }) => {
  const { t } = useApp()
  const isUser = message.role === 'user'

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      toast.success(t('chat.copySuccess'))
    } catch (error) {
      toast.error(t('chat.copyError'))
    }
  }

  return (
    <div
      className={`py-8 px-4 ${
        isUser ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'
      }`}
    >
      <div className="max-w-3xl mx-auto flex gap-6">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
            isUser
              ? 'bg-primary text-white'
              : 'bg-green-500 dark:bg-green-600 text-white'
          }`}
        >
          {isUser ? 'U' : 'AI'}
        </div>
        <div className="flex-1 space-y-4">
          <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {message.content}
          </p>
          <div className="flex gap-4">
            <button
              onClick={copyToClipboard}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-2 text-sm"
              title={t('chat.copyToClipboard')}
            >
              <Copy size={16} />
              <span>{t('chat.copyToClipboard')}</span>
            </button>
            {onRegenerate && (
              <button
                onClick={onRegenerate}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center gap-2 text-sm"
                title={t('chat.regenerateResponse')}
              >
                <RotateCw size={16} />
                <span>{t('chat.regenerateResponse')}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Message
