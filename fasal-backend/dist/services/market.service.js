"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentMarketPrice = exports.getMarketPriceForCrop = void 0;
const index_1 = require("../index");
/**
 * Fetches market price data from eNAM API (primary source)
 * This is a placeholder implementation - in a production environment,
 * you would use the actual eNAM API with proper authentication
 */
const fetchFromENAM = async (cropName) => {
    try {
        // In a real implementation, you would call the eNAM API
        // For now, we'll throw an error to simulate API failure and trigger fallback
        throw new Error('eNAM API not implemented');
    }
    catch (error) {
        console.error('Error fetching from eNAM:', error);
        throw new Error('Failed to fetch from eNAM API');
    }
};
/**
 * Fetches market price data from CEDA Agricultural Market Data (secondary source)
 */
const fetchFromCEDA = async (cropName) => {
    try {
        // In a real implementation, you would scrape or call the CEDA API
        // For demonstration purposes, we'll return mock data
        const today = new Date();
        // Mock data for demonstration
        const mockData = [
            {
                crop_name: cropName,
                mandi_location: 'Azadpur',
                state: 'Delhi',
                min_price: 1500 + Math.random() * 500,
                max_price: 2500 + Math.random() * 500,
                modal_price: 2000 + Math.random() * 500,
                arrival_quantity: 1000 + Math.random() * 5000,
                price_date: today
            },
            {
                crop_name: cropName,
                mandi_location: 'Pune',
                state: 'Maharashtra',
                min_price: 1600 + Math.random() * 500,
                max_price: 2600 + Math.random() * 500,
                modal_price: 2100 + Math.random() * 500,
                arrival_quantity: 1200 + Math.random() * 5000,
                price_date: today
            },
            {
                crop_name: cropName,
                mandi_location: 'Ludhiana',
                state: 'Punjab',
                min_price: 1700 + Math.random() * 500,
                max_price: 2700 + Math.random() * 500,
                modal_price: 2200 + Math.random() * 500,
                arrival_quantity: 1500 + Math.random() * 5000,
                price_date: today
            }
        ];
        return mockData;
    }
    catch (error) {
        console.error('Error fetching from CEDA:', error);
        throw new Error('Failed to fetch from CEDA API');
    }
};
/**
 * Fetches market price data from web scraping (backup source)
 */
const fetchFromWebScraping = async (cropName) => {
    try {
        // In a real implementation, you would scrape agricultural commodity websites
        // For demonstration purposes, we'll return mock data
        const today = new Date();
        // Mock data for demonstration
        const mockData = [
            {
                crop_name: cropName,
                mandi_location: 'Bangalore',
                state: 'Karnataka',
                min_price: 1400 + Math.random() * 500,
                max_price: 2400 + Math.random() * 500,
                modal_price: 1900 + Math.random() * 500,
                arrival_quantity: 800 + Math.random() * 5000,
                price_date: today
            },
            {
                crop_name: cropName,
                mandi_location: 'Chennai',
                state: 'Tamil Nadu',
                min_price: 1300 + Math.random() * 500,
                max_price: 2300 + Math.random() * 500,
                modal_price: 1800 + Math.random() * 500,
                arrival_quantity: 700 + Math.random() * 5000,
                price_date: today
            }
        ];
        return mockData;
    }
    catch (error) {
        console.error('Error fetching from web scraping:', error);
        throw new Error('Failed to fetch from web scraping');
    }
};
/**
 * Gets market price data for a crop
 * Tries multiple sources in order of preference
 */
const getMarketPriceForCrop = async (cropName, state, district) => {
    try {
        // Check if we have recent market price data in the database (less than 24 hours old)
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const cachedPrices = await index_1.prisma.marketPrice.findMany({
            where: {
                crop_name: cropName,
                price_date: { gte: oneDayAgo }
            }
        });
        if (cachedPrices.length > 0) {
            return cachedPrices;
        }
        // If no recent data, fetch from APIs in order of preference
        let marketPrices = [];
        try {
            // Try primary source first (eNAM)
            marketPrices = await fetchFromENAM(cropName);
        }
        catch (error) {
            try {
                // If primary fails, try secondary source (CEDA)
                marketPrices = await fetchFromCEDA(cropName);
            }
            catch (secondaryError) {
                try {
                    // If secondary fails, try backup source (web scraping)
                    marketPrices = await fetchFromWebScraping(cropName);
                }
                catch (backupError) {
                    throw new Error('All market price data sources failed');
                }
            }
        }
        // Save fetched prices to database
        for (const price of marketPrices) {
            await index_1.prisma.marketPrice.upsert({
                where: {
                    crop_name_mandi_location_price_date: {
                        crop_name: price.crop_name,
                        mandi_location: price.mandi_location,
                        price_date: price.price_date
                    }
                },
                update: price,
                create: price
            });
        }
        return marketPrices;
    }
    catch (error) {
        console.error('Error in getMarketPriceForCrop:', error);
        throw new Error('Failed to get market price data for crop');
    }
};
exports.getMarketPriceForCrop = getMarketPriceForCrop;
/**
 * Gets the current market price for a crop (average modal price across markets)
 */
const getCurrentMarketPrice = async (cropName) => {
    try {
        const prices = await (0, exports.getMarketPriceForCrop)(cropName);
        if (prices.length === 0) {
            throw new Error('No market price data available for crop');
        }
        // Calculate average modal price
        const totalModalPrice = prices.reduce((sum, price) => sum + price.modal_price, 0);
        const averageModalPrice = totalModalPrice / prices.length;
        return averageModalPrice;
    }
    catch (error) {
        console.error('Error in getCurrentMarketPrice:', error);
        throw new Error('Failed to get current market price for crop');
    }
};
exports.getCurrentMarketPrice = getCurrentMarketPrice;
//# sourceMappingURL=market.service.js.map