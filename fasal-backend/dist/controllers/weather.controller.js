"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherByPincodeController = void 0;
const weather_service_1 = require("../services/weather.service");
const location_service_1 = require("../services/location.service");
/**
 * Gets weather data for a specific pincode
 */
const getWeatherByPincodeController = async (req, res) => {
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
        const weatherData = await (0, weather_service_1.getWeatherByPincode)(pincode);
        return res.status(200).json({
            message: 'Weather data retrieved successfully',
            weather: weatherData
        });
    }
    catch (error) {
        console.error('Error getting weather data:', error);
        return res.status(500).json({ message: 'Failed to get weather data' });
    }
};
exports.getWeatherByPincodeController = getWeatherByPincodeController;
//# sourceMappingURL=weather.controller.js.map