export interface Document {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  emoji: string;
}

export const documents: Document[] = [
  {
    id: '1',
    title: 'Анализ рынка ИИ 2024',
    emoji: '🤖',
    content: `# Анализ рынка искусственного интеллекта 2024

Искусственный интеллект продолжает оставаться одним из самых быстрорастущих сегментов технологического рынка. По прогнозам аналитиков, к концу 2024 года объем рынка ИИ достигнет $500 млрд.

## Ключевые тренды:
- Развитие генеративного ИИ
- Внедрение ИИ в промышленность
- Рост инвестиций в ИИ-стартапы`,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    title: 'Стратегия развития продукта',
    emoji: '📈',
    content: `# Стратегия развития продукта на 2024

1. Анализ текущей ситуации
- Продукт занимает 15% рынка
- Основные конкуренты: Company A, Company B
- Ежемесячный рост: 5%

2. Цели на 2024
- Увеличение доли рынка до 25%
- Запуск 3 новых функций
- Улучшение удержания пользователей`,
    createdAt: '2024-01-10T15:45:00Z',
    updatedAt: '2024-01-12T09:20:00Z'
  },
  {
    id: '3',
    title: 'Техническая документация API',
    emoji: '⚙️',
    content: `# API Documentation

## Authentication
All API requests require authentication token in the header:
\`\`\`
Authorization: Bearer <token>
\`\`\`

## Endpoints
- GET /api/v1/users
- POST /api/v1/documents
- PUT /api/v1/settings`,
    createdAt: '2024-01-05T08:15:00Z',
    updatedAt: '2024-01-14T16:30:00Z'
  },
  {
    id: '4',
    title: 'Заметки по проекту',
    emoji: '📝',
    content: `# Проект "Нейросеть"

## Текущие задачи:
1. Оптимизация производительности
2. Улучшение UI/UX
3. Интеграция новых API

## Идеи для развития:
- Добавить поддержку новых языков
- Реализовать экспорт в PDF
- Создать мобильное приложение`,
    createdAt: '2024-01-08T11:20:00Z',
    updatedAt: '2024-01-08T11:20:00Z'
  },
  {
    id: '5',
    title: 'Отчет по маркетингу',
    emoji: '📊',
    content: `# Маркетинговый отчет Q4 2023

## Результаты кампаний
- Рост органического трафика: +25%
- Конверсия: 3.8%
- ROI: 180%

## Рекомендации
1. Увеличить бюджет на контекстную рекламу
2. Оптимизировать воронку продаж
3. Запустить реферальную программу`,
    createdAt: '2024-01-01T09:00:00Z',
    updatedAt: '2024-01-13T14:45:00Z'
  }
];
