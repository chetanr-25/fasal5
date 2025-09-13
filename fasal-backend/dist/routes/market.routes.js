"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const market_controller_1 = require("../controllers/market.controller");
const router = express_1.default.Router();
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
router.get('/:cropName', market_controller_1.getMarketPriceController);
exports.default = router;
//# sourceMappingURL=market.routes.js.map