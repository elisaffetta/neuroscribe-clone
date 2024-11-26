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
  },
  {
    id: 'email-campaign',
    title: 'Email рассылка',
    description: 'Создание эффективной email кампании для вашего бизнеса',
    icon: '📧',
    fields: [
      {
        id: 'campaign_type',
        label: 'Тип кампании',
        type: 'select',
        options: [
          { label: 'Приветственное письмо', value: 'welcome' },
          { label: 'Промо-акция', value: 'promo' },
          { label: 'Информационная рассылка', value: 'newsletter' },
          { label: 'Возвращение клиентов', value: 'reactivation' }
        ],
        required: true
      },
      {
        id: 'target_audience',
        label: 'Целевая аудитория',
        type: 'textarea',
        placeholder: 'Опишите вашу целевую аудиторию',
        required: true
      },
      {
        id: 'offer',
        label: 'Предложение',
        type: 'textarea',
        placeholder: 'Опишите ваше предложение или ценность для клиента',
        required: true
      }
    ],
    systemPrompt: String.raw`Ты - специалист по email-маркетингу. Создай email для {campaign_type} кампании.
    Целевая аудитория: {target_audience}
    Предложение: {offer}
    
    Email должен быть персонализированным, с четким призывом к действию и оптимизирован для высокой конверсии.`
  },
  {
    id: 'product-description',
    title: 'Описание продукта',
    description: 'Создание продающего описания товара или услуги',
    icon: '🏷️',
    fields: [
      {
        id: 'product_name',
        label: 'Название продукта',
        type: 'text',
        placeholder: 'Введите название продукта',
        required: true
      },
      {
        id: 'key_features',
        label: 'Ключевые характеристики',
        type: 'textarea',
        placeholder: 'Перечислите основные характеристики и преимущества',
        required: true
      },
      {
        id: 'target_market',
        label: 'Целевой рынок',
        type: 'textarea',
        placeholder: 'Опишите ваш целевой рынок',
        required: true
      },
      {
        id: 'price_point',
        label: 'Ценовой сегмент',
        type: 'select',
        options: [
          { label: 'Эконом', value: 'economy' },
          { label: 'Средний', value: 'middle' },
          { label: 'Премиум', value: 'premium' },
          { label: 'Люкс', value: 'luxury' }
        ],
        required: true
      }
    ],
    systemPrompt: String.raw`Ты - копирайтер с опытом написания продающих текстов. Создай описание продукта.
    Продукт: {product_name}
    Характеристики: {key_features}
    Целевой рынок: {target_market}
    Ценовой сегмент: {price_point}
    
    Описание должно быть привлекательным, подчеркивать выгоды и мотивировать к покупке.`
  },
  {
    id: 'marketing-strategy',
    title: 'Маркетинговая стратегия',
    description: 'Разработка маркетинговой стратегии для бизнеса',
    icon: '📊',
    fields: [
      {
        id: 'business_type',
        label: 'Тип бизнеса',
        type: 'text',
        placeholder: 'Опишите ваш бизнес',
        required: true
      },
      {
        id: 'objectives',
        label: 'Цели маркетинга',
        type: 'textarea',
        placeholder: 'Какие цели вы хотите достичь?',
        required: true
      },
      {
        id: 'budget',
        label: 'Бюджет',
        type: 'select',
        options: [
          { label: 'Минимальный (до 50т.р.)', value: 'minimal' },
          { label: 'Средний (50-200т.р.)', value: 'medium' },
          { label: 'Высокий (200-500т.р.)', value: 'high' },
          { label: 'Премиум (500т.р.+)', value: 'premium' }
        ],
        required: true
      },
      {
        id: 'timeframe',
        label: 'Временные рамки',
        type: 'select',
        options: [
          { label: '1 месяц', value: '1month' },
          { label: '3 месяца', value: '3months' },
          { label: '6 месяцев', value: '6months' },
          { label: '12 месяцев', value: '12months' }
        ],
        required: true
      }
    ],
    systemPrompt: String.raw`Ты - маркетинговый стратег. Разработай маркетинговую стратегию.
    Бизнес: {business_type}
    Цели: {objectives}
    Бюджет: {budget}
    Период: {timeframe}
    
    Стратегия должна быть реалистичной, включать конкретные шаги и метрики успеха.`
  },
  {
    id: 'value-proposition',
    title: 'Уникальное торговое предложение',
    description: 'Создание сильного УТП для вашего продукта или услуги',
    icon: '💎',
    fields: [
      {
        id: 'product_service',
        label: 'Продукт/Услуга',
        type: 'text',
        placeholder: 'Опишите ваш продукт или услугу',
        required: true
      },
      {
        id: 'unique_features',
        label: 'Уникальные особенности',
        type: 'textarea',
        placeholder: 'Что делает ваш продукт/услугу особенным?',
        required: true
      },
      {
        id: 'competitor_analysis',
        label: 'Анализ конкурентов',
        type: 'textarea',
        placeholder: 'Опишите ваших основных конкурентов и их предложения',
        required: true
      },
      {
        id: 'customer_pain_points',
        label: 'Боли клиентов',
        type: 'textarea',
        placeholder: 'Какие проблемы клиентов решает ваш продукт/услуга?',
        required: true
      }
    ],
    systemPrompt: String.raw`Ты - эксперт по созданию УТП. Разработай уникальное торговое предложение.
    Продукт/Услуга: {product_service}
    Уникальные особенности: {unique_features}
    Конкуренты: {competitor_analysis}
    Боли клиентов: {customer_pain_points}
    
    УТП должно быть четким, убедительным и отражать реальные конкурентные преимущества.`
  },
  {
    id: 'content-plan',
    title: 'Контент-план',
    description: 'Разработка структурированного плана контента для соцсетей',
    icon: '📅',
    fields: [
      {
        id: 'platforms',
        label: 'Платформы',
        type: 'select',
        options: [
          { label: 'Instagram', value: 'instagram' },
          { label: 'Facebook', value: 'facebook' },
          { label: 'VK', value: 'vk' },
          { label: 'Telegram', value: 'telegram' }
        ],
        required: true,
        multiple: true
      },
      {
        id: 'content_goals',
        label: 'Цели контента',
        type: 'textarea',
        placeholder: 'Каких целей вы хотите достичь с помощью контента?',
        required: true
      },
      {
        id: 'posting_frequency',
        label: 'Частота публикаций',
        type: 'select',
        options: [
          { label: '1-2 раза в неделю', value: 'low' },
          { label: '3-4 раза в неделю', value: 'medium' },
          { label: '5-7 раз в неделю', value: 'high' },
          { label: 'Более 7 раз в неделю', value: 'intensive' }
        ],
        required: true
      },
      {
        id: 'content_themes',
        label: 'Основные темы',
        type: 'textarea',
        placeholder: 'Перечислите основные темы для контента',
        required: true
      }
    ],
    systemPrompt: String.raw`Ты - контент-менеджер. Создай детальный контент-план.
    Платформы: {platforms}
    Цели: {content_goals}
    Частота публикаций: {posting_frequency}
    Темы: {content_themes}
    
    План должен быть разнообразным, учитывать особенности каждой платформы и включать разные типы контента.`
  }
]
