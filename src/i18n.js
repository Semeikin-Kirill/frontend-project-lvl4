import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { i18nextPlugin } from 'translation-check';
import ru from './locales/ru.js';

const i18nextInstance = i18n.createInstance();

i18nextInstance.use(i18nextPlugin).use(initReactI18next).init({
  lng: 'ru',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    ru,
  },
});

export default i18nextInstance;
