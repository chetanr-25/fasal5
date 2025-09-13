import express from 'express';
import { getMarketPriceController } from '../controllers/market.controller';

const router = express.Router();

/**
 * @swagger
 * /api/market/{cropName}:
 *   get:
 *     summary: Get market price data for a specific crop
 *     tags: [Market]
 *     parameters:
 *       - in: path
 *         name: cropName
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: state
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: district
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Market price data retrieved successfully
 *       400:
 *         description: Crop name is required
 *       500:
 *         description: Server error
 */
router.get('/:cropName', getMarketPriceController);

export default router;