import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

// WARNING: This client bypasses RLS. Never expose this to the client-side or use it for untrusted operations.
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
