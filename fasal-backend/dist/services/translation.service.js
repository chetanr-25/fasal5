"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLanguageFromHeader = exports.translateObject = exports.translate = exports.Language = void 0;
// Define supported languages
exports.Language = {
    ENGLISH: 'en',
    HINDI: 'hi'
};
// Load translations from JSON files
const loadTranslations = () => {
    try {
        // In a real application, these would be loaded from JSON files
        // For now, we'll define them inline
        return {
            'welcome': {
                [exports.Language.ENGLISH]: 'Welcome to Fasal Samarthya',
                [exports.Language.HINDI]: 'फसल समर्थ्य में आपका स्वागत है'
            },
            'crop_recommendation': {
                [exports.Language.ENGLISH]: 'Crop Recommendation',
                [exports.Language.HINDI]: 'फसल अनुशंसा'
            },
            'weather_forecast': {
                [exports.Language.ENGLISH]: 'Weather Forecast',
                [exports.Language.HINDI]: 'मौसम का पूर्वानुमान'
            },
            'soil_health': {
                [exports.Language.ENGLISH]: 'Soil Health',
                [exports.Language.HINDI]: 'मिट्टी का स्वास्थ्य'
            },
            'market_prices': {
                [exports.Language.ENGLISH]: 'Market Prices',
                [exports.Language.HINDI]: 'बाजार मूल्य'
            },
            'login': {
                [exports.Language.ENGLISH]: 'Login',
                [exports.Language.HINDI]: 'लॉग इन करें'
            },
            'register': {
                [exports.Language.ENGLISH]: 'Register',
                [exports.Language.HINDI]: 'पंजीकरण करें'
            },
            'logout': {
                [exports.Language.ENGLISH]: 'Logout',
                [exports.Language.HINDI]: 'लॉग आउट करें'
            },
            'profile': {
                [exports.Language.ENGLISH]: 'Profile',
                [exports.Language.HINDI]: 'प्रोफ़ाइल'
            },
            'settings': {
                [exports.Language.ENGLISH]: 'Settings',
                [exports.Language.HINDI]: 'सेटिंग्स'
            },
            'error_occurred': {
                [exports.Language.ENGLISH]: 'An error occurred',
                [exports.Language.HINDI]: 'एक त्रुटि हुई'
            },
            'success': {
                [exports.Language.ENGLISH]: 'Success',
                [exports.Language.HINDI]: 'सफलता'
            },
            'submit': {
                [exports.Language.ENGLISH]: 'Submit',
                [exports.Language.HINDI]: 'जमा करें'
            },
            'cancel': {
                [exports.Language.ENGLISH]: 'Cancel',
                [exports.Language.HINDI]: 'रद्द करें'
            },
            'save': {
                [exports.Language.ENGLISH]: 'Save',
                [exports.Language.HINDI]: 'सहेजें'
            },
            'delete': {
                [exports.Language.ENGLISH]: 'Delete',
                [exports.Language.HINDI]: 'हटाएं'
            },
            'edit': {
                [exports.Language.ENGLISH]: 'Edit',
                [exports.Language.HINDI]: 'संपादित करें'
            },
            'view': {
                [exports.Language.ENGLISH]: 'View',
                [exports.Language.HINDI]: 'देखें'
            },
            'search': {
                [exports.Language.ENGLISH]: 'Search',
                [exports.Language.HINDI]: 'खोज'
            },
            'filter': {
                [exports.Language.ENGLISH]: 'Filter',
                [exports.Language.HINDI]: 'फ़िल्टर'
            },
            'sort': {
                [exports.Language.ENGLISH]: 'Sort',
                [exports.Language.HINDI]: 'क्रमबद्ध करें'
            },
            'next': {
                [exports.Language.ENGLISH]: 'Next',
                [exports.Language.HINDI]: 'अगला'
            },
            'previous': {
                [exports.Language.ENGLISH]: 'Previous',
                [exports.Language.HINDI]: 'पिछला'
            },
            'loading': {
                [exports.Language.ENGLISH]: 'Loading...',
                [exports.Language.HINDI]: 'लोड हो रहा है...'
            },
            'no_data': {
                [exports.Language.ENGLISH]: 'No data available',
                [exports.Language.HINDI]: 'कोई डेटा उपलब्ध नहीं है'
            },
            'error_404': {
                [exports.Language.ENGLISH]: 'Page not found',
                [exports.Language.HINDI]: 'पृष्ठ नहीं मिला'
            },
            'error_500': {
                [exports.Language.ENGLISH]: 'Server error',
                [exports.Language.HINDI]: 'सर्वर त्रुटि'
            },
            'error_401': {
                [exports.Language.ENGLISH]: 'Unauthorized',
                [exports.Language.HINDI]: 'अनधिकृत'
            },
            'error_403': {
                [exports.Language.ENGLISH]: 'Forbidden',
                [exports.Language.HINDI]: 'निषिद्ध'
            },
            'error_400': {
                [exports.Language.ENGLISH]: 'Bad request',
                [exports.Language.HINDI]: 'खराब अनुरोध'
            },
            'pincode': {
                [exports.Language.ENGLISH]: 'Pincode',
                [exports.Language.HINDI]: 'पिनकोड'
            },
            'farm_area': {
                [exports.Language.ENGLISH]: 'Farm Area',
                [exports.Language.HINDI]: 'खेत का क्षेत्रफल'
            },
            'season': {
                [exports.Language.ENGLISH]: 'Season',
                [exports.Language.HINDI]: 'मौसम'
            },
            'kharif': {
                [exports.Language.ENGLISH]: 'Kharif',
                [exports.Language.HINDI]: 'खरीफ'
            },
            'rabi': {
                [exports.Language.ENGLISH]: 'Rabi',
                [exports.Language.HINDI]: 'रबी'
            },
            'zaid': {
                [exports.Language.ENGLISH]: 'Zaid',
                [exports.Language.HINDI]: 'जायद'
            },
            'previous_crops': {
                [exports.Language.ENGLISH]: 'Previous Crops',
                [exports.Language.HINDI]: 'पिछली फसलें'
            },
            'recommended_crops': {
                [exports.Language.ENGLISH]: 'Recommended Crops',
                [exports.Language.HINDI]: 'अनुशंसित फसलें'
            },
            'crop_name': {
                [exports.Language.ENGLISH]: 'Crop Name',
                [exports.Language.HINDI]: 'फसल का नाम'
            },
            'confidence_score': {
                [exports.Language.ENGLISH]: 'Confidence Score',
                [exports.Language.HINDI]: 'विश्वास स्कोर'
            },
            'expected_yield': {
                [exports.Language.ENGLISH]: 'Expected Yield',
                [exports.Language.HINDI]: 'अपेक्षित उपज'
            },
            'expected_roi': {
                [exports.Language.ENGLISH]: 'Expected ROI',
                [exports.Language.HINDI]: 'अपेक्षित आरओआई'
            },
            'water_requirement': {
                [exports.Language.ENGLISH]: 'Water Requirement',
                [exports.Language.HINDI]: 'पानी की आवश्यकता'
            },
            'fertilizer_requirement': {
                [exports.Language.ENGLISH]: 'Fertilizer Requirement',
                [exports.Language.HINDI]: 'उर्वरक की आवश्यकता'
            },
            'pesticide_requirement': {
                [exports.Language.ENGLISH]: 'Pesticide Requirement',
                [exports.Language.HINDI]: 'कीटनाशक की आवश्यकता'
            },
            'soil_type': {
                [exports.Language.ENGLISH]: 'Soil Type',
                [exports.Language.HINDI]: 'मिट्टी का प्रकार'
            },
            'temperature': {
                [exports.Language.ENGLISH]: 'Temperature',
                [exports.Language.HINDI]: 'तापमान'
            },
            'rainfall': {
                [exports.Language.ENGLISH]: 'Rainfall',
                [exports.Language.HINDI]: 'वर्षा'
            },
            'humidity': {
                [exports.Language.ENGLISH]: 'Humidity',
                [exports.Language.HINDI]: 'आर्द्रता'
            },
            'ph': {
                [exports.Language.ENGLISH]: 'pH',
                [exports.Language.HINDI]: 'पीएच'
            },
            'nitrogen': {
                [exports.Language.ENGLISH]: 'Nitrogen',
                [exports.Language.HINDI]: 'नाइट्रोजन'
            },
            'phosphorus': {
                [exports.Language.ENGLISH]: 'Phosphorus',
                [exports.Language.HINDI]: 'फास्फोरस'
            },
            'potassium': {
                [exports.Language.ENGLISH]: 'Potassium',
                [exports.Language.HINDI]: 'पोटैशियम'
            },
            'organic_matter': {
                [exports.Language.ENGLISH]: 'Organic Matter',
                [exports.Language.HINDI]: 'जैविक पदार्थ'
            },
            'market_price': {
                [exports.Language.ENGLISH]: 'Market Price',
                [exports.Language.HINDI]: 'बाजार मूल्य'
            },
            'min_price': {
                [exports.Language.ENGLISH]: 'Minimum Price',
                [exports.Language.HINDI]: 'न्यूनतम मूल्य'
            },
            'max_price': {
                [exports.Language.ENGLISH]: 'Maximum Price',
                [exports.Language.HINDI]: 'अधिकतम मूल्य'
            },
            'avg_price': {
                [exports.Language.ENGLISH]: 'Average Price',
                [exports.Language.HINDI]: 'औसत मूल्य'
            },
            'modal_price': {
                [exports.Language.ENGLISH]: 'Modal Price',
                [exports.Language.HINDI]: 'मोडल मूल्य'
            },
            'price_trend': {
                [exports.Language.ENGLISH]: 'Price Trend',
                [exports.Language.HINDI]: 'मूल्य प्रवृत्ति'
            },
            'price_forecast': {
                [exports.Language.ENGLISH]: 'Price Forecast',
                [exports.Language.HINDI]: 'मूल्य पूर्वानुमान'
            },
            'chat_with_ai': {
                [exports.Language.ENGLISH]: 'Chat with AI',
                [exports.Language.HINDI]: 'एआई से चैट करें'
            },
            'ask_question': {
                [exports.Language.ENGLISH]: 'Ask a question',
                [exports.Language.HINDI]: 'प्रश्न पूछें'
            },
            'chat_history': {
                [exports.Language.ENGLISH]: 'Chat History',
                [exports.Language.HINDI]: 'चैट इतिहास'
            },
            'clear_chat': {
                [exports.Language.ENGLISH]: 'Clear Chat',
                [exports.Language.HINDI]: 'चैट साफ करें'
            },
            'typing': {
                [exports.Language.ENGLISH]: 'Typing...',
                [exports.Language.HINDI]: 'टाइपिंग...'
            },
            'send': {
                [exports.Language.ENGLISH]: 'Send',
                [exports.Language.HINDI]: 'भेजें'
            },
            'language': {
                [exports.Language.ENGLISH]: 'Language',
                [exports.Language.HINDI]: 'भाषा'
            },
            'english': {
                [exports.Language.ENGLISH]: 'English',
                [exports.Language.HINDI]: 'अंग्रेज़ी'
            },
            'hindi': {
                [exports.Language.ENGLISH]: 'Hindi',
                [exports.Language.HINDI]: 'हिंदी'
            }
        };
    }
    catch (error) {
        console.error('Error loading translations:', error);
        return {};
    }
};
// Initialize translations
const translations = loadTranslations();
/**
 * Translates a key to the specified language
 * @param key The translation key
 * @param language The target language
 * @returns The translated string or the key if translation not found
 */
