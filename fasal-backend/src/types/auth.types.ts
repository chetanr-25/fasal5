export interface RegisterUserInput {
  pincode: string;
  location_name: string;
  district: string;
  state: string;
  farm_area_acres: number;
  farm_area_hectares: number;
  phone: string;
  preferred_language: string;
}

export interface LoginUserInput {
  phone: string;
}

export interface AuthTokenPayload {
  userId: string;
  phone: string;
}