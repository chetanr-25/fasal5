import { Request, Response } from 'express';
import { prisma } from '../index';
import { getWeatherByPincode } from '../services/weather.service';
import { getSoilDataByPincode } from '../services/soil.service';
import { recommendCrops } from '../services/crop.service';

interface RecommendationInput {
  pincode: string;
  farm_area_acres: number;
  previous_crops: string[];
  current_season: string;
}

/**
 * Generates crop recommendations based on user's location and other factors
 */
export const generateRecommendations = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { pincode, farm_area_acres, previous_crops, current_season }: RecommendationInput = req.body;

    // Validate input
    if (!pincode || !farm_area_acres || !current_season) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Get user data
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Get weather data
    const weatherData = await getWeatherByPincode(pincode);
    const avgTemp = weatherData.current_temp;
    const rainfall = weatherData.rainfall;

    // Get soil data
    const soilData = await getSoilDataByPincode(pincode);

    // Get crop recommendations
    const recommendedCrops = await recommendCrops(
      pincode,
      farm_area_acres,
      previous_crops || [],
      current_season
    );

    // Extract crop names for storage
    const recommendedCropNames = recommendedCrops.map(crop => crop.name_en);

    // Calculate confidence score based on data quality
    const confidenceScore = calculateConfidenceScore(weatherData, soilData);

    // Generate reasoning
    const reasoning = generateReasoning(recommendedCrops, weatherData, soilData, current_season);

    // Save recommendation to database
    const recommendation = await prisma.recommendation.create({
      data: {
        user_id: userId,
        recommended_crops: recommendedCropNames,
        confidence_score: confidenceScore,
        reasoning: reasoning
      }
    });

    return res.status(200).json({
      message: 'Recommendations generated successfully',
      recommendation: {
        id: recommendation.id,
        recommended_crops: recommendedCrops,
        confidence_score: confidenceScore,
        reasoning: reasoning,
        recommendation_date: recommendation.recommendation_date
      }
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return res.status(500).json({ message: 'Failed to generate recommendations' });
  }
};

/**
 * Gets recommendation history for a user
 */
export const getRecommendationHistory = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const requestingUserId = req.user?.userId;

    // Ensure user can only access their own recommendations
    if (userId !== requestingUserId) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const recommendations = await prisma.recommendation.findMany({
      where: { user_id: userId },
      orderBy: { recommendation_date: 'desc' }
    });

    return res.status(200).json({
      message: 'Recommendation history retrieved successfully',
      recommendations
    });
  } catch (error) {
    console.error('Error getting recommendation history:', error);
    return res.status(500).json({ message: 'Failed to get recommendation history' });
  }
};

/**
 * Calculates a confidence score based on data quality
 */
const calculateConfidenceScore = (weatherData: any, soilData: any): number => {
  // This is a simplified implementation
  // In a production environment, this would be more sophisticated
  
  let score = 0.7; // Base score
  
  // Adjust based on weather data recency
  const hoursSinceWeatherUpdate = (Date.now() - new Date(weatherData.last_updated).getTime()) / (1000 * 60 * 60);
  if (hoursSinceWeatherUpdate < 3) {
    score += 0.1;
  } else if (hoursSinceWeatherUpdate > 24) {
    score -= 0.1;
  }
  
  // Adjust based on soil data completeness
  if (soilData.ph_level && soilData.nitrogen && soilData.phosphorus && soilData.potassium) {
    score += 0.1;
  } else {
    score -= 0.1;
  }
  
  // Ensure score is between 0 and 1
  return Math.min(Math.max(score, 0), 1);
};

/**
 * Generates reasoning for crop recommendations
 */
const generateReasoning = (recommendedCrops: any[], weatherData: any, soilData: any, season: string): string => {
  // This is a simplified implementation
  // In a production environment, this would be more sophisticated
  
  const topCrop = recommendedCrops[0];
  
  return `Based on your location's current weather conditions (${weatherData.current_temp}°C, ${weatherData.weather_condition}), 
  soil characteristics (pH ${soilData.ph_level}, ${soilData.soil_type}), and the current ${season} season, 
  ${topCrop.name_en} is recommended as the most suitable crop. It has an estimated ROI of ${topCrop.roi}% 
  and current market price of ₹${topCrop.current_market_price} per unit. The soil pH range of ${topCrop.soil_ph_min}-${topCrop.soil_ph_max} 
  is compatible with your soil's pH of ${soilData.ph_level}.`;
};