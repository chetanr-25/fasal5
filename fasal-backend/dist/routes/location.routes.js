"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const location_controller_1 = require("../controllers/location.controller");
const router = express_1.default.Router();
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
router.get('/pincode/:pincode', location_controller_1.getLocationByPincode);
exports.default = router;
//# sourceMappingURL=location.routes.js.map