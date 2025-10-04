import React, { useState } from 'react';
import { FaExchangeAlt } from 'react-icons/fa';
import { i18n } from './MultilingualSupport'; // FIXED PATH

const ALL_LANGUAGES = [
  { code: 'en', nativeName: 'English' },
  { code: 'hi', nativeName: 'हिंदी' },
  { code: 'te', nativeName: 'తెలుగు' },
  { code: 'ta', nativeName: 'தமிழ்' },
  { code: 'bn', nativeName: 'বাংলা' },
  { code: 'mr', nativeName: 'मराठी' },
];

export default function Translator() {
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');
  const [text, setText] = useState('');
  const [translated, setTranslated] = useState('');

  const handleTranslate = () => {
    if (!text) return setTranslated('');
    const resource = i18n.getResource(targetLang, 'translation', text);
    setTranslated(resource || text);
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setTranslated('');
  };

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Simple Translator</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)} className="p-2 rounded-lg border">
            {ALL_LANGUAGES.map(lang => <option key={lang.code} value={lang.code}>{lang.nativeName}</option>)}
          </select>

          <button onClick={handleSwap} className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition">
            <FaExchangeAlt />
          </button>

          <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)} className="p-2 rounded-lg border">
            {ALL_LANGUAGES.map(lang => <option key={lang.code} value={lang.code}>{lang.nativeName}</option>)}
          </select>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
          className="w-full p-3 rounded-lg border mb-4 resize-none"
          rows={4}
        />

        <button
          onClick={handleTranslate}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg shadow-lg transition transform hover:scale-[1.01] mb-4"
        >
          Translate
        </button>

        <div className="bg-gray-100 p-4 rounded-lg text-left min-h-[100px]">
          {translated || 'Translation will appear here...'}
        </div>
      </div>
    </div>
  );
}
