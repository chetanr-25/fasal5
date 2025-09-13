import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fasal Samarthya API',
      version: '1.0.0',
      description: 'API documentation for Fasal Samarthya - A smart farming assistant',
      contact: {
        name: 'Fasal Samarthya Team',
        email: 'support@fasalsamarthya.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://api.fasalsamarthya.com',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            id: {
              type: 'string',
              description: 'User ID',
            },
            name: {
              type: 'string',
              description: 'User name',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email',
            },
            phone: {
              type: 'string',
              description: 'User phone number',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'User password',
            },
            role: {
              type: 'string',
              enum: ['USER', 'ADMIN'],
              description: 'User role',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Update timestamp',
            },
          },
        },
        Crop: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Crop ID',
            },
            name: {
              type: 'string',
              description: 'Crop name',
            },
            scientificName: {
              type: 'string',
              description: 'Scientific name of the crop',
            },
            season: {
              type: 'string',
              enum: ['Kharif', 'Rabi', 'Zaid'],
              description: 'Growing season',
            },
            waterRequirement: {
              type: 'number',
              description: 'Water requirement in mm',
            },
            temperatureMin: {
              type: 'number',
              description: 'Minimum temperature in Celsius',
            },
            temperatureMax: {
              type: 'number',
              description: 'Maximum temperature in Celsius',
            },
            phMin: {
              type: 'number',
              description: 'Minimum pH level',
            },
            phMax: {
              type: 'number',
              description: 'Maximum pH level',
            },
            nitrogenRequirement: {
              type: 'number',
              description: 'Nitrogen requirement in kg/ha',
            },
            phosphorusRequirement: {
              type: 'number',
              description: 'Phosphorus requirement in kg/ha',
            },
            potassiumRequirement: {
              type: 'number',
              description: 'Potassium requirement in kg/ha',
            },
            growthDuration: {
              type: 'number',
              description: 'Growth duration in days',
            },
            yieldPerAcre: {
              type: 'number',
              description: 'Average yield per acre in kg',
            },
            costPerAcre: {
              type: 'number',
              description: 'Average cost per acre in INR',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Update timestamp',
            },
          },
        },
        Weather: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Weather record ID',
            },
            pincode: {
              type: 'string',
              description: 'Pincode of the location',
            },
            temperature: {
              type: 'number',
              description: 'Temperature in Celsius',
            },
            humidity: {
              type: 'number',
              description: 'Humidity percentage',
            },
            rainfall: {
              type: 'number',
              description: 'Rainfall in mm',
            },
            windSpeed: {
              type: 'number',
              description: 'Wind speed in km/h',
            },
            forecast: {
              type: 'object',
              description: 'Weather forecast data',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Update timestamp',
            },
          },
        },
        Soil: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Soil record ID',
            },
            pincode: {
              type: 'string',
              description: 'Pincode of the location',
            },
            type: {
              type: 'string',
              description: 'Soil type',
            },
            ph: {
              type: 'number',
              description: 'pH level',
            },
            nitrogen: {
              type: 'number',
              description: 'Nitrogen content in kg/ha',
            },
            phosphorus: {
              type: 'number',
              description: 'Phosphorus content in kg/ha',
            },
            potassium: {
              type: 'number',
              description: 'Potassium content in kg/ha',
            },
            organicMatter: {
              type: 'number',
              description: 'Organic matter percentage',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Update timestamp',
            },
          },
        },
        MarketPrice: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Market price record ID',
            },
            cropName: {
              type: 'string',
              description: 'Name of the crop',
            },
            state: {
              type: 'string',
              description: 'State name',
            },
            district: {
              type: 'string',
              description: 'District name',
            },
            market: {
              type: 'string',
              description: 'Market name',
            },
            minPrice: {
              type: 'number',
              description: 'Minimum price in INR per quintal',
            },
            maxPrice: {
              type: 'number',
              description: 'Maximum price in INR per quintal',
            },
            modalPrice: {
              type: 'number',
              description: 'Modal price in INR per quintal',
            },
            date: {
              type: 'string',
              format: 'date',
              description: 'Date of the price record',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Update timestamp',
            },
          },
        },
        Recommendation: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Recommendation ID',
            },
            userId: {
              type: 'string',
              description: 'User ID',
            },
            pincode: {
              type: 'string',
              description: 'Pincode of the location',
            },
            farmAreaAcres: {
              type: 'number',
              description: 'Farm area in acres',
            },
            season: {
              type: 'string',
              enum: ['Kharif', 'Rabi', 'Zaid'],
              description: 'Growing season',
            },
            previousCrops: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Previous crops grown',
            },
            cropName: {
              type: 'string',
              description: 'Recommended crop name',
            },
            confidenceScore: {
              type: 'number',
              description: 'Confidence score of the recommendation',
            },
            expectedYield: {
              type: 'number',
              description: 'Expected yield in kg per acre',
            },
            expectedRoi: {
              type: 'number',
              description: 'Expected ROI percentage',
            },
            reasoning: {
              type: 'string',
              description: 'Reasoning for the recommendation',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
          },
        },
        ChatMessage: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'Chat message ID',
            },
            userId: {
              type: 'string',
              description: 'User ID',
            },
            role: {
              type: 'string',
              enum: ['user', 'assistant'],
              description: 'Message role',
            },
            content: {
              type: 'string',
              description: 'Message content',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Path to the API routes with JSDoc comments
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;