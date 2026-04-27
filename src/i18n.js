import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)            // pour charger les fichiers JSON
  .use(LanguageDetector)   // pour détecter la langue du navigateur
  .use(initReactI18next)   // pour React
  .init({
    fallbackLng: 'fr',     // si la langue n'est pas trouvée, on met français
    debug: false,
    interpolation: {
      escapeValue: false,  // React protège déjà contre les XSS
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

export default i18n;