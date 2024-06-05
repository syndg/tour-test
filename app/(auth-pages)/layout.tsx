import { serverGetLoggedInUser } from "@/actions/serverGetLoggedInUser";
import { redirect } from "next/navigation";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const data = await serverGetLoggedInUser();

  if (data.status === "success") {
    redirect("/");
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      {children}
    </div>
  );
};

export default AuthLayout;
