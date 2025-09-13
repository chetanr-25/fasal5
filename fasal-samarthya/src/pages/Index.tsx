import { useState } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LanguageToggle } from "@/components/LanguageToggle";
import { HeroSection } from "@/components/HeroSection";
import { FarmDetailsForm, FarmFormData } from "@/components/FarmDetailsForm";
import { CropRecommendationDashboard } from "@/components/CropRecommendationDashboard";
import { ChatBot } from "@/components/ChatBot";

type AppScreen = 'hero' | 'form' | 'dashboard';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('hero');
  const [pincode, setPincode] = useState("");
  const [farmData, setFarmData] = useState<FarmFormData | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handlePincodeSubmit = (submittedPincode: string) => {
    setPincode(submittedPincode);
    setCurrentScreen('form');
  };

  const handleFormSubmit = (data: FarmFormData) => {
    setFarmData(data);
    setCurrentScreen('dashboard');
  };

  const handleBackToHero = () => {
    setCurrentScreen('hero');
    setPincode("");
    setFarmData(null);
  };

  const handleBackToForm = () => {
    setCurrentScreen('form');
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        <LanguageToggle />
        
        {currentScreen === 'hero' && (
          <HeroSection onPincodeSubmit={handlePincodeSubmit} />
        )}
        
        {currentScreen === 'form' && (
          <FarmDetailsForm 
            pincode={pincode}
            onSubmit={handleFormSubmit}
            onBack={handleBackToHero}
          />
        )}
        
        {currentScreen === 'dashboard' && farmData && (
          <CropRecommendationDashboard 
            farmData={farmData}
            onBack={handleBackToForm}
          />
        )}
        
        {/* Global Chat Bot - Available on all screens except hero */}
        {currentScreen !== 'hero' && (
          <ChatBot 
            isOpen={isChatOpen}
            onToggle={toggleChat}
          />
        )}
      </div>
    </LanguageProvider>
  );
};

export default Index;
