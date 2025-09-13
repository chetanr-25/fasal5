import { OpenAI } from 'openai';
import { PrismaClient } from '@prisma/client';
import { Language, translate } from './translation.service';

const prisma = new PrismaClient();

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Define chat message types
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Generate a system prompt for the AI based on user context
 * @param userId User ID for personalized context
 * @param language Language preference
 * @returns System prompt message
 */
const generateSystemPrompt = async (userId: string, language: Language): Promise<ChatMessage> => {
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
  let systemPrompt = translate('system_prompt_base', language);
  
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
        user.recommendations.map((rec: { cropName: string }) => rec.cropName).join(', ');
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
export const getChatHistory = async (userId: string, limit = 20): Promise<ChatMessage[]> => {
  const history = await prisma.chatHistory.findMany({
    where: { userId },
    orderBy: { createdAt: 'asc' },
    take: limit,
  });

  return history.map((msg: { role: string; content: string }) => ({
    role: msg.role as 'user' | 'assistant',
    content: msg.content,
  }));
};

/**
 * Save a chat message to the database
 * @param userId User ID
 * @param message Chat message to save
 */
export const saveChatMessage = async (
  userId: string,
  message: ChatMessage
): Promise<void> => {
  await prisma.chatHistory.create({
    data: {
      userId,
      role: message.role,
      content: message.content,
    },
  });
};

/**
 * Clear chat history for a user
 * @param userId User ID
 */
export const clearChatHistory = async (userId: string): Promise<void> => {
  await prisma.chatHistory.deleteMany({
    where: { userId },
  });
};

/**
 * Generate a response from the AI chatbot
 * @param userId User ID
 * @param userMessage User's message
 * @param language Language preference
 * @returns AI response
 */
export const generateAIResponse = async (
  userId: string,
  userMessage: string,
  language: Language = Language.ENGLISH
): Promise<string> => {
  try {
    // Get system prompt
    const systemPrompt = await generateSystemPrompt(userId, language);
    
    // Get recent chat history
    const chatHistory = await getChatHistory(userId, 10);
    
    // Prepare messages for OpenAI
    const messages: ChatMessage[] = [
      systemPrompt,
      ...chatHistory,
      { role: 'user', content: userMessage }
    ];
    
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: messages as any,
      temperature: 0.7,
      max_tokens: 500,
    });
    
    const aiResponse = completion.choices[0]?.message?.content || 
      translate('ai_error_response', language) || 
      'I apologize, but I could not generate a response at this time.';
    
    // Save the conversation to the database
    await saveChatMessage(userId, { role: 'user', content: userMessage });
    await saveChatMessage(userId, { role: 'assistant', content: aiResponse });
    
    return aiResponse;
  } catch (error) {
    console.error('Error generating AI response:', error);
    
    const errorMessage = translate('ai_error_response', language) || 
      'I apologize, but I encountered an error while processing your request.';
    
    return errorMessage;
  }
};