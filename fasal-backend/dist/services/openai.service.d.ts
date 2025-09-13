import { Language } from './translation.service';
export interface ChatMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}
/**
 * Get chat history for a user
 * @param userId User ID
 * @param limit Maximum number of messages to retrieve
 * @returns Array of chat messages
 */
export declare const getChatHistory: (userId: string, limit?: number) => Promise<ChatMessage[]>;
/**
 * Save a chat message to the database
 * @param userId User ID
 * @param message Chat message to save
 */
export declare const saveChatMessage: (userId: string, message: ChatMessage) => Promise<void>;
/**
 * Clear chat history for a user
 * @param userId User ID
 */
export declare const clearChatHistory: (userId: string) => Promise<void>;
/**
 * Generate a response from the AI chatbot
 * @param userId User ID
 * @param userMessage User's message
 * @param language Language preference
 * @returns AI response
 */
export declare const generateAIResponse: (userId: string, userMessage: string, language?: Language) => Promise<string>;
//# sourceMappingURL=openai.service.d.ts.map