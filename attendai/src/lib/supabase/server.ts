import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

/**
 * Creates a server-side Supabase client instance context.
 * Injects request cookies to preserve token integrity on SSR pages,
 * server actions, and API Route Handlers.
 */
export function createServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-supabase-project.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key";

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
