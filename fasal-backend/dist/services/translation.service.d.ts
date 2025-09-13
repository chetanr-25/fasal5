export declare const Language: {
    readonly ENGLISH: "en";
    readonly HINDI: "hi";
};
export type Language = typeof Language[keyof typeof Language];
/**
 * Translates a key to the specified language
 * @param key The translation key
 * @param language The target language
 * @returns The translated string or the key if translation not found
 */
export declare const translate: (key: string, language?: Language) => string;
/**
 * Translates an object's string values using the specified language
 * @param obj The object to translate
 * @param language The target language
 * @returns A new object with translated values
 */
export declare const translateObject: <T extends Record<string, any>>(obj: T, language?: Language) => T;
/**
 * Gets the default language from the Accept-Language header
 * @param acceptLanguage The Accept-Language header value
 * @returns The detected language or default (English)
 */
export declare const getLanguageFromHeader: (acceptLanguage?: string) => Language;
//# sourceMappingURL=translation.service.d.ts.map