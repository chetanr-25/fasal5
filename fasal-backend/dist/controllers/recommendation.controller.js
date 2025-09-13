"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRecommendationHistory = exports.generateRecommendations = void 0;
const index_1 = require("../index");
const weather_service_1 = require("../services/weather.service");
const soil_service_1 = require("../services/soil.service");
const crop_service_1 = require("../services/crop.service");
/**
 * Generates crop recommendations based on user's location and other factors
 */
const generateRecommendations = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { pincode, farm_area_acres, previous_crops, current_season } = req.body;
        // Validate input
        if (!pincode || !farm_area_acres || !current_season) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        // Get user data
        const user = await index_1.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Get weather data
        const weatherData = await (0, weather_service_1.getWeatherByPincode)(pincode);
        const avgTemp = weatherData.current_temp;
        const rainfall = weatherData.rainfall;
        // Get soil data
        const soilData = await (0, soil_service_1.getSoilDataByPincode)(pincode);
        // Get crop recommendations
        const recommendedCrops = await (0, crop_service_1.recommendCrops)(pincode, farm_area_acres, previous_crops || [], current_season);
        // Extract crop names for storage
        const recommendedCropNames = recommendedCrops.map(crop => crop.name_en);
        // Calculate confidence score based on data quality
        const confidenceScore = calculateConfidenceScore(weatherData, soilData);
        // Generate reasoning
        const reasoning = generateReasoning(recommendedCrops, weatherData, soilData, current_season);
        // Save recommendation to database
        const recommendation = await index_1.prisma.recommendation.create({
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
    }
    catch (error) {
        console.error('Error generating recommendations:', error);
        return res.status(500).json({ message: 'Failed to generate recommendations' });
    }
};
exports.generateRecommendations = generateRecommendations;
/**
 * Gets recommendation history for a user
 */
const getRecommendationHistory = async (req, res) => {
    try {
        const { userId } = req.params;
        const requestingUserId = req.user?.userId;
        // Ensure user can only access their own recommendations
        if (userId !== requestingUserId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const recommendations = await index_1.prisma.recommendation.findMany({
            where: { user_id: userId },
            orderBy: { recommendation_date: 'desc' }
        });
        return res.status(200).json({
            message: 'Recommendation history retrieved successfully',
            recommendations
        });
    }
    catch (error) {
        console.error('Error getting recommendation history:', error);
        return res.status(500).json({ message: 'Failed to get recommendation history' });
    }
};
exports.getRecommendationHistory = getRecommendationHistory;
/**
 * Calculates a confidence score based on data quality
 */
const calculateConfidenceScore = (weatherData, soilData) => {
    // This is a simplified implementation
    // In a production environment, this would be more sophisticated
    let score = 0.7; // Base score
    // Adjust based on weather data recency
    const hoursSinceWeatherUpdate = (Date.now() - new Date(weatherData.last_updated).getTime()) / (1000 * 60 * 60);
    if (hoursSinceWeatherUpdate < 3) {
        score += 0.1;
    }
    else if (hoursSinceWeatherUpdate > 24) {
        score -= 0.1;
    }
    // Adjust based on soil data completeness
    if (soilData.ph_level && soilData.nitrogen && soilData.phosphorus && soilData.potassium) {
        score += 0.1;
    }
    else {
        score -= 0.1;
    }
    // Ensure score is between 0 and 1
    return Math.min(Math.max(score, 0), 1);
};
/**
 * Generates reasoning for crop recommendations
 */
const generateReasoning = (recommendedCrops, weatherData, soilData, season) => {
    // This is a simplified implementation
    // In a production environment, this would be more sophisticated
    const topCrop = recommendedCrops[0];
    return `Based on your location's current weather conditions (${weatherData.current_temp}°C, ${weatherData.weather_condition}), 
  soil characteristics (pH ${soilData.ph_level}, ${soilData.soil_type}), and the current ${season} season, 
  ${topCrop.name_en} is recommended as the most suitable crop. It has an estimated ROI of ${topCrop.roi}% 
  and current market price of ₹${topCrop.current_market_price} per unit. The soil pH range of ${topCrop.soil_ph_min}-${topCrop.soil_ph_max} 
  is compatible with your soil's pH of ${soilData.ph_level}.`;
};
//# sourceMappingURL=recommendation.controller.js.map