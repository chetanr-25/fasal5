import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Zap, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import heroImage from "@/assets/hero-agriculture.jpg";

interface HeroSectionProps {
  onPincodeSubmit: (pincode: string) => void;
}

export function HeroSection({ onPincodeSubmit }: HeroSectionProps) {
  const [pincode, setPincode] = useState("");
  const { language, t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6) {
      onPincodeSubmit(pincode);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/60 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo and Title */}
        <div className="mb-8">
          <h1 className={`text-6xl md:text-8xl font-bold mb-4 ${language === 'hi' ? 'font-hindi' : ''}`}>
            <span className="hero-gradient bg-clip-text text-transparent animate-float">
              {t('appTitle')}
            </span>
          </h1>
          <p className={`text-xl md:text-2xl text-primary-foreground/90 font-medium ${language === 'hi' ? 'font-hindi' : ''}`}>
            {t('tagline')}
          </p>
        </div>

        {/* Hero Content */}
        <div className="mb-12">
          <h2 className={`text-3xl md:text-5xl font-bold text-primary-foreground mb-6 ${language === 'hi' ? 'font-hindi' : ''}`}>
            {t('heroHeading')}
          </h2>
          <p className={`text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed ${language === 'hi' ? 'font-hindi' : ''}`}>
            {t('heroSubheading')}
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <MapPin className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary-foreground mb-2">Location-Based</h3>
            <p className="text-primary-foreground/70">Pincode-based recommendations</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <Zap className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary-foreground mb-2">AI-Powered</h3>
            <p className="text-primary-foreground/70">Smart crop analysis</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <TrendingUp className="w-12 h-12 text-secondary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary-foreground mb-2">Profit Focused</h3>
            <p className="text-primary-foreground/70">Maximum ROI calculations</p>
          </div>
        </div>

        {/* Pincode Input */}
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="text"
              placeholder={t('enterPincode')}
              value={pincode}
              onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className={`flex-1 h-14 text-lg bg-white/90 border-white/30 placeholder:text-muted-foreground/70 ${language === 'hi' ? 'font-hindi' : ''}`}
              required
              maxLength={6}
            />
            <Button
              type="submit"
              variant="hero"
              size="touch"
              className={`${language === 'hi' ? 'font-hindi' : ''}`}
              disabled={pincode.length !== 6}
            >
              {t('getRecommendations')}
            </Button>
          </div>
        </form>

        {/* Trust Indicators */}
        <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-primary-foreground/60">
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">50K+</div>
            <div className="text-sm">Happy Farmers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">99%</div>
            <div className="text-sm">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">24/7</div>
            <div className="text-sm">AI Support</div>
          </div>
        </div>
      </div>
    </div>
  );
}