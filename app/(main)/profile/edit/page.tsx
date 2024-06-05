import { getUserProfile } from "@/actions/getUserProfile";
import { serverGetLoggedInUser } from "@/actions/serverGetLoggedInUser";
import UpdateProfileDataForm from "@/components/form/UpdateProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function UserOnboardingCard() {
  const data = await serverGetLoggedInUser();

  if (data.status === "error" || !data?.user) {
    redirect("/login");
  }

  const userProfile = await getUserProfile(data?.user.id);

  return (
    <div className="h-[80svh] grid place-content-center">
      <Card className="w-full max-w-md rounded-lg shadow-lg dark:bg-gray-800">
        <CardHeader className="space-y-1 border-b px-6 py-5">
          <CardTitle>Edit your profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 px-6 py-8">
          <UpdateProfileDataForm initialValues={userProfile} />
        </CardContent>
      </Card>
    </div>
  );
}
