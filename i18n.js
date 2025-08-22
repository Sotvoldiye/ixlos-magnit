"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import uz from "./public/locales/uz/common.json";
import ru from "./public/locales/ru/common.json";
import en from "./public/locales/en/common.json";

i18n.use(initReactI18next).init({
  resources: {
    uz: { translation: uz },
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: "uz", // default til
  fallbackLng: "uz",
  interpolation: { escapeValue: false },
});

export default i18n;
