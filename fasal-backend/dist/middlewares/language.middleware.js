"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.languageMiddleware = void 0;
const translation_service_1 = require("../services/translation.service");
/**
 * Middleware to detect and set the language preference for the request
 * Detects language from Accept-Language header or query parameter
 */
const languageMiddleware = (req, res, next) => {
    // Check if language is specified in query parameter
    const queryLang = req.query.lang;
    if (queryLang && (queryLang === translation_service_1.Language.ENGLISH || queryLang === translation_service_1.Language.HINDI)) {
        req.language = queryLang;
    }
    else {
        // Otherwise, detect from Accept-Language header
        req.language = (0, translation_service_1.getLanguageFromHeader)(req.headers['accept-language']);
    }
    next();
};
exports.languageMiddleware = languageMiddleware;
//# sourceMappingURL=language.middleware.js.map