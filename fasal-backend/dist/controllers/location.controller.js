"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationByPincode = void 0;
const location_service_1 = require("../services/location.service");
/**
 * Gets location data from pincode
 */
const getLocationByPincode = async (req, res) => {
    try {
        const { pincode } = req.params;
        if (!pincode) {
            return res.status(400).json({ message: 'Pincode is required' });
        }
        const locationData = await (0, location_service_1.getLocationFromPincode)(pincode);
        return res.status(200).json({
            message: 'Location data retrieved successfully',
            location: locationData
        });
    }
    catch (error) {
        console.error('Error getting location data:', error);
        return res.status(500).json({ message: 'Failed to get location data' });
    }
};
exports.getLocationByPincode = getLocationByPincode;
//# sourceMappingURL=location.controller.js.map