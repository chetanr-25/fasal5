import express from 'express';
import { getWeatherByPincodeController } from '../controllers/weather.controller';

const router = express.Router();

/**
 * @swagger
 * /api/weather/{pincode}:
 *   get:
 *     summary: Get weather data for a specific pincode
 *     tags: [Weather]
 *     parameters:
 *       - in: path
 *         name: pincode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Weather data retrieved successfully
 *       400:
 *         description: Pincode is required
 *       404:
 *         description: Location not found for the provided pincode
 *       500:
 *         description: Server error
 */
router.get('/:pincode', getWeatherByPincodeController);

export default router;