// This file contains the i18n configuration and two exportable React components:
// LanguageSelection (default export) and DiseaseDetection (named export).

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation, initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// Icons used:
import { FaGlobe, FaChevronRight, FaVirus, FaCamera, FaMicroscope, FaSpinner } from 'react-icons/fa';


// ====================================================================
// 1. i18n Setup 
// ====================================================================

const resources = {
    en: {
        translation: {
            'welcomeTitle': 'Select Your Preferred Language',
            'nextToDetection': 'Next: Disease Detection →',
            'continue': 'Continue',
            'pageTitle': 'Disease Detection',
            'pageSubtitle': 'Identify crop diseases early using AI-powered image analysis.',
            'cameraTitle': 'Camera Detection',
            'cameraDesc': 'Tap to start instant detection.',
            'aiTitle': 'AI Analysis',
            'aiDesc': 'Tap for detailed AI analysis.',
            'tipsTitle': 'Preventive Tips',
            'tipsDesc': 'Tap to get custom recommendations.',
            'backToHome': '← Back to Language Selection',
            'loadingAnalysis': 'Analysis in progress...',
            'closeSimulation': 'Close Simulation',
        },
    },
    hi: {
        translation: {
            'welcomeTitle': 'अपनी पसंदीदा भाषा चुनें',
            'nextToDetection': 'अगला: रोग की पहचान →',
            'continue': 'आगे बढ़ें',
            'pageTitle': 'रोग की पहचान',
            'pageSubtitle': 'एआई-संचालित छवि विश्लेषण का उपयोग करके फसल रोगों की जल्द पहचान करें।',
            'cameraTitle': 'कैमरा पहचान',
            'cameraDesc': 'त्वरित पहचान शुरू करने के लिए टैप करें।',
            'aiTitle': 'एआई विश्लेषण',
            'aiDesc': 'विस्तृत एआई विश्लेषण के लिए टैप करें।',
            'tipsTitle': 'निवारक सुझाव',
            'tipsDesc': 'कस्टम सिफारिशें प्राप्त करने के लिए टैप करें।',
            'backToHome': '← भाषा चयन पर वापस जाएं',
            'loadingAnalysis': 'विश्लेषण प्रगति पर है...',
            'closeSimulation': 'सिमुलेशन बंद करें',
        },
    },
    te: { // Telugu (తెలుగు)
        translation: {
            'welcomeTitle': 'మీకు నచ్చిన భాషను ఎంచుకోండి',
            'nextToDetection': 'తరువాత: వ్యాధి నిర్ధారణ →',
            'continue': 'కొనసాగించు',
            'pageTitle': 'వ్యాధి నిర్ధారణ',
            'pageSubtitle': 'AI-ఆధారిత ఇమేజ్ విశ్లేషణను ఉపయోగించి పంట వ్యాధులను ముందుగా గుర్తించండి.',
            'cameraTitle': 'కెమెరా గుర్తింపు',
            'cameraDesc': 'తక్షణ గుర్తింపు ప్రారంభించడానికి నొక్కండి.',
            'aiTitle': 'AI విశ్లేషణ',
            'aiDesc': 'వివరణాత్మక AI విశ్లేషణ కోసం నొక్కండి.',
            'tipsTitle': 'నివారణ చిట్కాలు',
            'tipsDesc': 'అనుకూల సిఫార్సుల కోసం నొక్కండి.',
            'backToHome': '← భాషా ఎంపికకు తిరిగి వెళ్ళు',
            'loadingAnalysis': 'విశ్లేషణ జరుగుతోంది...',
            'closeSimulation': 'సిమ్యులేషన్ మూసివేయి',
        },
    },
    ta: { // Tamil (தமிழ்)
        translation: {
            'welcomeTitle': 'உங்களுக்குப் பிடித்த மொழியைத் தேர்ந்தெடுக்கவும்',
            'nextToDetection': 'அடுத்து: நோய் கண்டறிதல் →',
            'continue': 'தொடரவும்',
            'pageTitle': 'நோய் கண்டறிதல்',
            'pageSubtitle': 'AI-இயங்கும் பட பகுப்பாய்வு மூலம் பயிர் நோய்களை முன்கூட்டியே கண்டறியவும்.',
            'cameraTitle': 'கேமரா கண்டறிதல்',
            'cameraDesc': 'உடனடி கண்டறிதலைத் தொடங்க தட்டவும்.',
            'aiTitle': 'AI பகுப்பாய்வு',
            'aiDesc': 'விரிவான AI பகுப்பாய்வுக்கு தட்டவும்.',
            'tipsTitle': 'தடுப்பு குறிப்புகள்',
            'tipsDesc': 'தனிப்பயன் பரிந்துரைகளைப் பெற தட்டவும்.',
            'backToHome': '← மொழித் தேர்வுக்குத் திரும்பு',
            'loadingAnalysis': 'பகுப்பாய்வு நடந்து கொண்டிருக்கிறது...',
            'closeSimulation': 'உருவகப்படுத்துதலை மூடுக',
        },
    },
    bn: { // Bengali (বাংলা)
        translation: {
            'welcomeTitle': 'আপনার পছন্দের ভাষা নির্বাচন করুন',
            'nextToDetection': 'পরবর্তী: রোগ সনাক্তকরণ →',
            'continue': 'চালিয়ে যান',
            'pageTitle': 'রোগ সনাক্তকরণ',
            'pageSubtitle': 'এআই-চালিত চিত্র বিশ্লেষণ ব্যবহার করে ফসলের রোগগুলি প্রাথমিকভাবে সনাক্ত করুন।',
            'cameraTitle': 'ক্যামেরা সনাক্তকরণ',
            'cameraDesc': 'তাৎক্ষণিক সনাক্তকরণ শুরু করতে আলতো চাপুন।',
            'aiTitle': 'এআই বিশ্লেষণ',
            'aiDesc': 'বিস্তারিত এআই বিশ্লেষণের জন্য আলতো চাপুন।',
            'tipsTitle': 'প্রতিরোধমূলক টিপস',
            'tipsDesc': 'কাস্টম সুপারিশ পেতে আলতো চাপুন।',
            'backToHome': '← ভাষা নির্বাচনে ফিরে যান',
            'loadingAnalysis': 'বিশ্লেষণ চলছে...',
            'closeSimulation': 'সিমুলেশন বন্ধ করুন',
        },
    },
    mr: { // Marathi (मराठी) - Added missing resource
        translation: {
            'welcomeTitle': 'तुमची पसंतीची भाषा निवडा',
            'nextToDetection': 'पुढील: रोग निदान →',
            'continue': 'चालू ठेवा',
            'pageTitle': 'रोग निदान',
            'pageSubtitle': 'एआय-शक्तीवर चालणाऱ्या प्रतिमा विश्लेषणाचा वापर करून पिकांचे रोग लवकर ओळखा.',
            'cameraTitle': 'कॅमेरा निदान',
            'cameraDesc': 'त्वरित निदान सुरू करण्यासाठी टॅप करा.',
            'aiTitle': 'एआय विश्लेषण',
            'aiDesc': 'तपशीलवार एआय विश्लेषणासाठी टॅप करा.',
            'tipsTitle': 'प्रतिबंधात्मक टिप्स',
            'tipsDesc': 'सानुकूल शिफारसी मिळवण्यासाठी टॅप करा.',
            'backToHome': '← भाषा निवडवर परत जा',
            'loadingAnalysis': 'विश्लेषण प्रगतीपथावर आहे...',
            'closeSimulation': 'सिम्युलेशन बंद करा',
        },
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        detection: { order: ['navigator'] },
        interpolation: { escapeValue: false },
    });

