"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAIResponse = exports.clearChatHistory = exports.saveChatMessage = exports.getChatHistory = void 0;
const openai_1 = require("openai");
const client_1 = require("@prisma/client");
const translation_service_1 = require("./translation.service");
const prisma = new client_1.PrismaClient();
// Initialize OpenAI client
const openai = new openai_1.OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});
/**
 * Generate a system prompt for the AI based on user context
 * @param userId User ID for personalized context
 * @param language Language preference
 * @returns System prompt message
 */
const generateSystemPrompt = async (userId, language) => {
    // Get user data for context
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            recommendations: {
                take: 5,
                orderBy: { createdAt: 'desc' },
            },
        },
    });
    // Base system prompt
    let systemPrompt = (0, translation_service_1.translate)('system_prompt_base', language);
    // Default English prompt if translation not available
    if (systemPrompt === 'system_prompt_base') {
        systemPrompt = 'You are Fasal Samarthya AI, an agricultural assistant designed to help farmers in India. ' +
            'Provide helpful, accurate, and practical advice about farming, crops, weather, soil health, and market prices. ' +
            'Keep responses concise, practical, and tailored to Indian agricultural conditions.';
    }
    // Add user context if available
    if (user) {
        // Add recent recommendations context
        if (user.recommendations.length > 0) {
            systemPrompt += '\n\nRecent crop recommendations for this user: ' +
                user.recommendations.map((rec) => rec.cropName).join(', ');
        }
    }
    return {
        role: 'system',
        content: systemPrompt,
    };
};
/**
 * Get chat history for a user
 * @param userId User ID
 * @param limit Maximum number of messages to retrieve
 * @returns Array of chat messages
 */
const getChatHistory = async (userId, limit = 20) => {
    const history = await prisma.chatHistory.findMany({
        where: { userId },
        orderBy: { createdAt: 'asc' },
        take: limit,
    });
    return history.map((msg) => ({
        role: msg.role,
        content: msg.content,
    }));
};
exports.getChatHistory = getChatHistory;
/**
 * Save a chat message to the database
 * @param userId User ID
 * @param message Chat message to save
 */
const saveChatMessage = async (userId, message) => {
    await prisma.chatHistory.create({
        data: {
            userId,
            role: message.role,
            content: message.content,
        },
    });
};
exports.saveChatMessage = saveChatMessage;
/**
 * Clear chat history for a user
 * @param userId User ID
 */
const clearChatHistory = async (userId) => {
    await prisma.chatHistory.deleteMany({
        where: { userId },
    });
};
exports.clearChatHistory = clearChatHistory;
/**
 * Generate a response from the AI chatbot
 * @param userId User ID
 * @param userMessage User's message
 * @param language Language preference
 * @returns AI response
 */
const generateAIResponse = async (userId, userMessage, language = translation_service_1.Language.ENGLISH) => {
    try {
        // Get system prompt
        const systemPrompt = await generateSystemPrompt(userId, language);
        // Get recent chat history
        const chatHistory = await (0, exports.getChatHistory)(userId, 10);
        // Prepare messages for OpenAI
        const messages = [
            systemPrompt,
            ...chatHistory,
            { role: 'user', content: userMessage }
        ];
        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: 'gpt-4-turbo',
            messages: messages,
            temperature: 0.7,
            max_tokens: 500,
        });
        const aiResponse = completion.choices[0]?.message?.content ||
            (0, translation_service_1.translate)('ai_error_response', language) ||
            'I apologize, but I could not generate a response at this time.';
        // Save the conversation to the database
        await (0, exports.saveChatMessage)(userId, { role: 'user', content: userMessage });
        await (0, exports.saveChatMessage)(userId, { role: 'assistant', content: aiResponse });
        return aiResponse;
    }
    catch (error) {
        console.error('Error generating AI response:', error);
        const errorMessage = (0, translation_service_1.translate)('ai_error_response', language) ||
            'I apologize, but I encountered an error while processing your request.';
        return errorMessage;
    }
};
exports.generateAIResponse = generateAIResponse;
//# sourceMappingURL=openai.service.js.map