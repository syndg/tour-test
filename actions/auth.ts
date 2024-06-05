"use server";
import { authSchema, type AuthData } from "@/lib/schemas/authSchema";
import { createSupabaseServerClient } from "@/utils/supabase/supabaseServerClient";

export async function signup(values: AuthData): Promise<ValidSAPayload> {
  const supabase = createSupabaseServerClient();
  const validatedData = authSchema.safeParse(values);

  if (validatedData.error) {
    return { status: "error", message: "Invalid input" };
  }

  const { error } = await supabase.auth.signUp(validatedData.data);

  if (error) {
    return { status: "error", message: error.message };
  }

  return { status: "success" };
}

export async function login(values: AuthData): Promise<ValidSAPayload> {
  const supabase = createSupabaseServerClient();
  const validatedData = authSchema.safeParse(values);

  if (validatedData.error) {
    return { status: "error", message: "Invalid input" };
  }

  const { error } = await supabase.auth.signInWithPassword(validatedData.data);

  if (error) {
    return { status: "error", message: error.message };
  }

  return { status: "success" };
}
