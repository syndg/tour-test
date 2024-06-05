import { serverGetLoggedInUser } from "@/actions/serverGetLoggedInUser";
import ProfileCard from "@/components/ProfileCard";
import { createSupabaseServerClient } from "@/utils/supabase/supabaseServerClient";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const supabase = createSupabaseServerClient();
  const data = await serverGetLoggedInUser();

  if (data.status === "error" || !data?.user) {
    return;
  }

  const { data: userProfile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user?.id)
    .single();

  if (!userProfile?.avatar_url || !userProfile?.full_name) {
    redirect("/onboarding");
  }

  return (
    <div className="h-[80svh] grid place-content-center">
      <ProfileCard userProfile={userProfile} userEmail={data?.user.email} />
    </div>
  );
};

export default ProfilePage;
