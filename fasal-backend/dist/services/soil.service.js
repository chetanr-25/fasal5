"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSoilDataByPincode = exports.getSoilDataByDistrict = void 0;
const index_1 = require("../index");
const location_service_1 = require("./location.service");
// Fallback soil data by district mapping
const districtSoilMap = {
    // This is a simplified mapping for demonstration
    // In a production environment, this would be a comprehensive database
    'Pune': {
        ph_level: 6.8,
        nitrogen: 280,
        phosphorus: 25,
        potassium: 190,
        organic_matter: 1.2,
        moisture_content: 35,
        soil_type: 'Black Cotton Soil'
    },
    'Delhi': {
        ph_level: 7.5,
        nitrogen: 240,
        phosphorus: 22,
        potassium: 170,
        organic_matter: 0.8,
        moisture_content: 28,
        soil_type: 'Alluvial Soil'
    },
    'Chennai': {
        ph_level: 6.2,
        nitrogen: 260,
        phosphorus: 18,
        potassium: 210,
        organic_matter: 1.0,
        moisture_content: 40,
        soil_type: 'Red Soil'
    },
    // Add more districts as needed
};
// State-based soil type mapping as fallback
const stateSoilMap = {
    'Maharashtra': {
        ph_level: 6.5,
        nitrogen: 250,
        phosphorus: 20,
        potassium: 180,
        organic_matter: 1.1,
        moisture_content: 32,
        soil_type: 'Black Soil'
    },
    'Punjab': {
        ph_level: 7.8,
        nitrogen: 320,
        phosphorus: 28,
        potassium: 220,
        organic_matter: 1.5,
        moisture_content: 38,
        soil_type: 'Alluvial Soil'
    },
    'Tamil Nadu': {
        ph_level: 6.0,
        nitrogen: 230,
        phosphorus: 15,
        potassium: 200,
        organic_matter: 0.9,
        moisture_content: 42,
        soil_type: 'Red Laterite Soil'
    },
    // Add more states as needed
};
// Default soil data if no mapping is found
const defaultSoilData = {
    ph_level: 6.5,
    nitrogen: 250,
    phosphorus: 20,
    potassium: 180,
    organic_matter: 1.0,
    moisture_content: 35,
    soil_type: 'Mixed Soil'
};
/**
 * Gets soil data for a district
 * In a production environment, this would call actual soil data APIs
 */
const getSoilDataByDistrict = async (district, state) => {
    try {
        // In a real implementation, you would fetch data from ISRO Bhuvan or other sources
        // For now, we'll use our fallback mapping
        // Try to get soil data by district
        if (districtSoilMap[district]) {
            return districtSoilMap[district];
        }
        // If district not found, try by state
        if (stateSoilMap[state]) {
            return stateSoilMap[state];
        }
        // If neither found, return default data
        return defaultSoilData;
    }
    catch (error) {
        console.error('Error fetching soil data:', error);
        return defaultSoilData;
    }
};
exports.getSoilDataByDistrict = getSoilDataByDistrict;
/**
 * Gets soil data for a pincode
 * Fetches from database if available, otherwise calls API
 */
const getSoilDataByPincode = async (pincode) => {
    try {
        // Check if we have soil data in the database
        const cachedSoilData = await index_1.prisma.soil.findUnique({
            where: { pincode }
        });
        if (cachedSoilData) {
            return cachedSoilData;
        }
        // If no data in database, fetch location data and then soil data
        const locationData = await (0, location_service_1.getLocationFromPincode)(pincode);
        const soilData = await (0, exports.getSoilDataByDistrict)(locationData.district, locationData.state);
        // Create soil record in database
        const newSoilData = await index_1.prisma.soil.create({
            data: {
                pincode,
                district: locationData.district,
                state: locationData.state,
                ph_level: soilData.ph_level || defaultSoilData.ph_level,
                nitrogen: soilData.nitrogen || defaultSoilData.nitrogen,
                phosphorus: soilData.phosphorus || defaultSoilData.phosphorus,
                potassium: soilData.potassium || defaultSoilData.potassium,
                organic_matter: soilData.organic_matter || defaultSoilData.organic_matter,
                moisture_content: soilData.moisture_content || defaultSoilData.moisture_content,
                soil_type: soilData.soil_type || defaultSoilData.soil_type
            }
        });
        return newSoilData;
    }
    catch (error) {
        console.error('Error in getSoilDataByPincode:', error);
        throw new Error('Failed to get soil data for pincode');
    }
};
exports.getSoilDataByPincode = getSoilDataByPincode;
//# sourceMappingURL=soil.service.js.map