# Fasal Backend API

This is the backend API for the Fasal Samarthya application, providing crop recommendations, weather data, soil information, market prices, and an AI chatbot for farmers.

## Features

- User authentication with JWT
- Crop recommendation algorithm based on environmental conditions
- Weather data integration
- Soil data integration
- Market price data integration
- Multilingual support (English/Hindi)
- AI chatbot powered by OpenAI

## Tech Stack

- Node.js with Express.js
- TypeScript
- PostgreSQL database
- Prisma ORM
- Redis for caching
- OpenAI API integration
- Docker for deployment

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- PostgreSQL database
- Redis (optional, for caching)

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd fasal-backend
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

Create a `.env` file in the root directory with the following variables:

```
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/fasal?schema=public

# JWT
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Redis (optional)
REDIS_URL=redis://localhost:6379

# OpenWeatherMap API
OPENWEATHER_API_KEY=your_openweather_api_key

# OpenAI API
OPENAI_API_KEY=your_openai_api_key
```

4. Generate Prisma client

```bash
npx prisma generate
```

5. Run database migrations

```bash
npx prisma migrate dev
```

6. Start the development server

```bash
npm run dev
```

## Deployment with Docker

### Using Docker Compose

1. Make sure Docker and Docker Compose are installed on your system

2. Build and start the containers

```bash
docker-compose up -d
```

3. The API will be available at http://localhost:3000

### Using Docker (without Docker Compose)

1. Build the Docker image

```bash
docker build -t fasal-backend .
```

2. Run the container

```bash
docker run -p 3000:3000 --env-file .env fasal-backend
```

## API Documentation

API documentation is available at `/api-docs` when the server is running.

## License

This project is licensed under the MIT License.