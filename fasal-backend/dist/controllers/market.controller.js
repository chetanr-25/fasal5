"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMarketPriceController = void 0;
const market_service_1 = require("../services/market.service");
/**
 * Gets market price data for a specific crop
 */
const getMarketPriceController = async (req, res) => {
    try {
        const { cropName } = req.params;
        const { state, district } = req.query;
        if (!cropName) {
            return res.status(400).json({ message: 'Crop name is required' });
        }
        const marketData = await (0, market_service_1.getMarketPriceForCrop)(cropName, state, district);
        return res.status(200).json({
            message: 'Market price data retrieved successfully',
            market: marketData
        });
    }
    catch (error) {
        console.error('Error getting market price data:', error);
        return res.status(500).json({ message: 'Failed to get market price data' });
    }
};
exports.getMarketPriceController = getMarketPriceController;
//# sourceMappingURL=market.controller.js.map