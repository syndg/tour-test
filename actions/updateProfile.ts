"use server";
import { UpdateProfileData } from "@/lib/schemas/updateProfileSchema";
import { createSupabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { serverGetLoggedInUser } from "./serverGetLoggedInUser";

export const updateProfile = async (values: UpdateProfileData) => {
  const supabase = createSupabaseServerClient();

  const data = await serverGetLoggedInUser();

  if (!data?.user) {
    return {
      status: "error",
      message: "Unable to update profile",
    };
  }

  const { role, ...rest } = values;

  const actualRole =
    role === "Manager" ? "Manager" : role === "Employee" ? "Employee" : null;

  const { error } = await supabase
    .from("profiles")
    .update({
      ...rest,
      role: actualRole,
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
