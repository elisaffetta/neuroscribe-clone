import { FC } from 'react'
import Link from 'next/link'
import { FileText, MessageSquare, Image, Video } from 'lucide-react'

const QuickActions: FC = () => {
  const actions = [
    {
      title: 'Шаблоны',
      description: 'Готовые шаблоны для создания контента',
      icon: FileText,
      href: '/templates',
      color: 'bg-blue-500'
    },
    {
      title: 'Чат',
      description: 'Общение с ИИ-ассистентом',
      icon: MessageSquare,
      href: '/chat',
      color: 'bg-green-500'
    },
    {
      title: 'Генерация изображений',
      description: 'Создание изображений с помощью ИИ',
      icon: Image,
      href: '/image-generation',
      color: 'bg-purple-500'
    },
    {
      title: 'Видеоинструкции',
      description: 'Обучающие видео по работе с системой',
      icon: Video,
      href: '/video-instructions',
      color: 'bg-red-500'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => (
        <Link
          key={action.title}
          href={action.href}
          className="group p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center text-white mb-4`}>
            <action.icon size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
            {action.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {action.description}
          </p>
        </Link>
      ))}
    </div>
  )
}

export default QuickActions
