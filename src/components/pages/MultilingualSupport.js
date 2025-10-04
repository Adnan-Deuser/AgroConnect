// src/components/pages/MultilingualSupport.js
import i18nLib from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import React from 'react';
import { FaGlobe, FaChevronRight } from 'react-icons/fa';

// =======================
// i18n Setup
// =======================
const resources = {
  en: { translation: { 'welcomeTitle': 'Select Your Preferred Language', 'continue': 'Continue' } },
  hi: { translation: { 'welcomeTitle': 'अपनी पसंदीदा भाषा चुनें', 'continue': 'आगे बढ़ें' } },
  te: { translation: { 'welcomeTitle': 'మీకు నచ్చిన భాషను ఎంచుకోండి', 'continue': 'కొనసాగు' } },
  ta: { translation: { 'welcomeTitle': 'உங்களுக்குப் பிடித்த மொழியைத் தேர்ந்தெடுக்கவும்', 'continue': 'தொடரவும்' } },
  bn: { translation: { 'welcomeTitle': 'আপনার পছন্দের ভাষা নির্বাচন করুন', 'continue': 'চালিয়ে যান' } },
  mr: { translation: { 'welcomeTitle': 'तुमची पसंतीची भाषा निवडा', 'continue': 'चालू ठेवा' } },
};

i18nLib
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    detection: { order: ['navigator'] },
    interpolation: { escapeValue: false },
  });

export const i18n = i18nLib;

// =======================
// LanguageSelection Component
// =======================
const ALL_LANGUAGES = [
  { code: 'en', nativeName: 'English' },
  { code: 'hi', nativeName: 'हिंदी' },
  { code: 'te', nativeName: 'తెలుగు' },
  { code: 'ta', nativeName: 'தமிழ்' },
  { code: 'bn', nativeName: 'বাংলা' },
  { code: 'mr', nativeName: 'मराठी' },
];

const AVAILABLE_LANGUAGES = ALL_LANGUAGES.filter(lang => resources[lang.code]);

const getBaseLang = (lang) => lang.includes('-') ? lang.substring(0, 2) : lang;

export function LanguageSelection() {
  const { t, i18n } = useTranslation();
  const currentLang = getBaseLang(i18n.language);

  const handleLanguageChange = (code) => i18n.changeLanguage(code);
  const handleNext = () => alert(`Language selected: ${i18n.language}`);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-lg w-full text-center">
        <FaGlobe className="text-green-600 text-5xl mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{t('welcomeTitle')}</h1>
        <p className="text-gray-600 mb-8">{t('continue')}...</p>

        <div className="grid grid-cols-2 gap-4 mb-10">
          {AVAILABLE_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`py-3 px-4 rounded-lg font-semibold text-lg shadow transition duration-200 ${
                currentLang === lang.code
                  ? 'bg-green-600 text-white ring-2 ring-green-400'
                  : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
              }`}
              aria-label={lang.nativeName}
            >
              {lang.nativeName}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg w-full shadow-lg transition transform hover:scale-[1.01]"
        >
          <span>{t('continue')}</span>
          <FaChevronRight className="ml-2" />
        </button>
      </div>
    </div>
  );
}
