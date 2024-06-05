import AuthForm from "@/components/Auth/AuthForm";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

export default function SignUp() {
  return (
    <Card className="w-full max-w-md rounded-lg shadow-lg dark:bg-gray-800">
      <CardHeader className="space-y-1 border-b px-6 py-5">
        <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
        <CardDescription>Create an account to get started.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 px-6 py-8">
        <AuthForm type="signup" />
        <div className="relative mt-10">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="bg-white px-6 text-gray-900">
              Or continue with
            </span>
          </div>
        </div>
        <GoogleLoginButton />
      </CardContent>
      <CardFooter className="border-t px-6 py-4 text-center text-sm">
        Already have an account?
        <Link
          href="/login"
          className="ml-2 font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          prefetch={false}
        >
          Login
        </Link>
      </CardFooter>
    </Card>
  );
}
