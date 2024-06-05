"use client";

import { createSupabaseBrowserClient } from "@/utils/supabase/supabaseBrowserClient";
import { Button } from "./ui/button";
import * as SocialIcons from "./Auth/SocialIcons";
import { toSiteURL } from "@/utils/toSiteURL";

const GoogleLoginButton = () => {
  const supabase = createSupabaseBrowserClient();
  async function loginWithGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: toSiteURL("/api/auth/confirm"),
      },
    });
    if (error) {
      console.log(error);
    }
  }

  const Icon = SocialIcons["google"];

  return (
    <Button
      variant="outline"
      className="w-full flex gap-4"
      onClick={() => {
        loginWithGoogle();
      }}
    >
      <Icon />
      Login with Google
    </Button>
  );
};

export default GoogleLoginButton;
