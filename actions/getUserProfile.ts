import { createSupabaseServerClient } from "@/utils/supabase/supabaseServerClient";

export const getUserProfile = async (userId: string) => {
  const supabase = createSupabaseServerClient();
  const { data: userProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  return userProfile;
};
