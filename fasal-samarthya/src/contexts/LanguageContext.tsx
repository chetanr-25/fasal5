import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Landing Page
    appTitle: "FASAL",
    tagline: "Smart Crop Advisor",
    heroHeading: "Revolutionizing Indian Agriculture",
    heroSubheading: "Get personalized crop recommendations based on your location, weather, and soil conditions",
    enterPincode: "Enter Your Pincode",
    getRecommendations: "Get Recommendations",
    
    // Form Labels
    farmArea: "Farm Area",
    acres: "Acres",
    hectares: "Hectares",
    lastCrops: "Last 3 Crops Cultivated",
    selectCrop: "Select Crop",
    
    // Dashboard
    topRecommendations: "Top 5 Crop Recommendations",
    profitPercentage: "Expected Profit",
    weatherForecast: "Weather Forecast",
    soilQuality: "Soil Quality",
    
    // Crop Details
    investmentBreakdown: "Investment Breakdown",
    expectedReturns: "Expected Returns",
    fertilizerSchedule: "Fertilizer Schedule",
    pesticideCalendar: "Pesticide Calendar",
    
    // Chatbot
    chatWithExpert: "Chat with Farm Expert",
    askQuestion: "Ask your farming question...",
    
    // Common
    next: "Next",
    back: "Back",
    submit: "Submit",
    loading: "Loading...",
    location: "Location",
    
    // Crops
    crops: {
      wheat: "Wheat",
      rice: "Rice",
      corn: "Corn",
      sugarcane: "Sugarcane",
      cotton: "Cotton",
      soybean: "Soybean",
      mustard: "Mustard",
      gram: "Gram",
      tomato: "Tomato",
      potato: "Potato",
      onion: "Onion",
      bajra: "Bajra",
      jowar: "Jowar",
      barley: "Barley",
      groundnut: "Groundnut"
    }
  },
  hi: {
    // Landing Page
    appTitle: "फसल",
    tagline: "स्मार्ट फसल सलाहकार",
    heroHeading: "भारतीय कृषि में क्रांति",
    heroSubheading: "अपने स्थान, मौसम और मिट्टी की स्थिति के आधार पर व्यक्तिगत फसल सिफारिशें प्राप्त करें",
    enterPincode: "अपना पिनकोड दर्ज करें",
    getRecommendations: "सिफारिशें प्राप्त करें",
    
    // Form Labels
    farmArea: "खेत का क्षेत्रफल",
    acres: "एकड़",
    hectares: "हेक्टेयर",
    lastCrops: "पिछली 3 फसलें",
    selectCrop: "फसल चुनें",
    
    // Dashboard
    topRecommendations: "शीर्ष 5 फसल सिफारिशें",
    profitPercentage: "अपेक्षित लाभ",
    weatherForecast: "मौसम पूर्वानुमान",
    soilQuality: "मिट्टी की गुणवत्ता",
    
    // Crop Details
    investmentBreakdown: "निवेश विवरण",
    expectedReturns: "अपेक्षित रिटर्न",
    fertilizerSchedule: "उर्वरक अनुसूची",
    pesticideCalendar: "कीटनाशक कैलेंडर",
    
    // Chatbot
    chatWithExpert: "कृषि विशेषज्ञ से बात करें",
    askQuestion: "अपना कृषि प्रश्न पूछें...",
    
    // Common
    next: "आगे",
    back: "वापस",
    submit: "जमा करें",
    loading: "लोड हो रहा है...",
    location: "स्थान",
    
    // Crops
    crops: {
      wheat: "गेहूं",
      rice: "धान",
      corn: "मक्का",
      sugarcane: "गन्ना",
      cotton: "कपास",
      soybean: "सोयाबीन",
      mustard: "सरसों",
      gram: "चना",
      tomato: "टमाटर",
      potato: "आलू",
      onion: "प्याज",
      bajra: "बाजरा",
      jowar: "ज्वार",
      barley: "जौ",
      groundnut: "मूंगफली"
    }
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}