"use client";

import { Form } from "@/components/ui/form";
import CustomInput from "@/components/form/ui/CustomInput";
import { useForm } from "react-hook-form";

import { authSchema, type AuthData } from "@/lib/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";
import { login, signup } from "@/actions/auth";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  type: "login" | "signup";
}

const AuthForm = ({ type }: AuthFormProps) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [emailSentMessage, setEmailSentMessage] = useState("");

  const form = useForm<AuthData>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: AuthData) => {
    startTransition(() => {
      (async () => {
        if (type === "login") {
          const result = await login(values);

          if (result.status === "error") {
            toast.error(result.message);
            return;
          }

          toast.success("Logged in successfully");
          router.push("/profile");
        } else {
          const result = await signup(values);

          if (result.status === "error") {
            toast.error(result.message);
            return;
          }

          toast.success("Account created successfully");
          setEmailSentMessage("Email sent with verification link");
          form.reset();
        }
      })();
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <CustomInput
          label="Email"
          name="email"
          control={form.control}
          placeholderText="harry@example.com"
        />
        <CustomInput
          type="password"
          label="Password"
          name="password"
          control={form.control}
        />

        {emailSentMessage && (
          <p className="text-sm text-green-600">{emailSentMessage}</p>
        )}

        <Button
          type="submit"
          className="w-full active:scale-[.98] transition-all duration-150]"
        >
          {isPending ? (
            <Loader className="animate-spin" size={20} />
          ) : (
            <>{type === "login" ? "Login" : "Sign up"}</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
