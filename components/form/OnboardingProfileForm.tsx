"use client";
import { Form } from "@/components/ui/form";
import CustomInput from "@/components/form/ui/CustomInput";
import { useForm } from "react-hook-form";

import {
  onboardingProfileUpdateSchema,
  OnboardingProfileUpdate,
} from "@/lib/schemas/onboardingProfileUpdateSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useTransition } from "react";

import { onboardingProfileUpdate } from "@/actions/onboardingProfileUpdate";
import { useRouter } from "next/navigation";
import UploadAvatarForm from "@/components/form/UploadAvatarForm";

const OnboardingProfileForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<OnboardingProfileUpdate>({
    resolver: zodResolver(onboardingProfileUpdateSchema),
    defaultValues: {
      fullName: "",
      username: "",
    },
  });

  const onSubmit = (values: OnboardingProfileUpdate) => {
    startTransition(() => {
      (async () => {
        const result = await onboardingProfileUpdate(values);

        if (result.status === "error") {
          toast.error(result.message);
          return;
        }

        toast.success("Profile updated successfully");
        router.push("/profile");
        form.reset();
      })();
    });
  };

  return (
    <Form {...form}>
      <UploadAvatarForm />
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <CustomInput
          label="Full Name"
          name="fullName"
          control={form.control}
          placeholderText="Harry Potter"
        />
        <CustomInput
          label="Username"
          name="username"
          control={form.control}
          placeholderText="harry_potter"
        />

        <Button
          type="submit"
          className="w-full active:scale-[.98] transition-all duration-150]"
        >
          {isPending ? (
            <Loader className="animate-spin" size={20} />
          ) : (
            <>Update Profile</>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default OnboardingProfileForm;
