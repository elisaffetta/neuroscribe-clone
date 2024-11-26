import { Template } from '@/types/templates'

export const templates: Template[] = [
  {
    id: 'article',
    title: 'Написание статьи',
    description: 'Создание профессиональной статьи с учетом вашей целевой аудитории и тематики',
    icon: '📝',
    fields: [
      {
        id: 'topic',
        label: 'Тема статьи',
        type: 'text',
        placeholder: 'Введите тему статьи',
        required: true
      },
      {
        id: 'audience',
        label: 'Целевая аудитория',
        type: 'textarea',
        placeholder: 'Опишите вашу целевую аудиторию',
        required: true
      },
      {
        id: 'tone',
        label: 'Тон повествования',
        type: 'select',
        options: [
          { label: 'Профессиональный', value: 'professional' },
          { label: 'Разговорный', value: 'casual' },
          { label: 'Экспертный', value: 'expert' },
          { label: 'Дружелюбный', value: 'friendly' }
        ],
        required: true
      },
      {
        id: 'length',
        label: 'Количество символов',
        type: 'select',
        options: [
          { label: 'Короткая (до 2000 символов)', value: '2000' },
          { label: 'Средняя (до 4000 символов)', value: '4000' },
          { label: 'Длинная (до 8000 символов)', value: '8000' }
        ],
        required: true
      }
    ],
    systemPrompt: String.raw`Ты - профессиональный копирайтер. Напиши статью на указанную тему.
    Учитывай следующие параметры:
    - Целевая аудитория: {audience}
    - Тон повествования: {tone}
    - Длина текста: примерно {length} символов
    
    Статья должна быть структурированной, информативной и вовлекающей.`
  },
  {
    id: 'social-media-post',
    title: 'Пост для соцсетей',
    description: 'Создание вовлекающего поста для социальных сетей',
    icon: '📱',
    fields: [
      {
        id: 'platform',
        label: 'Платформа',
        type: 'select',
        options: [
          { label: 'Instagram', value: 'instagram' },
          { label: 'Facebook', value: 'facebook' },
          { label: 'LinkedIn', value: 'linkedin' },
          { label: 'Twitter', value: 'twitter' }
        ],
        required: true
      },
      {
        id: 'topic',
        label: 'Тема поста',
        type: 'text',
        placeholder: 'О чем будет пост?',
        required: true
      },
      {
        id: 'goal',
        label: 'Цель поста',
        type: 'select',
        options: [
          { label: 'Вовлечение аудитории', value: 'engagement' },
          { label: 'Продажа продукта/услуги', value: 'sales' },
          { label: 'Информирование', value: 'information' },
          { label: 'Развлечение', value: 'entertainment' }
        ],
        required: true
      }
    ],
    systemPrompt: String.raw`Ты - эксперт по социальным сетям. Создай пост для {platform}.
    Тема: {topic}
    Цель: {goal}
    
    Пост должен быть оптимизирован для выбранной платформы и включать хэштеги, если это уместно.`
  }
]
