import express from 'express';
import { sendMessage, getChatHistoryController, clearChatHistoryController } from '../controllers/chat.controller';
import { authenticateToken } from '../middlewares/auth.middleware';
import { Request, Response } from 'express';

const router = express.Router();

/**
 * @swagger
 * /api/chat/send:
 *   post:
 *     summary: Send a message to the AI chatbot
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *     responses:
 *       200:
 *         description: Response generated successfully
 *       400:
 *         description: Message is required
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/send', authenticateToken, sendMessage);

/**
 * @swagger
 * /api/chat/history/{userId}:
 *   get:
 *     summary: Get chat history for a user
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Chat history retrieved successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.get('/history/:userId', authenticateToken, getChatHistoryController);

/**
 * @swagger
 * /api/chat/clear/{userId}:
 *   delete:
 *     summary: Clear chat history for a user
 *     tags: [Chat]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chat history cleared successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       500:
 *         description: Server error
 */
router.delete('/clear/:userId', authenticateToken, clearChatHistoryController);

export default router;