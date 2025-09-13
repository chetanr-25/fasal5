"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recommendation_controller_1 = require("../controllers/recommendation.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
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
router.post('/generate', auth_middleware_1.authenticateToken, recommendation_controller_1.generateRecommendations);
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
router.get('/history/:userId', auth_middleware_1.authenticateToken, recommendation_controller_1.getRecommendationHistory);
exports.default = router;
//# sourceMappingURL=recommendation.routes.js.map