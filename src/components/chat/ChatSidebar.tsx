'use client'

import { FC } from 'react'
import { Chat } from '@/types/chat'
import { Plus, Trash2 } from 'lucide-react'
import { useApp } from '@/context/AppContext'

interface ChatSidebarProps {
  chats: Chat[]
  currentChatId: string | null
  onNewChat: () => void
  onSelectChat: (chatId: string) => void
  onDeleteChat: (chatId: string) => void
}

const ChatSidebar: FC<ChatSidebarProps> = ({
  chats,
  currentChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
}) => {
  const { t } = useApp()

  return (
    <div className="w-64 h-full bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus size={20} />
          <span>{t('chat.newChat')}</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            {t('chat.emptyChats')}
          </div>
        ) : (
          <div className="space-y-2 p-2">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`group flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-colors ${
                  chat.id === currentChatId
                    ? 'bg-gray-200 dark:bg-gray-700'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => onSelectChat(chat.id)}
              >
                <div className="flex-1 truncate">
                  {chat.messages[0]?.content.substring(0, 30) || t('chat.newChat')}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteChat(chat.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  title={t('chat.deleteChat')}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatSidebar
