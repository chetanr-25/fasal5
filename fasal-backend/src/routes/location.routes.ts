import express from 'express';
import { getLocationByPincode } from '../controllers/location.controller';

const router = express.Router();

/**
 * @swagger
 * /api/location/pincode/{pincode}:
 *   get:
 *     summary: Get location data from pincode
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: pincode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Location data retrieved successfully
 *       400:
 *         description: Pincode is required
 *       500:
 *         description: Server error
 */
router.get('/pincode/:pincode', getLocationByPincode);

export default router;