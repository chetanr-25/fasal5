import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Sprout, BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { authService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

interface FarmDetailsFormProps {
  pincode: string;
  onSubmit: (data: FarmFormData) => void;
  onBack: () => void;
}

export interface FarmFormData {
  pincode: string;
  location: string;
  farmArea: number;
  areaUnit: 'acres' | 'hectares';
  lastCrops: string[];
}

export function FarmDetailsForm({ pincode, onSubmit, onBack }: FarmDetailsFormProps) {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [farmArea, setFarmArea] = useState("");
  const [areaUnit, setAreaUnit] = useState<'acres' | 'hectares'>('acres');
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<string>("");
  
  // Fetch location data from pincode
  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // For now, use the mock function until backend is fully connected
        const locationData = getLocationFromPincode(pincode);
        setLocation(locationData);
      } catch (error) {
        console.error('Error fetching location:', error);
        toast({
          title: "Error",
          description: "Failed to fetch location data. Please try again.",
          variant: "destructive"
        });
        setLocation(`Location for ${pincode}`);
      }
    };
    
    fetchLocation();
  }, [pincode, toast]);

  const crops = Object.entries(t('crops') as any).map(([key, value]) => ({
    id: key,
    name: value,
  }));

  const handleCropSelect = (cropId: string) => {
    if (selectedCrops.includes(cropId)) {
      setSelectedCrops(selectedCrops.filter(id => id !== cropId));
    } else if (selectedCrops.length < 3) {
      setSelectedCrops([...selectedCrops, cropId]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Prepare data for API
      const apiData = {
        pincode,
        location_name: location.split(',')[0].trim(),
        district: location.includes(',') ? location.split(',')[0].trim() : '',
        state: location.includes(',') ? location.split(',')[1].trim() : '',
        farm_area_acres: areaUnit === 'acres' ? parseFloat(farmArea) : parseFloat(farmArea) * 0.404686,
        farm_area_hectares: areaUnit === 'hectares' ? parseFloat(farmArea) : parseFloat(farmArea) * 0.404686,
        phone: '1234567890' // This would normally come from user input or auth state
      };
      
      // In a real implementation, we would register or update user profile
      // For now, we'll just prepare the data but not make the actual API call
      // until the backend connection is fully established
      // await authService.register(apiData);
      
      const formData: FarmFormData = {
        pincode,
        location,
        farmArea: parseFloat(farmArea),
        areaUnit,
        lastCrops: selectedCrops,
      };

      onSubmit(formData);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const isValid = farmArea && parseFloat(farmArea) > 0 && selectedCrops.length > 0;

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="shadow-[var(--shadow-hero)]">
          <CardHeader className="text-center">
            <CardTitle className={`text-2xl md:text-3xl font-bold text-primary ${language === 'hi' ? 'font-hindi' : ''}`}>
              Farm Details
            </CardTitle>
            <p className={`text-muted-foreground ${language === 'hi' ? 'font-hindi' : ''}`}>
              Tell us about your farm for better recommendations
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Location Display */}
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <MapPin className="w-6 h-6 text-primary" />
              <div>
                <div className="font-semibold text-foreground">{location}</div>
                <div className="text-sm text-muted-foreground">Pincode: {pincode}</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Farm Area */}
              <div className="space-y-3">
                <label className={`text-sm font-medium text-foreground flex items-center gap-2 ${language === 'hi' ? 'font-hindi' : ''}`}>
                  <BarChart3 className="w-4 h-4" />
                  {t('farmArea')}
                </label>
                <div className="flex gap-3">
                  <Input
                    type="number"
                    step="0.1"
                    min="0.1"
                    placeholder="Enter area"
                    value={farmArea}
                    onChange={(e) => setFarmArea(e.target.value)}
                    className="flex-1 h-12"
                    required
                  />
                  <Select value={areaUnit} onValueChange={(value: 'acres' | 'hectares') => setAreaUnit(value)}>
                    <SelectTrigger className="w-32 h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="acres">{t('acres') as string}</SelectItem>
                      <SelectItem value="hectares">{t('hectares') as string}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Last Crops */}
              <div className="space-y-3">
                <label className={`text-sm font-medium text-foreground flex items-center gap-2 ${language === 'hi' ? 'font-hindi' : ''}`}>
                  <Sprout className="w-4 h-4" />
                  {t('lastCrops')} ({selectedCrops.length}/3)
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {crops.map((crop) => (
                    <button
                      key={crop.id}
                      type="button"
                      onClick={() => handleCropSelect(crop.id)}
                      className={`p-3 rounded-lg border-2 text-sm font-medium transition-[var(--transition-smooth)] ${
                        selectedCrops.includes(crop.id)
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                      } ${language === 'hi' ? 'font-hindi' : ''}`}
                      disabled={!selectedCrops.includes(crop.id) && selectedCrops.length >= 3}
                    >
                      {crop.name as string}
                    </button>
                  ))}
                </div>
                
                {selectedCrops.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedCrops.map((cropId) => {
                      const crop = crops.find(c => c.id === cropId);
                      return (
                        <Badge key={cropId} variant="secondary" className="text-sm">
                          {crop?.name as string}
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={onBack}
                  className={`flex-1 ${language === 'hi' ? 'font-hindi' : ''}`}
                >
                  {t('back')}
                </Button>
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  disabled={!isValid || isLoading}
                  className={`flex-1 ${language === 'hi' ? 'font-hindi' : ''}`}
                >
                  {isLoading ? t('loading') : t('getRecommendations')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Mock function to get location from pincode
function getLocationFromPincode(pincode: string): string {
  const locations: Record<string, string> = {
    '110001': 'New Delhi, Delhi',
    '400001': 'Mumbai, Maharashtra',
    '560001': 'Bangalore, Karnataka',
    '700001': 'Kolkata, West Bengal',
    '600001': 'Chennai, Tamil Nadu',
    '500001': 'Hyderabad, Telangana',
    '411001': 'Pune, Maharashtra',
    '302001': 'Jaipur, Rajasthan',
  };

  return locations[pincode] || `Location for ${pincode}`;
}