/**
 * Tipos TypeScript gerados a partir do schema do Supabase
 * 
 * Este arquivo contém as definições de tipos para todas as tabelas do banco de dados.
 * Os tipos são gerados manualmente a partir do schema SQL.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      blogs: {
        Row: {
          id: string;
          title: string;
          content: string;
          author: string;
          author_email: string;
          published_at: string;
          excerpt: string | null;
          cover_image: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          content: string;
          author: string;
          author_email: string;
          published_at: string;
          excerpt?: string | null;
          cover_image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          content?: string;
          author?: string;
          author_email?: string;
          published_at?: string;
          excerpt?: string | null;
          cover_image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

// Tipos auxiliares
export type Blog = Database["public"]["Tables"]["blogs"]["Row"];
export type BlogInsert = Database["public"]["Tables"]["blogs"]["Insert"];
export type BlogUpdate = Database["public"]["Tables"]["blogs"]["Update"];

