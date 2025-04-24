import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from "./";
import translationFR from "./fr/translation.json";


// Resources for translations
const resources = {
  en: {
    translation: translationEN,
  },
  fr: {
    translation: translationFR,
  },

};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Default language
  fallbackLng: "en", // Fallback language if translation is missing
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;