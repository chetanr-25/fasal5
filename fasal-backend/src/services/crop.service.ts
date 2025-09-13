import { prisma } from '../index';
import { getCurrentMarketPrice } from './market.service';

interface CropConditions {
  soilPh: number;
  temperature: number;
  rainfall: number;
  season: string;
}

interface ROIParams {
  investment: number;
  expectedYield: number;
  currentPrice: number;
}

/**
 * Filters crops based on environmental conditions
 */
export const filterCropsByConditions = async (conditions: CropConditions): Promise<any[]> => {
  try {
    const { soilPh, temperature, rainfall, season } = conditions;
    
    // Query database for suitable crops
    const suitableCrops = await prisma.crop.findMany({
      where: {
        soil_ph_min: { lte: soilPh },
        soil_ph_max: { gte: soilPh },
        temperature_min: { lte: temperature },
        temperature_max: { gte: temperature },
        rainfall_min: { lte: rainfall },
        rainfall_max: { gte: rainfall },
        season: season
      },
      include: {
        fertilizers: true,
        pesticides: true
      }
    });
    
    return suitableCrops;
  } catch (error) {
    console.error('Error filtering crops by conditions:', error);
    throw new Error('Failed to filter crops by conditions');
  }
};

/**
 * Applies crop rotation logic to filter out unsuitable crops
 */
export const applyCropRotationFilter = (suitableCrops: any[], previousCrops: string[]): any[] => {
  if (!previousCrops || previousCrops.length === 0) {
    return suitableCrops;
  }
  
  // Simple crop rotation logic - avoid planting the same crop consecutively
  // In a production environment, this would be more sophisticated
  return suitableCrops.filter(crop => {
    return !previousCrops.includes(crop.name_en) && !previousCrops.includes(crop.name_hi);
  });
};

/**
 * Calculates Return on Investment (ROI) for a crop
 */
export const calculateROI = (params: ROIParams): number => {
  const { investment, expectedYield, currentPrice } = params;
  
  const revenue = expectedYield * currentPrice;
  const profit = revenue - investment;
  const roi = (profit / investment) * 100;
  
  return Math.round(roi * 100) / 100; // Round to 2 decimal places
};

/**
 * Ranks crops by a combined score of profitability and suitability
 */
export const rankCropsByScore = (crops: any[]): any[] => {
  // Calculate a combined score for each crop
  const scoredCrops = crops.map(crop => {
    // Normalize ROI to a 0-100 scale
    const roiScore = Math.min(Math.max(crop.roi, 0), 100);
    
    // Combined score (70% ROI, 30% current market price)
    const combinedScore = (roiScore * 0.7) + (crop.current_market_price / 100 * 0.3);
    
    return {
      ...crop,
      score: combinedScore
    };
  });
  
  // Sort by score in descending order
  return scoredCrops.sort((a, b) => b.score - a.score);
};

/**
 * Recommends crops based on user's location, farm area, and other factors
 */
export const recommendCrops = async (
  pincode: string,
  farmArea: number,
  previousCrops: string[],
  currentSeason: string
): Promise<any[]> => {
  try {
    // Step 1: Get location data from pincode
    // This is handled in the controller by getting the user's location data
    
    // Step 2: Fetch real-time weather data
    // This is handled in the controller by getting weather data
    
    // Step 3: Get soil data for district
    // This is handled in the controller by getting soil data
    
    // The controller will pass these values to this function:
    const weatherData = { avgTemp: 25, rainfall: 800 }; // Placeholder
    const soilData = { ph: 6.5 }; // Placeholder
    
    // Step 4: Filter crops by environmental suitability
    const suitableCrops = await filterCropsByConditions({
      soilPh: soilData.ph,
      temperature: weatherData.avgTemp,
      rainfall: weatherData.rainfall,
      season: currentSeason
    });
    
    // Step 5: Apply crop rotation logic
    const rotatedCrops = applyCropRotationFilter(suitableCrops, previousCrops);
    
    // Step 6: Calculate ROI and market viability
    const cropsWithROI = await Promise.all(rotatedCrops.map(async (crop) => {
      const currentPrice = await getCurrentMarketPrice(crop.name_en);
      
      const roi = calculateROI({
        investment: crop.investment_per_acre * farmArea,
        expectedYield: crop.expected_yield_per_acre * farmArea,
        currentPrice: currentPrice
      });
      
      return {
        ...crop,
        roi,
        current_market_price: currentPrice
      };
    }));
    
    // Step 7: Rank by profitability and suitability
    const rankedCrops = rankCropsByScore(cropsWithROI).slice(0, 5);
    
    return rankedCrops;
  } catch (error) {
    console.error('Error in recommendCrops:', error);
    throw new Error('Failed to recommend crops');
  }
};