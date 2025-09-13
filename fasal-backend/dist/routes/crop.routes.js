"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const crop_controller_1 = require("../controllers/crop.controller");
const router = express_1.default.Router();
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
router.get('/', crop_controller_1.getAllCrops);
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
router.get('/:id', crop_controller_1.getCropById);
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
router.get('/suitable/:pincode', crop_controller_1.getSuitableCrops);
exports.default = router;
//# sourceMappingURL=crop.routes.js.map