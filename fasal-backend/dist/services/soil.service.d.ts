interface SoilData {
    pincode: string;
    district: string;
    state: string;
    ph_level: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    organic_matter: number;
    moisture_content: number;
    soil_type: string;
}
/**
 * Gets soil data for a district
 * In a production environment, this would call actual soil data APIs
 */
export declare const getSoilDataByDistrict: (district: string, state: string) => Promise<Partial<SoilData>>;
/**
 * Gets soil data for a pincode
 * Fetches from database if available, otherwise calls API
 */
export declare const getSoilDataByPincode: (pincode: string) => Promise<SoilData>;
export {};
//# sourceMappingURL=soil.service.d.ts.map