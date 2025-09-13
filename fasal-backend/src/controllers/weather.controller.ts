import { Request, Response } from 'express';
import { getWeatherByPincode } from '../services/weather.service';
import { getLocationFromPincode } from '../services/location.service';

/**
 * Gets weather data for a specific pincode
 */
export const getWeatherByPincodeController = async (req: Request, res: Response) => {
  try {
    const { pincode } = req.params;

    if (!pincode) {
      return res.status(400).json({ message: 'Pincode is required' });
    }

    // First get location data to ensure pincode is valid
    const locationData = await getLocationFromPincode(pincode);
    if (!locationData) {
      return res.status(404).json({ message: 'Location not found for the provided pincode' });
    }

    const weatherData = await getWeatherByPincode(pincode);

    return res.status(200).json({
      message: 'Weather data retrieved successfully',
      weather: weatherData
    });
  } catch (error) {
    console.error('Error getting weather data:', error);
    return res.status(500).json({ message: 'Failed to get weather data' });
  }
};