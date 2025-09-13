export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      crops: {
        Row: {
          created_at: string
          current_market_price: number | null
          expected_yield_per_acre: number | null
          growing_states: string[] | null
          id: string
          investment_per_acre: number | null
          name_en: string
          name_hi: string
          rainfall_max: number | null
          rainfall_min: number | null
          roi_percentage: number | null
          season: string
          soil_ph_max: number | null
          soil_ph_min: number | null
          temperature_max: number | null
          temperature_min: number | null
        }
        Insert: {
          created_at?: string
          current_market_price?: number | null
          expected_yield_per_acre?: number | null
          growing_states?: string[] | null
          id?: string
          investment_per_acre?: number | null
          name_en: string
          name_hi: string
          rainfall_max?: number | null
          rainfall_min?: number | null
          roi_percentage?: number | null
          season: string
          soil_ph_max?: number | null
          soil_ph_min?: number | null
          temperature_max?: number | null
          temperature_min?: number | null
        }
        Update: {
          created_at?: string
          current_market_price?: number | null
          expected_yield_per_acre?: number | null
          growing_states?: string[] | null
          id?: string
          investment_per_acre?: number | null
          name_en?: string
          name_hi?: string
          rainfall_max?: number | null
          rainfall_min?: number | null
          roi_percentage?: number | null
          season?: string
          soil_ph_max?: number | null
          soil_ph_min?: number | null
          temperature_max?: number | null
          temperature_min?: number | null
        }
        Relationships: []
      }
      fertilizers: {
        Row: {
          application_method: string | null
          application_stage: string
          cost_per_kg: number | null
          created_at: string
          crop_id: string | null
          fertilizer_name: string
          frequency_days: number | null
          id: string
          quantity_per_acre: string
        }
        Insert: {
          application_method?: string | null
          application_stage: string
          cost_per_kg?: number | null
          created_at?: string
          crop_id?: string | null
          fertilizer_name: string
          frequency_days?: number | null
          id?: string
          quantity_per_acre: string
        }
        Update: {
          application_method?: string | null
          application_stage?: string
          cost_per_kg?: number | null
          created_at?: string
          crop_id?: string | null
          fertilizer_name?: string
          frequency_days?: number | null
          id?: string
          quantity_per_acre?: string
        }
        Relationships: [
          {
            foreignKeyName: "fertilizers_crop_id_fkey"
            columns: ["crop_id"]
            isOneToOne: false
            referencedRelation: "crops"
            referencedColumns: ["id"]
          },
        ]
      }
      market_prices: {
        Row: {
          arrival_quantity: number | null
          created_at: string
          crop_name: string
          id: string
          mandi_location: string | null
          max_price: number | null
          min_price: number | null
          modal_price: number | null
          price_date: string
          state: string | null
        }
        Insert: {
          arrival_quantity?: number | null
          created_at?: string
          crop_name: string
          id?: string
          mandi_location?: string | null
          max_price?: number | null
          min_price?: number | null
          modal_price?: number | null
          price_date: string
          state?: string | null
        }
        Update: {
          arrival_quantity?: number | null
          created_at?: string
          crop_name?: string
          id?: string
          mandi_location?: string | null
          max_price?: number | null
          min_price?: number | null
          modal_price?: number | null
          price_date?: string
          state?: string | null
        }
        Relationships: []
      }
      pesticides: {
        Row: {
          application_timing: string | null
          cost_per_liter: number | null
          created_at: string
          crop_id: string | null
          id: string
          pest_disease_name: string
          pesticide_name: string
          safety_precautions: string | null
          spray_frequency: string | null
        }
        Insert: {
          application_timing?: string | null
          cost_per_liter?: number | null
          created_at?: string
          crop_id?: string | null
          id?: string
          pest_disease_name: string
          pesticide_name: string
          safety_precautions?: string | null
          spray_frequency?: string | null
        }
        Update: {
          application_timing?: string | null
          cost_per_liter?: number | null
          created_at?: string
          crop_id?: string | null
          id?: string
          pest_disease_name?: string
          pesticide_name?: string
          safety_precautions?: string | null
          spray_frequency?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pesticides_crop_id_fkey"
            columns: ["crop_id"]
            isOneToOne: false
            referencedRelation: "crops"
            referencedColumns: ["id"]
          },
        ]
      }
      recommendations: {
        Row: {
          confidence_score: number | null
          created_at: string
          id: string
          pincode: string | null
          reasoning: string | null
          recommendation_date: string
          recommended_crops: Json
          season: string | null
          user_id: string | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string
          id?: string
          pincode?: string | null
          reasoning?: string | null
          recommendation_date?: string
          recommended_crops: Json
          season?: string | null
          user_id?: string | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string
          id?: string
          pincode?: string | null
          reasoning?: string | null
          recommendation_date?: string
          recommended_crops?: Json
          season?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      soil_data: {
        Row: {
          district: string
          id: string
          last_updated: string
          moisture_content: number | null
          nitrogen: number | null
          organic_matter: number | null
          ph_level: number | null
          phosphorus: number | null
          pincode: string | null
          potassium: number | null
          soil_type: string | null
          state: string
        }
        Insert: {
          district: string
          id?: string
          last_updated?: string
          moisture_content?: number | null
          nitrogen?: number | null
          organic_matter?: number | null
          ph_level?: number | null
          phosphorus?: number | null
          pincode?: string | null
          potassium?: number | null
          soil_type?: string | null
          state: string
        }
        Update: {
          district?: string
          id?: string
          last_updated?: string
          moisture_content?: number | null
          nitrogen?: number | null
          organic_matter?: number | null
          ph_level?: number | null
          phosphorus?: number | null
          pincode?: string | null
          potassium?: number | null
          soil_type?: string | null
          state?: string
        }
        Relationships: []
      }
      user_crops: {
        Row: {
          created_at: string
          crop_id: string | null
          cultivation_season: string
          cultivation_year: number
          id: string
          profit_earned: number | null
          user_id: string | null
          yield_achieved: number | null
        }
        Insert: {
          created_at?: string
          crop_id?: string | null
          cultivation_season: string
          cultivation_year: number
          id?: string
          profit_earned?: number | null
          user_id?: string | null
          yield_achieved?: number | null
        }
        Update: {
          created_at?: string
          crop_id?: string | null
          cultivation_season?: string
          cultivation_year?: number
          id?: string
          profit_earned?: number | null
          user_id?: string | null
          yield_achieved?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "user_crops_crop_id_fkey"
            columns: ["crop_id"]
            isOneToOne: false
            referencedRelation: "crops"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_crops_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          district: string | null
          farm_area_acres: number | null
          farm_area_hectares: number | null
          id: string
          location_name: string | null
          pincode: string
          state: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          district?: string | null
          farm_area_acres?: number | null
          farm_area_hectares?: number | null
          id?: string
          location_name?: string | null
          pincode: string
          state?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          district?: string | null
          farm_area_acres?: number | null
          farm_area_hectares?: number | null
          id?: string
          location_name?: string | null
          pincode?: string
          state?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      weather_data: {
        Row: {
          current_temp: number | null
          forecast_7day: Json | null
          humidity: number | null
          id: string
          last_updated: string
          latitude: number | null
          location_name: string | null
          longitude: number | null
          pincode: string
          rainfall: number | null
          weather_condition: string | null
          wind_speed: number | null
        }
        Insert: {
          current_temp?: number | null
          forecast_7day?: Json | null
          humidity?: number | null
          id?: string
          last_updated?: string
          latitude?: number | null
          location_name?: string | null
          longitude?: number | null
          pincode: string
          rainfall?: number | null
          weather_condition?: string | null
          wind_speed?: number | null
        }
        Update: {
          current_temp?: number | null
          forecast_7day?: Json | null
          humidity?: number | null
          id?: string
          last_updated?: string
          latitude?: number | null
          location_name?: string | null
          longitude?: number | null
          pincode?: string
          rainfall?: number | null
          weather_condition?: string | null
          wind_speed?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
