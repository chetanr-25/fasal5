import { Request, Response } from 'express';
import jwt, { SignOptions, Secret } from 'jsonwebtoken';
import { prisma } from '../index';
import { RegisterUserInput, LoginUserInput, AuthTokenPayload } from '../types/auth.types';

// Register a new user
export const register = async (req: Request, res: Response) => {
  try {
    const userData: RegisterUserInput = req.body;

    // Check if user with phone already exists
    const existingUser = await prisma.user.findUnique({
      where: { phone: userData.phone }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this phone number already exists' });
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: userData
    });

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'default_secret';
    const options: SignOptions = { expiresIn: '7d' };
    const token = jwt.sign(
      { userId: newUser.id, phone: newUser.phone } as AuthTokenPayload,
      Buffer.from(jwtSecret, 'utf-8'),
      options
    );

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
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Failed to register user' });
  }
};

// Login user
export const login = async (req: Request, res: Response) => {
  try {
    const { phone }: LoginUserInput = req.body;

    // Find user by phone
    const user = await prisma.user.findUnique({
      where: { phone }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate JWT token
    const jwtSecret = process.env.JWT_SECRET || 'default_secret';
    const options: SignOptions = { expiresIn: '7d' };
    const token = jwt.sign(
      { userId: user.id, phone: user.phone } as AuthTokenPayload,
      Buffer.from(jwtSecret, 'utf-8'),
      options
    );

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
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Failed to login' });
  }
};

// Get user profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await prisma.user.findUnique({
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
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({ message: 'Failed to retrieve profile' });
  }
};