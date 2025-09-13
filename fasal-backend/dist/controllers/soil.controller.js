"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSoilDataByPincodeController = void 0;
const soil_service_1 = require("../services/soil.service");
const location_service_1 = require("../services/location.service");
/**
 * Gets soil data for a specific pincode
 */
const getSoilDataByPincodeController = async (req, res) => {
    try {
        const { pincode } = req.params;
        if (!pincode) {
            return res.status(400).json({ message: 'Pincode is required' });
        }
        // First get location data to ensure pincode is valid
        const locationData = await (0, location_service_1.getLocationFromPincode)(pincode);
        if (!locationData) {
            return res.status(404).json({ message: 'Location not found for the provided pincode' });
        }
        const soilData = await (0, soil_service_1.getSoilDataByPincode)(pincode);
        return res.status(200).json({
            message: 'Soil data retrieved successfully',
            soil: soilData
        });
    }
    catch (error) {
        console.error('Error getting soil data:', error);
        return res.status(500).json({ message: 'Failed to get soil data' });
    }
};
exports.getSoilDataByPincodeController = getSoilDataByPincodeController;
//# sourceMappingURL=soil.controller.js.map