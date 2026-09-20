export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      app_settings: {
        Row: {
          id: string
          setting_value: Json
          updated_at: string | null
        }
        Insert: {
          id: string
          setting_value: Json
          updated_at?: string | null
        }
        Update: {
          id?: string
          setting_value?: Json
          updated_at?: string | null
        }
        Relationships: []
      }
      customers: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string
          id: string
          phone: string
          preferred_contact_method: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name: string
          id?: string
          phone: string
          preferred_contact_method?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string
          id?: string
          phone?: string
          preferred_contact_method?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          full_name: string | null
          id: string
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          full_name?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          full_name?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      ticket_activities: {
        Row: {
          action: string
          created_at: string | null
          id: string
          new_value: string | null
          old_value: string | null
          performed_by: string | null
          ticket_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          new_value?: string | null
          old_value?: string | null
          performed_by?: string | null
          ticket_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          new_value?: string | null
          old_value?: string | null
          performed_by?: string | null
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_activities_ticket_id_fkey"
            columns: ["ticket_id"]
            referencedRelation: "tickets"
            referencedColumns: ["id"]
          }
        ]
      }
      ticket_sequences: {
        Row: {
          last_value: number
          year: number
        }
        Insert: {
          last_value?: number
          year: number
        }
        Update: {
          last_value?: number
          year?: number
        }
        Relationships: []
      }
      tickets: {
        Row: {
          actual_cost: number | null
          category: string
          completed_at: string | null
          created_at: string | null
          customer_id: string
          description: string
          device_brand: string | null
          device_model: string | null
          device_type: string | null
          diagnosis: string | null
          estimated_cost: number | null
          id: string
          internal_notes: string | null
          location: string | null
          preferred_service_date: string | null
          priority: string
          recommendation: string | null
          serial_number: string | null
          service_type: string | null
          status: string
          subject: string
          technician_notes: string | null
          ticket_number: string
          updated_at: string | null
          work_performed: string | null
        }
        Insert: {
          actual_cost?: number | null
          category: string
          completed_at?: string | null
          created_at?: string | null
          customer_id: string
          description: string
          device_brand?: string | null
          device_model?: string | null
          device_type?: string | null
          diagnosis?: string | null
          estimated_cost?: number | null
          id?: string
          internal_notes?: string | null
          location?: string | null
          preferred_service_date?: string | null
          priority?: string
          recommendation?: string | null
          serial_number?: string | null
          service_type?: string | null
          status?: string
          subject: string
          technician_notes?: string | null
          ticket_number?: string
          updated_at?: string | null
          work_performed?: string | null
        }
        Update: {
          actual_cost?: number | null
          category?: string
          completed_at?: string | null
          created_at?: string | null
          customer_id?: string
          description?: string
          device_brand?: string | null
          device_model?: string | null
          device_type?: string | null
          diagnosis?: string | null
          estimated_cost?: number | null
          id?: string
          internal_notes?: string | null
          location?: string | null
          preferred_service_date?: string | null
          priority?: string
          recommendation?: string | null
          serial_number?: string | null
          service_type?: string | null
          status?: string
          subject?: string
          technician_notes?: string | null
          ticket_number?: string
          updated_at?: string | null
          work_performed?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_customer_id_fkey"
            columns: ["customer_id"]
            referencedRelation: "customers"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_ticket_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
