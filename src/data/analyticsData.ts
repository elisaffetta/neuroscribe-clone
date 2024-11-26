export const monthlyAnalytics = [
  { month: 'Янв', анализы: 65, генерации: 28, оптимизации: 15 },
  { month: 'Фев', анализы: 59, генерации: 48, оптимизации: 26 },
  { month: 'Мар', анализы: 80, генерации: 40, оптимизации: 32 },
  { month: 'Апр', анализы: 81, генерации: 47, оптимизации: 24 },
  { month: 'Май', анализы: 56, генерации: 36, оптимизации: 45 },
  { month: 'Июн', анализы: 55, генерации: 27, оптимизации: 38 },
  { month: 'Июл', анализы: 40, генерации: 43, оптимизации: 28 },
]

export const pieChartData = [
  { name: 'Текстовый анализ', value: 35, color: '#0088FE' },
  { name: 'Генерация контента', value: 30, color: '#00C49F' },
  { name: 'Оптимизация', value: 25, color: '#FFBB28' },
  { name: 'Другое', value: 10, color: '#FF8042' },
]

export const performanceMetrics = [
  { metric: 'Точность анализа', value: 92, delta: 12.3, deltaType: 'increase' },
  { metric: 'Скорость обработки', value: 88, delta: -2.5, deltaType: 'decrease' },
  { metric: 'Удовлетворенность', value: 95, delta: 10.1, deltaType: 'increase' },
]

export const recentAnalytics = [
  {
    id: 1,
    title: 'Анализ научной статьи',
    type: 'Текстовый анализ',
    completion: 100,
    status: 'completed'
  },
  {
    id: 2,
    title: 'Генерация описания продукта',
    type: 'Генерация контента',
    completion: 75,
    status: 'in-progress'
  },
  {
    id: 3,
    title: 'Оптимизация SEO текста',
    type: 'Оптимизация',
    completion: 90,
    status: 'completed'
  },
  {
    id: 4,
    title: 'Анализ отзывов клиентов',
    type: 'Текстовый анализ',
    completion: 60,
    status: 'in-progress'
  }
]
