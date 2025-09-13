# Fasal Samarthya API Documentation

This directory contains the API documentation for the Fasal Samarthya backend.

## Available Documentation

- `api-documentation.md`: Comprehensive API documentation generated from the Swagger specification

## Generating Documentation

To regenerate the API documentation, run:

```bash
node scripts/generate-api-docs.js
```

## Interactive API Documentation

When the server is running, you can access the interactive Swagger UI documentation at:

```
http://localhost:3000/api-docs
```

This provides a user-friendly interface to explore and test the API endpoints.

## Authentication

Most API endpoints require authentication using JWT Bearer tokens. To authenticate:

1. Obtain a token by logging in through the `/api/auth/login` endpoint
2. Include the token in the Authorization header of your requests:
   ```
   Authorization: Bearer <your_token>
   ```

## API Structure

The API is organized into the following main sections:

- **Authentication**: User registration, login, and profile management
- **Crops**: Information about crops, their requirements, and suitable crops for specific locations
- **Weather**: Weather data and forecasts for specific locations
- **Soil**: Soil data for specific locations
- **Market**: Market prices for various crops
- **Recommendations**: Personalized crop recommendations
- **Chat**: AI-powered chatbot for farming assistance

Refer to the generated documentation for detailed information on each endpoint.