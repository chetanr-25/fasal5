import express from 'express';
import { getSoilDataByPincodeController } from '../controllers/soil.controller';

const router = express.Router();

/**
 * @swagger
 * /api/soil/{pincode}:
 *   get:
 *     summary: Get soil data for a specific pincode
 *     tags: [Soil]
 *     parameters:
 *       - in: path
 *         name: pincode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Soil data retrieved successfully
 *       400:
 *         description: Pincode is required
 *       404:
 *         description: Location not found for the provided pincode
 *       500:
 *         description: Server error
 */
router.get('/:pincode', getSoilDataByPincodeController);

export default router;