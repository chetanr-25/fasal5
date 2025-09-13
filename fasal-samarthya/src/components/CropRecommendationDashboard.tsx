import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Droplets, 
  Thermometer, 
  Wind, 
  Sun, 
  IndianRupee, 
  Calendar,
  Sprout,
  AlertTriangle,
  CheckCircle,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FarmFormData } from "./FarmDetailsForm";
import { recommendationService, weatherService } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

// Use the styles.css for custom colors
import "./styles.css";

interface CropRecommendation {
  id: string;
  name: string;
  nameHi: string;
  profitPercentage: number;
  confidence: number;
  season: 'kharif' | 'rabi' | 'zaid';
  investment: number;
  expectedReturn: number;
  duration: number;
  soilSuitability: number;
  weatherCompatibility: number;
}

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  windSpeed: number;
  forecast: Array<{
    day: string;
    temp: number;
    condition: string;
    icon: string;
  }>;
}

interface SoilData {
  ph: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  organicMatter: number;
  moisture: number;
}

interface Props {
  farmData: FarmFormData;
  onBack: () => void;
}

export function CropRecommendationDashboard({ farmData, onBack }: Props) {
  const { language, t } = useLanguage();
  const { toast } = useToast();
  const [selectedCrop, setSelectedCrop] = useState<CropRecommendation | null>(null);
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch crop recommendations from API
  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, we would call the API
        // const response = await recommendationService.getCropRecommendations({
        //   location: farmData.location,
        //   farmArea: farmData.farmArea,
        //   areaUnit: farmData.areaUnit
        // });
        // setRecommendations(response.data);
        
        // For now, use mock data until backend is fully connected
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockRecommendations: CropRecommendation[] = [
          {
            id: 'wheat',
            name: 'Wheat',
            nameHi: 'गेहूं',
            profitPercentage: 85,
            confidence: 95,
            season: 'rabi',
            investment: 25000,
            expectedReturn: 46250,
            duration: 120,
            soilSuitability: 90,
            weatherCompatibility: 88
          },
          {
            id: 'mustard',
            name: 'Mustard',
            nameHi: 'सरसों',
            profitPercentage: 72,
            confidence: 88,
            season: 'rabi',
            investment: 18000,
            expectedReturn: 30960,
            duration: 90,
            soilSuitability: 85,
            weatherCompatibility: 92
          },
          {
            id: 'gram',
            name: 'Gram',
            nameHi: 'चना',
            profitPercentage: 68,
            confidence: 82,
            season: 'rabi',
            investment: 20000,
            expectedReturn: 33600,
            duration: 100,
            soilSuitability: 80,
            weatherCompatibility: 85
          },
          {
            id: 'barley',
            name: 'Barley',
            nameHi: 'जौ',
            profitPercentage: 58,
            confidence: 75,
            season: 'rabi',
            investment: 22000,
            expectedReturn: 34760,
            duration: 110,
            soilSuitability: 75,
            weatherCompatibility: 80
          },
          {
            id: 'potato',
            name: 'Potato',
            nameHi: 'आलू',
            profitPercentage: 45,
            confidence: 70,
            season: 'rabi',
            investment: 35000,
            expectedReturn: 50750,
            duration: 75,
            soilSuitability: 70,
            weatherCompatibility: 75
          }
        ];
        
        setRecommendations(mockRecommendations);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
        toast({
          title: "Error",
          description: "Failed to fetch crop recommendations. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecommendations();
  }, [farmData, t, toast]);

  // Weather data state
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temperature: 0,
    humidity: 0,
    rainfall: 0,
    windSpeed: 0,
    forecast: []
  });
  
  // Fetch weather data from API
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // In a real implementation, we would call the API
        // const response = await weatherService.getWeatherData(farmData.location);
        // setWeatherData(response.data);
        
        // For now, use mock data until backend is fully connected
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock weather data
        const mockWeatherData: WeatherData = {
          temperature: 18,
          humidity: 65,
          rainfall: 12,
          windSpeed: 8,
          forecast: [
            { day: 'Today', temp: 18, condition: 'Sunny', icon: '☀️' },
            { day: 'Tomorrow', temp: 20, condition: 'Partly Cloudy', icon: '⛅' },
            { day: 'Day 3', temp: 16, condition: 'Cloudy', icon: '☁️' },
            { day: 'Day 4', temp: 14, condition: 'Light Rain', icon: '🌦️' },
            { day: 'Day 5', temp: 17, condition: 'Sunny', icon: '☀️' },
          ]
        };
        
        setWeatherData(mockWeatherData);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        toast({
          title: "Error",
          description: "Failed to fetch weather data. Please try again.",
          variant: "destructive"
        });
      }
    };
    
    fetchWeatherData();
  }, [farmData.location, toast]);

  const soilData: SoilData = {
    ph: 7.2,
    nitrogen: 75,
    phosphorus: 68,
    potassium: 82,
    organicMatter: 3.2,
    moisture: 45
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-background py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className={`text-3xl font-bold text-primary ${language === 'hi' ? 'font-hindi' : ''}`}>
                {t('topRecommendations')}
              </h1>
              <p className="text-muted-foreground">
                {farmData.location} • {farmData.farmArea} {t(farmData.areaUnit)}
              </p>
            </div>
            <Button variant="outline" onClick={onBack}>
              {t('back')}
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Thermometer className="w-8 h-8 text-orange-500" />
                <div>
                  <div className="text-2xl font-bold">{weatherData.temperature}°C</div>
                  <div className="text-sm text-muted-foreground">Temperature</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Droplets className="w-8 h-8 text-blue-500" />
                <div>
                  <div className="text-2xl font-bold">{weatherData.humidity}%</div>
                  <div className="text-sm text-muted-foreground">Humidity</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 text-green-500 flex items-center justify-center text-xl">pH</div>
                <div>
                  <div className="text-2xl font-bold">{soilData.ph}</div>
                  <div className="text-sm text-muted-foreground">Soil pH</div>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Wind className="w-8 h-8 text-gray-500" />
                <div>
                  <div className="text-2xl font-bold">{weatherData.windSpeed}</div>
                  <div className="text-sm text-muted-foreground">Wind km/h</div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Crop Recommendations */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-primary" />
                  Recommended Crops
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((crop, index) => (
                    <div
                      key={crop.id}
                      className={`crop-card p-4 cursor-pointer border-l-4 ${
                        index === 0 ? 'border-l-primary bg-primary/5' :
                        index === 1 ? 'border-l-secondary bg-secondary/5' :
                        'border-l-muted'
                      } ${selectedCrop?.id === crop.id ? 'ring-2 ring-primary' : ''}`}
                      onClick={() => setSelectedCrop(crop)}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`text-2xl font-bold flex items-center gap-1 ${
                            index === 0 ? 'text-primary' : 
                            index === 1 ? 'text-secondary' : 
                            'text-foreground'
                          }`}>
                            #{index + 1}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">
                              {language === 'hi' ? crop.nameHi : crop.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <Badge variant={crop.season === 'rabi' ? 'secondary' : 'outline'}>
                                {crop.season.toUpperCase()}
                              </Badge>
                              <span className="text-sm text-muted-foreground">
                                {crop.duration} days
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-3xl font-bold ${
                            crop.profitPercentage > 70 ? 'text-green-600' :
                            crop.profitPercentage > 50 ? 'text-orange-500' :
                            'text-red-500'
                          }`}>
                            +{crop.profitPercentage}%
                          </div>
                          <div className="text-sm text-muted-foreground">Expected Profit</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-muted-foreground">Investment</div>
                          <div className="font-semibold">{formatCurrency(crop.investment)}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Return</div>
                          <div className="font-semibold text-green-600">{formatCurrency(crop.expectedReturn)}</div>
                        </div>
                        <div>
                          <div className="text-muted-foreground">Confidence</div>
                          <div className="flex items-center gap-1">
                            <Progress value={crop.confidence} className="w-16 h-2" />
                            <span className="font-semibold">{crop.confidence}%</span>
                          </div>
                        </div>
                      </div>

                      {index === 0 && (
                        <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="font-medium">Highly recommended for your region</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weather & Soil Info */}
          <div className="space-y-6">
            {/* Weather Widget */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sun className="w-5 h-5 text-orange-500" />
                  {t('weatherForecast')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weatherData.forecast.slice(0, 3).map((day) => (
                    <div key={day.day} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{day.icon}</span>
                        <div>
                          <div className="font-medium">{day.day}</div>
                          <div className="text-sm text-muted-foreground">{day.condition}</div>
                        </div>
                      </div>
                      <div className="text-xl font-bold">{day.temp}°C</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Soil Quality */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-earth-brown rounded"></div>
                  {t('soilQuality')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Nitrogen (N)</span>
                      <span className="text-sm font-semibold">{soilData.nitrogen}%</span>
                    </div>
                    <Progress value={soilData.nitrogen} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Phosphorus (P)</span>
                      <span className="text-sm font-semibold">{soilData.phosphorus}%</span>
                    </div>
                    <Progress value={soilData.phosphorus} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Potassium (K)</span>
                      <span className="text-sm font-semibold">{soilData.potassium}%</span>
                    </div>
                    <Progress value={soilData.potassium} className="h-2" />
                  </div>
                  
                  <div className="pt-2 border-t">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">pH Level</div>
                        <div className="font-semibold">{soilData.ph}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Moisture</div>
                        <div className="font-semibold">{soilData.moisture}%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Crop Information */}
        {selectedCrop && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <IndianRupee className="w-5 h-5 text-primary" />
                Detailed Analysis: {language === 'hi' ? selectedCrop.nameHi : selectedCrop.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="investment" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="investment">{t('investmentBreakdown')}</TabsTrigger>
                  <TabsTrigger value="schedule">{t('fertilizerSchedule')}</TabsTrigger>
                  <TabsTrigger value="calendar">{t('pesticideCalendar')}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="investment" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-4">Cost Breakdown</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Seeds</span>
                          <span className="font-semibold">{formatCurrency(selectedCrop.investment * 0.25)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fertilizers</span>
                          <span className="font-semibold">{formatCurrency(selectedCrop.investment * 0.35)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Labor</span>
                          <span className="font-semibold">{formatCurrency(selectedCrop.investment * 0.25)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Equipment</span>
                          <span className="font-semibold">{formatCurrency(selectedCrop.investment * 0.15)}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-bold">
                          <span>Total Investment</span>
                          <span>{formatCurrency(selectedCrop.investment)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-4">Expected Returns</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Market Price per Quintal</span>
                          <span className="font-semibold">{formatCurrency(2200)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Expected Yield</span>
                          <span className="font-semibold">21 Quintals</span>
                        </div>
                        <div className="flex justify-between text-green-600">
                          <span>Gross Revenue</span>
                          <span className="font-semibold">{formatCurrency(selectedCrop.expectedReturn)}</span>
                        </div>
                        <div className="flex justify-between text-green-600 font-bold text-lg">
                          <span>Net Profit</span>
                          <span>{formatCurrency(selectedCrop.expectedReturn - selectedCrop.investment)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="schedule" className="mt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <Card className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Calendar className="w-5 h-5 text-primary" />
                          <span className="font-semibold">Week 1-2</span>
                        </div>
                        <div className="text-sm space-y-1">
                          <div>DAP: 50kg per acre</div>
                          <div>Urea: 25kg per acre</div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Calendar className="w-5 h-5 text-secondary" />
                          <span className="font-semibold">Week 6-8</span>
                        </div>
                        <div className="text-sm space-y-1">
                          <div>Urea: 30kg per acre</div>
                          <div>Potash: 20kg per acre</div>
                        </div>
                      </Card>
                      <Card className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Calendar className="w-5 h-5 text-orange-500" />
                          <span className="font-semibold">Week 10-12</span>
                        </div>
                        <div className="text-sm space-y-1">
                          <div>Urea: 20kg per acre</div>
                          <div>Micronutrients spray</div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="calendar" className="mt-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card className="p-4 border-l-4 border-l-green-500">
                        <div className="flex items-center gap-3 mb-3">
                          <AlertTriangle className="w-5 h-5 text-green-500" />
                          <span className="font-semibold">Preventive Spray</span>
                        </div>
                        <div className="text-sm space-y-2">
                          <div><strong>Week 4:</strong> Fungicide spray for rust prevention</div>
                          <div><strong>Week 8:</strong> Insecticide for aphid control</div>
                          <div><strong>Week 12:</strong> Broad spectrum spray</div>
                        </div>
                      </Card>
                      <Card className="p-4 border-l-4 border-l-orange-500">
                        <div className="flex items-center gap-3 mb-3">
                          <AlertTriangle className="w-5 h-5 text-orange-500" />
                          <span className="font-semibold">Treatment Schedule</span>
                        </div>
                        <div className="text-sm space-y-2">
                          <div><strong>If needed:</strong> Weed control spray at week 6</div>
                          <div><strong>Disease:</strong> Immediate treatment protocol</div>
                          <div><strong>Pest:</strong> Targeted pesticide application</div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}