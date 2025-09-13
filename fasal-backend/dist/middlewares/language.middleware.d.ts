import { Request, Response, NextFunction } from 'express';
import { Language } from '../services/translation.service';
declare global {
    namespace Express {
        interface Request {
            language?: Language;
        }
    }
}
/**
 * Middleware to detect and set the language preference for the request
 * Detects language from Accept-Language header or query parameter
 */
export declare const languageMiddleware: (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=language.middleware.d.ts.map