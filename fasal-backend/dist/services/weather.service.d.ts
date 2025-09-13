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
export declare const getCurrentWeather: (lat: number, lon: number) => Promise<any>;
/**
 * Fetches 7-day weather forecast from OpenWeatherMap API
 */
export declare const getWeatherForecast: (lat: number, lon: number) => Promise<any>;
/**
 * Processes and formats weather data for storage
 */
export declare const processWeatherData: (currentWeather: any, forecast: any) => WeatherData;
/**
 * Gets weather data for a pincode
 * Fetches from database if recent, otherwise calls API
 */
export declare const getWeatherByPincode: (pincode: string) => Promise<any>;
export {};
//# sourceMappingURL=weather.service.d.ts.map