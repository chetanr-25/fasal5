interface CropConditions {
    soilPh: number;
    temperature: number;
    rainfall: number;
    season: string;
}
interface ROIParams {
    investment: number;
    expectedYield: number;
    currentPrice: number;
}
/**
 * Filters crops based on environmental conditions
 */
export declare const filterCropsByConditions: (conditions: CropConditions) => Promise<any[]>;
/**
 * Applies crop rotation logic to filter out unsuitable crops
 */
export declare const applyCropRotationFilter: (suitableCrops: any[], previousCrops: string[]) => any[];
/**
 * Calculates Return on Investment (ROI) for a crop
 */
export declare const calculateROI: (params: ROIParams) => number;
/**
 * Ranks crops by a combined score of profitability and suitability
 */
export declare const rankCropsByScore: (crops: any[]) => any[];
/**
 * Recommends crops based on user's location, farm area, and other factors
 */
export declare const recommendCrops: (pincode: string, farmArea: number, previousCrops: string[], currentSeason: string) => Promise<any[]>;
export {};
//# sourceMappingURL=crop.service.d.ts.map