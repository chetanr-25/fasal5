import fs from 'fs';
import path from 'path';

// Define supported languages
export const Language = {
  ENGLISH: 'en',
  HINDI: 'hi'
} as const;

export type Language = typeof Language[keyof typeof Language];

// Interface for translation entries
interface Translations {
  [key: string]: {
    [key in Language]?: string;
  };
}

// Load translations from JSON files
const loadTranslations = (): Translations => {
  try {
    // In a real application, these would be loaded from JSON files
    // For now, we'll define them inline
    return {
      'welcome': {
        [Language.ENGLISH]: 'Welcome to Fasal Samarthya',
        [Language.HINDI]: 'फसल समर्थ्य में आपका स्वागत है'
      },
      'crop_recommendation': {
        [Language.ENGLISH]: 'Crop Recommendation',
        [Language.HINDI]: 'फसल अनुशंसा'
      },
      'weather_forecast': {
        [Language.ENGLISH]: 'Weather Forecast',
        [Language.HINDI]: 'मौसम का पूर्वानुमान'
      },
      'soil_health': {
        [Language.ENGLISH]: 'Soil Health',
        [Language.HINDI]: 'मिट्टी का स्वास्थ्य'
      },
      'market_prices': {
        [Language.ENGLISH]: 'Market Prices',
        [Language.HINDI]: 'बाजार मूल्य'
      },
      'login': {
        [Language.ENGLISH]: 'Login',
        [Language.HINDI]: 'लॉग इन करें'
      },
      'register': {
        [Language.ENGLISH]: 'Register',
        [Language.HINDI]: 'पंजीकरण करें'
      },
      'logout': {
        [Language.ENGLISH]: 'Logout',
        [Language.HINDI]: 'लॉग आउट करें'
      },
      'profile': {
        [Language.ENGLISH]: 'Profile',
        [Language.HINDI]: 'प्रोफ़ाइल'
      },
      'settings': {
        [Language.ENGLISH]: 'Settings',
        [Language.HINDI]: 'सेटिंग्स'
      },
      'error_occurred': {
        [Language.ENGLISH]: 'An error occurred',
        [Language.HINDI]: 'एक त्रुटि हुई'
      },
      'success': {
        [Language.ENGLISH]: 'Success',
        [Language.HINDI]: 'सफलता'
      },
      'submit': {
        [Language.ENGLISH]: 'Submit',
        [Language.HINDI]: 'जमा करें'
      },
      'cancel': {
        [Language.ENGLISH]: 'Cancel',
        [Language.HINDI]: 'रद्द करें'
      },
      'save': {
        [Language.ENGLISH]: 'Save',
        [Language.HINDI]: 'सहेजें'
      },
      'delete': {
        [Language.ENGLISH]: 'Delete',
        [Language.HINDI]: 'हटाएं'
      },
      'edit': {
        [Language.ENGLISH]: 'Edit',
        [Language.HINDI]: 'संपादित करें'
      },
      'view': {
        [Language.ENGLISH]: 'View',
        [Language.HINDI]: 'देखें'
      },
      'search': {
        [Language.ENGLISH]: 'Search',
        [Language.HINDI]: 'खोज'
      },
      'filter': {
        [Language.ENGLISH]: 'Filter',
        [Language.HINDI]: 'फ़िल्टर'
      },
      'sort': {
        [Language.ENGLISH]: 'Sort',
        [Language.HINDI]: 'क्रमबद्ध करें'
      },
      'next': {
        [Language.ENGLISH]: 'Next',
        [Language.HINDI]: 'अगला'
      },
      'previous': {
        [Language.ENGLISH]: 'Previous',
        [Language.HINDI]: 'पिछला'
      },
      'loading': {
        [Language.ENGLISH]: 'Loading...',
        [Language.HINDI]: 'लोड हो रहा है...'
      },
      'no_data': {
        [Language.ENGLISH]: 'No data available',
        [Language.HINDI]: 'कोई डेटा उपलब्ध नहीं है'
      },
      'error_404': {
        [Language.ENGLISH]: 'Page not found',
        [Language.HINDI]: 'पृष्ठ नहीं मिला'
      },
      'error_500': {
        [Language.ENGLISH]: 'Server error',
        [Language.HINDI]: 'सर्वर त्रुटि'
      },
      'error_401': {
        [Language.ENGLISH]: 'Unauthorized',
        [Language.HINDI]: 'अनधिकृत'
      },
      'error_403': {
        [Language.ENGLISH]: 'Forbidden',
        [Language.HINDI]: 'निषिद्ध'
      },
      'error_400': {
        [Language.ENGLISH]: 'Bad request',
        [Language.HINDI]: 'खराब अनुरोध'
      },
      'pincode': {
        [Language.ENGLISH]: 'Pincode',
        [Language.HINDI]: 'पिनकोड'
      },
      'farm_area': {
        [Language.ENGLISH]: 'Farm Area',
        [Language.HINDI]: 'खेत का क्षेत्रफल'
      },
      'season': {
        [Language.ENGLISH]: 'Season',
        [Language.HINDI]: 'मौसम'
      },
      'kharif': {
        [Language.ENGLISH]: 'Kharif',
        [Language.HINDI]: 'खरीफ'
      },
      'rabi': {
        [Language.ENGLISH]: 'Rabi',
        [Language.HINDI]: 'रबी'
      },
      'zaid': {
        [Language.ENGLISH]: 'Zaid',
        [Language.HINDI]: 'जायद'
      },
      'previous_crops': {
        [Language.ENGLISH]: 'Previous Crops',
        [Language.HINDI]: 'पिछली फसलें'
      },
      'recommended_crops': {
        [Language.ENGLISH]: 'Recommended Crops',
        [Language.HINDI]: 'अनुशंसित फसलें'
      },
      'crop_name': {
        [Language.ENGLISH]: 'Crop Name',
        [Language.HINDI]: 'फसल का नाम'
      },
      'confidence_score': {
        [Language.ENGLISH]: 'Confidence Score',
        [Language.HINDI]: 'विश्वास स्कोर'
      },
      'expected_yield': {
        [Language.ENGLISH]: 'Expected Yield',
        [Language.HINDI]: 'अपेक्षित उपज'
      },
      'expected_roi': {
        [Language.ENGLISH]: 'Expected ROI',
        [Language.HINDI]: 'अपेक्षित आरओआई'
      },
      'water_requirement': {
        [Language.ENGLISH]: 'Water Requirement',
        [Language.HINDI]: 'पानी की आवश्यकता'
      },
      'fertilizer_requirement': {
        [Language.ENGLISH]: 'Fertilizer Requirement',
        [Language.HINDI]: 'उर्वरक की आवश्यकता'
      },
      'pesticide_requirement': {
        [Language.ENGLISH]: 'Pesticide Requirement',
        [Language.HINDI]: 'कीटनाशक की आवश्यकता'
      },
      'soil_type': {
        [Language.ENGLISH]: 'Soil Type',
        [Language.HINDI]: 'मिट्टी का प्रकार'
      },
      'temperature': {
        [Language.ENGLISH]: 'Temperature',
        [Language.HINDI]: 'तापमान'
      },
      'rainfall': {
        [Language.ENGLISH]: 'Rainfall',
        [Language.HINDI]: 'वर्षा'
      },
      'humidity': {
        [Language.ENGLISH]: 'Humidity',
        [Language.HINDI]: 'आर्द्रता'
      },
      'ph': {
        [Language.ENGLISH]: 'pH',
        [Language.HINDI]: 'पीएच'
      },
      'nitrogen': {
        [Language.ENGLISH]: 'Nitrogen',
        [Language.HINDI]: 'नाइट्रोजन'
      },
      'phosphorus': {
        [Language.ENGLISH]: 'Phosphorus',
        [Language.HINDI]: 'फास्फोरस'
      },
      'potassium': {
        [Language.ENGLISH]: 'Potassium',
        [Language.HINDI]: 'पोटैशियम'
      },
      'organic_matter': {
        [Language.ENGLISH]: 'Organic Matter',
        [Language.HINDI]: 'जैविक पदार्थ'
      },
      'market_price': {
        [Language.ENGLISH]: 'Market Price',
        [Language.HINDI]: 'बाजार मूल्य'
      },
      'min_price': {
        [Language.ENGLISH]: 'Minimum Price',
        [Language.HINDI]: 'न्यूनतम मूल्य'
      },
      'max_price': {
        [Language.ENGLISH]: 'Maximum Price',
        [Language.HINDI]: 'अधिकतम मूल्य'
      },
      'avg_price': {
        [Language.ENGLISH]: 'Average Price',
        [Language.HINDI]: 'औसत मूल्य'
      },
      'modal_price': {
        [Language.ENGLISH]: 'Modal Price',
        [Language.HINDI]: 'मोडल मूल्य'
      },
      'price_trend': {
        [Language.ENGLISH]: 'Price Trend',
        [Language.HINDI]: 'मूल्य प्रवृत्ति'
      },
      'price_forecast': {
        [Language.ENGLISH]: 'Price Forecast',
        [Language.HINDI]: 'मूल्य पूर्वानुमान'
      },
      'chat_with_ai': {
        [Language.ENGLISH]: 'Chat with AI',
        [Language.HINDI]: 'एआई से चैट करें'
      },
      'ask_question': {
        [Language.ENGLISH]: 'Ask a question',
        [Language.HINDI]: 'प्रश्न पूछें'
      },
      'chat_history': {
        [Language.ENGLISH]: 'Chat History',
        [Language.HINDI]: 'चैट इतिहास'
      },
      'clear_chat': {
        [Language.ENGLISH]: 'Clear Chat',
        [Language.HINDI]: 'चैट साफ करें'
      },
      'typing': {
        [Language.ENGLISH]: 'Typing...',
        [Language.HINDI]: 'टाइपिंग...'
      },
      'send': {
        [Language.ENGLISH]: 'Send',
        [Language.HINDI]: 'भेजें'
      },
      'language': {
        [Language.ENGLISH]: 'Language',
        [Language.HINDI]: 'भाषा'
      },
      'english': {
        [Language.ENGLISH]: 'English',
        [Language.HINDI]: 'अंग्रेज़ी'
      },
      'hindi': {
        [Language.ENGLISH]: 'Hindi',
        [Language.HINDI]: 'हिंदी'
      }
    };
  } catch (error) {
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
export const translate = (key: string, language: Language = Language.ENGLISH): string => {
  if (!translations[key]) {
    return key; // Return the key if no translation exists
  }

  return translations[key][language] || translations[key][Language.ENGLISH] || key;
};

/**
 * Translates an object's string values using the specified language
 * @param obj The object to translate
 * @param language The target language
 * @returns A new object with translated values
 */
export const translateObject = <T extends Record<string, any>>(
  obj: T,
  language: Language = Language.ENGLISH
): T => {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (typeof value === 'string' && translations[value]) {
        result[key] = translate(value, language);
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        result[key] = translateObject(value, language);
      } else {
        result[key] = value;
      }
    }
  }

  return result as T;
};

/**
 * Gets the default language from the Accept-Language header
 * @param acceptLanguage The Accept-Language header value
 * @returns The detected language or default (English)
 */
export const getLanguageFromHeader = (acceptLanguage?: string): Language => {
  if (!acceptLanguage) {
    return Language.ENGLISH;
  }

  // Parse the Accept-Language header
  const languages = acceptLanguage.split(',').map(lang => lang.trim().split(';')[0]);

  // Check if Hindi is preferred
  if (languages.some((lang) => lang && lang.startsWith('hi'))) {
    return Language.HINDI;
  }

  // Default to English
  return Language.ENGLISH;
};