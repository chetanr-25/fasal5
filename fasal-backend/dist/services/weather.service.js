"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherByPincode = exports.processWeatherData = exports.getWeatherForecast = exports.getCurrentWeather = void 0;
const axios_1 = __importDefault(require("axios"));
const api_config_1 = require("../config/api.config");
const location_service_1 = require("./location.service");
const index_1 = require("../index");
/**
 * Fetches current weather data from OpenWeatherMap API
 */
const getCurrentWeather = async (lat, lon) => {
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        if (!apiKey) {
            throw new Error('OpenWeatherMap API key not found');
        }
        const response = await axios_1.default.get(`${api_config_1.apiConfig.weather.current}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching current weather:', error);
        throw new Error('Failed to fetch current weather data');
    }
};
exports.getCurrentWeather = getCurrentWeather;
/**
 * Fetches 7-day weather forecast from OpenWeatherMap API
 */
const getWeatherForecast = async (lat, lon) => {
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        if (!apiKey) {
            throw new Error('OpenWeatherMap API key not found');
        }
        const response = await axios_1.default.get(`${api_config_1.apiConfig.weather.forecast}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching weather forecast:', error);
        throw new Error('Failed to fetch weather forecast data');
    }
};
exports.getWeatherForecast = getWeatherForecast;
/**
 * Processes and formats weather data for storage
 */
const processWeatherData = (currentWeather, forecast) => {
    // Extract current weather data
    const current_temp = currentWeather.main.temp;
    const humidity = currentWeather.main.humidity;
    const rainfall = currentWeather.rain ? currentWeather.rain['1h'] || 0 : 0;
    const wind_speed = currentWeather.wind.speed;
    const weather_condition = currentWeather.weather[0].main;
    // Process forecast data
    const forecast_7day = forecast.list
        .filter((_, index) => index % 8 === 0) // Get one forecast per day (every 8th item is 24 hours apart)
        .slice(0, 7) // Limit to 7 days
        .map((day) => ({
        date: new Date(day.dt * 1000).toISOString().split('T')[0],
        temp: day.main.temp,
        humidity: day.main.humidity,
        condition: day.weather[0].main,
        description: day.weather[0].description,
        rainfall: day.rain ? day.rain['3h'] || 0 : 0,
        wind_speed: day.wind.speed
    }));
    return {
        current_temp,
        humidity,
        rainfall,
        wind_speed,
        weather_condition,
        forecast_7day
    };
};
exports.processWeatherData = processWeatherData;
/**
 * Gets weather data for a pincode
 * Fetches from database if recent, otherwise calls API
 */
const getWeatherByPincode = async (pincode) => {
    try {
        // Check if we have recent weather data in the database (less than 3 hours old)
        const cachedWeather = await index_1.prisma.weather.findUnique({
            where: { pincode }
        });
        const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
        if (cachedWeather && cachedWeather.last_updated > threeHoursAgo) {
            return cachedWeather;
        }
        // If no recent data, fetch from API
        const locationData = await (0, location_service_1.getLocationFromPincode)(pincode);
        const coordinates = await (0, location_service_1.getCoordinatesFromLocation)(locationData.location_name, locationData.district, locationData.state);
        const currentWeather = await (0, exports.getCurrentWeather)(coordinates.lat, coordinates.lon);
        const forecast = await (0, exports.getWeatherForecast)(coordinates.lat, coordinates.lon);
        const weatherData = (0, exports.processWeatherData)(currentWeather, forecast);
        // Update or create weather record in database
        const updatedWeather = await index_1.prisma.weather.upsert({
            where: { pincode },
            update: {
                ...weatherData,
                location_name: locationData.location_name,
                last_updated: new Date()
            },
            create: {
                pincode,
                location_name: locationData.location_name,
                ...weatherData,
                last_updated: new Date()
            }
        });
        return updatedWeather;
    }
    catch (error) {
        console.error('Error in getWeatherByPincode:', error);
        throw new Error('Failed to get weather data for pincode');
    }
};
exports.getWeatherByPincode = getWeatherByPincode;
//# sourceMappingURL=weather.service.js.map