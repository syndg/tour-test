import { Database } from "@/lib/database.types";
import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseBrowserClient() {
  // Create a supabase client on the browser with project's credentials
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
