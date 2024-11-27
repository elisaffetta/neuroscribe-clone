import { useEffect, useRef, useState } from 'react'

export function useAudioContext() {
  const audioContextRef = useRef<AudioContext | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const initAudioContext = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume()
      }
      setIsReady(true)
    }

    // Инициализируем контекст только после взаимодействия пользователя
    const handleInteraction = () => {
      initAudioContext()
      // Удаляем обработчики после первой инициализации
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }

    document.addEventListener('click', handleInteraction)
    document.addEventListener('touchstart', handleInteraction)

    return () => {
      document.removeEventListener('click', handleInteraction)
      document.removeEventListener('touchstart', handleInteraction)
    }
  }, [])

  return { audioContext: audioContextRef.current, isReady }
}
