'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useApp } from '@/context/AppContext'

interface UseVoiceInputProps {
  onResult: (text: string) => void
  onError: (error: string) => void
  language?: string
}

export const useVoiceInput = ({
  onResult,
  onError,
  language = 'ru-RU',
}: UseVoiceInputProps) => {
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const { t } = useApp()

  // Проверяем поддержку браузером
  const isSupported = typeof window !== 'undefined' && 
    navigator.mediaDevices && 
    typeof window.MediaRecorder !== 'undefined'

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  const startListening = useCallback(async () => {
    if (!isSupported) {
      onError(t('chat.voiceInputNotSupported'))
      return
    }

    try {
      console.log('Requesting microphone access...')
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      
      console.log('Creating MediaRecorder...')
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm'
      })
      
      // Очищаем предыдущие чанки
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = async () => {
        console.log('Recording stopped, processing audio...')
        setIsProcessing(true)
        
        try {
          // Создаем аудио блоб
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
          
          // Создаем FormData для отправки файла
          const formData = new FormData()
          formData.append('file', audioBlob, 'recording.webm')
          formData.append('model', 'whisper-1')
          formData.append('language', language.split('-')[0]) // Отправляем только код языка (ru)

          // Отправляем на сервер Whisper API
          const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            },
            body: formData
          })

          if (!response.ok) {
            throw new Error('Failed to transcribe audio')
          }

          const data = await response.json()
          console.log('Transcription result:', data)
          
          if (data.text) {
            onResult(data.text)
          } else {
            throw new Error('No transcription result')
          }
        } catch (error) {
          console.error('Transcription error:', error)
          onError(t('chat.voiceInputError'))
        } finally {
          setIsProcessing(false)
          setIsListening(false)
          // Останавливаем все треки
          stream.getTracks().forEach(track => track.stop())
        }
      }

      mediaRecorder.onerror = (event) => {
        console.error('MediaRecorder error:', event)
        onError(t('chat.voiceInputError'))
        setIsListening(false)
        stream.getTracks().forEach(track => track.stop())
      }

      // Начинаем запись
      mediaRecorderRef.current = mediaRecorder
      mediaRecorder.start()
      setIsListening(true)
      console.log('Recording started')

    } catch (error) {
      console.error('Error starting recording:', error)
      if ((error as Error).name === 'NotAllowedError') {
        onError(t('chat.voiceInputPermissionDenied'))
      } else {
        onError(t('chat.voiceInputError'))
      }
      setIsListening(false)
    }
  }, [isSupported, language, onError, onResult, t])

  const stopListening = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      console.log('Stopping recording...')
      mediaRecorderRef.current.stop()
    }
  }, [])

  return {
    isListening,
    isProcessing,
    isSupported,
    startListening,
    stopListening,
  }
}
