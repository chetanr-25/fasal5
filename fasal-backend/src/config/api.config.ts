export const apiConfig = {
  // Location API endpoints
  location: {
    primary: 'https://api.postalpincode.in/pincode/',
    backup: 'https://www.postpincode.in/api/getPostalArea.php?pincode='
  },
  
  // Weather API endpoints
  weather: {
    current: 'https://api.openweathermap.org/data/2.5/weather',
    forecast: 'https://api.openweathermap.org/data/2.5/forecast'
  },
  
  // Soil data sources
  soil: {
    bhuvan: 'https://bhuvan-app3.nrsc.gov.in/data/'
    // Additional soil data sources can be added here
  },
  
  // Market price data sources
  marketPrice: {
    primary: 'https://enam-api-endpoint.gov.in', // Placeholder for eNAM API
    secondary: 'https://agmarknet.ceda.ashoka.edu.in'
    // Additional market price sources can be added here
  },
  
  // Crop database sources
  cropDatabase: {
    kaggle: 'https://www.kaggle.com/datasets/agricultural-crop-yield-in-indian-states',
    dataGov: 'https://data.gov.in/catalog/district-wise-crop-production-statistics',
    icar: 'https://icar.gov.in/crop-calendars'
    // These are placeholder URLs, actual API endpoints would be used in production
  }
};