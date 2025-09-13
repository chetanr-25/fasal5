-- Create users table for farmer profiles
CREATE TABLE public.users (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    pincode VARCHAR(6) NOT NULL,
    location_name TEXT,
    district TEXT,
    state TEXT,
    farm_area_acres DECIMAL(10,2),
    farm_area_hectares DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create crops master table
CREATE TABLE public.crops (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name_en TEXT NOT NULL,
    name_hi TEXT NOT NULL,
    season TEXT NOT NULL CHECK (season IN ('kharif', 'rabi', 'zaid')),
    soil_ph_min DECIMAL(3,1),
    soil_ph_max DECIMAL(3,1),
    temperature_min INTEGER,
    temperature_max INTEGER,
    rainfall_min INTEGER,
    rainfall_max INTEGER,
    investment_per_acre DECIMAL(10,2),
    expected_yield_per_acre DECIMAL(8,2),
    current_market_price DECIMAL(8,2),
    roi_percentage DECIMAL(5,2),
    growing_states TEXT[],
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user cultivation history
CREATE TABLE public.user_crops (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    crop_id UUID REFERENCES public.crops(id) ON DELETE CASCADE,
    cultivation_year INTEGER NOT NULL,
    cultivation_season TEXT NOT NULL,
    yield_achieved DECIMAL(8,2),
    profit_earned DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create soil data table
CREATE TABLE public.soil_data (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    pincode VARCHAR(6),
    district TEXT NOT NULL,
    state TEXT NOT NULL,
    ph_level DECIMAL(3,1),
    nitrogen DECIMAL(5,2),
    phosphorus DECIMAL(5,2),
    potassium DECIMAL(5,2),
    organic_matter DECIMAL(5,2),
    moisture_content DECIMAL(5,2),
    soil_type TEXT,
    last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(pincode)
);

-- Create weather data cache table
CREATE TABLE public.weather_data (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    pincode VARCHAR(6) NOT NULL,
    location_name TEXT,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    current_temp DECIMAL(5,2),
    humidity DECIMAL(5,2),
    rainfall DECIMAL(8,2),
    wind_speed DECIMAL(5,2),
    weather_condition TEXT,
    forecast_7day JSONB,
    last_updated TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(pincode)
);

-- Create fertilizers schedule table
CREATE TABLE public.fertilizers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    crop_id UUID REFERENCES public.crops(id) ON DELETE CASCADE,
    fertilizer_name TEXT NOT NULL,
    application_stage TEXT NOT NULL,
    quantity_per_acre TEXT NOT NULL,
    frequency_days INTEGER,
    cost_per_kg DECIMAL(8,2),
    application_method TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create pesticides schedule table
CREATE TABLE public.pesticides (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    crop_id UUID REFERENCES public.crops(id) ON DELETE CASCADE,
    pest_disease_name TEXT NOT NULL,
    pesticide_name TEXT NOT NULL,
    application_timing TEXT,
    spray_frequency TEXT,
    cost_per_liter DECIMAL(8,2),
    safety_precautions TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create market prices table
CREATE TABLE public.market_prices (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    crop_name TEXT NOT NULL,
    mandi_location TEXT,
    state TEXT,
    min_price DECIMAL(8,2),
    max_price DECIMAL(8,2),
    modal_price DECIMAL(8,2),
    arrival_quantity DECIMAL(10,2),
    price_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create recommendations table
CREATE TABLE public.recommendations (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    recommended_crops JSONB NOT NULL,
    recommendation_date DATE NOT NULL DEFAULT CURRENT_DATE,
    confidence_score DECIMAL(5,2),
    reasoning TEXT,
    pincode VARCHAR(6),
    season TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_crops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recommendations ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view their own profile" 
ON public.users FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own profile" 
ON public.users FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.users FOR UPDATE 
USING (auth.uid() = user_id);

-- Create RLS policies for user_crops
CREATE POLICY "Users can view their own cultivation history" 
ON public.user_crops FOR SELECT 
USING (auth.uid() = (SELECT user_id FROM public.users WHERE id = user_crops.user_id));

CREATE POLICY "Users can create their own cultivation records" 
ON public.user_crops FOR INSERT 
WITH CHECK (auth.uid() = (SELECT user_id FROM public.users WHERE id = user_crops.user_id));

-- Create RLS policies for recommendations
CREATE POLICY "Users can view their own recommendations" 
ON public.recommendations FOR SELECT 
USING (auth.uid() = (SELECT user_id FROM public.users WHERE id = recommendations.user_id));

CREATE POLICY "Users can create their own recommendations" 
ON public.recommendations FOR INSERT 
WITH CHECK (auth.uid() = (SELECT user_id FROM public.users WHERE id = recommendations.user_id));

-- Public read access for reference tables
CREATE POLICY "Anyone can view crops" ON public.crops FOR SELECT USING (true);
CREATE POLICY "Anyone can view soil data" ON public.soil_data FOR SELECT USING (true);
CREATE POLICY "Anyone can view weather data" ON public.weather_data FOR SELECT USING (true);
CREATE POLICY "Anyone can view fertilizers" ON public.fertilizers FOR SELECT USING (true);
CREATE POLICY "Anyone can view pesticides" ON public.pesticides FOR SELECT USING (true);
CREATE POLICY "Anyone can view market prices" ON public.market_prices FOR SELECT USING (true);

-- Create indexes for performance
CREATE INDEX idx_users_pincode ON public.users(pincode);
CREATE INDEX idx_users_user_id ON public.users(user_id);
CREATE INDEX idx_crops_season ON public.crops(season);
CREATE INDEX idx_soil_data_pincode ON public.soil_data(pincode);
CREATE INDEX idx_weather_data_pincode ON public.weather_data(pincode);
CREATE INDEX idx_market_prices_crop_date ON public.market_prices(crop_name, price_date);
CREATE INDEX idx_recommendations_user_date ON public.recommendations(user_id, recommendation_date);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();