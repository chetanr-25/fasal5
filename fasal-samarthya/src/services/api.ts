import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors (e.g., redirect to login on 401)
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      // Redirect to login or show notification
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  login: async (credentials: { phone: string }) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
  },
};

// Recommendation services
export const recommendationService = {
  generateRecommendations: async (data: {
    pincode: string;
    farm_area_acres: number;
    current_season: string;
  }) => {
    const response = await api.post('/recommendations/generate', data);
    return response.data;
  },
  getRecommendationHistory: async () => {
    const response = await api.get('/recommendations/history');
    return response.data;
  },
  getCropRecommendations: (data: any) => api.post('/recommendations/crops', data),
};

// Weather service
export const weatherService = {
  getWeatherData: (pincode: string) => api.get(`/weather/${pincode}`),
};

// Chat services
export const chatService = {
  sendMessage: async (message: string) => {
    const response = await api.post('/chat/send', { message });
    return response.data;
  },
  getChatHistory: async () => {
    const response = await api.get('/chat/history');
    return response.data;
  },
  clearChatHistory: async () => {
    const response = await api.delete('/chat/history');
    return response.data;
  },
};

export default api;