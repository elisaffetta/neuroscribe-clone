import { useState, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Chat, Message, ChatState } from '@/types/chat'

export function useChat() {
  const [state, setState] = useState<ChatState>({
    chats: [],
    currentChatId: null,
    isLoading: false,
    error: null,
  })

  const createNewChat = useCallback(() => {
    const newChat: Chat = {
      id: uuidv4(),
      title: 'New Chat',
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }

    setState(prev => ({
      ...prev,
      chats: [newChat, ...prev.chats],
      currentChatId: newChat.id,
    }))

    return newChat.id
  }, [])

  const sendMessage = useCallback(async (content: string) => {
    if (!state.currentChatId) return

    const messageId = uuidv4()
    const userMessage: Message = {
      id: messageId,
      role: 'user',
      content,
      timestamp: Date.now(),
    }

    setState(prev => {
      const currentChat = prev.chats.find(chat => chat.id === prev.currentChatId)
      if (!currentChat) return prev

      const updatedChat = {
        ...currentChat,
        messages: [...currentChat.messages, userMessage],
        updatedAt: Date.now(),
      }

      return {
        ...prev,
        isLoading: true,
        chats: prev.chats.map(chat =>
          chat.id === prev.currentChatId ? updatedChat : chat
        ),
      }
    })

    try {
      const messages = [...state.chats.find(chat => chat.id === state.currentChatId)?.messages || [], userMessage]
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.map(({ content, role }) => ({ content, role })),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const assistantMessage = await response.json()
      
      setState(prev => {
        const currentChat = prev.chats.find(chat => chat.id === prev.currentChatId)
        if (!currentChat) return prev

        const updatedChat = {
          ...currentChat,
          messages: [...currentChat.messages, { ...assistantMessage, id: uuidv4(), timestamp: Date.now() }],
          updatedAt: Date.now(),
        }

        return {
          ...prev,
          isLoading: false,
          chats: prev.chats.map(chat =>
            chat.id === prev.currentChatId ? updatedChat : chat
          ),
        }
      })
    } catch (error) {
      console.error('Error sending message:', error)
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to send message',
      }))
    }
  }, [state.currentChatId, state.chats])

  const selectChat = useCallback((chatId: string) => {
    setState(prev => ({
      ...prev,
      currentChatId: chatId,
    }))
  }, [])

  const deleteChat = useCallback((chatId: string) => {
    setState(prev => ({
      ...prev,
      chats: prev.chats.filter(chat => chat.id !== chatId),
      currentChatId: prev.currentChatId === chatId ? null : prev.currentChatId,
    }))
  }, [])

  const clearConversation = useCallback(() => {
    if (!state.currentChatId) return

    setState(prev => {
      const currentChat = prev.chats.find(chat => chat.id === prev.currentChatId)
      if (!currentChat) return prev

      const updatedChat = {
        ...currentChat,
        messages: [],
        updatedAt: Date.now(),
      }

      return {
        ...prev,
        chats: prev.chats.map(chat =>
          chat.id === prev.currentChatId ? updatedChat : chat
        ),
      }
    })
  }, [state.currentChatId])

  return {
    ...state,
    createNewChat,
    sendMessage,
    selectChat,
    deleteChat,
    clearConversation,
  }
}
