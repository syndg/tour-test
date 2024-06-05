"use server";

import { createSupabaseServerClient } from "@/utils/supabase/supabaseServerClient";

export const serverGetLoggedInUser = async () => {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return { status: "error", message: error.message };
  }

  const user = data.user;

  return { status: "success", user };
};
