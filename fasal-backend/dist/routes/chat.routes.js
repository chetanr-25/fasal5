"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chat_controller_1 = require("../controllers/chat.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
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
router.post('/send', auth_middleware_1.authenticateToken, chat_controller_1.sendMessage);
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
router.get('/history/:userId', auth_middleware_1.authenticateToken, chat_controller_1.getChatHistoryController);
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
router.delete('/clear/:userId', auth_middleware_1.authenticateToken, chat_controller_1.clearChatHistoryController);
exports.default = router;
//# sourceMappingURL=chat.routes.js.map