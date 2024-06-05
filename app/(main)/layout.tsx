import { serverGetLoggedInUser } from "@/actions/serverGetLoggedInUser";
import { redirect } from "next/navigation";

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const data = await serverGetLoggedInUser();

  if (data.status === "error" || !data?.user) {
    redirect("/login");
  }

  return <main>{children}</main>;
};

export default MainLayout;
