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
      error: null,
    }))

    return newChat.id
  }, [])

  const sendMessage = useCallback(async (content: string) => {
    console.log('[useChat] Starting to send message')
    if (!state.currentChatId) {
      console.error('[useChat] No current chat ID')
      throw new Error('No active chat')
    }

    const messageId = uuidv4()
    const userMessage: Message = {
      id: messageId,
      role: 'user',
      content,
      timestamp: Date.now(),
    }

    setState(prev => {
      const currentChat = prev.chats.find(chat => chat.id === prev.currentChatId)
      if (!currentChat) {
        console.error('[useChat] Chat not found:', prev.currentChatId)
        throw new Error('Chat not found')
      }

      console.log('[useChat] Adding user message to state')
      const updatedChat = {
        ...currentChat,
        messages: [...currentChat.messages, userMessage],
        updatedAt: Date.now(),
      }

      return {
        ...prev,
        chats: prev.chats.map(chat =>
          chat.id === prev.currentChatId ? updatedChat : chat
        ),
        isLoading: true,
        error: null,
      }
    })

    try {
      console.log('[useChat] Sending request to API')
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...state.chats
              .find(chat => chat.id === state.currentChatId)
              ?.messages.map(msg => ({
                role: msg.role,
                content: msg.content,
              })) || [],
            { role: 'user', content },
          ],
        }),
      })

      console.log('[useChat] Received response:', response.status)
      if (!response.ok) {
        const errorData = await response.json()
        console.error('[useChat] API error:', errorData)
        throw new Error(errorData.error || 'Failed to get response')
      }

      const data = await response.json()
      console.log('[useChat] Processing response data')

      const assistantMessage: Message = {
        id: uuidv4(),
        role: 'assistant',
        content: data.content,
        timestamp: Date.now(),
      }

      setState(prev => {
        const currentChat = prev.chats.find(chat => chat.id === prev.currentChatId)
        if (!currentChat) return prev

        const updatedChat = {
          ...currentChat,
          messages: [...currentChat.messages, assistantMessage],
          updatedAt: Date.now(),
        }

        return {
          ...prev,
          chats: prev.chats.map(chat =>
            chat.id === prev.currentChatId ? updatedChat : chat
          ),
          isLoading: false,
          error: null,
        }
      })
    } catch (error: any) {
      console.error('[useChat] Error in sendMessage:', error)
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'Failed to send message',
      }))
      throw error
    }
  }, [state.currentChatId, state.chats])

  const selectChat = useCallback((chatId: string) => {
    setState(prev => ({
      ...prev,
      currentChatId: chatId,
      error: null,
    }))
  }, [])

  const deleteChat = useCallback((chatId: string) => {
    setState(prev => ({
      ...prev,
      chats: prev.chats.filter(chat => chat.id !== chatId),
      currentChatId: prev.currentChatId === chatId ? null : prev.currentChatId,
      error: null,
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
