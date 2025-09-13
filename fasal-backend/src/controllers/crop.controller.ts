import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { filterCropsByConditions, rankCropsByScore } from '../services/crop.service';
import { getWeatherByPincode } from '../services/weather.service';
import { getSoilDataByPincode } from '../services/soil.service';

const prisma = new PrismaClient();

/**
 * Gets all crops from the database
 */
export const getAllCrops = async (req: Request, res: Response) => {
  try {
    const crops = await prisma.crop.findMany();
    return res.status(200).json({
      message: 'Crops retrieved successfully',
      crops
    });
  } catch (error) {
    console.error('Error getting crops:', error);
    return res.status(500).json({ message: 'Failed to get crops' });
  }
};

/**
 * Gets a specific crop by ID
 */
export const getCropById = async (req: Request, res: Response) => {
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
  } catch (error) {
    console.error('Error getting crop:', error);
    return res.status(500).json({ message: 'Failed to get crop' });
  }
};

/**
 * Gets suitable crops for a specific location
 */
export const getSuitableCrops = async (req: Request, res: Response) => {
  try {
    const { pincode } = req.params;
    const { season } = req.query;
    
    if (!pincode) {
      return res.status(400).json({ message: 'Pincode is required' });
    }
    
    // Get environmental conditions for the location
    const weatherData = await getWeatherByPincode(pincode);
    const soilData = await getSoilDataByPincode(pincode);
    
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
      season: season as string || 'Kharif' // Default to Kharif if not specified
    };
    
    const filteredCrops = await filterCropsByConditions(conditions);
    
    // Rank crops by score
    const rankedCrops = rankCropsByScore(filteredCrops);
    
    return res.status(200).json({
      message: 'Suitable crops retrieved successfully',
      crops: rankedCrops
    });
  } catch (error) {
    console.error('Error getting suitable crops:', error);
    return res.status(500).json({ message: 'Failed to get suitable crops' });
  }
};