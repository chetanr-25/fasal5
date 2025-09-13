import { Request, Response } from 'express';
/**
 * Send a message to the AI chatbot and get a response
 */
export declare const sendMessage: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Get chat history for a user
 */
export declare const getChatHistoryController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Clear chat history for a user
 */
export declare const clearChatHistoryController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=chat.controller.d.ts.map