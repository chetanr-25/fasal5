interface LocationData {
    pincode: string;
    location_name: string;
    district: string;
    state: string;
    lat?: number;
    lon?: number;
}
/**
 * Fetches location data from pincode using primary API
 * Falls back to backup API if primary fails
 */
export declare const getLocationFromPincode: (pincode: string) => Promise<LocationData>;
/**
 * Gets approximate coordinates (latitude and longitude) for a location
 * This is a simplified implementation - in a production environment,
 * you would use a more accurate geocoding service
 */
export declare const getCoordinatesFromLocation: (location: string, district: string, state: string) => Promise<{
    lat: number;
    lon: number;
}>;
export {};
//# sourceMappingURL=location.service.d.ts.map