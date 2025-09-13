import { Request, Response, NextFunction } from 'express';
import { Language, getLanguageFromHeader } from '../services/translation.service';

// Extend Express Request interface to include language
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
export const languageMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Check if language is specified in query parameter
  const queryLang = req.query.lang as string;
  
  if (queryLang && (queryLang === Language.ENGLISH || queryLang === Language.HINDI)) {
    req.language = queryLang as Language;
  } else {
    // Otherwise, detect from Accept-Language header
    req.language = getLanguageFromHeader(req.headers['accept-language'] as string);
  }
  
  next();
};