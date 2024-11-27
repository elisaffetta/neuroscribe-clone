'use client'

import { useEffect, useRef } from 'react'
import { useChat } from '@/hooks/useChat'
import { Send, Mic, MicOff, Loader2 } from 'lucide-react'
import Message from '@/components/chat/Message'
import ChatSidebar from '@/components/chat/ChatSidebar'
import { PageTitle } from '@/components/common/PageTitle'
import StandardLayout from '@/components/layout/StandardLayout'
import Header from '@/components/layout/Header'
import { useApp } from '@/context/AppContext'
import { useVoiceInput } from '@/hooks/useVoiceInput'
import { toast } from 'react-hot-toast'

export default function Chat() {
  const {
    chats,
    currentChatId,
    isLoading,
    error,
    createNewChat,
    sendMessage,
    selectChat,
    deleteChat,
  } = useChat()

  const { t } = useApp()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const handleVoiceResult = (text: string) => {
    if (inputRef.current) {
      const currentText = inputRef.current.value.trim()
      const newText = currentText ? `${currentText} ${text}` : text
      inputRef.current.value = newText
      // Автоматически увеличиваем высоту текстового поля при необходимости
      inputRef.current.style.height = 'auto'
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
  }

  const handleVoiceError = (error: string) => {
    toast.error(error)
  }

  const { isListening, isProcessing, isSupported, startListening, stopListening } = useVoiceInput({
    onResult: handleVoiceResult,
    onError: handleVoiceError,
  })

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }

  // Create a new chat if there are no chats
  useEffect(() => {
    if (chats.length === 0) {
      createNewChat()
    }
  }, [chats.length, createNewChat])

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chats, currentChatId])

  const currentChat = chats.find((chat) => chat.id === currentChatId)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputRef.current) return

    const message = inputRef.current.value.trim()
    if (!message) return

    try {
      console.log('[CHAT CLIENT] Sending message:', message)
      await sendMessage(message)
      console.log('[CHAT CLIENT] Message sent successfully')
      inputRef.current.value = ''
      inputRef.current.style.height = 'auto'
    } catch (error: any) {
      console.error('[CHAT CLIENT] Error sending message:', {
        error: error.message,
        response: error.response?.data
      })
      toast.error(error.message || 'Failed to send message')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 h-[calc(100vh-4rem)] bg-gray-50 dark:bg-gray-900">
        {/* Сайдбар с адаптивным отображением */}
        <div className="hidden md:block">
          <ChatSidebar
            chats={chats}
            currentChatId={currentChatId}
            onNewChat={createNewChat}
            onSelectChat={selectChat}
            onDeleteChat={deleteChat}
          />
        </div>

        <div className="flex-1 flex flex-col h-full w-full">
          {/* Мобильный хедер с кнопкой меню */}
          <div className="md:hidden flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-4 py-2">
            <button
              onClick={() => document.querySelector('.mobile-sidebar')?.classList.toggle('hidden')}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold">{t('common.chat')}</h1>
            <div className="w-10"></div> {/* Для центрирования заголовка */}
          </div>

          {/* Мобильный сайдбар */}
          <div className="mobile-sidebar fixed inset-0 z-50 hidden md:hidden">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => document.querySelector('.mobile-sidebar')?.classList.add('hidden')}></div>
            <div className="absolute left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg">
              <ChatSidebar
                chats={chats}
                currentChatId={currentChatId}
                onNewChat={createNewChat}
                onSelectChat={(chatId) => {
                  selectChat(chatId);
                  document.querySelector('.mobile-sidebar')?.classList.add('hidden');
                }}
                onDeleteChat={deleteChat}
              />
            </div>
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="hidden md:block border-b border-gray-200 dark:border-gray-700 px-4 py-2">
              <PageTitle title={t('common.chat')} description={t('chat.welcomeMessage')} />
            </div>

            <div
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto pb-4 px-4 md:px-6"
            >
              {currentChat?.messages.map((message) => (
                <Message
                  key={message.id}
                  message={message}
                  onRegenerate={
                    message.role === 'assistant'
                      ? () => sendMessage(message.content)
                      : undefined
                  }
                />
              ))}

              {isLoading && (
                <div className="py-8">
                  <div className="max-w-3xl mx-auto">
                    <div className="flex gap-4 md:gap-6">
                      <div className="w-8 h-8 rounded-full bg-green-500 dark:bg-green-600 text-white flex items-center justify-center flex-shrink-0">
                        AI
                      </div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mt-2 animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="py-4 px-6 text-red-500 dark:text-red-400 text-center">
                  {t('chat.errorMessage')}
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-800">
              <div className="max-w-3xl mx-auto flex gap-2 md:gap-4">
                <div className="flex-1 relative">
                  <textarea
                    ref={inputRef}
                    rows={1}
                    className="w-full resize-none rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 md:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary dark:text-white text-sm md:text-base"
                    placeholder={isListening ? t('chat.voiceInputListening') : t('chat.placeholder')}
                    onKeyDown={handleKeyDown}
                    style={{ minHeight: '42px', maxHeight: '200px' }}
                    onChange={(e) => {
                      e.target.style.height = 'auto'
                      e.target.style.height = `${e.target.scrollHeight}px`
                    }}
                  />
                  {isListening && (
                    <div className="absolute right-3 top-2 flex items-center">
                      <div className="animate-pulse text-red-500">●</div>
                      <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        {t('chat.voiceInputListening')}
                      </span>
                    </div>
                  )}
                </div>
                {isSupported && (
                  <button
                    type="button"
                    onClick={handleVoiceToggle}
                    className={`p-2 rounded-lg transition-colors ${
                      isListening
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : isProcessing
                        ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    title={
                      isListening
                        ? t('chat.voiceInputStop')
                        : isProcessing
                        ? t('chat.voiceInputProcessing')
                        : t('chat.voiceInputStart')
                    }
                  >
                    {isListening ? (
                      <MicOff className="w-5 h-5" />
                    ) : isProcessing ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Mic className="w-5 h-5" />
                    )}
                  </button>
                )}
                <button
                  type="submit"
                  className="p-2 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                  title={t('chat.send')}
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
