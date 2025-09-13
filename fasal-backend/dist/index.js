"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const client_1 = require("@prisma/client");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_config_1 = __importDefault(require("./config/swagger.config"));
// Load environment variables
dotenv_1.default.config();
// Initialize Prisma client
exports.prisma = new client_1.PrismaClient();
// Initialize Express app
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Middleware
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Language middleware
const language_middleware_1 = require("./middlewares/language.middleware");
app.use(language_middleware_1.languageMiddleware);
// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to FASAL Smart Crop Advisor API' });
});
// Import and use route files
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const recommendation_routes_1 = __importDefault(require("./routes/recommendation.routes"));
const location_routes_1 = __importDefault(require("./routes/location.routes"));
const weather_routes_1 = __importDefault(require("./routes/weather.routes"));
const soil_routes_1 = __importDefault(require("./routes/soil.routes"));
const market_routes_1 = __importDefault(require("./routes/market.routes"));
const crop_routes_1 = __importDefault(require("./routes/crop.routes"));
const chat_routes_1 = __importDefault(require("./routes/chat.routes"));
app.use('/api/auth', auth_routes_1.default);
app.use('/api/recommendations', recommendation_routes_1.default);
app.use('/api/location', location_routes_1.default);
app.use('/api/weather', weather_routes_1.default);
app.use('/api/soil', soil_routes_1.default);
app.use('/api/market', market_routes_1.default);
app.use('/api/crops', crop_routes_1.default);
app.use('/api/chat', chat_routes_1.default);
// Swagger documentation setup
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_config_1.default, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    swaggerOptions: {
        docExpansion: 'none',
        persistAuthorization: true,
    }
}));
// ... other routes
// Error handling middleware
app.use((err, req, res, next) => {
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
    await exports.prisma.$disconnect();
    console.log('Server shut down gracefully');
    process.exit(0);
});
//# sourceMappingURL=index.js.map