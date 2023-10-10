import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import tr from "./tr.json"
import { getCurrencies, getLocales } from "react-native-localize";
  
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: getLocales()[0].languageCode,
  fallbackLng: 'en',
  resources: {
    en: en,
    tr: tr
  },
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});
  
export default i18n;