const translate = (key, language = exports.Language.ENGLISH) => {
    if (!translations[key]) {
        return key; // Return the key if no translation exists
    }
    return translations[key][language] || translations[key][exports.Language.ENGLISH] || key;
};
exports.translate = translate;
/**
 * Translates an object's string values using the specified language
 * @param obj The object to translate
 * @param language The target language
 * @returns A new object with translated values
 */
const translateObject = (obj, language = exports.Language.ENGLISH) => {
    const result = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            if (typeof value === 'string' && translations[value]) {
                result[key] = (0, exports.translate)(value, language);
            }
            else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                result[key] = (0, exports.translateObject)(value, language);
            }
            else {
                result[key] = value;
            }
        }
    }
    return result;
};
exports.translateObject = translateObject;
/**
 * Gets the default language from the Accept-Language header
 * @param acceptLanguage The Accept-Language header value
 * @returns The detected language or default (English)
 */
const getLanguageFromHeader = (acceptLanguage) => {
    if (!acceptLanguage) {
        return exports.Language.ENGLISH;
    }
    // Parse the Accept-Language header
    const languages = acceptLanguage.split(',').map(lang => lang.trim().split(';')[0]);
    // Check if Hindi is preferred
    if (languages.some((lang) => lang && lang.startsWith('hi'))) {
        return exports.Language.HINDI;
    }
    // Default to English
    return exports.Language.ENGLISH;
};
exports.getLanguageFromHeader = getLanguageFromHeader;
//# sourceMappingURL=translation.service.js.map