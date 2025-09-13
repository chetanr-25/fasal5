import { Request, Response } from 'express';
import { getSoilDataByPincode } from '../services/soil.service';
import { getLocationFromPincode } from '../services/location.service';

/**
 * Gets soil data for a specific pincode
 */
export const getSoilDataByPincodeController = async (req: Request, res: Response) => {
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

    const soilData = await getSoilDataByPincode(pincode);

    return res.status(200).json({
      message: 'Soil data retrieved successfully',
      soil: soilData
    });
  } catch (error) {
    console.error('Error getting soil data:', error);
    return res.status(500).json({ message: 'Failed to get soil data' });
  }
};