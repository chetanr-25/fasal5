"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const soil_controller_1 = require("../controllers/soil.controller");
const router = express_1.default.Router();
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
router.get('/:pincode', soil_controller_1.getSoilDataByPincodeController);
exports.default = router;
//# sourceMappingURL=soil.routes.js.map