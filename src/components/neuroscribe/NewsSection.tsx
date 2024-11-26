import { FC } from 'react'
import { Clock } from 'lucide-react'

const news = [
  {
    id: 1,
    title: 'Добавлена функция мультиязычности',
    description: 'Теперь NeuroScribe поддерживает русский и английский языки. Переключайтесь между языками в настройках.',
    date: '2 дня назад'
  },
  {
    id: 2,
    title: 'Новые шаблоны для бизнеса',
    description: 'Добавлены новые шаблоны для создания бизнес-предложений, маркетинговых стратегий и email-рассылок.',
    date: '4 дня назад'
  },
  {
    id: 3,
    title: 'Улучшено распознавание голоса',
    description: 'Обновлен алгоритм распознавания голоса для более точной транскрипции и поддержки длинных записей.',
    date: '1 неделю назад'
  },
  {
    id: 4,
    title: 'Категоризация шаблонов',
    description: 'Шаблоны теперь организованы по категориям для более удобного поиска и использования.',
    date: '1 неделю назад'
  }
]

const NewsSection: FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
        Последние обновления
      </h2>
      <div className="space-y-6">
        {news.map((item) => (
          <div key={item.id} className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-4 last:pb-0">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
              {item.description}
            </p>
            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
              <Clock size={14} className="mr-1" />
              {item.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewsSection
