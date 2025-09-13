import express from 'express';
import { getAllCrops, getCropById, getSuitableCrops } from '../controllers/crop.controller';

const router = express.Router();

/**
 * @swagger
 * /api/crops:
 *   get:
 *     summary: Get all crops
 *     tags: [Crops]
 *     responses:
 *       200:
 *         description: Crops retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/', getAllCrops);

/**
 * @swagger
 * /api/crops/{id}:
 *   get:
 *     summary: Get a specific crop by ID
 *     tags: [Crops]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Crop retrieved successfully
 *       404:
 *         description: Crop not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getCropById);

/**
 * @swagger
 * /api/crops/suitable/{pincode}:
 *   get:
 *     summary: Get suitable crops for a specific location
 *     tags: [Crops]
 *     parameters:
 *       - in: path
 *         name: pincode
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: season
 *         required: false
 *         schema:
 *           type: string
 *           enum: [Kharif, Rabi, Zaid]
 *     responses:
 *       200:
 *         description: Suitable crops retrieved successfully
 *       400:
 *         description: Pincode is required
 *       404:
 *         description: Environmental data not found for the provided pincode
 *       500:
 *         description: Server error
 */
router.get('/suitable/:pincode', getSuitableCrops);

export default router;