// Export the i18n instance so it can be used in the I18nextProvider in the main file
export { i18n };

// ====================================================================
// 2. LanguageSelection Component 
// ====================================================================

const ALL_LANGUAGES = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
    { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
];

// Determine which languages are available in the resources
const AVAILABLE_LANGUAGES = ALL_LANGUAGES.filter(lang => resources[lang.code]);

// Helper function to get the base language code
const getBaseLang = (lang) => lang.includes('-') ? lang.substring(0, 2) : lang;


export function LanguageSelection() {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    
    // Get the current language, stripping the region code (e.g., 'en-US' -> 'en')
    const currentLang = getBaseLang(i18n.language);

    const handleLanguageChange = (code) => {
        i18n.changeLanguage(code);
    };

    const handleNext = () => {
        // Navigates to the route path '/detection'
        navigate('/detection'); 
    };

    return (
        <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6">
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-lg w-full text-center">
                
                <FaGlobe className="text-green-600 text-5xl mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    {t('welcomeTitle')}
                </h1>
                
                <p className="text-gray-600 mb-8">
                    {t('continue')}...
                </p>

                {/* Language Grid */}
                <div className="grid grid-cols-2 gap-4 mb-10">
                    {AVAILABLE_LANGUAGES.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => handleLanguageChange(lang.code)}
                            className={`
                                py-3 px-4 rounded-lg font-semibold text-lg shadow transition duration-200
                                ${currentLang === lang.code
                                    ? 'bg-green-600 text-white ring-2 ring-green-400'
                                    : 'bg-gray-100 text-gray-700 hover:bg-green-100 hover:text-green-700'
                                }
                            `}
                            aria-label={lang.nativeName}
                        >
                            {lang.nativeName}
                        </button>
                    ))}
                </div>

                {/* Next Button: Points to Disease Detection */}
                <button
                    onClick={handleNext}
                    className="flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg w-full shadow-lg transition transform hover:scale-[1.01]"
                >
                    <span>{t('nextToDetection')}</span>
                    <FaChevronRight className="ml-2" />
                </button>
            </div>
        </div>
    );
}

