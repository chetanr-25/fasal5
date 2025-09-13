"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSuitableCrops = exports.getCropById = exports.getAllCrops = void 0;
const client_1 = require("@prisma/client");
const crop_service_1 = require("../services/crop.service");
const weather_service_1 = require("../services/weather.service");
const soil_service_1 = require("../services/soil.service");
const prisma = new client_1.PrismaClient();
/**
 * Gets all crops from the database
 */
const getAllCrops = async (req, res) => {
    try {
        const crops = await prisma.crop.findMany();
        return res.status(200).json({
            message: 'Crops retrieved successfully',
            crops
        });
    }
    catch (error) {
        console.error('Error getting crops:', error);
        return res.status(500).json({ message: 'Failed to get crops' });
    }
};
exports.getAllCrops = getAllCrops;
/**
 * Gets a specific crop by ID
 */
const getCropById = async (req, res) => {
    try {
        const { id } = req.params;
        const crop = await prisma.crop.findUnique({
            where: { id }
        });
        if (!crop) {
            return res.status(404).json({ message: 'Crop not found' });
        }
        return res.status(200).json({
            message: 'Crop retrieved successfully',
            crop
        });
    }
    catch (error) {
        console.error('Error getting crop:', error);
        return res.status(500).json({ message: 'Failed to get crop' });
    }
};
exports.getCropById = getCropById;
/**
 * Gets suitable crops for a specific location
 */
const getSuitableCrops = async (req, res) => {
    try {
        const { pincode } = req.params;
        const { season } = req.query;
        if (!pincode) {
            return res.status(400).json({ message: 'Pincode is required' });
        }
        // Get environmental conditions for the location
        const weatherData = await (0, weather_service_1.getWeatherByPincode)(pincode);
        const soilData = await (0, soil_service_1.getSoilDataByPincode)(pincode);
        if (!weatherData || !soilData) {
            return res.status(404).json({ message: 'Environmental data not found for the provided pincode' });
        }
        // Get all crops from database
        const allCrops = await prisma.crop.findMany();
        // Filter crops based on environmental conditions
        const conditions = {
            soilPh: soilData.ph_level,
            temperature: weatherData.temperature,
            rainfall: weatherData.rainfall,
            season: season || 'Kharif' // Default to Kharif if not specified
        };
        const filteredCrops = await (0, crop_service_1.filterCropsByConditions)(conditions);
        // Rank crops by score
        const rankedCrops = (0, crop_service_1.rankCropsByScore)(filteredCrops);
        return res.status(200).json({
            message: 'Suitable crops retrieved successfully',
            crops: rankedCrops
        });
    }
    catch (error) {
        console.error('Error getting suitable crops:', error);
        return res.status(500).json({ message: 'Failed to get suitable crops' });
    }
};
exports.getSuitableCrops = getSuitableCrops;
//# sourceMappingURL=crop.controller.js.map