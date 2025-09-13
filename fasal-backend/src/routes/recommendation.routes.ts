import express from 'express';
import { generateRecommendations, getRecommendationHistory } from '../controllers/recommendation.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/recommendations/generate:
 *   post:
 *     summary: Generate crop recommendations
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pincode
 *               - farm_area_acres
 *               - current_season
 *             properties:
 *               pincode:
 *                 type: string
 *               farm_area_acres:
 *                 type: number
 *               previous_crops:
 *                 type: array
 *                 items:
 *                   type: string
 *               current_season:
 *                 type: string
 *                 enum: [Kharif, Rabi, Zaid]
 *     responses:
 *       200:
 *         description: Recommendations generated successfully
 *       400:
 *         description: Missing required fields
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/generate', authenticateToken, generateRecommendations);

/**
 * @swagger
 * /api/recommendations/history/{userId}:
 *   get:
 *     summary: Get recommendation history for a user
 *     tags: [Recommendations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recommendation history retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.get('/history/:userId', authenticateToken, getRecommendationHistory);

export default router;