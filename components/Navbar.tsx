import Link from "next/link";
import UserButton from "@/components/UserButton";
import { serverGetLoggedInUser } from "@/actions/serverGetLoggedInUser";
import { getUserProfile } from "@/actions/getUserProfile";

export default async function Navbar() {
  const data = await serverGetLoggedInUser();

  if (!data?.user) return;

  const profile = await getUserProfile(data.user?.id);

  return (
    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6">
      <Link
        href="/profile"
        className="flex items-center gap-2"
        prefetch={false}
      >
        <MountainIcon className="h-6 w-6" />
        <span className="text-lg font-bold">
          Tour<strong>YC</strong>
        </span>
      </Link>
      <UserButton user={profile} />
    </header>
  );
}

function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