// ====================================================================
// 3. DiseaseDetection Component
// ====================================================================

// FIX: Change 'color' to 'colorClass' to use full, non-dynamic Tailwind class names
// This prevents Tailwind CSS from purging the class names like 'text-purple-500'
const FEATURE_CONFIG = {
    camera: { icon: FaCamera, colorClass: "text-green-500", titleKey: "cameraTitle", descKey: "cameraDesc" },
    ai: { icon: FaMicroscope, colorClass: "text-purple-500", titleKey: "aiTitle", descKey: "aiDesc" },
    tips: { icon: FaVirus, colorClass: "text-red-500", titleKey: "tipsTitle", descKey: "tipsDesc" },
};

export function DiseaseDetection() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [activeFeature, setActiveFeature] = useState(null); 
    
    const handleCardClick = (feature) => {
        setActiveFeature(feature);
        // The alert below is good for simulation, but I'll update it to use the new i18n key for 'continue'
        alert(`${t('continue')} with: ${t(FEATURE_CONFIG[feature].titleKey)}`); 
    };

    return (
        <div className="min-h-screen bg-red-50 py-12 px-6 relative">
            
            {/* Modal placeholder to show analysis starts */}
            {activeFeature && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-40 p-4">
                    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full text-center">
                        <FaSpinner className="animate-spin text-4xl text-green-600 mx-auto mb-4" />
                        <h3 className="font-bold text-lg mb-2">{t(FEATURE_CONFIG[activeFeature].titleKey)}</h3>
                        <p>{t('loadingAnalysis')}</p> {/* Using i18n for 'Analysis in progress' */}
                        <button onClick={() => setActiveFeature(null)} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
                            {t('closeSimulation')} {/* Using i18n for 'Close Simulation' */}
                        </button>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <div className="text-center mb-12">
                <FaVirus className="mx-auto text-red-600 text-6xl mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    {t("pageTitle")}
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-gray-600">
                    {t("pageSubtitle")}
                </p>
            </div>

            {/* Info Grid - Cards */}
            <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 container mx-auto">
                
                {['camera', 'ai', 'tips'].map(key => {
                    const details = FEATURE_CONFIG[key];
                    return (
                        <div
                            key={key}
                            onClick={() => handleCardClick(key)}
                            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition cursor-pointer flex flex-col justify-between hover:bg-green-50"
                        >
                            {/* FIX: Use the full class name string from config */}
                            <details.icon className={`${details.colorClass} text-4xl mb-4`} />
                            <h2 className="text-xl font-semibold mb-2">{t(details.titleKey)}</h2>
                            <p className="text-gray-600">{t(details.descKey)}</p>
                        </div>
                    );
                })}
            </div>

            {/* Back Button */}
            <div className="text-center mt-16">
                <button
                    onClick={() => navigate("/")}
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded shadow"
                >
                    {t("backToHome")}
                </button>
            </div>
        </div>
    );
}

// ====================================================================
// 4. Exports 
// ====================================================================

// Default export for common imports:
export default LanguageSelection;

// Named exports (LanguageSelection and DiseaseDetection are also implicitly named exports 
// because of 'export function' above, but we export 'i18n' separately):
// export { LanguageSelection, DiseaseDetection, i18n }; // This line is optional due to the 'export function' usage