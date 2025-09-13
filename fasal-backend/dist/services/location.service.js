"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinatesFromLocation = exports.getLocationFromPincode = void 0;
const axios_1 = __importDefault(require("axios"));
const api_config_1 = require("../config/api.config");
/**
 * Fetches location data from pincode using primary API
 * Falls back to backup API if primary fails
 */
const getLocationFromPincode = async (pincode) => {
    try {
        // Try primary API first
        const primaryResponse = await axios_1.default.get(`${api_config_1.apiConfig.location.primary}${pincode}`);
        if (primaryResponse.data && primaryResponse.data[0]?.Status === 'Success') {
            const postOffice = primaryResponse.data[0]?.PostOffice[0];
            if (postOffice) {
                return {
                    pincode,
                    location_name: postOffice.Name,
                    district: postOffice.District,
                    state: postOffice.State
                };
            }
        }
        // If primary API fails, try backup API
        const backupResponse = await axios_1.default.get(`${api_config_1.apiConfig.location.backup}${pincode}`);
        if (backupResponse.data && backupResponse.data.status === 'success') {
            const location = backupResponse.data.data;
            return {
                pincode,
                location_name: location.officeName || location.divisionName,
                district: location.districtName,
                state: location.stateName
            };
        }
        // If both APIs fail, throw error
        throw new Error('Failed to fetch location data from both APIs');
    }
    catch (error) {
        console.error('Error fetching location data:', error);
        throw new Error('Failed to fetch location data');
    }
};
exports.getLocationFromPincode = getLocationFromPincode;
/**
 * Gets approximate coordinates (latitude and longitude) for a location
 * This is a simplified implementation - in a production environment,
 * you would use a more accurate geocoding service
 */
const getCoordinatesFromLocation = async (location, district, state) => {
    try {
        // This is a placeholder for a geocoding service
        // In a real implementation, you would use a service like Google Maps Geocoding API
        // For now, we'll return dummy coordinates based on the location string
        // In production, replace with actual geocoding API call:
        // const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(`${location}, ${district}, ${state}, India`)}&key=${process.env.GOOGLE_MAPS_API_KEY}`);
        // const { lat, lng } = response.data.results[0].geometry.location;
        // For demonstration purposes only - replace with actual geocoding in production
        const dummyCoordinates = {
            lat: 20.5937 + Math.random() * 10, // Random coordinates within India
            lon: 78.9629 + Math.random() * 10
        };
        return dummyCoordinates;
    }
    catch (error) {
        console.error('Error getting coordinates:', error);
        // Default to central India coordinates if geocoding fails
        return { lat: 20.5937, lon: 78.9629 };
    }
};
exports.getCoordinatesFromLocation = getCoordinatesFromLocation;
//# sourceMappingURL=location.service.js.map