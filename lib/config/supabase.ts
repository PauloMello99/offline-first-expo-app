import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/lib/types/database";

const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

// Cliente Supabase com tipos tipados
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

// Exportar tipos úteis
export type { Database, Database as SupabaseDatabase };
export type { Blog, BlogInsert, BlogUpdate } from "@/lib/types/database";
