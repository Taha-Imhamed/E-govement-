export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      citizens: {
        Row: {
          address_ar: string | null
          address_en: string | null
          birth_date: string
          birth_place_ar: string | null
          birth_place_en: string | null
          blood_type: string | null
          city_ar: string | null
          city_en: string | null
          created_at: string | null
          education_level_ar: string | null
          education_level_en: string | null
          email: string | null
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          father_father_name_ar: string | null
          father_mother_name_ar: string | null
          father_name_ar: string
          first_name_ar: string
          first_name_en: string | null
          gender: string | null
          id: string
          last_name_ar: string
          last_name_en: string | null
          marital_status: string | null
          military_service_status: string | null
          mother_father_name_ar: string | null
          mother_mother_name_ar: string | null
          mother_name_ar: string
          national_id: string
          nationality_ar: string | null
          nationality_en: string | null
          password_hash: string
          phone: string | null
          profession_ar: string | null
          profession_en: string | null
          updated_at: string | null
        }
        Insert: {
          address_ar?: string | null
          address_en?: string | null
          birth_date: string
          birth_place_ar?: string | null
          birth_place_en?: string | null
          blood_type?: string | null
          city_ar?: string | null
          city_en?: string | null
          created_at?: string | null
          education_level_ar?: string | null
          education_level_en?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          father_father_name_ar?: string | null
          father_mother_name_ar?: string | null
          father_name_ar: string
          first_name_ar: string
          first_name_en?: string | null
          gender?: string | null
          id?: string
          last_name_ar: string
          last_name_en?: string | null
          marital_status?: string | null
          military_service_status?: string | null
          mother_father_name_ar?: string | null
          mother_mother_name_ar?: string | null
          mother_name_ar: string
          national_id: string
          nationality_ar?: string | null
          nationality_en?: string | null
          password_hash: string
          phone?: string | null
          profession_ar?: string | null
          profession_en?: string | null
          updated_at?: string | null
        }
        Update: {
          address_ar?: string | null
          address_en?: string | null
          birth_date?: string
          birth_place_ar?: string | null
          birth_place_en?: string | null
          blood_type?: string | null
          city_ar?: string | null
          city_en?: string | null
          created_at?: string | null
          education_level_ar?: string | null
          education_level_en?: string | null
          email?: string | null
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          father_father_name_ar?: string | null
          father_mother_name_ar?: string | null
          father_name_ar?: string
          first_name_ar?: string
          first_name_en?: string | null
          gender?: string | null
          id?: string
          last_name_ar?: string
          last_name_en?: string | null
          marital_status?: string | null
          military_service_status?: string | null
          mother_father_name_ar?: string | null
          mother_mother_name_ar?: string | null
          mother_name_ar?: string
          national_id?: string
          nationality_ar?: string | null
          nationality_en?: string | null
          password_hash?: string
          phone?: string | null
          profession_ar?: string | null
          profession_en?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      departments: {
        Row: {
          code: string
          created_at: string | null
          id: string
          name_ar: string
          name_en: string
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          name_ar: string
          name_en: string
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          name_ar?: string
          name_en?: string
        }
        Relationships: []
      }
      documents: {
        Row: {
          citizen_id: string
          created_at: string | null
          document_number: string | null
          document_type: string
          expiry_date: string | null
          file_url: string | null
          id: string
          issue_date: string | null
          issuing_authority_ar: string | null
          issuing_authority_en: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          citizen_id: string
          created_at?: string | null
          document_number?: string | null
          document_type: string
          expiry_date?: string | null
          file_url?: string | null
          id?: string
          issue_date?: string | null
          issuing_authority_ar?: string | null
          issuing_authority_en?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          citizen_id?: string
          created_at?: string | null
          document_number?: string | null
          document_type?: string
          expiry_date?: string | null
          file_url?: string | null
          id?: string
          issue_date?: string | null
          issuing_authority_ar?: string | null
          issuing_authority_en?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "documents_citizen_id_fkey"
            columns: ["citizen_id"]
            isOneToOne: false
            referencedRelation: "citizens"
            referencedColumns: ["id"]
          },
        ]
      }
      government_workers: {
        Row: {
          created_at: string | null
          department_id: string
          email: string | null
          employee_id: string
          first_name_ar: string
          first_name_en: string | null
          hire_date: string | null
          id: string
          is_active: boolean | null
          last_name_ar: string
          last_name_en: string | null
          password_hash: string
          phone: string | null
          position_ar: string | null
          position_en: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department_id: string
          email?: string | null
          employee_id: string
          first_name_ar: string
          first_name_en?: string | null
          hire_date?: string | null
          id?: string
          is_active?: boolean | null
          last_name_ar: string
          last_name_en?: string | null
          password_hash: string
          phone?: string | null
          position_ar?: string | null
          position_en?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department_id?: string
          email?: string | null
          employee_id?: string
          first_name_ar?: string
          first_name_en?: string | null
          hire_date?: string | null
          id?: string
          is_active?: boolean | null
          last_name_ar?: string
          last_name_en?: string | null
          password_hash?: string
          phone?: string | null
          position_ar?: string | null
          position_en?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "government_workers_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
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
