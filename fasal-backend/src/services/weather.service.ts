import axios from 'axios';
import { apiConfig } from '../config/api.config';
import { getLocationFromPincode, getCoordinatesFromLocation } from './location.service';
import { prisma } from '../index';

interface WeatherData {
  current_temp: number;
  humidity: number;
  rainfall: number;
  wind_speed: number;
  weather_condition: string;
  forecast_7day: any;
}

/**
 * Fetches current weather data from OpenWeatherMap API
 */
export const getCurrentWeather = async (lat: number, lon: number): Promise<any> => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      throw new Error('OpenWeatherMap API key not found');
    }

    const response = await axios.get(`${apiConfig.weather.current}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw new Error('Failed to fetch current weather data');
  }
};

/**
 * Fetches 7-day weather forecast from OpenWeatherMap API
 */
export const getWeatherForecast = async (lat: number, lon: number): Promise<any> => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    if (!apiKey) {
      throw new Error('OpenWeatherMap API key not found');
    }

    const response = await axios.get(`${apiConfig.weather.forecast}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw new Error('Failed to fetch weather forecast data');
  }
};

/**
 * Processes and formats weather data for storage
 */
export const processWeatherData = (currentWeather: any, forecast: any): WeatherData => {
  // Extract current weather data
  const current_temp = currentWeather.main.temp;
  const humidity = currentWeather.main.humidity;
  const rainfall = currentWeather.rain ? currentWeather.rain['1h'] || 0 : 0;
  const wind_speed = currentWeather.wind.speed;
  const weather_condition = currentWeather.weather[0].main;

  // Process forecast data
  const forecast_7day = forecast.list
    .filter((_: any, index: number) => index % 8 === 0) // Get one forecast per day (every 8th item is 24 hours apart)
    .slice(0, 7) // Limit to 7 days
    .map((day: any) => ({
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

/**
 * Gets weather data for a pincode
 * Fetches from database if recent, otherwise calls API
 */
export const getWeatherByPincode = async (pincode: string): Promise<any> => {
  try {
    // Check if we have recent weather data in the database (less than 3 hours old)
    const cachedWeather = await prisma.weather.findUnique({
      where: { pincode }
    });

    const threeHoursAgo = new Date(Date.now() - 3 * 60 * 60 * 1000);
    
    if (cachedWeather && cachedWeather.last_updated > threeHoursAgo) {
      return cachedWeather;
    }

    // If no recent data, fetch from API
    const locationData = await getLocationFromPincode(pincode);
    const coordinates = await getCoordinatesFromLocation(
      locationData.location_name,
      locationData.district,
      locationData.state
    );

    const currentWeather = await getCurrentWeather(coordinates.lat, coordinates.lon);
    const forecast = await getWeatherForecast(coordinates.lat, coordinates.lon);
    
    const weatherData = processWeatherData(currentWeather, forecast);

    // Update or create weather record in database
    const updatedWeather = await prisma.weather.upsert({
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
  } catch (error) {
    console.error('Error in getWeatherByPincode:', error);
    throw new Error('Failed to get weather data for pincode');
  }
};