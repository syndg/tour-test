"use server";

import { OnboardingProfileUpdate } from "@/lib/schemas/onboardingProfileUpdateSchema";
import { createSupabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { serverGetLoggedInUser } from "./serverGetLoggedInUser";

export const onboardingProfileUpdate = async (
  values: OnboardingProfileUpdate,
): Promise<ValidSAPayload> => {
  const supabase = createSupabaseServerClient();

  const data = await serverGetLoggedInUser();

  if (!data?.user) {
    return {
      status: "error",
      message: "Unable to update profile",
    };
  }

  const { fullName, username } = values;

  const { error } = await supabase
    .from("profiles")
    .update({
      username,
      full_name: fullName,
    })
    .eq("id", data.user?.id);

  if (error) {
    return {
      status: "error",
      message: error.message,
    };
  }

  return {
    status: "success",
  };
};
