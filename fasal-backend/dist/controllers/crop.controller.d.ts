import { Request, Response } from 'express';
/**
 * Gets all crops from the database
 */
export declare const getAllCrops: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Gets a specific crop by ID
 */
export declare const getCropById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * Gets suitable crops for a specific location
 */
export declare const getSuitableCrops: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=crop.controller.d.ts.map