"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
// Register a new user
const register = async (req, res) => {
    try {
        const userData = req.body;
        // Check if user with phone already exists
        const existingUser = await index_1.prisma.user.findUnique({
            where: { phone: userData.phone }
        });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this phone number already exists' });
        }
        // Create new user
        const newUser = await index_1.prisma.user.create({
            data: userData
        });
        // Generate JWT token
        const jwtSecret = process.env.JWT_SECRET || 'default_secret';
        const options = { expiresIn: '7d' };
        const token = jsonwebtoken_1.default.sign({ userId: newUser.id, phone: newUser.phone }, Buffer.from(jwtSecret, 'utf-8'), options);
        return res.status(201).json({
            message: 'User registered successfully',
            token,
            user: {
                id: newUser.id,
                phone: newUser.phone,
                location_name: newUser.location_name,
                preferred_language: newUser.preferred_language
            }
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ message: 'Failed to register user' });
    }
};
exports.register = register;
// Login user
const login = async (req, res) => {
    try {
        const { phone } = req.body;
        // Find user by phone
        const user = await index_1.prisma.user.findUnique({
            where: { phone }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Generate JWT token
        const jwtSecret = process.env.JWT_SECRET || 'default_secret';
        const options = { expiresIn: '7d' };
        const token = jsonwebtoken_1.default.sign({ userId: user.id, phone: user.phone }, Buffer.from(jwtSecret, 'utf-8'), options);
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                phone: user.phone,
                location_name: user.location_name,
                preferred_language: user.preferred_language
            }
        });
    }
    catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ message: 'Failed to login' });
    }
};
exports.login = login;
// Get user profile
const getProfile = async (req, res) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await index_1.prisma.user.findUnique({
            where: { id: userId }
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Remove sensitive data before sending response
        const { created_at, updated_at, ...userProfile } = user;
        return res.status(200).json({
            message: 'Profile retrieved successfully',
            user: userProfile
        });
    }
    catch (error) {
        console.error('Get profile error:', error);
        return res.status(500).json({ message: 'Failed to retrieve profile' });
    }
};
exports.getProfile = getProfile;
//# sourceMappingURL=auth.controller.js.map