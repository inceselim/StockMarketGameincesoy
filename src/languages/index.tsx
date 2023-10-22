import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import en from './en.json';
import tr from "./tr.json"
import de from "./de.json"
import es from "./es.json"
import fr from "./fr.json"
import it from "./it.json"
import ja from "./ja.json"
import pl from "./pl.json"
import ru from "./ru.json"
import { getCurrencies, getLocales } from "react-native-localize";
  
i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: getLocales()[0].languageCode,
  fallbackLng: 'en',
  resources: {
    en: en,
    tr: tr,
    de:de,
    es:es,
    fr:fr,
    it:it,
    ja:ja,
    pl:pl,
    ru:ru

  },
  interpolation: {
    escapeValue: false // react already safes from xss
  }
});
  
export default i18n;