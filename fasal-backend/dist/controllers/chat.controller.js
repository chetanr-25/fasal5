"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearChatHistoryController = exports.getChatHistoryController = exports.sendMessage = void 0;
const openai_service_1 = require("../services/openai.service");
const translation_service_1 = require("../services/translation.service");
/**
 * Send a message to the AI chatbot and get a response
 */
const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.user?.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (!message) {
            return res.status(400).json({ message: 'Message is required' });
        }
        // Get language preference from request
        const language = req.language || translation_service_1.Language.ENGLISH;
        // Generate AI response
        const response = await (0, openai_service_1.generateAIResponse)(userId, message, language);
        return res.status(200).json({
            message: 'Response generated successfully',
            response
        });
    }
    catch (error) {
        console.error('Error sending message to AI:', error);
        return res.status(500).json({ message: 'Failed to generate AI response' });
    }
};
exports.sendMessage = sendMessage;
/**
 * Get chat history for a user
 */
const getChatHistoryController = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const requestedUserId = req.params.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Only allow users to access their own chat history
        if (userId !== requestedUserId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const limit = req.query.limit ? parseInt(req.query.limit) : 50;
        const history = await (0, openai_service_1.getChatHistory)(userId, limit);
        return res.status(200).json({
            message: 'Chat history retrieved successfully',
            history
        });
    }
    catch (error) {
        console.error('Error getting chat history:', error);
        return res.status(500).json({ message: 'Failed to get chat history' });
    }
};
exports.getChatHistoryController = getChatHistoryController;
/**
 * Clear chat history for a user
 */
const clearChatHistoryController = async (req, res) => {
    try {
        const userId = req.user?.userId;
        const requestedUserId = req.params.userId;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // Only allow users to clear their own chat history
        if (userId !== requestedUserId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        await (0, openai_service_1.clearChatHistory)(userId);
        return res.status(200).json({
            message: 'Chat history cleared successfully'
        });
    }
    catch (error) {
        console.error('Error clearing chat history:', error);
        return res.status(500).json({ message: 'Failed to clear chat history' });
    }
};
exports.clearChatHistoryController = clearChatHistoryController;
//# sourceMappingURL=chat.controller.js.map