interface MarketPriceData {
    crop_name: string;
    mandi_location: string;
    state: string;
    min_price: number;
    max_price: number;
    modal_price: number;
    arrival_quantity: number;
    price_date: Date;
}
/**
 * Gets market price data for a crop
 * Tries multiple sources in order of preference
 */
export declare const getMarketPriceForCrop: (cropName: string, state?: string, district?: string) => Promise<MarketPriceData[]>;
/**
 * Gets the current market price for a crop (average modal price across markets)
 */
export declare const getCurrentMarketPrice: (cropName: string) => Promise<number>;
export {};
//# sourceMappingURL=market.service.d.ts.map