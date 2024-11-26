export interface Message {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
}

export interface Chat {
  id: string
  title: string
  messages: Message[]
  createdAt: number
  updatedAt: number
}

export interface ChatState {
  chats: Chat[]
  currentChatId: string | null
  isLoading: boolean
  error: string | null
}
