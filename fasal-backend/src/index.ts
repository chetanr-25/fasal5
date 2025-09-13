import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.config';

// Load environment variables
dotenv.config();

// Initialize Prisma client
export const prisma = new PrismaClient();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Language middleware
import { languageMiddleware } from './middlewares/language.middleware';
app.use(languageMiddleware);

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to FASAL Smart Crop Advisor API' });
});

// Import and use route files
import authRoutes from './routes/auth.routes';
import recommendationRoutes from './routes/recommendation.routes';
import locationRoutes from './routes/location.routes';
import weatherRoutes from './routes/weather.routes';
import soilRoutes from './routes/soil.routes';
import marketRoutes from './routes/market.routes';
import cropRoutes from './routes/crop.routes';
import chatRoutes from './routes/chat.routes';

app.use('/api/auth', authRoutes);
app.use('/api/recommendations', recommendationRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/soil', soilRoutes);
app.use('/api/market', marketRoutes);
app.use('/api/crops', cropRoutes);
app.use('/api/chat', chatRoutes);

// Swagger documentation setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  swaggerOptions: {
    docExpansion: 'none',
    persistAuthorization: true,
  }
}));
// ... other routes

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  console.log('Server shut down gracefully');
  process.exit(0);
});