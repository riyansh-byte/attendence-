import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-supabase-project.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key";

/**
 * Supabase client instance context.
 * Used for direct client-side requests, Supabase Authentication triggers,
 * and database queries matching user RLS policies.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
