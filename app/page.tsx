import Link from "next/link";

export default function Home() {
  return (
    <main className="grid h-[100svh] place-content-center text-center">
      This is just a dummy page.{" "}
      <Link href="/login" className="underline text-blue-500">
        Login
      </Link>
    </main>
  );
}
