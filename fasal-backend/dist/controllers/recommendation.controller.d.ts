import { Request, Response } from 'express';
/**
 * Generates crop recommendations based on user's location and other factors
 */
export declare const generateRecommendations: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Gets recommendation history for a user
 */
export declare const getRecommendationHistory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=recommendation.controller.d.ts.map