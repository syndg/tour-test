import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/utils/supabase/supabaseServerClient";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next");

  if (code) {
    const supabase = createSupabaseServerClient();
    try {
      // Exchange the code for a session
      await supabase.auth.exchangeCodeForSession(code);
    } catch (error) {
      // Handle error
      console.error("Failed to exchange code for session: ", error);
      // Potentially return an error response here
    }
  }
  revalidatePath("/");
  let redirectTo = new URL("/", requestUrl.origin);
  if (next) {
    // decode next param
    const decodedNext = decodeURIComponent(next);
    // validate next param
    redirectTo = new URL(decodedNext, requestUrl.origin);
  }
  return NextResponse.redirect(redirectTo);
}
