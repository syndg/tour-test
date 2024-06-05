import { serverGetLoggedInUser } from "@/actions/serverGetLoggedInUser";
import Link from "next/link";

export default async function Home() {
  const data = await serverGetLoggedInUser();
  const user = data?.user;

  console.log({ user });

  return (
    <main className="grid h-[100svh] place-content-center text-center">
      This is just a dummy page.{" "}
      <Link
        href={user ? "/profile" : "/login"}
        className="underline text-blue-500"
      >
        {user ? "Go to profile" : "Login"}
      </Link>
    </main>
  );
}
