import { Request, Response } from 'express';
import { generateAIResponse, getChatHistory, clearChatHistory } from '../services/openai.service';
import { Language } from '../services/translation.service';

/**
 * Send a message to the AI chatbot and get a response
 */
export const sendMessage = async (req: Request, res: Response) => {
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
    const language = req.language || Language.ENGLISH;

    // Generate AI response
    const response = await generateAIResponse(userId, message, language);

    return res.status(200).json({
      message: 'Response generated successfully',
      response
    });
  } catch (error) {
    console.error('Error sending message to AI:', error);
    return res.status(500).json({ message: 'Failed to generate AI response' });
  }
};

/**
 * Get chat history for a user
 */
export const getChatHistoryController = async (req: Request, res: Response) => {
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

    const limit = req.query.limit ? parseInt(req.query.limit as string) : 50;
    const history = await getChatHistory(userId, limit);

    return res.status(200).json({
      message: 'Chat history retrieved successfully',
      history
    });
  } catch (error) {
    console.error('Error getting chat history:', error);
    return res.status(500).json({ message: 'Failed to get chat history' });
  }
};

/**
 * Clear chat history for a user
 */
export const clearChatHistoryController = async (req: Request, res: Response) => {
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

    await clearChatHistory(userId);

    return res.status(200).json({
      message: 'Chat history cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing chat history:', error);
    return res.status(500).json({ message: 'Failed to clear chat history' });
  }
};