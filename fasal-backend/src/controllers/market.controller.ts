import { Request, Response } from 'express';
import { getMarketPriceForCrop } from '../services/market.service';

/**
 * Gets market price data for a specific crop
 */
export const getMarketPriceController = async (req: Request, res: Response) => {
  try {
    const { cropName } = req.params;
    const { state, district } = req.query;

    if (!cropName) {
      return res.status(400).json({ message: 'Crop name is required' });
    }

    const marketData = await getMarketPriceForCrop(
      cropName, 
      state as string | undefined, 
      district as string | undefined
    );

    return res.status(200).json({
      message: 'Market price data retrieved successfully',
      market: marketData
    });
  } catch (error) {
    console.error('Error getting market price data:', error);
    return res.status(500).json({ message: 'Failed to get market price data' });
  }
};