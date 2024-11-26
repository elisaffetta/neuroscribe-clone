import { FC } from 'react'
import { FileText, Image, Clock, MessageSquare } from 'lucide-react'

const statistics = [
  {
    title: 'Слов создано',
    value: '125,430',
    change: '+12.5%',
    icon: FileText,
    color: 'bg-blue-500'
  },
  {
    title: 'Изображений сгенерировано',
    value: '1,234',
    change: '+8.2%',
    icon: Image,
    color: 'bg-purple-500'
  },
  {
    title: 'Минут аудио распознано',
    value: '2,156',
    change: '+15.3%',
    icon: Clock,
    color: 'bg-green-500'
  },
  {
    title: 'Сообщений в чате',
    value: '8,901',
    change: '+20.1%',
    icon: MessageSquare,
    color: 'bg-red-500'
  }
]

const Statistics: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statistics.map((stat) => (
        <div
          key={stat.title}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-white`}>
              <stat.icon size={24} />
            </div>
            <span className="text-sm font-medium text-green-500">
              {stat.change}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {stat.value}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {stat.title}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Statistics
