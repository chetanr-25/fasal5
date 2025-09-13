import { Request, Response } from 'express';
import { getLocationFromPincode } from '../services/location.service';

/**
 * Gets location data from pincode
 */
export const getLocationByPincode = async (req: Request, res: Response) => {
  try {
    const { pincode } = req.params;

    if (!pincode) {
      return res.status(400).json({ message: 'Pincode is required' });
    }

    const locationData = await getLocationFromPincode(pincode);

    return res.status(200).json({
      message: 'Location data retrieved successfully',
      location: locationData
    });
  } catch (error) {
    console.error('Error getting location data:', error);
    return res.status(500).json({ message: 'Failed to get location data' });
  }
};