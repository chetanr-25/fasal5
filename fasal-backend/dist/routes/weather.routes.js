"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const weather_controller_1 = require("../controllers/weather.controller");
const router = express_1.default.Router();
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
router.get('/:pincode', weather_controller_1.getWeatherByPincodeController);
exports.default = router;
//# sourceMappingURL=weather.routes.js.map