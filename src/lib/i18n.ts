// This file is deprecated and will be removed
// We are now using AppContext for translations

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { translations } from '@/i18n/translations';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translations.en,
      },
      ru: {
        translation: translations.ru,
      },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
export const t = i18n.t.bind(i18n);
