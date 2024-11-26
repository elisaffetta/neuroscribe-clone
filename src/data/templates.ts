import { Template } from '@/types/templates'

export const templates: Template[] = [
  {
    id: 'blog-post',
    title: 'Блог пост',
    description: 'Создайте увлекательный блог пост на любую тему',
    icon: '📝',
    category: 'content',
    emoji: '📝',
    fields: [
      {
        id: 'title',
        label: 'Заголовок',
        type: 'text',
        placeholder: 'Введите заголовок блога',
        required: true
      },
      {
        id: 'topic',
        label: 'Тема',
        type: 'textarea',
        placeholder: 'О чем будет ваш пост?',
        required: true
      },
      {
        id: 'tone',
        label: 'Тон повествования',
        type: 'radio',
        required: true,
        options: [
          { label: 'Формальный', value: 'formal' },
          { label: 'Неформальный', value: 'informal' },
          { label: 'Дружелюбный', value: 'friendly' },
          { label: 'Профессиональный', value: 'professional' }
        ],
        defaultValue: 'friendly'
      },
      {
        id: 'length',
        label: 'Длина поста',
        type: 'range',
        min: 300,
        max: 2000,
        step: 100,
        defaultValue: 800
      },
      {
        id: 'includeImages',
        label: 'Добавить описания изображений',
        type: 'toggle',
        defaultValue: false
      },
      {
        id: 'sections',
        label: 'Разделы',
        type: 'checkbox',
        options: [
          { label: 'Введение', value: 'intro' },
          { label: 'Основная часть', value: 'main' },
          { label: 'Заключение', value: 'conclusion' },
          { label: 'Список источников', value: 'references' },
          { label: 'FAQ', value: 'faq' }
        ],
        defaultValue: ['intro', 'main', 'conclusion']
      }
    ],
    systemPrompt: String.raw`Ты - профессиональный блогер. Напиши пост на тему {topic}.
    Заголовок: {title}
    Тон: {tone}
    Длина: {length} слов
    Добавить описания изображений: {includeImages}
    Разделы: {sections}
    
    Пост должен быть интересным, информативным и вовлекающим.`
  },
  {
    id: 'social-media',
    title: 'Пост для соцсетей',
    description: 'Создайте вовлекающий пост для социальных сетей',
    icon: '📱',
    category: 'social',
    emoji: '📱',
    fields: [
      {
        id: 'platform',
        label: 'Платформа',
        type: 'select',
        options: [
          { label: 'Instagram', value: 'instagram' },
          { label: 'Facebook', value: 'facebook' },
          { label: 'Twitter', value: 'twitter' },
          { label: 'LinkedIn', value: 'linkedin' }
        ],
        required: true
      },
      {
        id: 'content',
        label: 'Содержание',
        type: 'textarea',
        placeholder: 'О чем хотите рассказать?',
        required: true
      }
    ],
    systemPrompt: String.raw`Ты - эксперт по социальным сетям. Создай пост для {platform}.
    Содержание: {content}
    
    Пост должен быть оптимизирован для выбранной платформы и включать хэштеги, если это уместно.`
  },
  {
    id: 'email-campaign',
    title: 'Email рассылка',
    description: 'Создайте эффективную email кампанию',
    icon: '📧',
    category: 'marketing',
    emoji: '📧',
    fields: [
      {
        id: 'subject',
        label: 'Тема письма',
        type: 'text',
        placeholder: 'Введите тему письма',
        required: true
      },
      {
        id: 'content',
        label: 'Содержание',
        type: 'textarea',
        placeholder: 'Текст вашего письма',
        required: true
      }
    ],
    systemPrompt: String.raw`Ты - специалист по email-маркетингу. Создай email.
    Тема: {subject}
    Содержание: {content}
    
    Email должен быть персонализированным, с четким призывом к действию и оптимизирован для высокой конверсии.`
  },
  {
    id: 'product-description',
    title: 'Описание продукта',
    description: 'Создайте привлекательное описание продукта',
    icon: '🛍️',
    category: 'business',
    emoji: '🛍️',
    fields: [
      {
        id: 'productName',
        label: 'Название продукта',
        type: 'text',
        required: true
      },
      {
        id: 'features',
        label: 'Особенности',
        type: 'textarea',
        placeholder: 'Опишите основные характеристики продукта',
        required: true
      }
    ],
    systemPrompt: String.raw`Ты - копирайтер с опытом написания продающих текстов. Создай описание продукта.
    Продукт: {productName}
    Характеристики: {features}
    
    Описание должно быть привлекательным, подчеркивать выгоды и мотивировать к покупке.`
  },
  {
    id: 'research-summary',
    title: 'Резюме исследования',
    description: 'Создайте краткое изложение исследования',
    icon: '🔍',
    category: 'research',
    emoji: '🔍',
    fields: [
      {
        id: 'topic',
        label: 'Тема исследования',
        type: 'text',
        required: true
      },
      {
        id: 'findings',
        label: 'Основные выводы',
        type: 'textarea',
        required: true
      }
    ],
    systemPrompt: String.raw`Ты - исследователь. Создай резюме исследования.
    Тема: {topic}
    Основные выводы: {findings}
    
    Резюме должно быть кратким, информативным и включать основные результаты исследования.`
  },
  {
    id: 'video-script',
    title: 'Сценарий видео',
    description: 'Создайте сценарий для видеоконтента',
    icon: '🎥',
    category: 'content',
    emoji: '🎥',
    fields: [
      {
        id: 'title',
        label: 'Название видео',
        type: 'text',
        required: true
      },
      {
        id: 'script',
        label: 'Сценарий',
        type: 'textarea',
        placeholder: 'Напишите сценарий вашего видео',
        required: true
      }
    ],
    systemPrompt: String.raw`Ты - сценарист. Создай сценарий видео.
    Название: {title}
    Сценарий: {script}
    
    Сценарий должен быть интересным, информативным и соответствовать формату видеоконтента.`
  },
  {
    id: 'landing-page',
    title: 'Лендинг',
    description: 'Создайте текст для посадочной страницы',
    icon: '🎯',
    category: 'marketing',
    emoji: '🎯',
    fields: [
      {
        id: 'headline',
        label: 'Заголовок',
        type: 'text',
        required: true
      },
      {
        id: 'sections',
        label: 'Секции',
        type: 'textarea',
        placeholder: 'Опишите основные секции лендинга',
        required: true
      }
    ],
    systemPrompt: String.raw`Ты - копирайтер с опытом написания продающих текстов. Создай текст для лендинга.
    Заголовок: {headline}
    Секции: {sections}
    
    Текст должен быть привлекательным, подчеркивать выгоды и мотивировать к покупке.`
  },
  {
    id: 'presentation',
    title: 'Презентация',
    description: 'Создайте структуру презентации',
    icon: '📊',
    category: 'business',
    emoji: '📊',
    fields: [
      {
        id: 'topic',
        label: 'Тема презентации',
        type: 'text',
        required: true
      },
      {
        id: 'outline',
        label: 'План',
        type: 'textarea',
        placeholder: 'Опишите структуру презентации',
        required: true
      }
    ],
    systemPrompt: String.raw`Ты - эксперт по презентациям. Создай структуру презентации.
    Тема: {topic}
    План: {outline}
    
    Презентация должна быть информативной, логичной и включать основные пункты.`
  },
  {
    id: 'podcast-outline',
    title: 'План подкаста',
    description: 'Создайте план для эпизода подкаста',
    icon: '🎙️',
    category: 'content',
    emoji: '🎙️',
    fields: [
      {
        id: 'episodeTitle',
        label: 'Название эпизода',
        type: 'text',
        required: true
      },
      {
        id: 'segments',
        label: 'Сегменты',
        type: 'textarea',
        placeholder: 'Опишите основные темы и сегменты эпизода',
        required: true
      }
    ],
    systemPrompt: String.raw`Ты - создатель подкаста. Создай план для эпизода.
    Название: {episodeTitle}
    Сегменты: {segments}
    
    План должен быть интересным, информативным и соответствовать формату подкаста.`
  },
  {
    id: 'case-study',
    title: 'Кейс-стади',
    description: 'Создайте подробный разбор кейса',
    icon: '📚',
    category: 'research',
    emoji: '📚',
    fields: [
      {
        id: 'companyName',
        label: 'Название компании',
        type: 'text',
        required: true
      },
      {
        id: 'challenge',
        label: 'Проблема',
        type: 'textarea',
        placeholder: 'Опишите проблему, которую решала компания',
        required: true
      },
      {
        id: 'solution',
        label: 'Решение',
        type: 'textarea',
        placeholder: 'Опишите найденное решение',
        required: true
      }
    ],
    systemPrompt: String.raw`Ты - исследователь. Создай кейс-стади.
    Компания: {companyName}
    Проблема: {challenge}
    Решение: {solution}
    
    Кейс-стади должен быть подробным, информативным и включать основные результаты.`
  }
]
